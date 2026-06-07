import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/** Supabase table for Hawthorne East Village Milton lead form submissions */
export const LEADS_TABLE = 'hawthorne_east_village';

export type LeadInsert = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_broker: string;
  source: string;
  page_path: string;
  form_type: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

function getSupabaseUrl() {
  return process.env.SUPABASE_URL ?? '';
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function createSupabaseAdmin(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function insertLead(
  row: LeadInsert,
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const supabase = createSupabaseAdmin();

  if (!supabase) {
    return { ok: false, error: 'Supabase is not configured.' };
  }

  const { data, error } = await supabase.from(LEADS_TABLE).insert(row).select('id').single();

  if (!error) {
    return { ok: true, id: data.id };
  }

  // Legacy table still has interest/budget/timeline instead of is_broker
  const legacyRow = {
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    phone: row.phone,
    interest: row.is_broker ? `Broker: ${row.is_broker}` : '',
    budget: '',
    timeline: '',
    source: row.source,
    page_path: row.page_path,
    form_type: row.form_type,
    utm_source: row.utm_source,
    utm_medium: row.utm_medium,
    utm_campaign: row.utm_campaign,
    utm_term: row.utm_term,
    utm_content: row.utm_content,
  };

  const legacy = await supabase.from(LEADS_TABLE).insert(legacyRow).select('id').single();

  if (legacy.error) {
    console.error('[supabase] insert lead failed:', error.message, legacy.error.message);
    return { ok: false, error: legacy.error.message };
  }

  return { ok: true, id: legacy.data.id };
}
