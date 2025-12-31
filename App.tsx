
import React, { useState, useEffect } from 'react';
import { Category, Task, Note, Event, TimerSession } from './types';
import Dashboard from './components/Dashboard';
import CategoryView from './components/CategoryView';
import CalendarView from './components/CalendarView';
import MapView from './components/MapView';
import TimerView from './components/TimerView';
import NotesView from './components/NotesView';
import { Plus } from 'lucide-react';

const App: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'map' | 'timer' | 'notes'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Data State
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('equil_tasks');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Leitura diária da Bíblia', category: Category.SPIRITUAL, subCategory: 'Leitura da Bíblia', completed: false },
      { id: '2', title: 'Estudar para prova de História', category: Category.SCHOOL, subCategory: 'Estudar', completed: false },
      { id: '3', title: 'Limpar a cozinha', category: Category.DOMESTIC, subCategory: 'Limpeza', completed: true },
    ];
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('equil_notes');
    return saved ? JSON.parse(saved) : [
      { 
        id: '1', 
        title: 'Ideias para o Próximo Estudo', 
        content: 'Focar no tema da paciência e como aplicar no dia a dia familiar.', 
        category: Category.SPIRITUAL, 
        createdAt: new Date().toISOString() 
      },
      { 
        id: '2', 
        title: 'Lista de Livros 2024', 
        content: '1. Admirável Mundo Novo\n2. Design for Everyday Things\n3. Biografia de Leonardo da Vinci', 
        category: Category.SCHOOL, 
        createdAt: new Date().toISOString() 
      }
    ];
  });
  
  const [sessions, setSessions] = useState<TimerSession[]>([]);

  useEffect(() => {
    localStorage.setItem('equil_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('equil_notes', JSON.stringify(notes));
  }, [notes]);

  // Handlers
  const addTask = (title: string, category: Category, subCategory?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      category,
      subCategory,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const addNote = (title: string, content: string, category: Category) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      category,
      createdAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const logSession = (duration: number, category: Category) => {
    const newSession: TimerSession = {
      id: Date.now().toString(),
      duration,
      category,
      timestamp: new Date().toISOString()
    };
    setSessions([...sessions, newSession]);
  };

  const renderContent = () => {
    if (selectedCategory) {
      return (
        <CategoryView 
          category={selectedCategory} 
          onBack={() => setSelectedCategory(null)}
          tasks={tasks}
          addTask={addTask}
          toggleTask={toggleTask}
          removeTask={removeTask}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <Dashboard 
            onSelectCategory={setSelectedCategory} 
            onNavigate={setActiveTab}
            tasks={tasks} 
            onQuickNoteSave={(content) => addNote("Rascunho Rápido", content, Category.GENERAL)}
          />
        );
      case 'calendar':
        return <CalendarView />;
      case 'map':
        return <MapView />;
      case 'timer':
        return <TimerView onLogSession={logSession} />;
      case 'notes':
        return <NotesView notes={notes} onAddNote={addNote} onDeleteNote={deleteNote} />;
      default:
        return <Dashboard onSelectCategory={setSelectedCategory} onNavigate={setActiveTab} tasks={tasks} onQuickNoteSave={(content) => addNote("Rascunho Rápido", content, Category.GENERAL)} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen relative bg-slate-50 overflow-hidden flex flex-col shadow-2xl">
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Persistent Bottom Navigation */}
      {!selectedCategory && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around p-4 safe-bottom z-50 rounded-t-[32px] shadow-2xl">
          <button 
            onClick={() => setActiveTab('home')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'home' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400'}`}
          >
            <div className="flex flex-col items-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'calendar' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </button>

          <button 
            onClick={() => setActiveTab('notes')}
            className="relative -top-10 w-16 h-16 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:rotate-90 active:scale-90 border-8 border-slate-50"
          >
            <Plus className="w-8 h-8" />
          </button>

          <button 
            onClick={() => setActiveTab('map')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'map' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>

          <button 
            onClick={() => setActiveTab('timer')}
            className={`p-3 rounded-2xl transition-all ${activeTab === 'timer' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
