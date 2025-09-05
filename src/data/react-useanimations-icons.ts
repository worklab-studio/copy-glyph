import React from 'react';
import { type IconItem } from '@/types/icon';

// Import react-useanimations icons - Note: some imports may not exist, will handle gracefully
let UseAnimationsActivity: any;
let UseAnimationsArchive: any;
let UseAnimationsArrowDown: any;
let UseAnimationsArrowLeft: any;
let UseAnimationsArrowRight: any;
let UseAnimationsArrowUp: any;
let UseAnimationsBookmark: any;
let UseAnimationsCalendar: any;
let UseAnimationsCheckBox: any;
let UseAnimationsClose: any;
let UseAnimationsDownload: any;
let UseAnimationsEdit: any;
let UseAnimationsGithub: any;
let UseAnimationsHeart: any;
let UseAnimationsHome: any;
let UseAnimationsInfinity: any;
let UseAnimationsLoading: any;
let UseAnimationsLock: any;
let UseAnimationsMail: any;
let UseAnimationsMenu: any;
let UseAnimationsMinus: any;
let UseAnimationsNotification: any;
let UseAnimationsPlus: any;
let UseAnimationsSearch: any;
let UseAnimationsSettings: any;
let UseAnimationsUpload: any;
let UseAnimationsUser: any;
let UseAnimationsEye: any;
let UseAnimationsPlayPause: any;
let UseAnimationsRadioButton: any;
let UseAnimationsScrollDown: any;
let UseAnimationsShoppingCart: any;
let UseAnimationsSkipBack: any;
let UseAnimationsSkipForward: any;
let UseAnimationsToggle: any;
let UseAnimationsTrash: any;
let UseAnimationsVolume: any;
let UseAnimationsWifi: any;

try {
  UseAnimationsActivity = require('react-useanimations/lib/activity').default;
  UseAnimationsArchive = require('react-useanimations/lib/archive2').default;
  UseAnimationsArrowDown = require('react-useanimations/lib/arrowDown').default;
  UseAnimationsArrowLeft = require('react-useanimations/lib/arrowLeft').default;
  UseAnimationsArrowRight = require('react-useanimations/lib/arrowRight').default;
  UseAnimationsArrowUp = require('react-useanimations/lib/arrowUp').default;
  UseAnimationsBookmark = require('react-useanimations/lib/bookmark').default;
  UseAnimationsCalendar = require('react-useanimations/lib/calendar').default;
  UseAnimationsCheckBox = require('react-useanimations/lib/checkBox').default;
  UseAnimationsClose = require('react-useanimations/lib/close').default;
  UseAnimationsDownload = require('react-useanimations/lib/download').default;
  UseAnimationsEdit = require('react-useanimations/lib/edit').default;
  UseAnimationsGithub = require('react-useanimations/lib/github').default;
  UseAnimationsHeart = require('react-useanimations/lib/heart').default;
  UseAnimationsHome = require('react-useanimations/lib/home').default;
  UseAnimationsInfinity = require('react-useanimations/lib/infinity').default;
  UseAnimationsLoading = require('react-useanimations/lib/loading2').default;
  UseAnimationsLock = require('react-useanimations/lib/lock').default;
  UseAnimationsMail = require('react-useanimations/lib/mail').default;
  UseAnimationsMenu = require('react-useanimations/lib/menu3').default;
  UseAnimationsMinus = require('react-useanimations/lib/minus').default;
  UseAnimationsNotification = require('react-useanimations/lib/notification').default;
  UseAnimationsPlus = require('react-useanimations/lib/plus').default;
  UseAnimationsSearch = require('react-useanimations/lib/searchToX').default;
  UseAnimationsSettings = require('react-useanimations/lib/settings3').default;
  UseAnimationsUpload = require('react-useanimations/lib/upload').default;
  UseAnimationsUser = require('react-useanimations/lib/user').default;
  UseAnimationsEye = require('react-useanimations/lib/visibility').default;
  UseAnimationsPlayPause = require('react-useanimations/lib/playPause').default;
  UseAnimationsRadioButton = require('react-useanimations/lib/radioButton').default;
  UseAnimationsScrollDown = require('react-useanimations/lib/scrollDown').default;
  UseAnimationsShoppingCart = require('react-useanimations/lib/shoppingCart').default;
  UseAnimationsSkipBack = require('react-useanimations/lib/skipBack').default;
  UseAnimationsSkipForward = require('react-useanimations/lib/skipForward').default;
  UseAnimationsToggle = require('react-useanimations/lib/toggle').default;
  UseAnimationsTrash = require('react-useanimations/lib/trash').default;
  UseAnimationsVolume = require('react-useanimations/lib/volume').default;
  UseAnimationsWifi = require('react-useanimations/lib/wifiSignal').default;
} catch (error) {
  console.warn('Some react-useanimations icons could not be loaded:', error);
}

// Wrapper components to standardize props
const createIconWrapper = (IconComponent: any, iconName: string) => {
  if (!IconComponent) return null;
  
  return React.forwardRef((props: any, ref: any) => {
    const { size = 32, color = 'currentColor', className, ...otherProps } = props;
    return React.createElement(IconComponent, {
      ref,
      size,
      strokeColor: color,
      fillColor: color,
      className,
      ...otherProps
    });
  });
};

export const reactUseAnimationsIcons: IconItem[] = [
  UseAnimationsActivity && {
    id: 'react-useanimations-activity',
    name: 'Activity',
    svg: createIconWrapper(UseAnimationsActivity, 'Activity'),
    style: 'animated',
    category: 'system',
    tags: ['activity', 'stats', 'chart', 'analytics', 'animated']
  },
  UseAnimationsArchive && {
    id: 'react-useanimations-archive',
    name: 'Archive',
    svg: createIconWrapper(UseAnimationsArchive, 'Archive'),
    style: 'animated',
    category: 'system',
    tags: ['archive', 'box', 'storage', 'save', 'animated']
  },
  UseAnimationsArrowDown && {
    id: 'react-useanimations-arrow-down',
    name: 'Arrow Down',
    svg: createIconWrapper(UseAnimationsArrowDown, 'ArrowDown'),
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'down', 'direction', 'navigation', 'animated']
  },
  UseAnimationsArrowLeft && {
    id: 'react-useanimations-arrow-left',
    name: 'Arrow Left',
    svg: createIconWrapper(UseAnimationsArrowLeft, 'ArrowLeft'),
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'left', 'direction', 'navigation', 'back', 'animated']
  },
  UseAnimationsArrowRight && {
    id: 'react-useanimations-arrow-right',
    name: 'Arrow Right',
    svg: createIconWrapper(UseAnimationsArrowRight, 'ArrowRight'),
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'right', 'direction', 'navigation', 'forward', 'animated']
  },
  UseAnimationsArrowUp && {
    id: 'react-useanimations-arrow-up',
    name: 'Arrow Up',
    svg: createIconWrapper(UseAnimationsArrowUp, 'ArrowUp'),
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'up', 'direction', 'navigation', 'animated']
  },
  UseAnimationsBookmark && {
    id: 'react-useanimations-bookmark',
    name: 'Bookmark',
    svg: createIconWrapper(UseAnimationsBookmark, 'Bookmark'),
    style: 'animated',
    category: 'actions',
    tags: ['bookmark', 'save', 'favorite', 'mark', 'animated']
  },
  UseAnimationsCalendar && {
    id: 'react-useanimations-calendar',
    name: 'Calendar',
    svg: createIconWrapper(UseAnimationsCalendar, 'Calendar'),
    style: 'animated',
    category: 'system',
    tags: ['calendar', 'date', 'schedule', 'time', 'animated']
  },
  UseAnimationsCheckBox && {
    id: 'react-useanimations-checkbox',
    name: 'Checkbox',
    svg: createIconWrapper(UseAnimationsCheckBox, 'CheckBox'),
    style: 'animated',
    category: 'forms',
    tags: ['checkbox', 'check', 'tick', 'select', 'form', 'animated']
  },
  UseAnimationsClose && {
    id: 'react-useanimations-close',
    name: 'Close',
    svg: createIconWrapper(UseAnimationsClose, 'Close'),
    style: 'animated',
    category: 'navigation',
    tags: ['close', 'x', 'cancel', 'exit', 'dismiss', 'animated']
  },
  UseAnimationsDownload && {
    id: 'react-useanimations-download',
    name: 'Download',
    svg: createIconWrapper(UseAnimationsDownload, 'Download'),
    style: 'animated',
    category: 'actions',
    tags: ['download', 'save', 'export', 'get', 'animated']
  },
  UseAnimationsEdit && {
    id: 'react-useanimations-edit',
    name: 'Edit',
    svg: createIconWrapper(UseAnimationsEdit, 'Edit'),
    style: 'animated',
    category: 'actions',
    tags: ['edit', 'pencil', 'write', 'modify', 'update', 'animated']
  },
  UseAnimationsGithub && {
    id: 'react-useanimations-github',
    name: 'GitHub',
    svg: createIconWrapper(UseAnimationsGithub, 'GitHub'),
    style: 'animated',
    category: 'social',
    tags: ['github', 'git', 'code', 'repository', 'version control', 'animated']
  },
  UseAnimationsHeart && {
    id: 'react-useanimations-heart',
    name: 'Heart',
    svg: createIconWrapper(UseAnimationsHeart, 'Heart'),
    style: 'animated',
    category: 'actions',
    tags: ['heart', 'like', 'love', 'favorite', 'animated']
  },
  UseAnimationsHome && {
    id: 'react-useanimations-home',
    name: 'Home',
    svg: createIconWrapper(UseAnimationsHome, 'Home'),
    style: 'animated',
    category: 'navigation',
    tags: ['home', 'house', 'dashboard', 'main', 'animated']
  },
  UseAnimationsInfinity && {
    id: 'react-useanimations-infinity',
    name: 'Infinity',
    svg: createIconWrapper(UseAnimationsInfinity, 'Infinity'),
    style: 'animated',
    category: 'system',
    tags: ['infinity', 'loop', 'endless', 'unlimited', 'animated']
  },
  UseAnimationsLoading && {
    id: 'react-useanimations-loading',
    name: 'Loading',
    svg: createIconWrapper(UseAnimationsLoading, 'Loading'),
    style: 'animated',
    category: 'system',
    tags: ['loading', 'spinner', 'progress', 'wait', 'animated']
  },
  UseAnimationsLock && {
    id: 'react-useanimations-lock',
    name: 'Lock',
    svg: createIconWrapper(UseAnimationsLock, 'Lock'),
    style: 'animated',
    category: 'system',
    tags: ['lock', 'security', 'private', 'secure', 'protection', 'animated']
  },
  UseAnimationsMail && {
    id: 'react-useanimations-mail',
    name: 'Mail',
    svg: createIconWrapper(UseAnimationsMail, 'Mail'),
    style: 'animated',
    category: 'communication',
    tags: ['mail', 'email', 'message', 'envelope', 'contact', 'animated']
  },
  UseAnimationsMenu && {
    id: 'react-useanimations-menu',
    name: 'Menu',
    svg: createIconWrapper(UseAnimationsMenu, 'Menu'),
    style: 'animated',
    category: 'navigation',
    tags: ['menu', 'hamburger', 'navigation', 'bars', 'animated']
  },
  UseAnimationsMinus && {
    id: 'react-useanimations-minus',
    name: 'Minus',
    svg: createIconWrapper(UseAnimationsMinus, 'Minus'),
    style: 'animated',
    category: 'actions',
    tags: ['minus', 'subtract', 'remove', 'decrease', 'animated']
  },
  UseAnimationsNotification && {
    id: 'react-useanimations-notification',
    name: 'Notification',
    svg: createIconWrapper(UseAnimationsNotification, 'Notification'),
    style: 'animated',
    category: 'system',
    tags: ['notification', 'bell', 'alert', 'message', 'animated']
  },
  UseAnimationsPlus && {
    id: 'react-useanimations-plus',
    name: 'Plus',
    svg: createIconWrapper(UseAnimationsPlus, 'Plus'),
    style: 'animated',
    category: 'actions',
    tags: ['plus', 'add', 'create', 'new', 'increase', 'animated']
  },
  UseAnimationsSearch && {
    id: 'react-useanimations-search',
    name: 'Search',
    svg: createIconWrapper(UseAnimationsSearch, 'Search'),
    style: 'animated',
    category: 'actions',
    tags: ['search', 'find', 'magnify', 'look', 'animated']
  },
  UseAnimationsSettings && {
    id: 'react-useanimations-settings',
    name: 'Settings',
    svg: createIconWrapper(UseAnimationsSettings, 'Settings'),
    style: 'animated',
    category: 'system',
    tags: ['settings', 'gear', 'config', 'preferences', 'animated']
  },
  UseAnimationsUpload && {
    id: 'react-useanimations-upload',
    name: 'Upload',
    svg: createIconWrapper(UseAnimationsUpload, 'Upload'),
    style: 'animated',
    category: 'actions',
    tags: ['upload', 'import', 'send', 'put', 'animated']
  },
  UseAnimationsUser && {
    id: 'react-useanimations-user',
    name: 'User',
    svg: createIconWrapper(UseAnimationsUser, 'User'),
    style: 'animated',
    category: 'system',
    tags: ['user', 'person', 'profile', 'account', 'animated']
  },
  UseAnimationsEye && {
    id: 'react-useanimations-eye',
    name: 'Eye',
    svg: createIconWrapper(UseAnimationsEye, 'Eye'),
    style: 'animated',
    category: 'actions',
    tags: ['eye', 'view', 'see', 'visibility', 'show', 'animated']
  },
  UseAnimationsPlayPause && {
    id: 'react-useanimations-play-pause',
    name: 'Play Pause',
    svg: createIconWrapper(UseAnimationsPlayPause, 'PlayPause'),
    style: 'animated',
    category: 'media',
    tags: ['play', 'pause', 'media', 'video', 'audio', 'animated']
  },
  UseAnimationsRadioButton && {
    id: 'react-useanimations-radio-button',
    name: 'Radio Button',
    svg: createIconWrapper(UseAnimationsRadioButton, 'RadioButton'),
    style: 'animated',
    category: 'forms',
    tags: ['radio', 'button', 'select', 'choice', 'form', 'animated']
  },
  UseAnimationsScrollDown && {
    id: 'react-useanimations-scroll-down',
    name: 'Scroll Down',
    svg: createIconWrapper(UseAnimationsScrollDown, 'ScrollDown'),
    style: 'animated',
    category: 'navigation',
    tags: ['scroll', 'down', 'arrow', 'navigation', 'animated']
  },
  UseAnimationsShoppingCart && {
    id: 'react-useanimations-shopping-cart',
    name: 'Shopping Cart',
    svg: createIconWrapper(UseAnimationsShoppingCart, 'ShoppingCart'),
    style: 'animated',
    category: 'ecommerce',
    tags: ['shopping', 'cart', 'buy', 'purchase', 'ecommerce', 'animated']
  },
  UseAnimationsSkipBack && {
    id: 'react-useanimations-skip-back',
    name: 'Skip Back',
    svg: createIconWrapper(UseAnimationsSkipBack, 'SkipBack'),
    style: 'animated',
    category: 'media',
    tags: ['skip', 'back', 'previous', 'media', 'rewind', 'animated']
  },
  UseAnimationsSkipForward && {
    id: 'react-useanimations-skip-forward',
    name: 'Skip Forward',
    svg: createIconWrapper(UseAnimationsSkipForward, 'SkipForward'),
    style: 'animated',
    category: 'media',
    tags: ['skip', 'forward', 'next', 'media', 'fast-forward', 'animated']
  },
  UseAnimationsToggle && {
    id: 'react-useanimations-toggle',
    name: 'Toggle',
    svg: createIconWrapper(UseAnimationsToggle, 'Toggle'),
    style: 'animated',
    category: 'forms',
    tags: ['toggle', 'switch', 'on', 'off', 'form', 'animated']
  },
  UseAnimationsTrash && {
    id: 'react-useanimations-trash',
    name: 'Trash',
    svg: createIconWrapper(UseAnimationsTrash, 'Trash'),
    style: 'animated',
    category: 'actions',
    tags: ['trash', 'delete', 'remove', 'bin', 'garbage', 'animated']
  },
  UseAnimationsVolume && {
    id: 'react-useanimations-volume',
    name: 'Volume',
    svg: createIconWrapper(UseAnimationsVolume, 'Volume'),
    style: 'animated',
    category: 'media',
    tags: ['volume', 'sound', 'audio', 'speaker', 'animated']
  },
  UseAnimationsWifi && {
    id: 'react-useanimations-wifi',
    name: 'WiFi Signal',
    svg: createIconWrapper(UseAnimationsWifi, 'WiFiSignal'),
    style: 'animated',
    category: 'system',
    tags: ['wifi', 'signal', 'network', 'internet', 'connection', 'animated']
  }
].filter(Boolean) as IconItem[];

export default reactUseAnimationsIcons;