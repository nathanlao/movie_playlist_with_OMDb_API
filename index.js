const submitForm = document.getElementById("search-form")
const searchInputEl = document.getElementById("search-input")
const movieLists = document.getElementById("movie-list")

let movieWatchList = JSON.parse(localStorage.getItem("myWatchList")) || []

submitForm.addEventListener("submit", searchByMovieTitle)

async function searchByMovieTitle(event) {
    event.preventDefault()

    const movieTitle = searchInputEl.value

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=464807e&s=${movieTitle}`)
        const data = await response.json()    
    
        // data array fetch from API
        const dataArray = data.Search
    
        // Store the movie id array
        let movieIdArray = []
        movieIdArray = dataArray.map((movie) => movie.imdbID)
    
        renderMovieLists(movieIdArray)
    } catch (error) {
        movieLists.innerHTML = `
        <section class="search-error-container">
            <img alt="video img" src="./images/video.png"/>
            <p class="search-error">
                Oops! Unable to find what you are looking for :D
            </p>
        </section>
    `
    }
}

function renderMovieLists(movieIdArray) {
    movieLists.innerHTML = ""

    // Fetch movie according to each movie imdbID
    movieIdArray.forEach(async movieId => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=464807e&i=${movieId}`)
        const data = await response.json()

        // Check if movieId is aleady in LS
        const inWatchList = movieWatchList.includes(data.imdbID)
        
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
                            class="add-watchlist ${inWatchList ? "disabled" : ""}"
                            id="add-${data.imdbID}"
                            onclick="addToWatchList('${data.imdbID}')"
                        >   
                            ${inWatchList ?
                                `<i class="fa-solid fa-check"></i>` :
                                `<i class="fa-solid fa-circle-plus"></i>`
                            }
                            Watchlist
                        </button>
                    </section>
                    <p class="movie-plot">${data.Plot}</p>
                </div>
            </div>
        `
        movieLists.innerHTML += movieHtml
    })
}

function addToWatchList(movieId) {
    // push to array if movid is not exist in the array
    if (!movieWatchList.includes(movieId)) {
        movieWatchList.push(movieId)
    } 
    
    localStorage.setItem("myWatchList", JSON.stringify(movieWatchList))

    // Change the icon if button is clicked
    const movieBtnEl = document.getElementById(`add-${movieId}`)
    movieBtnEl.innerHTML = `
        <i class="fa-solid fa-check"></i>
        Watchlist
    `
}

// localStorage.clear()