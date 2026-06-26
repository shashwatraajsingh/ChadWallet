'use client';

import TrendingSidebar from '@/components/trade/TrendingSidebar';
import TokenChart from '@/components/trade/TokenChart';
import LiveTrades from '@/components/trade/LiveTrades';
import HoldersList from '@/components/trade/HoldersList';
import SwapTerminal from '@/components/trade/SwapTerminal';

export default function TradeClientPage({ tokenAddress }: { tokenAddress: string }) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 h-full overflow-hidden">
      {/* Left: Trending Sidebar */}
      <TrendingSidebar />

      {/* Middle: Chart & Info */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden h-full">
        <div className="h-16 bg-bg-card border border-bg-card-border rounded-xl p-4 flex items-center shrink-0">
          <h1 className="text-xl font-bold font-mono truncate">{tokenAddress}</h1>
        </div>
        <div className="flex-1 bg-bg-card border border-bg-card-border rounded-xl min-h-[300px] overflow-hidden">
          <TokenChart tokenAddress={tokenAddress} />
        </div>
        <div className="h-64 shrink-0 flex gap-4">
          <LiveTrades tokenAddress={tokenAddress} />
          <HoldersList tokenAddress={tokenAddress} />
        </div>
      </div>

      {/* Right: Swap & Position */}
      <SwapTerminal tokenAddress={tokenAddress} />
    </div>
  );
}
