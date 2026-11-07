import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, pesan } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Catatan <onboarding@resend.dev>',
      to: email,
      subject: 'Catatan untuk Diriku Sendiri',
      text: pesan,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
