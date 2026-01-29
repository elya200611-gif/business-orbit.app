import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, Download, FileText } from 'lucide-react';
import { Lesson } from '../types';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
}

const LessonModal: React.FC<LessonModalProps> = ({ isOpen, onClose, lesson }) => {
  if (!lesson) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '5%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100) onClose();
            }}
            className="fixed inset-x-0 bottom-0 h-[95%] bg-[#121214] rounded-t-3xl z-50 overflow-hidden flex flex-col border-t border-white/10"
          >
            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-4 pb-2">
              <div className="w-12 h-1.5 bg-gray-700 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 flex justify-between items-start border-b border-white/5">
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-1">Текущий урок</h3>
                <h2 className="text-2xl font-bold text-white leading-tight">{lesson.title}</h2>
              </div>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Video Placeholder */}
              <div className="aspect-video w-full bg-gray-900 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#1098F7]/20 to-transparent" />
                 <PlayCircle size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-4 bg-[#1098F7] text-white rounded-xl font-semibold active:scale-95 transition-transform">
                  <FileText size={20} />
                  <span>Сдать домашку</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-semibold active:scale-95 transition-transform hover:bg-white/10">
                  <Download size={20} />
                  <span>Материалы</span>
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Описание</h4>
                <p className="text-gray-400 leading-relaxed">
                  В этом уроке мы разберем ключевые показатели эффективности, научимся строить дашборд руководителя и определим точки роста на ближайший квартал.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LessonModal;