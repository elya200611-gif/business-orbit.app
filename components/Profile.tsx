import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_BADGES } from '../constants';
import { UserState } from '../types';
import { Settings, CreditCard, Shield } from 'lucide-react';

interface ProfileProps {
  user: UserState;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="px-6 pt-12 pb-24 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Профиль</h1>
        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
          <Settings size={20} className="text-gray-400" />
        </button>
      </div>

      {/* User Card */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1098F7] to-[#070708] border-2 border-white/20 flex items-center justify-center text-xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400 text-sm">{user.role}</p>
        </div>
      </div>

      {/* Subscription Status */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        className="mb-8 p-1 rounded-2xl bg-gradient-to-r from-[#1098F7] via-[#1098F7]/50 to-transparent"
      >
        <div className="bg-[#0b0b0d] rounded-xl p-5 relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <div className="text-xs text-[#1098F7] font-bold tracking-wider mb-1 uppercase flex items-center gap-2">
                 <Shield size={12} />
                 Статус
              </div>
              <div className="text-2xl font-bold text-white">COMMANDER</div>
            </div>
            <div className="w-12 h-12 bg-[#1098F7]/20 rounded-full flex items-center justify-center text-[#1098F7]">
              <CreditCard size={24} />
            </div>
          </div>
          {/* Background glow */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-24 h-24 bg-[#1098F7] opacity-20 blur-3xl rounded-full" />
        </div>
      </motion.div>

      {/* Badges */}
      <h3 className="text-lg font-bold text-white mb-4">Достижения</h3>
      <div className="grid grid-cols-2 gap-4">
        {MOCK_BADGES.map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ y: -2 }}
            className={`aspect-square rounded-2xl border p-4 flex flex-col items-center justify-center text-center gap-2 relative overflow-hidden ${
              badge.isLocked 
                ? 'bg-white/5 border-white/5 opacity-50' 
                : 'bg-gradient-to-br from-white/10 to-transparent border-white/10'
            }`}
          >
            <div className={`text-4xl ${badge.isLocked ? 'grayscale opacity-30' : ''}`}>
              {badge.icon}
            </div>
            <span className={`text-xs font-medium ${badge.isLocked ? 'text-gray-500' : 'text-gray-200'}`}>
              {badge.name}
            </span>
            {badge.isLocked && (
              <div className="absolute top-2 right-2">
                <div className="w-5 h-5 bg-black/50 rounded-full flex items-center justify-center">
                   <span className="text-[10px] text-gray-500">🔒</span>
                </div>
              </div>
            )}
            {!badge.isLocked && (
               <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 pointer-events-none" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Profile;