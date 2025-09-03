import { type IconItem } from "@/types/icon";
import { iconMap } from "../../atlas";

// Helper function to extract category from icon name
function extractCategory(name: string): string {
  const categoryMappings: Record<string, string[]> = {
    "achievement": ["achievement", "award", "medal", "trophy", "badge", "crown", "star", "diploma", "certificate", "reward"],
    "activity": ["activity", "sport", "game", "play", "ball", "fitness", "exercise", "run", "bike", "swim"],
    "arrow": ["arrow", "direction", "navigate", "point", "chevron", "caret"],
    "business": ["business", "office", "work", "corporate", "meeting", "briefcase", "chart", "graph"],
    "calendar": ["calendar", "date", "time", "schedule", "event", "day", "month", "year"],
    "communication": ["communication", "message", "chat", "mail", "phone", "call", "contact", "speak"],
    "design": ["design", "creative", "art", "brush", "paint", "color", "palette", "draw"],
    "device": ["device", "phone", "mobile", "tablet", "computer", "laptop", "desktop", "screen"],
    "document": ["document", "file", "paper", "report", "text", "pdf", "note", "write"],
    "ecommerce": ["ecommerce", "shop", "store", "cart", "buy", "sell", "product", "price", "money"],
    "emoji": ["emoji", "emotion", "face", "smile", "happy", "sad", "laugh", "cry"],
    "finance": ["finance", "money", "bank", "credit", "payment", "coin", "dollar", "euro"],
    "food": ["food", "eat", "drink", "meal", "restaurant", "cook", "kitchen", "fruit"],
    "health": ["health", "medical", "doctor", "hospital", "medicine", "heart", "cross", "pill"],
    "home": ["home", "house", "building", "room", "furniture", "bed", "chair", "table"],
    "location": ["location", "map", "place", "pin", "marker", "gps", "navigation", "route"],
    "media": ["media", "music", "video", "audio", "play", "pause", "record", "sound"],
    "nature": ["nature", "tree", "flower", "plant", "leaf", "sun", "moon", "weather"],
    "people": ["people", "person", "user", "profile", "team", "group", "family", "friend"],
    "security": ["security", "lock", "key", "safe", "protect", "shield", "password", "auth"],
    "settings": ["settings", "config", "gear", "tool", "option", "preference", "control"],
    "social": ["social", "share", "like", "follow", "friend", "network", "community"],
    "system": ["system", "computer", "tech", "code", "data", "server", "database", "cloud"],
    "transport": ["transport", "car", "bus", "train", "plane", "ship", "bike", "walk"],
    "travel": ["travel", "trip", "vacation", "hotel", "luggage", "passport", "ticket"],
    "ui": ["ui", "interface", "button", "menu", "icon", "layout", "grid", "list"],
    "weather": ["weather", "sun", "rain", "cloud", "snow", "storm", "wind", "temperature"]
  };

  const lowercaseName = name.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryMappings)) {
    if (keywords.some(keyword => lowercaseName.includes(keyword))) {
      return category;
    }
  }
  
  return "misc";
}

// Helper function to generate tags from icon name
function generateTags(name: string): string[] {
  const tags = new Set<string>();
  
  // Split camelCase and add as tags
  const words = name.replace(/([A-Z])/g, ' $1').toLowerCase().split(' ');
  words.forEach(word => {
    if (word.length > 2) {
      tags.add(word.trim());
    }
  });
  
  // Add common synonyms and variations
  const synonyms: Record<string, string[]> = {
    "achievement": ["success", "accomplishment", "victory", "win"],
    "arrow": ["direction", "pointer", "navigation", "chevron"],
    "business": ["work", "office", "corporate", "professional"],
    "calendar": ["date", "time", "schedule", "event"],
    "communication": ["message", "chat", "talk", "contact"],
    "document": ["file", "paper", "text", "note"],
    "home": ["house", "building", "residence"],
    "location": ["place", "position", "map", "gps"],
    "people": ["person", "user", "profile", "human"],
    "security": ["lock", "safe", "protect", "secure"],
    "settings": ["config", "options", "preferences"],
    "star": ["favorite", "bookmark", "rating"]
  };
  
  for (const [key, values] of Object.entries(synonyms)) {
    if (name.toLowerCase().includes(key)) {
      values.forEach(synonym => tags.add(synonym));
    }
  }
  
  return Array.from(tags);
}

// Convert Atlas icon map to IconItem array
export const atlasIcons: IconItem[] = Object.entries(iconMap).map(([name, svg]) => ({
  id: `atlas-${name}`,
  name: name.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase()),
  svg: svg as string,
  category: extractCategory(name),
  tags: generateTags(name),
  style: "outline"
}));

export default atlasIcons;