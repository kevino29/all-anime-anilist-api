// Global vars
let content;
let results;
let searchBox;
let pagination;
let currentPage = 1;
let lastPage;
let search;
let format;
let genre;
let sort;
let reverseSort = false;
let isAdult = false;

// Set the url endpoint for the API
const url = 'https://graphql.anilist.co';

// Set the query for the request
const query =
`
    query ($page: Int, $format: MediaFormat, $genre: String, $search: String, $sort: [MediaSort], $isAdult: Boolean) {
        Page (page: $page) {
            pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
            }
            media (format: $format, genre: $genre, search: $search, sort: $sort, isAdult: $isAdult) {
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

window.addEventListener('load', async function() {
    // Get the search box
    searchBox = document.querySelector('#searchBox');

    // Load all the filters
    await loadFilters();

    // Load the pagination
    pagination = await loadPagination();

    // Load the results container
    results = loadResultsContainer();

    // Initial call to load the first medias
    requestAPI(true);

    // Load all the event listeners
    loadEventListeners();
});