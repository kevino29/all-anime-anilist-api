function loadMultiSelect(filter, filterList) {
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

    modal.id = filter.toLowerCase() + '-modal';
    modal.classList.add('modal', 'fade');
    modal.setAttribute('data-mdb-backdrop', 'static');
    modal.setAttribute('data-mdb-keyboard', 'false');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', filter.toLowerCase() + '-modal-title');
    modal.setAttribute('aria-hidden', 'true');

    modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
    modalContent.classList.add('modal-content');
    modalHeader.classList.add('modal-header');
    modalTitle.id = filter.toLowerCase() + '-modal-title';
    modalTitle.classList.add('modal-title');
    modalTitle.innerText = 'Choose ' + filter + '(s)';
    modalFooter.classList.add('modal-footer');
    modalBody.classList.add('modal-body', 'text-center');

    // Make the modal bigger and scrollable if it is the Tag modal
    if (filter === 'Tag')
        modalDialog.classList.add('modal-lg', 'modal-dialog-scrollable');

    filterList.map((e, i) => {
        let formCheck = document.createElement('div');
        let formCheckInput = document.createElement('input');
        let formCheckLabel = document.createElement('label');

        formCheck.classList.add('form-check', 'form-check-inline', 'py-1');

        formCheckInput.id = filter.toLowerCase() + '-checkbox-' + i;
        // formCheckInput.classList.add('form-check-input');
        formCheckInput.classList.add('btn-check');
        formCheckInput.setAttribute('type', 'checkbox');
        formCheckInput.setAttribute('autocomplete', 'off');

        // formCheckLabel.classList.add('form-check-label');
        formCheckLabel.classList.add('btn', 'btn-outline-light', 'btn-rounded');
        formCheckLabel.setAttribute('for', filter.toLowerCase() + '-checkbox-' + i);
        formCheckLabel.innerText = e;

        formCheck.appendChild(formCheckInput);
        formCheck.appendChild(formCheckLabel);
        modalBody.appendChild(formCheck);
    });

    exitButton.classList.add('btn-close');
    exitButton.setAttribute('type', 'button');
    exitButton.setAttribute('data-mdb-dismiss', 'modal');
    exitButton.setAttribute('aria-label', 'Cancel');

    cancelButton.classList.add('btn', 'btn-secondary');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('data-mdb-dismiss', 'modal');
    cancelButton.innerText = 'Cancel';

    saveButton.classList.add('btn', 'btn-primary');
    saveButton.id = filter.toLowerCase() + '-save-selected';
    saveButton.setAttribute('type', 'button');
    saveButton.setAttribute('data-mdb-dismiss', 'modal');
    saveButton.innerText = 'Search';

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(exitButton);
    modalFooter.appendChild(cancelButton);
    modalFooter.appendChild(saveButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    document.querySelector('#app').appendChild(modal);
    loadEventListener(filter, filterList);
}

function loadEventListener(filter, filterList) {
    document.querySelector('#' + filter.toLowerCase() + '-save-selected')
        .addEventListener('click', () => {
            let display = document.querySelector('#selected' + filter);

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

            filterList.map((e, i) => {
                let checkbox = document.querySelector('#' + filter.toLowerCase() + '-checkbox-' + i);
        
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

            if (display.innerText === 'Custom')
                requestAPI(true);
        });
}