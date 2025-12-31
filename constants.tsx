
import React from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Home, 
  Diamond, 
  FileText, 
  Calendar as CalIcon, 
  MapPin, 
  Timer,
  User,
  Laptop,
  Heart,
  Pencil
} from 'lucide-react';
import { Category } from './types';

// Define the configuration for each life category to maintain consistency
export const CATEGORY_CONFIG = {
  [Category.SPIRITUAL]: {
    label: 'Vida Espiritual',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    cardBg: 'bg-gradient-to-br from-orange-400 to-purple-500',
    textColor: 'text-orange-600',
    icon: <div className="relative">
      <BookOpen className="w-10 h-10 text-white" />
      <Diamond className="w-5 h-5 text-white absolute -top-2 -right-2 drop-shadow-sm" />
    </div>,
    illustration: <User className="w-16 h-16 text-white/40 absolute bottom-4 right-4" />,
    subCategories: ['Pregação', 'Estudo pessoal', 'Leitura da Bíblia', 'Preparação de reuniões'],
    phrases: [
      "\"Tudo posso naquele que me fortalece.\"",
      "\"O Senhor é o meu pastor.\"",
      "\"Alegrem-se na esperança.\"",
      "\"Lâmpada para os meus pés é tua palavra.\"",
      "\"Não andem ansiosos por coisa alguma.\""
    ]
  },
  [Category.SCHOOL]: {
    label: 'Vida Escolar',
    color: 'bg-sky-500',
    lightColor: 'bg-sky-50',
    cardBg: 'bg-gradient-to-br from-sky-400 to-indigo-500',
    textColor: 'text-sky-600',
    icon: <Pencil className="w-10 h-10 text-white" />,
    illustration: <GraduationCap className="w-16 h-16 text-white/40 absolute bottom-4 right-4" />,
    subCategories: ['Tarefas', 'Estudar', 'Outras atividades'],
    phrases: [
      "O sucesso é a soma de pequenos esforços.",
      "A educação muda o mundo.",
      "Aprender é um tesouro.",
      "Não pare até se orgulhar.",
      "Conhecimento é poder."
    ]
  },
  [Category.SECULAR]: {
    label: 'Vida Secular',
    color: 'bg-slate-500',
    lightColor: 'bg-slate-50',
    cardBg: 'bg-gradient-to-br from-slate-400 to-blue-500',
    textColor: 'text-slate-600',
    icon: <Laptop className="w-10 h-10 text-white" />,
    illustration: <Briefcase className="w-16 h-16 text-white/40 absolute bottom-4 right-4" />,
    subCategories: ['Trabalho', 'Projetos pessoais', 'Estudos profissionais'],
    phrases: [
      "Foco e determinação.",
      "Ame o que você faz.",
      "Trabalho duro vence o talento.",
      "Seja sua melhor versão.",
      "Grandes sonhos, metas claras."
    ]
  },
  [Category.DOMESTIC]: {
    label: 'Vida Doméstica',
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    cardBg: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    textColor: 'text-emerald-600',
    icon: <Home className="w-10 h-10 text-white" />,
    illustration: <Heart className="w-16 h-16 text-white/40 absolute bottom-4 right-4" />,
    subCategories: ['Limpeza', 'Organização', 'Tarefas do lar'],
    phrases: [
      "Casa organizada, mente tranquila.",
      "Lar é onde o coração está.",
      "Ordem é paz.",
      "Pequenas melhorias contam.",
      "Cuide do seu lar."
    ]
  },
  [Category.GENERAL]: {
    label: 'Geral',
    color: 'bg-slate-500',
    lightColor: 'bg-slate-50',
    cardBg: 'bg-slate-400',
    textColor: 'text-slate-600',
    icon: <FileText className="w-8 h-8 text-white" />,
    // Fix: Added illustration and subCategories type casting to maintain a consistent shape for CATEGORY_CONFIG
    illustration: null as React.ReactNode,
    subCategories: [] as string[],
    phrases: ["Mantenha o equilíbrio."]
  }
};

export const GLOBAL_TOOLS = [
  { id: 'calendar', label: 'Calendário', icon: <CalIcon className="w-5 h-5" /> },
  { id: 'map', label: 'Mapa', icon: <MapPin className="w-5 h-5" /> },
  { id: 'timer', label: 'Timer', icon: <Timer className="w-5 h-5" /> },
  { id: 'notes', label: 'Notas', icon: <FileText className="w-5 h-5" /> },
];
