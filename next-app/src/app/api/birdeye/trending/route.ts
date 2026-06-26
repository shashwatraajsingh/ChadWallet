import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://public-api.birdeye.so/defi/tokenlist?sort_by=v24hUSD&sort_type=desc&offset=0&limit=50&min_liquidity=100',
      {
        headers: {
          'X-API-KEY': process.env.BIRDEYE_API_KEY || '',
          'x-chain': 'solana',
          Accept: 'application/json',
        },
        next: { revalidate: 15 }, // Cache for 15 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Birdeye API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching trending tokens:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
