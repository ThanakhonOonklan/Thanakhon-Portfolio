// Type declarations for the vendored React Bits CardSwap (JS + CSS variant).
import type { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from 'react';

export interface CardSwapItem {
  title?: string;
  image?: string;
  alt?: string;
  icon?: ReactNode;
}

export interface CardSwapHandle {
  next: () => void;
  prev: () => void;
}

export interface CardSwapProps {
  items?: CardSwapItem[];
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  depth?: number;
  skewAmount?: number;
  visibleCards?: number;
  delay?: number;
  autoplay?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  speed?: number;
  bounce?: number;
  parallax?: number;
  hoverSpread?: number;
  dim?: number;
  cardRadius?: number;
  intro?: boolean;
  theme?: 'dark' | 'light';
  /** Fired with the item index when any card is clicked */
  onCardClick?: (index: number) => void;
  /** Fired with the item index that is now at the front */
  onChange?: (index: number) => void;
  className?: string;
  children?: ReactNode;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card: ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>>;

declare const CardSwap: ForwardRefExoticComponent<CardSwapProps & RefAttributes<CardSwapHandle>>;
export default CardSwap;
