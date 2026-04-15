type TaskbarVariant = 'blue' | 'green' | 'purple' | 'orange';

interface TaskbarButtonProps {
  icon: string;
  label: string;
  variant?: TaskbarVariant;
  active?: boolean;
  onClick: () => void;
}

const variantClasses: Record<TaskbarVariant, { base: string; active: string }> = {
  blue: { base: 'taskbar-btn-blue', active: 'bg-blue-500/20 ring-2 ring-[var(--color-accent)]' },
  green: { base: 'taskbar-btn-green', active: 'bg-green-500/20 ring-2 ring-[var(--color-accent)]' },
  purple: { base: 'taskbar-btn-purple', active: 'bg-purple-500/20 ring-2 ring-[var(--color-accent)]' },
  orange: { base: 'taskbar-btn-orange', active: 'bg-orange-500/20 ring-2 ring-[var(--color-accent)]' },
};

export function TaskbarButton({ icon, label, variant = 'blue', active = false, onClick }: TaskbarButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`relative flex flex-col items-center gap-1 p-3 rounded-full transition-all duration-300 ${variantClasses[variant].base} ${active ? variantClasses[variant].active : 'hover:scale-110'}`}
    >
      <span className="text-2xl">{icon}</span>
    </button>
  );
}
