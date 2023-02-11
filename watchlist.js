const watchlist = document.getElementById("movie-list")

// Get watchlist array from localStorage
let watchlistFromLS = JSON.parse(localStorage.getItem("myWatchList"))

function renderMovieLists(movieIdArray) {
    watchlist.innerHTML = ""
    // Fetch movie according to each movie imdbID
    movieIdArray.forEach(movieId => {
        fetch(`http://www.omdbapi.com/?apikey=464807e&i=${movieId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
    
                let movieHtml = ""
                movieHtml += `
                    <div class="movie">
                        <img 
                            class="movie-poster"
                            alt="movie poster" 
                            src="${data.Poster === "N/A" ? "./images/imageNotFound.png" : data.Poster}"
                        />
                        <div class="movie-content-wrapper">
                            <header class="flex">
                                <h4 class="movie-title">${data.Title}</h4>
                                <div class="movie-rating-wrapper flex">
                                    <span class="icon-star">
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <h4 class="movie-rating">${data.imdbRating}</h4>
                                </div>
                            </header>
                            <section class="movie-details flex">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <button 
                                    class="add-watchlist"
                                    id="add-${data.imdbID}"
                                    onclick="addToWatchList('${data.imdbID}')"
                                >
                                    <i class="fa-solid fa-circle-plus"></i>
                                    Watchlist
                                </button>
                            </section>
                            <p class="movie-plot">${data.Plot}</p>
                        </div>
                    </div>
                `
                watchlist.innerHTML += movieHtml
            })
    })
}

function renderWatchList() {
    if (watchlistFromLS){
        renderMovieLists(watchlistFromLS)
    }
}

renderWatchList()
