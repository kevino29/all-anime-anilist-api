class Loader {
    constructor() {
        this._loader = document.createElement('div');
        this._loader.classList.add('loader-wrapper');
    }

    /**
     * Loads a loader inside the wrapper element.
     * @param {Element} wrapper The element to wrap the loader in.
     */
    load(wrapper) {
        this.clear();
        let loader = document.createElement('div');
        loader.classList.add('loader');

        this._loader.appendChild(loader);
        wrapper.addChild(this._loader);
    }

    /**
     * Clears the loader inside the loader wrapper.
     */
    clear() {
        while(this._loader.hasChildNodes()) {
            this._loader.removeChild(this._loader.lastChild);
        }
    }
}

export default Loader;