import { useState, useMemo, useEffect } from 'react';
import { 
  Leaf, 
  Activity, 
  LayoutDashboard, 
  Target, 
  Trophy, 
  User, 
  Menu, 
  X, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Languages, 
  CheckCircle2, 
  ChevronRight, 
  Settings, 
  MessageSquareCode,
  Sparkles,
  Info
} from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserFootprintData, TabId } from './types';
import { calculateFootprint, calculateSustainabilityScore } from './lib/calculations';
import { CalculatorTab } from './components/CalculatorTab';
import { DashboardTab } from './components/DashboardTab';
import { InsightsTab } from './components/InsightsTab';
import { TrackerTab } from './components/TrackerTab';
import { CommunityTab } from './components/CommunityTab';
import { SettingsTab } from './components/SettingsTab';
import { MicroContent } from './components/MicroContent';
import { translations } from './data/translations';
import { CarbonWiseLogo } from './components/CarbonWiseLogo';
import { Onboarding } from './components/Onboarding';

const DEFAULT_DATA: UserFootprintData = {
  transport: { carKmPerWeek: 100, shortFlightsPerYear: 1, longFlightsPerYear: 0, publicTransitUse: 'Rarely' },
  home: { electricityKwhPerMonth: 250, gasUsage: 50, renewablePercent: 0 },
  diet: 'moderate',
  shopping: { onlineOrdersPerMonth: 4, newClothesPerMonth: 2, electronicsPerYear: 1 }
};

interface NotificationItem {
  id: string;
  category: 'achievement' | 'alert' | 'system';
  msg: string;
  time: string;
  unread: boolean;
}

export default function App() {
  const [lang, setLang] = useLocalStorage<'en' | 'hi'>('carbonwise_lang', 'en');
  const t = useMemo(() => translations[lang], [lang]);

  // Design Theme state
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('carbonwise_dark_mode', false);

  // Profile setup onboarding state
  const [onboarded, setOnboarded] = useLocalStorage<boolean>('carbonwise_onboarded', false);
  const [profileName, setProfileName] = useLocalStorage<string>('carbonwise_profile_name', 'Alexa');
  const [profileAvatar, setProfileAvatar] = useLocalStorage<string>('carbonwise_profile_avatar', '🌲');
  const [profileTarget, setProfileTarget] = useLocalStorage<number>('carbonwise_profile_target', 350); // monthly limit kg CO2

  // App core States
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [data, setData] = useLocalStorage<UserFootprintData>('carbonwise_data', DEFAULT_DATA);
  const [committedActions, setCommittedActions] = useLocalStorage<string[]>('carbonwise_actions', []);
  const [habitsData, setHabitsData] = useLocalStorage<Record<string, {streak: number, lastDone: string | null}>>('carbonwise_habits', {});

  // Mobile sidebar drawer
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', category: 'achievement', msg: 'Welcome to CarbonWise! Complete your onboarding tasks.', time: 'Just now', unread: true },
    { id: '2', category: 'system', msg: 'Climate Coach compiled your annual carbon report based on math.', time: '2h ago', unread: true },
    { id: '3', category: 'alert', msg: 'Annual transport emissions are estimated at 60% of total.', time: '1d ago', unread: false }
  ]);

  const calcResult = useMemo(() => calculateFootprint(data), [data]);
  
  const totalStreaks = useMemo(() => 
    Object.values(habitsData || {}).reduce((sum, h: any) => sum + (h?.streak || 0), 0), 
  [habitsData]);
  
  const sustainabilityScore = useMemo(() => 
    calculateSustainabilityScore(calcResult.total, totalStreaks), 
  [calcResult.total, totalStreaks]);

  // Compute monthly equivalents
  const monthlyFootprint = useMemo(() => calcResult.total / 12, [calcResult.total]);
  const activeTargetPercent = useMemo(() => Math.min((monthlyFootprint / profileTarget) * 100, 100), [monthlyFootprint, profileTarget]);

  // Helper to mark a notification as read
  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const resetAllData = () => {
    localStorage.removeItem('carbonwise_data');
    localStorage.removeItem('carbonwise_actions');
    localStorage.removeItem('carbonwise_habits');
    localStorage.removeItem('carbonwise_onboarded');
    localStorage.removeItem('carbonwise_profile_name');
    localStorage.removeItem('carbonwise_profile_avatar');
    localStorage.removeItem('carbonwise_profile_target');
    setData(DEFAULT_DATA);
    setCommittedActions([]);
    setHabitsData({});
    setOnboarded(false);
    setProfileName('Alexa');
    setProfileAvatar('🌲');
    setProfileTarget(350);
  };

  // Onboarding Complete Handler
  const handleOnboardingComplete = (name: string, avatar: string, target: number) => {
    setProfileName(name);
    setProfileAvatar(avatar);
    setProfileTarget(target);
    setOnboarded(true);
    setActiveTab('dashboard');
  };

  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'calculator', label: t.calculator, icon: Leaf },
    { id: 'tracker', label: t.tracker, icon: Activity },
    { id: 'community', label: t.community, icon: Trophy },
    { id: 'actions', label: t.actions, icon: Sparkles }, // AI advisor / actions
    { id: 'profile', label: t.settings, icon: Settings },
  ];

  // Search Results preview
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return tabs.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  // Navigate on search click
  const handleSearchNav = (tabId: TabId) => {
    setActiveTab(tabId);
    setSearchQuery('');
  };

  // If not onboarded yet, show onboarding
  if (!onboarded) {
    return (
      <Onboarding 
        onComplete={handleOnboardingComplete} 
        isDarkMode={isDarkMode} 
        t={t} 
      />
    );
  }

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className={`min-h-screen font-sans flex flex-col md:flex-row transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0B100D] text-[#F0F4F1]' : 'bg-[#F5F7F4] text-[#1B2B24]'
    }`}>
      
      {/* Skip to Content bypass link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#1F7A4C] focus:text-white focus:rounded-xl focus:shadow-xl focus:font-extrabold focus:outline-none focus:ring-2 focus:ring-[#2EAF6C] text-xs"
      >
        Skip to Content
      </a>
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 border-r shrink-0 flex flex-col justify-between transition-all duration-300 transform md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        isDarkMode 
          ? 'bg-[#131916] border-[#25302A]' 
          : 'bg-[#FFFFFF] border-[#DDE5DF]'
      }`}>
        <div className="flex flex-col flex-1 py-6 px-4 gap-8">
          
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#DDE5DF]/30 dark:border-[#25302A]/30">
            <CarbonWiseLogo size={32} showText={true} textColorClass="text-[#1F7A4C] dark:text-[#2EAF6C]" animated={true} />
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg hover:bg-[#E8F3EC] dark:hover:bg-[#1A2820]"
              aria-label="Close Sidebar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#6C7A73] mb-3 ml-2">
              Menu Operations
            </span>
            <ul className="space-y-1.5" role="tablist" aria-label="CarbonWise main navigation">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <li key={tab.id} role="none">
                    <button
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSidebarOpen(false);
                      }}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${tab.id}`}
                      id={`tab-${tab.id}`}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-1 cursor-pointer ${
                        isActive
                          ? (isDarkMode 
                              ? 'bg-[#1F7A4C]/20 text-[#2EAF6C] border border-[#2EAF6C]/40' 
                              : 'bg-[#E8F3EC] text-[#1F7A4C] border border-[#1F7A4C]/20')
                          : (isDarkMode 
                              ? 'text-[#8E9F96] hover:bg-[#1C2520]/60 hover:text-white' 
                              : 'text-[#6C7A73] hover:bg-[#F2F5F3] hover:text-[#1B2B24]')
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} />
                        <span>{tab.label}</span>
                      </div>
                      {isActive && <ChevronRight size={14} className="opacity-80" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Language selector pill list */}
          <div className="p-3.5 rounded-xl border border-[#DDE5DF] dark:border-[#25302A] bg-[#F2F5F3]/50 dark:bg-[#1C2520]/20 flex items-center justify-between gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#6C7A73]">Language:</span>
            <div className="flex items-center bg-stone-200 dark:bg-zinc-800 rounded-lg p-0.5 border border-stone-300 dark:border-zinc-700">
              <button 
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  lang === 'en' 
                    ? 'bg-[#1F7A4C] text-white' 
                    : 'text-[#6C7A73] hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('hi')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  lang === 'hi' 
                    ? 'bg-[#1F7A4C] text-white' 
                    : 'text-[#6C7A73] hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar Footer with Dark mode toggle & developer credit */}
        <div className="p-4 border-t border-[#DDE5DF]/30 dark:border-[#25302A]/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-[#6C7A73] tracking-widest">
              Theme Mode
            </span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                isDarkMode 
                  ? 'bg-[#1C2520] border-[#25302A] text-amber-400 hover:text-white' 
                  : 'bg-[#F2F5F3] border-[#DDE5DF] text-[#1B2B24] hover:bg-stone-100'
              }`}
              aria-label="Toggle Theme Mode"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
              <span className="text-[10px] uppercase font-bold tracking-wider">
                {isDarkMode ? 'Light' : 'Dark'}
              </span>
            </button>
          </div>
          <p className="text-[9px] text-[#6C7A73] font-semibold text-center mt-4 tracking-wider uppercase opacity-50">
            Powered by CarbonWise Core v1.5
          </p>
        </div>
      </aside>

      {/* Main Container Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 2. TOP HEADER */}
        <header className={`sticky top-0 z-30 border-b backdrop-blur-md px-4 md:px-8 h-20 flex items-center justify-between shrink-0 transition-colors ${
          isDarkMode 
            ? 'bg-[#0B100D]/80 border-[#25302A]/80' 
            : 'bg-[#F5F7F4]/80 border-[#DDE5DF]/80'
        }`}>
          
          {/* Active section Title indicator */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-lg border hover:bg-[#E8F3EC] dark:hover:bg-[#1A2820]"
              aria-label="Open Navigation menu"
            >
              <Menu size={18} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-lg md:text-xl font-extrabold tracking-tight font-display text-[#1B2B24] dark:text-white">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-[10px] font-semibold tracking-wider text-[#6C7A73] uppercase -mt-0.5">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Search container & telemetry summary */}
          <div className="flex items-center gap-3.5 flex-1 max-w-sm mx-4 relative hidden md:block">
            <div className={`relative flex items-center py-2 px-3 rounded-xl border transition-all ${
              searchFocused 
                ? 'ring-1 ring-[#1F7A4C] bg-white text-[#1B2B24]' 
                : (isDarkMode ? 'bg-[#131916] border-[#25302A] text-white' : 'bg-white border-[#DDE5DF] text-[#1B2B24]')
            }`}>
              <Search size={14} className="text-[#6C7A73] mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search CarbonWise features..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs font-semibold focus:outline-none"
              />
            </div>
            
            {/* Search Suggestion Dropdown */}
            {searchFocused && searchQuery && (
              <div className={`absolute top-12 left-0 w-full rounded-xl border p-2 shadow-2xl z-[60] ${
                isDarkMode ? 'bg-[#131916] border-[#25302A]' : 'bg-white border-[#DDE5DF]'
              }`}>
                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map(res => (
                      <button
                        key={res.id}
                        onMouseDown={() => handleSearchNav(res.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-semibold hover:bg-[#E8F3EC] dark:hover:bg-[#1C2520]"
                      >
                        <Leaf size={12} className="text-[#1F7A4C]" />
                        <span>Go to {res.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] p-2 text-[#6C7A73] text-center">No modules found matching query.</p>
                )}
              </div>
            )}
          </div>

          {/* Smart header dashboard stats */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* Interactive Notification dropdownbell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className={`p-2.5 rounded-xl border relative transition-all ${
                  isDarkMode 
                    ? 'bg-[#131916] border-[#25302A] text-[#8E9F96] hover:bg-[#1C2520] hover:text-white' 
                    : 'bg-white border-[#DDE5DF] text-[#6C7A73] hover:bg-stone-50'
                }`}
                aria-label="Toggle notifications"
              >
                <Bell size={15} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 border-2 border-white dark:border-[#0B100D] text-[9px] font-black text-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className={`absolute right-0 mt-2.5 w-72 rounded-xl border shadow-2xl z-[60] overflow-hidden ${
                  isDarkMode ? 'bg-[#131916] border-[#25302A]' : 'bg-white border-[#DDE5DF]'
                }`}>
                  <div className="p-3.5 border-b border-[#DDE5DF]/30 dark:border-[#25302A]/30 flex justify-between items-center bg-[#E8F3EC]/20 dark:bg-emerald-950/20">
                    <span className="text-xs font-bold uppercase tracking-wider">{lang === 'hi' ? 'सूचनाएं' : 'Notifications'}</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={handleMarkAllRead}
                        className="text-[10px] text-[#1F7A4C] dark:text-[#2EAF6C] font-extrabold hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto divide-y divide-[#DDE5DF]/20 dark:divide-[#25302A]/20">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div 
                          key={notif.id}
                          onClick={() => handleMarkRead(notif.id)}
                          className={`p-3 text-[#1B2B24] dark:text-[#F0F4F1] cursor-pointer hover:bg-stone-50 dark:hover:bg-[#1C2520] transition-colors ${
                            notif.unread ? 'bg-[#1F7A4C]/5' : ''
                          }`}
                        >
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className={`font-bold ${
                              notif.category === 'achievement' ? 'text-amber-500' : notif.category === 'alert' ? 'text-rose-500' : 'text-blue-500'
                            }`}>
                              {notif.category.toUpperCase()}
                            </span>
                            <span className="text-[10px] text-[#6C7A73]">{notif.time}</span>
                          </div>
                          <p className="text-xs leading-normal">{notif.msg}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#6C7A73] p-4 text-center">No notifications found.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile summary bubble */}
            <div 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2.5 p-1.5 pr-3.5 rounded-xl border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#131916] border-[#25302A] hover:bg-[#1C2520]' 
                  : 'bg-white border-[#DDE5DF] hover:bg-stone-50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center text-lg shadow-sm">
                {profileAvatar}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold leading-none">{profileName}</p>
                <p className="text-[9px] font-bold text-[#6C7A73] mt-0.5 uppercase tracking-wide">
                  Target: {profileTarget} kg
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* Global didactic micro facts */}
        <MicroContent />

        {/* 3. MAIN INTERACTIVE VIEW AREA */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8" id="main-content">
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {activeTab === 'dashboard' && (
              <div role="tabpanel" id="panel-dashboard" aria-labelledby="tab-dashboard" className="w-full">
                <DashboardTab 
                  calcResult={calcResult} 
                  totalStreaks={totalStreaks} 
                  data={data} 
                  committedActions={committedActions} 
                  t={t} 
                  lang={lang} 
                  profileName={profileName}
                  profileAvatar={profileAvatar}
                  profileTarget={profileTarget}
                  isDarkMode={isDarkMode}
                  onTabChange={setActiveTab}
                />
              </div>
            )}
            
            {activeTab === 'calculator' && (
              <div role="tabpanel" id="panel-calculator" aria-labelledby="tab-calculator" className="w-full">
                <CalculatorTab 
                  data={data} 
                  setData={setData} 
                  calcResult={calcResult} 
                  t={t} 
                  lang={lang} 
                  isDarkMode={isDarkMode}
                />
              </div>
            )}

            {activeTab === 'tracker' && (
              <div role="tabpanel" id="panel-tracker" aria-labelledby="tab-tracker" className="w-full">
                <TrackerTab 
                  habitsData={habitsData} 
                  setHabitsData={setHabitsData} 
                  t={t} 
                  lang={lang} 
                  isDarkMode={isDarkMode}
                />
              </div>
            )}

            {activeTab === 'community' && (
              <div role="tabpanel" id="panel-community" aria-labelledby="tab-community" className="w-full">
                <CommunityTab 
                  calcResult={calcResult} 
                  sustainabilityScore={sustainabilityScore} 
                  t={t} 
                  lang={lang} 
                  isDarkMode={isDarkMode}
                />
              </div>
            )}

            {activeTab === 'actions' && (
              <div role="tabpanel" id="panel-actions" aria-labelledby="tab-actions" className="w-full">
                <InsightsTab 
                  data={data} 
                  calcResult={calcResult} 
                  committedActions={committedActions} 
                  setCommittedActions={setCommittedActions} 
                  t={t} 
                  lang={lang} 
                  isDarkMode={isDarkMode}
                />
              </div>
            )}

            {activeTab === 'profile' && (
              <div role="tabpanel" id="panel-profile" aria-labelledby="tab-profile" className="w-full">
                <SettingsTab
                  profileName={profileName}
                  setProfileName={setProfileName}
                  profileAvatar={profileAvatar}
                  setProfileAvatar={setProfileAvatar}
                  profileTarget={profileTarget}
                  setProfileTarget={setProfileTarget}
                  resetAllData={resetAllData}
                  isDarkMode={isDarkMode}
                  lang={lang}
                  setLang={setLang}
                  t={t}
                />
              </div>
            )}
          </div>
        </main>

        {/* footer */}
        <footer className={`py-6 border-t px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDarkMode ? 'bg-[#0E1411] border-[#25302A] text-[#8E9F96]' : 'bg-[#EBF0EC] border-[#DDE5DF] text-[#6C7A73]'
        }`}>
          <div className="flex items-center gap-2">
            <CarbonWiseLogo size={18} showText={true} textColorClass="text-[#1F7A4C] dark:text-[#2EAF6C]" animated={false} />
            <span className="opacity-65">| Continuous climate metrics engine.</span>
          </div>
          <p className="opacity-60 text-[11px]">EPA estimates • IPCC baseline assessments • 2026</p>
        </footer>

      </div>

    </div>
  );
}
