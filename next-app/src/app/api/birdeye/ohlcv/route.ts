import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');
    const type = searchParams.get('type') || '15m';
    const timeTo = searchParams.get('time_to') || Math.floor(Date.now() / 1000);
    const timeFrom = searchParams.get('time_from') || (Number(timeTo) - 24 * 60 * 60);

    if (!address) {
      return NextResponse.json({ success: false, error: 'Address is required' }, { status: 400 });
    }

    const response = await fetch(
      `https://public-api.birdeye.so/defi/ohlcv?address=${address}&type=${type}&time_from=${timeFrom}&time_to=${timeTo}`,
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
    console.error('Error fetching OHLCV data:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
