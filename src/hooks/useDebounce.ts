/* eslint-disable @typescript-eslint/no-explicit-any */
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: number;

  return function executedFunction(this: any, ...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  } as T;
}

export default debounce;
