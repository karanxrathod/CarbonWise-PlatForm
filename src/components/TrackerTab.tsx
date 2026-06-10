import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flame, CheckCircle, Circle, Target } from 'lucide-react';

interface TrackerTabProps {
  habitsData: Record<string, { streak: number, lastDone: string | null }>;
  setHabitsData: (fn: (d: Record<string, { streak: number, lastDone: string | null }>) => Record<string, { streak: number, lastDone: string | null }>) => void;
}

const HABITS = [
  { id: 'h1', label: 'Used public transport or walked/cycled' },
  { id: 'h2', label: 'Ate a fully plant-based meal today' },
  { id: 'h3', label: 'Avoided all single-use plastics' },
  { id: 'h4', label: 'Unplugged unused devices' },
  { id: 'h5', label: 'Limited shower time to 5 mins' },
  { id: 'h6', label: 'Brought a reusable cup/bottle' },
  { id: 'h7', label: 'Sorted recycling and compost' },
];

export function TrackerTab({ habitsData, setHabitsData }: TrackerTabProps) {
  const todayDate = new Date().toISOString().split('T')[0];
  const [justLeveledUp, setJustLeveledUp] = useState<string | null>(null);

  const handleToggleHabit = (id: string, currentlyDoneToday: boolean) => {
    setHabitsData(prev => {
      const current = prev[id] || { streak: 0, lastDone: null };
      const newStreak = currentlyDoneToday ? Math.max(0, current.streak - 1) : current.streak + 1;
      const newLastDone = currentlyDoneToday ? null : todayDate; // Simplified logic
      
      if (!currentlyDoneToday && newStreak === 7) {
        setJustLeveledUp(id);
        triggerConfetti();
      }

      return {
        ...prev,
        [id]: { streak: newStreak, lastDone: newLastDone }
      };
    });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#34d399', '#10b981', '#059669', '#facc15']
    });
  };

  useEffect(() => {
    if (justLeveledUp) {
      const t = setTimeout(() => setJustLeveledUp(null), 3000);
      return () => clearTimeout(t);
    }
  }, [justLeveledUp]);

  const totalStreaks = Object.values(habitsData).reduce((sum, h) => sum + (h.streak || 0), 0);
  const maxPossibleStreakToday = HABITS.length * 7; // Weekly target benchmark
  const progressPercent = Math.min((totalStreaks / maxPossibleStreakToday) * 100, 100);

  // Dynamic weekly mission (just display elements based on total streaks for 'smart' feel)
  const currentMission = totalStreaks < 5 
    ? "Awaken your eco-consciousness: Achieve 5 combined habit streaks." 
    : totalStreaks < 15
    ? "Momentum building: Reach 15 active habit streaks for a major impact."
    : "Sustainability Master class: Maintain all positive habits for the week.";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Weekly Progress Header */}
      <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm text-center">
        <h2 className="text-xl font-bold mb-4">Carbon Defense Progress</h2>
        <div className="relative h-6 bg-emerald-950 rounded-full overflow-hidden mb-2 border border-emerald-800">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-emerald-100/60 font-mono font-medium uppercase tracking-wider mb-6">
          <span>0 pts</span>
          <span>Target Milestone</span>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-800 text-left p-4 rounded-xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
             <Target size={20} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-400/80 font-bold">Personalized Weekly Mission</span>
            <p className="text-emerald-100 mt-1 font-medium">{currentMission}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HABITS.map(habit => {
          const data = habitsData[habit.id] || { streak: 0, lastDone: null };
          const isDoneToday = data.lastDone === todayDate;

          return (
            <button 
              key={habit.id}
              onClick={() => handleToggleHabit(habit.id, isDoneToday)}
              aria-pressed={isDoneToday}
              className={`group flex items-center p-4 rounded-xl border text-left cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isDoneToday 
                  ? 'bg-emerald-800/60 border-emerald-500/40 shadow-inner' 
                  : 'bg-emerald-900/20 border-emerald-800/50 hover:bg-emerald-800/30'
              }`}
            >
              <div className="mr-4 text-emerald-400 shrink-0">
                {isDoneToday ? <CheckCircle size={24} className="text-emerald-300" aria-hidden="true" /> : <Circle size={24} className="text-emerald-600 group-hover:text-emerald-500" aria-hidden="true" />}
              </div>
              
              <div className="flex-1">
                <p className={`font-medium transition-colors ${isDoneToday ? 'text-emerald-100' : 'text-emerald-100/70'}`}>
                  {habit.label}
                </p>
              </div>

              <div className="flex items-center gap-1.5 ml-4 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-800/50 shrink-0" aria-label={`Current streak: ${data.streak} days`}>
                <Flame size={16} className={data.streak > 0 ? "text-orange-400" : "text-emerald-800"} aria-hidden="true" />
                <span className={`font-mono font-bold ${data.streak > 0 ? 'text-orange-400' : 'text-emerald-700'}`}>
                  {data.streak}
                </span>
              </div>
            </button>
          )
        })}
      </div>

    </div>
  );
}
