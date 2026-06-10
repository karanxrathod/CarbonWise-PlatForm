import { Share2, Award, Medal, Crown, Star, Globe } from 'lucide-react';

interface CommunityTabProps {
  calcResult: { breakdown: Record<string, number>; total: number };
  sustainabilityScore: number;
}

export function CommunityTab({ calcResult, sustainabilityScore }: CommunityTabProps) {
  
  // Dummy leaderboard data based on score metric (0-100 system mapped)
  const MOCK_USERS = [
    { name: 'Elena R.', score: 92, country: '🇪🇸' },
    { name: 'Koji M.', score: 88, country: '🇯🇵' },
    { name: 'Sarah J.', score: 85, country: '🇬🇧' },
    { name: 'You', score: sustainabilityScore, country: '🌍', isUser: true },
    { name: 'Alex W.', score: 62, country: '🇺🇸' },
    { name: 'David T.', score: 45, country: '🇨🇦' },
  ].sort((a, b) => b.score - a.score);

  const userRank = MOCK_USERS.findIndex(u => u.isUser) + 1;

  const badges = [
    { id: 'b1', name: 'Green Starter', desc: 'Calculated first footprint', icon: Star, unlocked: true },
    { id: 'b2', name: 'Above Average Rating', desc: 'Score over 50', icon: Medal, unlocked: sustainabilityScore > 50 },
    { id: 'b3', name: 'Eco Warrior', desc: 'Score over 75', icon: Award, unlocked: sustainabilityScore >= 75 },
    { id: 'b4', name: 'Paris Compliant', desc: 'Score over 95', icon: Crown, unlocked: sustainabilityScore >= 95 },
  ];

  const handleShare = () => {
    alert(`Generating social card: "I'm fighting climate change! My CarbonWise Sustainability Score is ${sustainabilityScore}/100!"`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Leaderboard Card */}
      <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Globe className="text-emerald-400" />
            Global Ranking
          </h2>
          <span className="bg-emerald-800/50 text-emerald-200 px-3 py-1 rounded-full text-sm font-medium border border-emerald-500/30">
            Top {Math.max(1, Math.round((userRank / MOCK_USERS.length) * 100))}%
          </span>
        </div>

        <div className="space-y-2">
          {MOCK_USERS.map((user, idx) => (
            <div 
              key={idx}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                user.isUser 
                  ? 'bg-emerald-600/40 border-emerald-400/50 shadow-inner' 
                  : 'bg-emerald-950/30 border-transparent hover:bg-emerald-900/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${user.isUser ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/50' : 'bg-emerald-950/50 text-emerald-400/70'}`}>
                  #{idx + 1}
                </div>
                <div className="flex flex-col">
                  <span className={`font-medium ${user.isUser ? 'text-white font-bold' : 'text-emerald-100/90'}`}>{user.name} {user.country}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-sm tracking-tight font-bold text-emerald-200">{user.score} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges & Share Card */}
      <div className="space-y-6">
        <div className="bg-emerald-900/40 border border-emerald-800/50 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Trophy Shelf</h2>
          <div className="grid grid-cols-2 gap-4">
            {badges.map(badge => {
              const Icon = badge.icon;
              return (
                <div key={badge.id} className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all ${
                  badge.unlocked 
                    ? 'bg-gradient-to-b from-yellow-500/20 to-yellow-600/5 border-yellow-500/30 shadow-[inset_0_0_20px_rgba(250,204,21,0.05)]' 
                    : 'bg-emerald-950/30 border-emerald-800/30 opacity-50 grayscale'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform duration-500 ${
                    badge.unlocked ? 'bg-yellow-400 text-yellow-950 shadow-[0_0_15px_rgba(250,204,21,0.3)] scale-110' : 'bg-emerald-900 text-emerald-700'
                  }`}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h4 className="font-bold text-sm mb-1 text-slate-100">{badge.name}</h4>
                  <p className="text-[10px] text-emerald-100/60 uppercase tracking-wider">{badge.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 border border-emerald-700/50 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h3 className="text-lg font-bold mb-2">Inspire Others</h3>
            <p className="text-sm text-emerald-100/80 mb-6 max-w-sm">
              Share your sustainability score and challenge your friends to beat it. Every action counts.
            </p>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 focus:ring-4 focus:ring-emerald-500/30 focus:outline-none text-emerald-950 font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              <Share2 size={18} aria-hidden="true" />
              Generate Social Card
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
