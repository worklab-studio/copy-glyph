import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTheme } from 'next-themes';

const LoadingAnimation = () => {
  const { theme } = useTheme();
  
  // Apply filter based on theme - black in light mode, white in dark mode
  const filterStyle = theme === 'light' 
    ? { filter: 'brightness(0)' } // Makes it black
    : { filter: 'brightness(0) invert(1)' }; // Makes it white

  return (
    <div className="flex items-center justify-center w-full h-full" style={filterStyle}>
      <DotLottieReact
        src="https://lottie.host/48a3d687-d94b-4ef9-aa77-049a95f15af7/O2PsD2POjh.lottie"
        loop
        autoplay
        className="w-32 h-32"
      />
    </div>
  );
};

export default LoadingAnimation;