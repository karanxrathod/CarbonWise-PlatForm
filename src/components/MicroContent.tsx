import { useState, useEffect } from 'react';
import { Info, RefreshCw } from 'lucide-react';

const FACTS = [
  "1 ton of CO2 is equivalent to the volume of a 3-story house.",
  "Eating a plant-based diet can reduce your food-related emissions by up to 73%.",
  "A single round-trip transatlantic flight can emit as much CO2 as an average person does in a year.",
  "Replacing just 1 incandescent properly with an LED saves 50kg of CO2 per year.",
  "The internet accounts for about 3.7% of global greenhouse emissions.",
];

export function MicroContent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % FACTS.length);
    }, 10000); // rotate every 10 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-emerald-950/80 border-b border-emerald-900/50 py-2">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-3 text-xs md:text-sm text-emerald-300">
        <Info size={16} className="text-emerald-500 shrink-0" />
        <p className="font-medium animate-in fade-in slide-in-from-right-4 duration-500 truncate" key={currentIndex}>
          <span className="opacity-70 uppercase tracking-widest text-[10px] mr-2">Did You Know?</span>
          {FACTS[currentIndex]}
        </p>
      </div>
    </div>
  );
}
