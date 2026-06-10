import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Leaf, 
  User, 
  Target, 
  ArrowRight, 
  Clock, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Award,
  Globe
} from 'lucide-react';
import { CarbonWiseLogo } from './CarbonWiseLogo';

interface OnboardingProps {
  onComplete: (name: string, avatar: string, target: number) => void;
  isDarkMode: boolean;
  t: any;
}

const AVATAR_OPTIONS = [
  { emoji: '🌲', label: 'Eco Warrior', desc: 'Carbon offset advocate' },
  { emoji: '🌊', label: 'Ocean Savior', desc: 'Defending marine ecosystems' },
  { emoji: '☀️', label: 'Solar Pioneer', desc: 'Championing clean energy' },
  { emoji: '🦖', label: 'Climate Guard', desc: 'Protecting biodiversity' },
  { emoji: '🚲', label: 'Urban Cyclist', desc: 'Zero-emission routing' },
  { emoji: '🥗', label: 'Green Eater', desc: 'Plant-based footprint dieting' },
];

const CLIMATE_QUOTES = [
  "Small daily acts, big compound impact. Begin tracking now.",
  "Your targets represent a personal pledge to key Paris Climate goals.",
  "Carbon output modeling highlights which changes save the most CO₂.",
  "Join over 14,000 global contributors compressing their energy curves."
];

export function Onboarding({ onComplete, isDarkMode, t }: OnboardingProps) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🌲');
  const [target, setTarget] = useState(350); 
  const [error, setError] = useState('');
  
  // Real-time carbon savings clock (simulating global savings in action)
  const [globalSavings, setGlobalSavings] = useState(2458194.84);
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  useEffect(() => {
    // Increment carbon savings clock dynamically
    const interval = setInterval(() => {
      setGlobalSavings(prev => prev + 0.147 + Math.random() * 0.08);
    }, 120);

    // Rotate quotes every 6 seconds
    const quoteInterval = setInterval(() => {
      setActiveQuoteIdx(prev => (prev + 1) % CLIMATE_QUOTES.length);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearInterval(quoteInterval);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a name to initialize your tracking environment.');
      return;
    }
    onComplete(name.trim(), selectedAvatar, target);
  };

  const selectedOptionDetail = AVATAR_OPTIONS.find(opt => opt.emoji === selectedAvatar);

  return (
    <div className={`min-h-screen w-full flex flex-col md:flex-row transition-colors duration-500 overflow-x-hidden ${
      isDarkMode ? 'bg-[#0B100D] text-[#F0F4F1]' : 'bg-[#F2F5F3] text-[#1B2B24]'
    }`}>
      
      {/* LEFT SIDE - IMMERSIVE COMPANION / TELEMETRY PRESENTATION */}
      <div className={`relative w-full md:w-1/2 flex flex-col justify-between p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0F1612] via-[#121B16] to-[#0A0D0B] border-[#1C2520]' 
          : 'bg-gradient-to-br from-[#EAEFEA] via-[#F4F7F4] to-[#E2EAE3] border-[#DDE5DF]'
      }`}>
        
        {/* Subtle decorative mesh background lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
            <defs>
              <pattern id="onboardingGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDarkMode ? '#24342B' : '#C1CDC4'} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#onboardingGrid)" />
          </svg>
          <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full filter blur-[100px] bg-emerald-500/10 dark:bg-emerald-500/5 animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full filter blur-[120px] bg-[#2EAF6C]/10 dark:bg-emerald-400/5 animate-pulse delay-700" />
        </div>

        {/* Brand Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <CarbonWiseLogo size={42} showText={true} textColorClass={isDarkMode ? 'text-white' : 'text-[#1F7A4C]'} animated={true} />
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border ${
            isDarkMode 
              ? 'bg-[#18211C] border-[#25302A] text-[#2EAF6C]' 
              : 'bg-emerald-100/60 border-emerald-500/20 text-[#1F7A4C]'
          }`}>
            <Sparkles size={11} className="text-[#a3e635] animate-spin-slow" />
            <span>Active Global Engine</span>
          </div>
        </motion.div>

        {/* Center Live Telemetry & Pitch */}
        <div className="relative z-10 my-12 md:my-auto space-y-8 md:max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4"
          >
            <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] ${
              isDarkMode ? 'text-white' : 'text-[#13221B]'
            }`}>
              Let's craft your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-400 font-black">Sustainable</span> footprint identity
            </h2>
            <p className={`text-base leading-relaxed ${isDarkMode ? 'text-[#8C9C92]' : 'text-[#506056]'}`}>
              Set limits, analyze pathways, consult our Gemini-powered Climate Coach, and begin compressing carbon emissions interactively.
            </p>
          </motion.div>

          {/* Dynamic Live Simulated Counter Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-[#121B16]/80 border-[#223028] shadow-[0_8px_30px_rgb(0,0,0,0.3)]' 
                : 'bg-white/80 border-[#DDE5DF] shadow-[0_8px_30px_rgba(27,43,36,0.04)]'
            }`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4">
              <Leaf size={100} className="text-emerald-500" />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className={`text-[11px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-[#a3e635]' : 'text-emerald-700'}`}>
                COMMUNITY CARBON DEFIANCE COUNT
              </span>
            </div>

            <div className="font-mono text-xl md:text-3xl font-black tracking-tight flex items-baseline gap-1.5 text-emerald-500 dark:text-[#2EAF6C]">
              <span>{globalSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="text-xs font-semibold text-[#6C7A73]">kg CO₂ saved</span>
            </div>
            
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-[#627269]' : 'text-[#7B8B81]'}`}>
              Real-time estimate of compound carbon reduction achievements unlocked across CarbonWise active campaigns.
            </p>
          </motion.div>

          {/* Interactive Feature List */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="flex gap-3">
              <div className={`p-2 rounded-xl h-fit border ${isDarkMode ? 'bg-[#18211C] border-[#25302A] text-[#2EAF6C]' : 'bg-emerald-50 border-emerald-100 text-[#1F7A4C]'}`}>
                <BarChart3 size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Multi-Variable Calculator</h4>
                <p className="text-[11px] text-[#6C7A73] leading-snug mt-0.5">Energy, commute, air miles, diet and physical orders diagnostic ledger.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className={`p-2 rounded-xl h-fit border ${isDarkMode ? 'bg-[#18211C] border-[#25302A] text-amber-400' : 'bg-amber-50 border-amber-100 text-[#B87A00]'}`}>
                <Zap size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Climate Coach</h4>
                <p className="text-[11px] text-[#6C7A73] leading-snug mt-0.5">Advanced Gemini-formulated mitigation plans and technical resources.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className={`p-2 rounded-xl h-fit border ${isDarkMode ? 'bg-[#18211C] border-[#25302A] text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
                <Award size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Habit & Badge Rewards</h4>
                <p className="text-[11px] text-[#6C7A73] leading-snug mt-0.5">Check off habits daily to retain your defense points and award streaks.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className={`p-2 rounded-xl h-fit border ${isDarkMode ? 'bg-[#18211C] border-[#25302A] text-[#2EAF6C]' : 'bg-emerald-50 border-emerald-100 text-[#1F7A4C]'}`}>
                <Globe size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Social Leaderboards</h4>
                <p className="text-[11px] text-[#6C7A73] leading-snug mt-0.5">Showcase your rating card publicly and invite community targets.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic bottom carousel tips */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative z-10 pt-4 mt-6 border-t border-emerald-500/10 dark:border-emerald-500/5 min-h-[44px] flex items-center gap-3.5"
        >
          <Clock size={14} className="text-emerald-500 animate-pulse shrink-0" />
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeQuoteIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className={`text-xs font-semibold tracking-wide italic leading-snug ${isDarkMode ? 'text-emerald-400/80' : 'text-emerald-800'}`}
              >
                "{CLIMATE_QUOTES[activeQuoteIdx]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE - FLOATING INPUT CONTROL PANEL SCREEN (FULL VIEWPORT SCALE) */}
      <div className={`w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 ${
        isDarkMode ? 'bg-[#131916]' : 'bg-white'
      }`}>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full max-w-lg space-y-8"
        >
          <div className="space-y-2">
            <span className={`text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded bg-[#E8F3EC]/50 dark:bg-[#1E2721] w-fit block ${
              isDarkMode ? 'text-[#2EAF6C]' : 'text-[#1F7A4C]'
            }`}>
              Identity Portal
            </span>
            <h1 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#13221B]'}`}>
              Onboard your Eco Profile
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-[#8C9C92]' : 'text-[#6C7A73]'}`}>
              Configure your CarbonWise avatar and custom monthly emission limits to join the active tracking environment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. NAME ENTER */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#6C7A73]">
                  1. What should we call you?
                </label>
                <span className="text-[10px] text-[#6C7A73] font-mono">Max 25 chars</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6C7A73]">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  maxLength={25}
                  placeholder="Enter your name or callsign..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 transition-all font-semibold ${
                    isDarkMode
                      ? 'bg-[#1C2520] border-[#2E3C34] focus:ring-[#2EAF6C] focus:border-transparent text-white placeholder-emerald-800/40'
                      : 'bg-[#F2F5F3] border-[#DDE5DF] focus:ring-[#1F7A4C] focus:border-transparent text-[#1B2B24] placeholder-stone-400'
                  }`}
                />
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-xs text-red-500 font-bold"
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* 2. CHOOSE ARCHETYPE */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#6C7A73]">
                2. Choose sustainability archetype
              </label>
              <div className="grid grid-cols-2 gap-3.5">
                {AVATAR_OPTIONS.map((opt) => (
                  <button
                    key={opt.emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(opt.emoji)}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all text-left group relative cursor-pointer ${
                      selectedAvatar === opt.emoji
                        ? (isDarkMode 
                            ? 'bg-[#1F7A4C]/25 border-[#2EAF6C] ring-1 ring-[#2EAF6C] shadow-[0_0_15px_rgba(46,175,108,0.25)]' 
                            : 'bg-[#E8F3EC] border-[#1F7A4C] ring-1 ring-[#1F7A4C] shadow-[0_4px_16px_rgba(31,122,76,0.1)]')
                        : (isDarkMode 
                            ? 'bg-[#1C2520] border-transparent hover:border-[#2E3C34] hover:bg-[#1C2520]/80' 
                            : 'bg-stone-50 border-[#DDE5DF] hover:border-emerald-700/20 hover:bg-[#F2F5F3]')
                    }`}
                  >
                    <span className="text-3xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-200 shrink-0">
                      {opt.emoji}
                    </span>
                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold truncate ${
                        selectedAvatar === opt.emoji 
                          ? (isDarkMode ? 'text-[#2EAF6C]' : 'text-[#1F7A4C]') 
                          : 'text-[#6C7A73] dark:text-stone-300'
                      }`}>
                        {opt.label}
                      </h4>
                      <p className="text-[9px] text-[#8E9F96] dark:text-[#6c7a73] truncate leading-tight mt-0.5 font-medium">
                        {opt.desc}
                      </p>
                    </div>

                    {selectedAvatar === opt.emoji && (
                      <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5 rounded-full bg-[#1F7A4C] dark:bg-[#2EAF6C]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. SET INTENDED LIMITS */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#6C7A73]">
                  3. Set Monthly Emission Target
                </label>
                <div className="text-right">
                  <span className={`font-mono text-2xl font-extrabold ${isDarkMode ? 'text-[#2EAF6C]' : 'text-[#1F7A4C]'}`}>
                    {target}
                  </span>
                  <span className="text-[10px] text-[#6C7A73] font-bold block">kg CO₂ / month</span>
                </div>
              </div>
              
              <input
                type="range"
                min="100"
                max="1500"
                step="25"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className={`w-full h-2 rounded-lg cursor-pointer transition-all ${
                  isDarkMode ? 'bg-[#25302A] accent-[#2EAF6C]' : 'bg-[#E8F3EC] accent-[#1F7A4C]'
                }`}
              />
              
              <div className="flex justify-between text-[11px] font-semibold text-[#6C7A73]">
                <span className="flex items-center gap-1">
                  🌲 100 kg (Highly ambitious)
                </span>
                <span>
                  🚗 1,500 kg (Global average)
                </span>
              </div>

              {/* Dynamic explanation message block */}
              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-[#121B16] border-emerald-500/10 text-stone-300' 
                  : 'bg-[#E8F3EC]/40 border-emerald-500/10 text-[#506056]'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-[#2EAF6C]' : 'text-emerald-800'}`}>
                    Active Impact Diagnostic
                  </span>
                </div>
                <p className="text-xs leading-normal">
                  {target <= 300 ? (
                    <span>Your target of <strong>{target} kg CO₂</strong> matches pristine zero-carbon models! Extremely competitive, and ideal for Paris Climate aims.</span>
                  ) : target <= 600 ? (
                    <span>A targeted limit of <strong>{target} kg CO₂</strong> keeps you on track for the Paris Accord goals (under 4.2 tons annually). Excellent balance of high standard and starting comfort.</span>
                  ) : target <= 1000 ? (
                    <span>A target of <strong>{target} kg CO₂</strong> represents gradual steps. CarbonWise can help you locate high emission sectors to compress this down over time.</span>
                  ) : (
                    <span>A high starting standard of <strong>{target} kg CO₂</strong>. Let’s consult the Climate Coach in carbon actions to target low-cost high-yield reduction items.</span>
                  )}
                </p>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full mt-4 bg-[#1F7A4C] hover:bg-[#208351] text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 group shadow-[0_10px_25px_rgba(31,122,76,0.25)] hover:shadow-[0_10px_30px_rgba(31,122,76,0.35)] transition-all cursor-pointer text-sm tracking-wider uppercase"
            >
              <span>Activate CarbonWise Profile</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
