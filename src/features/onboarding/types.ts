export interface Slide {
  id: string;
  title: string;
  highlight: string;
  description: string;
  image: any,
}

export interface OnboardingSlidesProps {
  cardWidth: number;
}