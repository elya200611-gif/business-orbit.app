import React, { useState } from 'react';
import { motion } from 'framer-motion';

type CalcType = 'strategy' | 'profit';

const Tools: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<CalcType>('strategy');

  return (
    <div className="px-6 pt-12 pb-24 h-full overflow-y-auto flex flex-col">
      <h1 className="text-3xl font-bold text-white mb-6">Инструменты</h1>

      {/* Calculator Tab Switcher - Two tabs only */}
      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 mb-8">
        <button
          onClick={() => setActiveCalc('strategy')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeCalc === 'strategy' ? 'bg-[#1098F7] text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
        >
          Стратегия
        </button>
        <button
          onClick={() => setActiveCalc('profit')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeCalc === 'profit' ? 'bg-[#1098F7] text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
        >
          Прибыль
        </button>
      </div>

      <div className="flex-1">
        {activeCalc === 'strategy' ? <StrategyCalculator /> : <ProfitCalculator />}
      </div>
    </div>
  );
};

// New Strategy Calculator Component
const StrategyCalculator: React.FC = () => {
  const [goal, setGoal] = useState<string>('1000000');
  const [avgCheck, setAvgCheck] = useState<string>('50000');
  const [conversion, setConversion] = useState<string>('10');

  const goalVal = parseFloat(goal) || 0;
  const avgCheckVal = parseFloat(avgCheck) || 0;
  const conversionVal = parseFloat(conversion) || 0;

  // Calculate sales needed (round up)
  const salesNeeded = avgCheckVal > 0 ? Math.ceil(goalVal / avgCheckVal) : 0;

  // Calculate leads needed (round up)
  const leadsNeeded = conversionVal > 0 ? Math.ceil((salesNeeded / conversionVal) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <style>{`
        /* Remove spinner arrows from number inputs */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
          appearance: textfield;
        }
      `}</style>

      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <h3 className="text-gray-400 text-sm mb-4 uppercase tracking-wider">Калькулятор Стратегии</h3>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Цель (RUB)</label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="1000000"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-[#1098F7] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Средний чек (RUB)</label>
            <input
              type="number"
              value={avgCheck}
              onChange={(e) => setAvgCheck(e.target.value)}
              placeholder="50000"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-[#1098F7] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Конверсия (%)</label>
            <input
              type="number"
              value={conversion}
              onChange={(e) => setConversion(e.target.value)}
              placeholder="10"
              step="0.1"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-[#1098F7] transition-colors"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Продаж</span>
            <span className="text-xl font-bold text-white">
              {salesNeeded.toLocaleString('ru-RU')}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Лидов</span>
            <span className="text-xl font-bold text-[#1098F7]">
              {leadsNeeded.toLocaleString('ru-RU')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Existing Profit Calculator Component (kept as-is)
const ProfitCalculator: React.FC = () => {
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
      <style>{`
        /* Remove spinner arrows from number inputs */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
          appearance: textfield;
        }
      `}</style>

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
              {profit.toLocaleString('ru-RU')}
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

export default Tools;