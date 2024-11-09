/**
 * Create a new element with the given tag name and attributes
 *
 * @param element - The parent element to append the new element to
 * @param tag - The tag name of the new element
 * @param attributes - The attributes to set on the new element
 * @returns {Promise<HTMLElement>}
 */
declare const ce: <E extends Element>(parent: E, tag: string, attributes?: Record<string, string>, text?: string) => Promise<HTMLElement>;
/**
 * Remove the given element from its parent
 *
 * @param element -	The element to remove
 * @returns {Promise<null>}
 */
declare const re: <E extends Element>(element: E) => Promise<null>;
/**
 * Update the text content of the given element while preserving comments
 *
 * @param element - The element whose text content to update
 * @param text - The new text content
 * @returns {Promise<E>}
 */
declare const st: <E extends Element>(element: E, text: string) => Promise<E>;
/**
 * Update an attribute of the given element
 *
 * @param element - The element whose attribute to update
 * @param attribute - The attribute to update
 * @param value - The new value
 * @returns {Promise<E>}
 */
declare const sa: <E extends Element>(element: E, attribute: string, value: string) => Promise<E>;
/**
 * Remove an attribute of the given element
 *
 * @param element - The element whose attribute to remove
 * @param attribute - The attribute to remove
 * @returns {Promise<E>}
 */
declare const ra: <E extends Element>(element: E, attribute: string) => Promise<E>;
/**
 * Toggle an attribute of the given element
 *
 * @param element - The element whose attribute to toggle
 * @param attribute - The attribute to toggle
 * @param value - The new value
 * @returns {Promise<E>}
 */
declare const ta: <E extends Element>(element: E, attribute: string, value: boolean) => Promise<E>;
/**
 * Toggle a class of the given element
 *
 * @param element - The element whose class to toggle
 * @param token - The class token to toggle
 * @param value - The new value
 * @returns {Promise<E>}
 */
declare const tc: <E extends Element>(element: E, token: string, value: boolean) => Promise<E>;
/**
 * Update a style property of the given element
 *
 * @param element - The element whose style property to update
 * @param property - The style property to update
 * @param value - The new value
 * @returns {Promise<E>}
 */
declare const ss: <E extends HTMLElement | SVGElement | MathMLElement>(element: E, property: string, value: string) => Promise<E>;
/**
 * Remove a style property of the given element
 *
 * @param element - The element to update
 * @param property - The style property to remove
 * @returns {Promise<E>}
 */
declare const rs: <E extends HTMLElement | SVGElement | MathMLElement>(element: E, property: string) => Promise<E>;
/**
 * Replace the inner HTML of the given element
 *
 * @param element - The element whose inner HTML to update
 * @param content - The new inner HTML
 * @returns {Promise<E>}
 */
declare const dangerouslySetInnerHTML: <E extends Element>(element: E, content: string) => Promise<E>;
export { ce, re, st, sa, ra, ta, tc, ss, rs, dangerouslySetInnerHTML };
