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