/**
 * Lead notification for the call-back form.
 *
 * Receives { name, email?, phone, website? } and notifies Bilal through
 * whichever free channels are configured via environment variables:
 *   RESEND_API_KEY    -> email to his inbox (resend.com free tier). Without a
 *                        verified domain, Resend only delivers to the account
 *                        owner's own email address, which is the recipient
 *                        here, so no domain is needed.
 *   CALLMEBOT_APIKEY  -> WhatsApp message to his own number (callmebot.com).
 * With neither configured, returns { ok: false, error: 'not_configured' }
 * and the client falls back to the WhatsApp hand-off.
 */

const OWNER_WHATSAPP = '923139594577'; // Bilal's WhatsApp, public on the site
const OWNER_EMAIL = 'bilalkhandev66@gmail.com';

async function notifyEmail(text, name) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [OWNER_EMAIL],
        subject: `Call back request: ${name}`,
        text,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function notifyWhatsApp(text) {
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!apikey) return false;
  try {
    const url =
      'https://api.callmebot.com/whatsapp.php?phone=' +
      OWNER_WHATSAPP +
      '&text=' +
      encodeURIComponent(text) +
      '&apikey=' +
      encodeURIComponent(apikey);
    const res = await fetch(url);
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: the form hides a "website" field that humans never see or
  // fill. If it carries a value, a bot filled it: pretend success and
  // drop the submission without notifying.
  if (String(body?.website ?? '').trim()) {
    return Response.json({ ok: true });
  }

  const name = String(body?.name ?? '').trim().slice(0, 80);
  const email = String(body?.email ?? '').trim().slice(0, 120);
  const phone = String(body?.phone ?? '').trim();
  const message = String(body?.message ?? '').trim().slice(0, 1000);
  const digits = phone.replace(/\D/g, '');

  if (name.length < 2 || digits.length < 7 || digits.length > 15) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 422 });
  }

  const lines = ['New call back request', `Name: ${name}`, `Phone: ${phone}`];
  if (email) lines.push(`Email: ${email}`);
  if (message) lines.push(`Message: ${message}`);
  const text = lines.join('\n');

  const jobs = [];

  if (process.env.RESEND_API_KEY) jobs.push(notifyEmail(text, name));
  if (process.env.CALLMEBOT_APIKEY) jobs.push(notifyWhatsApp(text));
  if (jobs.length === 0) {
    return Response.json({ ok: false, error: 'not_configured' });
  }

  const results = await Promise.all(jobs);
  return Response.json({ ok: results.some(Boolean) });
}
