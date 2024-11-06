/**
 * Create a new element with the given tag name and attributes
 *
 * @param element - The parent element to append the new element to
 * @param tag - The tag name of the new element
 * @param attributes - The attributes to set on the new element
 * @returns {Promise<Element>}
 */
declare const ce: (parent: Element, tag: string, attributes?: Record<string, string>, text?: string) => Promise<Element>;
/**
 * Remove the given element from its parent
 *
 * @param element -	The element to remove
 * @returns {Promise<null>}
 */
declare const re: (element: Element) => Promise<null>;
/**
 * Update the text content of the given element while preserving comments
 *
 * @param element - The element whose text content to update
 * @param text - The new text content
 * @returns {Promise<Element>}
 */
declare const st: (element: Element, text: string) => Promise<Element>;
/**
 * Update an attribute of the given element
 *
 * @param element - The element whose attribute to update
 * @param attribute - The attribute to update
 * @param value - The new value
 * @returns {Promise<Element>}
 */
declare const sa: (element: Element, attribute: string, value: string) => Promise<Element>;
/**
 * Remove an attribute of the given element
 *
 * @param element - The element whose attribute to remove
 * @param attribute - The attribute to remove
 * @returns {Promise<Element>}
 */
declare const ra: (element: Element, attribute: string) => Promise<Element>;
/**
 * Toggle an attribute of the given element
 *
 * @param element - The element whose attribute to toggle
 * @param attribute - The attribute to toggle
 * @param value - The new value
 * @returns {Promise<Element>}
 */
declare const ta: (element: Element, attribute: string, value: boolean) => Promise<Element>;
/**
 * Toggle a class of the given element
 *
 * @param element - The element whose class to toggle
 * @param token - The class token to toggle
 * @param value - The new value
 * @returns {Promise<Element>}
 */
declare const tc: (element: Element, token: string, value: boolean) => Promise<Element>;
/**
 * Update a style property of the given element
 *
 * @param element - The element whose style property to update
 * @param property - The style property to update
 * @param value - The new value
 * @returns {Promise<Element>}
 */
declare const ss: (element: HTMLElement | SVGElement | MathMLElement, property: string, value: string) => Promise<Element>;
/**
 * Remove a style property of the given element
 *
 * @param element - The element to update
 * @param property - The style property to remove
 * @returns {Promise<Element>}
 */
declare const rs: (element: HTMLElement | SVGElement | MathMLElement, property: string) => Promise<Element>;
/**
 * Replace the inner HTML of the given element
 *
 * @param element - The element whose inner HTML to update
 * @param content - The new inner HTML
 * @returns {Promise<Element>}
 */
declare const dangerouslySetInnerHTML: (element: HTMLElement, content: string) => Promise<Element>;
export { ce, re, st, sa, ra, ta, tc, ss, rs, dangerouslySetInnerHTML };
