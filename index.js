/**
 * Actors
: 
"Harrison Ford, Rutger Hauer, Sean Young"
Awards
: 
"Nominated for 2 Oscars. 13 wins & 19 nominations total"
BoxOffice
: 
"$32,914,489"
Country
: 
"United States"
DVD
: 
"30 Oct 2001"
Director
: 
"Ridley Scott"
Genre
: 
"Action, Drama, Sci-Fi"
Language
: 
"English, German, Cantonese, Japanese, Hungarian, Arabic, Korean"
Metascore
: 
"84"
Plot
: 
"A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator."
Poster
: 
"https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
Production
: 
"N/A"
Rated
: 
"R"
Ratings
: 
(3) [{…}, {…}, {…}]
Released
: 
"25 Jun 1982"
Response
: 
"True"
Runtime
: 
"117 min"
Title
: 
"Blade Runner"
Type
: 
"movie"
Website
: 
"N/A"
Writer
: 
"Hampton Fancher, David Webb Peoples, Philip K. Dick"
Year
: 
"1982"
imdbID
: 
"tt0083658"
imdbRating
: 
"8.1"
imdbVotes
: 
"775,925"
 */
const submitForm = document.getElementById("search-form")
const searchInputEl = document.getElementById("search-input")
const movieLists = document.getElementById("movie-list")

submitForm.addEventListener("submit", (e) => {
    e.preventDefault()

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
})

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
                            <section class="flex">
                                <h4>${data.Runtime}</h4>
                                <h4>${data.Genre}</h4>
                            </section>
                            <p>${data.Plot}</p>
                        </div>
                    </div>
                `
                movieLists.innerHTML += movieHtml
            })
    })
}