
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Category } from '../types';
import { CATEGORY_CONFIG } from '../constants';

const CalendarView: React.FC = () => {
  const [currentDate] = useState(new Date());
  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];

  const events = [
    { day: 15, cat: Category.SPIRITUAL, title: 'Reunião de Meio de Semana' },
    { day: 18, cat: Category.SCHOOL, title: 'Prova de Português' },
    { day: 22, cat: Category.SECULAR, title: 'Entrega de Projeto' },
  ];

  const daysInMonth = 31; 
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="p-6 h-full flex flex-col space-y-6 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-300 no-scrollbar pb-32">
      <header className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
           {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
         </h1>
         <div className="flex gap-2">
            <button className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600"><ChevronLeft className="w-5 h-5"/></button>
            <button className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600"><ChevronRight className="w-5 h-5"/></button>
         </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
         <div className="grid grid-cols-7 mb-4">
            {days.map(d => (
              <div key={d} className="text-center text-xs font-bold text-slate-300 dark:text-slate-700 py-2">{d}</div>
            ))}
         </div>
         <div className="grid grid-cols-7 gap-y-2">
            {calendarDays.map(d => {
              const hasEvent = events.find(e => e.day === d);
              return (
                <div key={d} className="flex flex-col items-center py-2 group cursor-pointer">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-xl font-semibold text-sm transition-all ${
                    d === 14 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}>
                    {d}
                  </span>
                  {hasEvent && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${CATEGORY_CONFIG[hasEvent.cat].color}`}></div>
                  )}
                </div>
              );
            })}
         </div>
      </div>

      <section className="space-y-4">
         <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Eventos de Hoje</h2>
            <button className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl"><Plus className="w-5 h-5"/></button>
         </div>
         
         <div className="space-y-3">
            {events.map((ev, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                 <div className={`w-2 self-stretch rounded-full ${CATEGORY_CONFIG[ev.cat].color}`}></div>
                 <div className="flex-1">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">{CATEGORY_CONFIG[ev.cat].label}</p>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{ev.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-500">19:30 - 21:00</p>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default CalendarView;
