import { type IconItem } from "@/types/icon";
import * as FeatherIcons from "react-icons/fi";

// Function to generate tags based on icon name
const generateTags = (name: string): string[] => {
  const baseName = name.replace(/^Fi/, '').toLowerCase();
  const tags = [baseName, "feather", "ui", "interface"];
  
  // Add category-based tags
  if (/arrow|chevron|corner|move|navigation/.test(baseName)) {
    tags.push("navigation", "direction");
  }
  if (/alert|info|help|check|x|warning/.test(baseName)) {
    tags.push("status", "feedback");
  }
  if (/mail|phone|message|chat|send/.test(baseName)) {
    tags.push("communication");
  }
  if (/heart|star|bookmark|thumbs/.test(baseName)) {
    tags.push("social", "favorites");
  }
  if (/play|pause|skip|volume|music/.test(baseName)) {
    tags.push("media", "audio");
  }
  if (/file|folder|download|upload|save/.test(baseName)) {
    tags.push("files", "storage");
  }
  if (/settings|tool|edit|delete|plus|minus/.test(baseName)) {
    tags.push("actions", "controls");
  }
  if (/calendar|clock|time/.test(baseName)) {
    tags.push("time", "schedule");
  }
  if (/user|person|team|users/.test(baseName)) {
    tags.push("people", "profile");
  }
  if (/lock|unlock|eye|shield|key/.test(baseName)) {
    tags.push("security", "privacy");
  }
  
  return tags;
};

// Transform all Feather icons to IconItem format
export const featherIcons: IconItem[] = Object.entries(FeatherIcons)
  .filter(([name]) => name.startsWith('Fi') && name !== 'FiProps') // Filter only icon components
  .map(([name, IconComponent]) => {
    const displayName = name.replace(/^Fi/, '').replace(/([A-Z])/g, ' $1').trim();
    return {
      id: `feather-${name.toLowerCase()}`,
      name: displayName,
      svg: IconComponent,
      tags: generateTags(name)
    };
  });

export default featherIcons;