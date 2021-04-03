class Global {
    constructor() {
        this.content = undefined;
        this.results = undefined;
        this.searchBox = undefined;
        this.pagination = undefined;
        this.lastPage = undefined;
        this.search = undefined;
        this.format = undefined;
        this.status = undefined;
        this.season = undefined;
        this.year = undefined;
        this.genres = undefined;
        this.tags = undefined;
        this.sort = undefined;
        this.currentPage = 1;
        this.reverseSort = false;
        this.isAdult = false;
        this.filters = [];
    }
}

export default (new Global);