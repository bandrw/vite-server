export class HTMLBuilder {
    constructor({
        tagName,
        attributes = {},
        children = [],
    }: {
        tagName: string,
        attributes?: HTMLBuilder['attributes'],
        children?: HTMLBuilder['children'],
    }) {
        this.tagName = tagName;
        this.attributes = attributes;
        this.children = children;
    }

    tagName: string;
    attributes: Record<string, string>;
    children: (HTMLBuilder | string)[];

    get outerHTML(): string {
        const attributesStr = Object.entries(this.attributes).map(([key, val]) => `${key}="${val}"`).join(' ');
        const contentStr = this.children.map(child => typeof child === 'string' ? child : child.outerHTML).join('')

        return (
`<${this.tagName}${attributesStr ? ` ${attributesStr}` : ''}>${contentStr}</${this.tagName}>`
);
    }
}
