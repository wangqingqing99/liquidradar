// Vercel Serverless API - Get Data Endpoint

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const jsonPath = path.join(process.cwd(), 'data.json');

    if (!fs.existsSync(jsonPath)) {
      return res.json({
        success: true,
        data: { opportunities: [], lastUpdate: null, version: '1.0.0' }
      });
    }

    const content = fs.readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(content);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
