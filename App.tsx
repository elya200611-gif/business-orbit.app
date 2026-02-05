import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StarBackground from './components/StarBackground';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Syllabus from './components/Syllabus';
import Tools from './components/Tools';
import Profile from './components/Profile';
import TabBar from './components/TabBar';
import { UserState } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserState>({
    hasOnboarded: false,
    name: '',
    role: null,
    focus: null,
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const handleOnboardingComplete = (data: Partial<UserState>) => {
    setUser(prev => ({ ...prev, ...data, hasOnboarded: true }));
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} onChangeTab={setActiveTab} />;
      case 'syllabus':
        return <Syllabus />;
      case 'tools':
        return <Tools />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white">
      <StarBackground />

      <AnimatePresence mode="wait">
        {!user.hasOnboarded ? (
          <motion.div
            key="onboarding"
            className="absolute inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            <Onboarding onComplete={handleOnboardingComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            className="flex flex-col min-h-screen pb-[100px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex-1 relative overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </div>
            <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;