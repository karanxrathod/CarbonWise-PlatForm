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
}

interface AICoachState {
  isOpen: boolean;
  isLoading: boolean;
  actionId: string;
  actionTitle: string;
  payload: string;
  error: string | null;
}

export function InsightsTab({ data, calcResult, committedActions, setCommittedActions }: InsightsTabProps) {
  const insights = generateInsights(data, calcResult);
  
  // Accordion state to track which card is expanded
  const [expandedActionId, setExpandedActionId] = useState<string | null>(null);

  // Gamified interactive checklists for each action
  const [completedSubsteps, setCompletedSubsteps] = useState<Record<string, Record<number, boolean>>>({});

  // Dynamic AI coach state
  const [aiCoach, setAICoach] = useState<AICoachState>({
    isOpen: false,
    isLoading: false,
    actionId: '',
    actionTitle: '',
    payload: '',
    error: null
  });

  // Reassuring animated messages during Gemini generation
  const [loadingMessage, setLoadingMessage] = useState('Consulting Climate Coach...');

  // Identify highest emission category for Context
  let highestCategory = 'transport';
  let maxVal = 0;
  for (const [k, v] of Object.entries(calcResult.breakdown)) {
    if ((v as number) > maxVal) {
      maxVal = v as number;
      highestCategory = k;
    }
  }

  const handleCommit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering accordion expansion
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

  // Triggers the Express endpoint to run server-side Gemini playbook
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

    // Stagger loading messages to entertain user during the brief model generation
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

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Smart Climate Coach Intro */}
      <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 border border-emerald-800 rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Bot size={120} className="text-emerald-400" />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center">
            <Bot size={18} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Smart Climate Coach</h2>
        </div>
        
        <p className="text-emerald-100/80 mb-6 max-w-lg leading-relaxed">
          I've analyzed your profile. Your highest emissions come from <strong className="text-emerald-300 capitalize">{highestCategory}</strong> ({Math.round(maxVal)} kg). 
          I've generated these curated mission targets to maximize your impact. Click any target to expand details!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/80">
            <TrendingDown className="text-emerald-400 shrink-0" size={20} />
            <div>
              <span className="block text-[10px] uppercase text-emerald-400 font-bold tracking-wider">Potential Savings</span>
              <span className="font-mono font-bold text-lg text-white">{totalPotentialSavings} kg CO₂ / yr</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-emerald-950/60 p-4 rounded-xl border border-emerald-800/80">
            <Target className="text-emerald-400 shrink-0" size={20} />
            <div>
              <span className="block text-[10px] uppercase text-emerald-400 font-bold tracking-wider">Committed Savings</span>
              <span className="font-mono font-bold text-lg text-emerald-300">{activeSavings} kg CO₂ / yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carbon Impact Equivalency Engine */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-md">
          <TreePine size={24} className="text-green-400 mb-2" />
          <span className="text-3xl font-bold font-mono text-white">{equivalents.trees}</span>
          <span className="text-[10px] text-emerald-300 uppercase font-semibold tracking-wider mt-1">{activeSavings > 0 ? 'Trees Planted Effectively' : 'Potential Trees'}</span>
        </div>
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-md">
          <LeafyGreen size={24} className="text-emerald-400 mb-2" />
          <span className="text-3xl font-bold font-mono text-white">{equivalents.kmDriven.toLocaleString()}</span>
          <span className="text-[10px] text-emerald-300 uppercase font-semibold tracking-wider mt-1">Car KM Counteracted</span>
        </div>
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center backdrop-blur-sm shadow-md">
          <ZapIcon size={24} className="text-yellow-400 mb-2" />
          <span className="text-3xl font-bold font-mono text-white">{equivalents.kwhSaved.toLocaleString()}</span>
          <span className="text-[10px] text-emerald-300 uppercase font-semibold tracking-wider mt-1">kWh Home Energy</span>
        </div>
      </div>

      {/* Recommended Action Missions */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-semibold text-white">Personalized Action Missions</h3>
          <span className="text-xs text-emerald-400 font-medium">Select card for tips + links</span>
        </div>

        {insights.map((action, idx) => {
          const isCommitted = committedActions.includes(action.id);
          const isExpanded = expandedActionId === action.id;
          const details = ACTION_DETAILS[action.id];

          // Sub-steps completed counter
          const substepsDone = completedSubsteps[action.id] || {};
          const numDone = Object.values(substepsDone).filter(Boolean).length;
          const totalSubsteps = details?.implementationTips?.length || 0;

          return (
            <div 
              key={action.id}
              onClick={() => toggleAccordion(action.id)}
              className={`border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                isCommitted 
                  ? 'bg-emerald-900/10 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.08)]' 
                  : 'bg-emerald-950/40 border-emerald-900 hover:border-emerald-800 hover:bg-emerald-900/10'
              }`}
            >
              <div className="p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Custom Commit Checkbox */}
                  <button
                    role="checkbox"
                    aria-checked={isCommitted}
                    aria-label={`Commit to: ${action.title}`}
                    onClick={(e) => handleCommit(action.id, e)}
                    className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      isCommitted 
                        ? 'bg-emerald-500 border-emerald-500 text-emerald-950 scale-105' 
                        : 'border-emerald-700 hover:border-emerald-400'
                    }`}
                  >
                    {isCommitted ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : null}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`text-md md:text-lg font-semibold leading-snug transition-colors ${isCommitted ? 'text-emerald-300' : 'text-slate-100'}`}>
                      {action.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                      <span className="flex items-center gap-1 text-emerald-200 bg-emerald-950/80 px-2.5 py-1 rounded-md font-mono border border-emerald-900">
                        <Zap size={12} className="text-yellow-400" aria-hidden="true" />
                        Saves {action.impactKg} kg/yr
                      </span>
                      <span className={`px-2.5 py-1 rounded-md uppercase tracking-wider text-[9px] font-bold border ${
                        action.difficulty === 'Easy' ? 'bg-green-500/10 text-green-300 border-green-500/20' :
                        action.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20' :
                        'bg-orange-500/10 text-orange-300 border-orange-500/20'
                      }`}>
                        {action.difficulty}
                      </span>
                      
                      {totalSubsteps > 0 && (
                        <span className="text-emerald-400 font-medium bg-emerald-900/30 px-2 py-1 rounded border border-emerald-800/30 text-[10px]">
                          Steps: {numDone}/{totalSubsteps} Done
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expansion Toggle Chevron */}
                <div className="text-emerald-600 self-center shrink-0">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Expandable Section with curated information and AI Strategy triggers */}
              {isExpanded && details && (
                <div className="border-t border-emerald-900 bg-emerald-950/60 p-5 space-y-5 animate-in fade-in duration-200" onClick={(e) => e.stopPropagation()}>
                  
                  {/* Detailed Science description */}
                  <div className="space-y-1.5">
                    <span className="text-xs uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
                      <Info size={13} className="text-emerald-500" /> Why It Matters
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {details.explanation}
                    </p>
                  </div>

                  {/* Curated Feasibility & ROI Dashboard */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-emerald-900/10 p-4 rounded-xl border border-emerald-900">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase text-emerald-400/80 font-bold tracking-wider block">Estimated Cost</span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
                        <Coins size={14} className="text-emerald-400" />
                        <span className="font-semibold">{details.cost}</span>
                      </div>
                    </div>
                    <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-emerald-900 pt-2 sm:pt-0 sm:pl-4">
                      <span className="text-[10px] uppercase text-emerald-400/80 font-bold tracking-wider block font-sans">Financial Savings</span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
                        <PiggyBank size={14} className="text-emerald-400" />
                        <span className="font-semibold">{details.savings}</span>
                      </div>
                    </div>
                    <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-emerald-900 pt-2 sm:pt-0 sm:pl-4">
                      <span className="text-[10px] uppercase text-emerald-400/80 font-bold tracking-wider block">Ease Level</span>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="font-semibold text-emerald-300">{details.feasibilityScore}% Feasible</span>
                      </div>
                      <div className="w-full bg-emerald-950 rounded-full h-1.5 mt-1 border border-emerald-900/50">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${details.feasibilityScore}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Stateful Interactive Checklist */}
                  <div className="space-y-2.5">
                    <span className="text-xs uppercase text-emerald-400 font-bold tracking-wider block">Commencement Milestones</span>
                    <div className="space-y-2">
                      {details.implementationTips.map((tip, tipIdx) => {
                        const isDone = substepsDone[tipIdx] || false;
                        return (
                          <div 
                            key={tipIdx}
                            onClick={() => toggleSubstep(action.id, tipIdx)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-900/20 cursor-pointer transition-colors"
                          >
                            <div className="mt-0.5 shrink-0">
                              {isDone ? (
                                <CheckCircle2 size={16} className="text-emerald-400 fill-emerald-950" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-emerald-700 hover:border-emerald-500" />
                              )}
                            </div>
                            <span className={`text-xs ${isDone ? 'line-through text-emerald-500/80' : 'text-slate-300'}`}>
                              {tip}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Vetted Public External Solutions/Tools */}
                  {details.resources && details.resources.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-xs uppercase text-emerald-400 font-bold tracking-wider block">Verified Technical Resource Links</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {details.resources.map((res, resIdx) => (
                          <a 
                            key={resIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-950 p-3 rounded-xl border border-emerald-900 hover:border-emerald-600 transition-colors flex flex-col justify-between group"
                          >
                            <div>
                              <div className="flex items-center gap-1 text-slate-100 group-hover:text-emerald-300 font-semibold text-xs mb-1">
                                <Link2 size={12} className="text-emerald-500 shrink-0" />
                                {res.name}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-normal">
                                {res.description}
                              </p>
                            </div>
                            <span className="text-[9px] text-emerald-500 font-bold mt-2 align-bottom self-end group-hover:underline">Open Site &rarr;</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wand - Dynamic AI strategy launcher */}
                  <div className="pt-2 border-t border-emerald-900/50 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => triggerAICoach(action.id, action.title, e)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <Sparkles size={14} className="animate-pulse" />
                      Ask AI Coach for Tailored Plan
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-md anim-fade-in" role="dialog" aria-modal="true">
          <div className="w-full max-w-2xl bg-emerald-950 border border-emerald-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 px-6 py-4 border-b border-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-md text-white">Smart Climate Coach</h4>
                  <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Dynamic Transition Playbook</p>
                </div>
              </div>
              <button 
                onClick={() => setAICoach(prev => ({ ...prev, isOpen: false }))}
                className="text-emerald-400 hover:text-white p-1 rounded-lg hover:bg-emerald-900 transition-colors"
                aria-label="Close Playbook Modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Canvas */}
            <div className="p-6 overflow-y-auto space-y-4">
              
              {/* Mission Target Indicator */}
              <div className="bg-emerald-900/20 p-3 rounded-xl border border-emerald-800/40">
                <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Selected Mission</span>
                <p className="text-sm font-semibold text-slate-100">{aiCoach.actionTitle}</p>
              </div>

              {/* Loading State */}
              {aiCoach.isLoading && (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <Loader2 className="animate-spin text-emerald-400" size={44} strokeWidth={2} />
                    <Sparkles className="absolute inset-0 m-auto text-yellow-400 animate-ping" size={16} />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm text-emerald-200 font-semibold animate-pulse">{loadingMessage}</p>
                    <p className="text-xs text-slate-400">Gemini-3.5 is crafting custom carbon mathematical schedules...</p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {aiCoach.error && (
                <div className="bg-red-950/20 border border-red-900 px-4 py-4 rounded-xl space-y-2 text-center">
                  <h5 className="font-bold text-red-400 text-sm">Failed to connect to AI Coach</h5>
                  <p className="text-xs text-slate-400">{aiCoach.error}</p>
                  <button
                    onClick={(e) => triggerAICoach(aiCoach.actionId, aiCoach.actionTitle, e)}
                    className="mt-2 bg-red-900 hover:bg-red-800 text-white font-semibold text-xs py-1.5 px-4 rounded-lg transition-colors"
                  >
                    Retry Coach Consultation
                  </button>
                </div>
              )}

              {/* Markdown Playbook payload */}
              {!aiCoach.isLoading && !aiCoach.error && aiCoach.payload && (
                <div className="markdown-body text-slate-200 leading-relaxed text-sm space-y-5">
                  <Markdown components={{
                    h3: ({node, ...props}) => <h3 className="text-base font-bold text-white border-b border-emerald-900 pb-1.5 mt-5 first:mt-0 tracking-tight" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-sm font-bold text-emerald-400 mt-4" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 text-slate-300 leading-relaxed text-xs md:text-sm" {...props} />,
                    li: ({node, ...props}) => <li className="list-disc list-inside ml-2.5 mb-1 text-slate-300 text-xs md:text-sm" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-1.5 my-3" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-emerald-300 font-semibold" {...props} />
                  }}>
                    {aiCoach.payload}
                  </Markdown>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-emerald-950 px-6 py-4 border-t border-emerald-900 flex justify-between items-center bg-emerald-900/10">
              <span className="text-[10px] text-emerald-400/60 font-mono font-bold">Model Engine: gemini-3.5-flash</span>
              <button
                onClick={() => setAICoach(prev => ({ ...prev, isOpen: false }))}
                className="bg-emerald-900 hover:bg-emerald-800 text-slate-200 hover:text-white font-bold text-xs py-2 px-5 rounded-xl transition-colors border border-emerald-800"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
