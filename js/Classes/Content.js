class Content {
    constructor(id) {
        // this.content = document.createElement('div');
        // this.content.id = id;
        this._content = document.querySelector(id);
    }

    /**
     * 
     * @returns The content element.
     */
    get element() {
        return this._content;
    }

    /**
     * Adds a child element in the content.
     * @param {*} child The element to be added.
     */
    addChild(child) {
        this._content.appendChild(child);
    }
}

export default Content;