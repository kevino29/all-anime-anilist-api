async function loadFilters() {
    content = document.querySelector('#content');
    await loadAllFilterDropdowns();
    content.appendChild(await loadAdultToggle());
}

async function loadAllFilterDropdowns() {
    buttonTexts.map(filter => {
        // Create the dropdown
        let dropdown = document.createElement('div');
        dropdown.classList.add('dropdown', 'd-inline-block', 'text-center', 'mr-2');

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

        // Get the button text constants and fill the list
        filter.list.map((text, i) => {
            // Create a list item and a button for the list item
            let newListItem = document.createElement('li');
            let newListItemBtn = document.createElement('button');
            newListItemBtn.classList.add('dropdown-item');

            // Add the default at the top of the list
            // Add a divider as well
            if (i === 0) {
                // Create a list item and a button for the list item
                let firstListItem = document.createElement('li');
                let firstListItemBtn = document.createElement('button');
                firstListItemBtn.classList.add('dropdown-item');

                // Set the text of the button
                firstListItemBtn.innerText = filter.default;

                // Append the button to the list item
                // Then append the list item to the list
                firstListItem.appendChild(firstListItemBtn);
                dropdownList.appendChild(firstListItem);

                newListItem = document.createElement('li');
                let newListItemSeparator = document.createElement('hr');
                newListItemSeparator.classList.add('dropdown-divider');
                newListItem.appendChild(newListItemSeparator);
                dropdownList.appendChild(newListItem);
            }

            if (text === 'OVA' || text === 'ONA' || text === 'Mahou Shoujo') {
                // Add tooltip for the buttons
                newListItemBtn.setAttribute('data-mdb-toggle', 'tooltip');
                newListItemBtn.setAttribute('data-mdb-placement', 'right');

                switch(text) {
                    case 'OVA':
                        newListItemBtn.setAttribute('title', 'Original Video Animation');
                        break;
                    case 'ONA':
                        newListItemBtn.setAttribute('title', 'Original Net Animation');
                        break;
                    case 'Mahou Shoujo':
                        newListItemBtn.setAttribute('title', 'Magical Girls');
                        break;
                }
            }

            // Set the text of the button
            newListItemBtn.innerText = text;

            // Append the button to the list item
            // Then append the list item to the list
            newListItem.appendChild(newListItemBtn);
            dropdownList.appendChild(newListItem);
        });

        // Add the list to the dropdown
        dropdown.appendChild(dropdownList);

        // Create the selected display
        let display = document.createElement('div');
        display.id = 'selected' + filter.title;
        display.classList.add('h5', 'text-center', 'text-muted', 'mt-2');

        if (filter.title !== 'Sort By') {
            // For Format and Genre
            display.innerText = filter.default;
        }
        else {
            // For Sorting
            // Create the display text
            let selectedSortText = document.createElement('span');
            selectedSortText.id = 'selectedSortText';
            selectedSortText.classList.add('mr-1');
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
    let adultToggle = document.createElement('div');
    adultToggle.classList.add('form-check', 'form-switch', 'd-inline-block', 'float-right', 'mt-1');
    
    adultToggle.innerHTML =
    `
    <input id="adultToggle" class="form-check-input" type="checkbox"/>
    <label class="form-check-label ml-3 h5" for="adultToggle"
        data-mdb-toggle="tooltip" data-mdb-placement="bottom" data-mdb-animation="true"
        title="Only show adult media. Note: You need to be authorized in AniList to view adult medias.">
        18+
    </label>
    <div class="h5 text-center mt-2">&nbsp;</div>
    `;
    return adultToggle;
}