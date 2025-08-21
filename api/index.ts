import { VercelRequest, VercelResponse } from '@vercel/node';
import { ApiResponse } from '../types';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const response: ApiResponse = {
      success: true,
      message: 'ADYC API is running on Vercel',
      data: {
        version: '2.0.0',
        environment: 'production',
        timestamp: new Date().toISOString()
      }
    };

    res.status(200).json(response);
  } else {
    res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }
}