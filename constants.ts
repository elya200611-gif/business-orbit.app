import { Badge, Module, UserFocus } from './types';

export const COLORS = {
  background: '#070708',
  primary: '#1098F7',
  secondary: '#FCFAF7',
  bronze: '#B89E97',
  textMuted: '#9CA3AF'
};

export const MOCK_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Модуль 1. Основы системы',
    subtitle: 'Введение в орбитальную механику бизнеса',
    status: 'completed',
    lessons: [
      { id: 'l1-1', title: 'Вводный урок', duration: '10 мин', isCompleted: true },
      { id: 'l1-2', title: 'Определение целей', duration: '25 мин', isCompleted: true },
    ]
  },
  {
    id: 'm2',
    title: 'Модуль 2. Финансы',
    subtitle: 'Топливо для вашего корабля',
    status: 'active',
    lessons: [
      { id: 'l2-1', title: 'P&L отчетность', duration: '15 мин', isCompleted: false },
      { id: 'l2-2', title: 'Cashflow', duration: '30 мин', isCompleted: false },
      { id: 'l2-3', title: 'Юнит-экономика', duration: '45 мин', isCompleted: false },
    ]
  },
  {
    id: 'm3',
    title: 'Модуль 3. Команда',
    subtitle: 'Экипаж миссии',
    status: 'locked',
    unlockDate: '15 Окт',
    lessons: []
  }
];

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', name: 'Первый запуск', icon: '🚀', isLocked: false },
  { id: 'b2', name: 'Финансовый гуру', icon: '💎', isLocked: true },
  { id: 'b3', name: 'Лидер команды', icon: '👑', isLocked: true },
  { id: 'b4', name: 'Мастер продаж', icon: '🤝', isLocked: true },
];

export const FOCUS_OPTIONS = [UserFocus.FINANCE, UserFocus.TEAM, UserFocus.SALES];