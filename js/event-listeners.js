async function loadEventListeners() {
    // Add an event listener for searching media
    document.querySelector('#searchButton').addEventListener('click', function () {
        if (searchBox.value !== null && searchBox.value !== undefined && searchBox.value.length !== 0)
            search = searchBox.value;
        else
            search = undefined;

        requestAPI(true);
    });

    // Add a click event listener to each format buttons
    for (let i = 0; i < document.querySelector('#format-list').children.length; i++) {
        document.querySelector('#format-list').children[i]
            .addEventListener('click', formatEventHandler);

        function formatEventHandler(e) {
            if (e.target.nodeName === 'HR' || e.target.nodeName === 'H6') return;

            if (e.target.innerText !== 'All')
                format = e.target.innerText.toUpperCase().replace(' ', '_');
            else
                format = undefined;
            
            document.querySelector('#selectedFormat').innerText = e.target.innerText;
            requestAPI(true);
        }
    }

    // Add a click event listener to each genre buttons
    for (let i = 0; i < document.querySelector('#genre-list').children.length; i++) {
        document.querySelector('#genre-list').children[i]
            .addEventListener('click', genreEventHandler);

        async function genreEventHandler(e) {
            if (e.target.nodeName === 'HR' ||
                e.target.nodeName === 'H6' ||
                e.target.innerText === 'See all genres') 
                return;
            else if (e.target.innerText !== 'None') {
                genres = [];
                genres.push(e.target.innerText.toUpperCase());
            }
            else
                genres = undefined;

            document.querySelector('#selectedGenre').innerText = e.target.innerText;
            requestAPI(true);
        }
    }

    // Add a click event listener to each tag buttons
    for (let i = 0; i < document.querySelector('#tag-list').children.length; i++) {
        document.querySelector('#tag-list').children[i]
            .addEventListener('click', tagEventHandler);

        function tagEventHandler(e) {
            if (e.target.nodeName === 'HR' ||
                e.target.nodeName === 'H6' ||
                e.target.innerText === 'See all tags')
                return;
            else if (e.target.innerText !== 'None') {
                tags = [];
                tags.push(e.target.innerText.toUpperCase());
            }
            else
                tags = undefined;
            
            document.querySelector('#selectedTag').innerText = e.target.innerText;
            requestAPI(true);
        }
    }

    // Add a click event listener to each sort by buttons
    for (let i = 0; i < document.querySelector('#sort-by-list').children.length; i++) {
        document.querySelector('#sort-by-list').children[i]
            .addEventListener('click', sortEventHandler);

        function sortEventHandler(e) {
            if (e.target.nodeName === 'HR' || e.target.nodeName === 'H6') return;

            let toggleButton = document.querySelector('#reverseSortToggle');
            toggleButton.classList.remove('disabled');

            switch(e.target.innerText.toUpperCase()) {
                case 'TITLE':
                    sort = 'TITLE_ENGLISH_DESC';
                    break;
                case 'SCORE':
                    sort = 'SCORE_DESC';
                    break;
                case 'POPULARITY':
                    sort = 'POPULARITY_DESC';
                    break;
                case 'TRENDING':
                    sort = 'TRENDING_DESC';
                    break;
                default:
                    sort = undefined;
                    toggleButton.classList.add('disabled');
                    break;
            }
            document.querySelector('#selectedSortText').innerText = e.target.innerText;
            reverseSort = false;
            requestAPI(true);
        }
    }

    // Add a click event listener on the reverse sort toggle
    document.querySelector('#reverseSortToggle').addEventListener('click', function() {
        if (document.querySelector('#selectedSortText').innerText === 'None') return;
        reverseSort = !reverseSort;
        if (sort !== undefined) {
            if (reverseSort) sort = sort.replace('_DESC', '');
            else sort += '_DESC';
        }

        requestAPI(true);
    })

    // Add a click event listener on the adult toggle
    document.querySelector('#adultToggle').addEventListener('change', function() {
        isAdult = this.checked;
        requestAPI(true);
    });

    // Add a click event listener on each link in the pagination
    for (let i = 0; i < document.querySelector('#pageList').childElementCount; i++) {
        document.querySelector('#page-link-' + i).addEventListener('click', pageLinkClicked);

        // Handles the click event
        function pageLinkClicked(e) {
            // Remove active status on each page list
            document.querySelector('#pageList').children
                .forEach(e => e.classList.remove('active'));

            // Figure out which button was clicked
            // NEED TO FIX THIS!! CHANGE TO IF ELSE STATEMENT
            console.log(e.target);

            if (e.target.parentNode.id === 'page-item-first' || 
                e.target.parentNode.parentNode.id === 'page-item-first') {
                console.log('First pressed!');
                currentPage = 1;
            }
            else if (e.target.parentNode.id === 'page-item-last' || 
                e.target.parentNode.parentNode.id === 'page-item-last') {
                console.log('Last pressed!');
                currentPage = lastPage;
            }
            else if (e.target.parentNode.id === 'page-item-next' || 
                e.target.parentNode.parentNode.id === 'page-item-next') {
                console.log('Next pressed!');
                if (currentPage !== lastPage)
                    currentPage += 1;
            }
            else if (e.target.parentNode.id === 'page-item-prev' || 
                e.target.parentNode.parentNode.id === 'page-item-prev') {
                console.log('Previous pressed!');
                if (currentPage !== 1)
                    currentPage -= 1;
            }
            else {
                try { currentPage = parseInt(e.target.innerText) }
                catch(error) { console.log(error) }
            }

            // switch (e.target.parentNode.id) {
            //     case 'page-item-prev':
            //         console.log('Previous pressed!');
            //         if (currentPage !== 1)
            //             currentPage -= 1;
            //         break;
            //     case 'page-item-next':
            //         console.log('Next pressed!');
            //         if (currentPage !== 1576)
            //             currentPage += 1;
            //         break;
            //     default:
            //         // 'Numbered' button was clicked
            //         try { currentPage = parseInt(e.target.innerText) }
            //         catch(error) { console.log(error) }
            //         break;
            // }
            console.log(currentPage);
            requestAPI(false);
        }
    }
}