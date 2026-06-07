export interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isBroker?: string;
  source: string;
  page_path: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  timestamp: string;
  form_type?: string;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  return digits;
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

export async function submitLead(
  data: Omit<LeadPayload, 'source' | 'page_path' | 'timestamp'>,
  formType: string,
): Promise<void> {
  const payload: LeadPayload = {
    ...data,
    ...getUtmParams(),
    source: 'hawthorneeastvillagemilton.com',
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    form_type: formType,
  };

  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Submission failed. Please try again.';
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      /* ignore */
    }
    console.error('[LeadForm] API error', res.status);
    throw new Error(message);
  }
}
