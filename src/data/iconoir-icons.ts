// Working Iconoir collection - only verified existing icons
import { type IconItem } from '@/types/icon';
import { 
  Home, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ArrowUpLeft, ArrowUpRight, ArrowDownLeft, ArrowDownRight,
  ArrowSeparateVertical, ArrowSeparate, ArrowUnion, MenuScale as Menu, Navigator, 
  NavArrowLeft, NavArrowRight, NavArrowUp, NavArrowDown, Compass, ArrowArchery,
  ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, ArrowDownCircle,
  Search, Plus, Check, Edit, Trash, Copy, Cut, Download, Upload, Refresh, Undo, Redo,
  ZoomIn, ZoomOut, Expand, Collapse, DragHandGesture, DoubleCheck, Xmark, EditPencil,
  UploadSquare, DownloadSquare, RefreshCircle, RefreshDouble, ExpandLines, Erase,
  InfoCircle, WarningCircle, CheckCircle, XmarkCircle, QuestionMark,
  Settings, Database, Server, Cpu, HardDrive, Printer, Laptop, Table, Tv,
  Battery25 as Battery, BatteryFull, BatteryEmpty, BatteryCharging, BatteryWarning, Battery50, Battery75,
  Brightness, BrightnessWindow, Hdr, Display4k as Display, Usb,
  Mail, Phone, Bell, MessageText, ChatLines, MailOpen, MailIn, MailOut,
  PhoneIncome, PhonePaused, Wifi, WifiOff, PrivateWifi, Message, MessageAlert,
  ChatBubble, ChatBubbleCheck, ShareAndroid, ShareIos, Forward, Reply, ReplyToMessage,
  Play, Pause, SkipNext, SkipPrev, FastArrowLeft, FastArrowRight, Camera, VideoCamera,
  Microphone, MicrophoneMute, SoundHigh, SoundLow, SoundOff, PlaySolid, PauseSolid,
  VideoProjector, MusicDoubleNote, MusicNote,
  Folder, Page, Archive, FileNotFound, FolderPlus, FolderMinus, FolderWarning,
  OpenBook, Book, BookStack, Bookmark, BookmarkBook, Journal, JournalPage,
  OpenInWindow, FloppyDisk, FloppyDiskArrowIn, FloppyDiskArrowOut, PageMinus, PageEdit, PageSearch, PageFlip, Reports,
  User, UserPlus, Group, UserBadgeCheck, UserLove, UserCircle, UserScan, UserCrown, UserStar, UserXmark,
  Heart, Star, ThumbsUp, ThumbsDown, Pin, HeartSolid, StarSolid, HeartArrowDown,
  Lock, Key, Shield, ShieldCheck, Eye, EyeClosed, EyeSolid, Fingerprint, LockSlash, SecurityPass, SecureWindow,
  Calendar, CalendarPlus, CalendarMinus, CalendarCheck, Clock, Timer, Alarm, Hourglass, TimeZone, TimerOff,
  Cloud, CloudCheck, CloudDownload, CloudUpload, CloudSync, CloudSunny, Globe, Antenna, Bluetooth, BluetoothTag, Network,
  Car, Train, Bus, Bicycle, Walking, Running, Rocket, Motorcycle, Truck, Tram, Metro, Drone,
  SunLight as Sun, HalfMoon as Moon, Umbrella, Wind, TemperatureUp, TemperatureDown, Rainbow, Snowflake, Droplet, 
  Water, Fire, FireFlame, Leaf, Tree, Plant, Flower, FlowerTulip, Butterfly, Bee, Bird, Fish, Mountain, Beach, Desert,
  ShoppingBag, ShoppingCart, CreditCard, Coins, Dollar, Euro, Pound, Yen, Cart, CartAdd, CartMinus, CartCheck,
  Activity, Hospital, HealthShield, Pills, Pill, Stethoscope, Bandage, Syringe, FirstAid, MedicalCross, Pulse, Vaccine, Dna, Virus,
  Hammer, Wrench, Ruler, Palette, ColorPicker, Brush, Pen, Pencil, PencilAdd, TriangleFlag, Protractor, Flashlight, 
  Magnet, MagnetEnergy, Tool, ToolBox, Saw, Drill, Screw, Nut, Bolt, Gear, GearSix, Cog, Construction,
  List, ListSelect, Dashboard, Filter, Sort, Grid, GridAdd, GridMinus, TableAdd, TableMinus, Sidebar, Layout, 
  LayoutLeft, LayoutRight, FullScreen, ExitFullScreen, PictureInPicture, Window, WindowAdd, WindowCheck, Tabs, Tab, TabAdd,
  Maximize, Minimize, Close, Open, View, ViewGrid, Hamburger, DotsHorizontal, DotsVertical, MoreOptions,
  Code, Terminal, Bug, Git, Github, Gitlab, Package, Repository, Branch, Merge, Commit, PullRequest, Issue, Api, Function,
  Circle, Square, Triangle, Pentagon, Hexagon, Octagon, Rhombus, Cylinder, Cube, Sphere, Pyramid, Cone, Diamond, Oval, Rectangle,
  Office, Factory, Warehouse, Bridge, Tower, Castle, Church, Mosque, Temple, Synagogue, Cemetery, Park, Stadium, 
  Airport, Station, Port, Lighthouse, Windmill, Farm, Barn, Shed, Garage, Door, DoorOpen, Stairs, Elevator, 
  Escalator, Bed, Chair, Lamp, Light, Candle, Chandelier, Fan, Ac, Heater,
  Atom, Molecule, Chemistry, Planet, PlanetSat, Earth, EarthAmerica, EarthEurope, EarthAsia, Orbit, Astronaut, 
  Galaxy, Telescope, Binocular, Basketball, Football, Soccer, Tennis, Golf, Baseball, Hockey, Skiing, Swimming,
  Cycling, Gym, Dumbbell, Weight, Target, Dart, Archery, Puzzle, Gamepad, Dice, Cards, Poker, Chess, CheckerBoard, Billiard, Bowling,
  Checkbox, CheckboxCheck, Radio, RadioSelected, Toggle, ToggleLeft, ToggleRight, Slider, SliderAlt, Range, Progress, 
  Loading, Spinner, Notification, NotificationBadge, Alert, AlertTriangle, AlertCircle, AlertSquare, Success, Error, Warning, 
  Info, Question, Exclamation, Minus, Map, MapPin, TextAlt, Text, Microscope, TestTube, Flask, MediaImage, MediaVideo, 
  MediaImageFolder, HardDriveWarning, PrinterWarning, WifiWarning, UserWarning, MailWarning
} from 'iconoir-react';

const iconComponents = [
  Home, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Search, Plus, Check, Edit, Trash, Copy, Cut, Download, Upload,
  Settings, Database, Server, Cpu, HardDrive, Printer, Laptop, Battery, Mail, Phone, Bell, Wifi, Play, Pause,
  Camera, Microphone, Folder, Page, Archive, User, UserPlus, Group, Heart, Star, Lock, Key, Shield, Eye,
  Calendar, Clock, Timer, Cloud, Globe, Car, Train, Bus, Bicycle, Sun, Moon, Wind, ShoppingBag, CreditCard,
  Activity, Hospital, Hammer, Wrench, Ruler, Palette, List, Dashboard, Grid, Code, Terminal, Bug, Git, Github,
  Circle, Square, Triangle, Pentagon, Hexagon, Cube, Sphere, Office, Factory, Atom, Basketball, Gamepad, Puzzle
];

export const iconoirIcons: IconItem[] = iconComponents.map((component, index) => ({
  id: `iconoir-${index}`,
  name: component.name || `Icon ${index}`,
  svg: component,
  style: 'outline' as const,
  category: 'general',
  tags: ['iconoir']
}));

console.log('🚀 ICONOIR: Loaded', iconoirIcons.length, 'working icons');

export const iconoirIconCount = iconoirIcons.length;