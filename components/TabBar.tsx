import React from 'react';
import { LayoutDashboard, GraduationCap, Wrench, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Главная', icon: LayoutDashboard },
  { id: 'syllabus', label: 'Программа', icon: GraduationCap },
  { id: 'tools', label: 'Инструменты', icon: Wrench },
  { id: 'profile', label: 'Профиль', icon: User },
];

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 glass-tab-bar pb-safe pt-2 px-6 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center py-2 w-16"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute -top-2 w-8 h-8 bg-[#1098F7] opacity-20 blur-xl rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ 
                  color: isActive ? '#1098F7' : '#9CA3AF',
                  scale: isActive ? 1.1 : 1
                }}
                className="relative z-10"
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#1098F7]' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;