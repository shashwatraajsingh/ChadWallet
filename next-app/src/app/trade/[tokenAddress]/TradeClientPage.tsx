'use client';

export default function TradeClientPage({ tokenAddress }: { tokenAddress: string }) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 h-full overflow-hidden">
      {/* Left: Trending Sidebar */}
      <div className="hidden lg:flex w-64 bg-bg-card border border-bg-card-border rounded-xl">
        <div className="p-4 border-b border-bg-card-border w-full">
          <h2 className="font-semibold text-text-primary">Trending</h2>
        </div>
      </div>

      {/* Middle: Chart & Info */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="h-20 bg-bg-card border border-bg-card-border rounded-xl p-4 flex items-center">
          <h1 className="text-xl font-bold">{tokenAddress}</h1>
        </div>
        <div className="flex-1 bg-bg-card border border-bg-card-border rounded-xl">
          {/* Chart will go here */}
        </div>
      </div>

      {/* Right: Swap & Position */}
      <div className="w-full lg:w-80 bg-bg-card border border-bg-card-border rounded-xl flex flex-col">
        <div className="p-4 border-b border-bg-card-border">
          <h2 className="font-semibold text-text-primary">Swap</h2>
        </div>
      </div>
    </div>
  );
}
