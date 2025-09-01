import * as HeroIcons from 'react-icons/hi';
import { type IconItem } from '@/types/icon';

// Get all Heroicons outline (v1) by filtering the exported names
const heroIconNames = Object.keys(HeroIcons).filter(name => name.startsWith('Hi'));

const categoryMap: Record<string, string> = {
  // Navigation
  'HiArrowLeft': 'navigation', 'HiArrowRight': 'navigation', 'HiArrowUp': 'navigation', 'HiArrowDown': 'navigation',
  'HiChevronLeft': 'navigation', 'HiChevronRight': 'navigation', 'HiChevronUp': 'navigation', 'HiChevronDown': 'navigation',
  'HiMenu': 'navigation', 'HiHome': 'navigation', 'HiSearch': 'navigation',
  
  // Communication
  'HiMail': 'communication', 'HiPhone': 'communication', 'HiChat': 'communication', 'HiChatAlt': 'communication',
  'HiSpeakerphone': 'communication', 'HiAnnotation': 'communication',
  
  // Media
  'HiPlay': 'media', 'HiPause': 'media', 'HiStop': 'media', 'HiFastForward': 'media', 'HiRewind': 'media',
  'HiVolumeUp': 'media', 'HiVolumeOff': 'media', 'HiCamera': 'media', 'HiPhotograph': 'media',
  
  // Files & Storage
  'HiDocument': 'files', 'HiFolder': 'files', 'HiCloudDownload': 'files', 'HiCloudUpload': 'files',
  'HiArchive': 'files', 'HiDocumentText': 'files', 'HiDownload': 'files', 'HiUpload': 'files',
  
  // System
  'HiCog': 'system', 'HiAdjustments': 'system', 'HiRefresh': 'system', 'HiPower': 'system',
  'HiDatabase': 'system', 'HiServer': 'system', 'HiDesktopComputer': 'system',
  
  // User & People
  'HiUser': 'user', 'HiUserGroup': 'user', 'HiUserAdd': 'user', 'HiUserRemove': 'user',
  'HiIdentification': 'user', 'HiUserCircle': 'user',
  
  // Security
  'HiLock': 'security', 'HiLockClosed': 'security', 'HiLockOpen': 'security', 'HiShield': 'security',
  'HiShieldCheck': 'security', 'HiShieldExclamation': 'security', 'HiKey': 'security',
  
  // Time & Schedule
  'HiClock': 'time', 'HiCalendar': 'time', 'HiTimer': 'time',
  
  // Finance
  'HiCreditCard': 'finance', 'HiCurrencyDollar': 'finance', 'HiCash': 'finance', 'HiReceiptTax': 'finance',
  
  // Social
  'HiHeart': 'social', 'HiStar': 'social', 'HiThumbUp': 'social', 'HiThumbDown': 'social',
  'HiShare': 'social', 'HiBookmark': 'social',
  
  // Status & Alerts
  'HiExclamation': 'status', 'HiInformationCircle': 'status', 'HiCheckCircle': 'status', 'HiXCircle': 'status',
  'HiExclamationTriangle': 'status', 'HiBell': 'status',
  
  // Actions
  'HiPlus': 'actions', 'HiMinus': 'actions', 'HiX': 'actions', 'HiCheck': 'actions',
  'HiPencil': 'actions', 'HiTrash': 'actions', 'HiDuplicate': 'actions', 'HiEye': 'actions', 'HiEyeOff': 'actions',
  
  // Shopping
  'HiShoppingCart': 'shopping', 'HiShoppingBag': 'shopping', 'HiGift': 'shopping'
};

export const heroiconsOutline: IconItem[] = heroIconNames.map(name => {
  const IconComponent = HeroIcons[name as keyof typeof HeroIcons];
  const displayName = name.slice(2); // Remove 'Hi' prefix
  const category = categoryMap[name] || 'other';
  
  // Add tags based on icon name patterns and category
  const tags = [
    displayName.toLowerCase(),
    name.toLowerCase(),
    category,
    // Add specific pattern-based tags
    ...(name.includes('Arrow') || name.includes('Chevron') ? ['arrow', 'navigation'] : []),
    ...(name.includes('Exclamation') || name.includes('Warning') ? ['alert', 'warning'] : []),
    ...(name.includes('Cog') || name.includes('Wrench') ? ['settings', 'tools'] : []),
    ...(name.includes('User') || name.includes('Person') ? ['user', 'people'] : []),
    ...(name.includes('Mail') || name.includes('Chat') ? ['communication', 'mail'] : []),
    ...(name.includes('Document') || name.includes('Folder') ? ['files', 'storage'] : []),
    ...(name.includes('Play') || name.includes('Pause') || name.includes('Musical') ? ['media', 'audio'] : []),
    ...(name.includes('Heart') || name.includes('Star') ? ['favorites', 'social'] : []),
    ...(name.includes('Lock') || name.includes('Shield') ? ['security', 'privacy'] : []),
    ...(name.includes('Calendar') || name.includes('Clock') ? ['time', 'schedule'] : []),
  ];

  return {
    id: `heroicons-outline-${name.toLowerCase()}`,
    name: displayName,
    svg: IconComponent,
    tags: [...new Set(tags)],
    style: 'outline' as const,
    category
  };
});