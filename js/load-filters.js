async function loadFilters() {
    content = document.querySelector('#content');
    await loadAllFilterDropdowns();
    content.appendChild(await loadAdultToggle());
}

async function loadAllFilterDropdowns() {
    buttonTexts.map(filter => {
        // Declare the element
        let dropdown = document.createElement('div');

        // Set up the dropdown
        dropdown.classList.add('dropdown', 'd-inline-block', 'text-center', 'me-2');

        // Create the button for the dropdown
        let dropdownButton = document.createElement('button');
        dropdownButton.classList.add('btn', 'btn-primary', 'dropdown-toggle');
        dropdownButton.id = filter.title.toLowerCase().replace(' ', '-');
        dropdownButton.setAttribute('type', 'button');
        dropdownButton.setAttribute('data-mdb-toggle', 'dropdown');
        dropdownButton.setAttribute('aria-expanded', 'false');
        dropdownButton.innerText = filter.title + ' ';

        // Create the list for the dropdown
        let dropdownList = document.createElement('ul');
        dropdownList.classList.add('dropdown-menu');
        dropdownList.id = filter.title.toLowerCase().replace(' ', '-') + '-list';
        dropdownList.setAttribute('aria-labelledby', filter.title.toLowerCase().replace(' ', '-'));

        // Add the button to the dropdown
        dropdown.appendChild(dropdownButton);

        // Add the default at the top of the list
        // Add a divider as well
        // Create a list item and a button for the list item
        let firstListItem = document.createElement('li');
        let firstListItemBtn = document.createElement('button');
        firstListItemBtn.classList.add('dropdown-item');

        // Set the text of the button
        firstListItemBtn.innerText = filter.default;

        // Add the button to the list item
        // Then add the list item to the list
        firstListItem.appendChild(firstListItemBtn);
        dropdownList.appendChild(firstListItem);

        // Create a multi-select button if applicable
        if (filter["multi-select"]) {
            // Create a list item and a button inside the list item
            let secondListItem = document.createElement('li');
            let secondListItemBtn = document.createElement('button');
            secondListItemBtn.classList.add('dropdown-item');

            // Set the attributes of the button
            secondListItemBtn.setAttribute('type', 'button');
            secondListItemBtn.setAttribute('data-mdb-toggle', 'modal');
            secondListItemBtn.setAttribute('data-mdb-target', '#' + filter.title.toLowerCase() + '-modal');

            // Set the text of the button
            secondListItemBtn.innerText = 'See all ' + filter.title.toLowerCase() + 's';

            // Add the button to the list item
            // Then add the list item to the list
            secondListItem.appendChild(secondListItemBtn);
            dropdownList.appendChild(secondListItemBtn);

            // Load the multi-select modal
            loadMultiSelect(filter.title, filter.collection);
        }

        // Add the dropdown divider
        let newListItemForSeparator = document.createElement('li');
        let newListItemSeparator = document.createElement('hr');
        newListItemSeparator.classList.add('dropdown-divider');
        newListItemForSeparator.appendChild(newListItemSeparator);
        dropdownList.appendChild(newListItemForSeparator);

        // Add the dropdown header
        let newListItemForHeader = document.createElement('li');
        let newListItemHeader = document.createElement('h6');
        newListItemHeader.classList.add('dropdown-header', 'text-muted');
        newListItemHeader.innerText = 'Select ' + filter.title.toLowerCase();

        // Custom dropdown header for SORT dropdown
        if (filter.title.toUpperCase() === 'SORT BY')
            newListItemHeader.innerText = 'Select sort';

        // Put all the elements together
        newListItemForHeader.appendChild(newListItemHeader);
        dropdownList.appendChild(newListItemForHeader);

        // Get the button text constants and fill the list
        filter.collection.map(obj => {
            obj.list.map(text => {
                // Create a list item and a button for the list item
                let newListItem = document.createElement('li');
                let newListItemBtn = document.createElement('button');
                newListItemBtn.classList.add('dropdown-item');

                // Loop through the tooltips constant to add tooltips
                tooltips.map(tooltip => {
                    if (tooltip.forLabel === text) {
                        newListItemBtn.setAttribute('data-mdb-toggle', 'tooltip');
                        newListItemBtn.setAttribute('data-mdb-placement', 'right');
                        newListItemBtn.setAttribute('title', tooltip.tooltip);
                    }
                });

                // Set the text of the button
                newListItemBtn.innerText = text;

                // Append the button to the list item
                // Then append the list item to the list
                newListItem.appendChild(newListItemBtn);
                dropdownList.appendChild(newListItem);
            })
        });

        // Add the list to the dropdown
        dropdown.appendChild(dropdownList);

        // Create the selected display
        let display = document.createElement('div');
        display.id = 'selected' + filter.title;
        display.classList.add('h5', 'text-center', 'text-muted', 'mt-2');

        // Custom display for the Sort By filter
        if (filter.title !== 'Sort By') {
            // For Format and Genre
            display.innerText = filter.default;
        }
        else {
            // For Sorting
            // Create the display text
            let selectedSortText = document.createElement('span');
            selectedSortText.id = 'selectedSortText';
            selectedSortText.classList.add('me-1');
            selectedSortText.innerText = filter.default;

            // Create the toggle button
            let reverseSortToggle = document.createElement('span');
            reverseSortToggle.id = 'reverseSortToggle';
            reverseSortToggle.classList.add('btn-sm', 'btn-primary', 'disabled');
            reverseSortToggle.style.cursor = 'pointer';

            // Create the toggle icon
            let sortIcon = document.createElement('i');
            sortIcon.classList.add('fas', 'fa-sort');

            // Add the icon to the toggle button
            reverseSortToggle.appendChild(sortIcon);

            // Add the sort text and the toggle button to the display
            display.appendChild(selectedSortText);
            display.appendChild(reverseSortToggle);
        }

        // Add the display to the dropdown
        dropdown.appendChild(display);

        // Add the dropdown to the content container
        content.appendChild(dropdown);
    });
}

async function loadAdultToggle() {
    // Declare all the elements
    let adultToggle = document.createElement('div');
    let toggleInput = document.createElement('input');
    let toggleLabel = document.createElement('label');
    let padding = document.createElement('div');

    // Set up the wrapper for the toggle
    adultToggle.classList.add('form-check', 'form-switch', 'd-inline-block', 'float-sm-end', 'mt-1');

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
    adultToggle.appendChild(toggleInput);
    adultToggle.appendChild(toggleLabel);
    adultToggle.appendChild(padding);

    // Return the toggle wrapper
    return adultToggle;
}