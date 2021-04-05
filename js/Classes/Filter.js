import Global from './Global.js';
import Constants from './Constants.js';
import Modal from './Modal.js';
import WebAPI from './WebAPI.js';

class Filter {
    constructor() {
        this._dropdown = document.createElement('div');
    }

    /**
     * Loads the filter element inside the wrapper.
     * @param {Element} wrapper The element to wrap the filter in.
     * @param {object} filter The filter object.
     */
    load(wrapper, filter) {
        // Set up the dropdown
        this._dropdown.classList.add('dropdown', 'd-inline-block', 'text-center', 'me-2');

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
        this._dropdown.appendChild(dropdownButton);

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

            let newModal = new Modal();
            newModal.load(filter, filter.collection);
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
                Constants.tooltips.map(tooltip => {
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
        this._dropdown.appendChild(dropdownList);

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
        this._dropdown.appendChild(display);

        // Add the dropdown to the content container
        wrapper.addChild(this._dropdown);

        this.setEventListener(filter);
    }

    /**
     * Sets the event listener for the filter.
     * @param {*} filter The filter object 
     */
    setEventListener(filter) {
        // Get the filter element
        let filterElement = document.querySelector('#' + filter.title.toLowerCase().split(' ').join('-') + '-list');

        // Add a click event listener to each dropdown item
        for (let i = 0; i < filterElement.children.length; i++) {
            filterElement.children[i]
                .addEventListener('click', e => {
                    // Skip if the user clicks on dropdown header, divider, or multi select text
                    if (e.target.nodeName === 'HR' ||
                        e.target.nodeName === 'H6' ||
                        e.target.innerText === filter['multi-select-text'])
                        return;

                    // Default is not selected
                    else if (e.target.innerText !== filter.default) {
                        switch(filter.title.toUpperCase()) {
                            case 'FORMAT':
                                Global.format = e.target.innerText.toUpperCase().split(' ').join('_');
                                break;
                            case 'STATUS':
                                Global.status = e.target.innerText.toUpperCase().split(' ').join('_');
                                break;
                            case 'SEASON':
                                Global.season = e.target.innerText.toUpperCase();
                                break;
                            case 'YEAR':
                                Global.year = e.target.innerText.toUpperCase();
                                break;
                            case 'GENRE':
                                Global.genres = [];
                                Global.genres.push(e.target.innerText.toUpperCase());
                                break;
                            case 'TAG':
                                Global.tags = [];
                                Global.tags.push(e.target.innerText.toUpperCase());
                                break;
                            case 'SORT BY':
                                // Get the toggle button, then enable it
                                let toggleButton = document.querySelector('#reverseSortToggle');
                                toggleButton.classList.remove('disabled');

                                // Figure out which sort was selected
                                switch(e.target.innerText.toUpperCase()) {
                                    case 'TITLE':
                                        Global.sort = 'TITLE_ENGLISH_DESC';
                                        break;
                                    case 'SCORE':
                                        Global.sort = 'SCORE_DESC';
                                        break;
                                    case 'POPULARITY':
                                        Global.sort = 'POPULARITY_DESC';
                                        break;
                                    case 'TRENDING':
                                        Global.sort = 'TRENDING_DESC';
                                        break;
                                    default:
                                        // Default is selected
                                        Global.sort = undefined;
                                        toggleButton.classList.add('disabled');
                                        break;
                                }
                                // Set the sort toggle to default
                                Global.reverseSort = false;

                                // Still doesn't work
                                document.querySelector('#reverseSortToggle').removeEventListener('click', handler);

                                // Add an event listener to the toggle
                                document.querySelector('#reverseSortToggle').addEventListener('click', handler);
                                
                                function handler() {
                                    if (document.querySelector('#selectedSortText').innerText === filter.default) 
                                        return;
                                    
                                    Global.reverseSort = !Global.reverseSort;
                                    
                                    if (Global.sort !== undefined) {
                                        if (Global.reverseSort) Global.sort = Global.sort.replace('_DESC', '');
                                        else Global.sort += '_DESC';
                                    }
                                    WebAPI.request(true);
                                }
                                break;
                            default:
                                break;
                        }
                    }

                    // Default is selected
                    else {
                        switch(filter.title.toUpperCase()) {
                            case 'FORMAT':
                                Global.format = undefined;
                                break;
                            case 'STATUS':
                                Global.status = undefined;
                                break;
                            case 'SEASON':
                                Global.season = undefined;
                                break;
                            case 'YEAR':
                                Global.year = undefined;
                                break;
                            case 'GENRE':
                                Global.genres = undefined;
                                break;
                            case 'TAG':
                                Global.tags = undefined;
                                break;
                            case 'SORT BY':
                                Global.sort = undefined;
                                // Disable the sort toggle
                                document.querySelector('#reverseSortToggle').classList.add('disabled');
                                break;
                            default:
                                break;
                        }
                    }
                    
                    // Set the display text of the filter
                    if (filter.title.toUpperCase() === 'SORT BY')
                        document.querySelector('#selectedSortText').innerText = e.target.innerText;
                    else
                        document.querySelector('#selected' + filter.title).innerText = e.target.innerText;

                    WebAPI.request(true);
                });
        }
    }
}

export default Filter;