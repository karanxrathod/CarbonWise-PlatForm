import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { 
  Bot, 
  LineChart as LineChartIcon, 
  Leaf, 
  Award, 
  Users, 
  TreePine, 
  Target, 
  ArrowRight, 
  Zap, 
  Bookmark, 
  Sparkles,
  Flame,
  Globe,
  TrendingDown,
  CheckCircle2
} from 'lucide-react';
import { UserFootprintData } from '../types';
import { CONSTANTS, calculateSustainabilityScore, getRiskLevel } from '../lib/calculations';

interface DashboardTabProps {
  calcResult: { breakdown: Record<string, number>; total: number };
  totalStreaks: number;
  data: UserFootprintData;
  committedActions: string[];
  t: any;
  lang: 'en' | 'hi';
  profileName: string;
  profileAvatar: string;
  profileTarget: number;
  isDarkMode: boolean;
}

export function DashboardTab({ 
  calcResult, 
  totalStreaks, 
  data, 
  committedActions, 
  t, 
  lang, 
  profileName,
  profileAvatar,
  profileTarget,
  isDarkMode 
}: DashboardTabProps) {
  
  // Refined Color Schemes according to user specifications
  const theme = {
    card: isDarkMode ? 'bg-[#131916] border-[#25302A] text-white shadow-md' : 'bg-white border-[#DDE5DF] text-[#1B2B24] shadow-sm',
    grid: isDarkMode ? '#25302A' : '#DDE5DF',
    greenAccent: isDarkMode ? '#2EAF6C' : '#1F7A4C',
  };

  const score = calculateSustainabilityScore(calcResult.total, totalStreaks);
  const monthlyActual = calcResult.total / 12;
  const targetCompletedPercent = Math.min((monthlyActual / profileTarget) * 100, 100);

  // Tree absorption math: 1 standard mature tree absorbs roughly 22kg CO2 per year
  const treeEquivalent = Math.max(1, Math.round(calcResult.total / 22));

  // Determine Grade based on score
  const getEcoGrade = (scoreVal: number) => {
    if (scoreVal >= 88) return { letter: 'A+', label: 'Elite Protectors', color: 'text-emerald-500 bg-emerald-500/10' };
    if (scoreVal >= 75) return { letter: 'A', label: 'Eco Guardian', color: 'text-green-500 bg-green-500/10' };
    if (scoreVal >= 60) return { letter: 'B', label: 'Active Warrior', color: 'text-yellow-500 bg-yellow-500/10' };
    if (scoreVal >= 40) return { letter: 'C', label: 'Conscious Learner', color: 'text-orange-500 bg-orange-500/10' };
    return { letter: 'D', label: 'Evolving Learner', color: 'text-red-500 bg-red-500/10' };
  };

  const grade = getEcoGrade(score);

  // Pie Chart Data mapping
  const pieData = [
    { name: t.transport, value: calcResult.breakdown.transport, color: isDarkMode ? '#4ADE80' : '#1F7A4C' },
    { name: t.homeEnergy, value: calcResult.breakdown.home, color: isDarkMode ? '#3B82F6' : '#2E8B57' },
    { name: t.diet, value: calcResult.breakdown.diet, color: isDarkMode ? '#F59E0B' : '#E28743' },
    { name: t.shopping, value: calcResult.breakdown.shopping, color: isDarkMode ? '#EF4444' : '#C84B31' },
  ].filter(d => d.value > 0);

  // Predictions Area Chart Data
  const predictionData = [
    { year: '2026', Projected: calcResult.total, Optimized: calcResult.total },
    { year: '2027', Projected: calcResult.total * 1.04, Optimized: calcResult.total * 0.92 },
    { year: '2028', Projected: calcResult.total * 1.08, Optimized: calcResult.total * 0.81 },
    { year: '2029', Projected: calcResult.total * 1.12, Optimized: calcResult.total * 0.72 },
    { year: '2030', Projected: calcResult.total * 1.15, Optimized: calcResult.total * 0.60 },
  ];

  // Specific high fidelity analytical insights list
  const customInsights = useMemo(() => {
    const list = [];
    if (calcResult.breakdown.transport > calcResult.total * 0.4) {
      list.push({
        id: '1',
        title: lang === 'hi' ? 'परिवहन उत्सर्जन अत्यधिक है' : 'Transport is your footprint hub',
        body: lang === 'hi'
          ? 'आपकी वार्षिक उत्सर्जन संरचना में परिवहन ४०% से अधिक भूमिका निभाता है। साप्ताहिक कार ड्राइव दूरी कम करने का विचार करें।'
          : `Transport accounts for ${Math.round(calcResult.breakdown.transport / calcResult.total * 100)}% of your annual emission bundle. Consider walking or cycling short distances.`,
        urgency: 'high'
      });
    }
    if (calcResult.breakdown.home > calcResult.total * 0.3) {
      list.push({
        id: '2',
        title: lang === 'hi' ? 'घरेलू ऊर्जा खपत विश्लेषण' : 'Optimize home energy patterns',
        body: lang === 'hi'
          ? 'घरेलू ऊर्जा आपकी वायुमंडल उत्सर्जन दरों को बढ़ा रही है। नवीकरणीय ऊर्जा स्रोतों (renewables) को एकीकृत करें।'
          : `Powering electronics and heaters represents a significant CO₂ share. Unplugging unused adaptors can shave off up to 12% in losses.`,
        urgency: 'medium'
      });
    }
    if (list.length === 0) {
      list.push({
        id: '3',
        title: 'Outstanding footprint consistency',
        body: 'Your emissions breakdown looks beautifully distributed. Enhance your streaks to lock down a permanent A+ score ranking!',
        urgency: 'low'
      });
    }
    return list;
  }, [calcResult, lang]);

  return (
    <div className="space-y-6">
      
      {/* FIRST ROW: PREMIUM KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Annual Emissions */}
        <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${theme.card}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6C7A73]">Total emissions</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[#1F7A4C] dark:text-[#2EAF6C]">
              <Leaf size={16} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight font-display">
              {Math.round(calcResult.total).toLocaleString()} 
            </span>
            <span className="text-xs text-[#6C7A73] dark:text-zinc-400 font-bold uppercase tracking-wide ml-1.5">kg CO₂e</span>
            <p className="text-[11px] text-[#6C7A73] font-medium mt-2 leading-tight">
              Anually • {calcResult.total < CONSTANTS.globalAverage ? 'Below global average' : 'Above global ceiling'}
            </p>
          </div>
        </div>

        {/* KPI 2: Monthly Target Status */}
        <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${theme.card}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6C7A73]">Monthly target limit</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Target size={16} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-baseline font-display">
              <span className="text-2xl font-extrabold">{Math.round(monthlyActual)} kg</span>
              <span className="text-xs text-[#6C7A73]">/ {profileTarget} kg limit</span>
            </div>
            
            {/* Progress Bar of month limits */}
            <div className="w-full bg-stone-100 dark:bg-[#1E2521] h-1.5 rounded-full mt-3 overflow-hidden border border-[#DDE5DF]/30 dark:border-transparent">
              <div 
                className={`h-full rounded-full transition-all duration-700 ${
                  targetCompletedPercent > 100 ? 'bg-red-500' : targetCompletedPercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${targetCompletedPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-[#6C7A73] mt-2 font-semibold">
              Currently {Math.round(targetCompletedPercent)}% of target limit
            </p>
          </div>
        </div>

        {/* KPI 3: Tree absorption equivalents */}
        <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${theme.card}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6C7A73]">Offset equivalent</span>
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
              <TreePine size={16} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-extrabold font-display">
              {treeEquivalent}
            </span>
            <span className="text-xs text-[#6C7A73] font-bold uppercase tracking-wide ml-1.5">mature trees</span>
            <p className="text-[11px] text-[#6C7A73] font-medium mt-2 leading-tight">
              Annual absorption required to offset your activities.
            </p>
          </div>
        </div>

        {/* KPI 4: Eco Score / Grade ranking */}
        <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden ${theme.card}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6C7A73]">Eco score rate</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
              <Award size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-sm border border-stone-200/20 ${grade.color}`}>
              {grade.letter}
            </div>
            <div>
              <span className="text-xl font-extrabold font-display">{score} pts</span>
              <p className="text-[10px] text-[#6C7A73] font-semibold uppercase tracking-wide">{grade.label}</p>
            </div>
          </div>
          <div className="w-full h-1 bg-stone-100 dark:bg-[#1C2520] rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-yellow-400" style={{ width: `${score}%` }} />
          </div>
        </div>

      </div>

      {/* SECOND ROW: ADVANCED ANALYTICS (BREAKDOWN & PROJECTION) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Emissions diagnosis breakdown (Donut representation) */}
        <div className={`lg:col-span-5 p-6 rounded-2xl border ${theme.card} flex flex-col justify-between`}>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#6C7A73] flex items-center gap-1.5 mb-2">
              <span>Diagnostics allocation</span>
            </h3>
            <p className="text-[11px] text-[#6C7A73]">
              Annual emissions percentage distributed across transport, shopping index, diet profile, and house utilities.
            </p>
          </div>

          <div className="h-60 relative flex items-center justify-center my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${Math.round(value)} kg CO₂`, 'Emissions']}
                  contentStyle={isDarkMode ? { backgroundColor: '#131916', borderColor: '#25302A', color: '#fff' } : { backgroundColor: '#fff', borderColor: '#DDE5DF', color: '#1B2B24' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend Circle text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-mono font-black">{Math.round(calcResult.total)}</span>
              <span className="text-[9px] uppercase tracking-wider text-[#6C7A73] font-bold">Total kg</span>
            </div>
          </div>

          {/* Color Guides list */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-stone-300/10 dark:bg-zinc-800/20 border border-[#DDE5DF]/30 dark:border-[#25302A]/20">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-[#6C7A73] dark:text-zinc-400 font-medium truncate max-w-[100px]">{d.name}</span>
                <span className="ml-auto font-mono font-bold text-[#1B2B24] dark:text-white">
                  {Math.round(d.value / calcResult.total * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Year Projection chart */}
        <div className={`lg:col-span-7 p-6 rounded-2xl border ${theme.card} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6C7A73] flex items-center gap-1.5">
                <LineChartIcon size={14} className="text-[#1F7A4C] dark:text-[#2EAF6C]" />
                <span>Advanced 5-Year Carbon Trajectory</span>
              </h3>
              <span className="text-[10px] bg-[#E8F3EC] dark:bg-emerald-950 text-[#1F7A4C] px-2 py-0.5 rounded font-extrabold uppercase">
                AI projection model
              </span>
            </div>
            <p className="text-[11px] text-[#6C7A73] mt-1.5">
              Comparing passive emissions trajectory (business as usual) vs taking proactive climate coach actions.
            </p>
          </div>

          <div className="h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="prjRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="optGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34D399" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} vertical={false} />
                <XAxis dataKey="year" stroke="#6C7A73" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6C7A73" fontSize={11} tickLine={false} axisLine={false} tickFormatter={val => `${(val/1000).toFixed(1)}t`} />
                <Tooltip 
                  contentStyle={isDarkMode ? { backgroundColor: '#131916', borderColor: '#25302A', color: '#fff' } : { backgroundColor: '#fff', borderColor: '#DDE5DF', color: '#1B2B24' }}
                  formatter={(value: number, name: string) => [`${Math.round(value)} kg`, name === 'Projected' ? 'Business as usual' : 'Optimized trajectory']}
                />
                <Area type="monotone" dataKey="Projected" stroke="#EF4444" fillOpacity={1} fill="url(#prjRed)" strokeWidth={2} />
                <Area type="monotone" dataKey="Optimized" stroke={theme.greenAccent} fillOpacity={1} fill="url(#optGreen)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-center text-[11px] text-[#6C7A73] mt-2 border-t border-stone-200/50 dark:border-[#25302A]/50 pt-2 font-medium">
            Accumulating action missions compound to save over <strong className="text-emerald-500">7,200 kg CO₂e</strong> by 2030.
          </p>
        </div>

      </div>

      {/* THIRD ROW: SUSTAINABILITY INSIGHTS & AI COACH CHALLENGE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Curated Insights */}
        <div className={`md:col-span-7 p-6 rounded-2xl border ${theme.card}`}>
          <h3 className="text-xs font-bold uppercase tracking-[#0.15em] text-[#6C7A73] mb-4">
            Curated sustainability analytics
          </h3>
          <div className="space-y-4">
            {customInsights.map(item => (
              <div 
                key={item.id}
                className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                  item.urgency === 'high' 
                    ? 'bg-red-500/5 border-red-500/15 text-[#1B2B24] dark:text-red-100'
                    : 'bg-[#E8F3EC]/25 border-[#1F7A4C]/15 text-[#1B2B24] dark:text-emerald-50'
                }`}
              >
                <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                  item.urgency === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-[#1F7A4C] dark:text-[#2EAF6C]'
                }`}>
                  <TrendingDown size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wide mb-1 opacity-90">{item.title}</h4>
                  <p className="text-xs leading-relaxed opacity-85">{item.body}</p>
                </div>
              </div>
            ))}

            {/* Smart Tip of the day */}
            <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/5 flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <h4 className="text-xs font-extrabold text-amber-600 dark:text-amber-500 uppercase tracking-wider mb-1">
                  Smart Tip of the Day
                </h4>
                <p className="text-xs text-[#6C7A73] leading-relaxed">
                  Keeping your home thermostat just 1 degree Celsius cooler during winter months can compress your home heating footprint by up to 10% annually. Perfect effortless action!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Advisor Prompt CTA card */}
        <div className={`md:col-span-5 p-6 rounded-2xl border relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-[#1F7A4C] to-[#0A2F1D] text-white shadow-xl`}>
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none transform scale-125">
            <Bot size={110} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold tracking-widest uppercase">
              <Sparkles size={11} className="text-amber-300 animate-pulse" />
              <span>Climate coach AI</span>
            </div>
            
            <h3 className="text-lg font-bold tracking-tight">Need a custom transition roadmap?</h3>
            <p className="text-emerald-100/80 text-xs mt-2 leading-relaxed">
              Our server-side LLM analyze your exact transportation distance, flight logs, and lifestyle numbers to compile a 4-week frictionless carbon reduction playbook.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider mb-3">
              Ready to reduce emissions?
            </p>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-emerald-200 flex items-center justify-between mb-4">
              <span>Try prompt: "Minimize Car commute CO2"</span>
              <Bot size={14} className="opacity-70" />
            </div>
          </div>
        </div>

      </div>

      {/* FOURTH ROW: CHALLENGES PROGRESS, LEADERBOARD, OFFSETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Habit tracker summary preview */}
        <div className={`p-6 rounded-2xl border ${theme.card}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#6C7A73]">Eco habits summary</h4>
            <span className="flex items-center gap-1.5 text-orange-500 font-mono text-xs font-bold bg-orange-500/10 px-2.5 py-1 rounded-full">
              <Flame size={14} />
              {totalStreaks} streaks
            </span>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-stone-300/10 dark:bg-zinc-800/20">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span className="truncate flex-1">Commuted by foot or public transit</span>
              <span className="font-mono font-bold opacity-60">Active habit</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-xl bg-stone-300/10 dark:bg-zinc-800/20">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span className="truncate flex-1">Consumed complete plant meal</span>
              <span className="font-mono font-bold opacity-60">Active habit</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-xl opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-4 h-4 rounded-full border border-stone-400 shrink-0" />
              <span className="truncate flex-1">Limit luxury shopping order metrics</span>
              <span className="font-mono font-bold text-stone-500">Uncompleted</span>
            </div>
          </div>
        </div>

        {/* Global Leaderboard summary preview */}
        <div className={`p-6 rounded-2xl border ${theme.card}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#6C7A73]">Leaderboard preview</h4>
            <span className="text-[10px] bg-stone-200/50 dark:bg-zinc-800 text-[#6C7A73] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Users size={12} strokeWidth={2.5} />
              Community
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-1.5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold font-mono opacity-50">#1</span>
                <span>Elena R. 🇪🇸</span>
              </div>
              <span className="font-mono font-bold text-[#1F7A4C] dark:text-[#2EAF6C]">92 pts</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded-lg border border-[#1F7A4C]/30 bg-[#E8F3EC]/50 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2">
                <span className="font-bold font-mono text-[#1F7A4C] dark:text-[#2EAF6C]">#2</span>
                <span className="font-bold">{profileName} (You) {profileAvatar}</span>
              </div>
              <span className="font-mono font-bold text-[#1F7A4C] dark:text-[#2EAF6C]">{score} pts</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-bold font-mono opacity-50">#3</span>
                <span>Koji M. 🇯🇵</span>
              </div>
              <span className="font-mono font-bold">88 pts</span>
            </div>
          </div>
        </div>

        {/* Certified Offset ideas */}
        <div className={`p-6 rounded-2xl border ${theme.card}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#6C7A73]">Offset suggestions</h4>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded uppercase">
              Certified
            </span>
          </div>

          <div className="space-y-3 text-xs flex flex-col justify-between h-[100px]">
            <div>
              <p className="font-bold text-[#1F7A4C] dark:text-[#2EAF6C]">1. Blue Carbon Mangrove Reforestation</p>
              <p className="text-[11px] text-[#6C7A73] mt-0.5 leading-snug">Restores saltmarshes in Myanmar to absorb 5x more carbon than land forests.</p>
            </div>
            <div className="text-right">
              <a 
                href="https://www.goldstandard.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-extrabold text-[#1F7A4C] dark:text-[#2EAF6C] hover:underline"
              >
                Browse Gold Standard Offsets →
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
