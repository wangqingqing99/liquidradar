// Vercel Serverless API - Cron Job

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  const pushSecret = process.env.PUSH_SECRET;

  if (pushSecret && authHeader !== `Bearer ${pushSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json({
    success: true,
    message: 'Cron job executed'
  });
}
