import React from 'react';
import { motion } from 'framer-motion';
import { UserState } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { COLORS } from '../constants';

interface DashboardProps {
  user: UserState;
  onChangeTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onChangeTab }) => {
  const isAllTasksDone = false; // Toggle for demo

  return (
    <div className="px-6 pt-12 pb-24 h-full overflow-y-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Доброе утро, {user.name}!
        </h1>
        <p className="text-gray-400">День 12 на орбите</p>
      </motion.div>

      {/* Widget: Current Focus */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full relative overflow-hidden rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl shadow-[#1098F7]/10"
      >
        {!isAllTasksDone ? (
          <>
             <div className="absolute top-0 right-0 p-6 opacity-20">
               <div className="w-32 h-32 bg-[#1098F7] rounded-full blur-3xl" />
             </div>
             
             <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                 <span className="px-3 py-1 bg-[#1098F7]/20 text-[#1098F7] text-xs font-bold rounded-full uppercase tracking-wider">
                   Активный модуль
                 </span>
                 <div className="text-right">
                   <div className="text-2xl font-bold text-white">33%</div>
                   <div className="text-xs text-gray-500">Прогресс</div>
                 </div>
               </div>
               
               <h2 className="text-2xl font-bold text-white mb-2">Модуль 2. Финансы</h2>
               <p className="text-gray-400 mb-8 text-sm line-clamp-2">
                 Управление денежными потоками и построение P&L отчета для вашего бизнеса.
               </p>

               <button 
                 onClick={() => onChangeTab('syllabus')}
                 className="w-full py-4 bg-[#1098F7] text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
               >
                 <span>Продолжить</span>
                 <ArrowRight size={20} />
               </button>
             </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Все задачи выполнены</h3>
            <p className="text-gray-400">Отличный полет! Отдыхайте.</p>
          </div>
        )}
      </motion.div>

      {/* Metrics Row (Simple Visuals) */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="glass-panel p-4 rounded-2xl"
        >
          <div className="text-gray-400 text-xs uppercase mb-1">Фокус недели</div>
          <div className="text-white font-bold text-lg">{user.focus || 'Не задан'}</div>
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="glass-panel p-4 rounded-2xl"
        >
          <div className="text-gray-400 text-xs uppercase mb-1">Статус</div>
          <div className="text-[#1098F7] font-bold text-lg">Commander</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;