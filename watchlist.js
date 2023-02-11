const watchlist = document.getElementById("movie-list")

// Get watchlist array from localStorage
let watchlistFromLS = JSON.parse(localStorage.getItem("myWatchList"))
console.log(watchlistFromLS)