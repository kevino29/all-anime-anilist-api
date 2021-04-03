import Constants from './Constants.js';
import Global from './Global.js';
import WebAPI from './WebAPI.js';

class Modal {
    constructor() {
        this._modal = document.createElement('div');
        this._modalDialog = document.createElement('div');
        this._modalContent = document.createElement('div');
        this._modalHeader = document.createElement('div');
        this._modalTitle = document.createElement('h5');
        this._modalBody = document.createElement('div');
        this._modalFooter = document.createElement('div');
        this._exitButton = document.createElement('button');
        this._cancelButton = document.createElement('button');
        this._saveButton = document.createElement('button');
    }

    load(filter, collection) {
        // Set up the modal
        this._modal.id = filter.title.toLowerCase() + '-modal';
        this._modal.classList.add('modal', 'fade');
        this._modal.setAttribute('data-mdb-backdrop', 'static');
        this._modal.setAttribute('data-mdb-keyboard', 'false');
        this._modal.setAttribute('tabindex', '-1');
        this._modal.setAttribute('aria-labelledby', filter.title.toLowerCase() + '-modal-title');
        this._modal.setAttribute('aria-hidden', 'true');

        // Set up the modal dialog
        this._modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
        this._modalContent.classList.add('modal-content');
        this._modalHeader.classList.add('modal-header');
        this._modalTitle.id = filter.title.toLowerCase() + '-modal-title';
        this._modalTitle.classList.add('modal-title');
        this._modalTitle.innerText = 'Choose ' + filter.title + '(s)';
        this._modalFooter.classList.add('modal-footer');
        this._modalBody.classList.add('modal-body', 'text-center');

        // Make the modal bigger and scrollable if it is the Tag modal
        if (filter.title.toUpperCase() === 'TAG')
            this._modalDialog.classList.add('modal-lg', 'modal-dialog-scrollable');

        if (filter.title.toUpperCase() === 'YEAR')
            this._modalDialog.classList.add('modal-dialog-scrollable');

        // Loop through each object in the collection object
        collection.map((obj, i) => {
            // Separate the checkboxes into categories
            if (filter['separate-categories']) {
                let newHeader = document.createElement('div');
                newHeader.classList.add('h4', 'text-center', 'text-muted', 'mt-4');
                newHeader.innerText = obj.category;
                this._modalBody.appendChild(newHeader);
            }

            // Create the checkboxes and add it to the modal body
            obj.list.map((e, j) => {
                // Declare all the elements
                let formCheck = document.createElement('div');
                let formCheckInput = document.createElement('input');
                let formCheckLabel = document.createElement('label');

                // Set up the checkbox wrapper
                formCheck.classList.add('form-check', 'form-check-inline', 'py-1');

                // Set up the checkbox
                formCheckInput.id = filter.title.toLowerCase() + '-checkbox-' + i.toString() + '-' + j.toString();
                formCheckInput.classList.add('btn-check');
                formCheckInput.setAttribute('type', 'checkbox');
                formCheckInput.setAttribute('autocomplete', 'off');

                // Set up the checkbox label
                formCheckLabel.classList.add('btn', 'btn-outline-light', 'btn-rounded');
                formCheckLabel.setAttribute('for', filter.title.toLowerCase() + '-checkbox-' + i.toString() + '-' + j.toString());
                formCheckLabel.innerText = e;

                // Put all the elements together
                formCheck.appendChild(formCheckInput);
                formCheck.appendChild(formCheckLabel);

                // Add the checkbox to the modal body
                this._modalBody.appendChild(formCheck);
            });
        });

        // Set up the Exit (x) button
        this._exitButton.classList.add('btn-close');
        this._exitButton.setAttribute('type', 'button');
        this._exitButton.setAttribute('data-mdb-dismiss', 'modal');
        this._exitButton.setAttribute('aria-label', 'Cancel');

        // Set up the Cancel button
        this._cancelButton.classList.add('btn', 'btn-secondary');
        this._cancelButton.setAttribute('type', 'button');
        this._cancelButton.setAttribute('data-mdb-dismiss', 'modal');
        this._cancelButton.innerText = 'Cancel';

        // Set up the Save button
        this._saveButton.classList.add('btn', 'btn-primary');
        this._saveButton.id = filter.title.toLowerCase() + '-save-selected';
        this._saveButton.setAttribute('type', 'button');
        this._saveButton.setAttribute('data-mdb-dismiss', 'modal');
        this._saveButton.innerText = 'Search';

        // Put all the elements together
        this._modalHeader.appendChild(this._modalTitle);
        this._modalHeader.appendChild(this._exitButton);
        this._modalFooter.appendChild(this._cancelButton);
        this._modalFooter.appendChild(this._saveButton);
        this._modalContent.appendChild(this._modalHeader);
        this._modalContent.appendChild(this._modalBody);
        this._modalContent.appendChild(this._modalFooter);
        this._modalDialog.appendChild(this._modalContent);
        this._modal.appendChild(this._modalDialog);

        // Add the modal to the application
        document.querySelector('#app').appendChild(this._modal);

        this.loadSaveListener(filter, collection);
    }

    /**
     * Adds an event listener for the save button.
     * @param {*} filter The filter object
     * @param {*} collection The filter's collection
     */
    loadSaveListener(filter, collection) {
        document.querySelector('#' + filter.title.toLowerCase() + '-save-selected')
            .addEventListener('click', () => {
                let display = document.querySelector('#selected' + filter.title);

                // Initialize the arrays
                switch(filter.title.toUpperCase()) {
                    case 'GENRE':
                        Global.genres = [];
                        break;
                    case 'TAG':
                        Global.tags = [];
                        break;
                    default:
                        Global.genres = [];
                        Global.tags = [];
                        break;
                }

                collection.map((obj, i) => {
                    obj.list.map((e, j) => {
                        // Loop through all the checkboxes
                        let checkbox = document.querySelector('#' + filter.title.toLowerCase() + '-checkbox-' + i.toString() + '-' + j.toString());
            
                        // Check if the checkbox is checked then add the
                        // checked data into the array to be queried
                        if (checkbox.checked) {
                            display.innerText = 'Custom';

                            switch(filter.title.toUpperCase()) {
                                case 'GENRE':
                                    Global.genres.push(e);
                                    break;
                                case 'TAG':
                                    Global.tags.push(e);
                                    break;
                                default:
                                    Global.genres = [];
                                    Global.tags = [];
                                    break;
                            }
                        }
                    });
                });

                // Set the unused array to undefined
                if (Global.genres && Global.genres.length === 0) {
                    Global.genres = undefined;
                    display.innerText = 'None';
                    WebAPI.request(true);
                }
                else if (Global.tags && Global.tags.length === 0) {
                    Global.tags = undefined;
                    display.innerText = 'None';
                    WebAPI.request(true);
                }

                // Only request data when at least one thing was selected
                if (display.innerText === 'Custom')
                    WebAPI.request(true);
            });
    }
}

export default Modal;