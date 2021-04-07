import {Spinner} from './Spin.js';

class Loader {
    constructor() {
        this._loader = document.createElement('div');
        this._loader.classList.add('loader-wrapper');
        this._options = {
            lines: 20, // The number of lines to draw
            length: 0, // The length of each line
            width: 12, // The line thickness
            radius: 71, // The radius of the inner circle
            scale: 0.7, // Scales overall size of the spinner
            corners: 1, // Corner roundness (0..1)
            speed: 1.6, // Rounds per second
            rotate: 48, // The rotation offset
            animation: 'spinner-line-shrink', // The CSS animation name for the lines
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: '#ffffff', // CSS color or array of colors
            fadeColor: 'transparent', // CSS color or array of colors
            top: '10rem', // Top position relative to parent
            left: '50%', // Left position relative to parent
            shadow: '0 0 1px transparent', // Box-shadow for the lines
            zIndex: 2000000000, // The z-index (defaults to 2e9)
            className: 'spinner', // The CSS class to assign to the spinner
            position: 'relative', // Element positioning
        };
    }

    /**
     * Loads a loader inside the wrapper element.
     * @param {Element} wrapper The element to wrap the loader in.
     */
    load(wrapper) {
        this.clear();
        new Spinner(this._options).spin(this._loader);
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