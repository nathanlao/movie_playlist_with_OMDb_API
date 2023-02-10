/**
 * Poster
: 
"https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
Title
: 
"Blade Runner"
Type
: 
"movie"
Year
: 
"1982"
imdbID
: 
"tt0083658"
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

            movieLists.innerHTML = ""
            // Fetch movie according to each movie imdbID
            movieIdArray.forEach(movieId => {
                fetch(`http://www.omdbapi.com/?apikey=464807e&i=${movieId}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)

                        let movieHtml = ""
                        movieHtml += `
                            <div>
                                <img alt="movie poster" src=${data.Poster}/>
                            </div>
                        `
                        movieLists.innerHTML += movieHtml
                    })
            })
        })
})