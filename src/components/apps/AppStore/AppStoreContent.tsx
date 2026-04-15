import { useState } from "react";
import { GridItem } from "../../ui/GridItem";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { Card } from "../../ui/Card";
import { StatCard } from "../../ui/StatCard";
import { Text } from "../../ui/Text";
import { IconButton } from "../../ui/IconButton";

interface App {
  icon: string;
  name: string;
  developer: string;
  description: string;
  rating: number;
  downloads: string;
  size: string;
  version: string;
  category: string;
}

export const allApps: App[] = [
  {
    icon: "🎮",
    name: "Minecraft",
    developer: "Mojang Studios",
    description:
      "Explore infinite worlds and build everything from the simplest homes to the grandest castles. Create, explore, and survive!",
    rating: 4.8,
    downloads: "100M+",
    size: "245 MB",
    version: "1.21.0",
    category: "Games",
  },
  {
    icon: "📱",
    name: "Calculator",
    developer: "Apple",
    description:
      "Perform basic arithmetic calculations with a clean, modern interface.",
    rating: 4.5,
    downloads: "50M+",
    size: "12 MB",
    version: "3.0",
    category: "Utilities",
  },
  {
    icon: "🎨",
    name: "Photoshop",
    developer: "Adobe Inc.",
    description:
      "The industry-standard photo editing software, now on your device. Edit photos like a pro with powerful tools.",
    rating: 4.7,
    downloads: "20M+",
    size: "1.2 GB",
    version: "25.0",
    category: "Creative",
  },
  {
    icon: "📚",
    name: "Duolingo",
    developer: "Duolingo",
    description:
      "Learn languages for free. Fun, bite-sized lessons make learning a new language fast and easy.",
    rating: 4.6,
    downloads: "100M+",
    size: "78 MB",
    version: "8.0",
    category: "Education",
  },
  {
    icon: "📝",
    name: "Notion",
    developer: "Notion Labs",
    description:
      "The all-in-one workspace for notes, docs, and collaboration. Organize your life and work in one place.",
    rating: 4.9,
    downloads: "15M+",
    size: "95 MB",
    version: "3.0",
    category: "Productivity",
  },
  {
    icon: "🎵",
    name: "Spotify",
    developer: "Spotify AB",
    description:
      "Millions of songs and podcasts. Discover new music and enjoy your favorite tracks offline.",
    rating: 4.5,
    downloads: "500M+",
    size: "128 MB",
    version: "8.8",
    category: "Featured",
  },
  {
    icon: "🎬",
    name: "Netflix",
    developer: "Netflix Inc.",
    description:
      "Watch TV shows and movies on demand. Stream award-winning original content anywhere.",
    rating: 4.4,
    downloads: "1B+",
    size: "95 MB",
    version: "9.0",
    category: "Featured",
  },
  {
    icon: "📦",
    name: "VS Code",
    developer: "Microsoft",
    description:
      "Code editing. Redefined. A powerful code editor with syntax highlighting and intelligent code completion.",
    rating: 4.8,
    downloads: "30M+",
    size: "210 MB",
    version: "1.85",
    category: "Utilities",
  },
];

const categories = [
  "Featured",
  "Games",
  "Utilities",
  "Creative",
  "Education",
  "Productivity",
];

export function AppDetail({ app, onBack }: { app: App; onBack: () => void }) {
  const [installed, setInstalled] = useState(false);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors group"
        >
          <span className="p-2 rounded-lg bg-[var(--color-bg-elevated)] group-hover:bg-[var(--color-bg-hover)] transition-colors">
            ←
          </span>
          <Text size="sm" weight="medium">
            Back to apps
          </Text>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <div className="text-8xl p-4 bg-[var(--color-bg-elevated)] rounded-2xl shadow-xl">
          {app.icon}
        </div>
        <div className="flex-1">
          <Text size="3xl" weight="bold">
            {app.name}
          </Text>
          <Text size="lg" color="secondary" className="mt-1">
            {app.developer}
          </Text>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            <Badge variant="accent" icon="★">
              {app.rating}
            </Badge>
            <Text size="sm" color="muted">
              {app.downloads} downloads
            </Text>
            <Text size="sm" color="muted">
              {app.size}
            </Text>
          </div>
        </div>
        <Button
          variant={installed ? "secondary" : "primary"}
          size="lg"
          onClick={() => setInstalled(!installed)}
          className="w-full sm:w-auto"
        >
          {installed ? "✓ Installed" : "Install"}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Category" value={app.category} />
        <StatCard label="Version" value={app.version} />
        <StatCard label="Size" value={app.size} />
        <StatCard label="Downloads" value={app.downloads} />
      </div>

      <div className="space-y-3">
        <Text size="lg" weight="semibold">
          About
        </Text>
        <Text color="secondary" className="leading-relaxed">
          {app.description}
        </Text>
      </div>

      <Card padding="md">
        <Text size="lg" weight="semibold" className="mb-4">
          Ratings & Reviews
        </Text>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="text-center sm:text-left">
            <Text size="4xl" weight="bold">
              {app.rating}
            </Text>
            <div className="flex text-yellow-400 text-xl mt-1 justify-center sm:justify-start">
              {"★".repeat(Math.floor(app.rating))}
              {"☆".repeat(5 - Math.floor(app.rating))}
            </div>
            <Text size="sm" color="muted" className="mt-1">
              {app.downloads} ratings
            </Text>
          </div>
          <div className="h-px sm:h-16 w-full sm:w-px bg-[var(--color-border)]" />
          <div className="space-y-2 flex-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <Text size="sm" color="muted" className="w-4">
                  {stars}
                </Text>
                <span className="text-yellow-400">★</span>
                <div className="flex-1 h-2 rounded-full bg-[var(--color-bg-hover)] overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{
                      width:
                        stars === 5
                          ? "65%"
                          : stars === 4
                            ? "20%"
                            : stars === 3
                              ? "8%"
                              : stars === 2
                                ? "4%"
                                : "3%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export function AppList({ onSelectApp }: { onSelectApp: (app: App) => void }) {
  const [activeCategory, setActiveCategory] = useState("Featured");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filteredApps =
    activeCategory === "Featured"
      ? allApps
      : allApps.filter((app) => app.category === activeCategory);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] md:hidden">
        <IconButton icon="☰" onClick={() => setMobileSidebarOpen(true)} />
        <Text weight="semibold">App Store</Text>
        <Text size="sm" color="muted">
          / {activeCategory}
        </Text>
      </div>

      <div
        className="fixed inset-0 bg-[var(--color-bg-secondary)] z-50 flex flex-col md:hidden transition-all duration-300"
        style={{
          transform: mobileSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <Text
            size="xs"
            color="muted"
            weight="semibold"
            className="uppercase tracking-wider"
          >
            Categories
          </Text>
          <IconButton icon="✕" onClick={() => setMobileSidebarOpen(false)} />
        </div>
        <div className="p-4 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setMobileSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${activeCategory === cat ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-52 border-r border-[var(--color-border)] p-4 hidden md:block">
          <Text
            size="xs"
            color="muted"
            weight="semibold"
            className="uppercase tracking-wider mb-3"
          >
            Categories
          </Text>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === cat ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]"}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredApps.map((app) => (
              <div
                key={app.name}
                onClick={() => onSelectApp(app)}
                className="cursor-pointer"
              >
                <GridItem icon={app.icon} label={app.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
