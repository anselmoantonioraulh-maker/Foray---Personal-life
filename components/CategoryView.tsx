
import React, { useState, useMemo } from 'react';
import { Category, Task } from '../types';
import { CATEGORY_CONFIG } from '../constants';
import { ChevronLeft, Plus, CheckCircle2, Circle, Trash2, Quote, Calendar, Bell, ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryViewProps {
  category: Category;
  onBack: () => void;
  tasks: Task[];
  addTask: (title: string, cat: Category, sub?: string, dueDate?: string, reminderTime?: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ 
  category, 
  onBack, 
  tasks, 
  addTask, 
  toggleTask,
  removeTask 
}) => {
  const config = CATEGORY_CONFIG[category];
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedSub, setSelectedSub] = useState(config.subCategories[0] || '');
  const [dueDate, setDueDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const randomPhrase = useMemo(() => {
    if (!config.phrases || config.phrases.length === 0) return null;
    const index = Math.floor(Math.random() * config.phrases.length);
    return config.phrases[index];
  }, [category]);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, category, selectedSub, dueDate || undefined, reminderTime || undefined);
    setNewTaskTitle('');
    setDueDate('');
    setReminderTime('');
    setShowOptions(false);
  };

  const filteredTasks = tasks.filter(t => t.category === category);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className={`p-6 ${config.color} text-white rounded-b-[40px] shadow-xl relative z-10`}>
        <button onClick={onBack} className="mb-6 p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-white/20 rounded-2xl">
            {config.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{config.label}</h1>
            <p className="text-white/80 text-sm font-medium">{filteredTasks.filter(t => !t.completed).length} pendentes</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-32">
        {randomPhrase && (
          <section className={`${config.lightColor} dark:bg-slate-900 p-5 rounded-[32px] border border-white/50 dark:border-slate-800 shadow-sm relative overflow-hidden`}>
            <Quote className={`absolute -top-2 -right-2 w-16 h-16 opacity-10 ${config.textColor} dark:text-slate-600`} />
            <p className={`text-sm md:text-base font-medium italic ${config.textColor} dark:text-slate-300 leading-relaxed relative z-10`}>
              {randomPhrase}
            </p>
          </section>
        )}

        <section>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {config.subCategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSub(sub)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                  selectedSub === sub 
                  ? `${config.color} text-white shadow-md` 
                  : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-3 transition-all">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                placeholder="Nova tarefa..."
                className="flex-1 bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 font-medium placeholder:text-slate-300 dark:placeholder:text-slate-700"
              />
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className="p-2 text-slate-400 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                {showOptions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <button 
                onClick={handleAddTask}
                className={`p-2 rounded-xl ${config.color} text-white transition-transform active:scale-90`}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {showOptions && (
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-50 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Data
                  </label>
                  <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2 text-xs text-slate-700 dark:text-slate-300 outline-none focus:ring-1 focus:ring-indigo-100"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase flex items-center gap-1">
                    <Bell className="w-3 h-3" /> Lembrete
                  </label>
                  <input 
                    type="time" 
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2 text-xs text-slate-700 dark:text-slate-300 outline-none focus:ring-1 focus:ring-indigo-100"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 ml-1">Tarefas</h2>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 opacity-30 italic text-slate-500 dark:text-slate-400">
              Nenhuma tarefa nesta área.
            </div>
          ) : (
            filteredTasks
              .filter(t => !selectedSub || t.subCategory === selectedSub)
              .map(task => (
              <div 
                key={task.id} 
                className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-4 transition-all ${task.completed ? 'opacity-60' : ''}`}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`transition-colors ${task.completed ? config.textColor : 'text-slate-300 dark:text-slate-700'}`}
                >
                  {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </button>
                <div className="flex-1">
                  <p className={`font-semibold ${task.completed ? 'line-through text-slate-400 dark:text-slate-600' : 'text-slate-700 dark:text-slate-200'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-600">{task.subCategory}</p>
                    {(task.dueDate || task.reminderTime) && (
                      <div className="flex items-center gap-2 opacity-60">
                         {task.dueDate && (
                           <span className="flex items-center gap-1 text-[9px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 px-1.5 py-0.5 rounded-md">
                             <Calendar className="w-2.5 h-2.5" />
                             {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                           </span>
                         )}
                         {task.reminderTime && (
                           <span className="flex items-center gap-1 text-[9px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded-md">
                             <Bell className="w-2.5 h-2.5" />
                             {task.reminderTime}
                           </span>
                         )}
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => removeTask(task.id)}
                  className="p-2 text-slate-300 dark:text-slate-700 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default CategoryView;
