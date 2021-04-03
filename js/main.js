// Import statements
import Global from './Classes/Global.js';
import Constants from './Classes/Constants.js';
import Pagination from './Classes/Pagination.js';
import Content from './Classes/Content.js';
import Results from './Classes/Results.js';
import Filter from './Classes/Filter.js';
import Toggle from './Classes/Toggle.js';
import WebAPI from './Classes/WebAPI.js';
import Search from './Classes/Search.js';

// ADD THIS LOADER
// http://spin.js.org/#?lines=20&length=0&width=12&radius=71&scale=0.7&corners=1&speed=1.6&rotate=48&animation=spinner-line-shrink&direction=1&color=%23ffffff&fadeColor=transparent&top=50&left=50&shadow=0%200%201px%20transparent&zIndex=2000000000&className=spinner&position=absolute

window.addEventListener('load', () => {
    // Set up the search box
    new Search().setEventListener();

    // Get the content container
    Global.content = new Content('#content');

    // Load all the filters
    Constants.filterDropdowns.map(filter => {
        let newFilter = new Filter();
        newFilter.load(Global.content, filter);
        Global.filters.push(newFilter);
    });

    // Load the toggle filter
    let newToggle = new Toggle();
    newToggle.load(Global.content);
    Global.filters.push(newToggle);

    // Load the pagination
    Global.pagination = new Pagination();
    Global.pagination.load(Global.content);

    // Load the results container
    Global.results = new Results();
    Global.results.load(Global.content);

    // Initial call to load the first medias
    WebAPI.request(true);
});