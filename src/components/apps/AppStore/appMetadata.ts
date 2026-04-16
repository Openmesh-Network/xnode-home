export interface AppInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  version: string;
}

export const availableApps: AppInfo[] = [
  {
    id: "immich",
    name: "Immich",
    icon: "🖼️",
    description: "Self-hosted photo and video backup solution",
    category: "Media",
    version: "1.0.0",
  },
  {
    id: "jellyfin",
    name: "Jellyfin",
    icon: "🎬",
    description: "Free software media system for movies, TV shows, music, and books",
    category: "Media",
    version: "1.0.0",
  },
  {
    id: "minecraft-server",
    name: "Minecraft Server",
    icon: "🎮",
    description: "Host your own Minecraft server",
    category: "Gaming",
    version: "1.0.0",
  },
  {
    id: "near-validator",
    name: "NEAR Validator",
    icon: "⛓️",
    description: "Run a NEAR Protocol validation node",
    category: "Blockchain",
    version: "1.0.0",
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    icon: "☁️",
    description: "Self-hosted productivity platform with file sync and collaboration",
    category: "Productivity",
    version: "1.0.0",
  },
  {
    id: "ollama",
    name: "Ollama",
    icon: "🤖",
    description: "Run large language models locally",
    category: "AI",
    version: "1.0.0",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    icon: "🦞",
    description: "Open-source game server management",
    category: "Gaming",
    version: "1.0.0",
  },
  {
    id: "vaultwarden",
    name: "Vaultwarden",
    icon: "🔐",
    description: "Self-hosted password manager (Bitwarden compatible)",
    category: "Security",
    version: "1.0.0",
  },
  {
    id: "vscode-server",
    name: "VS Code Server",
    icon: "💻",
    description: "Host VS Code on your server for browser-based development",
    category: "Development",
    version: "1.0.0",
  },
];

export const appCategories = ["All", ...Array.from(new Set(availableApps.map((app) => app.category)))];
