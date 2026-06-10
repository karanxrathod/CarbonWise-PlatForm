import { useState, useEffect } from 'react';
import { Info, RefreshCw } from 'lucide-react';

const FACTS: readonly string[] = [
  "1 ton of CO2 is equivalent to the volume of a 3-story house.",
  "Eating a plant-based diet can reduce your food-related emissions by up to 73%.",
  "A single round-trip transatlantic flight can emit as much CO2 as an average person does in a year.",
  "Replacing just 1 incandescent properly with an LED saves 50kg of CO2 per year.",
  "The internet accounts for about 3.7% of global greenhouse emissions.",
];

/**
 * Renders an interactive, accessibility-compliant animated sustainability trivia indicator.
 * Provides standard rotation intervals along with keyboard-reachable manual review controls.
 */
export function MicroContent() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  useEffect(() => {
    if (!isRotating) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % FACTS.length);
    }, 10000); // rotate every 10 seconds
    return () => clearInterval(timer);
  }, [isRotating]);

  const handleNextFact = (): void => {
    setCurrentIndex(prev => (prev + 1) % FACTS.length);
    // Pause automatic rotation temporarily on manual interaction for accessibility
    setIsRotating(false);
  };

  return (
    <div 
      className="bg-emerald-950/80 border-b border-emerald-900/50 py-2"
      role="region"
      aria-label="Sustainability Trivia Carousel"
    >
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between gap-3 text-xs md:text-sm text-emerald-300">
        <div className="flex items-center gap-3 overflow-hidden">
          <Info size={16} className="text-emerald-500 shrink-0" aria-hidden="true" />
          <p className="font-medium animate-in fade-in slide-in-from-right-4 duration-500 truncate" key={currentIndex}>
            <span className="opacity-70 uppercase tracking-widest text-[10px] mr-2">Did You Know?</span>
            {FACTS[currentIndex]}
          </p>
        </div>
        <button
          id="trivia-rotate-button"
          onClick={handleNextFact}
          className="p-1 px-2 rounded hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-200 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400 flex items-center gap-1.5 cursor-pointer shrink-0"
          title="Show next eco fact"
          aria-label="Show next eco fact"
        >
          <span className="text-[10px] hidden sm:inline">Next Fact</span>
          <RefreshCw size={13} className={isRotating ? "" : "opacity-80"} />
        </button>
      </div>
    </div>
  );
}

