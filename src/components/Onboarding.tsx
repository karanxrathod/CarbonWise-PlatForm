import React, { useState } from 'react';
import { Sparkles, Leaf, User, Target, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (name: string, avatar: string, target: number) => void;
  isDarkMode: boolean;
  t: any;
}

const AVATAR_OPTIONS = [
  { emoji: '🌲', label: 'Eco Warrior', bg: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/30' },
  { emoji: '🌊', label: 'Ocean Savior', bg: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-blue-500/30' },
  { emoji: '☀️', label: 'Solar Pioneer', bg: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/30' },
  { emoji: '🦖', label: 'Climate Guard', bg: 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-500 border-teal-500/30' },
  { emoji: '🚲', label: 'Urban Cyclist', bg: 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 border-indigo-500/30' },
  { emoji: '🥗', label: 'Green Eater', bg: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/30' },
];

export function Onboarding({ onComplete, isDarkMode, t }: OnboardingProps) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🌲');
  const [target, setTarget] = useState(350); // Average sustainable monthly target (approx 4.2 tons annual = 350kg/month)
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please tell us your name to serialize your profile.');
      return;
    }
    onComplete(name.trim(), selectedAvatar, target);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 md:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-[#0B100D]' : 'bg-[#F2F5F3]'}`}>
      <div className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 ${
        isDarkMode 
          ? 'bg-[#131916] border-[#25302A] text-[#F0F4F1]' 
          : 'bg-white border-[#DDE5DF] text-[#1B2B24]'
      }`}>
        
        {/* Banner with modern climate-tech tech aesthetic */}
        <div className="relative p-6 md:p-8 bg-gradient-to-r from-[#1F7A4C] to-[#2E8B57] text-white overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transform scale-150">
            <Leaf size={140} />
          </div>
          <div className="flex items-center gap-2 mb-2 bg-emerald-950/30 w-fit px-3 py-1 rounded-full border border-emerald-500/20 text-xs font-bold tracking-widest uppercase">
            <Sparkles size={12} className="text-amber-400" />
            <span>EcoTrace Cloud platform</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Onboard your Eco Identity</h1>
          <p className="text-emerald-100 text-xs md:text-sm mt-1 max-w-md opacity-90">
            Configure your CarbonWise avatar and custom monthly emission limits to begin tracking, understanding, and compressing your carbon footprint.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          {/* User Name */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6C7A73]">
              1. What should we call you?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6C7A73]">
                <User size={16} />
              </div>
              <input
                type="text"
                maxLength={25}
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  isDarkMode
                    ? 'bg-[#1C2520] border-[#2E3C34] focus:ring-[#2EAF6C] focus:border-transparent text-white'
                    : 'bg-[#F2F5F3] border-[#DDE5DF] focus:ring-[#1F7A4C] focus:border-transparent text-[#1B2B24]'
                }`}
              />
            </div>
            {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
          </div>

          {/* Avatar Identity preset */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6C7A73]">
              2. Choose your sustainability archetype
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  key={opt.emoji}
                  type="button"
                  onClick={() => setSelectedAvatar(opt.emoji)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center group ${
                    selectedAvatar === opt.emoji
                      ? (isDarkMode 
                          ? 'bg-[#1F7A4C]/20 border-[#2EAF6C] ring-2 ring-[#2EAF6C]' 
                          : 'bg-[#E8F3EC] border-[#1F7A4C] ring-2 ring-[#1F7A4C]')
                      : (isDarkMode 
                          ? 'bg-[#1C2520] border-transparent hover:border-[#2E3C34]' 
                          : 'bg-stone-50 border-[#DDE5DF] hover:border-stone-300')
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{opt.emoji}</span>
                  <span className={`text-[11px] font-bold ${selectedAvatar === opt.emoji ? (isDarkMode ? 'text-[#2EAF6C]' : 'text-[#1F7A4C]') : 'text-[#6C7A73]'}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Emissions Limit Target Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6C7A73]">
                3. Choose Monthly Emission Target
              </label>
              <div className="text-right">
                <span className={`font-mono text-lg font-extrabold ${isDarkMode ? 'text-[#2EAF6C]' : 'text-[#1F7A4C]'}`}>
                  {target} kg CO₂
                </span>
                <span className="text-[10px] text-[#6C7A73] font-medium block">/month target limit</span>
              </div>
            </div>
            <input
              type="range"
              min="100"
              max="1500"
              step="25"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className={`w-full h-2 rounded-lg cursor-pointer ${
                isDarkMode ? 'bg-[#25302A] accent-[#2EAF6C]' : 'bg-[#E8F3EC] accent-[#1F7A4C]'
              }`}
            />
            <div className="flex justify-between text-[11px] text-[#6C7A73]">
              <span className="flex items-center gap-1">
                🌲 100 kg (Highly ambitious)
              </span>
              <span>
                🚗 1,500 kg (Global average)
              </span>
            </div>
            <p className="p-3 rounded-xl text-xs leading-normal bg-[#E8F3EC]/30 border border-emerald-500/10 text-[#6C7A73]">
              <strong className={isDarkMode ? 'text-[#2EAF6C]' : 'text-[#1F7A4C]'}>Insight:</strong> 350 kg CO₂ per month keeps you on track for the Paris Climate Accord goals (under 4.2 tons annually). Take action missions later to optimize down.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#1F7A4C] hover:bg-[#2E8B57] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 group shadow-lg hover:shadow-emerald-700/20 active:scale-[0.99] transition-all"
          >
            <span>Activate CarbonWise Profile</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </form>
      </div>
    </div>
  );
}
