/**
 * Lead notification for the call-back form.
 *
 * Receives { name, email?, phone } and notifies Bilal through whichever
 * free channels are configured via environment variables:
 *   CALLMEBOT_APIKEY  -> WhatsApp message to his own number (callmebot.com)
 *   RESEND_API_KEY    -> email to his inbox (resend.com free tier)
 * With neither configured, returns { ok: false, error: 'not_configured' }
 * and the client falls back to the WhatsApp hand-off.
 */

const OWNER_WHATSAPP = '923139594577'; // Bilal's WhatsApp, public on the site
const OWNER_EMAIL = 'bilalkhandev66@gmail.com';

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

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const phone = String(body?.phone ?? '').trim();

  if (name.length < 2 || phone.length < 7) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 422 });
  }

  const lines = ['New call back request', `Name: ${name}`, `Phone: ${phone}`];
  if (email) lines.push(`Email: ${email}`);
  const text = lines.join('\n');

  const configured = Boolean(process.env.CALLMEBOT_APIKEY || process.env.RESEND_API_KEY);
  if (!configured) {
    return Response.json({ ok: false, error: 'not_configured' });
  }

  const results = await Promise.all([notifyWhatsApp(text), notifyEmail(text, name)]);
  return Response.json({ ok: results.some(Boolean) });
}
