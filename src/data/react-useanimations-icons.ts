import React from 'react';
import { type IconItem } from '@/types/icon';

// Import the most common react-useanimations icons that are definitely available
import UseAnimationsActivity from 'react-useanimations/lib/activity';
import UseAnimationsArrowDown from 'react-useanimations/lib/arrowDown';
import UseAnimationsArrowUp from 'react-useanimations/lib/arrowUp';
import UseAnimationsBookmark from 'react-useanimations/lib/bookmark';
import UseAnimationsCalendar from 'react-useanimations/lib/calendar';
import UseAnimationsCheckBox from 'react-useanimations/lib/checkBox';
import UseAnimationsDownload from 'react-useanimations/lib/download';
import UseAnimationsEdit from 'react-useanimations/lib/edit';
import UseAnimationsGithub from 'react-useanimations/lib/github';
import UseAnimationsHeart from 'react-useanimations/lib/heart';
import UseAnimationsHome from 'react-useanimations/lib/home';
import UseAnimationsInfinity from 'react-useanimations/lib/infinity';
import UseAnimationsLoading from 'react-useanimations/lib/loading';
import UseAnimationsLock from 'react-useanimations/lib/lock';
import UseAnimationsMail from 'react-useanimations/lib/mail';
import UseAnimationsMenu from 'react-useanimations/lib/menu';
import UseAnimationsNotification from 'react-useanimations/lib/notification';
import UseAnimationsSettings from 'react-useanimations/lib/settings';

// Wrapper components to standardize props
const createIconWrapper = (IconComponent: any, iconName: string) => {
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
  {
    id: 'react-useanimations-activity',
    name: 'Activity',
    svg: createIconWrapper(UseAnimationsActivity, 'Activity'),
    style: 'animated',
    category: 'system',
    tags: ['activity', 'stats', 'chart', 'analytics', 'animated']
  },
  {
    id: 'react-useanimations-arrow-down',
    name: 'Arrow Down',
    svg: createIconWrapper(UseAnimationsArrowDown, 'ArrowDown'),
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'down', 'direction', 'navigation', 'animated']
  },
  {
    id: 'react-useanimations-arrow-up',
    name: 'Arrow Up',
    svg: createIconWrapper(UseAnimationsArrowUp, 'ArrowUp'),
    style: 'animated',
    category: 'navigation',
    tags: ['arrow', 'up', 'direction', 'navigation', 'animated']
  },
  {
    id: 'react-useanimations-bookmark',
    name: 'Bookmark',
    svg: createIconWrapper(UseAnimationsBookmark, 'Bookmark'),
    style: 'animated',
    category: 'actions',
    tags: ['bookmark', 'save', 'favorite', 'mark', 'animated']
  },
  {
    id: 'react-useanimations-calendar',
    name: 'Calendar',
    svg: createIconWrapper(UseAnimationsCalendar, 'Calendar'),
    style: 'animated',
    category: 'system',
    tags: ['calendar', 'date', 'schedule', 'time', 'animated']
  },
  {
    id: 'react-useanimations-checkbox',
    name: 'Checkbox',
    svg: createIconWrapper(UseAnimationsCheckBox, 'CheckBox'),
    style: 'animated',
    category: 'forms',
    tags: ['checkbox', 'check', 'tick', 'select', 'form', 'animated']
  },
  {
    id: 'react-useanimations-download',
    name: 'Download',
    svg: createIconWrapper(UseAnimationsDownload, 'Download'),
    style: 'animated',
    category: 'actions',
    tags: ['download', 'save', 'export', 'get', 'animated']
  },
  {
    id: 'react-useanimations-edit',
    name: 'Edit',
    svg: createIconWrapper(UseAnimationsEdit, 'Edit'),
    style: 'animated',
    category: 'actions',
    tags: ['edit', 'pencil', 'write', 'modify', 'update', 'animated']
  },
  {
    id: 'react-useanimations-github',
    name: 'GitHub',
    svg: createIconWrapper(UseAnimationsGithub, 'GitHub'),
    style: 'animated',
    category: 'social',
    tags: ['github', 'git', 'code', 'repository', 'version control', 'animated']
  },
  {
    id: 'react-useanimations-heart',
    name: 'Heart',
    svg: createIconWrapper(UseAnimationsHeart, 'Heart'),
    style: 'animated',
    category: 'actions',
    tags: ['heart', 'like', 'love', 'favorite', 'animated']
  },
  {
    id: 'react-useanimations-home',
    name: 'Home',
    svg: createIconWrapper(UseAnimationsHome, 'Home'),
    style: 'animated',
    category: 'navigation',
    tags: ['home', 'house', 'dashboard', 'main', 'animated']
  },
  {
    id: 'react-useanimations-infinity',
    name: 'Infinity',
    svg: createIconWrapper(UseAnimationsInfinity, 'Infinity'),
    style: 'animated',
    category: 'system',
    tags: ['infinity', 'loop', 'endless', 'unlimited', 'animated']
  },
  {
    id: 'react-useanimations-loading',
    name: 'Loading',
    svg: createIconWrapper(UseAnimationsLoading, 'Loading'),
    style: 'animated',
    category: 'system',
    tags: ['loading', 'spinner', 'progress', 'wait', 'animated']
  },
  {
    id: 'react-useanimations-lock',
    name: 'Lock',
    svg: createIconWrapper(UseAnimationsLock, 'Lock'),
    style: 'animated',
    category: 'system',
    tags: ['lock', 'security', 'private', 'secure', 'protection', 'animated']
  },
  {
    id: 'react-useanimations-mail',
    name: 'Mail',
    svg: createIconWrapper(UseAnimationsMail, 'Mail'),
    style: 'animated',
    category: 'communication',
    tags: ['mail', 'email', 'message', 'envelope', 'contact', 'animated']
  },
  {
    id: 'react-useanimations-menu',
    name: 'Menu',
    svg: createIconWrapper(UseAnimationsMenu, 'Menu'),
    style: 'animated',
    category: 'navigation',
    tags: ['menu', 'hamburger', 'navigation', 'bars', 'animated']
  },
  {
    id: 'react-useanimations-notification',
    name: 'Notification',
    svg: createIconWrapper(UseAnimationsNotification, 'Notification'),
    style: 'animated',
    category: 'system',
    tags: ['notification', 'bell', 'alert', 'message', 'animated']
  },
  {
    id: 'react-useanimations-settings',
    name: 'Settings',
    svg: createIconWrapper(UseAnimationsSettings, 'Settings'),
    style: 'animated',
    category: 'system',
    tags: ['settings', 'gear', 'config', 'preferences', 'animated']
  }
];

export default reactUseAnimationsIcons;