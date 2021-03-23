async function loadFilters() {
    content = document.querySelector('#content');
    content.appendChild(await loadFormatFilter());
    content.appendChild(await loadGenreFilter());
    content.appendChild(await loadSortFilter());
    content.appendChild(await loadAdultToggle());
}

async function loadFormatFilter() {
    let formatFilter = document.createElement('div');
    formatFilter.classList.add('dropdown', 'd-inline-block', 'mr-2');
    
    formatFilter.innerHTML =
    `
    <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        id="formatDropdown"
        data-mdb-toggle="dropdown"
        aria-expanded="false">
        Format
    </button>
    <ul id="formatList" class="dropdown-menu" aria-labelledby="formatDropdown">
        <li><button class="dropdown-item">All</button></li>
        <li><hr class="dropdown-divider"></li>
        <li><button class="dropdown-item">TV</button></li>
        <li><button class="dropdown-item">TV Short</button></li>
        <li><button class="dropdown-item">Movie</button></li>
        <li><button class="dropdown-item">Special</button></li>
        <li><button class="dropdown-item" data-mdb-toggle="tooltip" 
            data-mdb-placement="right" title="Original Video Animation">
                OVA
            </button>
        </li>
        <li><button class="dropdown-item" data-mdb-toggle="tooltip" 
            data-mdb-placement="right" title="Original Net Animation">ONA</button></li>
        <li><button class="dropdown-item">Music</button></li>
        <li><button class="dropdown-item">Manga</button></li>
        <li><button class="dropdown-item">Novel</button></li>
        <li><button class="dropdown-item">One Shot</button></li>
    </ul>
    <div id="selectedFormat" class="h5 text-center mt-2">All</div>
    `;
    return formatFilter;
}

async function loadGenreFilter() {
    let genreFilter = document.createElement('div');
    genreFilter.classList.add('dropdown', 'd-inline-block', 'mr-2');
    
    genreFilter.innerHTML =
    `
    <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        id="genreDropdown"
        data-mdb-toggle="dropdown"
        aria-expanded="false">
        Genre
    </button>
    <ul id="genreList" class="dropdown-menu" aria-labelledby="genreDropdown">
        <li><button class="dropdown-item">All</button></li>
        <li><hr class="dropdown-divider"></li>
        <li><button class="dropdown-item">Action</button></li>
        <li><button class="dropdown-item">Adventure</button></li>
        <li><button class="dropdown-item">Comedy</button></li>
        <li><button class="dropdown-item">Drama</button></li>
        <li><button class="dropdown-item">Ecchi</button></li>
        <li><button class="dropdown-item">Fantasy</button></li>
        <li><button class="dropdown-item">Horror</button></li>
        <li><button class="dropdown-item" data-mdb-toggle="tooltip" 
            data-mdb-placement="right" title="English: Magical Girl">
                Mahou Shoujo
            </button>
        </li>
        <li><button class="dropdown-item">Mecha</button></li>
        <li><button class="dropdown-item">Music</button></li>
        <li><button class="dropdown-item">Mystery</button></li>
        <li><button class="dropdown-item">Psychological</button></li>
        <li><button class="dropdown-item">Romance</button></li>
        <li><button class="dropdown-item">Sci-Fi</button></li>
        <li><button class="dropdown-item">Slice of Life</button></li>
        <li><button class="dropdown-item">Sports</button></li>
        <li><button class="dropdown-item">Supernatural</button></li>
        <li><button class="dropdown-item">Thriller</button></li>
    </ul>
    <div id="selectedGenre" class="h5 text-center mt-2">All</div>
    `;
    return genreFilter;
}

async function loadSortFilter() {
    let sortFilter = document.createElement('div');
    sortFilter.classList.add('dropdown', 'd-inline-block', 'mr-2');
    
    sortFilter.innerHTML =
    `
    <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        id="sortByDropdown"
        data-mdb-toggle="dropdown"
        aria-expanded="false">
        Sort by
    </button>
    <ul id="sortByList" class="dropdown-menu" aria-labelledby="sortByDropdown">
        <li><button class="dropdown-item">None</button></li>
        <li><hr class="dropdown-divider"></li>
        <li><button id="sortByTitle" class="dropdown-item">Title</button></li>
        <li><button id="sortByPop" class="dropdown-item">Popularity</button></li>
        <li><button id="sortByTrend" class="dropdown-item">Trending</button></li>
    </ul>
    <div id="selectedSort" class="h5 text-center mt-2">
        <span id="selectedSortText">None</span>
        <span id="reverseSortToggle" class="btn-sm btn-primary" style="cursor:pointer">
            <i class="fas fa-sort"></i>
        </span>
    </div>
    `;
    return sortFilter;
}

async function loadAdultToggle() {
    let adultToggle = document.createElement('div');
    adultToggle.classList.add('form-check', 'form-switch', 'd-inline-block', 'float-right', 'mt-1');
    
    adultToggle.innerHTML =
    `
    <input id="adultToggle" class="form-check-input" type="checkbox"/>
    <label class="form-check-label ml-3 h5" for="adultToggle"
        data-mdb-toggle="tooltip" data-mdb-placement="bottom" data-mdb-animation="true"
        title="Only show adult media. Note: You need to be authorized in AniList to view adult medias.">
        18+
    </label>
    <div class="h5 text-center mt-2">&nbsp;</div>
    `;
    return adultToggle;
}