type TabKey = 'Home' | 'Projects' | 'Profile';

interface TabItem {
  icon: {
    active: string;
    inactive: string;
  };
  label: string;
}

export type TabsType = Record<TabKey, TabItem>;

export const tabConfig: TabsType = {
  Home: {
    icon: { active: 'home', inactive: 'home-outline' },
    label: 'Главная',
  },
  Profile: {
    icon: { active: 'person', inactive: 'person-outline' },
    label: 'Профиль',
  },
  Projects: {
    icon: { active: 'settings', inactive: 'settings-outline' },
    label: 'Проекты',
  },
};

export type TabRoute = keyof typeof tabConfig;