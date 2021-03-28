function loadMultiSelect(filter, collection) {
    // Declare all the elements
    let modal = document.createElement('div');
    let modalDialog = document.createElement('div');
    let modalContent = document.createElement('div');
    let modalHeader = document.createElement('div');
    let modalTitle = document.createElement('h5');
    let modalBody = document.createElement('div');
    let modalFooter = document.createElement('div');
    let exitButton = document.createElement('button');
    let cancelButton = document.createElement('button');
    let saveButton = document.createElement('button');

    // Set up the modal
    modal.id = filter.toLowerCase() + '-modal';
    modal.classList.add('modal', 'fade');
    modal.setAttribute('data-mdb-backdrop', 'static');
    modal.setAttribute('data-mdb-keyboard', 'false');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', filter.toLowerCase() + '-modal-title');
    modal.setAttribute('aria-hidden', 'true');

    // Set up the modal dialog
    modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
    modalContent.classList.add('modal-content');
    modalHeader.classList.add('modal-header');
    modalTitle.id = filter.toLowerCase() + '-modal-title';
    modalTitle.classList.add('modal-title');
    modalTitle.innerText = 'Choose ' + filter + '(s)';
    modalFooter.classList.add('modal-footer');
    modalBody.classList.add('modal-body', 'text-center');

    // Make the modal bigger and scrollable if it is the Tag modal
    if (filter.toUpperCase() === 'TAG')
        modalDialog.classList.add('modal-lg', 'modal-dialog-scrollable');

    // Loop through each object in the collection object
    collection.map((obj, i) => {
        // Separate the checkboxes into categories
        if (filter.toUpperCase() === 'TAG') {
            let newHeader = document.createElement('div');
            newHeader.classList.add('h4', 'text-center', 'text-muted', 'mt-4');
            newHeader.innerText = obj.firstLetter;
            modalBody.appendChild(newHeader);
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
            formCheckInput.id = filter.toLowerCase() + '-checkbox-' + i.toString() + '-' + j.toString();
            formCheckInput.classList.add('btn-check');
            formCheckInput.setAttribute('type', 'checkbox');
            formCheckInput.setAttribute('autocomplete', 'off');

            // Set up the checkbox label
            formCheckLabel.classList.add('btn', 'btn-outline-light', 'btn-rounded');
            formCheckLabel.setAttribute('for', filter.toLowerCase() + '-checkbox-' + i.toString() + '-' + j.toString());
            formCheckLabel.innerText = e;

            // Put all the elements together
            formCheck.appendChild(formCheckInput);
            formCheck.appendChild(formCheckLabel);

            // Add the checkbox to the modal body
            modalBody.appendChild(formCheck);
        });
    });

    // Set up the Exit (x) button
    exitButton.classList.add('btn-close');
    exitButton.setAttribute('type', 'button');
    exitButton.setAttribute('data-mdb-dismiss', 'modal');
    exitButton.setAttribute('aria-label', 'Cancel');

    // Set up the Cancel button
    cancelButton.classList.add('btn', 'btn-secondary');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('data-mdb-dismiss', 'modal');
    cancelButton.innerText = 'Cancel';

    // Set up the Save button
    saveButton.classList.add('btn', 'btn-primary');
    saveButton.id = filter.toLowerCase() + '-save-selected';
    saveButton.setAttribute('type', 'button');
    saveButton.setAttribute('data-mdb-dismiss', 'modal');
    saveButton.innerText = 'Search';

    // Put all the elements together
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(exitButton);
    modalFooter.appendChild(cancelButton);
    modalFooter.appendChild(saveButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    // Add the modal to the application
    document.querySelector('#app').appendChild(modal);

    // Load the event listener for the Save button
    loadEventListener(filter, collection);
}

function loadEventListener(filter, collection) {
    document.querySelector('#' + filter.toLowerCase() + '-save-selected')
        .addEventListener('click', () => {
            let display = document.querySelector('#selected' + filter);

            // Initialize the arrays
            switch(filter.toUpperCase()) {
                case 'GENRE':
                    genres = [];
                    break;
                case 'TAG':
                    tags = [];
                    break;
                default:
                    genres = [];
                    tags = [];
                    break;
            }

            collection.map((obj, i) => {
                obj.list.map((e, j) => {
                    // Loop through all the checkboxes
                    let checkbox = document.querySelector('#' + filter.toLowerCase() + '-checkbox-' + i.toString() + '-' + j.toString());
        
                    // Check if the checkbox is checked then add the
                    // checked data into the array to be queried
                    if (checkbox.checked) {
                        display.innerText = 'Custom';

                        switch(filter.toUpperCase()) {
                            case 'GENRE':
                                genres.push(e);
                                break;
                            case 'TAG':
                                tags.push(e);
                                break;
                            default:
                                genres = [];
                                tags = [];
                                break;
                        }
                    }
                });
            });

            // Set the unused array to undefined
            if (genres && genres.length === 0) {
                genres = undefined;
                display.innerText = 'None';
                requestAPI(true);
            }
            else if (tags && tags.length === 0) {
                tags = undefined;
                display.innerText = 'None';
                requestAPI(true);
            }

            // Only request data when at least one thing was selected
            if (display.innerText === 'Custom')
                requestAPI(true);
        });
}