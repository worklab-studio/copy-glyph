import { type ComponentType } from 'react';
import { type IconItem } from '@/types/icon';
// Import comprehensive set of popular Bootstrap icons
import { 
  // Navigation & Arrows
  ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ArrowUpRight, ArrowDownLeft,
  ArrowUpLeft, ArrowDownRight, ArrowClockwise, ArrowCounterclockwise,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronDoubleLeft,
  ChevronDoubleRight, ChevronDoubleUp, ChevronDoubleDown, ChevronBarLeft,
  ChevronBarRight, ChevronBarUp, ChevronBarDown, CaretLeft, CaretRight,
  CaretUp, CaretDown, CaretLeftFill, CaretRightFill, CaretUpFill, CaretDownFill,
  
  // Basic Actions
  Plus, Dash, X, Check, CheckCircle, CheckSquare, XCircle, XSquare,
  PlusCircle, PlusSquare, DashCircle, DashSquare, Search, ZoomIn, ZoomOut,
  
  // Home & Navigation
  House, HouseFill, Grid, Grid3x3, List, ThreeDots, ThreeDotsVertical,
  MenuButton, MenuButtonWide, Justify, JustifyLeft, JustifyRight,
  
  // Communication
  Envelope, EnvelopeFill, EnvelopeOpen, EnvelopeOpenFill, Telephone,
  TelephoneFill, Chat, ChatFill, ChatDots, ChatDotsFill, Bell, BellFill,
  
  // Media & Entertainment
  Play, PlayFill, Pause, PauseFill, Stop, StopFill, SkipStart, SkipEnd,
  SkipForward, SkipBackward, VolumeUp, VolumeDown, VolumeMute, VolumeOff,
  Camera, CameraFill, CameraVideo, CameraVideoFill, Image, ImageFill,
  MusicNote, MusicNoteBeamed, Headphones,
  
  // Files & Documents
  File, FileFill, FileText, FileTextFill, FileEarmark, FileEarmarkText,
  FileEarmarkFill, Folder, FolderFill, Folder2, Folder2Open, Archive,
  ArchiveFill, Download, Upload, Save, SaveFill, CloudDownload, CloudUpload,
  
  // System & Tools
  Gear, GearFill, Tools, Wrench, Hammer, Screwdriver, Nut, Sliders,
  Toggles, Power, Wifi, WifiOff, Battery, BatteryFull, BatteryHalf,
  
  // Users & Social
  Person, PersonFill, People, PeopleFill, PersonCircle, PersonSquare,
  PersonBadge, PersonCheck, PersonPlus, PersonDash, PersonX, Heart,
  HeartFill, Star, StarFill, StarHalf, Share, ShareFill, HandThumbsUp,
  HandThumbsDown, HandThumbsUpFill, HandThumbsDownFill,
  
  // Security & Privacy
  Lock, LockFill, Unlock, UnlockFill, Key, KeyFill, Shield, ShieldFill,
  ShieldCheck, ShieldX, Eye, EyeFill, EyeSlash, EyeSlashFill,
  
  // Time & Calendar
  Calendar, CalendarFill, Calendar2, Calendar2Fill, Calendar3, Calendar3Fill,
  CalendarEvent, CalendarEventFill, Clock, ClockFill, Stopwatch, StopwatchFill,
  Hourglass, HourglassSplit, HourglassTop, HourglassBottom, AlarmFill,
  
  // Weather & Environment
  Sun, SunFill, Moon, MoonFill, Cloud, CloudFill, CloudRain, CloudRainFill,
  CloudSnow, CloudSnowFill, Lightning, LightningFill, Thermometer,
  ThermometerHalf, ThermometerSun, ThermometerSnow,
  
  // Location & Maps
  Geo, GeoFill, GeoAlt, GeoAltFill, Map, Compass, CompassFill, Globe,
  Globe2, Signpost, SignpostFill, Building, BuildingFill, HouseDoor,
  HouseDoorFill, Tree, TreeFill,
  
  // Commerce & Shopping
  Cart, CartFill, Cart2, Cart3, Cart4, Bag, BagFill, BagCheck, BagCheckFill,
  BagPlus, BagPlusFill, BagDash, BagDashFill, Tag, TagFill, Tags, TagsFill,
  Receipt, ReceiptCutoff, CreditCard, CreditCardFill, Wallet, WalletFill,
  CurrencyDollar, CurrencyEuro, CurrencyPound, CurrencyYen,
  
  // Devices & Technology
  Phone, PhoneFill, Tablet, TabletFill, Laptop, LaptopFill, Tv, TvFill,
  Display, DisplayFill, Printer, PrinterFill, Keyboard, KeyboardFill,
  Mouse, MouseFill, Headset, Router, RouterFill, Usb, UsbFill,
  
  // Text & Typography
  Type, TypeBold, TypeItalic, TypeUnderline, TypeStrikethrough, Fonts,
  TextCenter, TextLeft, TextRight, Paragraph,
  
  // Alerts & Status
  ExclamationTriangle, ExclamationTriangleFill, ExclamationCircle, ExclamationCircleFill,
  QuestionCircle, QuestionCircleFill, InfoCircle, InfoCircleFill, CheckCircleFill,
  XCircleFill, Flag, FlagFill, Award, AwardFill, Trophy, TrophyFill,
  
  // Code & Development
  Code, CodeSlash, Terminal, TerminalFill, Bug, BugFill, Braces, BracesAsterisk,
  FileCode, FileCodeFill, Hash, At,
  
  // Health & Medical
  Bandaid, BandaidFill, Capsule,
  
  // Transportation
  CarFrontFill, Truck, BusFront, Bicycle, Airplane, AirplaneEngines,
  TrainFront, FuelPump, FuelPumpFill,
  
  // Brands & Social Media
  Github, Twitter, Facebook, Instagram, Linkedin, Youtube, Whatsapp,
  
  // Miscellaneous
  Lightbulb, LightbulbFill, Gift, GiftFill, Bookmark, BookmarkFill,
  PinMap, PinMapFill, Palette, PaletteFill, Puzzle, PuzzleFill,
  Dice1, Dice2, Dice3, Dice4, Dice5, Dice6
} from 'react-bootstrap-icons';

// Comprehensive list of Bootstrap icons
const manualBootstrapIcons = [
  // Navigation & Arrows
  { name: 'ArrowRight', component: ArrowRight },
  { name: 'ArrowLeft', component: ArrowLeft },
  { name: 'ArrowUp', component: ArrowUp },
  { name: 'ArrowDown', component: ArrowDown },
  { name: 'ArrowUpRight', component: ArrowUpRight },
  { name: 'ArrowDownLeft', component: ArrowDownLeft },
  { name: 'ArrowUpLeft', component: ArrowUpLeft },
  { name: 'ArrowDownRight', component: ArrowDownRight },
  { name: 'ArrowClockwise', component: ArrowClockwise },
  { name: 'ArrowCounterclockwise', component: ArrowCounterclockwise },
  { name: 'ChevronLeft', component: ChevronLeft },
  { name: 'ChevronRight', component: ChevronRight },
  { name: 'ChevronUp', component: ChevronUp },
  { name: 'ChevronDown', component: ChevronDown },
  { name: 'ChevronDoubleLeft', component: ChevronDoubleLeft },
  { name: 'ChevronDoubleRight', component: ChevronDoubleRight },
  { name: 'ChevronDoubleUp', component: ChevronDoubleUp },
  { name: 'ChevronDoubleDown', component: ChevronDoubleDown },
  { name: 'ChevronBarLeft', component: ChevronBarLeft },
  { name: 'ChevronBarRight', component: ChevronBarRight },
  { name: 'ChevronBarUp', component: ChevronBarUp },
  { name: 'ChevronBarDown', component: ChevronBarDown },
  { name: 'CaretLeft', component: CaretLeft },
  { name: 'CaretRight', component: CaretRight },
  { name: 'CaretUp', component: CaretUp },
  { name: 'CaretDown', component: CaretDown },
  { name: 'CaretLeftFill', component: CaretLeftFill },
  { name: 'CaretRightFill', component: CaretRightFill },
  { name: 'CaretUpFill', component: CaretUpFill },
  { name: 'CaretDownFill', component: CaretDownFill },
  
  // Basic Actions
  { name: 'Plus', component: Plus },
  { name: 'Dash', component: Dash },
  { name: 'X', component: X },
  { name: 'Check', component: Check },
  { name: 'CheckCircle', component: CheckCircle },
  { name: 'CheckSquare', component: CheckSquare },
  { name: 'XCircle', component: XCircle },
  { name: 'XSquare', component: XSquare },
  { name: 'PlusCircle', component: PlusCircle },
  { name: 'PlusSquare', component: PlusSquare },
  { name: 'DashCircle', component: DashCircle },
  { name: 'DashSquare', component: DashSquare },
  { name: 'Search', component: Search },
  { name: 'ZoomIn', component: ZoomIn },
  { name: 'ZoomOut', component: ZoomOut },
  
  // Home & Navigation
  { name: 'House', component: House },
  { name: 'HouseFill', component: HouseFill },
  { name: 'Grid', component: Grid },
  { name: 'Grid3x3', component: Grid3x3 },
  { name: 'List', component: List },
  { name: 'ThreeDots', component: ThreeDots },
  { name: 'ThreeDotsVertical', component: ThreeDotsVertical },
  { name: 'MenuButton', component: MenuButton },
  { name: 'MenuButtonWide', component: MenuButtonWide },
  { name: 'Justify', component: Justify },
  { name: 'JustifyLeft', component: JustifyLeft },
  { name: 'JustifyRight', component: JustifyRight },
  
  // Communication
  { name: 'Envelope', component: Envelope },
  { name: 'EnvelopeFill', component: EnvelopeFill },
  { name: 'EnvelopeOpen', component: EnvelopeOpen },
  { name: 'EnvelopeOpenFill', component: EnvelopeOpenFill },
  { name: 'Telephone', component: Telephone },
  { name: 'TelephoneFill', component: TelephoneFill },
  { name: 'Chat', component: Chat },
  { name: 'ChatFill', component: ChatFill },
  { name: 'ChatDots', component: ChatDots },
  { name: 'ChatDotsFill', component: ChatDotsFill },
  { name: 'Bell', component: Bell },
  { name: 'BellFill', component: BellFill },
  
  // Media & Entertainment
  { name: 'Play', component: Play },
  { name: 'PlayFill', component: PlayFill },
  { name: 'Pause', component: Pause },
  { name: 'PauseFill', component: PauseFill },
  { name: 'Stop', component: Stop },
  { name: 'StopFill', component: StopFill },
  { name: 'SkipStart', component: SkipStart },
  { name: 'SkipEnd', component: SkipEnd },
  { name: 'SkipForward', component: SkipForward },
  { name: 'SkipBackward', component: SkipBackward },
  { name: 'VolumeUp', component: VolumeUp },
  { name: 'VolumeDown', component: VolumeDown },
  { name: 'VolumeMute', component: VolumeMute },
  { name: 'VolumeOff', component: VolumeOff },
  { name: 'Camera', component: Camera },
  { name: 'CameraFill', component: CameraFill },
  { name: 'CameraVideo', component: CameraVideo },
  { name: 'CameraVideoFill', component: CameraVideoFill },
  { name: 'Image', component: Image },
  { name: 'ImageFill', component: ImageFill },
  { name: 'MusicNote', component: MusicNote },
  { name: 'MusicNoteBeamed', component: MusicNoteBeamed },
  { name: 'Headphones', component: Headphones },
  
  // Files & Documents
  { name: 'File', component: File },
  { name: 'FileFill', component: FileFill },
  { name: 'FileText', component: FileText },
  { name: 'FileTextFill', component: FileTextFill },
  { name: 'FileEarmark', component: FileEarmark },
  { name: 'FileEarmarkText', component: FileEarmarkText },
  { name: 'FileEarmarkFill', component: FileEarmarkFill },
  { name: 'Folder', component: Folder },
  { name: 'FolderFill', component: FolderFill },
  { name: 'Folder2', component: Folder2 },
  { name: 'Folder2Open', component: Folder2Open },
  { name: 'Archive', component: Archive },
  { name: 'ArchiveFill', component: ArchiveFill },
  { name: 'Download', component: Download },
  { name: 'Upload', component: Upload },
  { name: 'Save', component: Save },
  { name: 'SaveFill', component: SaveFill },
  { name: 'CloudDownload', component: CloudDownload },
  { name: 'CloudUpload', component: CloudUpload },
  
  // System & Tools
  { name: 'Gear', component: Gear },
  { name: 'GearFill', component: GearFill },
  { name: 'Tools', component: Tools },
  { name: 'Wrench', component: Wrench },
  { name: 'Hammer', component: Hammer },
  { name: 'Screwdriver', component: Screwdriver },
  { name: 'Nut', component: Nut },
  { name: 'Sliders', component: Sliders },
  { name: 'Toggles', component: Toggles },
  { name: 'Power', component: Power },
  { name: 'Wifi', component: Wifi },
  { name: 'WifiOff', component: WifiOff },
  { name: 'Battery', component: Battery },
  { name: 'BatteryFull', component: BatteryFull },
  { name: 'BatteryHalf', component: BatteryHalf },
  
  // Users & Social
  { name: 'Person', component: Person },
  { name: 'PersonFill', component: PersonFill },
  { name: 'People', component: People },
  { name: 'PeopleFill', component: PeopleFill },
  { name: 'PersonCircle', component: PersonCircle },
  { name: 'PersonSquare', component: PersonSquare },
  { name: 'PersonBadge', component: PersonBadge },
  { name: 'PersonCheck', component: PersonCheck },
  { name: 'PersonPlus', component: PersonPlus },
  { name: 'PersonDash', component: PersonDash },
  { name: 'PersonX', component: PersonX },
  { name: 'Heart', component: Heart },
  { name: 'HeartFill', component: HeartFill },
  { name: 'Star', component: Star },
  { name: 'StarFill', component: StarFill },
  { name: 'StarHalf', component: StarHalf },
  { name: 'Share', component: Share },
  { name: 'ShareFill', component: ShareFill },
  { name: 'HandThumbsUp', component: HandThumbsUp },
  { name: 'HandThumbsDown', component: HandThumbsDown },
  { name: 'HandThumbsUpFill', component: HandThumbsUpFill },
  { name: 'HandThumbsDownFill', component: HandThumbsDownFill },
  
  // Security & Privacy
  { name: 'Lock', component: Lock },
  { name: 'LockFill', component: LockFill },
  { name: 'Unlock', component: Unlock },
  { name: 'UnlockFill', component: UnlockFill },
  { name: 'Key', component: Key },
  { name: 'KeyFill', component: KeyFill },
  { name: 'Shield', component: Shield },
  { name: 'ShieldFill', component: ShieldFill },
  { name: 'ShieldCheck', component: ShieldCheck },
  { name: 'ShieldX', component: ShieldX },
  { name: 'Eye', component: Eye },
  { name: 'EyeFill', component: EyeFill },
  { name: 'EyeSlash', component: EyeSlash },
  { name: 'EyeSlashFill', component: EyeSlashFill },
  
  // Time & Calendar
  { name: 'Calendar', component: Calendar },
  { name: 'CalendarFill', component: CalendarFill },
  { name: 'Calendar2', component: Calendar2 },
  { name: 'Calendar2Fill', component: Calendar2Fill },
  { name: 'Calendar3', component: Calendar3 },
  { name: 'Calendar3Fill', component: Calendar3Fill },
  { name: 'CalendarEvent', component: CalendarEvent },
  { name: 'CalendarEventFill', component: CalendarEventFill },
  { name: 'Clock', component: Clock },
  { name: 'ClockFill', component: ClockFill },
  { name: 'Stopwatch', component: Stopwatch },
  { name: 'StopwatchFill', component: StopwatchFill },
  { name: 'Hourglass', component: Hourglass },
  { name: 'HourglassSplit', component: HourglassSplit },
  { name: 'HourglassTop', component: HourglassTop },
  { name: 'HourglassBottom', component: HourglassBottom },
  { name: 'AlarmFill', component: AlarmFill },
  
  // Weather & Environment
  { name: 'Sun', component: Sun },
  { name: 'SunFill', component: SunFill },
  { name: 'Moon', component: Moon },
  { name: 'MoonFill', component: MoonFill },
  { name: 'Cloud', component: Cloud },
  { name: 'CloudFill', component: CloudFill },
  { name: 'CloudRain', component: CloudRain },
  { name: 'CloudRainFill', component: CloudRainFill },
  { name: 'CloudSnow', component: CloudSnow },
  { name: 'CloudSnowFill', component: CloudSnowFill },
  { name: 'Lightning', component: Lightning },
  { name: 'LightningFill', component: LightningFill },
  { name: 'Thermometer', component: Thermometer },
  { name: 'ThermometerHalf', component: ThermometerHalf },
  { name: 'ThermometerSun', component: ThermometerSun },
  { name: 'ThermometerSnow', component: ThermometerSnow },
  
  // Location & Maps
  { name: 'Geo', component: Geo },
  { name: 'GeoFill', component: GeoFill },
  { name: 'GeoAlt', component: GeoAlt },
  { name: 'GeoAltFill', component: GeoAltFill },
  { name: 'Map', component: Map },
  { name: 'Compass', component: Compass },
  { name: 'CompassFill', component: CompassFill },
  { name: 'Globe', component: Globe },
  { name: 'Globe2', component: Globe2 },
  { name: 'Signpost', component: Signpost },
  { name: 'SignpostFill', component: SignpostFill },
  { name: 'Building', component: Building },
  { name: 'BuildingFill', component: BuildingFill },
  { name: 'HouseDoor', component: HouseDoor },
  { name: 'HouseDoorFill', component: HouseDoorFill },
  { name: 'Tree', component: Tree },
  { name: 'TreeFill', component: TreeFill },
  
  // Commerce & Shopping
  { name: 'Cart', component: Cart },
  { name: 'CartFill', component: CartFill },
  { name: 'Cart2', component: Cart2 },
  { name: 'Cart3', component: Cart3 },
  { name: 'Cart4', component: Cart4 },
  { name: 'Bag', component: Bag },
  { name: 'BagFill', component: BagFill },
  { name: 'BagCheck', component: BagCheck },
  { name: 'BagCheckFill', component: BagCheckFill },
  { name: 'BagPlus', component: BagPlus },
  { name: 'BagPlusFill', component: BagPlusFill },
  { name: 'BagDash', component: BagDash },
  { name: 'BagDashFill', component: BagDashFill },
  { name: 'Tag', component: Tag },
  { name: 'TagFill', component: TagFill },
  { name: 'Tags', component: Tags },
  { name: 'TagsFill', component: TagsFill },
  { name: 'Receipt', component: Receipt },
  { name: 'ReceiptCutoff', component: ReceiptCutoff },
  { name: 'CreditCard', component: CreditCard },
  { name: 'CreditCardFill', component: CreditCardFill },
  { name: 'Wallet', component: Wallet },
  { name: 'WalletFill', component: WalletFill },
  { name: 'CurrencyDollar', component: CurrencyDollar },
  { name: 'CurrencyEuro', component: CurrencyEuro },
  { name: 'CurrencyPound', component: CurrencyPound },
  { name: 'CurrencyYen', component: CurrencyYen },
  
  // Devices & Technology
  { name: 'Phone', component: Phone },
  { name: 'PhoneFill', component: PhoneFill },
  { name: 'Tablet', component: Tablet },
  { name: 'TabletFill', component: TabletFill },
  { name: 'Laptop', component: Laptop },
  { name: 'LaptopFill', component: LaptopFill },
  { name: 'Tv', component: Tv },
  { name: 'TvFill', component: TvFill },
  { name: 'Display', component: Display },
  { name: 'DisplayFill', component: DisplayFill },
  { name: 'Printer', component: Printer },
  { name: 'PrinterFill', component: PrinterFill },
  { name: 'Keyboard', component: Keyboard },
  { name: 'KeyboardFill', component: KeyboardFill },
  { name: 'Mouse', component: Mouse },
  { name: 'MouseFill', component: MouseFill },
  { name: 'Headset', component: Headset },
  { name: 'Router', component: Router },
  { name: 'RouterFill', component: RouterFill },
  { name: 'Usb', component: Usb },
  { name: 'UsbFill', component: UsbFill },
  
  // Text & Typography
  { name: 'Type', component: Type },
  { name: 'TypeBold', component: TypeBold },
  { name: 'TypeItalic', component: TypeItalic },
  { name: 'TypeUnderline', component: TypeUnderline },
  { name: 'TypeStrikethrough', component: TypeStrikethrough },
  { name: 'Fonts', component: Fonts },
  { name: 'TextCenter', component: TextCenter },
  { name: 'TextLeft', component: TextLeft },
  { name: 'TextRight', component: TextRight },
  { name: 'Paragraph', component: Paragraph },
  
  // Alerts & Status
  { name: 'ExclamationTriangle', component: ExclamationTriangle },
  { name: 'ExclamationTriangleFill', component: ExclamationTriangleFill },
  { name: 'ExclamationCircle', component: ExclamationCircle },
  { name: 'ExclamationCircleFill', component: ExclamationCircleFill },
  { name: 'QuestionCircle', component: QuestionCircle },
  { name: 'QuestionCircleFill', component: QuestionCircleFill },
  { name: 'InfoCircle', component: InfoCircle },
  { name: 'InfoCircleFill', component: InfoCircleFill },
  { name: 'CheckCircleFill', component: CheckCircleFill },
  { name: 'XCircleFill', component: XCircleFill },
  { name: 'Flag', component: Flag },
  { name: 'FlagFill', component: FlagFill },
  { name: 'Award', component: Award },
  { name: 'AwardFill', component: AwardFill },
  { name: 'Trophy', component: Trophy },
  { name: 'TrophyFill', component: TrophyFill },
  
  // Code & Development
  { name: 'Code', component: Code },
  { name: 'CodeSlash', component: CodeSlash },
  { name: 'Terminal', component: Terminal },
  { name: 'TerminalFill', component: TerminalFill },
  { name: 'Bug', component: Bug },
  { name: 'BugFill', component: BugFill },
  { name: 'Braces', component: Braces },
  { name: 'BracesAsterisk', component: BracesAsterisk },
  { name: 'FileCode', component: FileCode },
  { name: 'FileCodeFill', component: FileCodeFill },
  { name: 'Hash', component: Hash },
  { name: 'At', component: At },
  
  // Health & Medical
  { name: 'Bandaid', component: Bandaid },
  { name: 'BandaidFill', component: BandaidFill },
  { name: 'Capsule', component: Capsule },
  
  // Transportation
  { name: 'CarFrontFill', component: CarFrontFill },
  { name: 'Truck', component: Truck },
  { name: 'BusFront', component: BusFront },
  { name: 'Bicycle', component: Bicycle },
  { name: 'Airplane', component: Airplane },
  { name: 'AirplaneEngines', component: AirplaneEngines },
  { name: 'TrainFront', component: TrainFront },
  { name: 'FuelPump', component: FuelPump },
  { name: 'FuelPumpFill', component: FuelPumpFill },
  
  // Brands & Social Media
  { name: 'Github', component: Github },
  { name: 'Twitter', component: Twitter },
  { name: 'Facebook', component: Facebook },
  { name: 'Instagram', component: Instagram },
  { name: 'Linkedin', component: Linkedin },
  { name: 'Youtube', component: Youtube },
  { name: 'Whatsapp', component: Whatsapp },
  
  // Miscellaneous
  { name: 'Lightbulb', component: Lightbulb },
  { name: 'LightbulbFill', component: LightbulbFill },
  { name: 'Gift', component: Gift },
  { name: 'GiftFill', component: GiftFill },
  { name: 'Bookmark', component: Bookmark },
  { name: 'BookmarkFill', component: BookmarkFill },
  { name: 'PinMap', component: PinMap },
  { name: 'PinMapFill', component: PinMapFill },
  { name: 'Palette', component: Palette },
  { name: 'PaletteFill', component: PaletteFill },
  { name: 'Puzzle', component: Puzzle },
  { name: 'PuzzleFill', component: PuzzleFill },
  { name: 'Dice1', component: Dice1 },
  { name: 'Dice2', component: Dice2 },
  { name: 'Dice3', component: Dice3 },
  { name: 'Dice4', component: Dice4 },
  { name: 'Dice5', component: Dice5 },
  { name: 'Dice6', component: Dice6 },
];

// Category mapping for Bootstrap icons
const getCategoryFromName = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('arrow') || lowerName.includes('chevron') || lowerName.includes('navigation') || lowerName.includes('menu') || lowerName.includes('house') || lowerName.includes('compass')) return 'navigation';
  if (lowerName.includes('envelope') || lowerName.includes('telephone') || lowerName.includes('chat') || lowerName.includes('bell') || lowerName.includes('megaphone') || lowerName.includes('broadcast')) return 'communication';
  if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('music') || lowerName.includes('volume') || lowerName.includes('camera') || lowerName.includes('film') || lowerName.includes('image') || lowerName.includes('mic')) return 'media';
  if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('archive') || lowerName.includes('download') || lowerName.includes('upload') || lowerName.includes('save') || lowerName.includes('document')) return 'files';
  if (lowerName.includes('gear') || lowerName.includes('tools') || lowerName.includes('wrench') || lowerName.includes('nut') || lowerName.includes('hammer') || lowerName.includes('screwdriver')) return 'system';
  if (lowerName.includes('currency') || lowerName.includes('cash') || lowerName.includes('credit') || lowerName.includes('piggy') || lowerName.includes('wallet') || lowerName.includes('coin')) return 'finance';
  if (lowerName.includes('heart') || lowerName.includes('star') || lowerName.includes('share') || lowerName.includes('thumb') || lowerName.includes('hand') || lowerName.includes('suit')) return 'social';
  if (lowerName.includes('person') || lowerName.includes('people') || lowerName.includes('user') || lowerName.includes('contact') || lowerName.includes('team') || lowerName.includes('group')) return 'users';
  if (lowerName.includes('lock') || lowerName.includes('key') || lowerName.includes('shield') || lowerName.includes('eye') || lowerName.includes('security') || lowerName.includes('safe')) return 'security';
  if (lowerName.includes('calendar') || lowerName.includes('clock') || lowerName.includes('watch') || lowerName.includes('alarm') || lowerName.includes('stopwatch') || lowerName.includes('hourglass')) return 'time';
  if (lowerName.includes('cloud') || lowerName.includes('sun') || lowerName.includes('moon') || lowerName.includes('brightness') || lowerName.includes('snow') || lowerName.includes('rain')) return 'weather';
  if (lowerName.includes('geo') || lowerName.includes('map') || lowerName.includes('pin') || lowerName.includes('globe') || lowerName.includes('building') || lowerName.includes('signpost')) return 'location';
  if (lowerName.includes('plus') || lowerName.includes('dash') || lowerName.includes('x') || lowerName.includes('check') || lowerName.includes('search') || lowerName.includes('zoom')) return 'actions';
  if (lowerName.includes('exclamation') || lowerName.includes('question') || lowerName.includes('info') || lowerName.includes('patch')) return 'alerts';
  if (lowerName.includes('cart') || lowerName.includes('bag') || lowerName.includes('shop') || lowerName.includes('basket') || lowerName.includes('tag') || lowerName.includes('receipt')) return 'commerce';
  if (lowerName.includes('device') || lowerName.includes('phone') || lowerName.includes('laptop') || lowerName.includes('display') || lowerName.includes('tablet') || lowerName.includes('tv')) return 'devices';
  if (lowerName.includes('bootstrap') || lowerName.includes('github') || lowerName.includes('twitter') || lowerName.includes('facebook') || lowerName.includes('google') || lowerName.includes('linkedin')) return 'brands';
  if (lowerName.includes('emoji') || lowerName.includes('dice') || lowerName.includes('suit') || lowerName.includes('controller') || lowerName.includes('puzzle')) return 'entertainment';
  if (lowerName.includes('type') || lowerName.includes('text') || lowerName.includes('fonts') || lowerName.includes('justify') || lowerName.includes('indent') || lowerName.includes('list')) return 'typography';
  
  return 'general';
};

export const bootstrapIcons: IconItem[] = manualBootstrapIcons.map(({ name, component }) => {
  const category = getCategoryFromName(name);
  
  // Add tags based on icon name patterns
  const tags = [
    name.toLowerCase(),
    category,
    'bootstrap',
    'outline',
    ...(name.includes('Arrow') ? ['arrow', 'navigation'] : []),
    ...(name.includes('Check') ? ['check', 'success'] : []),
    ...(name.includes('X') ? ['close', 'cancel'] : []),
    ...(name.includes('Plus') ? ['add', 'create'] : []),
    ...(name.includes('Dash') ? ['remove', 'subtract'] : []),
    ...(name.includes('Search') ? ['find', 'lookup'] : []),
    ...(name.includes('Star') ? ['favorite', 'rating'] : []),
    ...(name.includes('Heart') ? ['love', 'like'] : []),
    ...(name.includes('House') ? ['home', 'main'] : []),
    ...(name.includes('Person') ? ['user', 'profile'] : []),
    ...(name.includes('Gear') ? ['settings', 'configure'] : []),
    ...(name.includes('Bell') ? ['notification', 'alert'] : []),
    ...(name.includes('Envelope') ? ['email', 'message'] : []),
    ...(name.includes('Calendar') ? ['date', 'schedule'] : []),
    ...(name.includes('Clock') ? ['time', 'schedule'] : []),
    ...(name.includes('Lock') ? ['secure', 'private'] : []),
    ...(name.includes('Eye') ? ['view', 'visibility'] : []),
    ...(name.includes('Cart') ? ['shopping', 'purchase'] : []),
    ...(name.includes('File') ? ['document', 'storage'] : []),
    ...(name.includes('Folder') ? ['directory', 'storage'] : []),
  ];

  return {
    id: `bootstrap-${name.toLowerCase()}`,
    name,
    svg: component as ComponentType<any>,
    style: 'outline',
    category,
    tags: [...new Set(tags)]
  };
}).sort((a, b) => a.name.localeCompare(b.name));