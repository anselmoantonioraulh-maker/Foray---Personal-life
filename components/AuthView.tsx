
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, UserPlus, LogIn, Sparkles, Loader2 } from 'lucide-react';

const AuthView: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Verifique seu e-mail para confirmar o cadastro!');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 p-6 justify-center">
      <div className="w-full max-w-sm mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-[32px] animate-float">
            <Sparkles className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Sua jornada para o equilíbrio começa aqui.
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-slate-700 dark:text-slate-200"
              />
            </div>
            
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="password"
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-all text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isLogin ? (
              <><LogIn className="w-5 h-5" /> Entrar</>
            ) : (
              <><UserPlus className="w-5 h-5" /> Cadastrar</>
            )}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre agora'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
