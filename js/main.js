window.addEventListener('load', function() {
    let results = document.querySelector('#results');

    


    async function requestAPI(vars) {
        await fetch(url)
            .then(handleResponse)
    }

    function handleResponse(response) {
        return response.json().then(json => {
            return response.ok ? json : Promise.reject();
        });
    }
});