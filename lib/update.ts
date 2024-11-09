import { enqueue } from './pulse'
import { isComment, safeSetAttribute } from './util'

/* === Common DOM Updates === */

/**
 * Create a new element with the given tag name and attributes
 * 
 * @param element - The parent element to append the new element to
 * @param tag - The tag name of the new element
 * @param attributes - The attributes to set on the new element
 * @returns {Promise<HTMLElement>}
 */
const ce = /*#__PURE__*/ <E extends Element>(
	parent: E,
	tag: string,
	attributes: Record<string, string> = {},
	text?: string
): Promise<HTMLElement> => enqueue(() => {
	const child = document.createElement(tag)
	for (const [key, value] of Object.entries(attributes))
		safeSetAttribute(child, key, value)
	if (text) child.textContent = text
	parent.append(child)
	return child
}, [parent, 'e'])

/**
 * Remove the given element from its parent
 * 
 * @param element -	The element to remove
 * @returns {Promise<null>}
 */
const re = /*#__PURE__*/ <E extends Element>(
	element: E
): Promise<null> => enqueue(() => {
	element.remove()
	return null
}, [element, 'r'])

/**
 * Update the text content of the given element while preserving comments
 * 
 * @param element - The element whose text content to update
 * @param text - The new text content
 * @returns {Promise<E>}
 */
const st = /*#__PURE__*/ <E extends Element>(
	element: E,
	text: string
): Promise<E> => enqueue(() => {
	Array.from(element.childNodes)
		.filter(node => !isComment(node))
		.forEach(node => node.remove())
	element.append(document.createTextNode(text))
	return element
}, [element, 't'])

/**
 * Update an attribute of the given element
 * 
 * @param element - The element whose attribute to update
 * @param attribute - The attribute to update
 * @param value - The new value
 * @returns {Promise<E>}
 */
const sa = /*#__PURE__*/ <E extends Element>(
	element: E,
    attribute: string,
    value: string
): Promise<E> => enqueue(() => {
	safeSetAttribute(element, attribute, value)
	return element
}, [element, `a:${attribute}`])

/**
 * Remove an attribute of the given element
 * 
 * @param element - The element whose attribute to remove
 * @param attribute - The attribute to remove
 * @returns {Promise<E>}
 */
const ra = /*#__PURE__*/ <E extends Element>(
	element: E,
    attribute: string
): Promise<E> => enqueue(() => {
	element.removeAttribute(attribute)
	return element
}, [element, `a:${attribute}`])

/**
 * Toggle an attribute of the given element
 * 
 * @param element - The element whose attribute to toggle
 * @param attribute - The attribute to toggle
 * @param value - The new value
 * @returns {Promise<E>}
 */
const ta = /*#__PURE__*/ <E extends Element>(
	element: E,
    attribute: string,
    value: boolean
): Promise<E> => enqueue(() => {
	element.toggleAttribute(attribute, value)
	return element
}, [element, `a:${attribute}`])

/**
 * Toggle a class of the given element
 * 
 * @param element - The element whose class to toggle
 * @param token - The class token to toggle
 * @param value - The new value
 * @returns {Promise<E>}
 */
const tc = /*#__PURE__*/ <E extends Element>(
	element: E,
    token: string,
    value: boolean
): Promise<E> => enqueue(() => {
	element.classList.toggle(token, value)
	return element
}, [element, `c:${token}`])

/**
 * Update a style property of the given element
 * 
 * @param element - The element whose style property to update
 * @param property - The style property to update
 * @param value - The new value
 * @returns {Promise<E>}
 */
const ss = /*#__PURE__*/ <E extends HTMLElement | SVGElement | MathMLElement>(
	element: E,
    property: string,
    value: string
): Promise<E> => enqueue(() => {
	element.style.setProperty(property, value)
	return element
}, [element, `s:${property}`])

/**
 * Remove a style property of the given element
 * 
 * @param element - The element to update
 * @param property - The style property to remove
 * @returns {Promise<E>}
 */
const rs = /*#__PURE__*/ <E extends HTMLElement | SVGElement | MathMLElement>(
	element: E,
    property: string
): Promise<E> => enqueue(() => {
	element.style.removeProperty(property)
	return element
}, [element, `s:${property}`])

/**
 * Replace the inner HTML of the given element
 * 
 * @param element - The element whose inner HTML to update
 * @param content - The new inner HTML
 * @returns {Promise<E>}
 */
const dangerouslySetInnerHTML = /*#__PURE__*/ <E extends Element>(
	element: E,
    content: string
): Promise<E> => enqueue(() => {
	element.innerHTML = content
    return element
}, [element, 'h'])

export { ce, re, st, sa, ra, ta, tc, ss, rs, dangerouslySetInnerHTML }