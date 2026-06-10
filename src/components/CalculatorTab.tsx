import { UserFootprintData } from '../types';
import { CONSTANTS } from '../lib/calculations';
import { Car, Home, Utensils, ShoppingBag, Eye, Star, Info, Bookmark } from 'lucide-react';

interface CalculatorTabProps {
  data: UserFootprintData;
  setData: (fn: (d: UserFootprintData) => UserFootprintData) => void;
  calcResult: { breakdown: Record<string, number>; total: number };
  t: any;
  lang: 'en' | 'hi';
  isDarkMode: boolean;
}

export function CalculatorTab({ data, setData, calcResult, t, lang, isDarkMode }: CalculatorTabProps) {
  
  const updateData = <K extends keyof UserFootprintData>(
    category: K,
    field: keyof UserFootprintData[K],
    value: any
  ) => {
    setData((prev) => ({
      ...prev,
      [category]: {
        ...((prev[category] as any) || {}),
        [field]: value,
      },
    }));
  };

  const updateDiet = (value: UserFootprintData['diet']) => {
    setData(prev => ({ ...prev, diet: value }));
  };

  const targetPercentage = Math.min((calcResult.total / (CONSTANTS.globalAverage * 1.5)) * 100, 100);
  
  // Custom Color definitions based on score
  const strokeColor = calcResult.total <= CONSTANTS.parisTarget 
    ? '#10B981' // Green
    : calcResult.total <= CONSTANTS.globalAverage 
      ? '#F59E0B' // Amber/Yellow
      : '#EF4444'; // Red

  // Grid/Theme styling classes
  const theme = {
    card: isDarkMode ? 'bg-[#131916] border-[#25302A] text-white' : 'bg-white border-[#DDE5DF] text-[#1B2B24]',
    input: isDarkMode 
      ? 'bg-[#1C2520] border-[#2E3C34] focus:ring-[#2EAF6C] text-white focus:border-transparent' 
      : 'bg-[#F2F5F3] border-[#DDE5DF] text-[#1B2B24] focus:ring-[#1F7A4C] focus:border-transparent',
    badge: isDarkMode ? 'bg-[#1C2520] text-[#2EAF6C] border-[#2E3C34]' : 'bg-[#E8F3EC] text-[#1F7A4C] border-[#1F7A4C]/15',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        
        {/* Category: Transport */}
        <div className={`p-6 rounded-2xl border transition-all ${theme.card}`}>
          <h2 className="text-md md:text-lg font-extrabold tracking-tight mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <Car className="text-[#1F7A4C] dark:text-[#2EAF6C]" />
              {t.transport}
            </span>
            <span className="text-xs uppercase font-bold text-[#6C7A73] dark:text-zinc-400 font-mono">
              Vehicle & Air logs
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <label htmlFor="carKm" className="block text-[#6C7A73] mb-1.5">{t.carTravel}</label>
              <input 
                id="carKm" type="number" min="0" max="5000" step="1"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${theme.input}`}
                value={data.transport?.carKmPerWeek ?? 0}
                onChange={(e) => updateData('transport', 'carKmPerWeek', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="publicTransit" className="block text-[#6C7A73] mb-1.5">{t.publicTransit}</label>
              <select 
                id="publicTransit"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all appearance-none ${theme.input}`}
                value={data.transport?.publicTransitUse || 'Never'}
                onChange={(e) => updateData('transport', 'publicTransitUse', e.target.value as any)}
              >
                <option value="Never">{t.never}</option>
                <option value="Rarely">{t.rarely}</option>
                <option value="Regularly">{t.regularly}</option>
                <option value="Daily">{t.daily}</option>
              </select>
            </div>
            <div>
              <label htmlFor="shortFlights" className="block text-[#6C7A73] mb-1.5">{t.shortFlights}</label>
              <input 
                id="shortFlights" type="number" min="0" max="365" step="1"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${theme.input}`}
                value={data.transport?.shortFlightsPerYear ?? 0}
                onChange={(e) => updateData('transport', 'shortFlightsPerYear', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="longFlights" className="block text-[#6C7A73] mb-1.5">{t.longFlights}</label>
              <input 
                id="longFlights" type="number" min="0" max="365" step="1"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${theme.input}`}
                value={data.transport?.longFlightsPerYear ?? 0}
                onChange={(e) => updateData('transport', 'longFlightsPerYear', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Category: Home Energy */}
        <div className={`p-6 rounded-2xl border transition-all ${theme.card}`}>
          <h2 className="text-md md:text-lg font-extrabold tracking-tight mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <Home className="text-[#1F7A4C] dark:text-[#2EAF6C]" />
              {t.homeEnergy}
            </span>
            <span className="text-xs uppercase font-bold text-[#6C7A73] dark:text-zinc-400 font-mono">
              Utilities & Clean grid
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <label htmlFor="elec" className="block text-[#6C7A73] mb-1.5">{t.electricity}</label>
              <input 
                id="elec" type="number" min="0" max="50000" step="1"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${theme.input}`}
                value={data.home?.electricityKwhPerMonth ?? 0}
                onChange={(e) => updateData('home', 'electricityKwhPerMonth', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="gas" className="block text-[#6C7A73] mb-1.5">{t.gasUsage}</label>
              <input 
                id="gas" type="number" min="0" max="10000" step="1"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${theme.input}`}
                value={data.home?.gasUsage ?? 0}
                onChange={(e) => updateData('home', 'gasUsage', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between text-[#6C7A73] mb-2 text-xs">
                <span>{t.renewableEnergy}</span>
                <span className="font-bold text-[#1F7A4C] dark:text-[#2EAF6C]">{data.home?.renewablePercent || 0}% clean mix</span>
              </div>
              <input 
                id="renewable" type="range" min="0" max="100" 
                className="w-full accent-[#1F7A4C] dark:accent-[#2EAF6C] cursor-pointer"
                value={data.home?.renewablePercent || 0}
                onChange={(e) => updateData('home', 'renewablePercent', Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Category: Diet */}
        <div className={`p-6 rounded-2xl border transition-all ${theme.card}`}>
          <h2 className="text-md md:text-lg font-extrabold tracking-tight mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <Utensils className="text-[#1F7A4C] dark:text-[#2EAF6C]" />
              {t.diet}
            </span>
            <span className="text-xs uppercase font-bold text-[#6C7A73] dark:text-zinc-400 font-mono">
              Meat & Green calories
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'heavy', label: t.heavyMeat },
              { id: 'moderate', label: t.moderate },
              { id: 'vegetarian', label: t.vegetarian },
              { id: 'vegan', label: t.vegan },
            ].map(d => (
              <button
                key={d.id}
                type="button"
                onClick={() => updateDiet(d.id as any)}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  data.diet === d.id 
                    ? 'bg-[#1F7A4C] text-white border-[#1F7A4C] shadow-md scale-102 font-extrabold' 
                    : (isDarkMode 
                        ? 'bg-[#1C2520] border-[#25302A] text-zinc-300 hover:bg-[#25302A]' 
                        : 'bg-[#F2F5F3] border-[#DDE5DF] text-[#1B2B24] hover:bg-stone-100')
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category: Shopping */}
        <div className={`p-6 rounded-2xl border transition-all ${theme.card}`}>
          <h2 className="text-md md:text-lg font-extrabold tracking-tight mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <ShoppingBag className="text-[#1F7A4C] dark:text-[#2EAF6C]" />
              {t.shopping}
            </span>
            <span className="text-xs uppercase font-bold text-[#6C7A73] dark:text-zinc-400 font-mono">
              Online packages & Gear
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
            <div>
              <label htmlFor="orders" className="block text-[#6C7A73] mb-1.5">{t.onlineOrders}</label>
              <input 
                id="orders" type="number" min="0" max="500" step="1"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${theme.input}`}
                value={data.shopping?.onlineOrdersPerMonth ?? 0}
                onChange={(e) => updateData('shopping', 'onlineOrdersPerMonth', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="clothes" className="block text-[#6C7A73] mb-1.5">{t.newClothes}</label>
              <input 
                id="clothes" type="number" min="0" max="500" step="1"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${theme.input}`}
                value={data.shopping?.newClothesPerMonth ?? 0}
                onChange={(e) => updateData('shopping', 'newClothesPerMonth', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="electronics" className="block text-[#6C7A73] mb-1.5">{t.electronics}</label>
              <input 
                id="electronics" type="number" min="0" max="250" step="1"
                className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${theme.input}`}
                value={data.shopping?.electronicsPerYear ?? 0}
                onChange={(e) => updateData('shopping', 'electronicsPerYear', e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>
        </div>

      </div>

      {/* STICKY STATUS & COMPLIANCE HUD */}
      <div className="lg:col-span-1">
        <div className={`sticky top-24 rounded-2xl border p-6 flex flex-col items-center transition-all ${theme.card}`}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#6C7A73] mb-1">
            {t.annualFootprint}
          </h3>
          <p className="text-[11px] text-[#6C7A73] mb-4 text-center">
            Dynamically compiling based on lifestyle coefficients.
          </p>
          
          <div className="relative w-44 h-44 my-4 flex items-center justify-center">
            {/* Circular Gauge Background */}
            <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="41"
                fill="transparent"
                stroke={isDarkMode ? '#1C2520' : '#E8F3EC'}
                strokeWidth="7"
              />
              <circle
                cx="50" cy="50" r="41"
                fill="transparent"
                stroke={strokeColor}
                strokeWidth="7"
                strokeDasharray="257.6"
                strokeDashoffset={257.6 - (257.6 * targetPercentage) / 100}
                className="transition-all duration-700 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10 flex flex-col items-center">
              <span className="text-2xl font-black font-mono tracking-tighter" style={{ color: strokeColor }}>
                {Math.round(calcResult.total).toLocaleString()}
              </span>
              <span className="text-[10px] text-[#6C7A73] font-bold uppercase tracking-wider">kg CO₂e / yr</span>
            </div>
          </div>

          <div className="w-full space-y-3.5 mt-5 text-xs text-[#6C7A73] font-bold">
            <div className="flex justify-between items-center py-2.5 border-b border-stone-200/50 dark:border-[#25302A]/50">
              <span className="text-[#6C7A73] font-medium">{lang === 'hi' ? 'वार्षिक कुल भार' : 'Annual CO₂ Bundle'}</span>
              <span className="font-mono text-[#1B2B24] dark:text-white font-extrabold">{(calcResult.total / 1000).toFixed(2)} t / year</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-stone-200/50 dark:border-[#25302A]/50">
              <span className="text-[#6C7A73] font-medium">{t.nationalAvgCompare}</span>
              <span className="font-mono text-[#1B2B24] dark:text-white font-extrabold">{(CONSTANTS.globalAverage / 1000).toFixed(2)} t</span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-[#6C7A73] font-medium">{t.parisTargetCompare}</span>
              <span className="font-mono text-[#1B2B24] dark:text-white font-extrabold text-emerald-500">{(CONSTANTS.parisTarget / 1000).toFixed(2)} t</span>
            </div>
          </div>

          {/* Compliance Card notification below */}
          <div className="mt-6 p-4 rounded-xl text-center bg-stone-300/10 dark:bg-zinc-800/10 border border-[#DDE5DF]/30 dark:border-[#25302A]/20">
            <span className="text-lg">🌍</span>
            <p className="text-[11px] text-[#6C7A73] leading-normal font-semibold mt-1.5">
              {calcResult.total <= CONSTANTS.parisTarget 
                ? t.wellDone 
                : calcResult.total <= CONSTANTS.globalAverage 
                  ? t.keepImproving 
                  : t.highAlert}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
