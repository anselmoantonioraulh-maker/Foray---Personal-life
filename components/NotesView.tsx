
import React, { useState, useMemo } from 'react';
import { Note, Category } from '../types';
import { CATEGORY_CONFIG } from '../constants';
import { Search, Plus, FileText, X, Trash2, Calendar } from 'lucide-react';

interface NotesViewProps {
  notes: Note[];
  onAddNote: (title: string, content: string, category: Category) => void;
  onDeleteNote: (id: string) => void;
}

const NotesView: React.FC<NotesViewProps> = ({ notes, onAddNote, onDeleteNote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  // Novos estados para o formulário de nota
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<Category>(Category.GENERAL);

  const filteredNotes = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return notes;
    return notes.filter(note => 
      note.title.toLowerCase().includes(query) || 
      note.content.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  const handleSave = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    onAddNote(newTitle, newContent, newCategory);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <header className="p-6 bg-white border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Notas</h1>
        
        {/* Barra de Busca */}
        <div className="relative group">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${searchQuery ? 'text-indigo-500' : 'text-slate-400'}`} />
          <input 
            type="text"
            placeholder="Buscar no título ou conteúdo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-100 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-100 focus:bg-white transition-all text-slate-700 font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar pb-32">
        {isAdding ? (
          <div className="bg-white p-6 rounded-[32px] shadow-xl border border-indigo-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-slate-800">Nova Nota</h2>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 p-1"><X className="w-5 h-5"/></button>
            </div>
            
            <input 
              placeholder="Título da nota"
              className="w-full text-lg font-bold outline-none mb-4 placeholder:text-slate-200 text-slate-800"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            
            <textarea 
              placeholder="Escreva algo inspirador..."
              rows={4}
              className="w-full outline-none mb-4 resize-none text-slate-600 placeholder:text-slate-300"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />

            <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar py-1">
              {[Category.GENERAL, Category.SPIRITUAL, Category.SCHOOL, Category.SECULAR, Category.DOMESTIC].map(cat => (
                <button
                  key={cat}
                  onClick={() => setNewCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    newCategory === cat 
                    ? `${CATEGORY_CONFIG[cat].color} text-white` 
                    : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {CATEGORY_CONFIG[cat].label}
                </button>
              ))}
            </div>

            <button 
              onClick={handleSave}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all"
            >
              Salvar Nota
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-400 transition-all active:scale-98"
          >
            <Plus className="w-5 h-5" />
            Nova Nota
          </button>
        )}

        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <FileText className="w-16 h-16 mb-4 text-slate-300" />
            <p className="font-medium text-slate-500">
              {searchQuery ? 'Nenhuma nota corresponde à busca' : 'Sua lista de notas está vazia'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredNotes.map(note => (
              <div 
                key={note.id}
                className="group bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full ${CATEGORY_CONFIG[note.category].color}`}></div>
                
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${CATEGORY_CONFIG[note.category].textColor}`}>
                    {CATEGORY_CONFIG[note.category].label}
                  </span>
                  <button 
                    onClick={() => onDeleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="font-bold text-slate-800 text-lg mb-2">{note.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                  {note.content}
                </p>
                
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
                  <Calendar className="w-3 h-3" />
                  {new Date(note.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default NotesView;
