// Global vars
let content, results, searchBox, pagination;
let lastPage, search, format, genre, sort;
let currentPage = 1;
let reverseSort = false;
let isAdult = false;

// Set the all the button texts
const buttonTexts = 
    [
        ['All', 'TV', 'TV Short', 'Movie', 'Special', 'OVA',
         'ONA', 'Music', 'Manga', 'Novel', 'One Shot'],
        ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror',
         'Mahou Shoujo', 'Mecha', 'Music', 'Mystery' , 'Psychological', 'Romance',
         'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'],
        ['None', 'Title', 'Popularity', 'Trending']
    ];
    
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
    results = await loadResultsContainer();

    // Load all the event listeners
    await loadEventListeners();

    // Initial call to load the first medias
    await requestAPI(true);
});