import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const inputMint = searchParams.get('inputMint');
    const outputMint = searchParams.get('outputMint');
    const amount = searchParams.get('amount');
    const slippageBps = searchParams.get('slippageBps') || '50';

    if (!inputMint || !outputMint || !amount) {
      return NextResponse.json(
        { success: false, error: 'inputMint, outputMint, and amount are required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`
    );

    if (!response.ok) {
      throw new Error(`Jupiter API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching Jupiter quote:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
