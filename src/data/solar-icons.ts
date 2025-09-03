import { type IconItem } from "@/types/icon";
import React from "react";

// Complete Solar Icons library using @solar-icons/react package
// This provides access to all Solar icons with proper React component integration

// Helper function to create dynamic icon component
const createSolarIcon = (iconName: string): React.ComponentType<any> => {
  return React.lazy(() => 
    import('@solar-icons/react').then(module => {
      // Try different variations of the icon name
      const icon = module[iconName] || 
                   module[`${iconName}Linear`] || 
                   module[`${iconName}Outline`] || 
                   module[`${iconName}Bold`] || 
                   module[`${iconName}Broken`] ||
                   module[`${iconName}BoldDuotone`];
      
      return { default: icon || (() => null) };
    }).catch(() => ({ default: () => null }))
  );
};

// Comprehensive list of Solar icon names with their variations
const solarIconNames = [
  // General & Actions
  'Home', 'HomeBold', 'HomeOutline', 'HomeLinear', 'HomeBroken',
  'Settings', 'SettingsBold', 'SettingsOutline', 'SettingsLinear', 'SettingsBroken',
  'Search', 'SearchBold', 'SearchOutline', 'SearchLinear', 'SearchBroken',
  'Menu', 'MenuBold', 'MenuOutline', 'MenuLinear', 'MenuBroken',
  'Close', 'CloseBold', 'CloseOutline', 'CloseLinear', 'CloseBroken',
  'Add', 'AddBold', 'AddOutline', 'AddLinear', 'AddBroken',
  'Remove', 'RemoveBold', 'RemoveOutline', 'RemoveLinear', 'RemoveBroken',
  'Edit', 'EditBold', 'EditOutline', 'EditLinear', 'EditBroken',
  'Delete', 'DeleteBold', 'DeleteOutline', 'DeleteLinear', 'DeleteBroken',
  'Check', 'CheckBold', 'CheckOutline', 'CheckLinear', 'CheckBroken',
  'Cross', 'CrossBold', 'CrossOutline', 'CrossLinear', 'CrossBroken',
  'Copy', 'CopyBold', 'CopyOutline', 'CopyLinear', 'CopyBroken',
  'Share', 'ShareBold', 'ShareOutline', 'ShareLinear', 'ShareBroken',
  'Link', 'LinkBold', 'LinkOutline', 'LinkLinear', 'LinkBroken',
  
  // Navigation & Arrows
  'ArrowUp', 'ArrowUpBold', 'ArrowUpOutline', 'ArrowUpLinear', 'ArrowUpBroken',
  'ArrowDown', 'ArrowDownBold', 'ArrowDownOutline', 'ArrowDownLinear', 'ArrowDownBroken',
  'ArrowLeft', 'ArrowLeftBold', 'ArrowLeftOutline', 'ArrowLeftLinear', 'ArrowLeftBroken',
  'ArrowRight', 'ArrowRightBold', 'ArrowRightOutline', 'ArrowRightLinear', 'ArrowRightBroken',
  'Navigation', 'NavigationBold', 'NavigationOutline', 'NavigationLinear', 'NavigationBroken',
  'Compass', 'CompassBold', 'CompassOutline', 'CompassLinear', 'CompassBroken',
  'Map', 'MapBold', 'MapOutline', 'MapLinear', 'MapBroken',
  'Location', 'LocationBold', 'LocationOutline', 'LocationLinear', 'LocationBroken',
  'Target', 'TargetBold', 'TargetOutline', 'TargetLinear', 'TargetBroken',
  'Flag', 'FlagBold', 'FlagOutline', 'FlagLinear', 'FlagBroken',
  
  // Users & People
  'User', 'UserBold', 'UserOutline', 'UserLinear', 'UserBroken',
  'Users', 'UsersBold', 'UsersOutline', 'UsersLinear', 'UsersBroken',
  'Profile', 'ProfileBold', 'ProfileOutline', 'ProfileLinear', 'ProfileBroken',
  'Account', 'AccountBold', 'AccountOutline', 'AccountLinear', 'AccountBroken',
  'Avatar', 'AvatarBold', 'AvatarOutline', 'AvatarLinear', 'AvatarBroken',
  'Crown', 'CrownBold', 'CrownOutline', 'CrownLinear', 'CrownBroken',
  
  // Communication
  'Mail', 'MailBold', 'MailOutline', 'MailLinear', 'MailBroken',
  'Message', 'MessageBold', 'MessageOutline', 'MessageLinear', 'MessageBroken',
  'Chat', 'ChatBold', 'ChatOutline', 'ChatLinear', 'ChatBroken',
  'Phone', 'PhoneBold', 'PhoneOutline', 'PhoneLinear', 'PhoneBroken',
  'Call', 'CallBold', 'CallOutline', 'CallLinear', 'CallBroken',
  'Bell', 'BellBold', 'BellOutline', 'BellLinear', 'BellBroken',
  'Notification', 'NotificationBold', 'NotificationOutline', 'NotificationLinear', 'NotificationBroken',
  
  // Media & Entertainment
  'Play', 'PlayBold', 'PlayOutline', 'PlayLinear', 'PlayBroken',
  'Pause', 'PauseBold', 'PauseOutline', 'PauseLinear', 'PauseBroken',
  'Stop', 'StopBold', 'StopOutline', 'StopLinear', 'StopBroken',
  'Music', 'MusicBold', 'MusicOutline', 'MusicLinear', 'MusicBroken',
  'Video', 'VideoBold', 'VideoOutline', 'VideoLinear', 'VideoBroken',
  'Camera', 'CameraBold', 'CameraOutline', 'CameraLinear', 'CameraBroken',
  'Gallery', 'GalleryBold', 'GalleryOutline', 'GalleryLinear', 'GalleryBroken',
  'Volume', 'VolumeBold', 'VolumeOutline', 'VolumeLinear', 'VolumeBroken',
  'Speaker', 'SpeakerBold', 'SpeakerOutline', 'SpeakerLinear', 'SpeakerBroken',
  'Microphone', 'MicrophoneBold', 'MicrophoneOutline', 'MicrophoneLinear', 'MicrophoneBroken',
  
  // Files & Documents
  'File', 'FileBold', 'FileOutline', 'FileLinear', 'FileBroken',
  'Folder', 'FolderBold', 'FolderOutline', 'FolderLinear', 'FolderBroken',
  'Document', 'DocumentBold', 'DocumentOutline', 'DocumentLinear', 'DocumentBroken',
  'Download', 'DownloadBold', 'DownloadOutline', 'DownloadLinear', 'DownloadBroken',
  'Upload', 'UploadBold', 'UploadOutline', 'UploadLinear', 'UploadBroken',
  'Save', 'SaveBold', 'SaveOutline', 'SaveLinear', 'SaveBroken',
  'Archive', 'ArchiveBold', 'ArchiveOutline', 'ArchiveLinear', 'ArchiveBroken',
  
  // System & Settings
  'Gear', 'GearBold', 'GearOutline', 'GearLinear', 'GearBroken',
  'Tool', 'ToolBold', 'ToolOutline', 'ToolLinear', 'ToolBroken',
  'Wrench', 'WrenchBold', 'WrenchOutline', 'WrenchLinear', 'WrenchBroken',
  'Refresh', 'RefreshBold', 'RefreshOutline', 'RefreshLinear', 'RefreshBroken',
  'Sync', 'SyncBold', 'SyncOutline', 'SyncLinear', 'SyncBroken',
  'Power', 'PowerBold', 'PowerOutline', 'PowerLinear', 'PowerBroken',
  'Battery', 'BatteryBold', 'BatteryOutline', 'BatteryLinear', 'BatteryBroken',
  'Wifi', 'WifiBold', 'WifiOutline', 'WifiLinear', 'WifiBroken',
  'Signal', 'SignalBold', 'SignalOutline', 'SignalLinear', 'SignalBroken',
  
  // Security & Privacy
  'Shield', 'ShieldBold', 'ShieldOutline', 'ShieldLinear', 'ShieldBroken',
  'Lock', 'LockBold', 'LockOutline', 'LockLinear', 'LockBroken',
  'Unlock', 'UnlockBold', 'UnlockOutline', 'UnlockLinear', 'UnlockBroken',
  'Key', 'KeyBold', 'KeyOutline', 'KeyLinear', 'KeyBroken',
  'Eye', 'EyeBold', 'EyeOutline', 'EyeLinear', 'EyeBroken',
  'EyeClosed', 'EyeClosedBold', 'EyeClosedOutline', 'EyeClosedLinear', 'EyeClosedBroken',
  'Fingerprint', 'FingerprintBold', 'FingerprintOutline', 'FingerprintLinear', 'FingerprintBroken',
  
  // Time & Calendar
  'Calendar', 'CalendarBold', 'CalendarOutline', 'CalendarLinear', 'CalendarBroken',
  'Clock', 'ClockBold', 'ClockOutline', 'ClockLinear', 'ClockBroken',
  'Time', 'TimeBold', 'TimeOutline', 'TimeLinear', 'TimeBroken',
  'Alarm', 'AlarmBold', 'AlarmOutline', 'AlarmLinear', 'AlarmBroken',
  'Timer', 'TimerBold', 'TimerOutline', 'TimerLinear', 'TimerBroken',
  'Stopwatch', 'StopwatchBold', 'StopwatchOutline', 'StopwatchLinear', 'StopwatchBroken',
  
  // Weather & Nature
  'Sun', 'SunBold', 'SunOutline', 'SunLinear', 'SunBroken',
  'Moon', 'MoonBold', 'MoonOutline', 'MoonLinear', 'MoonBroken',
  'Cloud', 'CloudBold', 'CloudOutline', 'CloudLinear', 'CloudBroken',
  'Rain', 'RainBold', 'RainOutline', 'RainLinear', 'RainBroken',
  'Snow', 'SnowBold', 'SnowOutline', 'SnowLinear', 'SnowBroken',
  'Lightning', 'LightningBold', 'LightningOutline', 'LightningLinear', 'LightningBroken',
  'Wind', 'WindBold', 'WindOutline', 'WindLinear', 'WindBroken',
  'Temperature', 'TemperatureBold', 'TemperatureOutline', 'TemperatureLinear', 'TemperatureBroken',
  
  // Commerce & Shopping
  'Shop', 'ShopBold', 'ShopOutline', 'ShopLinear', 'ShopBroken',
  'Cart', 'CartBold', 'CartOutline', 'CartLinear', 'CartBroken',
  'Bag', 'BagBold', 'BagOutline', 'BagLinear', 'BagBroken',
  'Money', 'MoneyBold', 'MoneyOutline', 'MoneyLinear', 'MoneyBroken',
  'CreditCard', 'CreditCardBold', 'CreditCardOutline', 'CreditCardLinear', 'CreditCardBroken',
  'Payment', 'PaymentBold', 'PaymentOutline', 'PaymentLinear', 'PaymentBroken',
  'Wallet', 'WalletBold', 'WalletOutline', 'WalletLinear', 'WalletBroken',
  'Tag', 'TagBold', 'TagOutline', 'TagLinear', 'TagBroken',
  
  // Technology & Devices
  'Computer', 'ComputerBold', 'ComputerOutline', 'ComputerLinear', 'ComputerBroken',
  'Laptop', 'LaptopBold', 'LaptopOutline', 'LaptopLinear', 'LaptopBroken',
  'Mobile', 'MobileBold', 'MobileOutline', 'MobileLinear', 'MobileBroken',
  'Tablet', 'TabletBold', 'TabletOutline', 'TabletLinear', 'TabletBroken',
  'Monitor', 'MonitorBold', 'MonitorOutline', 'MonitorLinear', 'MonitorBroken',
  'Keyboard', 'KeyboardBold', 'KeyboardOutline', 'KeyboardLinear', 'KeyboardBroken',
  'Mouse', 'MouseBold', 'MouseOutline', 'MouseLinear', 'MouseBroken',
  'Headphones', 'HeadphonesBold', 'HeadphonesOutline', 'HeadphonesLinear', 'HeadphonesBroken',
  
  // Buildings & Architecture
  'Building', 'BuildingBold', 'BuildingOutline', 'BuildingLinear', 'BuildingBroken',
  'House', 'HouseBold', 'HouseOutline', 'HouseLinear', 'HouseBroken',
  'Office', 'OfficeBold', 'OfficeOutline', 'OfficeLinear', 'OfficeBroken',
  'Store', 'StoreBold', 'StoreOutline', 'StoreLinear', 'StoreBroken',
  'Hospital', 'HospitalBold', 'HospitalOutline', 'HospitalLinear', 'HospitalBroken',
  'School', 'SchoolBold', 'SchoolOutline', 'SchoolLinear', 'SchoolBroken',
  'Bank', 'BankBold', 'BankOutline', 'BankLinear', 'BankBroken',
  
  // Social & Interaction
  'Heart', 'HeartBold', 'HeartOutline', 'HeartLinear', 'HeartBroken',
  'Star', 'StarBold', 'StarOutline', 'StarLinear', 'StarBroken',
  'Like', 'LikeBold', 'LikeOutline', 'LikeLinear', 'LikeBroken',
  'Dislike', 'DislikeBold', 'DislikeOutline', 'DislikeLinear', 'DislikeBroken',
  'Smile', 'SmileBold', 'SmileOutline', 'SmileLinear', 'SmileBroken',
  'Emoji', 'EmojiBold', 'EmojiOutline', 'EmojiLinear', 'EmojiBroken',
  'Gift', 'GiftBold', 'GiftOutline', 'GiftLinear', 'GiftBroken',
  
  // Transportation
  'Car', 'CarBold', 'CarOutline', 'CarLinear', 'CarBroken',
  'Bus', 'BusBold', 'BusOutline', 'BusLinear', 'BusBroken',
  'Train', 'TrainBold', 'TrainOutline', 'TrainLinear', 'TrainBroken',
  'Plane', 'PlaneBold', 'PlaneOutline', 'PlaneLinear', 'PlaneBroken',
  'Ship', 'ShipBold', 'ShipOutline', 'ShipLinear', 'ShipBroken',
  'Bicycle', 'BicycleBold', 'BicycleOutline', 'BicycleLinear', 'BicycleBroken',
  
  // Health & Medical
  'Health', 'HealthBold', 'HealthOutline', 'HealthLinear', 'HealthBroken',
  'Medical', 'MedicalBold', 'MedicalOutline', 'MedicalLinear', 'MedicalBroken',
  'Pills', 'PillsBold', 'PillsOutline', 'PillsLinear', 'PillsBroken',
  'Stethoscope', 'StethoscopeBold', 'StethoscopeOutline', 'StethoscopeLinear', 'StethoscopeBroken',
  
  // Sports & Recreation
  'Sport', 'SportBold', 'SportOutline', 'SportLinear', 'SportBroken',
  'Football', 'FootballBold', 'FootballOutline', 'FootballLinear', 'FootballBroken',
  'Basketball', 'BasketballBold', 'BasketballOutline', 'BasketballLinear', 'BasketballBroken',
  'Tennis', 'TennisBold', 'TennisOutline', 'TennisLinear', 'TennisBroken',
  
  // Education & Books
  'Book', 'BookBold', 'BookOutline', 'BookLinear', 'BookBroken',
  'Education', 'EducationBold', 'EducationOutline', 'EducationLinear', 'EducationBroken',
  'Graduate', 'GraduateBold', 'GraduateOutline', 'GraduateLinear', 'GraduateBroken',
  'Pen', 'PenBold', 'PenOutline', 'PenLinear', 'PenBroken',
  'Pencil', 'PencilBold', 'PencilOutline', 'PencilLinear', 'PencilBroken',
];

// Function to determine category from icon name
function getCategoryFromName(name: string): string {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('video') || lowerName.includes('music') || lowerName.includes('play') || 
      lowerName.includes('pause') || lowerName.includes('camera') || lowerName.includes('gallery') ||
      lowerName.includes('volume') || lowerName.includes('speaker') || lowerName.includes('microphone')) {
    return 'Media & Entertainment';
  }
  
  if (lowerName.includes('message') || lowerName.includes('chat') || lowerName.includes('mail') ||
      lowerName.includes('phone') || lowerName.includes('call') || lowerName.includes('bell') ||
      lowerName.includes('notification')) {
    return 'Communication';
  }
  
  if (lowerName.includes('arrow') || lowerName.includes('navigation') || lowerName.includes('compass') ||
      lowerName.includes('map') || lowerName.includes('location') || lowerName.includes('target') ||
      lowerName.includes('flag')) {
    return 'Navigation & Arrows';
  }
  
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('document') ||
      lowerName.includes('download') || lowerName.includes('upload') || lowerName.includes('save') ||
      lowerName.includes('archive')) {
    return 'Files & Documents';
  }
  
  if (lowerName.includes('user') || lowerName.includes('profile') || lowerName.includes('account') ||
      lowerName.includes('avatar') || lowerName.includes('crown')) {
    return 'Users & People';
  }
  
  if (lowerName.includes('home') || lowerName.includes('building') || lowerName.includes('house') ||
      lowerName.includes('office') || lowerName.includes('store') || lowerName.includes('hospital') ||
      lowerName.includes('school') || lowerName.includes('bank')) {
    return 'Buildings & Architecture';
  }
  
  if (lowerName.includes('settings') || lowerName.includes('gear') || lowerName.includes('tool') ||
      lowerName.includes('wrench') || lowerName.includes('refresh') || lowerName.includes('sync') ||
      lowerName.includes('power') || lowerName.includes('battery') || lowerName.includes('wifi') ||
      lowerName.includes('signal')) {
    return 'System & Settings';
  }
  
  if (lowerName.includes('weather') || lowerName.includes('sun') || lowerName.includes('moon') ||
      lowerName.includes('cloud') || lowerName.includes('rain') || lowerName.includes('snow') ||
      lowerName.includes('lightning') || lowerName.includes('wind') || lowerName.includes('temperature')) {
    return 'Weather & Nature';
  }
  
  if (lowerName.includes('shop') || lowerName.includes('cart') || lowerName.includes('bag') ||
      lowerName.includes('money') || lowerName.includes('credit') || lowerName.includes('payment') ||
      lowerName.includes('wallet') || lowerName.includes('tag')) {
    return 'Commerce & Shopping';
  }
  
  if (lowerName.includes('shield') || lowerName.includes('lock') || lowerName.includes('unlock') ||
      lowerName.includes('key') || lowerName.includes('eye') || lowerName.includes('fingerprint')) {
    return 'Security & Privacy';
  }
  
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('time') ||
      lowerName.includes('alarm') || lowerName.includes('timer') || lowerName.includes('stopwatch')) {
    return 'Time & Calendar';
  }
  
  if (lowerName.includes('computer') || lowerName.includes('laptop') || lowerName.includes('mobile') ||
      lowerName.includes('tablet') || lowerName.includes('monitor') || lowerName.includes('keyboard') ||
      lowerName.includes('mouse') || lowerName.includes('headphones')) {
    return 'Technology & Devices';
  }
  
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('like') ||
      lowerName.includes('smile') || lowerName.includes('emoji') || lowerName.includes('gift')) {
    return 'Social & Interaction';
  }
  
  if (lowerName.includes('car') || lowerName.includes('bus') || lowerName.includes('train') ||
      lowerName.includes('plane') || lowerName.includes('ship') || lowerName.includes('bicycle')) {
    return 'Transportation';
  }
  
  if (lowerName.includes('health') || lowerName.includes('medical') || lowerName.includes('pills') ||
      lowerName.includes('stethoscope')) {
    return 'Health & Medical';
  }
  
  if (lowerName.includes('sport') || lowerName.includes('football') || lowerName.includes('basketball') ||
      lowerName.includes('tennis')) {
    return 'Sports & Recreation';
  }
  
  if (lowerName.includes('book') || lowerName.includes('education') || lowerName.includes('graduate') ||
      lowerName.includes('pen') || lowerName.includes('pencil')) {
    return 'Education & Books';
  }
  
  return 'General';
}

// Function to determine style from icon name
function getStyleFromName(name: string): string {
  if (name.includes('BoldDuotone')) return 'BoldDuotone';
  if (name.includes('Bold')) return 'Bold';
  if (name.includes('Broken')) return 'Broken';
  if (name.includes('Outline')) return 'Outline';
  if (name.includes('Linear')) return 'Linear';
  return 'Linear'; // Default style
}

// Function to clean icon name for display
function cleanIconName(name: string): string {
  return name
    .replace(/(Bold|Linear|Outline|Broken|Duotone)/g, '') // Remove style suffixes
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add spaces between camelCase
    .replace(/\s+/g, ' ') // Normalize spaces  
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate the complete Solar icons array
export const solarIcons: IconItem[] = solarIconNames.map(iconName => {
  const cleanName = cleanIconName(iconName);
  const category = getCategoryFromName(iconName);
  const style = getStyleFromName(iconName);
  
  return {
    id: `solar-${iconName.toLowerCase()}`,
    name: cleanName,
    svg: createSolarIcon(iconName),
    style: style,
    category: category,
    tags: [cleanName.toLowerCase(), style.toLowerCase(), category.toLowerCase(), 'solar']
  };
});

export default solarIcons;