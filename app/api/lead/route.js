/**
 * Lead notification for the call-back form (CallMeBot, free).
 *
 * Receives { name, email?, phone, website? } and sends the details as a
 * WhatsApp message to Bilal's own number via api.callmebot.com. The API key
 * comes from the CALLMEBOT_APIKEY environment variable (one-time activation:
 * message the CallMeBot bot on WhatsApp, it replies with the key).
 *
 * With no key configured, returns { ok: false, error: 'not_configured' } and
 * the client falls back to the WhatsApp hand-off.
 */

const OWNER_WHATSAPP = '923139594577'; // Bilal's WhatsApp, public on the site

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
  const digits = phone.replace(/\D/g, '');

  if (name.length < 2 || digits.length < 7 || digits.length > 15) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 422 });
  }

  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!apikey) {
    return Response.json({ ok: false, error: 'not_configured' });
  }

  const lines = ['New call back request', `Name: ${name}`, `Phone: ${phone}`];
  if (email) lines.push(`Email: ${email}`);

  try {
    const url =
      'https://api.callmebot.com/whatsapp.php?phone=' +
      OWNER_WHATSAPP +
      '&text=' +
      encodeURIComponent(lines.join('\n')) +
      '&apikey=' +
      encodeURIComponent(apikey);
    const res = await fetch(url);
    return Response.json({ ok: res.ok });
  } catch {
    return Response.json({ ok: false, error: 'notify_failed' });
  }
}
