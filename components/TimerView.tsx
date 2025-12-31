
import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Save } from 'lucide-react';
import { Category } from '../types';
import { CATEGORY_CONFIG } from '../constants';

interface TimerViewProps {
  onLogSession: (duration: number, category: Category) => void;
}

const TimerView: React.FC<TimerViewProps> = ({ onLogSession }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Category>(Category.SCHOOL);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const handleSave = () => {
    if (seconds > 0) {
      onLogSession(seconds, selectedCat);
      reset();
      alert('Sessão registrada com sucesso!');
    }
  };

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const categories = [Category.SPIRITUAL, Category.SCHOOL, Category.SECULAR, Category.DOMESTIC];

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center space-y-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Cronômetro</h1>
        <p className="text-slate-500 dark:text-slate-400">Mantenha o foco em suas atividades</p>
      </header>

      <div className="relative w-64 h-64 flex items-center justify-center bg-white dark:bg-slate-900 rounded-full shadow-2xl border-8 border-slate-50 dark:border-slate-800">
        <div className={`absolute inset-0 rounded-full border-4 border-dashed animate-spin-slow opacity-20 ${CATEGORY_CONFIG[selectedCat].textColor}`} style={{ animationDuration: '20s' }}></div>
        <span className="text-5xl font-mono font-bold text-slate-800 dark:text-slate-100 tracking-tighter">
          {formatTime(seconds)}
        </span>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={reset}
          className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl active:scale-90 transition-transform"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <button 
          onClick={toggle}
          className={`p-6 rounded-3xl text-white shadow-xl active:scale-95 transition-all ${isActive ? 'bg-amber-500 shadow-amber-100 dark:shadow-none' : 'bg-indigo-600 shadow-indigo-100 dark:shadow-none'}`}
        >
          {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current" />}
        </button>
        <button 
          onClick={handleSave}
          className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl active:scale-90 transition-transform"
        >
          <Save className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full">
        <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-4">Escolha a categoria</p>
        <div className="grid grid-cols-2 gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`p-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                selectedCat === cat 
                ? `${CATEGORY_CONFIG[cat].color} border-transparent text-white shadow-lg` 
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600'
              }`}
            >
              {CATEGORY_CONFIG[cat].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerView;
