import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flame, CheckCircle, Circle, Target, Trophy, HelpCircle, Dumbbell } from 'lucide-react';

interface TrackerTabProps {
  habitsData: Record<string, { streak: number, lastDone: string | null }>;
  setHabitsData: (fn: (d: Record<string, { streak: number, lastDone: string | null }>) => Record<string, { streak: number, lastDone: string | null }>) => void;
  t: any;
  lang: 'en' | 'hi';
  isDarkMode: boolean;
}

const HABITS = [
  { id: 'h1', key: 'habit1', category: 'transport', xp: 15 },
  { id: 'h2', key: 'habit2', category: 'diet', xp: 20 },
  { id: 'h3', key: 'habit3', category: 'waste', xp: 10 },
  { id: 'h4', key: 'habit4', category: 'home', xp: 15 },
  { id: 'h5', key: 'habit5', category: 'water', xp: 10 },
  { id: 'h6', key: 'habit6', category: 'waste', xp: 12 },
  { id: 'h7', key: 'habit7', category: 'waste', xp: 12 },
];

export function TrackerTab({ habitsData, setHabitsData, t, lang, isDarkMode }: TrackerTabProps) {
  const todayDate = new Date().toISOString().split('T')[0];
  const [justLeveledUp, setJustLeveledUp] = useState<string | null>(null);

  const handleToggleHabit = (id: string, currentlyDoneToday: boolean) => {
    setHabitsData(prev => {
      const current = prev[id] || { streak: 0, lastDone: null };
      const newStreak = currentlyDoneToday ? Math.max(0, current.streak - 1) : current.streak + 1;
      const newLastDone = currentlyDoneToday ? null : todayDate;
      
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
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#1F7A4C', '#2EAF6C', '#84CC16', '#F59E0B']
    });
  };

  useEffect(() => {
    if (justLeveledUp) {
      const timer = setTimeout(() => setJustLeveledUp(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [justLeveledUp]);

  const totalStreaks = Object.values(habitsData).reduce((sum, h) => sum + (h.streak || 0), 0);
  const maxPossibleStreakToday = HABITS.length * 7; 
  const progressPercent = Math.min((totalStreaks / maxPossibleStreakToday) * 100, 100);

  // Dynamic weekly mission indicators
  const currentMission = totalStreaks < 5 
    ? t.missionLow 
    : totalStreaks < 15
      ? t.missionMedium
      : t.missionHigh;

  const theme = {
    card: isDarkMode ? 'bg-[#131916] border-[#25302A] text-white' : 'bg-white border-[#DDE5DF] text-[#1B2B24]',
    neutralBg: isDarkMode ? 'bg-[#1C2520]' : 'bg-[#E8F3EC]/30',
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Weekly Progress Header Dashboard */}
      <div className={`p-6 md:p-8 rounded-2xl border transition-all ${theme.card}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-md md:text-lg font-extrabold tracking-tight">
              {t.carbonDefenseProgress}
            </h2>
            <p className="text-xs text-[#6C7A73] mt-1">
              {lang === 'hi' ? 'दैनिक सस्टेनेबल आदतों को पूरा करके अपने स्कोर को मजबूत करें।' : 'Build consistency to harden your global carbon defense limits.'}
            </p>
          </div>
          <span className="text-xs bg-orange-500/10 text-orange-500 font-mono font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
            <Flame size={14} />
            {totalStreaks} Total Streak Multiplier
          </span>
        </div>

        {/* Custom Premium progress track line */}
        <div className="relative h-3 bg-stone-100 dark:bg-[#1E2521] rounded-full overflow-hidden border border-[#DDE5DF]/30 dark:border-transparent mb-2">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1F7A4C] to-[#2EAF6C] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/10 w-full h-full animate-[shimmer_2.5s_infinite]"></div>
          </div>
        </div>

        <div className="flex justify-between text-[11px] text-[#6C7A73] uppercase font-bold tracking-wider mb-5">
          <span>{totalStreaks} Completed points</span>
          <span>{maxPossibleStreakToday} Target Milestone</span>
        </div>

        {/* Personalized Weekly Mission alert block */}
        <div className={`p-4 rounded-xl border border-dotted ${isDarkMode ? 'border-[#2EAF6C]/30 bg-[#1C2520]/40' : 'border-[#1F7A4C]/30 bg-[#E8F3EC]/30'} flex gap-4 text-left items-start`}>
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
            <Trophy size={18} />
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold">
              {t.weeklyMission}
            </span>
            <p className="text-xs font-bold mt-1 leading-normal">
              {currentMission}
            </p>
          </div>
        </div>
      </div>

      {/* Grid checklist of active habits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HABITS.map(habit => {
          const data = habitsData[habit.id] || { streak: 0, lastDone: null };
          const isDoneToday = data.lastDone === todayDate;

          return (
            <button 
              key={habit.id}
              onClick={() => handleToggleHabit(habit.id, isDoneToday)}
              aria-pressed={isDoneToday}
              className={`group flex items-center p-4 rounded-2xl border text-left cursor-pointer transition-all focus:outline-none ${
                isDoneToday 
                  ? (isDarkMode 
                      ? 'bg-[#1F7A4C]/10 border-[#1F7A4C]' 
                      : 'bg-[#E8F3EC] border-[#1F7A4C]/30') 
                  : (isDarkMode 
                      ? 'bg-[#131916] border-[#25302A] hover:bg-[#1C2520]' 
                      : 'bg-white border-[#DDE5DF] hover:bg-stone-50')
              }`}
            >
              {/* Checkbox circle indicator */}
              <div className="mr-4 shrink-0 transition-transform group-hover:scale-105">
                {isDoneToday ? (
                  <CheckCircle size={22} className="text-[#1F7A4C] dark:text-[#2EAF6C]" />
                ) : (
                  <Circle size={22} className="text-stone-300 dark:text-stone-700 hover:text-stone-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0 pr-3">
                <p className={`text-xs md:text-sm font-bold truncate leading-none transition-colors ${
                  isDoneToday ? 'text-[#1F7A4C] dark:text-[#2EAF6C]' : (isDarkMode ? 'text-zinc-200' : 'text-[#1B2B24]')
                }`}>
                  {t[habit.key]}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-[#6C7A73]">
                    Category: {habit.category}
                  </span>
                  <span className="text-[#6C7A73]">|</span>
                  <span className="text-[9px] font-bold text-amber-600 font-mono">
                    +{habit.xp} XP Multiplier
                  </span>
                </div>
              </div>

              {/* Individual streak pill */}
              <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-[#1C2520] px-3 py-1.5 rounded-xl border border-stone-200/50 dark:border-transparent shrink-0">
                <Flame size={13} className={data.streak > 0 ? "text-orange-500 animate-pulse" : "text-stone-400"} />
                <span className={`text-xs font-mono font-black ${data.streak > 0 ? 'text-orange-500' : 'text-stone-400'}`}>
                  {data.streak}d
                </span>
              </div>
            </button>
          )
        })}
      </div>

    </div>
  );
}
