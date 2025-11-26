import { Slide } from './types';

export const SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Преобразите свой интерьер',
    highlight: "Преобразите",
    description: 'Тут был короткий walkthrought (пример демо комнаты до/после)',
    image: require('@/shared/assets/onboarding/2.png'), 
  },
  {
    id: '2', 
    title: 'Дизайн мечты? Просто!',
    highlight: "Дизайн мечты?",
    description: 'Отсканируйте помещение и выбере стиль. А дальше мы сделаем все за вас',
    image: require('@/shared/assets/onboarding/2.png'), 
  },
  {
    id: '3',
    title: 'Откройте все возможности',
    highlight: "возможности",
    description: 'Настраивайте интерьер и освещение, используя мебель из каталогов',
    image: require('@/shared/assets/onboarding/2.png'), 
  },
];