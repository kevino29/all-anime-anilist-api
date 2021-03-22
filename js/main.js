// Global vars

let results;
let searchBox;
let pagination;
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

window.addEventListener('load', function() {
    // Get the results div
    results = document.querySelector('#results');
    // Get the search box
    searchBox = document.querySelector('#searchBox');
    // Get the pagination ul
    pagination = document.querySelector('#pageList');

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
    document.querySelector('#adultToggle').addEventListener('change', function() {
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
});