/* === Polyfills === */

if (!('requestAnimationFrame' in globalThis))
    globalThis.requestAnimationFrame = callback => setTimeout(callback, 16)

/* === Types === */

type EnqueueDedupe = [Element, string]

/* === Internal === */

const dedupeMap = new Map()
let queue: Array<() => void> = []
let requestId: number | null

const flush = () => {
	requestId = null
	queue.forEach(fn => fn())
	queue = []
	dedupeMap.clear()
}

const requestTick = () => {
	if (requestId) cancelAnimationFrame(requestId)
	requestId = requestAnimationFrame(flush)
}

queueMicrotask(flush) // initial flush when the call stack is empty

/* === Exported Functions === */

const enqueue = <T>(
	callback: () => T,
	dedupe?: EnqueueDedupe
) => new Promise<T>((resolve, reject) => {
	const wrappedCallback = () => {
		try {
            resolve(callback())
        } catch (error) {
            reject(error)
        }
	}
	if (dedupe) {
		const [el, op] = dedupe
		if (!dedupeMap.has(el)) dedupeMap.set(el, new Map())
		const elementMap = dedupeMap.get(el)
		if (elementMap.has(op)) {
			const idx = queue.indexOf(callback)
			if (idx > -1) queue.splice(idx, 1)
		}
		elementMap.set(op, wrappedCallback)
	}
	queue.push(wrappedCallback)
	requestTick()
})

const animationFrame = async () => new Promise(requestAnimationFrame)

export { enqueue, animationFrame }
