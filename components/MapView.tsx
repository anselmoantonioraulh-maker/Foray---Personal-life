
import React from 'react';
import { MapPin, Navigation, Info } from 'lucide-react';
import { Category } from '../types';
import { CATEGORY_CONFIG } from '../constants';

const MapView: React.FC = () => {
  const locations = [
    { name: 'Minha Casa', cat: Category.DOMESTIC, address: 'Rua Principal, 123' },
    { name: 'Escola Central', cat: Category.SCHOOL, address: 'Av. dos Estudos, 50' },
    { name: 'Salão do Reino', cat: Category.SPIRITUAL, address: 'Rua da Paz, 400' },
    { name: 'Escritório', cat: Category.SECULAR, address: 'Business Tower, Sala 101' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Mock Map Background */}
      <div className="relative flex-1 bg-blue-100 overflow-hidden">
         {/* Artistic mock map grid */}
         <div className="absolute inset-0 opacity-20" style={{ 
           backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)',
           backgroundSize: '30px 30px'
         }}></div>
         
         {/* Pulsing My Location Marker */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg animate-pulse">
                <Navigation className="w-4 h-4 text-white rotate-45" />
            </div>
         </div>

         {/* Other markers */}
         <div className="absolute top-1/4 left-1/3">
            <div className={`p-2 rounded-xl bg-emerald-500 shadow-lg`}>
              <MapPin className="w-5 h-5 text-white" />
            </div>
         </div>
         <div className="absolute bottom-1/3 right-1/4">
            <div className={`p-2 rounded-xl bg-indigo-500 shadow-lg`}>
              <MapPin className="w-5 h-5 text-white" />
            </div>
         </div>

         <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-xl">
                <MapPin className="w-5 h-5 text-slate-400" />
            </div>
            <input 
                type="text" 
                placeholder="Pesquisar locais..." 
                className="bg-transparent flex-1 outline-none text-slate-700 font-medium"
            />
         </div>
      </div>

      <div className="h-2/5 bg-white rounded-t-[40px] shadow-2xl p-6 overflow-y-auto no-scrollbar relative z-20">
         <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
         <h2 className="text-xl font-bold text-slate-800 mb-4">Seus Locais</h2>
         
         <div className="space-y-4">
            {locations.map((loc, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-slate-50 cursor-pointer">
                 <div className={`p-3 rounded-2xl ${CATEGORY_CONFIG[loc.cat].color}`}>
                    <MapPin className="w-6 h-6 text-white" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{loc.name}</h3>
                    <p className="text-sm text-slate-400">{loc.address}</p>
                 </div>
                 <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-500 transition-colors">
                    <Info className="w-5 h-5" />
                 </button>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default MapView;
