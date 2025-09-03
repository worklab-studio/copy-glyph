import React from 'react';
import { type IconItem } from '../types/icon';

// Animated Icon Components

// Loading & Progress Icons
const LoadingLoopIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path',
        d: 'M12 3c4.97 0 9 4.03 9 9',
        strokeDasharray: '16',
        strokeDashoffset: '16'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '16;0',
          dur: '0.2s',
          fill: 'freeze'
        }),
        React.createElement('animateTransform', {
          key: 'animateTransform',
          attributeName: 'transform',
          type: 'rotate',
          values: '0 12 12;360 12 12',
          dur: '1.5s',
          repeatCount: 'indefinite'
        })
      ])
    ])
  ]);
};

const SpinnerIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', { key: 'g' }, [
      React.createElement('circle', {
        key: 'circle',
        cx: '12',
        cy: '12',
        r: '9.5',
        fill: 'none',
        stroke: color,
        strokeWidth: '3',
        strokeLinecap: 'round',
        strokeDasharray: '60'
      }, [
        React.createElement('animateTransform', {
          key: 'animateTransform',
          attributeName: 'transform',
          type: 'rotate',
          values: '0 12 12;360 12 12',
          dur: '2s',
          repeatCount: 'indefinite'
        })
      ])
    ])
  ]);
};

const ProgressIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round'
    }, [
      React.createElement('path', {
        key: 'path',
        d: 'M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07 .74 5.6 1.97',
        strokeDasharray: '56.55',
        strokeDashoffset: '56.55'
      }, [
        React.createElement('animate', {
          key: 'animate',
          attributeName: 'stroke-dashoffset',
          values: '56.55;0',
          dur: '2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const DotsSpinnerIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', { key: 'g', fill: color }, [
      React.createElement('circle', {
        key: 'circle1',
        cx: '12',
        cy: '2',
        r: '0'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'r',
          values: '0;2;0',
          dur: '1s',
          repeatCount: 'indefinite',
          begin: '0s'
        })
      ]),
      React.createElement('circle', {
        key: 'circle2',
        cx: '12',
        cy: '22',
        r: '0'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'r',
          values: '0;2;0',
          dur: '1s',
          repeatCount: 'indefinite',
          begin: '0.5s'
        })
      ]),
      React.createElement('circle', {
        key: 'circle3',
        cx: '22',
        cy: '12',
        r: '0'
      }, [
        React.createElement('animate', {
          key: 'animate3',
          attributeName: 'r',
          values: '0;2;0',
          dur: '1s',
          repeatCount: 'indefinite',
          begin: '0.25s'
        })
      ]),
      React.createElement('circle', {
        key: 'circle4',
        cx: '2',
        cy: '12',
        r: '0'
      }, [
        React.createElement('animate', {
          key: 'animate4',
          attributeName: 'r',
          values: '0;2;0',
          dur: '1s',
          repeatCount: 'indefinite',
          begin: '0.75s'
        })
      ])
    ])
  ]);
};

// Check & Success Icons
const CheckIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path',
        d: 'M5 12l5 5l10 -10',
        strokeDasharray: '20',
        strokeDashoffset: '20'
      }, [
        React.createElement('animate', {
          key: 'animate',
          attributeName: 'stroke-dashoffset',
          values: '20;0',
          dur: '0.4s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const CheckAllIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('mask', { id: 'check-all-mask', key: 'mask' }, [
      React.createElement('g', {
        key: 'g',
        fill: 'none',
        stroke: '#fff',
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }, [
        React.createElement('path', {
          key: 'path1',
          d: 'M2 13.5l4 4l10.75 -10.75',
          strokeDasharray: '24',
          strokeDashoffset: '24'
        }, [
          React.createElement('animate', {
            key: 'animate1',
            attributeName: 'stroke-dashoffset',
            values: '24;0',
            dur: '0.4s',
            fill: 'freeze'
          })
        ]),
        React.createElement('path', {
          key: 'path2',
          d: 'M7.5 13.5l4 4l10.75 -10.75',
          stroke: '#000',
          strokeWidth: 6,
          strokeDasharray: '24',
          strokeDashoffset: '24'
        }, [
          React.createElement('animate', {
            key: 'animate2',
            attributeName: 'stroke-dashoffset',
            values: '24;0',
            begin: '0.4s',
            dur: '0.4s',
            fill: 'freeze'
          })
        ]),
        React.createElement('path', {
          key: 'path3',
          d: 'M7.5 13.5l4 4l10.75 -10.75',
          strokeDasharray: '24',
          strokeDashoffset: '24'
        }, [
          React.createElement('animate', {
            key: 'animate3',
            attributeName: 'stroke-dashoffset',
            values: '24;0',
            begin: '0.4s',
            dur: '0.4s',
            fill: 'freeze'
          })
        ])
      ])
    ]),
    React.createElement('rect', {
      key: 'rect',
      mask: 'url(#check-all-mask)',
      width: '24',
      height: '24',
      fill: color
    })
  ]);
};

const CheckCircleIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('circle', {
        key: 'circle',
        cx: '12',
        cy: '12',
        r: '10',
        strokeDasharray: '63',
        strokeDashoffset: '63'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '63;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path',
        d: 'M8 12l3 3l5 -6',
        strokeDasharray: '12',
        strokeDashoffset: '12'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '12;0',
          begin: '0.6s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Menu & Navigation Icons
const MenuToCloseIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M5 12H19',
        opacity: '1'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'd',
          values: 'M5 12H19;M12 12H12',
          dur: '0.4s',
          fill: 'freeze'
        }),
        React.createElement('set', {
          key: 'set1',
          attributeName: 'opacity',
          to: '0',
          begin: '0.4s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M5 5L19 5M5 19L19 19',
        opacity: '0'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'd',
          values: 'M5 5L19 5M5 19L19 19;M5 5L19 19M5 19L19 5',
          begin: '0.2s',
          dur: '0.4s',
          fill: 'freeze'
        }),
        React.createElement('set', {
          key: 'set2',
          attributeName: 'opacity',
          to: '1',
          begin: '0.2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const MenuIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M5 7h14',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          dur: '0.3s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M5 12h14',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          begin: '0.1s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path3',
        d: 'M5 17h14',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate3',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          begin: '0.2s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Arrow Icons
const ArrowLeftIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M5 12h14',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          dur: '0.3s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M5 12l6 -6M5 12l6 6',
        strokeDasharray: '12',
        strokeDashoffset: '12'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '12;0',
          begin: '0.3s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const ArrowRightIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M5 12h14',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          dur: '0.3s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M19 12l-6 -6M19 12l-6 6',
        strokeDasharray: '12',
        strokeDashoffset: '12'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '12;0',
          begin: '0.3s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const ArrowUpIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M12 19V5',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          dur: '0.3s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M12 5l-6 6M12 5l6 6',
        strokeDasharray: '12',
        strokeDashoffset: '12'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '12;0',
          begin: '0.3s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const ArrowDownIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M12 5v14',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          dur: '0.3s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M12 19l-6 -6M12 19l6 -6',
        strokeDasharray: '12',
        strokeDashoffset: '12'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '12;0',
          begin: '0.3s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Upload & Download Icons
const UploadLoopIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5',
        fill: color,
        fillOpacity: '0',
        strokeDasharray: '20',
        strokeDashoffset: '20'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'd',
          values: 'M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5;M12 15h2v-3h2.5l-4.5 -4.5M12 15h-2v-3h-2.5l4.5 -4.5;M12 15h2v-6h2.5l-4.5 -4.5M12 15h-2v-6h-2.5l4.5 -4.5',
          begin: '0.5s',
          dur: '1.5s',
          repeatCount: 'indefinite'
        }),
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'fill-opacity',
          values: '0;1',
          begin: '0.7s',
          dur: '0.5s',
          fill: 'freeze'
        }),
        React.createElement('animate', {
          key: 'animate3',
          attributeName: 'stroke-dashoffset',
          values: '20;0',
          dur: '0.4s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M6 19h12',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate4',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          begin: '0.5s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const DownloadIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M12 3v12',
        strokeDasharray: '12',
        strokeDashoffset: '12'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '12;0',
          dur: '0.4s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M12 15l-4 -4M12 15l4 -4',
        strokeDasharray: '8',
        strokeDashoffset: '8'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '8;0',
          begin: '0.4s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path3',
        d: 'M5 19h14',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate3',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          begin: '0.6s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Heart & Social Icons
const HeartTwotoneIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g1',
      fill: color
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9c0 0 -7.43 -7.79 -8.24 -9c-0.48 -0.71 -0.76 -1.57 -0.76 -2.5c0 -2.49 2.01 -4.5 4.5 -4.5c1.56 0 2.87 0.84 3.74 2c0.76 1 0.76 1 0.76 1Z',
        fillOpacity: '0'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'fill-opacity',
          values: '0;0.3',
          begin: '0.7s',
          dur: '0.15s',
          fill: 'freeze'
        })
      ])
    ]),
    React.createElement('g', {
      key: 'g2',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path2',
        d: 'M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9',
        strokeDasharray: '32',
        strokeDashoffset: '32'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '32;0',
          dur: '0.7s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const HeartIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path',
        d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
        strokeDasharray: '32',
        strokeDashoffset: '32',
        fillOpacity: '0'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '32;0',
          dur: '0.6s',
          fill: 'freeze'
        }),
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'fill-opacity',
          values: '0;0.3',
          begin: '0.6s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Home & Location Icons
const HomeTwotoneIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g1',
      fill: color
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M10 13h4v8h-4Z',
        fillOpacity: '0'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'fill-opacity',
          values: '0;0.3',
          begin: '1.1s',
          dur: '0.15s',
          fill: 'freeze'
        })
      ])
    ]),
    React.createElement('g', {
      key: 'g2',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path2',
        d: 'M4.5 21.5h15',
        strokeDasharray: '16',
        strokeDashoffset: '16'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '16;0',
          dur: '0.2s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path3',
        d: 'M4.5 21.5v-13.5M19.5 21.5v-13.5',
        strokeDasharray: '16',
        strokeDashoffset: '16'
      }, [
        React.createElement('animate', {
          key: 'animate3',
          attributeName: 'stroke-dashoffset',
          values: '16;0',
          begin: '0.2s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path4',
        d: 'M2 10l10 -8l10 8',
        strokeDasharray: '28',
        strokeDashoffset: '28'
      }, [
        React.createElement('animate', {
          key: 'animate4',
          attributeName: 'stroke-dashoffset',
          values: '28;0',
          begin: '0.4s',
          dur: '0.4s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path5',
        d: 'M9.5 21.5v-9h5v9',
        strokeDasharray: '24',
        strokeDashoffset: '24'
      }, [
        React.createElement('animate', {
          key: 'animate5',
          attributeName: 'stroke-dashoffset',
          values: '24;0',
          begin: '0.7s',
          dur: '0.4s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const HomeIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        strokeDasharray: '42',
        strokeDashoffset: '42'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '42;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M9 22V12h6v10',
        strokeDasharray: '16',
        strokeDashoffset: '16'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '16;0',
          begin: '0.6s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Bell & Notification Icons
const BellIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9',
        strokeDasharray: '32',
        strokeDashoffset: '32'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '32;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M13.73 21a2 2 0 0 1-3.46 0',
        strokeDasharray: '6',
        strokeDashoffset: '6'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '6;0',
          begin: '0.6s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

const BellRingingIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9',
        strokeDasharray: '32',
        strokeDashoffset: '32'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '32;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M13.73 21a2 2 0 0 1-3.46 0',
        strokeDasharray: '6',
        strokeDashoffset: '6'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '6;0',
          begin: '0.6s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path3',
        d: 'M22 3l-2 2M4 3l2 2',
        strokeDasharray: '4',
        strokeDashoffset: '4'
      }, [
        React.createElement('animate', {
          key: 'animate3',
          attributeName: 'stroke-dashoffset',
          values: '4;0',
          begin: '0.8s',
          dur: '0.2s',
          fill: 'freeze'
        }),
        React.createElement('animateTransform', {
          key: 'animateTransform',
          attributeName: 'transform',
          type: 'rotate',
          values: '0 12 12;10 12 12;-10 12 12;0 12 12',
          begin: '1s',
          dur: '1s',
          repeatCount: 'indefinite'
        })
      ])
    ])
  ]);
};

// Star & Rating Icons
const StarIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path',
        d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        strokeDasharray: '42',
        strokeDashoffset: '42',
        fill: color,
        fillOpacity: '0'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '42;0',
          dur: '0.6s',
          fill: 'freeze'
        }),
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'fill-opacity',
          values: '0;0.3',
          begin: '0.6s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Activity & Dashboard Icons
const ActivityIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path',
        d: 'M22 12h-4l-3 9L9 3l-3 9H2',
        strokeDasharray: '32',
        strokeDashoffset: '32'
      }, [
        React.createElement('animate', {
          key: 'animate',
          attributeName: 'stroke-dashoffset',
          values: '32;0',
          dur: '0.8s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Search Icons
const SearchIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('circle', {
        key: 'circle',
        cx: '11',
        cy: '11',
        r: '8',
        strokeDasharray: '50',
        strokeDashoffset: '50'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '50;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path',
        d: 'M21 21l-4.35-4.35',
        strokeDasharray: '6',
        strokeDashoffset: '6'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '6;0',
          begin: '0.6s',
          dur: '0.2s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Edit Icons
const EditIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
        strokeDasharray: '36',
        strokeDashoffset: '36'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '36;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M18.5 2.5a2.12 2.12 0 0 1 3 3l-9.5 9.5-4 1 1-4 9.5-9.5z',
        strokeDasharray: '20',
        strokeDashoffset: '20'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '20;0',
          begin: '0.3s',
          dur: '0.4s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Settings Icon
const SettingsIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('circle', {
        key: 'circle',
        cx: '12',
        cy: '12',
        r: '3',
        strokeDasharray: '19',
        strokeDashoffset: '19'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '19;0',
          begin: '0.6s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path',
        d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z',
        strokeDasharray: '64',
        strokeDashoffset: '64'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '64;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Plus & Add Icons
const PlusIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M12 5v14',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          dur: '0.3s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M5 12h14',
        strokeDasharray: '14',
        strokeDashoffset: '14'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '14;0',
          begin: '0.3s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Mail & Communication Icons
const MailIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('rect', {
        key: 'rect',
        x: '2',
        y: '4',
        width: '20',
        height: '16',
        rx: '2',
        strokeDasharray: '42',
        strokeDashoffset: '42'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '42;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path',
        d: 'M22 6l-10 7L2 6',
        strokeDasharray: '24',
        strokeDashoffset: '24'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '24;0',
          begin: '0.6s',
          dur: '0.4s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// User & Profile Icons
const UserIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('circle', {
        key: 'circle',
        cx: '12',
        cy: '8',
        r: '5',
        strokeDasharray: '31',
        strokeDashoffset: '31'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '31;0',
          dur: '0.5s',
          fill: 'freeze'
        })
      ]),
      React.createElement('path', {
        key: 'path',
        d: 'M20 21a8 8 0 0 0-16 0',
        strokeDasharray: '25',
        strokeDashoffset: '25'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '25;0',
          begin: '0.5s',
          dur: '0.4s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Lock & Security Icons
const LockIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('rect', {
        key: 'rect',
        x: '3',
        y: '11',
        width: '18',
        height: '11',
        rx: '2',
        ry: '2',
        strokeDasharray: '42',
        strokeDashoffset: '42'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '42;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ]),
      React.createElement('circle', {
        key: 'circle',
        cx: '12',
        cy: '7',
        r: '4',
        strokeDasharray: '25',
        strokeDashoffset: '25'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '25;0',
          begin: '0.6s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Eye & Visibility Icons
const EyeIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path',
        d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z',
        strokeDasharray: '48',
        strokeDashoffset: '48'
      }, [
        React.createElement('animate', {
          key: 'animate1',
          attributeName: 'stroke-dashoffset',
          values: '48;0',
          dur: '0.6s',
          fill: 'freeze'
        })
      ]),
      React.createElement('circle', {
        key: 'circle',
        cx: '12',
        cy: '12',
        r: '3',
        strokeDasharray: '19',
        strokeDashoffset: '19'
      }, [
        React.createElement('animate', {
          key: 'animate2',
          attributeName: 'stroke-dashoffset',
          values: '19;0',
          begin: '0.6s',
          dur: '0.3s',
          fill: 'freeze'
        })
      ])
    ])
  ]);
};

// Upload Icon
const UploadIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'
      }),
      React.createElement('polyline', {
        key: 'polyline',
        points: '17 8 12 3 7 8'
      }, [
        React.createElement('animateTransform', {
          key: 'upload',
          attributeName: 'transform',
          type: 'translateY',
          values: '0;-3;0',
          dur: '1.5s',
          repeatCount: 'indefinite'
        })
      ]),
      React.createElement('line', {
        key: 'line',
        x1: '12',
        y1: '3',
        x2: '12',
        y2: '15'
      })
    ])
  ]);
};

// Rocket Icon  
const RocketIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'rocket',
        d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z'
      }),
      React.createElement('path', {
        key: 'body',
        d: 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'
      }, [
        React.createElement('animateTransform', {
          key: 'shake',
          attributeName: 'transform',
          type: 'rotate',
          values: '0;3;-3;0',
          dur: '0.6s',
          repeatCount: 'indefinite'
        })
      ]),
      React.createElement('path', {
        key: 'path3',
        d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'
      }),
      React.createElement('path', {
        key: 'path4',
        d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'
      })
    ])
  ]);
};

// Archive Icon
const ArchiveIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('rect', {
        key: 'box',
        width: '20',
        height: '5',
        x: '2',
        y: '3',
        rx: '1'
      }),
      React.createElement('path', {
        key: 'body',
        d: 'm4 8 16 0 0 9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z'
      }, [
        React.createElement('animateTransform', {
          key: 'compress',
          attributeName: 'transform',
          type: 'scaleY',
          values: '1;0.95;1',
          dur: '2s',
          repeatCount: 'indefinite'
        })
      ]),
      React.createElement('path', {
        key: 'arrow',
        d: 'm10 12 4 0'
      })
    ])
  ]);
};

// Copy Icon
const CopyIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('rect', {
        key: 'original',
        width: '14',
        height: '14',
        x: '8',
        y: '8',
        rx: '2',
        ry: '2'
      }),
      React.createElement('path', {
        key: 'copy',
        d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'
      }, [
        React.createElement('animateTransform', {
          key: 'slide',
          attributeName: 'transform',
          type: 'translate',
          values: '0,0;3,-3;0,0',
          dur: '1.5s',
          repeatCount: 'indefinite'
        })
      ])
    ])
  ]);
};

// Trash Icon
const TrashIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'lid',
        d: 'M3 6h18'
      }),
      React.createElement('path', {
        key: 'body',
        d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'
      }, [
        React.createElement('animateTransform', {
          key: 'shake',
          attributeName: 'transform',
          type: 'rotate',
          values: '0;2;-2;0',
          dur: '0.5s',
          repeatCount: 'indefinite'
        })
      ]),
      React.createElement('line', {
        key: 'line1',
        x1: '10',
        x2: '10',
        y1: '11',
        y2: '17'
      }),
      React.createElement('line', {
        key: 'line2', 
        x1: '14',
        x2: '14',
        y1: '11',
        y2: '17'
      })
    ])
  ]);
};

// Maximize Icon
const MaximizeIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    className
  }, [
    React.createElement('g', {
      key: 'g',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      React.createElement('path', {
        key: 'path1',
        d: 'M8 3H5a2 2 0 0 0-2 2v3'
      }, [
        React.createElement('animateTransform', {
          key: 'expand1',
          attributeName: 'transform',
          type: 'translate',
          values: '0,0;-2,-2;0,0',
          dur: '1s',
          repeatCount: 'indefinite'
        })
      ]),
      React.createElement('path', {
        key: 'path2',
        d: 'M21 8V5a2 2 0 0 0-2-2h-3'
      }, [
        React.createElement('animateTransform', {
          key: 'expand2',
          attributeName: 'transform',
          type: 'translate',
          values: '0,0;2,-2;0,0',
          dur: '1s',
          repeatCount: 'indefinite'
        })
      ]),
      React.createElement('path', {
        key: 'path3',
        d: 'M16 21h3a2 2 0 0 0 2-2v-3'
      }, [
        React.createElement('animateTransform', {
          key: 'expand3',
          attributeName: 'transform',
          type: 'translate',
          values: '0,0;2,2;0,0',
          dur: '1s',
          repeatCount: 'indefinite'
        })
      ]),
      React.createElement('path', {
        key: 'path4',
        d: 'M3 16v3a2 2 0 0 0 2 2h3'
      }, [
        React.createElement('animateTransform', {
          key: 'expand4',
          attributeName: 'transform',
          type: 'translate',
          values: '0,0;-2,2;0,0',
          dur: '1s',
          repeatCount: 'indefinite'
        })
      ])
    ])
  ]);
};

const MinimizeIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('polyline', { key: 'p1', points: '4 14 10 14 10 20' }, [React.createElement('animateTransform', { key: 'a1', attributeName: 'transform', type: 'translate', values: '0,0;1,-1;0,0', dur: '1s', repeatCount: 'indefinite' })]),
      React.createElement('polyline', { key: 'p2', points: '20 10 14 10 14 4' }, [React.createElement('animateTransform', { key: 'a2', attributeName: 'transform', type: 'translate', values: '0,0;-1,1;0,0', dur: '1s', repeatCount: 'indefinite' })]),
      React.createElement('line', { key: 'l1', x1: '14', x2: '21', y1: '10', y2: '3' }),
      React.createElement('line', { key: 'l2', x1: '3', x2: '10', y1: '21', y2: '14' })
    ])
  ]);
};

const RefreshIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('path', { key: 'path', d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' }, [React.createElement('animateTransform', { key: 'rotate', attributeName: 'transform', type: 'rotate', values: '0 12 12;360 12 12', dur: '2s', repeatCount: 'indefinite' })]),
      React.createElement('path', { key: 'path2', d: 'm21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' }),
      React.createElement('path', { key: 'arrow1', d: 'm17 8 4 0 0-4' }),
      React.createElement('path', { key: 'arrow2', d: 'm7 16-4 0 0 4' })
    ])
  ]);
};

const SignalIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('path', { key: 'p1', d: 'M2 20h.01' }),
      React.createElement('path', { key: 'p2', d: 'M7 20v-4' }, [React.createElement('animate', { key: 'a1', attributeName: 'opacity', values: '0.3;1;0.3', dur: '1s', repeatCount: 'indefinite', begin: '0s' })]),
      React.createElement('path', { key: 'p3', d: 'M12 20v-8' }, [React.createElement('animate', { key: 'a2', attributeName: 'opacity', values: '0.3;1;0.3', dur: '1s', repeatCount: 'indefinite', begin: '0.2s' })]),
      React.createElement('path', { key: 'p4', d: 'M17 20V8' }, [React.createElement('animate', { key: 'a3', attributeName: 'opacity', values: '0.3;1;0.3', dur: '1s', repeatCount: 'indefinite', begin: '0.4s' })]),
      React.createElement('path', { key: 'p5', d: 'M22 4v16' }, [React.createElement('animate', { key: 'a4', attributeName: 'opacity', values: '0.3;1;0.3', dur: '1s', repeatCount: 'indefinite', begin: '0.6s' })])
    ])
  ]);
};

const WiFiIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('path', { key: 'p1', d: 'M12 20h.01' }),
      React.createElement('path', { key: 'p2', d: 'M8.5 16.429a5 5 0 0 1 7 0' }, [React.createElement('animate', { key: 'a1', attributeName: 'opacity', values: '0.3;1;0.3', dur: '1.5s', repeatCount: 'indefinite', begin: '0.25s' })]),
      React.createElement('path', { key: 'p3', d: 'M5 12.859a10 10 0 0 1 14 0' }, [React.createElement('animate', { key: 'a2', attributeName: 'opacity', values: '0.3;1;0.3', dur: '1.5s', repeatCount: 'indefinite', begin: '0.5s' })])
    ])
  ]);
};

const FolderSyncIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('path', { key: 'folder', d: 'M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1' }),
      React.createElement('path', { key: 'sync1', d: 'M12 10.5c1.75-1.75 4.25-1.75 6 0v1m0-4l1.5 1.5L18 10.5' }, [React.createElement('animateTransform', { key: 'spin1', attributeName: 'transform', type: 'rotate', values: '0 15 12;360 15 12', dur: '2s', repeatCount: 'indefinite' })]),
      React.createElement('path', { key: 'sync2', d: 'M18 17.5c-1.75 1.75-4.25 1.75-6 0v-1m0 4l-1.5-1.5L12 17.5' })
    ])
  ]);
};

const FileCheckIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('path', { key: 'file', d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' }),
      React.createElement('path', { key: 'corner', d: 'M14 2v4a2 2 0 0 0 2 2h4' }),
      React.createElement('path', { key: 'check', d: 'm9 15 2 2 4-4', strokeDasharray: '8', strokeDashoffset: '8' }, [React.createElement('animate', { key: 'draw', attributeName: 'stroke-dashoffset', values: '8;0', dur: '0.6s', fill: 'freeze' })])
    ])
  ]);
};

const ClipboardCheckIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('rect', { key: 'board', width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1' }),
      React.createElement('path', { key: 'clip', d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
      React.createElement('path', { key: 'check', d: 'm9 14 2 2 4-4', strokeDasharray: '8', strokeDashoffset: '8' }, [React.createElement('animate', { key: 'draw', attributeName: 'stroke-dashoffset', values: '8;0', dur: '0.6s', fill: 'freeze' })])
    ])
  ]);
};

const ThumbsUpIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('path', { key: 'thumb', d: 'M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z' }, [React.createElement('animateTransform', { key: 'bounce', attributeName: 'transform', type: 'translateY', values: '0;-3;0', dur: '0.6s', repeatCount: 'indefinite' })])
    ])
  ]);
};

const AwardIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('circle', { key: 'medal', cx: '12', cy: '8', r: '6' }, [React.createElement('animateTransform', { key: 'glow', attributeName: 'transform', type: 'scale', values: '1;1.05;1', dur: '2s', repeatCount: 'indefinite' })]),
      React.createElement('path', { key: 'ribbon1', d: 'm9 12 2 2 4-4' }),
      React.createElement('path', { key: 'ribbon2', d: 'm8 14 1.5 6 4.5-2 4.5 2L20 14' }, [React.createElement('animateTransform', { key: 'sway', attributeName: 'transform', type: 'rotate', values: '0 12 14;3 12 14;-3 12 14;0 12 14', dur: '3s', repeatCount: 'indefinite' })])
    ])
  ]);
};

const ImageDownIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('path', { key: 'frame', d: 'M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21' }),
      React.createElement('circle', { key: 'dot', cx: '9', cy: '9', r: '2' }),
      React.createElement('g', { key: 'arrow' }, [
        React.createElement('path', { key: 'line', d: 'm14 19 3 3v-5.5' }, [React.createElement('animateTransform', { key: 'move', attributeName: 'transform', type: 'translateY', values: '0;2;0', dur: '1.5s', repeatCount: 'indefinite' })]),
        React.createElement('path', { key: 'point', d: 'm17 22 3-3' })
      ])
    ])
  ]);
};

const ChevronUpIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('path', { key: 'chevron', d: 'm18 15-6-6-6 6' }, [React.createElement('animateTransform', { key: 'bounce', attributeName: 'transform', type: 'translateY', values: '0;-2;0', dur: '1s', repeatCount: 'indefinite' })])
    ])
  ]);
};

const ChevronDownIcon = ({ size = 24, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) => {
  return React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', className }, [
    React.createElement('g', { key: 'g', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      React.createElement('path', { key: 'chevron', d: 'm6 9 6 6 6-6' }, [React.createElement('animateTransform', { key: 'bounce', attributeName: 'transform', type: 'translateY', values: '0;2;0', dur: '1s', repeatCount: 'indefinite' })])
    ])
  ]);
};

export const animatedIcons: IconItem[] = [
  // Loading & Progress
  {
    id: "animated-loading-loop",
    name: "Loading Loop",
    svg: LoadingLoopIcon,
    style: "animated",
    category: "Loading",
    tags: ["loading", "spinner", "progress", "wait", "processing", "busy", "loader", "circular"]
  },
  {
    id: "animated-spinner",
    name: "Spinner",
    svg: SpinnerIcon,
    style: "animated",
    category: "Loading",
    tags: ["spinner", "loading", "rotate", "circular", "progress", "wait"]
  },
  {
    id: "animated-progress",
    name: "Progress",
    svg: ProgressIcon,
    style: "animated",
    category: "Loading",
    tags: ["progress", "loading", "circle", "completion", "status"]
  },
  {
    id: "animated-dots-spinner",
    name: "Dots Spinner",
    svg: DotsSpinnerIcon,
    style: "animated",
    category: "Loading",
    tags: ["dots", "spinner", "loading", "pulse", "waiting"]
  },

  // Check & Success
  {
    id: "animated-check",
    name: "Check",
    svg: CheckIcon,
    style: "animated",
    category: "Actions",
    tags: ["check", "success", "done", "complete", "tick", "verify", "confirm", "approve"]
  },
  {
    id: "animated-check-all",
    name: "Check All",
    svg: CheckAllIcon,
    style: "animated",
    category: "Actions",
    tags: ["check", "complete", "done", "tick", "verify", "confirm", "approve", "multiple", "all"]
  },
  {
    id: "animated-check-circle",
    name: "Check Circle",
    svg: CheckCircleIcon,
    style: "animated",
    category: "Actions",
    tags: ["check", "circle", "success", "done", "complete", "verified"]
  },

  // Menu & Navigation
  {
    id: "animated-menu-to-close",
    name: "Menu to Close",
    svg: MenuToCloseIcon,
    style: "animated",
    category: "Navigation",
    tags: ["menu", "close", "hamburger", "toggle", "navigation", "mobile", "drawer", "sidebar"]
  },
  {
    id: "animated-menu",
    name: "Menu",
    svg: MenuIcon,
    style: "animated",
    category: "Navigation",
    tags: ["menu", "hamburger", "navigation", "lines", "bars"]
  },

  // Arrows
  {
    id: "animated-arrow-left",
    name: "Arrow Left",
    svg: ArrowLeftIcon,
    style: "animated",
    category: "Navigation",
    tags: ["arrow", "left", "back", "previous", "direction", "navigation"]
  },
  {
    id: "animated-arrow-right",
    name: "Arrow Right",
    svg: ArrowRightIcon,
    style: "animated",
    category: "Navigation",
    tags: ["arrow", "right", "forward", "next", "direction", "navigation"]
  },
  {
    id: "animated-arrow-up",
    name: "Arrow Up",
    svg: ArrowUpIcon,
    style: "animated",
    category: "Navigation",
    tags: ["arrow", "up", "top", "direction", "navigation", "scroll"]
  },
  {
    id: "animated-arrow-down",
    name: "Arrow Down",
    svg: ArrowDownIcon,
    style: "animated",
    category: "Navigation",
    tags: ["arrow", "down", "bottom", "direction", "navigation", "scroll"]
  },

  // Upload & Download
  {
    id: "animated-upload-loop",
    name: "Upload Loop",
    svg: UploadLoopIcon,
    style: "animated",
    category: "Loading",
    tags: ["upload", "loading", "progress", "file", "transfer", "send", "cloud", "import"]
  },
  {
    id: "animated-download",
    name: "Download",
    svg: DownloadIcon,
    style: "animated",
    category: "Actions",
    tags: ["download", "save", "file", "transfer", "get", "import", "arrow"]
  },

  // Heart & Social
  {
    id: "animated-heart-twotone",
    name: "Heart Twotone",
    svg: HeartTwotoneIcon,
    style: "animated",
    category: "Social",
    tags: ["heart", "like", "love", "favorite", "bookmark", "save", "emotion", "social"]
  },
  {
    id: "animated-heart",
    name: "Heart",
    svg: HeartIcon,
    style: "animated",
    category: "Social",
    tags: ["heart", "like", "love", "favorite", "emotion", "social"]
  },

  // Home & Location
  {
    id: "animated-home-twotone",
    name: "Home Twotone",
    svg: HomeTwotoneIcon,
    style: "animated",
    category: "Navigation",
    tags: ["home", "house", "dashboard", "main", "start", "building", "residence", "navigation"]
  },
  {
    id: "animated-home",
    name: "Home",
    svg: HomeIcon,
    style: "animated",
    category: "Navigation",
    tags: ["home", "house", "dashboard", "main", "start", "navigation"]
  },

  // Bell & Notification
  {
    id: "animated-bell",
    name: "Bell",
    svg: BellIcon,
    style: "animated",
    category: "Communication",
    tags: ["bell", "notification", "alert", "alarm", "reminder", "sound"]
  },
  {
    id: "animated-bell-ringing",
    name: "Bell Ringing",
    svg: BellRingingIcon,
    style: "animated",
    category: "Communication",
    tags: ["bell", "notification", "alert", "ringing", "alarm", "active", "sound"]
  },

  // Star & Rating
  {
    id: "animated-star",
    name: "Star",
    svg: StarIcon,
    style: "animated",
    category: "Social",
    tags: ["star", "favorite", "rating", "bookmark", "important", "quality"]
  },

  // Activity & Dashboard
  {
    id: "animated-activity",
    name: "Activity",
    svg: ActivityIcon,
    style: "animated",
    category: "Analytics",
    tags: ["activity", "chart", "graph", "analytics", "heartbeat", "pulse", "data"]
  },

  // Search
  {
    id: "animated-search",
    name: "Search",
    svg: SearchIcon,
    style: "animated",
    category: "Actions",
    tags: ["search", "find", "look", "magnifying", "glass", "discover"]
  },

  // Edit
  {
    id: "animated-edit",
    name: "Edit",
    svg: EditIcon,
    style: "animated",
    category: "Actions",
    tags: ["edit", "pencil", "write", "modify", "change", "update"]
  },

  // Settings
  {
    id: "animated-settings",
    name: "Settings",
    svg: SettingsIcon,
    style: "animated",
    category: "System",
    tags: ["settings", "gear", "config", "preferences", "options", "control"]
  },

  // Plus & Add
  {
    id: "animated-plus",
    name: "Plus",
    svg: PlusIcon,
    style: "animated",
    category: "Actions",
    tags: ["plus", "add", "create", "new", "cross", "increase"]
  },

  // Mail & Communication
  {
    id: "animated-mail",
    name: "Mail",
    svg: MailIcon,
    style: "animated",
    category: "Communication",
    tags: ["mail", "email", "message", "envelope", "send", "communication"]
  },

  // User & Profile
  {
    id: "animated-user",
    name: "User",
    svg: UserIcon,
    style: "animated",
    category: "User",
    tags: ["user", "person", "profile", "account", "avatar", "people"]
  },

  // Lock & Security
  {
    id: "animated-lock",
    name: "Lock",
    svg: LockIcon,
    style: "animated",
    category: "Security",
    tags: ["lock", "secure", "security", "protected", "private", "password"]
  },

  // Eye & Visibility
  {
    id: "animated-eye",
    name: "Eye",
    svg: EyeIcon,
    style: "animated",
    category: "Actions",
    tags: ["eye", "view", "see", "visible", "watch", "look", "visibility"]
  },

  // Upload & File Management
  {
    id: "animated-upload",
    name: "Upload",
    svg: UploadIcon,
    style: "animated", 
    category: "Actions",
    tags: ["upload", "file", "transfer", "send", "cloud", "arrow-up"]
  },
  {
    id: "animated-rocket",
    name: "Rocket",
    svg: RocketIcon,
    style: "animated",
    category: "Actions", 
    tags: ["rocket", "launch", "speed", "fast", "deploy", "startup"]
  },
  {
    id: "animated-archive",
    name: "Archive",
    svg: ArchiveIcon,
    style: "animated",
    category: "Files",
    tags: ["archive", "box", "storage", "compress", "save"]
  },
  {
    id: "animated-copy",
    name: "Copy", 
    svg: CopyIcon,
    style: "animated",
    category: "Actions",
    tags: ["copy", "duplicate", "clipboard", "clone"]
  },
  {
    id: "animated-trash",
    name: "Trash",
    svg: TrashIcon,
    style: "animated",
    category: "Actions", 
    tags: ["trash", "delete", "remove", "bin", "garbage"]
  },
  {
    id: "animated-maximize",
    name: "Maximize",
    svg: MaximizeIcon,
    style: "animated",
    category: "Interface",
    tags: ["maximize", "expand", "fullscreen", "resize", "window"]
  },
  {
    id: "animated-minimize",
    name: "Minimize", 
    svg: MinimizeIcon,
    style: "animated",
    category: "Interface",
    tags: ["minimize", "reduce", "compress", "shrink", "window"]
  },
  {
    id: "animated-refresh",
    name: "Refresh",
    svg: RefreshIcon,
    style: "animated", 
    category: "Actions",
    tags: ["refresh", "reload", "update", "sync", "rotate"]
  },
  {
    id: "animated-signal",
    name: "Signal",
    svg: SignalIcon,
    style: "animated",
    category: "System",
    tags: ["signal", "network", "connection", "bars", "strength"]
  },
  {
    id: "animated-wifi",
    name: "WiFi High",
    svg: WiFiIcon,
    style: "animated", 
    category: "System",
    tags: ["wifi", "wireless", "internet", "connection", "network"]
  },
  {
    id: "animated-folder-sync",
    name: "Folder Sync",
    svg: FolderSyncIcon,
    style: "animated",
    category: "Files",
    tags: ["folder", "sync", "synchronize", "cloud", "backup"]
  },
  {
    id: "animated-file-check",
    name: "File Check",
    svg: FileCheckIcon,
    style: "animated",
    category: "Files", 
    tags: ["file", "check", "complete", "done", "verified"]
  },
  {
    id: "animated-clipboard-check",
    name: "Clipboard Check",
    svg: ClipboardCheckIcon,
    style: "animated",
    category: "Actions",
    tags: ["clipboard", "check", "task", "complete", "done"]
  },
  {
    id: "animated-thumbs-up", 
    name: "Thumbs Up",
    svg: ThumbsUpIcon,
    style: "animated",
    category: "Actions",
    tags: ["thumbs", "up", "like", "approve", "positive", "good"]
  },
  {
    id: "animated-award",
    name: "Award",
    svg: AwardIcon,
    style: "animated", 
    category: "Actions",
    tags: ["award", "trophy", "achievement", "winner", "medal"]
  },
  {
    id: "animated-image-down",
    name: "Image Down", 
    svg: ImageDownIcon,
    style: "animated",
    category: "Media",
    tags: ["image", "download", "picture", "photo", "save"]
  },
  {
    id: "animated-chevron-up",
    name: "Chevron Up",
    svg: ChevronUpIcon,
    style: "animated",
    category: "Navigation",
    tags: ["chevron", "up", "arrow", "expand", "show"]
  },
  {
    id: "animated-chevron-down", 
    name: "Chevron Down",
    svg: ChevronDownIcon,
    style: "animated",
    category: "Navigation",
    tags: ["chevron", "down", "arrow", "collapse", "hide"]
  }
];