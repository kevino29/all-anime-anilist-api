class Results {
    constructor() {
        this._container = document.createElement('div');
        this._container.classList.add('row', 'justify-content-center', 'py-5', 'mx-auto');
    }

    /**
     * Getter of results element.
     */
    get element() {
        return this._container;
    }

    /**
     * Loads the results within the wrapper.
     * @param {Element} wrapper The element to contain the results.
     */
    load(wrapper) {
        wrapper.addChild(this._container);
    }

    /**
     * Adds a child element to the results.
     * @param {*} child The element to be added.
     */
    addChild(child) {
        this._container.appendChild(child);
    }

    /**
     * Clears the results container.
     */
    clear() {
        while (this._container.hasChildNodes()) {
            this._container.removeChild(this._container.lastChild);
        }
    }
}

export default Results;