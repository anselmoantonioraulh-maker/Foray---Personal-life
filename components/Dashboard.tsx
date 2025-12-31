
import React, { useMemo, useState, useEffect } from 'react';
import { Category, Task } from '../types';
import { CATEGORY_CONFIG, GLOBAL_TOOLS } from '../constants';
import { Menu, Settings, Sparkles, StickyNote, Send, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onSelectCategory: (cat: Category) => void;
  onNavigate: (tab: 'home' | 'calendar' | 'map' | 'timer' | 'notes') => void;
  tasks: Task[];
  onQuickNoteSave: (content: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectCategory, onNavigate, tasks, onQuickNoteSave }) => {
  const [quickNote, setQuickNote] = useState(() => localStorage.getItem('equil_quick_draft') || '');
  
  useEffect(() => {
    localStorage.setItem('equil_quick_draft', quickNote);
  }, [quickNote]);

  // Fix: Use 'as const' to narrow the type of cat in iterations, ensuring the compiler knows these specific categories possess illustrations
  const mainCategories = [
    Category.SPIRITUAL,
    Category.SCHOOL,
    Category.SECULAR,
    Category.DOMESTIC
  ] as const;

  const categoryPhrases = useMemo(() => {
    const map: Record<string, string> = {};
    mainCategories.forEach(cat => {
      const phrases = CATEGORY_CONFIG[cat].phrases;
      if (phrases && phrases.length > 0) {
        map[cat] = phrases[Math.floor(Math.random() * phrases.length)];
      }
    });
    return map;
  }, []);

  const handleConvertQuickNote = () => {
    if (!quickNote.trim()) return;
    onQuickNoteSave(quickNote);
    setQuickNote('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Top Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-30">
        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <Menu className="w-6 h-6 text-slate-700" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 font-jakarta">Vida Pessoal</h1>
        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <Settings className="w-6 h-6 text-slate-700" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-32">
        {/* Barra de Atalhos Rápidos */}
        <section className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {GLOBAL_TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id as any)}
              className="flex flex-col items-center gap-1.5 shrink-0 group"
            >
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                {tool.icon}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{tool.label}</span>
            </button>
          ))}
        </section>

        {/* Bloco de Notas Rápido */}
        <section className="bg-amber-50 rounded-[28px] p-5 border border-amber-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-amber-600" />
              <h2 className="text-xs font-bold text-amber-700 uppercase tracking-widest">Rascunho Rápido</h2>
            </div>
            {quickNote && (
              <button 
                onClick={handleConvertQuickNote}
                className="p-1.5 bg-amber-200 text-amber-800 rounded-lg hover:bg-amber-300 transition-colors flex items-center gap-1 text-[10px] font-bold"
              >
                <Send className="w-3 h-3" />
                SALVAR
              </button>
            )}
          </div>
          <textarea
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            placeholder="Algo em mente? Anote aqui..."
            className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-amber-300 resize-none font-medium text-sm min-h-[60px] relative z-10"
          />
        </section>

        {/* Vertical Panel of Large Cards */}
        <div className="space-y-5">
          {mainCategories.map((cat) => {
            const config = CATEGORY_CONFIG[cat];
            const catTasks = tasks.filter(t => t.category === cat && !t.completed);
            const phrase = categoryPhrases[cat];
            
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`group w-full flex flex-col items-start p-6 ${config.cardBg} rounded-[40px] shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 active:scale-98 text-left relative overflow-hidden`}
              >
                {/* Background Illustration */}
                {config.illustration}

                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div className="p-4 bg-white/20 backdrop-blur-md rounded-[24px] shadow-sm border border-white/20">
                    {config.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-2xl mb-0.5 tracking-tight">{config.label}</h3>
                    <p className="text-white/80 text-sm font-semibold">
                      {catTasks.length} tarefas pendentes
                    </p>
                  </div>
                </div>

                <div className="w-full relative z-10">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {config.subCategories.slice(0, 4).map(sub => (
                      <span key={sub} className="px-2.5 py-1 bg-black/10 text-white/90 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {sub}
                      </span>
                    ))}
                  </div>

                  {/* Motivational Footer */}
                  <div className="h-0 group-hover:h-auto group-active:h-auto overflow-hidden transition-all duration-300 ease-out">
                    <div className="pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-start gap-2">
                      <Sparkles className="w-3 h-3 mt-0.5 shrink-0 text-white/60" />
                      <p className="text-[11px] leading-tight font-medium italic text-white/90">
                        {phrase}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow hint */}
                <div className="absolute top-6 right-6 p-1.5 bg-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
