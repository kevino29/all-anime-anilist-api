async function loadResultsContainer() {
    let resultContainer = document.createElement('div');
    resultContainer.classList.add('row', 'justify-content-center', 'py-5', 'mx-auto');

    content.appendChild(resultContainer);
    return resultContainer;
}

function loadContent() {
    // Load the pagination dynamically, also add the functionality
    let pageList = document.querySelector('#pageList');
    let pageListLength = pageList.children.length - 4;

    // Remove all display none styles to each list item
    pageList.children.forEach(e => e.classList.remove('d-none'));

    // Add display none style to each list item that is not used
    if (lastPage < pageListLength) {
        let iters = -1;
        for (let i = pageListLength - lastPage; i > 0; i--, iters++) {
            pageList.children[pageListLength - iters].classList.add('d-none');
        }
    }

    let firstButton = document.querySelector('#page-item-first');
    let lastButton = document.querySelector('#page-item-last');
    let nextButton = document.querySelector('#page-item-next');
    let prevButton = document.querySelector('#page-item-prev');

    if (lastPage === 1) {
        // Disable both the next and prev buttons
        disableAll();

        // Set the inner text of each page links
        for (let i = 2; i < pageList.children.length - 2; i++) {
            document.querySelector('#page-link-' + i).innerText = i-1;
        }
    }
    else if (lastPage === 2) {
        if (currentPage === 1) {
            // Disable prev button, enable next button
            disableLeft();
            enableRight();
        }
        else {
            // Disable next button, enable the prev button (if disabled)
            disableRight();
            enableLeft();
        }

        // Set the inner text of each page links
        for (let i = 2; i < pageList.children.length - 2; i++) {
            document.querySelector('#page-link-' + i).innerText = i-1;
        }
    }
    else if (currentPage === 1 || currentPage === 2) {
        if (currentPage === 1) {
            // Disable the prev button, enable the next button (if disabled)
            disableLeft();
            enableRight();
        }
        else
            enableAll();

        // Set the inner text of each page links
        for (let i = 2; i < pageList.children.length - 2; i++) {
            document.querySelector('#page-link-' + i).innerText = i-1;
        }
    }
    else if (currentPage === lastPage || currentPage === lastPage - 1) {
        if (currentPage === lastPage) {
            // Disable the next button, enable the prev button (if disabled)
            disableRight();
            enableLeft();
        } 
        else {
            // Enable both next and prev buttons, if the current page is the second last page
            enableAll();
        }

        // Set the inner text of each page links
        let iters = 0;
        for (let i = pageList.childElementCount - 3; i > 1; i--, iters++) {
            document.querySelector('#page-link-' + i).innerText = lastPage - iters;
        }
    }
    else {
        // Enable both next and prev buttons
        enableAll();

        // Set the inner text of each page links
        let iters = -2;
        for (let i = 2; i < pageList.childElementCount - 2; i++, iters++) {
            document.querySelector('#page-link-' + i).innerText = currentPage + iters;
        }
    }

    // Look for the button with the same label as the currentPage var
    // Then set it to active
    pageList.children
        .forEach(e => {
            if (e.children[0].innerText == currentPage)
                e.classList.add('active');
            else
                e.classList.remove('active');
        });

    // Show the pagination
    showPagination();

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

async function requestAPI(reset) {
    if (reset) currentPage = 1;

    clearContent();
    showLoader();

    // Define the variables
    let variables = {
        page: currentPage,
        search: search,
        format: format,
        genres: genres,
        tags: tags,
        sort: sort,
        isAdult: isAdult,
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

    // CONSOLE THE VARIABLES
    console.dir(variables)

    // Make the HTTP API request
    await fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    loadContent();
}

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(json) {
    // console.dir(json);
    
    clearContent();

    // Set the last page
    lastPage = json.data.Page.pageInfo.lastPage;

    // Create a new row for the results
    let newRow = document.createElement('div');
    newRow.classList.add('row', 'justify-content-center', 'pb-5', 'mx-auto');

    // If there are no result, add a message
    if (json.data.Page.media.length === 0) {
        let resultsMessage = document.createElement('div');
        resultsMessage.classList.add('h4', 'mt-3', 'text-center', 'text-muted');
        resultsMessage.innerText = 'No result found';
        newRow.appendChild(resultsMessage);
    }

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
        if (media.title.english !== null && media.title.english !== undefined)
            newLink.innerText = media.title.english;
        else if (media.title.romaji !== null && media.title.romaji !== undefined)
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