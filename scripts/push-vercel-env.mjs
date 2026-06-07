/**
 * Push .env Supabase vars to Vercel production (never prints secret values).
 */
import { readFileSync, existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv() {
  const env = {};
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
      if (val) env[key] = val;
    }
  }
  return env;
}

function addEnv(name, value, environment = 'production') {
  const result = spawnSync(
    'npx',
    ['vercel', 'env', 'add', name, environment, '--force', '--yes'],
    {
      cwd: root,
      input: value,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    },
  );
  if (result.status !== 0) {
    throw new Error(`vercel env add ${name} failed: ${result.stderr || result.stdout}`);
  }
}

const env = loadEnv();
const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];

for (const key of required) {
  if (!env[key]) {
    console.error(`Missing ${key} in .env`);
    process.exit(1);
  }
}

addEnv('SUPABASE_URL', env.SUPABASE_URL);
addEnv('SUPABASE_SERVICE_ROLE_KEY', env.SUPABASE_SERVICE_ROLE_KEY);

if (env.REGISTRATION_WEBHOOK_URL) {
  addEnv('REGISTRATION_WEBHOOK_URL', env.REGISTRATION_WEBHOOK_URL);
}
if (env.PUBLIC_N8N_WEBHOOK_URL) {
  addEnv('PUBLIC_N8N_WEBHOOK_URL', env.PUBLIC_N8N_WEBHOOK_URL);
}

console.log('Vercel production env updated: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
