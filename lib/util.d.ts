declare const isComment: (node: Node) => node is Comment;
declare const isSafeAttribute: (attr: string) => boolean;
declare const isSafeURL: (value: string) => boolean;
declare const safeSetAttribute: (element: Element, attr: string, value: string) => void;
export { isComment, isSafeAttribute, isSafeURL, safeSetAttribute };
