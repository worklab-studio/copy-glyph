import React from 'react';
import { IconItem } from '@/types/icon';

// Direct SVG imports from downloaded files
import appleIcon from '@/assets/simple-icons/apple.svg';
import googleIcon from '@/assets/simple-icons/google.svg';
import facebookIcon from '@/assets/simple-icons/facebook.svg';
import instagramIcon from '@/assets/simple-icons/instagram.svg';
import youtubeIcon from '@/assets/simple-icons/youtube.svg';
import githubIcon from '@/assets/simple-icons/github.svg';
import netflixIcon from '@/assets/simple-icons/netflix.svg';
import spotifyIcon from '@/assets/simple-icons/spotify.svg';
import reactIcon from '@/assets/simple-icons/react.svg';
import vuedotjsIcon from '@/assets/simple-icons/vuedotjs.svg';
import angularIcon from '@/assets/simple-icons/angular.svg';
import typescriptIcon from '@/assets/simple-icons/typescript.svg';
import javascriptIcon from '@/assets/simple-icons/javascript.svg';
import pythonIcon from '@/assets/simple-icons/python.svg';
import dockerIcon from '@/assets/simple-icons/docker.svg';
import kubernetesIcon from '@/assets/simple-icons/kubernetes.svg';
import nextdotjsIcon from '@/assets/simple-icons/nextdotjs.svg';
import svelteIcon from '@/assets/simple-icons/svelte.svg';
import tailwindcssIcon from '@/assets/simple-icons/tailwindcss.svg';
import figmaIcon from '@/assets/simple-icons/figma.svg';
import slackIcon from '@/assets/simple-icons/slack.svg';
import discordIcon from '@/assets/simple-icons/discord.svg';
import whatsappIcon from '@/assets/simple-icons/whatsapp.svg';
import telegramIcon from '@/assets/simple-icons/telegram.svg';
import tiktokIcon from '@/assets/simple-icons/tiktok.svg';
import redditIcon from '@/assets/simple-icons/reddit.svg';
import twitchIcon from '@/assets/simple-icons/twitch.svg';
import stripeIcon from '@/assets/simple-icons/stripe.svg';
import paypalIcon from '@/assets/simple-icons/paypal.svg';
import visaIcon from '@/assets/simple-icons/visa.svg';
import mastercardIcon from '@/assets/simple-icons/mastercard.svg';
import bitcoinIcon from '@/assets/simple-icons/bitcoin.svg';
import ethereumIcon from '@/assets/simple-icons/ethereum.svg';
import xIcon from '@/assets/simple-icons/x.svg';
import openjdkIcon from '@/assets/simple-icons/openjdk.svg';
import nodedotjsIcon from '@/assets/simple-icons/nodedotjs.svg';

// Helper function to convert hex color to CSS filter
const hexToFilter = (hex: string): string => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  
  // Convert RGB to HSL
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const diff = max - min;
  
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / diff + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / diff + 4) / 6;
        break;
    }
  }
  
  // Convert to degrees and percentages
  const hue = Math.round(h * 360);
  const saturation = Math.round(s * 100);
  const lightness = Math.round(l * 100);
  
  // Create CSS filter to achieve target color
  // Start with making the image black, then apply hue and saturation
  return `brightness(0) saturate(100%) invert(${lightness > 50 ? 1 : 0}) sepia(1) saturate(${saturation > 0 ? saturation : 100}%) hue-rotate(${hue}deg) brightness(${lightness}%)`;
};

// Create React components from SVG imports
const createSimpleIconComponent = (svgUrl: string, name: string) => {
  const Component: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
    size = 24, 
    color = 'currentColor', 
    className = '' 
  }) => {
    const getColorFilter = (targetColor: string): string | undefined => {
      if (targetColor === 'currentColor') return undefined;
      
      // Handle common color names
      const colorMap: Record<string, string> = {
        'white': '#ffffff',
        'black': '#000000',
        'red': '#ff0000',
        'green': '#00ff00',
        'blue': '#0000ff',
        'yellow': '#ffff00',
        'cyan': '#00ffff',
        'magenta': '#ff00ff'
      };
      
      const hexColor = colorMap[targetColor.toLowerCase()] || targetColor;
      
      // Validate hex color format
      if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
        return 'brightness(0) saturate(100%) invert(1)'; // Default to white
      }
      
      return hexToFilter(hexColor);
    };

    return (
      <img 
        src={svgUrl}
        alt={name}
        width={size}
        height={size}
        className={className}
        style={{ 
          filter: getColorFilter(color),
          transition: 'filter 0.2s ease'
        }}
      />
    );
  };
  
  Component.displayName = `SimpleIcon${name}`;
  return Component;
};

// Function to get category from icon name
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (['apple', 'google', 'react', 'vue', 'angular', 'typescript', 'javascript', 'python', 'docker', 'kubernetes', 'nextjs', 'svelte', 'tailwind', 'openjdk', 'nodejs'].some(tech => lowerName.includes(tech))) {
    return 'technology';
  }
  if (['facebook', 'instagram', 'youtube', 'x', 'discord', 'whatsapp', 'telegram', 'tiktok', 'reddit', 'twitch'].some(social => lowerName.includes(social))) {
    return 'social';
  }
  if (['netflix', 'spotify', 'youtube', 'twitch'].some(media => lowerName.includes(media))) {
    return 'media';
  }
  if (['github', 'docker', 'kubernetes'].some(dev => lowerName.includes(dev))) {
    return 'development';
  }
  if (['figma', 'slack'].some(design => lowerName.includes(design))) {
    return 'design';
  }
  if (['stripe', 'paypal', 'visa', 'mastercard', 'bitcoin', 'ethereum'].some(finance => lowerName.includes(finance))) {
    return 'finance';
  }
  
  return 'brands';
};

// Simple Icons data array - All directly imported icons
export const simpleIcons: IconItem[] = [
  {
    id: 'simple-apple',
    name: 'Apple',
    svg: createSimpleIconComponent(appleIcon, 'Apple'),
    style: 'simple',
    category: getCategoryFromName('Apple'),
    tags: ['apple', 'brand', 'technology', 'mac', 'iphone', 'simple']
  },
  {
    id: 'simple-google',
    name: 'Google',
    svg: createSimpleIconComponent(googleIcon, 'Google'),
    style: 'simple',
    category: getCategoryFromName('Google'),
    tags: ['google', 'brand', 'technology', 'search', 'android', 'simple']
  },
  {
    id: 'simple-facebook',
    name: 'Facebook',
    svg: createSimpleIconComponent(facebookIcon, 'Facebook'),
    style: 'simple',
    category: getCategoryFromName('Facebook'),
    tags: ['facebook', 'brand', 'social', 'meta', 'social media', 'simple']
  },
  {
    id: 'simple-instagram',
    name: 'Instagram',
    svg: createSimpleIconComponent(instagramIcon, 'Instagram'),
    style: 'simple',
    category: getCategoryFromName('Instagram'),
    tags: ['instagram', 'brand', 'social', 'meta', 'social media', 'simple']
  },
  {
    id: 'simple-youtube',
    name: 'YouTube',
    svg: createSimpleIconComponent(youtubeIcon, 'YouTube'),
    style: 'simple',
    category: getCategoryFromName('YouTube'),
    tags: ['youtube', 'brand', 'media', 'video', 'google', 'simple']
  },
  {
    id: 'simple-github',
    name: 'GitHub',
    svg: createSimpleIconComponent(githubIcon, 'GitHub'),
    style: 'simple',
    category: getCategoryFromName('GitHub'),
    tags: ['github', 'brand', 'development', 'git', 'code', 'simple']
  },
  {
    id: 'simple-netflix',
    name: 'Netflix',
    svg: createSimpleIconComponent(netflixIcon, 'Netflix'),
    style: 'simple',
    category: getCategoryFromName('Netflix'),
    tags: ['netflix', 'brand', 'media', 'streaming', 'entertainment', 'simple']
  },
  {
    id: 'simple-spotify',
    name: 'Spotify',
    svg: createSimpleIconComponent(spotifyIcon, 'Spotify'),
    style: 'simple',
    category: getCategoryFromName('Spotify'),
    tags: ['spotify', 'brand', 'media', 'music', 'streaming', 'simple']
  },
  {
    id: 'simple-react',
    name: 'React',
    svg: createSimpleIconComponent(reactIcon, 'React'),
    style: 'simple',
    category: getCategoryFromName('React'),
    tags: ['react', 'brand', 'technology', 'javascript', 'frontend', 'simple']
  },
  {
    id: 'simple-vue',
    name: 'Vue.js',
    svg: createSimpleIconComponent(vuedotjsIcon, 'Vue'),
    style: 'simple',
    category: getCategoryFromName('Vue'),
    tags: ['vue', 'vuejs', 'brand', 'technology', 'javascript', 'frontend', 'simple']
  },
  {
    id: 'simple-angular',
    name: 'Angular',
    svg: createSimpleIconComponent(angularIcon, 'Angular'),
    style: 'simple',
    category: getCategoryFromName('Angular'),
    tags: ['angular', 'brand', 'technology', 'typescript', 'frontend', 'simple']
  },
  {
    id: 'simple-typescript',
    name: 'TypeScript',
    svg: createSimpleIconComponent(typescriptIcon, 'TypeScript'),
    style: 'simple',
    category: getCategoryFromName('TypeScript'),
    tags: ['typescript', 'brand', 'technology', 'javascript', 'programming', 'simple']
  },
  {
    id: 'simple-javascript',
    name: 'JavaScript',
    svg: createSimpleIconComponent(javascriptIcon, 'JavaScript'),
    style: 'simple',
    category: getCategoryFromName('JavaScript'),
    tags: ['javascript', 'brand', 'technology', 'programming', 'web', 'simple']
  },
  {
    id: 'simple-python',
    name: 'Python',
    svg: createSimpleIconComponent(pythonIcon, 'Python'),
    style: 'simple',
    category: getCategoryFromName('Python'),
    tags: ['python', 'brand', 'technology', 'programming', 'data science', 'simple']
  },
  {
    id: 'simple-docker',
    name: 'Docker',
    svg: createSimpleIconComponent(dockerIcon, 'Docker'),
    style: 'simple',
    category: getCategoryFromName('Docker'),
    tags: ['docker', 'brand', 'technology', 'containerization', 'devops', 'simple']
  },
  {
    id: 'simple-kubernetes',
    name: 'Kubernetes',
    svg: createSimpleIconComponent(kubernetesIcon, 'Kubernetes'),
    style: 'simple',
    category: getCategoryFromName('Kubernetes'),
    tags: ['kubernetes', 'brand', 'technology', 'orchestration', 'devops', 'simple']
  },
  {
    id: 'simple-nextjs',
    name: 'Next.js',
    svg: createSimpleIconComponent(nextdotjsIcon, 'NextJS'),
    style: 'simple',
    category: getCategoryFromName('NextJS'),
    tags: ['nextjs', 'brand', 'technology', 'react', 'framework', 'simple']
  },
  {
    id: 'simple-svelte',
    name: 'Svelte',
    svg: createSimpleIconComponent(svelteIcon, 'Svelte'),
    style: 'simple',
    category: getCategoryFromName('Svelte'),
    tags: ['svelte', 'brand', 'technology', 'javascript', 'frontend', 'simple']
  },
  {
    id: 'simple-tailwind',
    name: 'Tailwind CSS',
    svg: createSimpleIconComponent(tailwindcssIcon, 'Tailwind'),
    style: 'simple',
    category: getCategoryFromName('Tailwind'),
    tags: ['tailwind', 'css', 'brand', 'technology', 'styling', 'simple']
  },
  {
    id: 'simple-figma',
    name: 'Figma',
    svg: createSimpleIconComponent(figmaIcon, 'Figma'),
    style: 'simple',
    category: getCategoryFromName('Figma'),
    tags: ['figma', 'brand', 'design', 'ui', 'ux', 'simple']
  },
  {
    id: 'simple-slack',
    name: 'Slack',
    svg: createSimpleIconComponent(slackIcon, 'Slack'),
    style: 'simple',
    category: getCategoryFromName('Slack'),
    tags: ['slack', 'brand', 'communication', 'team', 'chat', 'simple']
  },
  {
    id: 'simple-discord',
    name: 'Discord',
    svg: createSimpleIconComponent(discordIcon, 'Discord'),
    style: 'simple',
    category: getCategoryFromName('Discord'),
    tags: ['discord', 'brand', 'social', 'gaming', 'chat', 'simple']
  },
  {
    id: 'simple-whatsapp',
    name: 'WhatsApp',
    svg: createSimpleIconComponent(whatsappIcon, 'WhatsApp'),
    style: 'simple',
    category: getCategoryFromName('WhatsApp'),
    tags: ['whatsapp', 'brand', 'social', 'messaging', 'meta', 'simple']
  },
  {
    id: 'simple-telegram',
    name: 'Telegram',
    svg: createSimpleIconComponent(telegramIcon, 'Telegram'),
    style: 'simple',
    category: getCategoryFromName('Telegram'),
    tags: ['telegram', 'brand', 'social', 'messaging', 'chat', 'simple']
  },
  {
    id: 'simple-tiktok',
    name: 'TikTok',
    svg: createSimpleIconComponent(tiktokIcon, 'TikTok'),
    style: 'simple',
    category: getCategoryFromName('TikTok'),
    tags: ['tiktok', 'brand', 'social', 'video', 'entertainment', 'simple']
  },
  {
    id: 'simple-reddit',
    name: 'Reddit',
    svg: createSimpleIconComponent(redditIcon, 'Reddit'),
    style: 'simple',
    category: getCategoryFromName('Reddit'),
    tags: ['reddit', 'brand', 'social', 'community', 'discussion', 'simple']
  },
  {
    id: 'simple-twitch',
    name: 'Twitch',
    svg: createSimpleIconComponent(twitchIcon, 'Twitch'),
    style: 'simple',
    category: getCategoryFromName('Twitch'),
    tags: ['twitch', 'brand', 'media', 'streaming', 'gaming', 'simple']
  },
  {
    id: 'simple-stripe',
    name: 'Stripe',
    svg: createSimpleIconComponent(stripeIcon, 'Stripe'),
    style: 'simple',
    category: getCategoryFromName('Stripe'),
    tags: ['stripe', 'brand', 'finance', 'payment', 'fintech', 'simple']
  },
  {
    id: 'simple-paypal',
    name: 'PayPal',
    svg: createSimpleIconComponent(paypalIcon, 'PayPal'),
    style: 'simple',
    category: getCategoryFromName('PayPal'),
    tags: ['paypal', 'brand', 'finance', 'payment', 'fintech', 'simple']
  },
  {
    id: 'simple-visa',
    name: 'Visa',
    svg: createSimpleIconComponent(visaIcon, 'Visa'),
    style: 'simple',
    category: getCategoryFromName('Visa'),
    tags: ['visa', 'brand', 'finance', 'payment', 'credit card', 'simple']
  },
  {
    id: 'simple-mastercard',
    name: 'Mastercard',
    svg: createSimpleIconComponent(mastercardIcon, 'Mastercard'),
    style: 'simple',
    category: getCategoryFromName('Mastercard'),
    tags: ['mastercard', 'brand', 'finance', 'payment', 'credit card', 'simple']
  },
  {
    id: 'simple-bitcoin',
    name: 'Bitcoin',
    svg: createSimpleIconComponent(bitcoinIcon, 'Bitcoin'),
    style: 'simple',
    category: getCategoryFromName('Bitcoin'),
    tags: ['bitcoin', 'brand', 'finance', 'cryptocurrency', 'crypto', 'simple']
  },
  {
    id: 'simple-ethereum',
    name: 'Ethereum',
    svg: createSimpleIconComponent(ethereumIcon, 'Ethereum'),
    style: 'simple',
    category: getCategoryFromName('Ethereum'),
    tags: ['ethereum', 'brand', 'finance', 'cryptocurrency', 'crypto', 'simple']
  },
  {
    id: 'simple-x',
    name: 'X (Twitter)',
    svg: createSimpleIconComponent(xIcon, 'X'),
    style: 'simple',
    category: getCategoryFromName('X'),
    tags: ['x', 'twitter', 'brand', 'social', 'social media', 'simple']
  },
  {
    id: 'simple-java',
    name: 'Java',
    svg: createSimpleIconComponent(openjdkIcon, 'Java'),
    style: 'simple',
    category: getCategoryFromName('Java'),
    tags: ['java', 'openjdk', 'brand', 'technology', 'programming', 'simple']
  },
  {
    id: 'simple-nodejs',
    name: 'Node.js',
    svg: createSimpleIconComponent(nodedotjsIcon, 'NodeJS'),
    style: 'simple',
    category: getCategoryFromName('NodeJS'),
    tags: ['nodejs', 'node', 'brand', 'technology', 'javascript', 'backend', 'simple']
  }
];