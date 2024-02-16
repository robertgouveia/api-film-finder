const tmdbKey = '9edc80455ee9a8b1a1f6ff61df88a475';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async() => {
  let genreRequestEndpoint = '/genre/movie/list'
  let queryString = `?api_key=${tmdbKey}`
  let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${queryString}`
  try {
    let response = await fetch(urlToFetch)
    if(response.ok){
      let jsonResponse = await response.json()
      return genres = jsonResponse.genres
    }
  } catch (error) {
    console.log(error)
  }
};

const getMovies = async() => {
  const selectedGenre = getSelectedGenre();
  let discoverMovieEndpoint = '/discover/movie'
  let requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
  let urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`
  try {
    let response = await fetch(urlToFetch)
    if(response.ok){
      let jsonResponse = await response.json()
      return movies = jsonResponse.results
    } else {
      console.log('failed to respond')
    }
  } catch (error) {
    console.log(error)
  }
};

const getMovieInfo = async(movie) => {
  let movieEndpoint = `/movie/${movie.id}`
  let requestParams = `?api_key=${tmdbKey}`
  let urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`
  try {
    let response = await fetch(urlToFetch)
    if(response.ok){
      return movieInfo = response.json()
    }
  } catch (error) {

  }

};
// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  let movies = await getMovies()
  let randomMovie = await getRandomMovie(movies)
  let info = await getMovieInfo(randomMovie)
  displayMovie(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
