import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserRole, UserFocus, UserState } from '../types';
import { FOCUS_OPTIONS } from '../constants';
import { Rocket } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: Partial<UserState>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'welcome' | 'setup'>('welcome');
  const [role, setRole] = useState<UserRole | null>(null);
  const [focus, setFocus] = useState<UserFocus | null>(null);
  const [name, setName] = useState('');

  const handleNext = () => {
    if (step === 'welcome') {
      setStep('setup');
    } else {
      if (role && focus && name) {
        onComplete({ role, focus, name });
      }
    }
  };

  return (
    <div className="relative z-10 flex flex-col h-full items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center w-full max-w-sm"
          >
            <motion.div 
               animate={{ y: [-10, 10, -10] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="mb-8 flex justify-center"
            >
               <div className="w-20 h-20 bg-gradient-to-br from-[#1098F7] to-blue-900 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,152,247,0.5)]">
                 <Rocket size={40} className="text-white" />
               </div>
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
              Добро пожаловать <br/> на борт
            </h1>
            <p className="text-gray-400 mb-12">
              Система управления бизнесом готова к запуску.
            </p>
            
            <button
              onClick={handleNext}
              className="w-full py-4 bg-[#1098F7] text-white font-bold rounded-xl active:scale-95 transition-transform shadow-lg shadow-[#1098F7]/20"
            >
              Начать настройку
            </button>
          </motion.div>
        )}

        {step === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Настройка профиля</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2 block">Ваше Имя</label>
                <input
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1098F7] transition-colors"
                   placeholder="Алексей"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2 block">Ваша Роль</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(UserRole).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                        role === r 
                          ? 'bg-[#1098F7] border-[#1098F7] text-white' 
                          : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2 block">Текущий Фокус</label>
                <div className="flex flex-wrap gap-2">
                  {FOCUS_OPTIONS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFocus(f)}
                      className={`py-2 px-4 rounded-full border text-sm font-medium transition-all ${
                        focus === f 
                          ? 'bg-white text-black border-white' 
                          : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!role || !focus || !name}
                className={`w-full py-4 mt-4 font-bold rounded-xl transition-all ${
                   role && focus && name
                     ? 'bg-[#1098F7] text-white active:scale-95 shadow-lg shadow-[#1098F7]/20'
                     : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                Поехали
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;