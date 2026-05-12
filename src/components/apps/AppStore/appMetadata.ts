export interface AppInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  version: string;
  author?: string;
  custom?: boolean;
  flake?: string;
}

const STORAGE_KEY = "xnode-custom-apps";

function loadCustomApps(): AppInfo[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      console.log("[appMetadata] Found in localStorage:", parsed);
      return parsed;
    } catch (e) {
      console.warn("Failed to parse custom apps from localStorage:", e);
    }
  }
  console.log("[appMetadata] No custom apps in localStorage");
  return [];
}

function saveCustomApps(apps: AppInfo[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch (e) {
    console.warn("Failed to save custom apps to localStorage:", e);
  }
}

let _customApps: AppInfo[] | undefined;

function getLoadedCustomApps(): AppInfo[] {
  if (!_customApps) {
    _customApps = loadCustomApps();
    console.log("[appMetadata] Loaded custom apps:", _customApps.length, _customApps);
  }
  return _customApps;
}

export const customApps = {
  get length(): number {
    return getLoadedCustomApps().length;
  },
  get all(): AppInfo[] {
    return getLoadedCustomApps();
  },
};

export function addCustomApp(app: AppInfo) {
  getLoadedCustomApps().push(app);
  saveCustomApps(getLoadedCustomApps());
}

export function removeCustomApp(appId: string) {
  const index = getLoadedCustomApps().findIndex(a => a.id === appId);
  if (index !== -1) {
    getLoadedCustomApps().splice(index, 1);
    saveCustomApps(getLoadedCustomApps());
  }
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
  {
    id: "llama-cpp-server",
    name: "Llama CPP Server",
    icon: "🦙",
    description: "Run LLM inference using llama.cpp with an OpenAI-compatible API",
    category: "AI",
    version: "1.0.0",
  },
  {
    id: "hermes-agent",
    name: "Hermes Agent",
    icon: "⚡",
    description: "Autonomous AI agent powered by large language models",
    category: "AI",
    version: "1.0.0",
  },
];

export const appCategories = ["All", ...Array.from(new Set(availableApps.map((app) => app.category)))];
