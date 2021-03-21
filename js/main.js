window.addEventListener('load', function() {
    // Global vars
    // Get the results div
    let results = document.querySelector('#results');

    // Get the pagination ul
    let pagination = document.querySelector('#pageList');

    let currentPage = 1;
    let lastPage;

    // Set the url endpoint for the API
    const url = 'https://graphql.anilist.co';

    // Set the query for the request
    const query =
    `
        query ($page: Int) {
            Page (page: $page) {
                pageInfo {
                    total
                    perPage
                    currentPage
                    lastPage
                    hasNextPage
                }
                media {
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

    requestAPI();

    for (let i = 0; i < document.querySelector('#pageList').childElementCount; i++) {
        document.querySelector('#page-link-' + i).addEventListener('click', pageLinkClicked);

        function pageLinkClicked(e) {
            // Remove active status on each page list
            document.querySelector('#pageList').children
                .forEach(e => e.classList.remove('active'));

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
                    try {
                        currentPage = parseInt(e.target.innerText); 
                    }
                    catch(error) {
                        console.log(error);
                    }
                    break;
            }
            requestAPI();
        }
    }

    function loadContent() {
        // Load the pagination dynamically, also add the functionality
        if (currentPage === 1 || currentPage === 2) {
            if (currentPage === 1) {
                // Disable the prev button, enable the next button (if disabled)
                document.querySelector('#page-item-prev').classList.add('disabled');
                document.querySelector('#page-item-next').classList.remove('disabled');
            }
            else {
                // Enable both next and prev buttons, if the current page is 2
                document.querySelector('#page-item-prev').classList.remove('disabled');
                document.querySelector('#page-item-next').classList.remove('disabled');
            }

            // Set the inner text of each page links
            for (let i = 1; i < document.querySelector('#pageList').childElementCount - 1; i++) {
                document.querySelector('#page-link-' + i).innerText = i;
            }
        }
        else if (currentPage === lastPage || currentPage === lastPage - 1) {
            if (currentPage === lastPage) {
                // Disable the next button, enable the prev button (if disabled)
                document.querySelector('#page-item-prev').classList.remove('disabled');
                document.querySelector('#page-item-next').classList.add('disabled');
            } 
            else {
                // Enable both next and prev buttons, if the current page is the second last page
                document.querySelector('#page-item-prev').classList.remove('disabled');
                document.querySelector('#page-item-next').classList.remove('disabled');
            }

            // Set the inner text of each page links
            let iters = 0;
            for (let i = document.querySelector('#pageList').childElementCount - 2; i > 0; i--, iters++) {
                document.querySelector('#page-link-' + i).innerText = lastPage - iters;
            }
        }
        else {
            // Enable both next and prev buttons
            document.querySelector('#page-item-prev').classList.remove('disabled');
            document.querySelector('#page-item-next').classList.remove('disabled');

            // Set the inner text of each page links
            let iters = -2;
            for (let i = 1; i < document.querySelector('#pageList').childElementCount - 1; i++, iters++) {
                document.querySelector('#page-link-' + i).innerText = currentPage + iters;
            }
        }

        // Look for the button with the same label as the currentPage var
        // Then set it to active
        document.querySelector('#pageList').children
            .forEach(e => {
                if (e.children[0].innerText == currentPage)
                    e.classList.add('active');
                console.dir(e.children)
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
        };

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

        let newRow = document.createElement('div');
        newRow.classList.add('row', 'justify-content-center', 'pb-5', 'mx-auto');

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