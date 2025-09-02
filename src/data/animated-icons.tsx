import { type IconItem } from '@/types/icon';
import { ComponentType } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

// Interface for animated icon props
interface AnimatedIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  isHovered?: boolean;
  className?: string;
}

// Activity Icon with path drawing animation
const ActivityIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({
        pathLength: [0, 1],
        pathOffset: [1, 0],
        opacity: [0, 1],
        transition: { duration: 0.6, ease: 'linear' }
      });
    } else {
      controls.start({
        pathLength: 1,
        pathOffset: 0,
        opacity: 1,
        transition: { duration: 0.4 }
      });
    }
  }, [isHovered, controls]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path
        animate={controls}
        initial={{ pathLength: 1, pathOffset: 0, opacity: 1 }}
        d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
      />
    </svg>
  );
};

// Bell Icon with shake animation
const BellIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5, ease: 'easeInOut' }
      });
    } else {
      controls.start({
        rotate: 0,
        transition: { duration: 0.3 }
      });
    }
  }, [isHovered, controls]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={controls}
      initial={{ rotate: 0 }}
      {...props}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </motion.svg>
  );
};

// Loader Icon with continuous spin
const LoaderIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: isHovered ? 360 : 0 }}
      transition={{ duration: isHovered ? 1 : 0.3, ease: "linear", repeat: isHovered ? Infinity : 0 }}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </motion.svg>
  );
};

// Heart Icon with pulse and color change
const HeartIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isHovered ? "#ef4444" : "none"}
      stroke={isHovered ? "#ef4444" : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        scale: isHovered ? [1, 1.2, 1] : 1,
      }}
      transition={{ 
        duration: 0.6,
        ease: "easeInOut",
        repeat: isHovered ? Infinity : 0,
        repeatType: "reverse"
      }}
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </motion.svg>
  );
};

// Star Icon with glow animation
const StarIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isHovered ? "#facc15" : "none"}
      stroke={isHovered ? "#facc15" : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        scale: isHovered ? [1, 1.1, 1] : 1,
        filter: isHovered ? "drop-shadow(0 0 8px rgba(250, 204, 21, 0.8))" : "none"
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </motion.svg>
  );
};

// Arrow Right Icon with slide animation
const ArrowRightIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ x: isHovered ? 4 : 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </motion.svg>
  );
};

// Download Icon with downward bounce
const DownloadIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: isHovered ? [0, 4, 0] : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </motion.svg>
  );
};

// Search Icon with zoom animation
const SearchIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ scale: isHovered ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </motion.svg>
  );
};

// Mail Icon with send animation
const MailIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        x: isHovered ? 4 : 0,
        scale: isHovered ? 1.05 : 1 
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </motion.svg>
  );
};

// Settings Icon with rotate animation
const SettingsIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: isHovered ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </motion.svg>
  );
};

// Plus Icon with scale and rotate animation
const PlusIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        scale: isHovered ? 1.25 : 1,
        rotate: isHovered ? 90 : 0 
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </motion.svg>
  );
};

// Airplane Icon with flight animation
const AirplaneIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        x: isHovered ? 3 : 0,
        y: isHovered ? -3 : 0,
        scale: isHovered ? 0.9 : 1 
      }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </motion.svg>
  );
};

// Refresh Icon with spin animation
const RefreshIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: isHovered ? 360 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </motion.svg>
  );
};

// Volume Icon with wave animation
const VolumeIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
      <motion.path 
        d="M15.54 8.46a5 5 0 0 1 0 7.07"
        animate={{ 
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.7, 1, 0.7] : 0.7 
        }}
        transition={{ 
          duration: 0.8,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse" 
        }}
      />
      <motion.path 
        d="M19.07 4.93a10 10 0 0 1 0 14.14"
        animate={{ 
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.5, 1, 0.5] : 0.5 
        }}
        transition={{ 
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse",
          delay: 0.2 
        }}
      />
    </svg>
  );
};

// Battery Icon with charging animation
const BatteryIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="6" width="16" height="12" rx="2" ry="2" />
      <line x1="22" y1="10" x2="22" y2="14" />
      <motion.rect
        x="4" 
        y="8" 
        width="12" 
        height="8"
        fill={color}
        animate={{
          width: isHovered ? [4, 12, 4] : 12,
          opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          repeatType: "loop"
        }}
      />
    </svg>
  );
};

// Trash Icon with shake animation
const TrashIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
        x: isHovered ? [0, -1, 1, -1, 0] : 0 
      }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </motion.svg>
  );
};

// Upload Icon with upward bounce
const UploadIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: isHovered ? [0, -4, 0] : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17,8 12,3 7,8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </motion.svg>
  );
};

// Zap Icon with electric animation
const ZapIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isHovered ? "#eab308" : "none"}
      stroke={isHovered ? "#eab308" : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{
        scale: isHovered ? [1, 1.2, 1] : 1,
        filter: isHovered ? "drop-shadow(0 0 8px rgba(234, 179, 8, 0.8))" : "none"
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
    </motion.svg>
  );
};

// Play Icon with scale animation
const PlayIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isHovered ? color : "none"}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ scale: isHovered ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <polygon points="5,3 19,12 5,21" />
    </motion.svg>
  );
};

// WiFi Icon with signal animation
const WifiIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path 
        d="M1 9l2-2c4.97-4.97 13.03-4.97 18 0l2 2"
        animate={{ opacity: isHovered ? [0.3, 1, 0.3] : 0.3 }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0, delay: 0 }}
      />
      <motion.path 
        d="M5 13l2-2c2.76-2.76 7.24-2.76 10 0l2 2"
        animate={{ opacity: isHovered ? [0.5, 1, 0.5] : 0.5 }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0, delay: 0.2 }}
      />
      <motion.path 
        d="M9 17l2-2c0.87-0.87 2.13-0.87 3 0l2 2"
        animate={{ opacity: isHovered ? [0.7, 1, 0.7] : 0.7 }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0, delay: 0.4 }}
      />
      <circle cx="12" cy="20" r="1" fill={color} />
    </svg>
  );
};

// Eye Icon with blink animation
const EyeIcon: ComponentType<AnimatedIconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  strokeWidth = 2, 
  isHovered = false,
  ...props 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path 
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        animate={{ scaleY: isHovered ? [1, 0.1, 1] : 1 }}
        transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 2 }}
      />
      <motion.circle 
        cx="12" 
        cy="12" 
        r="3"
        animate={{ scale: isHovered ? [1, 0.8, 1] : 1 }}
        transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatDelay: 2 }}
      />
    </svg>
  );
};

// Category mapping for animated icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('navigation')) return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('bell')) return 'communication';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('like') || lowerName.includes('eye')) return 'social';
  if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('refresh')) return 'system';
  if (lowerName.includes('download') || lowerName.includes('upload') || lowerName.includes('trash')) return 'files';
  if (lowerName.includes('search') || lowerName.includes('plus') || lowerName.includes('add') || lowerName.includes('zap')) return 'actions';
  if (lowerName.includes('loader') || lowerName.includes('loading') || lowerName.includes('spin') || lowerName.includes('wifi') || lowerName.includes('battery')) return 'status';
  if (lowerName.includes('activity') || lowerName.includes('chart')) return 'data';
  if (lowerName.includes('play') || lowerName.includes('volume')) return 'media';
  if (lowerName.includes('airplane') || lowerName.includes('travel')) return 'travel';
  
  return 'general';
};

export const animatedIcons: IconItem[] = [
  {
    id: 'animated-activity',
    name: 'Activity',
    svg: ActivityIcon,
    style: 'animated',
    category: 'data',
    tags: ['activity', 'chart', 'analytics', 'data', 'animated', 'drawing']
  },
  {
    id: 'animated-bell',
    name: 'Bell',
    svg: BellIcon,
    style: 'animated',
    category: 'communication',
    tags: ['bell', 'notification', 'alert', 'communication', 'animated', 'shake']
  },
  {
    id: 'animated-loader',
    name: 'Loader',
    svg: LoaderIcon,
    style: 'animated',
    category: 'status',
    tags: ['loader', 'loading', 'spinner', 'status', 'animated', 'spin']
  },
  {
    id: 'animated-heart',
    name: 'Heart',
    svg: HeartIcon,
    style: 'animated',
    category: 'social',
    tags: ['heart', 'love', 'like', 'favorite', 'social', 'animated', 'pulse']
  },
  {
    id: 'animated-star',
    name: 'Star',
    svg: StarIcon,
    style: 'animated',
    category: 'social',
    tags: ['star', 'favorite', 'rating', 'social', 'animated', 'glow']
  },
  {
    id: 'animated-arrow-right',
    name: 'Arrow Right',
    svg: ArrowRightIcon,
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'right', 'navigation', 'direction', 'animated', 'slide']
  },
  {
    id: 'animated-download',
    name: 'Download',
    svg: DownloadIcon,
    style: 'animated',
    category: 'files',
    tags: ['download', 'save', 'files', 'storage', 'animated', 'bounce']
  },
  {
    id: 'animated-search',
    name: 'Search',
    svg: SearchIcon,
    style: 'animated',
    category: 'actions',
    tags: ['search', 'find', 'magnify', 'actions', 'animated', 'zoom']
  },
  {
    id: 'animated-mail',
    name: 'Mail',
    svg: MailIcon,
    style: 'animated',
    category: 'communication',
    tags: ['mail', 'email', 'message', 'communication', 'animated', 'send']
  },
  {
    id: 'animated-settings',
    name: 'Settings',
    svg: SettingsIcon,
    style: 'animated',
    category: 'system',
    tags: ['settings', 'gear', 'config', 'system', 'animated', 'rotate']
  },
  {
    id: 'animated-plus',
    name: 'Plus',
    svg: PlusIcon,
    style: 'animated',
    category: 'actions',
    tags: ['plus', 'add', 'create', 'actions', 'animated', 'scale']
  },
  {
    id: 'animated-airplane',
    name: 'Airplane',
    svg: AirplaneIcon,
    style: 'animated',
    category: 'travel',
    tags: ['airplane', 'plane', 'travel', 'flight', 'animated', 'fly']
  },
  {
    id: 'animated-refresh',
    name: 'Refresh',
    svg: RefreshIcon,
    style: 'animated',
    category: 'system',
    tags: ['refresh', 'reload', 'update', 'system', 'animated', 'spin']
  },
  {
    id: 'animated-volume',
    name: 'Volume',
    svg: VolumeIcon,
    style: 'animated',
    category: 'media',
    tags: ['volume', 'audio', 'sound', 'media', 'animated', 'waves']
  },
  {
    id: 'animated-battery',
    name: 'Battery',
    svg: BatteryIcon,
    style: 'animated',
    category: 'status',
    tags: ['battery', 'power', 'charge', 'status', 'animated', 'charging']
  },
  {
    id: 'animated-trash',
    name: 'Trash',
    svg: TrashIcon,
    style: 'animated',
    category: 'files',
    tags: ['trash', 'delete', 'remove', 'files', 'animated', 'shake']
  },
  {
    id: 'animated-upload',
    name: 'Upload',
    svg: UploadIcon,
    style: 'animated',
    category: 'files',
    tags: ['upload', 'share', 'files', 'storage', 'animated', 'bounce']
  },
  {
    id: 'animated-zap',
    name: 'Zap',
    svg: ZapIcon,
    style: 'animated',
    category: 'actions',
    tags: ['zap', 'lightning', 'power', 'energy', 'animated', 'electric']
  },
  {
    id: 'animated-play',
    name: 'Play',
    svg: PlayIcon,
    style: 'animated',
    category: 'media',
    tags: ['play', 'start', 'media', 'video', 'animated', 'scale']
  },
  {
    id: 'animated-wifi',
    name: 'WiFi',
    svg: WifiIcon,
    style: 'animated',
    category: 'status',
    tags: ['wifi', 'network', 'connection', 'status', 'animated', 'signal']
  },
  {
    id: 'animated-eye',
    name: 'Eye',
    svg: EyeIcon,
    style: 'animated',
    category: 'social',
    tags: ['eye', 'view', 'see', 'visibility', 'animated', 'blink']
  }
];