const submitForm = document.getElementById("search-form")
const searchInputEl = document.getElementById("search-input")
const movieLists = document.getElementById("movie-list")

submitForm.addEventListener("submit", searchByMovieTitle)

function searchByMovieTitle(event) {
    event.preventDefault()

    const movieTitle = searchInputEl.value

    fetch(`http://www.omdbapi.com/?apikey=464807e&s=${movieTitle}`)
        .then(res => res.json())
        .then(data => {
            // data array fetch from API
            const dataArray = data.Search

            // Store the movie id array
            let movieIdArray = []
            movieIdArray = dataArray.map((movie) => movie.imdbID)
            console.log(movieIdArray)

            renderMovieLists(movieIdArray)
        })
}

function renderMovieLists(movieIdArray) {
    movieLists.innerHTML = ""
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
                            </section>
                            <p class="movie-plot">${data.Plot}</p>
                        </div>
                    </div>
                `
                movieLists.innerHTML += movieHtml
            })
    })
}