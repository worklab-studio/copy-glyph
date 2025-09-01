import * as HeroIcons from 'react-icons/hi2';
import { type IconItem } from '@/types/icon';

// Get all Heroicons solid (v2) by filtering the exported names
const heroIconNames = Object.keys(HeroIcons).filter(name => name.startsWith('Hi'));

const categoryMap: Record<string, string> = {
  // Navigation
  'HiArrowLeft': 'navigation', 'HiArrowRight': 'navigation', 'HiArrowUp': 'navigation', 'HiArrowDown': 'navigation',
  'HiChevronLeft': 'navigation', 'HiChevronRight': 'navigation', 'HiChevronUp': 'navigation', 'HiChevronDown': 'navigation',
  'HiBars3': 'navigation', 'HiHome': 'navigation', 'HiMagnifyingGlass': 'navigation',
  
  // Communication
  'HiEnvelope': 'communication', 'HiPhone': 'communication', 'HiChatBubbleLeft': 'communication', 'HiChatBubbleLeftRight': 'communication',
  'HiSpeakerWave': 'communication', 'HiMegaphone': 'communication',
  
  // Media
  'HiPlay': 'media', 'HiPause': 'media', 'HiStop': 'media', 'HiForward': 'media', 'HiBackward': 'media',
  'HiSpeakerXMark': 'media', 'HiCamera': 'media', 'HiPhoto': 'media',
  
  // Files & Storage
  'HiDocument': 'files', 'HiFolder': 'files', 'HiCloudArrowDown': 'files', 'HiCloudArrowUp': 'files',
  'HiArchiveBox': 'files', 'HiDocumentText': 'files', 'HiArrowDownTray': 'files', 'HiArrowUpTray': 'files',
  
  // System
  'HiCog6Tooth': 'system', 'HiAdjustmentsHorizontal': 'system', 'HiArrowPath': 'system', 'HiPower': 'system',
  'HiCircleStack': 'system', 'HiServer': 'system', 'HiComputerDesktop': 'system',
  
  // User & People
  'HiUser': 'user', 'HiUserGroup': 'user', 'HiUserPlus': 'user', 'HiUserMinus': 'user',
  'HiIdentification': 'user', 'HiUserCircle': 'user',
  
  // Security
  'HiLockClosed': 'security', 'HiLockOpen': 'security', 'HiShieldCheck': 'security',
  'HiShieldExclamation': 'security', 'HiKey': 'security',
  
  // Time & Schedule
  'HiClock': 'time', 'HiCalendarDays': 'time',
  
  // Finance
  'HiCreditCard': 'finance', 'HiCurrencyDollar': 'finance', 'HiBanknotes': 'finance', 'HiReceiptPercent': 'finance',
  
  // Social
  'HiHeart': 'social', 'HiStar': 'social', 'HiHandThumbUp': 'social', 'HiHandThumbDown': 'social',
  'HiShare': 'social', 'HiBookmark': 'social',
  
  // Status & Alerts
  'HiExclamationCircle': 'status', 'HiInformationCircle': 'status', 'HiCheckCircle': 'status', 'HiXCircle': 'status',
  'HiExclamationTriangle': 'status', 'HiBell': 'status',
  
  // Actions
  'HiPlus': 'actions', 'HiMinus': 'actions', 'HiXMark': 'actions', 'HiCheck': 'actions',
  'HiPencil': 'actions', 'HiTrash': 'actions', 'HiSquare2Stack': 'actions', 'HiEye': 'actions', 'HiEyeSlash': 'actions',
  
  // Shopping
  'HiShoppingCart': 'shopping', 'HiShoppingBag': 'shopping', 'HiGift': 'shopping'
};

export const heroiconsSolid: IconItem[] = heroIconNames.map(name => {
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
    ...(name.includes('Envelope') || name.includes('Chat') ? ['communication', 'mail'] : []),
    ...(name.includes('Document') || name.includes('Folder') ? ['files', 'storage'] : []),
    ...(name.includes('Play') || name.includes('Pause') || name.includes('Musical') ? ['media', 'audio'] : []),
    ...(name.includes('Heart') || name.includes('Star') ? ['favorites', 'social'] : []),
    ...(name.includes('Lock') || name.includes('Shield') ? ['security', 'privacy'] : []),
    ...(name.includes('Calendar') || name.includes('Clock') ? ['time', 'schedule'] : []),
  ];

  return {
    id: `heroicons-solid-${name.toLowerCase()}`,
    name: displayName,
    svg: IconComponent,
    tags: [...new Set(tags)],
    style: 'solid' as const,
    category
  };
});