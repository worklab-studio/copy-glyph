import React, { useState, useEffect } from 'react';
import { type IconItem } from '@/types/icon';

// Simple animated icon components using React.createElement to avoid JSX syntax issues
const LoadingSpinnerIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} animate-spin`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', { d: 'M21 12a9 9 0 11-6.219-8.56' })));
};

const LoadingDotsIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: color
  }, [
    React.createElement('circle', { key: '1', cx: '4', cy: '12', r: '2', className: 'animate-bounce', style: { animationDelay: '0s' } }),
    React.createElement('circle', { key: '2', cx: '12', cy: '12', r: '2', className: 'animate-bounce', style: { animationDelay: '0.1s' } }),
    React.createElement('circle', { key: '3', cx: '20', cy: '12', r: '2', className: 'animate-bounce', style: { animationDelay: '0.2s' } })
  ]));
};

// Simplified animated upload icon
const UploadIcon = ({ size = 24, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('div', {
    className: `${className} hover:animate-bounce`,
    style: { display: 'inline-block' }
  }, React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, [
    React.createElement('path', { key: '1', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
    React.createElement('polyline', { key: '2', points: '7,10 12,5 17,10' }),
    React.createElement('line', { key: '3', x1: '12', y1: '5', x2: '12', y2: '15' })
  ]));
};

export const DownloadIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`download-icon ${isAnimating ? 'animate' : ''}`}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,15 17,10" className={isAnimating ? 'animate-bounce' : ''} />
        <line x1="12" y1="15" x2="12" y2="3" className={isAnimating ? 'animate-pulse' : ''} />
      </svg>
    </div>
  );
};

// Navigation & Arrow Icons
export const ArrowRightIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`arrow-right-icon ${isAnimating ? 'animate' : ''}`}
        style={{ 
          transform: isAnimating ? 'translateX(3px)' : 'translateX(0)', 
          transition: 'transform 0.3s ease' 
        }}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12,5 19,12 12,19" />
      </svg>
    </div>
  );
};

export const ChevronUpIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'translateY(-2px)' : 'translateY(0)', 
          transition: 'transform 0.3s ease' 
        }}
      >
        <polyline points="18,15 12,9 6,15" />
      </svg>
    </div>
  );
};

export const ChevronDownIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'translateY(2px)' : 'translateY(0)', 
          transition: 'transform 0.3s ease' 
        }}
      >
        <polyline points="6,9 12,15 18,9" />
      </svg>
    </div>
  );
};

// Check & Success Icons
export const CheckIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  useEffect(() => {
    const styleId = 'animated-check-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .check-path {
          stroke-dasharray: 16;
          stroke-dashoffset: 16;
          animation: none;
        }
        .check-icon.animate .check-path {
          animation: checkDraw 0.5s ease-out forwards;
        }
        @keyframes checkDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`check-icon ${isAnimating ? 'animate' : ''}`}
      >
        <polyline points="20,6 9,17 4,12" className="check-path" />
      </svg>
    </div>
  );
};

export const CircleCheckIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAnimating ? 'animate-pulse' : ''}
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="16,12 12,16 8,12" className={isAnimating ? 'animate-bounce' : ''} />
      </svg>
    </div>
  );
};

// File Management Icons
export const FolderSyncIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => setIsAnimating(true);
  const handleMouseLeave = () => setIsAnimating(false);
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5" />
        <g 
          style={{ 
            transform: isAnimating ? 'rotate(-50deg)' : 'rotate(0deg)', 
            transformOrigin: 'center',
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
          }}
        >
          <path d="M12 10v4h4" />
          <path d="m12 14 1.535-1.605a5 5 0 0 1 8 1.5" />
          <path d="M22 22v-4h-4" />
          <path d="m22 18-1.535 1.605a5 5 0 0 1-8-1.5" />
        </g>
      </svg>
    </div>
  );
};

export const ArchiveIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAnimating ? 'animate-pulse' : ''}
      >
        <rect width="20" height="5" x="2" y="3" rx="1" />
        <rect width="20" height="13" x="2" y="8" rx="1" />
        <path d="m10 12 4 0" className={isAnimating ? 'animate-bounce' : ''} />
      </svg>
    </div>
  );
};

// Communication Icons
export const SignalIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700);
  };
  
  useEffect(() => {
    const styleId = 'animated-signal-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .signal-level {
          opacity: 1;
          transition: opacity 0.2s ease;
        }
        .signal-icon.animate .signal-level {
          animation: fadeInSequence 0.6s ease forwards;
        }
        .signal-icon.animate .signal-line-1 {
          opacity: 0;
          animation-delay: 0.1s;
        }
        .signal-icon.animate .signal-line-2 {
          opacity: 0;
          animation-delay: 0.2s;
        }
        .signal-icon.animate .signal-line-3 {
          opacity: 0;
          animation-delay: 0.3s;
        }
        .signal-icon.animate .signal-line-4 {
          opacity: 0;
          animation-delay: 0.4s;
        }
        @keyframes fadeInSequence {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`signal-icon ${isAnimating ? 'animate' : ''}`}
      >
        <path d="M2 20h.01" />
        <path d="M7 20v-4" className="signal-level signal-line-1" />
        <path d="M12 20v-8" className="signal-level signal-line-2" />
        <path d="M17 20V8" className="signal-level signal-line-3" />
        <path d="M22 4v16" className="signal-level signal-line-4" />
      </svg>
    </div>
  );
};

export const WifiIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700);
  };
  
  useEffect(() => {
    const styleId = 'animated-wifi-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .wifi-level {
          opacity: 1;
          transition: opacity 0.2s ease;
        }
        .wifi-icon.animate .wifi-level {
          animation: fadeInSequence 0.6s ease forwards;
        }
        .wifi-icon.animate .wifi-line-1 {
          opacity: 0;
          animation-delay: 0.25s;
        }
        .wifi-icon.animate .wifi-line-2 {
          opacity: 0;
          animation-delay: 0.35s;
        }
        @keyframes fadeInSequence {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`wifi-icon ${isAnimating ? 'animate' : ''}`}
      >
        <path d="M12 20h.01" />
        <path d="M8.5 16.429a5 5 0 0 1 7 0" className="wifi-level wifi-line-1" />
        <path d="M5 12.859a10 10 0 0 1 14 0" className="wifi-level wifi-line-2" />
      </svg>
    </div>
  );
};

// Action Icons
export const CopyIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'scale(1.1)' : 'scale(1)', 
          transition: 'transform 0.2s ease' 
        }}
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    </div>
  );
};

export const TrashIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAnimating ? 'animate-pulse' : ''}
        style={{ 
          transform: isAnimating ? 'rotate(5deg)' : 'rotate(0deg)', 
          transition: 'transform 0.2s ease' 
        }}
      >
        <polyline points="3,6 5,6 21,6" />
        <path d="m19,6v14a2,2 0,0,1-2,2H7a2,2 0,0,1-2-2V6m3,0V4a2,2 0,0,1,2-2h4a2,2 0,0,1,2,2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    </div>
  );
};

export const PlusIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  useEffect(() => {
    const styleId = 'animated-plus-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .plus-line {
          stroke-dasharray: 14;
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.15s ease-out;
        }
        .plus-icon.animate .horizontal {
          opacity: 0;
          animation: lineAnimation 0.3s ease-out forwards;
        }
        .plus-icon.animate .vertical {
          opacity: 0;
          animation: lineAnimation 0.3s ease-out 0.25s forwards;
        }
        @keyframes lineAnimation {
          0% {
            opacity: 0;
            stroke-dashoffset: 14;
          }
          15% {
            opacity: 1;
            stroke-dashoffset: 14;
          }
          100% {
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`plus-icon ${isAnimating ? 'animate' : ''}`}
      >
        <path d="M5 12h14" className="plus-line horizontal" />
        <path d="M12 5v14" className="plus-line vertical" />
      </svg>
    </div>
  );
};

// Time & Status Icons
export const ClockIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline 
          points="12,6 12,12 16,14" 
          style={{ 
            transformOrigin: '12px 12px',
            transform: isAnimating ? 'rotate(90deg)' : 'rotate(0deg)', 
            transition: 'transform 1s ease-in-out' 
          }}
        />
      </svg>
    </div>
  );
};

export const RocketIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'translateY(-5px) scale(1.1)' : 'translateY(0) scale(1)', 
          transition: 'transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6)' 
        }}
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    </div>
  );
};

// Social Icons
export const HeartIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isAnimating ? color : "none"}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAnimating ? 'animate-bounce' : ''}
        style={{ 
          transform: isAnimating ? 'scale(1.2)' : 'scale(1)', 
          transition: 'transform 0.3s ease, fill 0.3s ease' 
        }}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
      </svg>
    </div>
  );
};

export const StarIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isAnimating ? color : "none"}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAnimating ? 'animate-spin' : ''}
        style={{ 
          transform: isAnimating ? 'scale(1.1)' : 'scale(1)', 
          transition: 'transform 0.3s ease, fill 0.3s ease',
          animationDuration: isAnimating ? '0.6s' : undefined
        }}
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
      </svg>
    </div>
  );
};

export const ThumbsUpIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'translateY(-3px) rotate(5deg)' : 'translateY(0) rotate(0deg)', 
          transition: 'transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6)' 
        }}
      >
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
      </svg>
    </div>
  );
};

// Utility Icons
export const MaximizeIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => setIsAnimating(true);
  const handleMouseLeave = () => setIsAnimating(false);
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path 
          d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" 
          style={{ 
            transform: isAnimating ? 'scale(1.1)' : 'scale(1)', 
            transformOrigin: 'center',
            transition: 'transform 0.3s ease' 
          }}
        />
      </svg>
    </div>
  );
};

export const MinimizeIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => setIsAnimating(true);
  const handleMouseLeave = () => setIsAnimating(false);
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path 
          d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" 
          style={{ 
            transform: isAnimating ? 'scale(0.9)' : 'scale(1)', 
            transformOrigin: 'center',
            transition: 'transform 0.3s ease' 
          }}
        />
      </svg>
    </div>
  );
};

export const RefreshIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'rotate(360deg)' : 'rotate(0deg)', 
          transition: 'transform 1s ease-in-out' 
        }}
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </svg>
    </div>
  );
};

// Search Icons
export const SearchIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'scale(1.1)' : 'scale(1)', 
          transition: 'transform 0.3s ease' 
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    </div>
  );
};

// Mail & Communication Icons
export const MailIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAnimating ? 'animate-bounce' : ''}
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path 
          d="m22 7-10 5L2 7" 
          style={{ 
            transform: isAnimating ? 'translateY(-2px)' : 'translateY(0)', 
            transition: 'transform 0.3s ease' 
          }}
        />
      </svg>
    </div>
  );
};

// Bell & Notification Icons
export const BellIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'rotate(15deg)' : 'rotate(0deg)', 
          transition: 'transform 0.3s ease' 
        }}
        className={isAnimating ? 'animate-bounce' : ''}
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    </div>
  );
};

// User & Profile Icons
export const UserIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'scale(1.1)' : 'scale(1)', 
          transition: 'transform 0.3s ease' 
        }}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
};

// Settings Icons
export const SettingsIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          transform: isAnimating ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 1s ease-in-out' 
        }}
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  );
};

// Lock & Security Icons
export const LockIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAnimating ? 'animate-pulse' : ''}
        style={{ 
          transform: isAnimating ? 'scale(1.05)' : 'scale(1)', 
          transition: 'transform 0.3s ease' 
        }}
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </div>
  );
};

// Eye & Visibility Icons
export const EyeIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleMouseEnter = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };
  
  return (
    <div 
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isAnimating ? 'animate-pulse' : ''}
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle 
          cx="12" 
          cy="12" 
          r="3" 
          style={{ 
            transform: isAnimating ? 'scale(1.2)' : 'scale(1)', 
            transition: 'transform 0.3s ease' 
          }}
        />
      </svg>
    </div>
  );
};

// Export all animated icons as IconItem array
export const animatedIcons: IconItem[] = [
  // Loading & Progress
  {
    id: "animated-loading-spinner",
    name: "loading-spinner",
    svg: LoadingSpinnerIcon,
    style: "animated",
    category: "loading",
    tags: ["loading", "spinner", "progress", "animated"]
  },
  {
    id: "animated-loading-dots",
    name: "loading-dots",
    svg: LoadingDotsIcon,
    style: "animated",
    category: "loading",
    tags: ["loading", "dots", "progress", "animated"]
  },

  // Upload & Download
  {
    id: "animated-upload",
    name: "upload",
    svg: UploadIcon,
    style: "animated",
    category: "files",
    tags: ["upload", "arrow", "up", "file", "animated"]
  },
  {
    id: "animated-download",
    name: "download",
    svg: DownloadIcon,
    style: "animated",
    category: "files",
    tags: ["download", "arrow", "down", "file", "animated"]
  },

  // Navigation & Arrows
  {
    id: "animated-arrow-right",
    name: "arrow-right",
    svg: ArrowRightIcon,
    style: "animated",
    category: "arrows",
    tags: ["arrow", "right", "navigation", "animated"]
  },
  {
    id: "animated-chevron-up",
    name: "chevron-up",
    svg: ChevronUpIcon,
    style: "animated",
    category: "arrows",
    tags: ["chevron", "up", "navigation", "animated"]
  },
  {
    id: "animated-chevron-down",
    name: "chevron-down",
    svg: ChevronDownIcon,
    style: "animated",
    category: "arrows",
    tags: ["chevron", "down", "navigation", "animated"]
  },

  // Check & Success
  {
    id: "animated-check",
    name: "check",
    svg: CheckIcon,
    style: "animated",
    category: "actions",
    tags: ["check", "success", "done", "animated"]
  },
  {
    id: "animated-circle-check",
    name: "circle-check",
    svg: CircleCheckIcon,
    style: "animated",
    category: "actions",
    tags: ["check", "circle", "success", "animated"]
  },

  // File Management
  {
    id: "animated-folder-sync",
    name: "folder-sync",
    svg: FolderSyncIcon,
    style: "animated",
    category: "files",
    tags: ["folder", "sync", "refresh", "animated"]
  },
  {
    id: "animated-archive",
    name: "archive",
    svg: ArchiveIcon,
    style: "animated",
    category: "files",
    tags: ["archive", "box", "storage", "animated"]
  },

  // Communication
  {
    id: "animated-signal",
    name: "signal",
    svg: SignalIcon,
    style: "animated",
    category: "communication",
    tags: ["signal", "bars", "network", "animated"]
  },
  {
    id: "animated-wifi",
    name: "wifi",
    svg: WifiIcon,
    style: "animated",
    category: "communication",
    tags: ["wifi", "wireless", "network", "animated"]
  },

  // Actions
  {
    id: "animated-copy",
    name: "copy",
    svg: CopyIcon,
    style: "animated",
    category: "actions",
    tags: ["copy", "duplicate", "clipboard", "animated"]
  },
  {
    id: "animated-trash",
    name: "trash",
    svg: TrashIcon,
    style: "animated",
    category: "actions",
    tags: ["trash", "delete", "remove", "animated"]
  },
  {
    id: "animated-plus",
    name: "plus",
    svg: PlusIcon,
    style: "animated",
    category: "actions",
    tags: ["plus", "add", "create", "animated"]
  },

  // Time & Status
  {
    id: "animated-clock",
    name: "clock",
    svg: ClockIcon,
    style: "animated",
    category: "time",
    tags: ["clock", "time", "schedule", "animated"]
  },
  {
    id: "animated-rocket",
    name: "rocket",
    svg: RocketIcon,
    style: "animated",
    category: "general",
    tags: ["rocket", "launch", "speed", "animated"]
  },

  // Social
  {
    id: "animated-heart",
    name: "heart",
    svg: HeartIcon,
    style: "animated",
    category: "social",
    tags: ["heart", "love", "like", "animated"]
  },
  {
    id: "animated-star",
    name: "star",
    svg: StarIcon,
    style: "animated",
    category: "social",
    tags: ["star", "favorite", "rating", "animated"]
  },
  {
    id: "animated-thumbs-up",
    name: "thumbs-up",
    svg: ThumbsUpIcon,
    style: "animated",
    category: "social",
    tags: ["thumbs", "up", "like", "animated"]
  },

  // Utility
  {
    id: "animated-maximize",
    name: "maximize",
    svg: MaximizeIcon,
    style: "animated",
    category: "utility",
    tags: ["maximize", "expand", "fullscreen", "animated"]
  },
  {
    id: "animated-minimize",
    name: "minimize",
    svg: MinimizeIcon,
    style: "animated",
    category: "utility",
    tags: ["minimize", "shrink", "collapse", "animated"]
  },
  {
    id: "animated-refresh",
    name: "refresh",
    svg: RefreshIcon,
    style: "animated",
    category: "utility",
    tags: ["refresh", "reload", "sync", "animated"]
  },

  // Search
  {
    id: "animated-search",
    name: "search",
    svg: SearchIcon,
    style: "animated",
    category: "search",
    tags: ["search", "find", "magnify", "animated"]
  },

  // Communication
  {
    id: "animated-mail",
    name: "mail",
    svg: MailIcon,
    style: "animated",
    category: "communication",
    tags: ["mail", "email", "message", "animated"]
  },

  // Notifications
  {
    id: "animated-bell",
    name: "bell",
    svg: BellIcon,
    style: "animated",
    category: "notifications",
    tags: ["bell", "notification", "alert", "animated"]
  },

  // Users
  {
    id: "animated-user",
    name: "user",
    svg: UserIcon,
    style: "animated",
    category: "users",
    tags: ["user", "person", "profile", "animated"]
  },

  // Settings
  {
    id: "animated-settings",
    name: "settings",
    svg: SettingsIcon,
    style: "animated",
    category: "settings",
    tags: ["settings", "config", "gear", "animated"]
  },

  // Security
  {
    id: "animated-lock",
    name: "lock",
    svg: LockIcon,
    style: "animated",
    category: "security",
    tags: ["lock", "secure", "private", "animated"]
  },

  // Visibility
  {
    id: "animated-eye",
    name: "eye",
    svg: EyeIcon,
    style: "animated",
    category: "visibility",
    tags: ["eye", "view", "see", "animated"]
  }
];