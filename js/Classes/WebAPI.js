import Loader from './Loader.js';
import Constants from './Constants.js'
import Global from './Global.js';

class WebAPI {
    constructor() {
        this._loader = new Loader();
    }

    async request(reset) {
        if (reset) Global.currentPage = 1;
    
        Global.results.clear();
        this._loader.load(Global.results);
    
        // Define the variables
        let variables = {
            page: Global.currentPage,
            search: Global.search,
            format: Global.format,
            status: Global.status,
            season: Global.season,
            year: Global.year,
            genres: Global.genres,
            tags: Global.tags,
            sort: Global.sort,
            isAdult: Global.isAdult,
        };
    
        // Define the config for the API request
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: Constants.query,
                variables: variables
            }),
        }
    
        // CONSOLE THE VARIABLES
        // console.dir(variables)
    
        // Make the HTTP API request
        await fetch(Constants.url, options)
            .then(handleResponse)
            .then(handleData)
            .catch(handleError);
        
        Global.pagination.setup();

        function handleResponse(response) {
            return response.json().then(function (json) {
                return response.ok ? json : Promise.reject(json);
            });
        }
        
        function handleData(json) {
            // Clear the results container
            Global.results.clear();
        
            // Set the last page
            Global.lastPage = json.data.Page.pageInfo.lastPage;
        
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
            Global.results.addChild(newRow);
        }
        
        function handleError(error) {
            console.log(error);
        }
    }
}

export default (new WebAPI);