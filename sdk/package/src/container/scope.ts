export function scope<Path extends ContainerPath>(path: Path) {
  return `/container/${encodeURIComponent(path.container)}`;
}

export type ContainerPath = {
  container: string;
};
