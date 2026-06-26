import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ success: false, error: 'Address is required' }, { status: 400 });
    }

    const response = await fetch(
      `https://public-api.birdeye.so/defi/v3/token/holder?address=${address}&offset=0&limit=50`,
      {
        headers: {
          'X-API-KEY': process.env.BIRDEYE_API_KEY || '',
          'x-chain': 'solana',
          Accept: 'application/json',
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Birdeye API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching holders:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
