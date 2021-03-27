// Global vars
let content, results, searchBox, pagination;
let lastPage, search, format, genres, tags, sort;
let currentPage = 1;
let reverseSort = false;
let isAdult = false;

window.addEventListener('load', async function() {
    // Get the search box
    searchBox = document.querySelector('#searchBox');

    // Load all the filters
    await loadFilters();

    // Load the pagination
    pagination = await loadPagination();

    // Load the results container
    results = await loadResultsContainer();

    // Initial call to load the first medias
    await requestAPI(true);

    // Load all the event listeners
    await loadEventListeners();
});