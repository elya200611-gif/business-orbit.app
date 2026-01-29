import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle, ChevronDown, Play } from 'lucide-react';
import { MOCK_MODULES } from '../constants';
import { Lesson, Module } from '../types';
import LessonModal from './LessonModal';

const Syllabus: React.FC = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>('m2');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shakingModule, setShakingModule] = useState<string | null>(null);

  const handleModuleClick = (module: Module) => {
    if (module.status === 'locked') {
      // Trigger shake animation
      setShakingModule(module.id);
      setTimeout(() => setShakingModule(null), 500);
      return;
    }
    setExpandedModule(expandedModule === module.id ? null : module.id);
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  return (
    <div className="px-6 pt-12 pb-24 h-full overflow-y-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Программа</h1>
      
      <div className="space-y-4">
        {MOCK_MODULES.map((module) => (
          <motion.div
            key={module.id}
            animate={shakingModule === module.id ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              module.status === 'active' 
                ? 'bg-[#1098F7]/10 border-[#1098F7]/50 shadow-[0_0_15px_rgba(16,152,247,0.15)]' 
                : module.status === 'completed'
                ? 'bg-white/5 border-white/5 opacity-70'
                : 'bg-white/5 border-transparent opacity-50 grayscale'
            }`}
          >
            <button 
              onClick={() => handleModuleClick(module)}
              className="w-full px-5 py-5 flex items-center justify-between text-left"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold text-lg ${module.status === 'active' ? 'text-white' : 'text-gray-300'}`}>
                    {module.title}
                  </h3>
                  {module.status === 'completed' && <CheckCircle size={16} className="text-green-500" />}
                  {module.status === 'locked' && <Lock size={16} className="text-gray-500" />}
                </div>
                <p className="text-xs text-gray-400">{module.subtitle}</p>
                {module.status === 'locked' && module.unlockDate && (
                  <p className="text-xs text-[#1098F7] mt-2">Откроется {module.unlockDate}</p>
                )}
              </div>
              
              {module.status !== 'locked' && (
                <ChevronDown 
                  className={`text-gray-500 transition-transform duration-300 ${expandedModule === module.id ? 'rotate-180' : ''}`} 
                />
              )}
            </button>

            <AnimatePresence>
              {expandedModule === module.id && module.status !== 'locked' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0 space-y-3">
                    <div className="h-px w-full bg-white/10 mb-4" />
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            lesson.isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-white/10 text-white'
                          }`}>
                            {lesson.isCompleted ? <CheckCircle size={14} /> : <Play size={12} className="ml-0.5" />}
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-medium text-white group-hover:text-[#1098F7] transition-colors">
                              {lesson.title}
                            </div>
                            <div className="text-[10px] text-gray-500">{lesson.duration}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <LessonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lesson={selectedLesson} 
      />
    </div>
  );
};

export default Syllabus;