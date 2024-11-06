const isComment: (node: Node) => node is Comment = (node: Node): node is Comment =>
	node.nodeType === Node.COMMENT_NODE

const isSafeAttribute = (attr: string): boolean =>
	!/^on/i.test(attr)

const isSafeURL = (value: string): boolean => {
	if (/^(mailto|tel):/i.test(value)) return true
	if (value.includes('://')) {
		try {
			const url = new URL(value, window.location.origin)
			return !['http:', 'https:', 'ftp:'].includes(url.protocol)
		} catch (error) {
			return true
		}
	}
	return true
}

const safeSetAttribute = (element: Element, attr: string, value: string): void => {
	if (!isSafeAttribute(attr)) throw new Error(`Unsafe attribute: ${attr}`)
	if (!isSafeURL(value)) throw new Error(`Unsafe URL for ${attr}: ${value}`)
	element.setAttribute(attr, value)
}

export { isComment, isSafeAttribute, isSafeURL, safeSetAttribute }