/**
 * MoonPhase - Visual moon phase display
 * 
 * READS FROM: HijriContext (single source of truth)
 * NO independent calculations allowed
 */

import { useHijri } from "@/contexts/HijriContext";

export function MoonPhase() {
  const { moon } = useHijri();

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        {/* Moon background */}
        <div className="absolute inset-0 rounded-full bg-muted overflow-hidden">
          {/* Moon surface texture */}
          <div 
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle at 30% 30%, hsl(var(--gold-light)) 0%, transparent 50%),
                          radial-gradient(circle at 70% 60%, hsl(var(--gold-light) / 0.5) 0%, transparent 30%),
                          radial-gradient(circle at 50% 80%, hsl(var(--muted-foreground) / 0.2) 0%, transparent 20%)`
            }}
          />
        </div>
        
        {/* Illuminated portion */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `linear-gradient(${moon.isWaxing ? '90deg' : '-90deg'}, 
              hsl(var(--gold-light)) ${moon.illumination}%, 
              transparent ${moon.illumination}%)`
          }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at ${moon.isWaxing ? '30%' : '70%'} 40%, 
                hsl(var(--gold)) 0%, 
                hsl(var(--gold-light)) 50%, 
                hsl(var(--gold-dark)) 100%)`
            }}
          />
        </div>

        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full animate-pulse-slow"
          style={{
            background: 'transparent',
            boxShadow: `0 0 ${20 + moon.illumination / 5}px hsl(var(--gold) / ${0.2 + moon.illumination / 200})`
          }}
        />
      </div>

    </div>
  );
}
