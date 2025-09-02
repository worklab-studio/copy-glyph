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

// Additional enhanced animated icons
const ArrowUpIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={{ y: isHovered ? -3 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </motion.svg>
  );
};

const ArrowDownIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={{ y: isHovered ? 3 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </motion.svg>
  );
};

const ArrowLeftIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={{ x: isHovered ? -3 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </motion.svg>
  );
};

const MenuIcon: ComponentType<AnimatedIconProps> = ({ 
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
      <motion.line x1="4" x2="20" y1="6" y2="6" animate={isHovered ? { x2: 16 } : { x2: 20 }} transition={{ duration: 0.2 }}/>
      <motion.line x1="4" x2="20" y1="12" y2="12" animate={isHovered ? { x2: 18 } : { x2: 20 }} transition={{ duration: 0.2, delay: 0.1 }}/>
      <motion.line x1="4" x2="20" y1="18" y2="18" animate={isHovered ? { x2: 16 } : { x2: 20 }} transition={{ duration: 0.2, delay: 0.2 }}/>
    </svg>
  );
};

const XIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={{ rotate: isHovered ? 90 : 0, scale: isHovered ? 1.1 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </motion.svg>
  );
};

const HomeIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={{ scale: isHovered ? 1.05 : 1, y: isHovered ? -2 : 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </motion.svg>
  );
};

const CheckIcon: ComponentType<AnimatedIconProps> = ({ 
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
      stroke={isHovered ? "#10b981" : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ scale: isHovered ? [1, 1.3, 1] : 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      <motion.path 
        d="M20 6 9 17l-5-5"
        animate={isHovered ? { pathLength: [0, 1] } : { pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

const ChevronRightIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={{ x: isHovered ? 2 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </motion.svg>
  );
};

const ChevronLeftIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={{ x: isHovered ? -2 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </motion.svg>
  );
};

const PauseIcon: ComponentType<AnimatedIconProps> = ({ 
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
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </motion.svg>
  );
};

const SunIcon: ComponentType<AnimatedIconProps> = ({ 
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
      <motion.circle 
        cx="12" 
        cy="12" 
        r="4" 
        animate={isHovered ? { scale: 1.2, opacity: 0.8 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.g
        animate={isHovered ? { rotate: 45 } : { rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <path d="m21 12 1.5-1.5" />
        <path d="m19.5 7.5-.5-.5" />
        <path d="m12 2-.5-1.5" />
        <path d="m4.5 4.5-.5.5" />
        <path d="M1 12l1.5 1.5" />
        <path d="m4.5 19.5.5-.5" />
        <path d="m15 21-1.5 1.5" />
        <path d="m19.5 16.5.5.5" />
      </motion.g>
    </svg>
  );
};

const MoonIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </motion.svg>
  );
};

const ThumbsUpIcon: ComponentType<AnimatedIconProps> = ({ 
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
      fill={isHovered ? "#3b82f6" : "none"}
      stroke={isHovered ? "#3b82f6" : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ 
        scale: isHovered ? [1, 1.2, 1] : 1,
        y: isHovered ? [0, -3, 0] : 0 
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...props}
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </motion.svg>
  );
};

const ShoppingCartIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { x: [0, -2, 2, 0] } : { x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      {...props}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </motion.svg>
  );
};

const PhoneIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </motion.svg>
  );
};

const FolderIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { y: -2 } : { y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </motion.svg>
  );
};

const CloudIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { y: [0, -3, 0] } : { y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      {...props}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </motion.svg>
  );
};

const LockIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { scale: 1.05, y: -1 } : { scale: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="m7 11V7a5 5 0 0 1 10 0v4" />
    </motion.svg>
  );
};

const UnlockIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { scale: 1.05, y: -1 } : { scale: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="m7 11V7a5 5 0 0 1 9.9-1" />
    </motion.svg>
  );
};

const CopyIcon: ComponentType<AnimatedIconProps> = ({ 
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <motion.rect 
        width="14" 
        height="14" 
        x="4" 
        y="4" 
        rx="2" 
        ry="2"
        animate={isHovered ? { x: 2, y: 2, opacity: 0.7 } : { x: 4, y: 4, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
};

const EditIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { rotate: -5 } : { rotate: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </motion.svg>
  );
};

const MessageCircleIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { scale: 1.05, y: -2 } : { scale: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </motion.svg>
  );
};

const CalendarIcon: ComponentType<AnimatedIconProps> = ({ 
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <motion.rect 
        width="2" 
        height="2" 
        x="8" 
        y="14"
        animate={isHovered ? { fill: color, fillOpacity: 0.6 } : { fillOpacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  );
};

const ClockIcon: ComponentType<AnimatedIconProps> = ({ 
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
      <circle cx="12" cy="12" r="10" />
      <motion.polyline 
        points="12,6 12,12 16,14"
        animate={isHovered ? { rotate: 30 } : { rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformOrigin: "12px 12px" }}
      />
    </svg>
  );
};

const UserIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </motion.svg>
  );
};

const CameraIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { y: -2 } : { y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <motion.circle 
        cx="12" 
        cy="13" 
        r="3"
        animate={isHovered ? { scale: 1.2, opacity: 0.7 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.svg>
  );
};

const RocketIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { y: -5, rotate: -5 } : { y: 0, rotate: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </motion.svg>
  );
};

const GlobeIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { rotateY: 180 } : { rotateY: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m3 12 18 0" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </motion.svg>
  );
};

const ClapIcon: ComponentType<AnimatedIconProps> = ({ 
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
      animate={isHovered ? { rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.1, 1] } : { rotate: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      {...props}
    >
      <path d="M11.5 15H7a4 4 0 0 1-4-4v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v.5a3 3 0 0 0 3 3h4" />
      <path d="M11.5 15v2.5a3.5 3.5 0 0 1-7 0v-2.5" />
      <path d="M11.5 15H17a4 4 0 0 0 4-4v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 0-.5.5v.5a3 3 0 0 1-3 3h-5.5" />
      <path d="M15 8.5a2.5 2.5 0 0 1 5 0V15" />
      <path d="M11 3.5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v8" />
      <path d="M8.5 6a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v7" />
      <path d="M6 7.5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5v6" />
    </motion.svg>
  );
};

const SparklesIcon: ComponentType<AnimatedIconProps> = ({ 
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
        d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
        animate={isHovered ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.path 
        d="M20 3v4"
        animate={isHovered ? { scaleY: [1, 1.5, 1] } : { scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <motion.path 
        d="M22 5h-4"
        animate={isHovered ? { scaleX: [1, 1.5, 1] } : { scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <motion.path 
        d="M4 17v2"
        animate={isHovered ? { scaleY: [1, 1.3, 1] } : { scaleY: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      <motion.path 
        d="M5 18H3"
        animate={isHovered ? { scaleX: [1, 1.3, 1] } : { scaleX: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
    </svg>
  );
};

const LightningIcon: ComponentType<AnimatedIconProps> = ({ 
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
      fill={isHovered ? "#fbbf24" : "none"}
      stroke={isHovered ? "#fbbf24" : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={isHovered ? { 
        scale: [1, 1.1, 1],
        filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))"
      } : { 
        scale: 1,
        filter: "none"
      }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <path d="m13 2-3 7h4l-3 7" />
    </motion.svg>
  );
};

// Line-MD Loading Loop
const LoadingLoopIcon: React.FC<AnimatedIconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  strokeWidth = 2, 
  isHovered = false, 
  className = '' 
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path
        d="M12 3c4.97 0 9 4.03 9 9"
        strokeDasharray="16"
        initial={{ strokeDashoffset: 16, rotate: 0 }}
        animate={{ 
          strokeDashoffset: isHovered ? 0 : 16,
          rotate: isHovered ? 360 : 0
        }}
        transition={{ 
          strokeDashoffset: { duration: 0.2 },
          rotate: { duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "linear" }
        }}
        style={{ transformOrigin: '12px 12px' }}
      />
    </motion.svg>
  );
};

// Line-MD Heart Twotone
const HeartTwotoneIcon: React.FC<AnimatedIconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  strokeWidth = 2, 
  isHovered = false, 
  className = '' 
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
    >
      <motion.path
        d="M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9c0 0 -7.43 -7.79 -8.24 -9c-0.48 -0.71 -0.76 -1.57 -0.76 -2.5c0 -2.49 2.01 -4.5 4.5 -4.5c1.56 0 2.87 0.84 3.74 2c0.76 1 0.76 1 0.76 1Z"
        initial={{ fillOpacity: 0 }}
        animate={{ fillOpacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.15, delay: isHovered ? 0.7 : 0 }}
      />
      <motion.path
        d="M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="32"
        initial={{ strokeDashoffset: 32 }}
        animate={{ strokeDashoffset: isHovered ? 0 : 32 }}
        transition={{ duration: 0.7 }}
      />
    </motion.svg>
  );
};

// Category mapping for animated icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('chevron') || lowerName.includes('navigation') || lowerName.includes('home')) return 'navigation';
  if (lowerName.includes('mail') || lowerName.includes('message') || lowerName.includes('bell') || lowerName.includes('phone')) return 'communication';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('like') || lowerName.includes('eye') || lowerName.includes('thumbs') || lowerName.includes('clap')) return 'social';
  if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('refresh') || lowerName.includes('cog')) return 'system';
  if (lowerName.includes('download') || lowerName.includes('upload') || lowerName.includes('trash') || lowerName.includes('folder') || lowerName.includes('copy') || lowerName.includes('edit')) return 'files';
  if (lowerName.includes('search') || lowerName.includes('plus') || lowerName.includes('add') || lowerName.includes('zap') || lowerName.includes('x') || lowerName.includes('check')) return 'actions';
  if (lowerName.includes('loader') || lowerName.includes('loading') || lowerName.includes('spin') || lowerName.includes('wifi') || lowerName.includes('battery')) return 'status';
  if (lowerName.includes('activity') || lowerName.includes('chart')) return 'data';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('volume') || lowerName.includes('camera')) return 'media';
  if (lowerName.includes('airplane') || lowerName.includes('travel') || lowerName.includes('rocket')) return 'travel';
  if (lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('cloud')) return 'weather';
  if (lowerName.includes('shopping') || lowerName.includes('cart')) return 'commerce';
  if (lowerName.includes('lock') || lowerName.includes('unlock') || lowerName.includes('shield')) return 'security';
  if (lowerName.includes('user') || lowerName.includes('person') || lowerName.includes('profile')) return 'users';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('time')) return 'time';
  if (lowerName.includes('globe') || lowerName.includes('world')) return 'global';
  if (lowerName.includes('sparkles') || lowerName.includes('lightning')) return 'effects';
  
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
  },
  // New enhanced animated icons
  {
    id: 'animated-arrow-up',
    name: 'Arrow Up',
    svg: ArrowUpIcon,
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'up', 'direction', 'navigation', 'animated', 'slide']
  },
  {
    id: 'animated-arrow-down',
    name: 'Arrow Down',
    svg: ArrowDownIcon,
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'down', 'direction', 'navigation', 'animated', 'slide']
  },
  {
    id: 'animated-arrow-left',
    name: 'Arrow Left',
    svg: ArrowLeftIcon,
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'left', 'direction', 'navigation', 'animated', 'slide']
  },
  {
    id: 'animated-menu',
    name: 'Menu',
    svg: MenuIcon,
    style: 'animated',
    category: 'navigation',
    tags: ['menu', 'hamburger', 'navigation', 'animated', 'morphing']
  },
  {
    id: 'animated-x',
    name: 'X',
    svg: XIcon,
    style: 'animated',
    category: 'actions',
    tags: ['x', 'close', 'cancel', 'remove', 'animated', 'rotate']
  },
  {
    id: 'animated-home',
    name: 'Home',
    svg: HomeIcon,
    style: 'animated',
    category: 'navigation',
    tags: ['home', 'house', 'dashboard', 'navigation', 'animated', 'lift']
  },
  {
    id: 'animated-check',
    name: 'Check',
    svg: CheckIcon,
    style: 'animated',
    category: 'actions',
    tags: ['check', 'tick', 'success', 'confirm', 'animated', 'draw']
  },
  {
    id: 'animated-chevron-right',
    name: 'Chevron Right',
    svg: ChevronRightIcon,
    style: 'animated',
    category: 'navigation',
    tags: ['chevron', 'right', 'arrow', 'navigation', 'animated', 'slide']
  },
  {
    id: 'animated-chevron-left',
    name: 'Chevron Left',
    svg: ChevronLeftIcon,
    style: 'animated',
    category: 'navigation',
    tags: ['chevron', 'left', 'arrow', 'navigation', 'animated', 'slide']  
  },
  {
    id: 'animated-pause',
    name: 'Pause',
    svg: PauseIcon,
    style: 'animated',
    category: 'media',
    tags: ['pause', 'stop', 'media', 'video', 'animated', 'scale']
  },
  {
    id: 'animated-sun',
    name: 'Sun',
    svg: SunIcon,
    style: 'animated',
    category: 'weather',
    tags: ['sun', 'light', 'weather', 'bright', 'animated', 'rotate']
  },
  {
    id: 'animated-moon',
    name: 'Moon',
    svg: MoonIcon,
    style: 'animated',
    category: 'weather',
    tags: ['moon', 'dark', 'night', 'weather', 'animated', 'sway']
  },
  {
    id: 'animated-thumbs-up',
    name: 'Thumbs Up',
    svg: ThumbsUpIcon,
    style: 'animated',
    category: 'social',
    tags: ['thumbs', 'up', 'like', 'approval', 'social', 'animated', 'bounce']
  },
  {
    id: 'animated-shopping-cart',
    name: 'Shopping Cart',
    svg: ShoppingCartIcon,
    style: 'animated',
    category: 'commerce',
    tags: ['cart', 'shopping', 'commerce', 'buy', 'animated', 'shake']
  },
  {
    id: 'animated-phone',
    name: 'Phone',
    svg: PhoneIcon,
    style: 'animated',
    category: 'communication',
    tags: ['phone', 'call', 'communication', 'contact', 'animated', 'ring']
  },
  {
    id: 'animated-folder',
    name: 'Folder',
    svg: FolderIcon,
    style: 'animated',
    category: 'files',
    tags: ['folder', 'directory', 'files', 'storage', 'animated', 'lift']
  },
  {
    id: 'animated-cloud',
    name: 'Cloud',
    svg: CloudIcon,
    style: 'animated',
    category: 'weather',
    tags: ['cloud', 'storage', 'weather', 'sky', 'animated', 'float']
  },
  {
    id: 'animated-lock',
    name: 'Lock',
    svg: LockIcon,
    style: 'animated',
    category: 'security',
    tags: ['lock', 'security', 'password', 'secure', 'animated', 'lift']
  },
  {
    id: 'animated-unlock',
    name: 'Unlock',
    svg: UnlockIcon,
    style: 'animated',
    category: 'security',
    tags: ['unlock', 'open', 'security', 'access', 'animated', 'lift']
  },
  {
    id: 'animated-copy',
    name: 'Copy',
    svg: CopyIcon,
    style: 'animated',
    category: 'files',
    tags: ['copy', 'duplicate', 'clipboard', 'files', 'animated', 'duplicate']
  },
  {
    id: 'animated-edit',
    name: 'Edit',
    svg: EditIcon,
    style: 'animated',
    category: 'files',
    tags: ['edit', 'pencil', 'modify', 'write', 'animated', 'tilt']
  },
  {
    id: 'animated-message-circle',
    name: 'Message Circle',
    svg: MessageCircleIcon,
    style: 'animated',
    category: 'communication',
    tags: ['message', 'chat', 'communication', 'talk', 'animated', 'lift']
  },
  {
    id: 'animated-calendar',
    name: 'Calendar',
    svg: CalendarIcon,
    style: 'animated',
    category: 'time',
    tags: ['calendar', 'date', 'time', 'schedule', 'animated', 'highlight']
  },
  {
    id: 'animated-clock',
    name: 'Clock',
    svg: ClockIcon,
    style: 'animated',
    category: 'time',
    tags: ['clock', 'time', 'schedule', 'timer', 'animated', 'tick']
  },
  {
    id: 'animated-user',
    name: 'User',
    svg: UserIcon,
    style: 'animated',
    category: 'users',
    tags: ['user', 'person', 'profile', 'account', 'animated', 'scale']
  },
  {
    id: 'animated-camera',
    name: 'Camera',
    svg: CameraIcon,
    style: 'animated',
    category: 'media',
    tags: ['camera', 'photo', 'image', 'capture', 'media', 'animated', 'flash']
  },
  {
    id: 'animated-rocket',
    name: 'Rocket',
    svg: RocketIcon,
    style: 'animated',
    category: 'travel',
    tags: ['rocket', 'launch', 'speed', 'fast', 'travel', 'animated', 'launch']
  },
  {
    id: 'animated-globe',
    name: 'Globe',
    svg: GlobeIcon,
    style: 'animated',
    category: 'global',
    tags: ['globe', 'world', 'internet', 'global', 'animated', 'spin']
  },
  {
    id: 'animated-clap',
    name: 'Clap',
    svg: ClapIcon,
    style: 'animated',
    category: 'social',
    tags: ['clap', 'applause', 'praise', 'social', 'animated', 'clap']
  },
  {
    id: 'animated-sparkles',
    name: 'Sparkles',
    svg: SparklesIcon,
    style: 'animated',
    category: 'effects',
    tags: ['sparkles', 'magic', 'stars', 'shine', 'effects', 'animated', 'twinkle']
  },
  {
    id: 'animated-lightning',
    name: 'Lightning',
    svg: LightningIcon,
    style: 'animated',
    category: 'effects',
    tags: ['lightning', 'bolt', 'electric', 'power', 'effects', 'animated', 'glow']
  },
  // Basic Line-MD icons for now
  {
    id: 'line-md-loading-loop',
    name: 'Loading Loop',
    svg: LoadingLoopIcon,
    style: 'animated',
    category: 'status',
    tags: ['loading', 'spinner', 'loop', 'progress', 'animated', 'rotate']
  },
  {
    id: 'line-md-heart-twotone',
    name: 'Heart Twotone',
    svg: HeartTwotoneIcon,
    style: 'animated',
    category: 'social',
    tags: ['heart', 'love', 'like', 'favorite', 'animated', 'fill']
  }
];