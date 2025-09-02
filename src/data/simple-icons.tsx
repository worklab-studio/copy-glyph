import React from 'react';
import { IconItem } from '@/types/icon';

// Simple Icons SVG Components - Brand Icons
const AppleIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
  </svg>
);

const GoogleIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const InstagramIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const GitHubIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const AmazonIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.548.41-3.156.615-4.822.615-3.078 0-6.085-.776-9.026-2.325-.838-.438-1.654-.9-2.448-1.384-.15-.09-.18-.18-.18-.27 0-.074.03-.15.074-.22l.015-.04zm7.917-8.266c-.32-.55-.766-1.017-1.316-1.4-.55-.385-1.164-.688-1.825-.906-.66-.22-1.35-.328-2.065-.328-.716 0-1.405.108-2.065.328-.66.218-1.274.52-1.825.906-.55.383-.996.85-1.316 1.4-.32.55-.48 1.154-.48 1.808 0 .653.16 1.257.48 1.807.32.55.765 1.017 1.316 1.4.55.385 1.164.688 1.825.906.66.22 1.35.328 2.065.328.716 0 1.405-.108 2.065-.328.66-.218 1.274-.52 1.825-.906.55-.383.996-.85 1.316-1.4.32-.55.48-1.154.48-1.807 0-.654-.16-1.258-.48-1.808zm5.588 2.428c0-.414-.126-.774-.378-1.08-.252-.306-.6-.459-1.044-.459-.444 0-.792.153-1.044.459-.252.306-.378.666-.378 1.08 0 .414.126.774.378 1.08.252.306.6.459 1.044.459.444 0 .792-.153 1.044-.459.252-.306.378-.666.378-1.08z"/>
  </svg>
);

const MicrosoftIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
  </svg>
);

const NetflixIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M5.398 0v.006c.604 3.445 1.208 6.89 1.811 10.335L7.4 11.39c.473-3.377.946-6.754 1.419-10.131h1.709c.952 8.203 1.904 16.407 2.856 24.61h-1.61c-.339-3.233-.678-6.466-1.018-9.699-.035-.4-.071-.8-.106-1.2l-.141-1.711c-.465 4.203-.93 8.407-1.396 12.61H6.426C5.398 16.407 4.37 8.203 3.342.001H5.398zm7.415 0c.952 8.203 1.904 16.407 2.856 24.61h-1.732c-.473-4.726-.946-9.453-1.419-14.179l-.14-1.711c-.465 4.203-.93 8.407-1.396 12.61H9.368c-1.03-8.203-2.058-16.407-3.086-24.609h1.614c.473 4.726.946 9.453 1.419 14.179l.14 1.711c.465-4.203.93-8.407 1.396-12.61H12.813z"/>
  </svg>
);

const SpotifyIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.32 11.28-1.08 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

// Function to get category from icon name
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (['apple', 'google', 'microsoft', 'amazon', 'facebook', 'meta'].some(tech => lowerName.includes(tech))) {
    return 'technology';
  }
  if (['twitter', 'instagram', 'linkedin', 'youtube', 'facebook'].some(social => lowerName.includes(social))) {
    return 'social';
  }
  if (['netflix', 'spotify', 'youtube'].some(media => lowerName.includes(media))) {
    return 'media';
  }
  if (['github', 'gitlab', 'bitbucket'].some(dev => lowerName.includes(dev))) {
    return 'development';
  }
  
  return 'brands';
};

// Simple Icons data array
export const simpleIcons: IconItem[] = [
  {
    id: 'simple-apple',
    name: 'Apple',
    svg: AppleIcon,
    style: 'simple',
    category: getCategoryFromName('Apple'),
    tags: ['apple', 'brand', 'technology', 'mac', 'iphone', 'simple']
  },
  {
    id: 'simple-google',
    name: 'Google',
    svg: GoogleIcon,
    style: 'simple',
    category: getCategoryFromName('Google'),
    tags: ['google', 'brand', 'technology', 'search', 'android', 'simple']
  },
  {
    id: 'simple-facebook',
    name: 'Facebook',
    svg: FacebookIcon,
    style: 'simple',
    category: getCategoryFromName('Facebook'),
    tags: ['facebook', 'brand', 'social', 'meta', 'social media', 'simple']
  },
  {
    id: 'simple-twitter',
    name: 'Twitter',
    svg: TwitterIcon,
    style: 'simple',
    category: getCategoryFromName('Twitter'),
    tags: ['twitter', 'brand', 'social', 'x', 'social media', 'simple']
  },
  {
    id: 'simple-instagram',
    name: 'Instagram',
    svg: InstagramIcon,
    style: 'simple',
    category: getCategoryFromName('Instagram'),
    tags: ['instagram', 'brand', 'social', 'meta', 'social media', 'simple']
  },
  {
    id: 'simple-linkedin',
    name: 'LinkedIn',
    svg: LinkedInIcon,
    style: 'simple',
    category: getCategoryFromName('LinkedIn'),
    tags: ['linkedin', 'brand', 'social', 'professional', 'networking', 'simple']
  },
  {
    id: 'simple-youtube',
    name: 'YouTube',
    svg: YouTubeIcon,
    style: 'simple',
    category: getCategoryFromName('YouTube'),
    tags: ['youtube', 'brand', 'media', 'video', 'google', 'simple']
  },
  {
    id: 'simple-github',
    name: 'GitHub',
    svg: GitHubIcon,
    style: 'simple',
    category: getCategoryFromName('GitHub'),
    tags: ['github', 'brand', 'development', 'git', 'code', 'simple']
  },
  {
    id: 'simple-amazon',
    name: 'Amazon',
    svg: AmazonIcon,
    style: 'simple',
    category: getCategoryFromName('Amazon'),
    tags: ['amazon', 'brand', 'technology', 'ecommerce', 'aws', 'simple']
  },
  {
    id: 'simple-microsoft',
    name: 'Microsoft',
    svg: MicrosoftIcon,
    style: 'simple',
    category: getCategoryFromName('Microsoft'),
    tags: ['microsoft', 'brand', 'technology', 'windows', 'office', 'simple']
  },
  {
    id: 'simple-netflix',
    name: 'Netflix',
    svg: NetflixIcon,
    style: 'simple',
    category: getCategoryFromName('Netflix'),
    tags: ['netflix', 'brand', 'media', 'streaming', 'entertainment', 'simple']
  },
  {
    id: 'simple-spotify',
    name: 'Spotify',
    svg: SpotifyIcon,
    style: 'simple',
    category: getCategoryFromName('Spotify'),
    tags: ['spotify', 'brand', 'media', 'music', 'streaming', 'simple']
  }
];