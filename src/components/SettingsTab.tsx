import React, { useState } from 'react';
import { User, Target, RotateCcw, AlertTriangle, Languages, Save, CheckCircle } from 'lucide-react';

interface SettingsTabProps {
  profileName: string;
  setProfileName: (val: string) => void;
  profileAvatar: string;
  setProfileAvatar: (val: string) => void;
  profileTarget: number;
  setProfileTarget: (val: number) => void;
  resetAllData: () => void;
  isDarkMode: boolean;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  t: any;
}

const AVATARS = [
  { emoji: '🌲', label: 'Eco Warrior' },
  { emoji: '🌊', label: 'Ocean Savior' },
  { emoji: '☀️', label: 'Solar Pioneer' },
  { emoji: '🦖', label: 'Climate Guard' },
  { emoji: '🚲', label: 'Urban Cyclist' },
  { emoji: '🥗', label: 'Green Eater' },
];

export function SettingsTab({
  profileName,
  setProfileName,
  profileAvatar,
  setProfileAvatar,
  profileTarget,
  setProfileTarget,
  resetAllData,
  isDarkMode,
  lang,
  setLang,
  t
}: SettingsTabProps) {
  const [localName, setLocalName] = useState(profileName);
  const [localAvatar, setLocalAvatar] = useState(profileAvatar);
  const [localTarget, setLocalTarget] = useState(profileTarget);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (localName.trim()) {
      setProfileName(localName.trim());
      setProfileAvatar(localAvatar);
      setProfileTarget(localTarget);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleReset = () => {
    if (confirm(lang === 'hi' ? 'क्या आप सारा डेटा रीसेट करना चाहते हैं?' : 'Are you sure you want to reset all tracking data and configurations? This cannot be undone.')) {
      resetAllData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col gap-1.5 pb-2 border-b border-[#DDE5DF] dark:border-[#25302A]">
        <h2 className={`text-xl md:text-2xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1B2B24]'}`}>
          {lang === 'hi' ? 'प्रोफ़ाइल और कस्टमाइज़ेशन सेटिंग्स' : 'Profile & Customization Settings'}
        </h2>
        <p className="text-xs text-[#6C7A73]">
          {lang === 'hi' ? 'सस्टेनेबिलिटी मेट्रिक्स, क्लाइमेट टारगेट और इंटरफ़ेस फीचर्स कस्टमाइज़ करें।' : 'Customize your sustainability metrics, climate target limits, and workspace preferences.'}
        </p>
      </div>

      <div className={`rounded-2xl border transition-all p-6 md:p-8 space-y-6 ${
        isDarkMode ? 'bg-[#131916] border-[#25302A] text-white' : 'bg-white border-[#DDE5DF] text-[#1B2B24]'
      }`}>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Status Dialog */}
          {saveSuccess && (
            <div className="bg-[#E8F3EC] dark:bg-[#1A2820] text-[#1F7A4C] dark:text-[#2EAF6C] border border-[#1F7A4C]/30 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle size={20} className="shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">{lang === 'hi' ? 'सफलतापूर्वक सहेजा गया' : 'Settings Synchronized!'}</p>
                <p className="text-[11px] opacity-90 mt-0.5">{lang === 'hi' ? 'आपकी नई सेटिंग्स लागू कर दी गई हैं।' : 'Your carbon profile has been updated and metrics recalculated across your active session.'}</p>
              </div>
            </div>
          )}

          {/* User Name input */}
          <div className="space-y-2">
            <label htmlFor="profileNameInput" className="block text-xs font-bold uppercase tracking-wider text-[#6C7A73]">
              {lang === 'hi' ? '१. नाम बदलें' : '1. Profile Name'}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6C7A73]">
                <User size={15} />
              </span>
              <input
                id="profileNameInput"
                type="text"
                maxLength={20}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-semibold focus:outline-none transition-all ${
                  isDarkMode 
                    ? 'bg-[#1C2520] border-[#25302A] text-white focus:ring-[#2EAF6C] focus:border-transparent' 
                    : 'bg-[#F2F5F3] border-[#DDE5DF] text-[#1B2B24] focus:ring-[#1F7A4C] focus:border-transparent'
                }`}
                value={localName}
                onChange={(e) => {
                  // Security Sanitizer: strip raw HTML tags or script syntax characters
                  const sanitized = e.target.value.replace(/[<>'"/\\`&;=]/g, '');
                  setLocalName(sanitized);
                }}
              />
            </div>
          </div>

          {/* Sustainability archetype choice */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6C7A73]">
              {lang === 'hi' ? '२. आर्केटाइप आइकन चुनें' : '2. Sustainability Archetype Icon'}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar.emoji}
                  type="button"
                  onClick={() => setLocalAvatar(avatar.emoji)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    localAvatar === avatar.emoji
                      ? (isDarkMode ? 'bg-[#1F7A4C]/20 border-[#2EAF6C]' : 'bg-[#E8F3EC] border-[#1F7A4C]')
                      : (isDarkMode ? 'bg-[#1C2520] border-transparent hover:border-[#25302A]' : 'bg-stone-50 border-stone-200 hover:bg-stone-100')
                  }`}
                >
                  <span className="text-xl">{avatar.emoji}</span>
                  <span className="text-[9px] text-[#6C7A73] font-medium truncate max-w-full">{avatar.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Monthly target limit */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label htmlFor="profileTargetInput" className="block text-xs font-bold uppercase tracking-wider text-[#6C7A73]">
                {lang === 'hi' ? '३. मासिक CO₂ उत्सर्जन सीमा' : '3. Monthly CO₂ Emission Limit Target'}
              </label>
              <span className={`font-mono text-sm font-extrabold ${isDarkMode ? 'text-[#2EAF6C]' : 'text-[#1F7A4C]'}`}>
                {localTarget} kg CO₂ / month
              </span>
            </div>
            <input
              id="profileTargetInput"
              type="range"
              min="100"
              max="1500"
              step="25"
              value={localTarget}
              onChange={(e) => setLocalTarget(Number(e.target.value))}
              className={`w-full h-1.5 rounded-lg cursor-pointer ${
                isDarkMode ? 'bg-[#25302A] accent-[#2EAF6C]' : 'bg-[#E8F3EC] accent-[#1F7A4C]'
              }`}
            />
            <div className="flex justify-between text-[11px] text-[#6C7A73]">
              <span>🌲 100 kg (Highly sustainable)</span>
              <span>🚗 1,500 kg (Global average)</span>
            </div>
          </div>

          {/* Save button */}
          <button
            type="submit"
            className="w-full bg-[#1F7A4C] hover:bg-[#2E8B57] dark:bg-[#1F7A4C] dark:hover:bg-[#2A9E64] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Save size={16} />
            <span>{lang === 'hi' ? 'सेटिंग्स सुरक्षित करें' : 'Save Carbon settings'}</span>
          </button>

        </form>

        {/* Danger zone */}
        <div className="pt-6 border-t border-[#DDE5DF] dark:border-[#25302A] space-y-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
            <AlertTriangle size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">{lang === 'hi' ? 'डेंजर ज़ोन' : 'System Operations (Danger Zone)'}</span>
          </div>

          <p className="text-xs text-[#6C7A73] leading-relaxed">
            {lang === 'hi' 
              ? 'सारे संचित डेटा (जैसे आदतें, मिशन, कस्टम कैलकुलेशन) को रीसेट करने के लिए नीचे दिए गए बटन पर क्लिक करें।' 
              : 'Clearing all database entries resets your habits streaks, calculator logs, profile options, and returns the workspace to onboarding defaults.'}
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="border border-red-500/20 text-red-500 hover:bg-red-500/5 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>{lang === 'hi' ? 'डेटा रीसेट करें' : 'Purge & Hard Reset Environment'}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
