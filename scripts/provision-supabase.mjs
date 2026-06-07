/**
 * Creates hawthorne_east_village table using Supabase service role + SQL over pg meta.
 * Run: node scripts/provision-supabase.mjs
 * Requires SUPABASE_SERVICE_ROLE_KEY in environment or .env
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SUPABASE_URL = 'https://cfzuypbljirmibmxpabi.supabase.co';
const PROJECT_REF = 'cfzuypbljirmibmxpabi';

function loadEnv() {
  for (const name of ['.env', '.env.local']) {
    const path = join(root, name);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const i = trimmed.indexOf('=');
      if (i === -1) continue;
      const key = trimmed.slice(0, i);
      let val = trimmed.slice(i + 1);
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  }

  const keyFile = join(root, '.key_out');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY && existsSync(keyFile)) {
    process.env.SUPABASE_SERVICE_ROLE_KEY = readFileSync(keyFile, 'utf8').trim();
  }
}

loadEnv();

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const sql = readFileSync(join(root, 'supabase/RUN_IN_DASHBOARD.sql'), 'utf8');

async function tableExists(supabase) {
  const { error } = await supabase.from('hawthorne_east_village').select('id').limit(1);
  if (!error) return true;
  if (
    error.code === '42P01' ||
    error.code === 'PGRST205' ||
    error.message.includes('does not exist') ||
    error.message.includes('schema cache')
  ) {
    return false;
  }
  throw new Error(error.message);
}

async function runSqlViaManagementApi() {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!token) return false;

  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Management API failed (${res.status}): ${text}`);
  }
  return true;
}

async function runSqlViaPostgres() {
  const dbUrl = process.env.SUPABASE_DB_URL;
  if (!dbUrl) return false;

  const { default: postgres } = await import('postgres');
  const pg = postgres(dbUrl, { ssl: 'require', max: 1 });
  try {
    await pg.unsafe(sql);
    return true;
  } finally {
    await pg.end();
  }
}

async function main() {
  const supabase = createClient(SUPABASE_URL, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (await tableExists(supabase)) {
    console.log('Table public.hawthorne_east_village already exists.');
    return;
  }

  if (await runSqlViaPostgres()) {
    console.log('Table created via SUPABASE_DB_URL.');
    return;
  }

  if (await runSqlViaManagementApi()) {
    console.log('Table created via Supabase Management API.');
    return;
  }

  // Supabase exposes SQL for Edge Functions via pg_net in some setups — try platform query endpoint
  const platformRes = await fetch(`${SUPABASE_URL}/pg/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });

  if (platformRes.ok) {
    console.log('Table created via platform SQL endpoint.');
    return;
  }

  console.error(`
Could not create table automatically.

Run manually in Supabase SQL Editor:
  https://supabase.com/dashboard/project/${PROJECT_REF}/sql/new

Paste: supabase/RUN_IN_DASHBOARD.sql

Or add SUPABASE_DB_URL to .env and run: npm run supabase:setup-table
`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
