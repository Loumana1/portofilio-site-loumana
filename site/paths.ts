/** Prefix site-root paths with Vite `base` (needed on GitHub project Pages). */
export function withBase(path: string): string {
  if (!path || /^(https?:|mailto:|data:|#)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
}
