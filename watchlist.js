const watchlist = document.getElementById("movie-list")

// Get watchlist array from localStorage
let watchlistFromLS = JSON.parse(localStorage.getItem("myWatchList")) || []

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
                                    onclick="removeFromWatchList('${data.imdbID}')"
                                >
                                    <i class="fa-solid fa-circle-minus"></i>
                                    Remove
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

function removeFromWatchList(movieToBeRemoved) {
    let movieIndex = watchlistFromLS.indexOf(movieToBeRemoved)
    if (movieIndex !== -1) {
        watchlistFromLS.splice(movieIndex, 1)
        localStorage.setItem("myWatchList", JSON.stringify(watchlistFromLS))
    }
    renderWatchList()
}

function renderEmptyMsg() {
    watchlist.innerHTML = `
        <section class="empty-watchlist">
            <p class="empty-msg">Your watchlist is looking little empty...</p>
            <a href="index.html" class="add-some-movies">
                <i class="fa-solid fa-circle-plus"></i>
                <p>Let's add some movies!</p>
            </a>
        </section>
    `
}

function renderWatchList() {
    if (watchlistFromLS.length !== 0){
        renderMovieLists(watchlistFromLS)
    } else {
        renderEmptyMsg()
    }
}

renderWatchList()
