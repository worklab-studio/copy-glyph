import { type IconItem } from "@/types/icon";
import * as Iconoir from "iconoir-react";

// Cast the imported icons to the correct type
const IconoirIcons = Iconoir as any;

export const iconoirIcons: IconItem[] = [
  // Navigation
  { id: "iconoir-home", name: "Home", svg: IconoirIcons.HomeSimple, category: "navigation", tags: ["home", "house", "main"] },
  { id: "iconoir-nav-arrow-up", name: "Nav Arrow Up", svg: IconoirIcons.NavArrowUp, category: "navigation", tags: ["arrow", "up", "navigation"] },
  { id: "iconoir-nav-arrow-down", name: "Nav Arrow Down", svg: IconoirIcons.NavArrowDown, category: "navigation", tags: ["arrow", "down", "navigation"] },
  { id: "iconoir-nav-arrow-left", name: "Nav Arrow Left", svg: IconoirIcons.NavArrowLeft, category: "navigation", tags: ["arrow", "left", "navigation"] },
  { id: "iconoir-nav-arrow-right", name: "Nav Arrow Right", svg: IconoirIcons.NavArrowRight, category: "navigation", tags: ["arrow", "right", "navigation"] },
  { id: "iconoir-menu", name: "Menu", svg: IconoirIcons.Menu, category: "navigation", tags: ["menu", "hamburger", "navigation"] },
  { id: "iconoir-home-simple", name: "Home Simple", svg: IconoirIcons.HomeSimple, category: "navigation", tags: ["home", "house"] },
  { id: "iconoir-dashboard", name: "Dashboard", svg: IconoirIcons.Dashboard, category: "navigation", tags: ["dashboard", "grid", "layout"] },
  
  // Actions
  { id: "iconoir-add-circle", name: "Add Circle", svg: IconoirIcons.AddCircle, category: "actions", tags: ["add", "plus", "create", "new"] },
  { id: "iconoir-add-square", name: "Add Square", svg: IconoirIcons.AddSquare, category: "actions", tags: ["add", "plus", "create", "new"] },
  { id: "iconoir-cancel", name: "Cancel", svg: IconoirIcons.Cancel, category: "actions", tags: ["cancel", "close", "x", "delete"] },
  { id: "iconoir-check", name: "Check", svg: IconoirIcons.Check, category: "actions", tags: ["check", "checkmark", "done", "complete"] },
  { id: "iconoir-check-circle", name: "Check Circle", svg: IconoirIcons.CheckCircle, category: "actions", tags: ["check", "checkmark", "done", "complete"] },
  { id: "iconoir-close", name: "Close", svg: IconoirIcons.Cancel, category: "actions", tags: ["close", "x", "cancel"] },
  { id: "iconoir-delete", name: "Delete", svg: IconoirIcons.Trash, category: "actions", tags: ["delete", "trash", "remove"] },
  { id: "iconoir-edit", name: "Edit", svg: IconoirIcons.EditPencil, category: "actions", tags: ["edit", "pencil", "modify"] },
  { id: "iconoir-save", name: "Save", svg: IconoirIcons.FloppyDisk, category: "actions", tags: ["save", "disk", "store"] },
  { id: "iconoir-copy", name: "Copy", svg: IconoirIcons.Copy, category: "actions", tags: ["copy", "duplicate"] },
  { id: "iconoir-paste", name: "Paste", svg: IconoirIcons.Paste, category: "actions", tags: ["paste", "clipboard"] },
  { id: "iconoir-refresh", name: "Refresh", svg: IconoirIcons.Refresh, category: "actions", tags: ["refresh", "reload", "sync"] },
  { id: "iconoir-download", name: "Download", svg: IconoirIcons.Download, category: "actions", tags: ["download", "save", "export"] },
  { id: "iconoir-upload", name: "Upload", svg: IconoirIcons.Upload, category: "actions", tags: ["upload", "import", "send"] },
  
  // Communication
  { id: "iconoir-mail", name: "Mail", svg: IconoirIcons.Mail, category: "communication", tags: ["mail", "email", "message"] },
  { id: "iconoir-send", name: "Send", svg: IconoirIcons.Send, category: "communication", tags: ["send", "arrow", "message"] },
  { id: "iconoir-chat-bubble", name: "Chat Bubble", svg: IconoirIcons.ChatBubble, category: "communication", tags: ["chat", "bubble", "message"] },
  { id: "iconoir-phone", name: "Phone", svg: IconoirIcons.Phone, category: "communication", tags: ["phone", "call", "telephone"] },
  { id: "iconoir-message", name: "Message", svg: IconoirIcons.Message, category: "communication", tags: ["message", "chat", "text"] },
  
  // Media
  { id: "iconoir-play", name: "Play", svg: IconoirIcons.Play, category: "media", tags: ["play", "start", "video"] },
  { id: "iconoir-pause", name: "Pause", svg: IconoirIcons.Pause, category: "media", tags: ["pause", "stop", "video"] },
  { id: "iconoir-stop", name: "Stop", svg: IconoirIcons.Stop, category: "media", tags: ["stop", "halt", "video"] },
  { id: "iconoir-skip-next", name: "Skip Next", svg: IconoirIcons.SkipNext, category: "media", tags: ["skip", "next", "forward"] },
  { id: "iconoir-skip-prev", name: "Skip Previous", svg: IconoirIcons.SkipPrev, category: "media", tags: ["skip", "previous", "back"] },
  { id: "iconoir-volume-high", name: "Volume High", svg: IconoirIcons.VolumeHigh, category: "media", tags: ["volume", "sound", "audio"] },
  { id: "iconoir-volume-off", name: "Volume Off", svg: IconoirIcons.VolumeOff, category: "media", tags: ["volume", "mute", "sound"] },
  { id: "iconoir-camera", name: "Camera", svg: IconoirIcons.Camera, category: "media", tags: ["camera", "photo", "picture"] },
  { id: "iconoir-video", name: "Video", svg: IconoirIcons.VideoCamera, category: "media", tags: ["video", "camera", "record"] },
  { id: "iconoir-image", name: "Image", svg: IconoirIcons.MediaImage, category: "media", tags: ["image", "picture", "photo"] },
  
  // Files & Documents
  { id: "iconoir-folder", name: "Folder", svg: IconoirIcons.Folder, category: "files", tags: ["folder", "directory", "files"] },
  { id: "iconoir-file", name: "File", svg: IconoirIcons.Page, category: "files", tags: ["file", "document", "page"] },
  { id: "iconoir-document", name: "Document", svg: IconoirIcons.Page, category: "files", tags: ["document", "file", "text"] },
  { id: "iconoir-pdf", name: "PDF", svg: IconoirIcons.Page, category: "files", tags: ["pdf", "document", "file"] },
  { id: "iconoir-archive", name: "Archive", svg: IconoirIcons.Archive, category: "files", tags: ["archive", "zip", "compress"] },
  
  // User & Profile
  { id: "iconoir-user", name: "User", svg: IconoirIcons.User, category: "user", tags: ["user", "person", "profile"] },
  { id: "iconoir-profile", name: "Profile", svg: IconoirIcons.ProfileCircle, category: "user", tags: ["profile", "user", "account"] },
  { id: "iconoir-group", name: "Group", svg: IconoirIcons.Group, category: "user", tags: ["group", "users", "team"] },
  { id: "iconoir-avatar", name: "Avatar", svg: IconoirIcons.User, category: "user", tags: ["avatar", "user", "profile"] },
  
  // System & Settings
  { id: "iconoir-settings", name: "Settings", svg: IconoirIcons.Settings, category: "system", tags: ["settings", "gear", "preferences"] },
  { id: "iconoir-gear", name: "Gear", svg: IconoirIcons.Settings, category: "system", tags: ["gear", "settings", "config"] },
  { id: "iconoir-lock", name: "Lock", svg: IconoirIcons.Lock, category: "system", tags: ["lock", "secure", "password"] },
  { id: "iconoir-unlock", name: "Unlock", svg: IconoirIcons.LockOpen, category: "system", tags: ["unlock", "open", "access"] },
  { id: "iconoir-shield", name: "Shield", svg: IconoirIcons.Shield, category: "system", tags: ["shield", "security", "protection"] },
  { id: "iconoir-eye", name: "Eye", svg: IconoirIcons.Eye, category: "system", tags: ["eye", "view", "visible"] },
  { id: "iconoir-eye-off", name: "Eye Off", svg: IconoirIcons.EyeClosed, category: "system", tags: ["eye", "hidden", "invisible"] },
  { id: "iconoir-key", name: "Key", svg: IconoirIcons.Key, category: "system", tags: ["key", "password", "access"] },
  
  // Shopping & Commerce
  { id: "iconoir-cart", name: "Cart", svg: IconoirIcons.Cart, category: "commerce", tags: ["cart", "shopping", "buy"] },
  { id: "iconoir-bag", name: "Bag", svg: IconoirIcons.Bag, category: "commerce", tags: ["bag", "shopping", "purchase"] },
  { id: "iconoir-credit-card", name: "Credit Card", svg: IconoirIcons.CreditCard, category: "commerce", tags: ["credit", "card", "payment"] },
  { id: "iconoir-wallet", name: "Wallet", svg: IconoirIcons.Wallet, category: "commerce", tags: ["wallet", "money", "payment"] },
  { id: "iconoir-coin", name: "Coin", svg: IconoirIcons.Coin, category: "commerce", tags: ["coin", "money", "currency"] },
  
  // Time & Calendar
  { id: "iconoir-calendar", name: "Calendar", svg: IconoirIcons.Calendar, category: "time", tags: ["calendar", "date", "schedule"] },
  { id: "iconoir-clock", name: "Clock", svg: IconoirIcons.Clock, category: "time", tags: ["clock", "time", "watch"] },
  { id: "iconoir-timer", name: "Timer", svg: IconoirIcons.Timer, category: "time", tags: ["timer", "stopwatch", "time"] },
  { id: "iconoir-alarm", name: "Alarm", svg: IconoirIcons.AlarmClock, category: "time", tags: ["alarm", "clock", "reminder"] },
  
  // Weather & Nature
  { id: "iconoir-sun", name: "Sun", svg: IconoirIcons.Sun, category: "weather", tags: ["sun", "sunny", "weather"] },
  { id: "iconoir-moon", name: "Moon", svg: IconoirIcons.Moon, category: "weather", tags: ["moon", "night", "dark"] },
  { id: "iconoir-cloud", name: "Cloud", svg: IconoirIcons.Cloud, category: "weather", tags: ["cloud", "weather", "sky"] },
  { id: "iconoir-rain", name: "Rain", svg: IconoirIcons.Rain, category: "weather", tags: ["rain", "weather", "water"] },
  { id: "iconoir-snow", name: "Snow", svg: IconoirIcons.Snow, category: "weather", tags: ["snow", "weather", "winter"] },
  { id: "iconoir-lightning", name: "Lightning", svg: IconoirIcons.Lightning, category: "weather", tags: ["lightning", "storm", "weather"] },
  { id: "iconoir-star", name: "Star", svg: IconoirIcons.Star, category: "weather", tags: ["star", "favorite", "rating"] },
  
  // Tools & Technology
  { id: "iconoir-search", name: "Search", svg: IconoirIcons.Search, category: "tools", tags: ["search", "find", "magnify"] },
  { id: "iconoir-filter", name: "Filter", svg: IconoirIcons.Filter, category: "tools", tags: ["filter", "sort", "organize"] },
  { id: "iconoir-sort", name: "Sort", svg: IconoirIcons.SortDown, category: "tools", tags: ["sort", "order", "arrange"] },
  { id: "iconoir-code", name: "Code", svg: IconoirIcons.Code, category: "tools", tags: ["code", "programming", "development"] },
  { id: "iconoir-terminal", name: "Terminal", svg: IconoirIcons.Terminal, category: "tools", tags: ["terminal", "console", "command"] },
  { id: "iconoir-database", name: "Database", svg: IconoirIcons.Database, category: "tools", tags: ["database", "data", "storage"] },
  { id: "iconoir-server", name: "Server", svg: IconoirIcons.Server, category: "tools", tags: ["server", "hosting", "cloud"] },
  { id: "iconoir-wifi", name: "WiFi", svg: IconoirIcons.Wifi, category: "tools", tags: ["wifi", "wireless", "internet"] },
  { id: "iconoir-bluetooth", name: "Bluetooth", svg: IconoirIcons.Bluetooth, category: "tools", tags: ["bluetooth", "wireless", "connection"] },
  { id: "iconoir-battery", name: "Battery", svg: IconoirIcons.Battery75, category: "tools", tags: ["battery", "power", "energy"] },
  { id: "iconoir-cpu", name: "CPU", svg: IconoirIcons.Cpu, category: "tools", tags: ["cpu", "processor", "chip"] },
  { id: "iconoir-memory", name: "Memory", svg: IconoirIcons.Ram, category: "tools", tags: ["memory", "ram", "storage"] },
  
  // Social & Communication
  { id: "iconoir-heart", name: "Heart", svg: IconoirIcons.Heart, category: "social", tags: ["heart", "love", "like"] },
  { id: "iconoir-share", name: "Share", svg: IconoirIcons.Share, category: "social", tags: ["share", "social", "send"] },
  { id: "iconoir-link", name: "Link", svg: IconoirIcons.Link, category: "social", tags: ["link", "url", "connection"] },
  { id: "iconoir-bookmark", name: "Bookmark", svg: IconoirIcons.Bookmark, category: "social", tags: ["bookmark", "save", "favorite"] },
  { id: "iconoir-thumbs-up", name: "Thumbs Up", svg: IconoirIcons.ThumbsUp, category: "social", tags: ["thumbs", "up", "like"] },
  { id: "iconoir-thumbs-down", name: "Thumbs Down", svg: IconoirIcons.ThumbsDown, category: "social", tags: ["thumbs", "down", "dislike"] },
  
  // Transportation
  { id: "iconoir-car", name: "Car", svg: IconoirIcons.Car, category: "transportation", tags: ["car", "vehicle", "transport"] },
  { id: "iconoir-bus", name: "Bus", svg: IconoirIcons.Bus, category: "transportation", tags: ["bus", "transport", "public"] },
  { id: "iconoir-train", name: "Train", svg: IconoirIcons.Train, category: "transportation", tags: ["train", "transport", "rail"] },
  { id: "iconoir-plane", name: "Plane", svg: IconoirIcons.Plane, category: "transportation", tags: ["plane", "flight", "travel"] },
  { id: "iconoir-bicycle", name: "Bicycle", svg: IconoirIcons.Bicycle, category: "transportation", tags: ["bicycle", "bike", "cycle"] },
  { id: "iconoir-walking", name: "Walking", svg: IconoirIcons.Walking, category: "transportation", tags: ["walking", "pedestrian", "foot"] },
  
  // Health & Medical
  { id: "iconoir-heart-rate", name: "Heart Rate", svg: IconoirIcons.Activity, category: "health", tags: ["heart", "rate", "health"] },
  { id: "iconoir-pill", name: "Pill", svg: IconoirIcons.Pill, category: "health", tags: ["pill", "medicine", "health"] },
  { id: "iconoir-bandage", name: "Bandage", svg: IconoirIcons.Bandage, category: "health", tags: ["bandage", "medical", "first aid"] },
  { id: "iconoir-hospital", name: "Hospital", svg: IconoirIcons.Hospital, category: "health", tags: ["hospital", "medical", "health"] },
  
  // Sports & Recreation
  { id: "iconoir-ball", name: "Ball", svg: IconoirIcons.Basketball, category: "sports", tags: ["ball", "sport", "game"] },
  { id: "iconoir-trophy", name: "Trophy", svg: IconoirIcons.Trophy, category: "sports", tags: ["trophy", "award", "winner"] },
  { id: "iconoir-medal", name: "Medal", svg: IconoirIcons.Medal, category: "sports", tags: ["medal", "award", "achievement"] },
  { id: "iconoir-target", name: "Target", svg: IconoirIcons.Target, category: "sports", tags: ["target", "goal", "aim"] },
  
  // Food & Dining
  { id: "iconoir-coffee", name: "Coffee", svg: IconoirIcons.Coffee, category: "food", tags: ["coffee", "drink", "beverage"] },
  { id: "iconoir-wine", name: "Wine", svg: IconoirIcons.Wine, category: "food", tags: ["wine", "drink", "alcohol"] },
  { id: "iconoir-pizza", name: "Pizza", svg: IconoirIcons.Pizza, category: "food", tags: ["pizza", "food", "meal"] },
  { id: "iconoir-hamburger", name: "Hamburger", svg: IconoirIcons.Burger, category: "food", tags: ["hamburger", "burger", "food"] },
  
  // Education & Learning
  { id: "iconoir-book", name: "Book", svg: IconoirIcons.Book, category: "education", tags: ["book", "read", "education"] },
  { id: "iconoir-graduation", name: "Graduation", svg: IconoirIcons.GraduationCap, category: "education", tags: ["graduation", "education", "school"] },
  { id: "iconoir-school", name: "School", svg: IconoirIcons.School, category: "education", tags: ["school", "education", "learning"] },
  { id: "iconoir-pencil", name: "Pencil", svg: IconoirIcons.Pencil, category: "education", tags: ["pencil", "write", "draw"] },
  
  // Location & Maps
  { id: "iconoir-map", name: "Map", svg: IconoirIcons.Map, category: "location", tags: ["map", "location", "navigation"] },
  { id: "iconoir-pin", name: "Pin", svg: IconoirIcons.MapPin, category: "location", tags: ["pin", "location", "marker"] },
  { id: "iconoir-compass", name: "Compass", svg: IconoirIcons.Compass, category: "location", tags: ["compass", "direction", "navigation"] },
  { id: "iconoir-globe", name: "Globe", svg: IconoirIcons.Globe, category: "location", tags: ["globe", "world", "earth"] },
  
  // Gaming
  { id: "iconoir-gamepad", name: "Gamepad", svg: IconoirIcons.Gamepad, category: "gaming", tags: ["gamepad", "controller", "gaming"] },
  { id: "iconoir-dice", name: "Dice", svg: IconoirIcons.Dice, category: "gaming", tags: ["dice", "game", "random"] },
  { id: "iconoir-puzzle", name: "Puzzle", svg: IconoirIcons.Puzzle, category: "gaming", tags: ["puzzle", "game", "piece"] },
  
  // Business & Finance
  { id: "iconoir-chart", name: "Chart", svg: IconoirIcons.BarChart, category: "business", tags: ["chart", "graph", "data"] },
  { id: "iconoir-pie-chart", name: "Pie Chart", svg: IconoirIcons.PieChart, category: "business", tags: ["pie", "chart", "data"] },
  { id: "iconoir-trending-up", name: "Trending Up", svg: IconoirIcons.TrendingUp, category: "business", tags: ["trending", "up", "growth"] },
  { id: "iconoir-trending-down", name: "Trending Down", svg: IconoirIcons.TrendingDown, category: "business", tags: ["trending", "down", "decline"] },
  { id: "iconoir-briefcase", name: "Briefcase", svg: IconoirIcons.Briefcase, category: "business", tags: ["briefcase", "work", "business"] },
  { id: "iconoir-building", name: "Building", svg: IconoirIcons.Building, category: "business", tags: ["building", "office", "business"] }
];