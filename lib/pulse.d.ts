type EnqueueDedupe = [Element, string];
declare const enqueue: <T>(callback: () => T, dedupe?: EnqueueDedupe) => Promise<T>;
declare const animationFrame: () => Promise<number>;
export { enqueue, animationFrame };
