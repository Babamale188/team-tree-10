export function OrgChartMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Browser chrome frame */}
      <div className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 mx-8">
            <div className="h-5 rounded-md bg-white/10 flex items-center justify-center">
              <span className="text-[10px] text-white/40 font-mono">orgchart.company.com</span>
            </div>
          </div>
        </div>

        {/* App content mock */}
        <div className="p-6 bg-gradient-to-b from-slate-900/80 to-slate-800/80">
          {/* Mini header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-4 h-4 rounded bg-electric/60" />
            <div className="h-3 w-16 rounded bg-white/30" />
          </div>

          {/* Org chart tree mock */}
          <div className="flex flex-col items-center gap-3">
            {/* CEO node */}
            <MockNode name="CEO" accent />
            <div className="w-px h-4 bg-electric/40" />

            {/* Level 2 */}
            <div className="flex items-start gap-6 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-electric/30" />
              <div className="flex flex-col items-center gap-3">
                <div className="w-px h-3 bg-electric/30" />
                <MockNode name="CTO" />
                <div className="w-px h-3 bg-electric/20" />
                <div className="flex gap-3">
                  <MockNodeSmall />
                  <MockNodeSmall />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-px h-3 bg-electric/30" />
                <MockNode name="VP Sales" />
                <div className="w-px h-3 bg-electric/20" />
                <div className="flex gap-3">
                  <MockNodeSmall />
                  <MockNodeSmall />
                  <MockNodeSmall />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-px h-3 bg-electric/30" />
                <MockNode name="CFO" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute -inset-4 bg-electric/5 rounded-2xl blur-2xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-electric/10 rounded-full blur-3xl -z-10" />
    </div>
  );
}

function MockNode({ name, accent }: { name: string; accent?: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${accent ? "bg-electric/20 border-electric/40" : "bg-white/10 border-white/15"}`}>
      <div className="w-6 h-6 rounded-full bg-white/20" />
      <div>
        <div className="text-[10px] font-medium text-white/90">{name}</div>
        <div className="h-1.5 w-10 rounded bg-white/15 mt-0.5" />
      </div>
    </div>
  );
}

function MockNodeSmall() {
  return (
    <div className="flex items-center gap-1.5 rounded-md px-2 py-1.5 bg-white/5 border border-white/10">
      <div className="w-4 h-4 rounded-full bg-white/15" />
      <div className="h-1.5 w-8 rounded bg-white/10" />
    </div>
  );
}
