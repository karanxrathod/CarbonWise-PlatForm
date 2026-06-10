import { useState, useEffect } from 'react';
import { Share2, Award, Medal, Crown, Star, Globe, Check, Users, ShieldAlert } from 'lucide-react';

interface CommunityTabProps {
  calcResult: { breakdown: Record<string, number>; total: number };
  sustainabilityScore: number;
  t: any;
  lang: 'en' | 'hi';
  isDarkMode: boolean;
}

export function CommunityTab({ calcResult, sustainabilityScore, t, lang, isDarkMode }: CommunityTabProps) {
  const [showToast, setShowToast] = useState(false);

  const MOCK_USERS = [
    { name: 'Elena R.', score: 92, country: '🇪🇸', status: 'Elite' },
    { name: 'Koji M.', score: 88, country: '🇯🇵', status: 'Ecopro' },
    { name: 'Sarah J.', score: 85, country: '🇬🇧', status: 'Ecopro' },
    { name: 'You', score: sustainabilityScore, country: '🌍', isUser: true, status: sustainabilityScore > 80 ? 'Elite' : 'Explorer' },
    { name: 'Alex W.', score: 62, country: '🇺🇸', status: 'Enthusiast' },
    { name: 'David T.', score: 45, country: '🇨🇦', status: 'Novice' },
  ].sort((a, b) => b.score - a.score);

  const userRank = MOCK_USERS.findIndex(u => u.isUser) + 1;

  const badges = [
    { id: 'b1', name: lang === 'hi' ? 'ग्रीन स्टार्टर' : 'Green Starter', desc: lang === 'hi' ? 'पहला फुटप्रिंट मापा' : 'Initial footprint measured', icon: Star, unlocked: true },
    { id: 'b2', name: lang === 'hi' ? 'औसत से बेहतर रेटिंग' : 'Above Average', desc: lang === 'hi' ? 'स्कोर ५० से अधिक' : 'Score exceeding 50 milestone', icon: Medal, unlocked: sustainabilityScore > 50 },
    { id: 'b3', name: lang === 'hi' ? 'इको वॉरियर' : 'Eco Warrior', desc: lang === 'hi' ? 'स्कोर ७५ से अधिक' : 'Score exceeding 75 milestone', icon: Award, unlocked: sustainabilityScore >= 75 },
    { id: 'b4', name: lang === 'hi' ? 'पेरिस मानक' : 'Paris Compliant', desc: lang === 'hi' ? 'स्कोर ९५ से अधिक' : 'Ideal Paris target score', icon: Crown, unlocked: sustainabilityScore >= 95 },
  ];

  const handleShare = () => {
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const theme = {
    card: isDarkMode ? 'bg-[#131916] border-[#25302A] text-white shadow-md' : 'bg-white border-[#DDE5DF] text-[#1B2B24] shadow-sm',
    badgeText: isDarkMode ? 'text-[#2EAF6C]' : 'text-[#1F7A4C]'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
      
      {/* Toast notification overlay */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] max-w-sm w-full bg-[#131916] border border-[#2EAF6C]/40 rounded-xl p-4 shadow-2xl flex items-start gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-[#1F7A4C]/20 text-[#2EAF6C] flex items-center justify-center shrink-0">
             <Check size={18} />
          </div>
          <div>
            <h5 className="font-bold text-xs text-[#2EAF6C] uppercase tracking-widest">{lang === 'hi' ? "सोशल कार्ड जनरेट किया गया" : "Social Card Generated"}</h5>
            <p className="text-stone-300 text-xs mt-1 leading-normal">
              {t.shareAlertText.replace('{score}', sustainabilityScore.toString())}
            </p>
          </div>
        </div>
      )}

      {/* Leaderboard Card */}
      <div className={`p-6 md:p-8 rounded-2xl border transition-all ${theme.card}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-md md:text-lg font-extrabold tracking-tight flex items-center gap-2">
            <Globe size={18} className="text-[#1F7A4C] dark:text-[#2EAF6C]" />
            {t.globalRanking}
          </h2>
          <span className="bg-[#1F7A4C]/10 text-[#1F7A4C] dark:text-[#2EAF6C] px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/10">
            {t.topPercentCommunity.replace('{pct}', Math.max(1, Math.round((userRank / MOCK_USERS.length) * 100)).toString())}
          </span>
        </div>

        <div className="space-y-2">
          {MOCK_USERS.map((user, idx) => (
            <div 
              key={idx}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                user.isUser 
                  ? 'bg-[#1F7A4C]/10 border-[#1F7A4C] scale-101 shadow-inner' 
                  : (isDarkMode 
                      ? 'bg-[#1C2520]/20 border-transparent hover:border-[#25302A]' 
                      : 'bg-stone-50 border-transparent hover:border-stone-200')
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  user.isUser 
                    ? 'bg-[#1F7A4C] text-white' 
                    : (isDarkMode ? 'bg-[#1C2520] text-[#6C7A73]' : 'bg-stone-100 text-[#6C7A73]')
                }`}>
                  #{idx + 1}
                </div>
                <div className="min-w-0">
                  <p className={`text-xs md:text-sm font-bold truncate ${user.isUser ? 'text-[#1F7A4C] dark:text-[#2EAF6C]' : ''}`}>
                    {user.isUser ? (lang === 'hi' ? 'आप' : 'You') : user.name} {user.country}
                  </p>
                  <span className="text-[10px] text-[#6C7A73] dark:text-zinc-400 uppercase tracking-widest font-mono">
                    Tier: {user.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-xs md:text-sm tracking-tight font-extrabold text-[#1F7A4C] dark:text-[#2EAF6C]">
                  {user.score} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges & Share Card */}
      <div className="space-y-6">
        <div className={`p-6 md:p-8 rounded-2xl border transition-all ${theme.card}`}>
          <h2 className="text-md md:text-lg font-extrabold tracking-tight mb-4">{t.trophyShelf}</h2>
          <div className="grid grid-cols-2 gap-4">
            {badges.map(badge => {
              const Icon = badge.icon;
              return (
                <div key={badge.id} className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all ${
                  badge.unlocked 
                    ? 'bg-gradient-to-b from-[#1F7A4C]/10 to-stone-300/5 border-[#1F7A4C]/25 shadow-sm' 
                    : 'bg-stone-50 dark:bg-[#1C2520]/20 border-transparent opacity-45 grayscale'
                }`}>
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 transition-transform ${
                    badge.unlocked 
                      ? 'bg-[#1F7A4C] text-white shadow-md shadow-emerald-500/10' 
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <h4 className="font-bold text-xs mb-1 text-[#1B2B24] dark:text-slate-100">{badge.name}</h4>
                  <p className="text-[9px] text-[#6C7A73] dark:text-zinc-400 uppercase tracking-wider font-semibold">{badge.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Share box banner */}
        <div className="bg-gradient-to-br from-[#1F7A4C] to-[#2E8B57] border border-[#1F7A4C]/30 rounded-2xl p-6 md:p-8 relative overflow-hidden group text-white">
          <div className="absolute inset-0 bg-[#E8F3EC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="text-md md:text-lg font-bold tracking-tight mb-2">{t.inspireOthers}</h3>
            <p className="text-xs text-emerald-100/90 mb-6 max-w-sm leading-relaxed">
              {t.shareDesc}
            </p>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 bg-white text-[#1F7A4C] hover:bg-[#E8F3EC] font-bold text-xs py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg cursor-pointer active:scale-98"
            >
              <Share2 size={14} />
              {t.generateCard}
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
