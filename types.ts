export enum UserRole {
  OWNER = 'Собственник',
  TOP_MANAGER = 'ТОП-менеджер'
}

export enum UserFocus {
  FINANCE = 'Финансы',
  TEAM = 'Команда',
  SALES = 'Продажи'
}

export interface UserState {
  hasOnboarded: boolean;
  name: string;
  role: UserRole | null;
  focus: UserFocus | null;
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  status: 'locked' | 'active' | 'completed';
  unlockDate?: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string; // Emoji or icon name representation
  isLocked: boolean;
}