window.addEventListener('load', function() {
    // Global vars
    // Get the results div
    let results = document.querySelector('#results');

    // Get the search box
    let searchBox = document.querySelector('#searchBox');

    // Get the pagination ul
    let pagination = document.querySelector('#pageList');

    let currentPage = 1;
    let lastPage;
    let search;
    let format;
    let sort;
    let isAdult = false;

    // Set the url endpoint for the API
    const url = 'https://graphql.anilist.co';

    // Set the query for the request
    const query =
    `
        query ($page: Int, $format: MediaFormat, $search: String, $sort: [MediaSort], $isAdult: Boolean) {
            Page (page: $page) {
                pageInfo {
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                }
                media (format: $format, search: $search, sort: $sort, isAdult: $isAdult) {
                    id
                    type
                    siteUrl
                    title {
                        romaji
                        english
                        native
                    }
                    coverImage {
                        extraLarge
                        large
                        medium
                    }
                }
            }
        }
    `;

    // Initial call to load the first medias
    requestAPI();

    // Add an event listener for searching media
    document.querySelector('#searchButton').addEventListener('click', function () {
        if (searchBox.value !== null && searchBox.value !== undefined && searchBox.value.length !== 0)
            search = searchBox.value;
        else
            search = undefined;
        
        // Always set current page to ONE each search request
        currentPage = 1;

        requestAPI();
    });

    // Add a click event listener to each format buttons
    for (let i = 0; i < document.querySelector('#formatList').children.length; i++) {
        document.querySelector('#formatList').children[i]
            .addEventListener('click', formatEventHandler);

        function formatEventHandler(e) {
            switch(e.target.innerText.toUpperCase()) {
                case "TV":
                    format = 'TV';
                    break;
                case "TV SHORT":
                    format = 'TV_SHORT';
                    break;
                case "MOVIE":
                    format = 'MOVIE'
                    break;
                case "SPECIAL":
                    format = 'SPECIAL'
                    break;
                case "OVA":
                    format = 'OVA'
                    break;
                case "ONA":
                    format = 'ONA'
                    break;
                case "MUSIC":
                    format = 'MUSIC'
                    break;
                case "MANGA":
                    format = 'MANGA'
                    break;
                case "NOVEL":
                    format = 'NOVEL'
                    break;
                case "ONE SHOT":
                    format = 'ONE_SHOT'
                    break;
                default:
                    format = undefined;
                    break;
            }
            document.querySelector('#selectedFormat').innerText = e.target.innerText;
            requestAPI();
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
                    sort = 'TRENDING_DESC'
                    break;
                default:
                    sort = undefined;
                    break;
            }
            document.querySelector('#selectedSort').innerText = e.target.innerText;
            requestAPI();
        }
    }

    // Add a click event listener on the adult toggle
    document.querySelector('#adultToggle').addEventListener('change', function(e) {
        isAdult = this.checked;
        requestAPI();
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
            requestAPI();
        }
    }

    function loadContent() {
        // Load the pagination dynamically, also add the functionality
        let pageList = document.querySelector('#pageList')
        let pageListLength = pageList.children.length - 2;

        // Remove all display none styles to each list item
        pageList.children.forEach(e => e.classList.remove('d-none'));

        // Add display none style to each list item that is not used
        if (lastPage < pageListLength) {
            let iters = 0;
            for (let i = pageListLength - lastPage; i > 0; i--, iters++) {
                pageList.children[pageListLength - iters].classList.add('d-none')
            }
        }

        let prevButton = document.querySelector('#page-item-prev');
        let nextButton = document.querySelector('#page-item-next');
        if (lastPage === 1) {
            // Disable both the next and prev buttons
            nextButton.classList.add('disabled');
            prevButton.classList.add('disabled');

            // Set the inner text of each page links
            for (let i = 1; i < pageList.children.length - 1; i++) {
                document.querySelector('#page-link-' + i).innerText = i;
            }
        }
        else if (lastPage === 2) {
            if (currentPage === 1) {
                // Disable both the next and prev buttons
                nextButton.classList.remove('disabled');
                prevButton.classList.add('disabled');
            }
            else {
                // Disable next button, enable the prev button (if disabled)
                nextButton.classList.add('disabled');
                prevButton.classList.remove('disabled');
            }

            // Set the inner text of each page links
            for (let i = 1; i < pageList.children.length - 1; i++) {
                document.querySelector('#page-link-' + i).innerText = i;
            }
        }
        else if (currentPage === 1 || currentPage === 2) {
            if (currentPage === 1) {
                // Disable the prev button, enable the next button (if disabled)
                prevButton.classList.add('disabled');
                nextButton.classList.remove('disabled');
            }
            else {
                // Enable both next and prev buttons, if the current page is 2
                prevButton.classList.remove('disabled');
                nextButton.classList.remove('disabled');
            }

            // Set the inner text of each page links
            for (let i = 1; i < pageList.children.length - 1; i++) {
                document.querySelector('#page-link-' + i).innerText = i;
            }
        }
        else if (currentPage === lastPage || currentPage === lastPage - 1) {
            if (currentPage === lastPage) {
                // Disable the next button, enable the prev button (if disabled)
                prevButton.classList.remove('disabled');
                nextButton.classList.add('disabled');
            } 
            else {
                // Enable both next and prev buttons, if the current page is the second last page
                prevButton.classList.remove('disabled');
                nextButton.classList.remove('disabled');
            }

            // Set the inner text of each page links
            let iters = 0;
            for (let i = pageList.childElementCount - 2; i > 0; i--, iters++) {
                document.querySelector('#page-link-' + i).innerText = lastPage - iters;
            }
        }
        else {
            // Enable both next and prev buttons
            prevButton.classList.remove('disabled');
            nextButton.classList.remove('disabled');

            // Set the inner text of each page links
            let iters = -2;
            for (let i = 1; i < pageList.childElementCount - 1; i++, iters++) {
                document.querySelector('#page-link-' + i).innerText = currentPage + iters;
            }
        }

        // Look for the button with the same label as the currentPage var
        // Then set it to active
        pageList.children
            .forEach(e => {
                if (e.children[0].innerText == currentPage)
                    e.classList.add('active');
            });

        // Show the pagination
        showPagination();
    }

    function clearContent() {
        // Remove the previous result first, if there was any
        while (results.hasChildNodes()) {
            results.removeChild(results.lastChild);
        }
        // Hide the pagination
        pagination.classList.add('d-none');
    }

    function showLoader() {
        let loaderWrapper = document.createElement('div');
        loaderWrapper.classList.add('loader-wrapper');
        let loader = document.createElement('div');
        loader.classList.add('loader');
        loaderWrapper.appendChild(loader);
        results.appendChild(loaderWrapper);
    }

    function showPagination() {
        pagination.classList.remove('d-none');
    }

    async function requestAPI() {
        clearContent();
        showLoader();

        // Define the variables
        let variables = {
            page: currentPage,
            search: search,
            sort: sort,
            format: format,
            isAdult: isAdult,
        };

        console.dir(variables);

        // Define the config for the API request
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            }),
        }

        // Make the HTTP API request
        await fetch(url, options)
            .then(handleResponse)
            .then(handleData)
            .catch(handleError);

        loadContent();
        // console.log(queriedResult);
    }

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(json) {
        console.dir(json);
        
        clearContent();

        // Set the last page
        lastPage = json.data.Page.pageInfo.lastPage;

        // Create a new row for the results
        let newRow = document.createElement('div');
        newRow.classList.add('row', 'justify-content-center', 'pb-5', 'mx-auto');

        // Add each queried media as a card
        json.data.Page.media
            .map(addNewMedia);

        function addNewMedia(media) {
            // Create a new col
            let newCol = document.createElement('div');
            newCol.classList.add('col');
    
            // Create a new card, with a bunch of other styling
            let newCard = document.createElement('div');
            newCard.classList.add('card', 'zoom-sm', 'shadow-lg', 'card-md', 'm-2', 'mx-auto');
    
            // Create a new card body
            let newCardBody = document.createElement('div');
            newCardBody.classList.add('card-body', 'overflow-auto', 'minimize-scrollbar');
    
            // Create a new title for the card
            let newLink = document.createElement('a');
    
            // Pick the title that isn't null, check english first
            if (media.title.english !== null)
                newLink.innerText = media.title.english;
            else if (media.title.romaji !== null)
                newLink.innerText = media.title.romaji;
            else
                newLink.innerText = media.title.native;
    
            newLink.target = '_blank';
            newLink.href = media.siteUrl;
    
            // Create a new image for the card
            let newImage = document.createElement('img');
            newImage.classList.add('card-img-top', 'card-img-md', 'img-fluid');
            newImage.src = media.coverImage.large;
            newImage.alt = media.title.romaji;
    
            // Combine every element
            newCardBody.appendChild(newLink);
            newCard.appendChild(newImage);
            newCard.appendChild(newCardBody);
            newCol.appendChild(newCard);
            newRow.appendChild(newCol);
        }
        results.appendChild(newRow);
    }

    function handleError(error) {
        console.log(error);
    }
});