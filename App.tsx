
import React, { useState, useEffect } from 'react';
import { Category, Task, Note, Event, TimerSession, Theme } from './types';
import Dashboard from './components/Dashboard';
import CategoryView from './components/CategoryView';
import CalendarView from './components/CalendarView';
import MapView from './components/MapView';
import TimerView from './components/TimerView';
import NotesView from './components/NotesView';
import SettingsView from './components/SettingsView';
import AuthView from './components/AuthView';
import { supabase } from './lib/supabase';
// Fix: Added missing Loader2 import from lucide-react
import { Plus, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'map' | 'timer' | 'notes' | 'settings'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Theme State
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('equil_theme') as Theme) || 'system';
  });

  // Data State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [sessions, setSessions] = useState<TimerSession[]>([]);

  // Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync Data with Supabase
  useEffect(() => {
    if (session?.user) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    // Busca tarefas
    const { data: tasksData } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', session.user.id);
    if (tasksData) setTasks(tasksData);

    // Busca notas
    const { data: notesData } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', session.user.id);
    if (notesData) setNotes(notesData);
  };

  // Apply Theme
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('equil_theme', theme);
  }, [theme]);

  // Handlers
  const addTask = async (title: string, category: Category, subCategory?: string, dueDate?: string, reminderTime?: string) => {
    const newTask = {
      title,
      category,
      subCategory,
      completed: false,
      dueDate,
      reminderTime,
      user_id: session.user.id
    };

    const { data, error } = await supabase.from('tasks').insert([newTask]).select();
    if (data) setTasks([...tasks, data[0]]);
  };

  const addNote = async (title: string, content: string, category: Category) => {
    const newNote = {
      title,
      content,
      category,
      user_id: session.user.id
    };

    const { data, error } = await supabase.from('notes').insert([newNote]).select();
    if (data) setNotes([data[0], ...notes]);
  };

  const deleteNote = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id);
    setNotes(notes.filter(n => n.id !== id));
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const { error } = await supabase.from('tasks').update({ completed: !task.completed }).eq('id', id);
    if (!error) {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }
  };

  const removeTask = async (id: string) => {
    await supabase.from('tasks').delete().eq('id', id);
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

  if (loading) return <div className="h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;

  if (!session) return <AuthView />;

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
      case 'settings':
        return <SettingsView onBack={() => setActiveTab('home')} theme={theme} onThemeChange={setTheme} />;
      default:
        return <Dashboard onSelectCategory={setSelectedCategory} onNavigate={setActiveTab} tasks={tasks} onQuickNoteSave={(content) => addNote("Rascunho Rápido", content, Category.GENERAL)} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen relative bg-slate-50 dark:bg-slate-950 overflow-hidden flex flex-col shadow-2xl transition-colors duration-300">
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {!selectedCategory && activeTab !== 'settings' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 flex items-center justify-around p-4 safe-bottom z-50 rounded-t-[32px] shadow-2xl transition-colors">
          <button onClick={() => setActiveTab('home')} className={`p-3 rounded-2xl transition-all ${activeTab === 'home' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 dark:text-slate-600'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg></button>
          <button onClick={() => setActiveTab('calendar')} className={`p-3 rounded-2xl transition-all ${activeTab === 'calendar' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 dark:text-slate-600'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button>
          <button onClick={() => setActiveTab('notes')} className={`relative -top-10 w-16 h-16 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-90 border-8 border-slate-50 dark:border-slate-950 ${activeTab === 'notes' ? 'rotate-90' : ''}`}><Plus className="w-8 h-8" /></button>
          <button onClick={() => setActiveTab('map')} className={`p-3 rounded-2xl transition-all ${activeTab === 'map' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 dark:text-slate-600'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>
          <button onClick={() => setActiveTab('timer')} className={`p-3 rounded-2xl transition-all ${activeTab === 'timer' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 dark:text-slate-600'}`}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
        </nav>
      )}
    </div>
  );
};

export default App;
