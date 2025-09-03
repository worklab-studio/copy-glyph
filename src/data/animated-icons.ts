import React from 'react';
import { type IconItem } from '../types/icon';

console.log('Loading animated icons file...');

// Simple animated loading icon
const LoadingIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className,
    style: { 
      animation: 'spin 1s linear infinite',
      transformOrigin: 'center'
    }
  }, [
    React.createElement('style', {
      key: 'style'
    }, `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `),
    React.createElement('circle', {
      key: 'circle',
      cx: '12',
      cy: '12',
      r: '10',
      fill: 'none',
      stroke: color,
      strokeWidth: '2',
      strokeDasharray: '20',
      strokeDashoffset: '5'
    })
  ]);
};

export const animatedIcons: IconItem[] = [
  {
    id: "animated-loading",
    name: "Loading",
    svg: LoadingIcon,
    style: "animated",
    category: "Loading",
    tags: ["loading", "spinner", "progress"]
  }
];

console.log('Animated icons loaded:', animatedIcons.length);