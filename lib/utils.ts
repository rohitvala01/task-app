import clsx from 'clsx';

export const cn = (...args: Parameters<typeof clsx>) => clsx(...args);

export function generateId(prefix = '') {
  return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
