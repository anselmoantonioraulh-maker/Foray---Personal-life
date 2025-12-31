
import React, { useState, useMemo } from 'react';
import { Category, Task } from '../types';
import { CATEGORY_CONFIG } from '../constants';
import { ChevronLeft, Plus, CheckCircle2, Circle, Trash2, Quote } from 'lucide-react';

interface CategoryViewProps {
  category: Category;
  onBack: () => void;
  tasks: Task[];
  addTask: (title: string, cat: Category, sub?: string) => void;
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

  // Seleciona uma frase aleatória apenas quando a categoria muda ou o componente monta
  const randomPhrase = useMemo(() => {
    if (!config.phrases || config.phrases.length === 0) return null;
    const index = Math.floor(Math.random() * config.phrases.length);
    return config.phrases[index];
  }, [category]);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, category, selectedSub);
    setNewTaskTitle('');
  };

  const filteredTasks = tasks.filter(t => t.category === category);

  return (
    <div className="flex flex-col h-full bg-slate-50">
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
        {/* Frase Inspiracional */}
        {randomPhrase && (
          <section className={`${config.lightColor} p-5 rounded-[32px] border border-white/50 shadow-sm relative overflow-hidden`}>
            <Quote className={`absolute -top-2 -right-2 w-16 h-16 opacity-10 ${config.textColor}`} />
            <p className={`text-sm md:text-base font-medium italic ${config.textColor} leading-relaxed relative z-10`}>
              {randomPhrase}
            </p>
          </section>
        )}

        {/* Subcategories Selector */}
        <section>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {config.subCategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSub(sub)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                  selectedSub === sub 
                  ? `${config.color} text-white shadow-md` 
                  : 'bg-white text-slate-400 border border-slate-100'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </section>

        {/* Add Task Input */}
        <section className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-3">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Nova tarefa..."
            className="flex-1 bg-transparent border-none outline-none text-slate-700 font-medium placeholder:text-slate-300"
          />
          <button 
            onClick={handleAddTask}
            className={`p-2 rounded-xl ${config.color} text-white transition-transform active:scale-90`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </section>

        {/* Tasks List */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-800 ml-1">Tarefas</h2>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 opacity-30 italic text-slate-500">
              Nenhuma tarefa nesta área.
            </div>
          ) : (
            filteredTasks
              .filter(t => !selectedSub || t.subCategory === selectedSub)
              .map(task => (
              <div 
                key={task.id} 
                className={`p-4 rounded-2xl bg-white border border-slate-100 flex items-center gap-4 transition-all ${task.completed ? 'opacity-60' : ''}`}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`transition-colors ${task.completed ? config.textColor : 'text-slate-300'}`}
                >
                  {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </button>
                <div className="flex-1">
                  <p className={`font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {task.title}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{task.subCategory}</p>
                </div>
                <button 
                  onClick={() => removeTask(task.id)}
                  className="p-2 text-slate-300 hover:text-red-400 transition-colors"
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
