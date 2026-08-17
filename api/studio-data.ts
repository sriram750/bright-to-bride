import type { VercelRequest, VercelResponse } from '@vercel/node';

// Global in-memory fallback for Vercel production deployment
let studioDataStore: any = null;

// Helper to interact with Vercel KV / Upstash Redis REST API if configured
async function getKvData(): Promise<any | null> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!kvUrl || !kvToken) return null;

  try {
    const res = await fetch(`${kvUrl}/get/studio_data_store`, {
      headers: { Authorization: `Bearer ${kvToken}` }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.result) {
        return typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
      }
    }
  } catch (err) {
    console.warn('KV GET error:', err);
  }
  return null;
}

async function setKvData(data: any): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!kvUrl || !kvToken) return false;

  try {
    const res = await fetch(`${kvUrl}/set/studio_data_store`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kvToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch (err) {
    console.warn('KV SET error:', err);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const kvData = await getKvData();
    if (kvData) {
      studioDataStore = kvData;
      return res.status(200).json(kvData);
    }

    if (studioDataStore && Object.keys(studioDataStore).length > 0) {
      return res.status(200).json(studioDataStore);
    }

    // Return empty status indicator instead of bare {} so client knows server has no stored custom data
    return res.status(200).json({ empty: true, studio: 'bright-to-bride' });
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (data && typeof data === 'object') {
        studioDataStore = data;
        const kvSuccess = await setKvData(data);
        const hasKv = Boolean(process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL);

        return res.status(200).json({
          success: true,
          message: 'Data saved successfully',
          kvSynced: kvSuccess,
          hasKvConfigured: hasKv,
          lastUpdated: data.lastUpdated
        });
      }
      return res.status(400).json({ error: 'Invalid JSON payload' });
    } catch (err: any) {
      console.error('Failed to parse POST body:', err);
      return res.status(400).json({ error: 'Invalid JSON body structure', details: err?.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

