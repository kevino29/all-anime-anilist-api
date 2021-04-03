import Global from './Global.js';
import WebAPI from './WebAPI.js';

class Toggle {
    constructor() {
        this._toggle = document.createElement('div');
    }

    /**
     * 
     * @returns The toggle element
     */
    get element() {
        return this._toggle;
    }

    /**
     * Loads the toggle element inside the wrapper.
     * @param {*} wrapper The element to wrap the filter in.
     * @param {*} filter The filter object.
     */
    load(wrapper) {
        let toggleInput = document.createElement('input');
        let toggleLabel = document.createElement('label');
        let padding = document.createElement('div');

        // Set up the wrapper for the toggle
        this._toggle.classList.add('form-check', 'form-switch', 'd-inline-block', 'float-end', 'mt-1');

        // Set up the toggle input
        toggleInput.id = 'adultToggle';
        toggleInput.classList.add('form-check-input');
        toggleInput.setAttribute('type', 'checkbox');

        // Set up the toggle label
        toggleLabel.classList.add('form-check-label', 'h5');
        toggleLabel.setAttribute('for', 'adultToggle');
        toggleLabel.setAttribute('data-mdb-toggle', 'tooltip');
        toggleLabel.setAttribute('data-mdb-placement', 'bottom');
        toggleLabel.setAttribute('data-mdb-animation', 'true');
        toggleLabel.setAttribute('title', 'Only show adult media. \nNote: You need to be authorized in AniList to view adult medias.');
        toggleLabel.innerText = '18+';

        // Set up the padding
        padding.classList.add('h5', 'text-center', 'mt-2');
        padding.innerHTML = '&nbsp;';

        // Put all the elements together
        this._toggle.appendChild(toggleInput);
        this._toggle.appendChild(toggleLabel);
        this._toggle.appendChild(padding);

        // Add the toggle element inside the wrapper
        wrapper.addChild(this._toggle);

        this.setEventListener();
    }

    setEventListener() {
        document.querySelector('#adultToggle').addEventListener('change', function() {
            Global.isAdult = this.checked;
            WebAPI.request(true);
        });
    }
}

export default Toggle;