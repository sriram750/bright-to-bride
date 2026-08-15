import type { VercelRequest, VercelResponse } from '@vercel/node';

// Global in-memory storage for Vercel production deployment
let studioDataStore: any = null;

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(studioDataStore || {});
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (data && typeof data === 'object') {
      studioDataStore = data;
      return res.status(200).json({ success: true, message: 'Data saved successfully' });
    }
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
