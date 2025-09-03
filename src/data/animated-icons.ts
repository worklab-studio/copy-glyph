import React from 'react';
import { type IconItem } from "@/types/icon";

// Animated icon components using proper React/JSX syntax
const CheckAllIcon = ({ size = 24, color = "currentColor", className = "", ...props }: any) => {
  return React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    ...props
  }, 
    React.createElement('g', {
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    },
      React.createElement('path', {
        d: "M2 13.5l4 4l10.75 -10.75",
        strokeDasharray: "24",
        strokeDashoffset: "24"
      },
        React.createElement('animate', {
          attributeName: "stroke-dashoffset",
          values: "24;0",
          dur: "0.4s",
          fill: "freeze"
        })
      ),
      React.createElement('path', {
        d: "M7.5 13.5l4 4l10.75 -10.75",
        strokeDasharray: "24",
        strokeDashoffset: "24"
      },
        React.createElement('animate', {
          attributeName: "stroke-dashoffset",
          values: "24;0",
          begin: "0.4s",
          dur: "0.4s",
          fill: "freeze"
        })
      )
    )
  );
};

const MenuToCloseIcon = ({ size = 24, color = "currentColor", className = "", ...props }: any) => {
  return React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    ...props
  },
    React.createElement('g', {
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    },
      React.createElement('path', {
        d: "M5 12H19",
        opacity: "1"
      },
        React.createElement('animate', {
          attributeName: "d",
          values: "M5 12H19;M12 12H12",
          dur: "0.4s",
          fill: "freeze"
        }),
        React.createElement('set', {
          attributeName: "opacity",
          to: "0",
          begin: "0.4s",
          fill: "freeze"
        })
      ),
      React.createElement('path', {
        d: "M5 5L19 5M5 19L19 19",
        opacity: "0"
      },
        React.createElement('animate', {
          attributeName: "d",
          values: "M5 5L19 5M5 19L19 19;M5 5L19 19M5 19L19 5",
          begin: "0.2s",
          dur: "0.4s",
          fill: "freeze"
        }),
        React.createElement('set', {
          attributeName: "opacity",
          to: "1",
          begin: "0.2s",
          fill: "freeze"
        })
      )
    )
  );
};

const LoadingLoopIcon = ({ size = 24, color = "currentColor", className = "", ...props }: any) => {
  return React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    ...props
  },
    React.createElement('g', {
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    },
      React.createElement('path', {
        d: "M12 3c4.97 0 9 4.03 9 9",
        strokeDasharray: "16",
        strokeDashoffset: "16"
      },
        React.createElement('animate', {
          attributeName: "stroke-dashoffset",
          values: "16;0",
          dur: "0.2s",
          fill: "freeze"
        }),
        React.createElement('animateTransform', {
          attributeName: "transform",
          type: "rotate",
          values: "0 12 12;360 12 12",
          dur: "1.5s",
          repeatCount: "indefinite"
        })
      )
    )
  );
};

const UploadLoopIcon = ({ size = 24, color = "currentColor", className = "", ...props }: any) => {
  return React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    ...props
  },
    React.createElement('g', {
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    },
      React.createElement('path', {
        d: "M12 15v-6m0 0l-3 3m3-3l3 3",
        strokeDasharray: "20",
        strokeDashoffset: "20"
      },
        React.createElement('animate', {
          attributeName: "stroke-dashoffset",
          values: "20;0",
          dur: "0.4s",
          fill: "freeze"
        }),
        React.createElement('animate', {
          attributeName: "d",
          values: "M12 15v-6m0 0l-3 3m3-3l3 3;M12 15v-3m0 0l-3 3m3-3l3 3;M12 15v-6m0 0l-3 3m3-3l3 3",
          begin: "0.5s",
          dur: "1.5s",
          repeatCount: "indefinite"
        })
      ),
      React.createElement('path', {
        d: "M6 19h12",
        strokeDasharray: "14",
        strokeDashoffset: "14"
      },
        React.createElement('animate', {
          attributeName: "stroke-dashoffset",
          values: "14;0",
          begin: "0.5s",
          dur: "0.2s",
          fill: "freeze"
        })
      )
    )
  );
};

const HeartTwotoneIcon = ({ size = 24, color = "currentColor", className = "", ...props }: any) => {
  return React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    ...props
  },
    React.createElement('path', {
      d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
      fill: color,
      fillOpacity: "0"
    },
      React.createElement('animate', {
        attributeName: "fill-opacity",
        values: "0;0.3",
        begin: "0.7s",
        dur: "0.15s",
        fill: "freeze"
      })
    ),
    React.createElement('path', {
      d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeDasharray: "32",
      strokeDashoffset: "32"
    },
      React.createElement('animate', {
        attributeName: "stroke-dashoffset",
        values: "32;0",
        dur: "0.7s",
        fill: "freeze"
      })
    )
  );
};

const HomeTwotoneIcon = ({ size = 24, color = "currentColor", className = "", ...props }: any) => {
  return React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className,
    ...props
  },
    React.createElement('path', {
      d: "M10 13h4v8h-4Z",
      fill: color,
      fillOpacity: "0"
    },
      React.createElement('animate', {
        attributeName: "fill-opacity",
        values: "0;0.3",
        begin: "1.1s",
        dur: "0.15s",
        fill: "freeze"
      })
    ),
    React.createElement('g', {
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    },
      React.createElement('path', {
        d: "M4.5 21.5h15",
        strokeDasharray: "16",
        strokeDashoffset: "16"
      },
        React.createElement('animate', {
          attributeName: "stroke-dashoffset",
          values: "16;0",
          dur: "0.2s",
          fill: "freeze"
        })
      ),
      React.createElement('path', {
        d: "M4.5 21.5v-13.5M19.5 21.5v-13.5",
        strokeDasharray: "16",
        strokeDashoffset: "16"
      },
        React.createElement('animate', {
          attributeName: "stroke-dashoffset",
          values: "16;0",
          begin: "0.2s",
          dur: "0.2s",
          fill: "freeze"
        })
      ),
      React.createElement('path', {
        d: "M2 10l10 -8l10 8",
        strokeDasharray: "28",
        strokeDashoffset: "28"
      },
        React.createElement('animate', {
          attributeName: "stroke-dashoffset",
          values: "28;0",
          begin: "0.4s",
          dur: "0.4s",
          fill: "freeze"
        })
      ),
      React.createElement('path', {
        d: "M9.5 21.5v-9h5v9",
        strokeDasharray: "24",
        strokeDashoffset: "24"
      },
        React.createElement('animate', {
          attributeName: "stroke-dashoffset",
          values: "24;0",
          begin: "0.7s",
          dur: "0.4s",
          fill: "freeze"
        })
      )
    )
  );
};

export const animatedIcons: IconItem[] = [
  {
    id: "animated-check-all",
    name: "Check All",
    svg: CheckAllIcon,
    style: "animated",
    category: "Actions",
    tags: ["check", "complete", "done", "tick", "verify", "confirm", "approve", "multiple", "all"]
  },
  {
    id: "animated-menu-to-close",
    name: "Menu to Close",
    svg: MenuToCloseIcon,
    style: "animated",
    category: "Navigation",
    tags: ["menu", "close", "hamburger", "toggle", "navigation", "mobile", "drawer", "sidebar"]
  },
  {
    id: "animated-loading-loop",
    name: "Loading Loop",
    svg: LoadingLoopIcon,
    style: "animated",
    category: "Loading",
    tags: ["loading", "spinner", "progress", "wait", "processing", "busy", "loader", "circular"]
  },
  {
    id: "animated-upload-loop",
    name: "Upload Loop",
    svg: UploadLoopIcon,
    style: "animated",
    category: "Loading",
    tags: ["upload", "loading", "progress", "file", "transfer", "send", "cloud", "import"]
  },
  {
    id: "animated-heart-twotone",
    name: "Heart Twotone",
    svg: HeartTwotoneIcon,
    style: "animated",
    category: "Social",
    tags: ["heart", "like", "love", "favorite", "bookmark", "save", "emotion", "social"]
  },
  {
    id: "animated-home-twotone",
    name: "Home Twotone",
    svg: HomeTwotoneIcon,
    style: "animated",
    category: "Navigation",
    tags: ["home", "house", "dashboard", "main", "start", "building", "residence", "navigation"]
  }
];