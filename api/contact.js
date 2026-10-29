
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message, website, language } = req.body || {};

  // Campo invisível para reduzir spam
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (
    ![name, email, company, message].every(
      x => typeof x === 'string' && x.trim()
    ) ||
    name.length > 120 ||
    email.length > 254 ||
    company.length > 160 ||
    message.length > 3000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ error: 'Invalid form data' });
  }

  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secret) {
    return res.status(503).json({
      error: 'Contact form not configured yet'
    });
  }

  try {
    const headers = {
      apikey: secret,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    };

    // Authorization Bearer somente para chaves JWT antigas
    if (!secret.startsWith('sb_secret_')) {
      headers.Authorization = `Bearer ${secret}`;
    }

    const response = await fetch(
      `${url.replace(/\/$/, '')}/rest/v1/leads`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
          language: ['de', 'en', 'es', 'pt'].includes(language)
            ? language
            : 'de'
        })
      }
    );

    if (!response.ok) {
      console.error('Supabase insert failed:', response.status);
      return res.status(500).json({
        error: 'Unable to send message'
      });
    }

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Contact function failed:', error.message);
    return res.status(500).json({
      error: 'Unable to send message'
    });
  }
}
