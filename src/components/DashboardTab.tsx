import { CONSTANTS, getRiskLevel, calculateSustainabilityScore, generateInsights, calculateFootprint } from '../lib/calculations';
import { UserFootprintData } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Bot, LineChart as LineChartIcon, Medal } from 'lucide-react';

interface DashboardTabProps {
  calcResult: ReturnType<typeof calculateFootprint>;
  totalStreaks: number;
  data: UserFootprintData;
  committedActions: string[];
}

export function DashboardTab({ calcResult, totalStreaks, data, committedActions }: DashboardTabProps) {
  const pieData = [
    { name: 'Transport', value: calcResult.breakdown.transport, color: '#34d399' },
    { name: 'Home Energy', value: calcResult.breakdown.home, color: '#60a5fa' },
    { name: 'Diet', value: calcResult.breakdown.diet, color: '#fbbf24' },
    { name: 'Shopping', value: calcResult.breakdown.shopping, color: '#f87171' },
  ].filter(d => d.value > 0);

  const riskLevel = getRiskLevel(calcResult.total);
  const score = calculateSustainabilityScore(calcResult.total, totalStreaks);

  const insights = generateInsights(data, calcResult);
  // Calculate potential savings based on committed actions, or if none, all actions potential
  const activeSavings = committedActions.length > 0 
    ? insights.filter(i => committedActions.includes(i.id)).reduce((acc, curr) => acc + curr.impactKg, 0)
    : insights.reduce((acc, curr) => acc + curr.impactKg, 0);

  const futureTotal = Math.max(0, calcResult.total - activeSavings);

  // Advanced Predictor Model Data
  const predictionData = [
    { year: new Date().getFullYear(), projected: calcResult.total, optimized: calcResult.total },
    { year: new Date().getFullYear() + 1, projected: calcResult.total * 1.05, optimized: futureTotal },
    { year: new Date().getFullYear() + 2, projected: calcResult.total * 1.10, optimized: futureTotal * 0.95 },
    { year: new Date().getFullYear() + 3, projected: calcResult.total * 1.15, optimized: futureTotal * 0.88 },
    { year: new Date().getFullYear() + 4, projected: calcResult.total * 1.20, optimized: futureTotal * 0.8 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top row: Grade & Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
            <Medal size={160} />
          </div>
          <div>
            <p className="text-sm text-emerald-300 font-medium uppercase tracking-wider mb-1">CarbonWise Score</p>
            <h3 className="text-2xl font-bold">Sustainability Rating</h3>
          </div>
          
          <div className="mt-4 flex items-end gap-4">
            <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-lg border ${
              score >= 80 ? 'bg-green-500/20 text-green-300 border-green-500/50' :
              score >= 60 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' :
              score >= 40 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50' :
              'bg-orange-500/20 text-orange-300 border-orange-500/50'
            }`}>
              <span className="text-4xl font-black leading-none">{score}</span>
            </div>
            <div className="pb-2">
              <p className="text-sm text-emerald-100/70">Top {(200 - score).toFixed(0)}% globally</p>
              <div className="w-full h-2 mt-2 bg-emerald-950 rounded-full overflow-hidden w-32 border border-emerald-800">
                 <div className="h-full bg-emerald-400" style={{ width: `${score}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Carbon Twin Card */}
        <div className="bg-gradient-to-br from-emerald-800/40 to-emerald-950/60 border border-emerald-700/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Bot size={20} />
            </div>
          </div>
          <p className="text-sm text-emerald-300 font-medium uppercase tracking-wider mb-2">AI Carbon Twin</p>
          <h3 className="text-lg font-bold mb-4">Future Projection Model</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-emerald-100/70">Current Annual Total</span>
                <span className="font-mono">{Math.round(calcResult.total)} kg</span>
              </div>
              <div className="w-full h-1.5 bg-emerald-950 rounded-full"><div className="h-full bg-red-400 rounded-full" style={{width: '60%'}}></div></div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-emerald-100/70">With Coach Actions</span>
                <span className="font-mono text-emerald-300">{Math.round(futureTotal)} kg</span>
              </div>
              <div className="w-full h-1.5 bg-emerald-950 rounded-full"><div className="h-full bg-green-400 rounded-full" style={{width: `${(futureTotal/calcResult.total)*60}%`}}></div></div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-emerald-800/50 text-xs text-emerald-400/80">
            {committedActions.length > 0 
              ? `You are committed to reducing ${Math.round(activeSavings)} kg CO₂ per year.`
              : 'Commit to Insights actions to improve your Twin\'s future.'}
          </div>
        </div>
      </div>

      {/* Advanced Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Breakdown Donut */}
        <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6">Emissions Diagnostics</h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${Math.round(value)} kg`, 'Emissions']}
                  contentStyle={{ backgroundColor: '#022c22', borderColor: '#064e3b', color: '#fff', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-2xl font-bold font-mono">{Math.round(calcResult.total)}</span>
               <span className="text-xs text-emerald-400">Total kg</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                <span className="text-emerald-100/80">{d.name}</span>
                <span className="ml-auto font-mono text-emerald-100/50">{Math.round(d.value / calcResult.total * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Projection Chart */}
        <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2"><LineChartIcon size={18} className="text-emerald-400" /> Advanced 5-Year Projection</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                <XAxis dataKey="year" stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#10b981" fontSize={12} tickLine={false} axisLine={false} tickFormatter={val => `${(val/1000).toFixed(1)}t`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#022c22', borderColor: '#064e3b', color: '#fff', borderRadius: '8px' }}
                  formatter={(value: number, name: string) => [`${Math.round(value)} kg`, name === 'projected' ? 'Business as usual' : 'Optimized Model']}
                />
                <Area type="monotone" dataKey="projected" stroke="#ef4444" fillOpacity={1} fill="url(#colorProjected)" strokeWidth={2} />
                <Area type="monotone" dataKey="optimized" stroke="#10b981" fillOpacity={1} fill="url(#colorOptimized)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-emerald-400/80 mt-4">
            Visualizing the compound effect of taking action vs passive trajectory based on your data engine.
          </p>
        </div>

      </div>
    </div>
  );
}
