import { useState } from 'react';
import { generateInsights, getEquivalencies, calculateFootprint } from '../lib/calculations';
import { UserFootprintData } from '../types';
import { ACTION_DETAILS } from '../data/actionDetails';
import Markdown from 'react-markdown';
import { 
  Check, 
  Target, 
  Lightbulb, 
  Zap, 
  TrendingDown, 
  Bot, 
  TreePine, 
  LeafyGreen, 
  ZapIcon, 
  ChevronDown, 
  ChevronUp, 
  Link2, 
  PiggyBank, 
  Coins, 
  Compass, 
  Loader2, 
  X, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';

interface InsightsTabProps {
  data: UserFootprintData;
  calcResult: ReturnType<typeof calculateFootprint>;
  committedActions: string[];
  setCommittedActions: (fn: (d: string[]) => string[]) => void;
  t: any;
  lang: 'en' | 'hi';
  isDarkMode: boolean;
}

interface AICoachState {
  isOpen: boolean;
  isLoading: boolean;
  actionId: string;
  actionTitle: string;
  payload: string;
  error: string | null;
}

export function InsightsTab({ data, calcResult, committedActions, setCommittedActions, t, lang, isDarkMode }: InsightsTabProps) {
  const insights = generateInsights(data, calcResult);
  const [expandedActionId, setExpandedActionId] = useState<string | null>(null);
  const [completedSubsteps, setCompletedSubsteps] = useState<Record<string, Record<number, boolean>>>({});
  
  const [aiCoach, setAICoach] = useState<AICoachState>({
    isOpen: false,
    isLoading: false,
    actionId: '',
    actionTitle: '',
    payload: '',
    error: null
  });

  const [loadingMessage, setLoadingMessage] = useState('Consulting Climate Coach...');

  let highestCategory = 'transport';
  let maxVal = 0;
  for (const [k, v] of Object.entries(calcResult.breakdown)) {
    if ((v as number) > maxVal) {
      maxVal = v as number;
      highestCategory = k;
    }
  }

  const handleCommit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    setCommittedActions(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleAccordion = (id: string) => {
    setExpandedActionId(prev => (prev === id ? null : id));
  };

  const toggleSubstep = (actionId: string, index: number) => {
    setCompletedSubsteps(prev => {
      const actionSubsteps = prev[actionId] || {};
      return {
        ...prev,
        [actionId]: {
          ...actionSubsteps,
          [index]: !actionSubsteps[index]
        }
      };
    });
  };

  const triggerAICoach = async (actionId: string, actionTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();

    setAICoach({
      isOpen: true,
      isLoading: true,
      actionId,
      actionTitle,
      payload: '',
      error: null
    });

    const messages = [
      "Analyzing your specific carbon footprint details...",
      "Evaluating transport vs. shopping distribution...",
      "Calculating target carbon reduction scenarios...",
      "Structuring 4-week micro-composure benchmarks...",
      "Polishing personalized implementation playbooks..."
    ];
    let msgIdx = 0;
    setLoadingMessage(messages[0]);
    const timer = setInterval(() => {
      msgIdx = (msgIdx + 1) % messages.length;
      setLoadingMessage(messages[msgIdx]);
    }, 2800);

    try {
      const response = await fetch("/api/coach-deepdive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actionId,
          actionTitle,
          userFootprint: data
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const resData = await response.json();
      setAICoach(prev => ({
        ...prev,
        isLoading: false,
        payload: resData.plan
      }));
    } catch (err: any) {
      console.error("Coach execution failed:", err);
      setAICoach(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || "Failed to reach climate coach. Please verify internet connection."
      }));
    } finally {
      clearInterval(timer);
    }
  };

  const totalPotentialSavings = insights.reduce((acc, curr) => acc + curr.impactKg, 0);
  const activeSavings = committedActions.map(id => insights.find(i => i.id === id)?.impactKg || 0).reduce((a, b) => a + b, 0);
  const equivalents = getEquivalencies(activeSavings > 0 ? activeSavings : totalPotentialSavings);
  const translatedHighestCategory = highestCategory === 'transport' ? t.transport : highestCategory === 'home' ? t.homeEnergy : highestCategory === 'diet' ? t.diet : t.shopping;

  const theme = {
    card: isDarkMode ? 'bg-[#131916] border-[#25302A] text-white shadow-md' : 'bg-white border-[#DDE5DF] text-[#1B2B24] shadow-sm',
    badge: isDarkMode ? 'bg-[#1C2520] text-[#2EAF6C]' : 'bg-[#E8F3EC] text-[#1F7A4C]',
    subCard: isDarkMode ? 'bg-[#1C2520] border-[#25302A]' : 'bg-[#F2F5F3] border-[#DDE5DF]'
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Smart Climate Coach Intro Banner */}
      <div className="bg-gradient-to-br from-[#1F7A4C] to-[#0A2F1D] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-15 pointer-events-none transform scale-125">
          <Bot size={130} />
        </div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
            <Bot size={16} />
          </div>
          <h2 className="text-md md:text-lg font-extrabold tracking-tight font-display">{t.curatedMissionsTitle}</h2>
        </div>
        
        <p className="text-emerald-100/90 text-xs md:text-sm mb-6 max-w-lg leading-relaxed font-medium">
          {t.highestEmissionsIn.replace('{category}', translatedHighestCategory).replace('{val}', Math.round(maxVal).toString())}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/15">
            <TrendingDown className="text-emerald-400 shrink-0" size={18} />
            <div>
              <span className="block text-[9px] uppercase text-emerald-300 font-extrabold tracking-wider">{t.potentialSavings}</span>
              <span className="font-mono text-sm md:text-md font-black">{totalPotentialSavings} kg CO₂ / yr</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/15">
            <Target className="text-[#2EAF6C] shrink-0" size={18} />
            <div>
              <span className="block text-[9px] uppercase text-emerald-300 font-extrabold tracking-wider">{t.committedSavings}</span>
              <span className="font-mono text-sm md:text-md font-black text-emerald-300">{activeSavings} kg CO₂ / yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carbon Impact Equivalency Engine */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center ${theme.card}`}>
          <TreePine size={22} className="text-[#1F7A4C] dark:text-[#2EAF6C] mb-1.5" />
          <span className="text-2xl font-extrabold font-mono">{equivalents.trees}</span>
          <span className="text-[9px] text-[#6C7A73] uppercase font-bold tracking-wider mt-1">{t.treesPlanted}</span>
        </div>
        <div className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center ${theme.card}`}>
          <LeafyGreen size={22} className="text-[#1F7A4C] dark:text-[#2EAF6C] mb-1.5" />
          <span className="text-2xl font-extrabold font-mono">{equivalents.kmDriven.toLocaleString()}</span>
          <span className="text-[9px] text-[#6C7A73] uppercase font-bold tracking-wider mt-1">{t.carKmSaved}</span>
        </div>
        <div className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center ${theme.card}`}>
          <ZapIcon size={22} className="text-amber-500 mb-1.5" />
          <span className="text-2xl font-extrabold font-mono">{equivalents.kwhSaved.toLocaleString()}</span>
          <span className="text-[9px] text-[#6C7A73] uppercase font-bold tracking-wider mt-1">{t.kwhEnergySaved}</span>
        </div>
      </div>

      {/* Recommended Action Missions */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#6C7A73]">{t.actionMissionsHeader}</h3>
          <span className="text-[10px] text-[#1F7A4C] dark:text-[#2EAF6C] font-bold">{t.actionTipInstruction}</span>
        </div>

        {insights.map((action, idx) => {
          const isCommitted = committedActions.includes(action.id);
          const isExpanded = expandedActionId === action.id;
          const details = ACTION_DETAILS[action.id];

          const substepsDone = completedSubsteps[action.id] || {};
          const numDone = Object.values(substepsDone).filter(Boolean).length;
          const totalSubsteps = details?.implementationTips?.length || 0;

          return (
            <div 
              key={action.id}
              onClick={() => toggleAccordion(action.id)}
              className={`border rounded-2xl overflow-hidden cursor-pointer transition-all ${
                isCommitted 
                  ? 'bg-[#1F7A4C]/5 border-[#1F7A4C]/35' 
                  : (isDarkMode ? 'bg-[#131916] border-[#25302A] hover:bg-[#1C2520]' : 'bg-white border-[#DDE5DF] hover:bg-[#F2F5F3]')
              }`}
            >
              <div className="p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  
                  {/* Committal circle tick box */}
                  <button
                    role="checkbox"
                    aria-checked={isCommitted}
                    onClick={(e) => handleCommit(action.id, e)}
                    className={`mt-1 shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none ${
                      isCommitted 
                        ? 'bg-[#1F7A4C] border-[#1F7A4C] text-white' 
                        : 'border-stone-300 dark:border-stone-700 hover:border-[#1F7A4C]'
                    }`}
                  >
                    {isCommitted ? <Check size={14} strokeWidth={3} /> : null}
                  </button>
                  
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className={`text-xs md:text-sm font-bold leading-snug transition-colors ${isCommitted ? 'text-[#1F7A4C] dark:text-[#2EAF6C]' : ''}`}>
                      {action.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2.5 mt-2.5 text-[10px]">
                      <span className="flex items-center gap-1 font-mono font-bold text-[#6C7A73]">
                        <Zap size={11} className="text-amber-500" />
                        {t.savesPerYear.replace('{val}', action.impactKg.toString())}
                      </span>
                      <span className="text-stone-300 dark:text-[#25302A]">|</span>
                      <span className={`px-2 py-0.5 rounded font-extrabold uppercase tracking-wide border ${
                        action.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500 border-green-500/10' :
                        action.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/10' :
                        'bg-red-500/10 text-red-500 border-red-500/10'
                      }`}>
                        {action.difficulty}
                      </span>
                      
                      {totalSubsteps > 0 && (
                        <>
                          <span className="text-stone-300 dark:text-[#25302A]">|</span>
                          <span className="text-[#6C7A73] dark:text-zinc-400 font-bold bg-stone-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-transparent">
                            Milestones: {numDone}/{totalSubsteps} Done
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-stone-400 self-center shrink-0">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Accordion Expandable Science playbooks */}
              {isExpanded && details && (
                <div className="border-t border-stone-100 dark:border-[#25302A] bg-stone-50/50 dark:bg-zinc-900/10 p-5 space-y-5 animate-in fade-in duration-200" onClick={(e) => e.stopPropagation()}>
                  
                  {/* Explanation context */}
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase text-[#6C7A73] font-bold tracking-widest flex items-center gap-1.5">
                      <Info size={12} className="text-[#1F7A4C]" /> {t.whyItMatters}
                    </span>
                    <p className="text-[#6C7A73] dark:text-zinc-300 leading-relaxed font-semibold">
                      {details.explanation}
                    </p>
                  </div>

                  {/* Curated Feasibility & ROI Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-stone-100/40 dark:bg-[#1E2521]/40 p-4 rounded-xl border border-[#DDE5DF]/30 dark:border-[#25302A]/40 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase text-[#6C7A73] font-bold tracking-wider block">{t.estCost}</span>
                      <div className="flex items-center gap-1.5 text-[#1B2B24] dark:text-slate-200 mt-1 font-bold">
                        <Coins size={13} className="text-amber-500" />
                        <span>{details.cost}</span>
                      </div>
                    </div>
                    <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-[#DDE5DF]/40 dark:border-[#25302A]/40 pt-2 sm:pt-0 sm:pl-4">
                      <span className="text-[9px] uppercase text-[#6C7A73] font-bold tracking-wider block">{t.financialSavings}</span>
                      <div className="flex items-center gap-1.5 text-[#1B2B24] dark:text-slate-200 mt-1 font-bold">
                        <PiggyBank size={13} className="text-[#1F7A4C]" />
                        <span>{details.savings}</span>
                      </div>
                    </div>
                    <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-[#DDE5DF]/40 dark:border-[#25302A]/40 pt-2 sm:pt-0 sm:pl-4">
                      <span className="text-[9px] uppercase text-[#6C7A73] font-bold tracking-wider block">{t.feasibility}</span>
                      <div className="mt-1 flex items-center justify-between font-bold">
                        <span className="text-emerald-500">{details.feasibilityScore}% Feasible</span>
                      </div>
                      <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-1 mt-1.5">
                        <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${details.feasibilityScore}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Milestones Checklist */}
                  <div className="space-y-2.5 text-xs">
                    <span className="text-[10px] uppercase text-[#6C7A73] font-bold tracking-wider block">{t.milestones}</span>
                    <div className="space-y-2">
                      {details.implementationTips.map((tip, tipIdx) => {
                        const isDone = substepsDone[tipIdx] || false;
                        return (
                          <div 
                            key={tipIdx}
                            onClick={() => toggleSubstep(action.id, tipIdx)}
                            className="flex items-start gap-2.5 p-2 rounded-xl border border-transparent hover:bg-stone-100 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors"
                          >
                            <div className="mt-0.5 shrink-0">
                              {isDone ? (
                                <CheckCircle2 size={15} className="text-emerald-500" />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-full border border-stone-300 dark:border-stone-700" />
                              )}
                            </div>
                            <span className={`font-semibold ${isDone ? 'line-through text-stone-400' : 'text-[#6C7A73] dark:text-zinc-300'}`}>
                              {tip}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vetted Resources */}
                  {details.resources && details.resources.length > 0 && (
                    <div className="space-y-2.5 text-xs">
                      <span className="text-[10px] uppercase text-[#6C7A73] font-bold tracking-wider block">{t.verifiedResources}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {details.resources.map((res, resIdx) => (
                          <a 
                            key={resIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white dark:bg-[#131916] p-3 rounded-xl border border-[#DDE5DF]/40 dark:border-[#25302A] hover:border-[#1F7A4C] Transition-all flex flex-col justify-between group"
                          >
                            <div>
                              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B2B24] dark:text-stone-100 group-hover:text-[#1F7A4C] dark:group-hover:text-[#2EAF6C] mb-1">
                                <Link2 size={12} className="text-emerald-500 shrink-0" />
                                {res.name}
                              </div>
                              <p className="text-[11px] text-[#6C7A73] leading-normal font-semibold">
                                {res.description}
                              </p>
                            </div>
                            <span className="text-[9px] text-[#1F7A4C] dark:text-[#2EAF6C] font-black mt-2 align-bottom self-end uppercase group-hover:underline">{t.openSite}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ask Coach customized triggers */}
                  <div className="pt-2 border-t border-stone-200/40 dark:border-[#25302A]/40 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => triggerAICoach(action.id, action.title, e)}
                      className="bg-[#1F7A4C] hover:bg-[#2E8B57] text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                    >
                      <Sparkles size={13} className="animate-pulse text-amber-300" />
                      <span>{t.askCoachBtn}</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic Climate Coach AI Modal Overlay */}
      {aiCoach.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B100D]/80 backdrop-blur-md anim-fade-in" role="dialog" aria-modal="true">
          <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${
            isDarkMode ? 'bg-[#131916] border-[#25302A]' : 'bg-white border-[#DDE5DF]'
          }`}>
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#1F7A4C] to-[#2E8B57] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Sparkles size={14} className="text-amber-300" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">{lang === 'hi' ? "स्मार्ट क्लाइमेट कोच एआई" : "Smart Climate Coach AI"}</h4>
                  <p className="text-[9px] text-emerald-200 font-bold uppercase tracking-wider">{t.modalSubheading}</p>
                </div>
              </div>
              <button 
                onClick={() => setAICoach(prev => ({ ...prev, isOpen: false }))}
                className="text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Canvas */}
            <div className="p-6 overflow-y-auto space-y-4">
              
              {/* Mission Target Indicator */}
              <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-[#1C2520] border-[#25302A]' : 'bg-stone-50 border-stone-200'}`}>
                <span className="text-[9px] uppercase tracking-wider text-[#6C7A73] font-bold">{lang === 'hi' ? "चयनित मिशन" : "Selected Mission"}</span>
                <p className="text-xs md:text-sm font-bold">{aiCoach.actionTitle}</p>
              </div>

              {/* Loading State */}
              {aiCoach.isLoading && (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <Loader2 className="animate-spin text-[#1F7A4C] dark:text-[#2EAF6C]" size={36} strokeWidth={2.5} />
                    <Sparkles className="absolute inset-0 m-auto text-amber-500 animate-ping" size={12} />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-xs md:text-sm font-bold text-[#1F7A4C] dark:text-[#2EAF6C] animate-pulse">{loadingMessage}</p>
                    <p className="text-[10px] text-[#6C7A73] font-semibold">Gemini is structuring custom 4-week micro carbon action plans...</p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {aiCoach.error && (
                <div className="bg-red-500/5 border border-red-500/20 px-4 py-4 rounded-xl space-y-2 text-center text-xs">
                  <h5 className="font-bold text-red-500">{lang === 'hi' ? "एआई कोच कनेक्ट फेल" : "Failed to connect to AI Coach"}</h5>
                  <p className="text-[11px] text-[#6C7A73]">{aiCoach.error}</p>
                  <button
                    onClick={(e) => triggerAICoach(aiCoach.actionId, aiCoach.actionTitle, e)}
                    className="mt-2 bg-[#1F7A4C] text-white font-bold text-[10px] py-1.5 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.retryCoach}
                  </button>
                </div>
              )}

              {/* Markdown Playbook payload */}
              {!aiCoach.isLoading && !aiCoach.error && aiCoach.payload && (
                <div className="markdown-body leading-relaxed text-xs md:text-sm space-y-4">
                  <Markdown components={{
                    h3: ({node, ...props}) => <h3 className={`text-xs md:text-sm font-bold border-b pb-1.5 mt-5 first:mt-0 tracking-tight ${isDarkMode ? 'border-[#25302A] text-white' : 'border-stone-200 text-[#1B2B24]'}`} {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-[11px] md:text-xs font-black uppercase text-amber-600 dark:text-amber-500 mt-4" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 text-[#6C7A73] dark:text-zinc-300 leading-relaxed font-semibold" {...props} />,
                    li: ({node, ...props}) => <li className="list-disc list-inside ml-2.5 mb-1 text-[#6C7A73] dark:text-zinc-300 font-semibold" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-1.5 my-3" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-[#1F7A4C] dark:text-[#2EAF6C] font-extrabold" {...props} />
                  }}>
                    {aiCoach.payload}
                  </Markdown>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className={`px-6 py-4 border-t flex justify-between items-center bg-stone-50 dark:bg-stone-900/40 ${
              isDarkMode ? 'border-[#25302A]' : 'border-[#DDE5DF]'
            }`}>
              <span className="text-[9px] text-[#6C7A73] font-mono font-bold">{t.coachEngine}</span>
              <button
                onClick={() => setAICoach(prev => ({ ...prev, isOpen: false }))}
                className="bg-[#1F7A4C] hover:bg-[#2E8B57] text-white font-bold text-xs py-2 px-5 rounded-xl transition-colors cursor-pointer"
              >
                {t.doneReading}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
