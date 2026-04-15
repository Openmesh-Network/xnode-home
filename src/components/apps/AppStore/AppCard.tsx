import { GridItem } from "../../ui/GridItem";

interface App {
  icon: string;
  name: string;
}

interface AppCardProps {
  app: App;
  onClick: () => void;
}

export function AppCard({ app, onClick }: AppCardProps) {
  return (
    <div onClick={onClick}>
      <GridItem icon={app.icon} label={app.name} />
    </div>
  );
}
