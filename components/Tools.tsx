import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Calculator as CalcIcon, Plus } from 'lucide-react';

type ToolType = 'calc' | 'checklist';

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('calc');

  return (
    <div className="px-6 pt-12 pb-24 h-full overflow-y-auto flex flex-col">
      <h1 className="text-3xl font-bold text-white mb-6">Инструменты</h1>

      {/* Tool Switcher */}
      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 mb-8">
        <button
          onClick={() => setActiveTool('calc')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTool === 'calc' ? 'bg-[#1098F7] text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          Калькулятор
        </button>
        <button
          onClick={() => setActiveTool('checklist')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeTool === 'checklist' ? 'bg-[#1098F7] text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          Чек-листы
        </button>
      </div>

      <div className="flex-1">
        {activeTool === 'calc' ? <Calculator /> : <Checklists />}
      </div>
    </div>
  );
};

const Calculator: React.FC = () => {
  const [revenue, setRevenue] = useState<string>('');
  const [expenses, setExpenses] = useState<string>('');

  const revVal = parseFloat(revenue) || 0;
  const expVal = parseFloat(expenses) || 0;
  const profit = revVal - expVal;
  const margin = revVal > 0 ? ((profit / revVal) * 100).toFixed(1) : '0';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wider">Калькулятор Прибыли</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Выручка (RUB)</label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="0"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-[#1098F7] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Расходы (RUB)</label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="0"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-[#1098F7] transition-colors"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Чистая прибыль</span>
            <span className={`text-xl font-bold ${profit >= 0 ? 'text-white' : 'text-red-400'}`}>
              {profit.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Маржинальность</span>
            <span className={`text-xl font-bold ${parseFloat(margin) > 20 ? 'text-green-400' : 'text-yellow-400'}`}>
              {margin}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Checklists: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-[400px] text-center"
    >
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 relative">
         <ClipboardList size={40} className="text-gray-600" />
         {/* Floating animation effect */}
         <motion.div 
            animate={{ y: [-5, 5, -5] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 border border-white/5 rounded-full"
         />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Система чиста</h3>
      <p className="text-gray-500 max-w-[250px] mb-8">
        Создайте первый чек-лист для команды, чтобы навести порядок.
      </p>
      <button className="flex items-center gap-2 px-6 py-3 bg-[#1098F7] text-white rounded-xl font-bold active:scale-95 transition-transform shadow-lg shadow-[#1098F7]/20">
        <Plus size={20} />
        <span>Создать</span>
      </button>
    </motion.div>
  );
};

export default Tools;