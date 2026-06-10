import { useState, useMemo } from 'react';
import { Leaf, Activity, LayoutDashboard, Target, Trophy } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserFootprintData, TabId } from './types';
import { calculateFootprint, calculateSustainabilityScore } from './lib/calculations';
import { CalculatorTab } from './components/CalculatorTab';
import { DashboardTab } from './components/DashboardTab';
import { InsightsTab } from './components/InsightsTab';
import { TrackerTab } from './components/TrackerTab';
import { CommunityTab } from './components/CommunityTab';
import { MicroContent } from './components/MicroContent';

const DEFAULT_DATA: UserFootprintData = {
  transport: { carKmPerWeek: 100, shortFlightsPerYear: 1, longFlightsPerYear: 0, publicTransitUse: 'Rarely' },
  home: { electricityKwhPerMonth: 250, gasUsage: 50, renewablePercent: 0 },
  diet: 'moderate',
  shopping: { onlineOrdersPerMonth: 4, newClothesPerMonth: 2, electronicsPerYear: 1 }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('calculator');
  const [data, setData] = useLocalStorage<UserFootprintData>('carbonwise_data', DEFAULT_DATA);
  const [committedActions, setCommittedActions] = useLocalStorage<string[]>('carbonwise_actions', []);
  const [habitsData, setHabitsData] = useLocalStorage<Record<string, {streak: number, lastDone: string | null}>>('carbonwise_habits', {});

  const calcResult = useMemo(() => calculateFootprint(data), [data]);
  
  const totalStreaks = useMemo(() => 
    Object.values(habitsData || {}).reduce((sum, h: any) => sum + (h?.streak || 0), 0), 
  [habitsData]);
  
  const sustainabilityScore = useMemo(() => 
    calculateSustainabilityScore(calcResult.total, totalStreaks), 
  [calcResult.total, totalStreaks]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-950/40 border-green-500/50';
    if (score >= 60) return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/50';
    if (score >= 40) return 'text-yellow-400 bg-yellow-950/40 border-yellow-500/50';
    return 'text-orange-400 bg-orange-950/40 border-orange-500/50';
  };

  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: 'calculator', label: 'Calculator', icon: Leaf },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'actions', label: 'Actions', icon: Target },
    { id: 'tracker', label: 'Tracker', icon: Activity },
    { id: 'community', label: 'Community', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-emerald-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-emerald-950/80 backdrop-blur-md border-b border-emerald-800 shrink-0">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-emerald-950">
              <Leaf size={20} strokeWidth={2.5} aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-tight tracking-tight">CarbonWise</h1>
              <p className="text-[10px] text-emerald-300 font-medium uppercase tracking-wider">Track. Understand. Act.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-emerald-400/80 font-medium uppercase tracking-widest">Global Score</span>
              <span className="font-mono text-sm">{Math.round(calcResult.total).toLocaleString()} kg CO₂</span>
            </div>
            <div className={`flex flex-col items-center justify-center p-2 rounded-xl border ${getScoreColor(sustainabilityScore)} min-w-[3rem] shadow-lg`} aria-label={`Sustainability Score: ${sustainabilityScore} out of 100`}>
              <span className="text-xl font-black leading-none">{sustainabilityScore}</span>
              <span className="text-[9px] uppercase font-bold opacity-80 mt-1">Score</span>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="max-w-5xl mx-auto px-4 overflow-x-auto pb-1 hide-scrollbar" aria-label="Main Navigation">
          <ul className="flex items-center gap-1 min-w-max" role="tablist">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${tab.id}-panel`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-colors duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isActive 
                        ? 'bg-emerald-900/50 text-emerald-300 border-b-2 border-emerald-400' 
                        : 'text-emerald-100/60 hover:text-emerald-100 hover:bg-emerald-900/30 border-b-2 border-transparent'
                    }`}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {tab.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <MicroContent />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8" id="main-content">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both" role="tabpanel" id={`${activeTab}-panel`}>
          {activeTab === 'calculator' && <CalculatorTab data={data} setData={setData} calcResult={calcResult} />}
          {activeTab === 'dashboard' && <DashboardTab calcResult={calcResult} totalStreaks={totalStreaks} data={data} committedActions={committedActions} />}
          {activeTab === 'actions' && <InsightsTab data={data} calcResult={calcResult} committedActions={committedActions} setCommittedActions={setCommittedActions} />}
          {activeTab === 'tracker' && <TrackerTab habitsData={habitsData} setHabitsData={setHabitsData} />}
          {activeTab === 'community' && <CommunityTab calcResult={calcResult} sustainabilityScore={sustainabilityScore} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="shrink-0 border-t border-emerald-900/50 bg-emerald-950/50 text-center py-6 mt-8">
        <p className="text-emerald-400/60 text-sm font-medium flex items-center justify-center gap-1.5">
          <Leaf size={14} aria-hidden="true" /> Powered by CarbonWise
        </p>
        <p className="text-emerald-400/40 text-xs mt-1">Data sources: IPCC, EPA estimates</p>
      </footer>
    </div>
  );
}
