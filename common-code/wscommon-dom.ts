/**
 * getLargestAncestorRect: returns the rectangle of the largest parent within the body
 * @param element
 * @returns {width, height}
 */
export function getLargestAncestorRect(element: HTMLElement | null): {
  width: number;
  height: number;
} {
  let width = 0;
  let height = 0;
  let current: HTMLElement | null = element;

  while (
    current &&
    current !== document.body &&
    current !== document.documentElement
  ) {
    const rect = current.getBoundingClientRect();
    width = Math.max(width, rect.width);
    height = Math.max(height, rect.height);
    current = current.parentElement;
  }

  return { width: width, height: height };
}
