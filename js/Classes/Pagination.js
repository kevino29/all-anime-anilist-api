import Global from './Global.js';
import WebAPI from './WebAPI.js';

class Pagination {
    constructor() {
        this._pagination = document.createElement('nav');
        this._pagination.setAttribute('aria-label', 'Page Navigation');
        this._pagination.classList.add('sticky-top', 'mt-4', 'pt-2', 'd-none');
        this._pagination.style.zIndex = 1;
    }

    /**
     * Loads the pagination element within the wrapper.
     * @param {Element} wrapper The element to contain the pagination. 
     */
    load(wrapper) {
        this._pagination.innerHTML =
        `
            <ul id="pageList" class="pagination pagination-sm pagination-circle justify-content-center w-100">
                <li id="page-item-first" class="page-item mx-1">
                    <button id="page-link-0" class="page-link"><i class="fas fa-angle-double-left"></i></button>
                </li>
                <li id="page-item-prev" class="page-item mx-1">
                    <button id="page-link-1" class="page-link"><i class="fas fa-angle-left"></i></button>
                </li>
                <li class="page-item mx-1">
                    <button id="page-link-2" class="page-link"></button>
                </li>
                <li class="page-item mx-1">
                    <button id="page-link-3" class="page-link"></button>
                </li>
                <li class="page-item mx-1">
                    <button id="page-link-4" class="page-link"></button>
                </li>
                <li class="page-item mx-1">
                    <button id="page-link-5" class="page-link"></button>
                </li>
                <li class="page-item mx-1">
                    <button id="page-link-6" class="page-link"></button>
                </li>
                <li id="page-item-next" class="page-item mx-1">
                    <button id="page-link-7" class="page-link"><i class="fas fa-angle-right"></i></button>
                </li>
                <li id="page-item-last" class="page-item mx-1">
                    <button id="page-link-8" class="page-link"><i class="fas fa-angle-double-right"></i></button>
                </li>
            </ul>
        `;
        wrapper.addChild(this._pagination);

        this.setup();
        this.setEventListener();
        this.show();
    }

    /**
     * Sets up the functionality of the pagination.
     */
     setup() {
        // Load the pagination dynamically, also add the functionality
        let pageList = document.querySelector('#pageList');
        let pageListLength = pageList.children.length - 4;
    
        // Remove all display none styles to each list item
        pageList.children.forEach(e => e.classList.remove('d-none'));
    
        // Add display none style to each list item that is not used
        let deprecatedLinks = 0;
        if (Global.lastPage < pageListLength) {
            let iters = -1;
            for (let i = pageListLength - Global.lastPage; i > 0; i--, iters++, deprecatedLinks++) {
                pageList.children[pageListLength - iters].classList.add('d-none');
            }
        }
    
        let firstButton = document.querySelector('#page-item-first');
        let lastButton = document.querySelector('#page-item-last');
        let nextButton = document.querySelector('#page-item-next');
        let prevButton = document.querySelector('#page-item-prev');
    
        if (Global.lastPage === 1) {
            // Disable all the helper pagination buttons
            disableAll();
    
            // Set the inner text of each page links
            for (let i = 2; i < pageList.children.length - 2; i++) {
                document.querySelector('#page-link-' + i).innerText = i-1;
            }
        }
        else if (Global.lastPage === 2) {
            if (Global.currentPage === 1) {
                // Disable the left helper page buttons, enable the right helper page buttons
                disableLeft();
                enableRight();
            }
            else {
                // Disable the right helper page buttons, enable the left helper page buttons (if disabled)
                disableRight();
                enableLeft();
            }
    
            // Set the inner text of each page links
            for (let i = 2; i < pageList.children.length - 2; i++) {
                document.querySelector('#page-link-' + i).innerText = i-1;
            }
        }
        else if (Global.currentPage === 1 || Global.currentPage === 2) {
            if (Global.currentPage === 1) {
                // Disable the left helper page buttons, enable the right helper page buttons (if disabled)
                disableLeft();
                enableRight();
            }
            else
                // Enable all the helper pagination buttons
                enableAll();
    
            // Set the inner text of each page links
            for (let i = 2; i < pageList.children.length - 2; i++) {
                document.querySelector('#page-link-' + i).innerText = i-1;
            }
        }
        else if (Global.currentPage === Global.lastPage || Global.currentPage === Global.lastPage - 1) {
            if (Global.currentPage === Global.lastPage) {
                // Disable the right helper page buttons, enable the left helper page buttons (if disabled)
                disableRight();
                enableLeft();
            } 
            else
                // Enable all the helper pagination buttons
                enableAll();
    
            // Set the inner text of each page links
            let iters = 0;
            for (let i = pageList.childElementCount - 3 - deprecatedLinks; i > 1; i--, iters++) {
                document.querySelector('#page-link-' + i).innerText = Global.lastPage - iters;
            }
        }
        else {
            // Enable all the helper pagination buttons
            enableAll();
    
            // Set the inner text of each page links
            let iters = -2;
            for (let i = 2; i < pageList.childElementCount - 2; i++, iters++) {
                document.querySelector('#page-link-' + i).innerText = Global.currentPage + iters;
            }
        }
    
        // Look for the button with the same label as the currentPage var
        // Then set it to active
        pageList.children
            .forEach(e => {
                if (e.children[0].innerText == Global.currentPage)
                    e.classList.add('active');
                else
                    e.classList.remove('active');
            });
    
        function enableAll() {
            firstButton.classList.remove('disabled');
            lastButton.classList.remove('disabled');
            nextButton.classList.remove('disabled');
            prevButton.classList.remove('disabled');
        }
        function disableAll() {
            firstButton.classList.add('disabled');
            lastButton.classList.add('disabled');
            nextButton.classList.add('disabled');
            prevButton.classList.add('disabled');
        }
        function enableRight() {
            lastButton.classList.remove('disabled');
            nextButton.classList.remove('disabled');
        }
        function disableRight() {
            lastButton.classList.add('disabled');
            nextButton.classList.add('disabled');
        }
        function enableLeft() {
            firstButton.classList.remove('disabled');
            prevButton.classList.remove('disabled');
        }
        function disableLeft() {
            firstButton.classList.add('disabled');
            prevButton.classList.add('disabled');
        }
    }

    /**
     * Sets the event listeners for the pagination.
     */
    setEventListener() {
        // Add a click event listener on each link in the pagination
        for (let i = 0; i < document.querySelector('#pageList').childElementCount; i++) {
            document.querySelector('#page-link-' + i).addEventListener('click', pageLinkClicked);

            // Handles the click event
            function pageLinkClicked(e) {
                // Remove active status on each page list
                document.querySelector('#pageList').children
                    .forEach(e => e.classList.remove('active'));

                // Figure out which button was clicked
                if (e.target.parentNode.id === 'page-item-first' || 
                    e.target.parentNode.parentNode.id === 'page-item-first') {
                    console.log('First pressed!');
                    Global.currentPage = 1;
                }
                else if (e.target.parentNode.id === 'page-item-last' || 
                    e.target.parentNode.parentNode.id === 'page-item-last') {
                    console.log('Last pressed!');
                    Global.currentPage = Global.lastPage;
                }
                else if (e.target.parentNode.id === 'page-item-next' || 
                    e.target.parentNode.parentNode.id === 'page-item-next') {
                    console.log('Next pressed!');
                    if (Global.currentPage !== Global.lastPage)
                        Global.currentPage += 1;
                }
                else if (e.target.parentNode.id === 'page-item-prev' || 
                    e.target.parentNode.parentNode.id === 'page-item-prev') {
                    console.log('Previous pressed!');
                    if (Global.currentPage !== 1)
                        Global.currentPage -= 1;
                }
                else {
                    try { Global.currentPage = parseInt(e.target.innerText) }
                    catch(error) { console.log(error) }
                }
                WebAPI.request(false);
            }
        }
    }

    /**
     * Shows the pagination.
     */
    show() {
        this._pagination.classList.remove('d-none');
    }
}

export default Pagination;