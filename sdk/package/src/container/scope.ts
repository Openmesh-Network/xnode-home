type ContainerPath = {
  container: string;
};

export type Path = ContainerPath;

export function scope<P extends Path>(path: P) {
  return `/container/${encodeURIComponent(path.container)}`;
}
