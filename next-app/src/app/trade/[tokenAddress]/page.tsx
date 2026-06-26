import { Metadata } from 'next';
import Navigation from '@/sections/Navigation';
import TradeClientPage from './TradeClientPage';

export async function generateMetadata(props: {
  params: Promise<{ tokenAddress: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const tokenAddress = params.tokenAddress;

  // In a real app, you might fetch token details here for better OG tags
  // Since Birdeye free tier is rate limited, we keep it simple or cache it.
  
  return {
    title: `Trade ${tokenAddress} | ChadWallet`,
    description: `Live chart, trades, and instant swaps for ${tokenAddress} on Solana via ChadWallet.`,
    openGraph: {
      title: `Trade ${tokenAddress} | ChadWallet`,
      description: `Live chart, trades, and instant swaps for ${tokenAddress} on Solana.`,
      images: [
        {
          url: '/assets/logo/logo2.png', 
          width: 800,
          height: 600,
          alt: 'ChadWallet Trade',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Trade ${tokenAddress} | ChadWallet`,
      description: `Live chart, trades, and instant swaps for ${tokenAddress} on Solana.`,
    },
  };
}

export default async function TradePage(props: {
  params: Promise<{ tokenAddress: string }>;
}) {
  const params = await props.params;
  
  return (
    <div className="min-h-screen bg-bg-primary font-aeonik">
      <Navigation solid={true} />
      <main className="pt-[72px] h-screen flex flex-col">
        {/* We pass the tokenAddress to the Client Component which handles state/websockets */}
        <TradeClientPage tokenAddress={params.tokenAddress} />
      </main>
    </div>
  );
}
