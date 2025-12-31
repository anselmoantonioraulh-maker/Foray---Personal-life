
import React from 'react';
import { ChevronLeft, Sun, Moon, Monitor, Palette, Bell, Shield, Info } from 'lucide-react';
import { Theme } from '../types';

interface SettingsViewProps {
  onBack: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack, theme, onThemeChange }) => {
  const themeOptions = [
    { id: 'light', label: 'Claro', icon: <Sun className="w-5 h-5" /> },
    { id: 'dark', label: 'Escuro', icon: <Moon className="w-5 h-5" /> },
    { id: 'system', label: 'Sistema', icon: <Monitor className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 sticky top-0 z-30">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-700 dark:text-slate-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Definições</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-32">
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-5 h-5 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Aparência</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onThemeChange(option.id as Theme)}
                className={`flex flex-col items-center justify-center p-4 rounded-[24px] border-2 transition-all gap-2 ${
                  theme === option.id 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-white dark:bg-slate-900 border-transparent text-slate-400 dark:text-slate-600'
                }`}
              >
                {option.icon}
                <span className="text-xs font-bold">{option.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Notificações</h2>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-[28px] p-4 border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700 dark:text-slate-300">Lembretes Diários</span>
              <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <span className="font-medium text-slate-700 dark:text-slate-300">Alertas de Eventos</span>
              <div className="w-12 h-6 bg-slate-200 dark:bg-slate-800 rounded-full relative cursor-not-allowed">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Privacidade</h2>
          </div>
          <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <span className="font-medium">Cópia de Segurança (Local)</span>
            <Info className="w-4 h-4 opacity-30" />
          </button>
        </section>

        <div className="pt-8 text-center">
          <p className="text-xs font-bold text-slate-300 dark:text-slate-700 uppercase tracking-[0.2em]">Equilíbrio v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
