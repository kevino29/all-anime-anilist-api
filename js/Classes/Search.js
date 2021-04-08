import Global from './Global.js';
import WebAPI from './WebAPI.js';

class Search {
    setEventListener() {
        document.querySelector('#searchButton').addEventListener('click', function () {
            if (searchBox.value !== null && searchBox.value !== undefined && searchBox.value.length !== 0) {
                Global.search = searchBox.value;
                Global.sort = 'SEARCH_MATCH';
            }
            else Global.search = undefined;
            WebAPI.request(true);
        });
    }
}

export default Search;