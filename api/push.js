// Vercel Serverless API - Push Data Endpoint

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  const pushSecret = process.env.PUSH_SECRET;

  if (pushSecret && authHeader !== `Bearer ${pushSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    if (!data.opportunities || !Array.isArray(data.opportunities)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    // 写入 data.json
    const fs = require('fs');
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

    res.json({
      success: true,
      message: 'Data updated',
      count: data.opportunities.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
