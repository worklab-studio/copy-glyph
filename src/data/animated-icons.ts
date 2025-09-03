import React from 'react';
import { type IconItem } from '../types/icon';

// Helper function to create animated icons with consistent props
const createAnimatedIcon = (svgContent: string, animations: string = '') => {
  return ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
    return React.createElement('div', {
      className: `inline-block transition-transform duration-200 hover:scale-110 ${className}`,
      dangerouslySetInnerHTML: {
        __html: `
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="${size}" 
            height="${size}" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="${color}" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            ${svgContent}
            ${animations}
          </svg>
        `
      }
    });
  };
};

// Loading & Progress Icons
const LoadingLoopIcon = createAnimatedIcon(
  '<path d="M12 3c4.97 0 9 4.03 9 9" stroke-dasharray="16" stroke-dashoffset="16"/>',
  `<animate attributeName="stroke-dashoffset" values="16;0" dur="0.2s" fill="freeze"/>
   <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1.5s" repeatCount="indefinite"/>`
);

const SpinnerIcon = createAnimatedIcon(
  '<circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" stroke-linecap="round" stroke-dasharray="60"/>',
  '<animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="2s" repeatCount="indefinite"/>'
);

const ProgressIcon = createAnimatedIcon(
  '<path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07 .74 5.6 1.97" stroke-dasharray="56.55" stroke-dashoffset="56.55"/>',
  '<animate attributeName="stroke-dashoffset" values="56.55;0" dur="2s" fill="freeze"/>'
);

const DotsSpinnerIcon = createAnimatedIcon(
  `<circle cx="12" cy="2" r="0"><animate attributeName="r" values="0;2;0" dur="1s" repeatCount="indefinite" begin="0s"/></circle>
   <circle cx="12" cy="22" r="0"><animate attributeName="r" values="0;2;0" dur="1s" repeatCount="indefinite" begin="0.5s"/></circle>
   <circle cx="22" cy="12" r="0"><animate attributeName="r" values="0;2;0" dur="1s" repeatCount="indefinite" begin="0.25s"/></circle>
   <circle cx="2" cy="12" r="0"><animate attributeName="r" values="0;2;0" dur="1s" repeatCount="indefinite" begin="0.75s"/></circle>`
);

const PulseIcon = createAnimatedIcon(
  '<circle cx="12" cy="12" r="10" opacity="0"/>',
  `<animate attributeName="r" values="0;10;10;10" dur="2s" repeatCount="indefinite"/>
   <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite"/>`
);

// Check & Success Icons
const CheckIcon = createAnimatedIcon(
  '<path d="M5 12l5 5l10 -10" stroke-dasharray="20" stroke-dashoffset="20"/>',
  '<animate attributeName="stroke-dashoffset" values="20;0" dur="0.4s" fill="freeze"/>'
);

const CheckAllIcon = createAnimatedIcon(
  `<path d="M2 13.5l4 4l10.75 -10.75" stroke-dasharray="24" stroke-dashoffset="24"/>
   <path d="M7.5 13.5l4 4l10.75 -10.75" stroke-dasharray="24" stroke-dashoffset="24"/>`,
  `<animate attributeName="stroke-dashoffset" values="24;0" dur="0.4s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="24;0" begin="0.4s" dur="0.4s" fill="freeze"/>`
);

const CheckCircleIcon = createAnimatedIcon(
  `<circle cx="12" cy="12" r="10" stroke-dasharray="63" stroke-dashoffset="63"/>
   <path d="M8 12l3 3l5 -6" stroke-dasharray="12" stroke-dashoffset="12"/>`,
  `<animate attributeName="stroke-dashoffset" values="63;0" dur="0.6s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="12;0" begin="0.6s" dur="0.3s" fill="freeze"/>`
);

const SuccessIcon = createAnimatedIcon(
  `<circle cx="12" cy="12" r="10" fill="none"/>
   <path d="m9 12 2 2 4-4"/>`,
  `<animate attributeName="r" values="0;10" dur="0.3s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="8;0" begin="0.3s" dur="0.2s" fill="freeze"/>`
);

// Menu & Navigation Icons
const MenuToCloseIcon = createAnimatedIcon(
  `<path d="M5 12H19" opacity="1"/>
   <path d="M5 5L19 5M5 19L19 19" opacity="0"/>`,
  `<animate attributeName="d" values="M5 12H19;M12 12H12" dur="0.4s" fill="freeze"/>
   <set attributeName="opacity" to="0" begin="0.4s" fill="freeze"/>
   <animate attributeName="d" values="M5 5L19 5M5 19L19 19;M5 5L19 19M5 19L19 5" begin="0.2s" dur="0.4s" fill="freeze"/>
   <set attributeName="opacity" to="1" begin="0.2s" fill="freeze"/>`
);

const MenuIcon = createAnimatedIcon(
  `<path d="M5 7h14" stroke-dasharray="14" stroke-dashoffset="14"/>
   <path d="M5 12h14" stroke-dasharray="14" stroke-dashoffset="14"/>
   <path d="M5 17h14" stroke-dasharray="14" stroke-dashoffset="14"/>`,
  `<animate attributeName="stroke-dashoffset" values="14;0" dur="0.3s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="14;0" begin="0.1s" dur="0.3s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="14;0" begin="0.2s" dur="0.3s" fill="freeze"/>`
);

const HamburgerIcon = createAnimatedIcon(
  `<line x1="3" y1="6" x2="21" y2="6"/>
   <line x1="3" y1="12" x2="21" y2="12"/>
   <line x1="3" y1="18" x2="21" y2="18"/>`,
  `<animateTransform attributeName="transform" type="rotate" values="0;180;360" dur="2s" repeatCount="indefinite"/>`
);

// Arrow Icons
const ArrowLeftIcon = createAnimatedIcon(
  `<path d="M5 12h14" stroke-dasharray="14" stroke-dashoffset="14"/>
   <path d="M12 5l-7 7 7 7" stroke-dasharray="14" stroke-dashoffset="14"/>`,
  `<animate attributeName="stroke-dashoffset" values="14;0" dur="0.3s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="14;0" begin="0.1s" dur="0.3s" fill="freeze"/>`
);

const ArrowRightIcon = createAnimatedIcon(
  `<path d="M5 12h14" stroke-dasharray="14" stroke-dashoffset="14"/>
   <path d="m12 5 7 7-7 7" stroke-dasharray="14" stroke-dashoffset="14"/>`,
  `<animate attributeName="stroke-dashoffset" values="14;0" dur="0.3s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="14;0" begin="0.1s" dur="0.3s" fill="freeze"/>`
);

const ArrowUpIcon = createAnimatedIcon(
  `<path d="m12 5-7 7h14l-7-7z" stroke-dasharray="20" stroke-dashoffset="20"/>
   <path d="M12 5v14" stroke-dasharray="14" stroke-dashoffset="14"/>`,
  `<animate attributeName="stroke-dashoffset" values="20;0" dur="0.3s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="14;0" begin="0.1s" dur="0.3s" fill="freeze"/>`
);

const ArrowDownIcon = createAnimatedIcon(
  `<path d="M12 5v14" stroke-dasharray="14" stroke-dashoffset="14"/>
   <path d="m19 12-7 7-7-7" stroke-dasharray="14" stroke-dashoffset="14"/>`,
  `<animate attributeName="stroke-dashoffset" values="14;0" dur="0.3s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="14;0" begin="0.1s" dur="0.3s" fill="freeze"/>`
);

const ChevronLeftIcon = createAnimatedIcon(
  '<path d="m15 18-6-6 6-6" stroke-dasharray="12" stroke-dashoffset="12"/>',
  '<animate attributeName="stroke-dashoffset" values="12;0" dur="0.3s" fill="freeze"/>'
);

const ChevronRightIcon = createAnimatedIcon(
  '<path d="m9 18 6-6-6-6" stroke-dasharray="12" stroke-dashoffset="12"/>',
  '<animate attributeName="stroke-dashoffset" values="12;0" dur="0.3s" fill="freeze"/>'
);

const ChevronUpIcon = createAnimatedIcon(
  '<path d="m18 15-6-6-6 6" stroke-dasharray="12" stroke-dashoffset="12"/>',
  '<animate attributeName="stroke-dashoffset" values="12;0" dur="0.3s" fill="freeze"/>'
);

const ChevronDownIcon = createAnimatedIcon(
  '<path d="m6 9 6 6 6-6" stroke-dasharray="12" stroke-dashoffset="12"/>',
  '<animate attributeName="stroke-dashoffset" values="12;0" dur="0.3s" fill="freeze"/>'
);

// Upload & Download Icons
const UploadLoopIcon = createAnimatedIcon(
  `<path d="M12 3v12" stroke-dasharray="12" stroke-dashoffset="12"/>
   <path d="m8 7 4-4 4 4" stroke-dasharray="8" stroke-dashoffset="8"/>
   <rect x="4" y="19" width="16" height="2" rx="1"/>`,
  `<animate attributeName="stroke-dashoffset" values="12;0" dur="0.4s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="8;0" begin="0.2s" dur="0.3s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.4s" dur="0.2s" fill="freeze"/>`
);

const DownloadIcon = createAnimatedIcon(
  `<path d="M12 3v12" stroke-dasharray="12" stroke-dashoffset="12"/>
   <path d="m8 11 4 4 4-4" stroke-dasharray="8" stroke-dashoffset="8"/>
   <rect x="4" y="19" width="16" height="2" rx="1"/>`,
  `<animate attributeName="stroke-dashoffset" values="12;0" dur="0.4s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="8;0" begin="0.2s" dur="0.3s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.4s" dur="0.2s" fill="freeze"/>`
);

const CloudUploadIcon = createAnimatedIcon(
  `<path d="M16 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"/>
   <path d="M7 10l5-5 5 5"/>
   <path d="M12 5v7"/>
   <path d="M18 10h1a2 2 0 0 1 0 4h-1" stroke-dasharray="20" stroke-dashoffset="20"/>`,
  `<animate attributeName="stroke-dashoffset" values="20;0" dur="0.5s" fill="freeze"/>
   <animateTransform attributeName="transform" type="translateY" values="0;-2;0" dur="1s" repeatCount="indefinite"/>`
);

// Social Icons
const HeartTwotoneIcon = createAnimatedIcon(
  '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
  `<animate attributeName="fill" values="none;currentColor;none" dur="1s" repeatCount="indefinite"/>
   <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="1s" repeatCount="indefinite"/>`
);

const StarIcon = createAnimatedIcon(
  '<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>',
  `<animate attributeName="fill" values="none;currentColor;none" dur="1.5s" repeatCount="indefinite"/>
   <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="2s" repeatCount="indefinite"/>`
);

const ThumbsUpIcon = createAnimatedIcon(
  `<path d="M7 10v12"/>
   <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>`,
  `<animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="0.3s"/>
   <animate attributeName="fill" values="none;currentColor;none" dur="0.3s"/>`
);

// Home & Location Icons
const HomeTwotoneIcon = createAnimatedIcon(
  `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
   <polyline points="9,22 9,12 15,12 15,22"/>`,
  `<animate attributeName="fill" values="none;currentColor;none" dur="2s" repeatCount="indefinite"/>
   <animate attributeName="stroke-dashoffset" values="40;0" dur="1s" fill="freeze"/>`
);

const MapPinIcon = createAnimatedIcon(
  `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
   <circle cx="12" cy="10" r="3"/>`,
  `<animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="1s" repeatCount="indefinite"/>
   <animate attributeName="fill" values="none;currentColor;none" begin="0.5s" dur="0.5s"/>`
);

const NavigationIcon = createAnimatedIcon(
  '<polygon points="3,11 22,2 13,21 11,13 3,11"/>',
  `<animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="2s" repeatCount="indefinite"/>
   <animate attributeName="fill" values="none;currentColor;none" dur="1s" repeatCount="indefinite"/>`
);

// Communication Icons
const BellIcon = createAnimatedIcon(
  `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
   <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`,
  `<animateTransform attributeName="transform" type="rotate" values="0 12 8;15 12 8;-15 12 8;0 12 8" dur="1s" repeatCount="indefinite"/>
   <animate attributeName="opacity" values="1;0.7;1" dur="1s" repeatCount="indefinite"/>`
);

const MessageCircleIcon = createAnimatedIcon(
  '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  `<animate attributeName="stroke-dasharray" values="0 50;25 25;50 0;25 25;0 50" dur="2s" repeatCount="indefinite"/>
   <animate attributeName="fill" values="none;currentColor;none" dur="1s" repeatCount="indefinite"/>`
);

const MailIcon = createAnimatedIcon(
  `<rect width="20" height="16" x="2" y="4" rx="2"/>
   <path d="m22 7-10 5L2 7"/>`,
  `<animate attributeName="stroke-dashoffset" values="40;0" dur="0.6s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.3s" dur="0.3s" fill="freeze"/>`
);

const PhoneIcon = createAnimatedIcon(
  '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  `<animateTransform attributeName="transform" type="rotate" values="0 12 12;10 12 12;-10 12 12;0 12 12" dur="0.5s"/>
   <animate attributeName="fill" values="none;currentColor;none" dur="0.5s"/>`
);

// File & Data Icons
const FileTextIcon = createAnimatedIcon(
  `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
   <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
   <path d="M10 9h6"/>
   <path d="M10 13h6"/>
   <path d="M10 17h6"/>`,
  `<animate attributeName="stroke-dashoffset" values="60;0" dur="0.8s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.2s" dur="0.3s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.4s" dur="0.3s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.6s" dur="0.3s" fill="freeze"/>`
);

const FolderIcon = createAnimatedIcon(
  '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  `<animate attributeName="stroke-dashoffset" values="40;0" dur="0.6s" fill="freeze"/>
   <animate attributeName="fill" values="none;currentColor;none" begin="0.6s" dur="0.4s"/>`
);

const DatabaseIcon = createAnimatedIcon(
  `<ellipse cx="12" cy="5" rx="9" ry="3"/>
   <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
   <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>`,
  `<animate attributeName="stroke-dashoffset" values="60;0" dur="1s" fill="freeze"/>
   <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>`
);

// User & Profile Icons
const UserIcon = createAnimatedIcon(
  `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
   <circle cx="12" cy="7" r="4"/>`,
  `<animate attributeName="stroke-dashoffset" values="30;0" dur="0.5s" fill="freeze"/>
   <animate attributeName="r" values="0;4" begin="0.3s" dur="0.3s" fill="freeze"/>`
);

const UsersIcon = createAnimatedIcon(
  `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
   <circle cx="9" cy="7" r="4"/>
   <path d="m22 21-3.5-3.5"/>
   <circle cx="16" cy="11" r="3"/>`,
  `<animate attributeName="stroke-dashoffset" values="50;0" dur="0.8s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.4s" dur="0.4s" fill="freeze"/>`
);

const UserCheckIcon = createAnimatedIcon(
  `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
   <circle cx="9" cy="7" r="4"/>
   <path d="m16 11 2 2 4-4" stroke-dasharray="8" stroke-dashoffset="8"/>`,
  `<animate attributeName="stroke-dashoffset" values="30;0" dur="0.5s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="8;0" begin="0.5s" dur="0.3s" fill="freeze"/>`
);

// Lock & Security Icons
const LockIcon = createAnimatedIcon(
  `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
   <path d="m7 11V7a5 5 0 0 1 10 0v4"/>`,
  `<animate attributeName="stroke-dashoffset" values="40;0" dur="0.6s" fill="freeze"/>
   <animate attributeName="fill" values="none;currentColor;none" begin="0.6s" dur="0.4s"/>`
);

const UnlockIcon = createAnimatedIcon(
  `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
   <path d="m7 11V7a5 5 0 0 1 9.9-1"/>`,
  `<animate attributeName="stroke-dashoffset" values="35;0" dur="0.5s" fill="freeze"/>
   <animateTransform attributeName="transform" type="rotate" values="0 12 12;10 12 12;0 12 12" begin="0.5s" dur="0.3s"/>`
);

const KeyIcon = createAnimatedIcon(
  `<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
   <path d="m21 2-9.6 9.6"/>
   <circle cx="7.5" cy="15.5" r="5.5"/>`,
  `<animate attributeName="stroke-dashoffset" values="40;0" dur="0.7s" fill="freeze"/>
   <animateTransform attributeName="transform" type="rotate" values="0 7.5 15.5;360 7.5 15.5" begin="0.7s" dur="1s"/>`
);

// Eye & Visibility Icons
const EyeIcon = createAnimatedIcon(
  `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
   <circle cx="12" cy="12" r="3"/>`,
  `<animate attributeName="stroke-dashoffset" values="50;0" dur="0.6s" fill="freeze"/>
   <animate attributeName="r" values="0;3" begin="0.6s" dur="0.3s" fill="freeze"/>`
);

const EyeOffIcon = createAnimatedIcon(
  `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
   <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
   <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
   <line x1="2" y1="2" x2="22" y2="22"/>`,
  `<animate attributeName="stroke-dashoffset" values="60;0" dur="0.8s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.8s" dur="0.2s" fill="freeze"/>`
);

// Settings & Tools Icons
const SettingsIcon = createAnimatedIcon(
  `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
   <circle cx="12" cy="12" r="3"/>`,
  `<animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="3s" repeatCount="indefinite"/>
   <animate attributeName="stroke-dashoffset" values="80;0" dur="1s" fill="freeze"/>`
);

const CogIcon = createAnimatedIcon(
  `<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
   <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
   <path d="M12 2v2"/>
   <path d="M12 20v2"/>
   <path d="m4.93 4.93 1.41 1.41"/>
   <path d="m17.66 17.66 1.41 1.41"/>
   <path d="M2 12h2"/>
   <path d="M20 12h2"/>
   <path d="m6.34 17.66-1.41 1.41"/>
   <path d="m19.07 4.93-1.41 1.41"/>`,
  `<animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="2s" repeatCount="indefinite"/>
   <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite"/>`
);

const WrenchIcon = createAnimatedIcon(
  '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  `<animateTransform attributeName="transform" type="rotate" values="0 12 12;15 12 12;-15 12 12;0 12 12" dur="1s" repeatCount="indefinite"/>
   <animate attributeName="stroke-width" values="2;3;2" dur="1s" repeatCount="indefinite"/>`
);

// Activity & Analytics Icons
const ActivityIcon = createAnimatedIcon(
  '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
  `<animate attributeName="stroke-dashoffset" values="60;0" dur="0.8s" fill="freeze"/>
   <animate attributeName="stroke-width" values="2;3;2" dur="1s" repeatCount="indefinite"/>`
);

const TrendingUpIcon = createAnimatedIcon(
  `<polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
   <polyline points="16,7 22,7 22,13"/>`,
  `<animate attributeName="stroke-dashoffset" values="30;0" dur="0.6s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.3s" dur="0.3s" fill="freeze"/>`
);

const BarChart3Icon = createAnimatedIcon(
  `<path d="M3 3v18h18"/>
   <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>`,
  `<animate attributeName="stroke-dashoffset" values="40;0" dur="0.8s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="20;0" begin="0.4s" dur="0.4s" fill="freeze"/>`
);

// Search Icons
const SearchIcon = createAnimatedIcon(
  `<circle cx="11" cy="11" r="8"/>
   <path d="m21 21-4.35-4.35"/>`,
  `<animate attributeName="r" values="0;8" dur="0.4s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="10;0" begin="0.4s" dur="0.3s" fill="freeze"/>`
);

const ZoomInIcon = createAnimatedIcon(
  `<circle cx="11" cy="11" r="8"/>
   <path d="m21 21-4.35-4.35"/>
   <line x1="11" y1="8" x2="11" y2="14"/>
   <line x1="8" y1="11" x2="14" y2="11"/>`,
  `<animate attributeName="r" values="0;8" dur="0.4s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.4s" dur="0.3s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.5s" dur="0.3s" fill="freeze"/>`
);

// Plus & Minus Icons
const PlusIcon = createAnimatedIcon(
  `<path d="M5 12h14"/>
   <path d="M12 5v14"/>`,
  `<animate attributeName="stroke-dashoffset" values="14;0" dur="0.2s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="14;0" begin="0.1s" dur="0.2s" fill="freeze"/>`
);

const MinusIcon = createAnimatedIcon(
  '<path d="M5 12h14" stroke-dasharray="14" stroke-dashoffset="14"/>',
  '<animate attributeName="stroke-dashoffset" values="14;0" dur="0.3s" fill="freeze"/>'
);

const PlusCircleIcon = createAnimatedIcon(
  `<circle cx="12" cy="12" r="10"/>
   <path d="M8 12h8"/>
   <path d="M12 8v8"/>`,
  `<animate attributeName="r" values="0;10" dur="0.3s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.3s" dur="0.2s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.4s" dur="0.2s" fill="freeze"/>`
);

// Trash & Delete Icons
const TrashIcon = createAnimatedIcon(
  `<path d="M3 6h18"/>
   <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
   <path d="M8 6V4c0-1 1-2 2-2h4c0-1 1-2 2-2v2"/>`,
  `<animate attributeName="stroke-dashoffset" values="50;0" dur="0.6s" fill="freeze"/>
   <animateTransform attributeName="transform" type="scale" values="1;0.9;1" dur="0.3s"/>`
);

const DeleteIcon = createAnimatedIcon(
  `<path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/>
   <line x1="18" y1="9" x2="12" y2="15"/>
   <line x1="12" y1="9" x2="18" y2="15"/>`,
  `<animate attributeName="stroke-dashoffset" values="40;0" dur="0.5s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.3s" dur="0.2s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.4s" dur="0.2s" fill="freeze"/>`
);

// Edit Icons
const EditIcon = createAnimatedIcon(
  `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
   <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>`,
  `<animate attributeName="stroke-dashoffset" values="50;0" dur="0.7s" fill="freeze"/>
   <animate attributeName="stroke-dashoffset" values="20;0" begin="0.3s" dur="0.4s" fill="freeze"/>`
);

const PencilIcon = createAnimatedIcon(
  `<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
   <path d="m15 5 4 4"/>`,
  `<animate attributeName="stroke-dashoffset" values="30;0" dur="0.5s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.5s" dur="0.2s" fill="freeze"/>`
);

// Copy & Paste Icons
const CopyIcon = createAnimatedIcon(
  `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
   <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>`,
  `<animate attributeName="stroke-dashoffset" values="40;0" dur="0.6s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.3s" dur="0.3s" fill="freeze"/>`
);

const ClipboardIcon = createAnimatedIcon(
  `<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
   <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>`,
  `<animate attributeName="stroke-dashoffset" values="50;0" dur="0.7s" fill="freeze"/>
   <animate attributeName="opacity" values="0;1" begin="0.2s" dur="0.3s" fill="freeze"/>`
);

// Refresh & Rotate Icons
const RefreshCwIcon = createAnimatedIcon(
  `<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
   <path d="M21 3v5h-5"/>
   <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
   <path d="M8 16H3v5"/>`,
  `<animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1s" repeatCount="indefinite"/>
   <animate attributeName="stroke-dashoffset" values="60;0" dur="0.8s" fill="freeze"/>`
);

const RotateIcon = createAnimatedIcon(
  `<path d="M21 2v6h-6"/>
   <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
   <path d="M3 22v-6h6"/>
   <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>`,
  `<animateTransform attributeName="transform" type="rotate" values="0 12 12;180 12 12;360 12 12" dur="2s" repeatCount="indefinite"/>
   <animate attributeName="stroke-width" values="2;3;2" dur="1s" repeatCount="indefinite"/>`
);

// Exported icons array
export const animatedIcons: IconItem[] = [
  // Loading & Progress
  { id: 'loading-loop', name: 'Loading Loop', svg: LoadingLoopIcon, style: 'animated', category: 'Loading', tags: ['loading', 'spinner', 'progress', 'wait'] },
  { id: 'spinner', name: 'Spinner', svg: SpinnerIcon, style: 'animated', category: 'Loading', tags: ['loading', 'spinner', 'rotate', 'wait'] },
  { id: 'progress', name: 'Progress', svg: ProgressIcon, style: 'animated', category: 'Loading', tags: ['progress', 'loading', 'bar', 'complete'] },
  { id: 'dots-spinner', name: 'Dots Spinner', svg: DotsSpinnerIcon, style: 'animated', category: 'Loading', tags: ['loading', 'dots', 'spinner', 'pulse'] },
  { id: 'pulse', name: 'Pulse', svg: PulseIcon, style: 'animated', category: 'Loading', tags: ['pulse', 'loading', 'heartbeat', 'animation'] },

  // Check & Success
  { id: 'check', name: 'Check', svg: CheckIcon, style: 'animated', category: 'Success', tags: ['check', 'success', 'done', 'complete', 'tick'] },
  { id: 'check-all', name: 'Check All', svg: CheckAllIcon, style: 'animated', category: 'Success', tags: ['check', 'all', 'multiple', 'complete', 'success'] },
  { id: 'check-circle', name: 'Check Circle', svg: CheckCircleIcon, style: 'animated', category: 'Success', tags: ['check', 'circle', 'success', 'done', 'complete'] },
  { id: 'success', name: 'Success', svg: SuccessIcon, style: 'animated', category: 'Success', tags: ['success', 'check', 'done', 'complete', 'approved'] },

  // Menu & Navigation
  { id: 'menu-to-close', name: 'Menu to Close', svg: MenuToCloseIcon, style: 'animated', category: 'Navigation', tags: ['menu', 'close', 'hamburger', 'toggle', 'navigation'] },
  { id: 'menu', name: 'Menu', svg: MenuIcon, style: 'animated', category: 'Navigation', tags: ['menu', 'hamburger', 'navigation', 'bars'] },
  { id: 'hamburger', name: 'Hamburger', svg: HamburgerIcon, style: 'animated', category: 'Navigation', tags: ['hamburger', 'menu', 'navigation', 'bars', 'rotate'] },

  // Arrows
  { id: 'arrow-left', name: 'Arrow Left', svg: ArrowLeftIcon, style: 'animated', category: 'Navigation', tags: ['arrow', 'left', 'back', 'previous', 'navigation'] },
  { id: 'arrow-right', name: 'Arrow Right', svg: ArrowRightIcon, style: 'animated', category: 'Navigation', tags: ['arrow', 'right', 'forward', 'next', 'navigation'] },
  { id: 'arrow-up', name: 'Arrow Up', svg: ArrowUpIcon, style: 'animated', category: 'Navigation', tags: ['arrow', 'up', 'top', 'navigation'] },
  { id: 'arrow-down', name: 'Arrow Down', svg: ArrowDownIcon, style: 'animated', category: 'Navigation', tags: ['arrow', 'down', 'bottom', 'navigation'] },
  { id: 'chevron-left', name: 'Chevron Left', svg: ChevronLeftIcon, style: 'animated', category: 'Navigation', tags: ['chevron', 'left', 'arrow', 'navigation'] },
  { id: 'chevron-right', name: 'Chevron Right', svg: ChevronRightIcon, style: 'animated', category: 'Navigation', tags: ['chevron', 'right', 'arrow', 'navigation'] },
  { id: 'chevron-up', name: 'Chevron Up', svg: ChevronUpIcon, style: 'animated', category: 'Navigation', tags: ['chevron', 'up', 'arrow', 'navigation'] },
  { id: 'chevron-down', name: 'Chevron Down', svg: ChevronDownIcon, style: 'animated', category: 'Navigation', tags: ['chevron', 'down', 'arrow', 'navigation'] },

  // Upload & Download
  { id: 'upload-loop', name: 'Upload Loop', svg: UploadLoopIcon, style: 'animated', category: 'Actions', tags: ['upload', 'cloud', 'transfer', 'file'] },
  { id: 'download', name: 'Download', svg: DownloadIcon, style: 'animated', category: 'Actions', tags: ['download', 'save', 'transfer', 'file'] },
  { id: 'cloud-upload', name: 'Cloud Upload', svg: CloudUploadIcon, style: 'animated', category: 'Actions', tags: ['cloud', 'upload', 'storage', 'transfer'] },

  // Social
  { id: 'heart-twotone', name: 'Heart Twotone', svg: HeartTwotoneIcon, style: 'animated', category: 'Social', tags: ['heart', 'love', 'like', 'favorite', 'social'] },
  { id: 'star', name: 'Star', svg: StarIcon, style: 'animated', category: 'Social', tags: ['star', 'favorite', 'rating', 'bookmark'] },
  { id: 'thumbs-up', name: 'Thumbs Up', svg: ThumbsUpIcon, style: 'animated', category: 'Social', tags: ['thumbs', 'up', 'like', 'approve', 'social'] },

  // Home & Location
  { id: 'home-twotone', name: 'Home Twotone', svg: HomeTwotoneIcon, style: 'animated', category: 'Navigation', tags: ['home', 'house', 'main', 'navigation'] },
  { id: 'map-pin', name: 'Map Pin', svg: MapPinIcon, style: 'animated', category: 'Location', tags: ['map', 'pin', 'location', 'marker', 'place'] },
  { id: 'navigation', name: 'Navigation', svg: NavigationIcon, style: 'animated', category: 'Navigation', tags: ['navigation', 'compass', 'direction', 'location'] },

  // Communication
  { id: 'bell', name: 'Bell', svg: BellIcon, style: 'animated', category: 'Communication', tags: ['bell', 'notification', 'alert', 'message'] },
  { id: 'message-circle', name: 'Message Circle', svg: MessageCircleIcon, style: 'animated', category: 'Communication', tags: ['message', 'chat', 'communication', 'talk'] },
  { id: 'mail', name: 'Mail', svg: MailIcon, style: 'animated', category: 'Communication', tags: ['mail', 'email', 'message', 'communication'] },
  { id: 'phone', name: 'Phone', svg: PhoneIcon, style: 'animated', category: 'Communication', tags: ['phone', 'call', 'communication', 'contact'] },

  // Files & Data
  { id: 'file-text', name: 'File Text', svg: FileTextIcon, style: 'animated', category: 'Files', tags: ['file', 'text', 'document', 'page'] },
  { id: 'folder', name: 'Folder', svg: FolderIcon, style: 'animated', category: 'Files', tags: ['folder', 'directory', 'files', 'organize'] },
  { id: 'database', name: 'Database', svg: DatabaseIcon, style: 'animated', category: 'Files', tags: ['database', 'data', 'storage', 'server'] },

  // User & Profile
  { id: 'user', name: 'User', svg: UserIcon, style: 'animated', category: 'Users', tags: ['user', 'person', 'profile', 'account'] },
  { id: 'users', name: 'Users', svg: UsersIcon, style: 'animated', category: 'Users', tags: ['users', 'people', 'group', 'team'] },
  { id: 'user-check', name: 'User Check', svg: UserCheckIcon, style: 'animated', category: 'Users', tags: ['user', 'check', 'verified', 'approved'] },

  // Lock & Security
  { id: 'lock', name: 'Lock', svg: LockIcon, style: 'animated', category: 'Security', tags: ['lock', 'secure', 'private', 'password'] },
  { id: 'unlock', name: 'Unlock', svg: UnlockIcon, style: 'animated', category: 'Security', tags: ['unlock', 'open', 'access', 'unlocked'] },
  { id: 'key', name: 'Key', svg: KeyIcon, style: 'animated', category: 'Security', tags: ['key', 'access', 'password', 'unlock'] },

  // Eye & Visibility
  { id: 'eye', name: 'Eye', svg: EyeIcon, style: 'animated', category: 'Actions', tags: ['eye', 'view', 'see', 'visible'] },
  { id: 'eye-off', name: 'Eye Off', svg: EyeOffIcon, style: 'animated', category: 'Actions', tags: ['eye', 'off', 'hidden', 'invisible'] },

  // Settings & Tools
  { id: 'settings', name: 'Settings', svg: SettingsIcon, style: 'animated', category: 'Actions', tags: ['settings', 'gear', 'preferences', 'configure'] },
  { id: 'cog', name: 'Cog', svg: CogIcon, style: 'animated', category: 'Actions', tags: ['cog', 'gear', 'settings', 'configure'] },
  { id: 'wrench', name: 'Wrench', svg: WrenchIcon, style: 'animated', category: 'Actions', tags: ['wrench', 'tool', 'fix', 'repair'] },

  // Activity & Analytics
  { id: 'activity', name: 'Activity', svg: ActivityIcon, style: 'animated', category: 'Charts', tags: ['activity', 'analytics', 'pulse', 'heartbeat'] },
  { id: 'trending-up', name: 'Trending Up', svg: TrendingUpIcon, style: 'animated', category: 'Charts', tags: ['trending', 'up', 'chart', 'growth'] },
  { id: 'bar-chart-3', name: 'Bar Chart 3', svg: BarChart3Icon, style: 'animated', category: 'Charts', tags: ['chart', 'bar', 'analytics', 'data'] },

  // Search
  { id: 'search', name: 'Search', svg: SearchIcon, style: 'animated', category: 'Actions', tags: ['search', 'find', 'magnify', 'look'] },
  { id: 'zoom-in', name: 'Zoom In', svg: ZoomInIcon, style: 'animated', category: 'Actions', tags: ['zoom', 'in', 'magnify', 'search'] },

  // Plus & Minus
  { id: 'plus', name: 'Plus', svg: PlusIcon, style: 'animated', category: 'Actions', tags: ['plus', 'add', 'create', 'new'] },
  { id: 'minus', name: 'Minus', svg: MinusIcon, style: 'animated', category: 'Actions', tags: ['minus', 'remove', 'subtract', 'delete'] },
  { id: 'plus-circle', name: 'Plus Circle', svg: PlusCircleIcon, style: 'animated', category: 'Actions', tags: ['plus', 'circle', 'add', 'create'] },

  // Trash & Delete
  { id: 'trash', name: 'Trash', svg: TrashIcon, style: 'animated', category: 'Actions', tags: ['trash', 'delete', 'remove', 'garbage'] },
  { id: 'delete', name: 'Delete', svg: DeleteIcon, style: 'animated', category: 'Actions', tags: ['delete', 'remove', 'clear', 'erase'] },

  // Edit
  { id: 'edit', name: 'Edit', svg: EditIcon, style: 'animated', category: 'Actions', tags: ['edit', 'modify', 'change', 'update'] },
  { id: 'pencil', name: 'Pencil', svg: PencilIcon, style: 'animated', category: 'Actions', tags: ['pencil', 'edit', 'write', 'draw'] },

  // Copy & Paste
  { id: 'copy', name: 'Copy', svg: CopyIcon, style: 'animated', category: 'Actions', tags: ['copy', 'duplicate', 'clone', 'clipboard'] },
  { id: 'clipboard', name: 'Clipboard', svg: ClipboardIcon, style: 'animated', category: 'Actions', tags: ['clipboard', 'copy', 'paste', 'notes'] },

  // Refresh & Rotate
  { id: 'refresh-cw', name: 'Refresh CW', svg: RefreshCwIcon, style: 'animated', category: 'Actions', tags: ['refresh', 'reload', 'rotate', 'update'] },
  { id: 'rotate', name: 'Rotate', svg: RotateIcon, style: 'animated', category: 'Actions', tags: ['rotate', 'spin', 'turn', 'refresh'] }
];