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
    for (let i = 0; i < document.querySelector('#formatList').children.length; i++) {
        document.querySelector('#formatList').children[i]
            .addEventListener('click', formatEventHandler);

        function formatEventHandler(e) {
            if (e.target.innerText !== 'All')
                format = e.target.innerText.toUpperCase().replace(' ', '_');
            else
                format = undefined;
            
            document.querySelector('#selectedFormat').innerText = e.target.innerText;
            requestAPI(true);
        }
    }

    // Add a click event listener to each genre buttons
    for (let i = 0; i < document.querySelector('#genreList').children.length; i++) {
        document.querySelector('#genreList').children[i]
            .addEventListener('click', genreEventHandler);

        function genreEventHandler(e) {
            if (e.target.innerText !== 'All')
                genre = e.target.innerText.toUpperCase();
            else
                genre = undefined;

            document.querySelector('#selectedGenre').innerText = e.target.innerText;
            requestAPI(true);
        }
    }

    // Add a click event listener to each sort by buttons
    for (let i = 0; i < document.querySelector('#sortByList').children.length; i++) {
        document.querySelector('#sortByList').children[i]
            .addEventListener('click', sortEventHandler);

        function sortEventHandler(e) {
            switch(e.target.innerText.toUpperCase()) {
                case "TITLE":
                    sort = 'TITLE_ENGLISH_DESC';
                    break;
                case "POPULARITY":
                    sort = 'POPULARITY_DESC';
                    break;
                case "TRENDING":
                    sort = 'TRENDING_DESC';
                    break;
                default:
                    sort = undefined;
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
            switch (e.target.innerText) {
                case 'Previous':
                    console.log('Previous pressed!');
                    if (currentPage !== 1)
                        currentPage -= 1;
                    break;
                case 'Next':
                    console.log('Next pressed!');
                    if (currentPage !== 1576)
                        currentPage += 1;
                    break;
                default:
                    // 'Numbered' button was clicked
                    try { currentPage = parseInt(e.target.innerText) }
                    catch(error) { console.log(error) }
                    break;
            }
            requestAPI(false);
        }
    }
}