let favourite = [];

// Function to take innput 
function takeInput() {
  const inputValue = document.getElementById('search-bar').value;

  if (inputValue === '') {
    alert("Please enter a movie name");
  } else {
    inputValue.innerHTML='';
    fetchMovies(inputValue);
  }
}

// Fetching movies from URL
async function fetchMovies(input) {
  const apikey = 'b486a48e';
  const URL = `https://www.omdbapi.com/?s=${input}&apikey=${apikey}`;
  const res = await fetch(URL);
  const data = await res.json();

  if (data.Response === "True") {
    renderMovies(data.Search);
  } else {
    alert("No movies found");
  }
}

// Function to render movie in DOM
function renderMovies(movieList) {
  const container = document.getElementById('search-result-container');
  container.innerHTML = '';
  movieList.forEach(function (movie) {
    addElementToDOM(movie, container);
  });
}

// Function to add movies to DOM
function addElementToDOM(movie, container) {
  const movieDiv = document.createElement('div');
  movieDiv.className = 'search-result';
  movieDiv.innerHTML = `
    <img src="${movie.Poster}" alt="Not Found">
    <h3>${movie.Title}</h3>
    <p>${movie.Year}</p>
    <button class="more-info" onclick="moreInfo('${movie.imdbID}')">More Info</button>
    <button class="add-favourite" onclick="addFavourite('${movie.imdbID}')">Add to Favourites</button>
  `;
  container.appendChild(movieDiv);
}

// Function to get movie data
async function moreInfo(movieId) {
  const movieData = await detailedMovieInfo(movieId);
  addMovieInfoToDOM(movieData);
}

// Function to get More info of movie from api using its unique IMDB id
async function detailedMovieInfo(movieId) {
  const apikey = 'b486a48e';
  const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${apikey}`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);

  return data;
}

// Making more info container visible and adding respective movie data to it
function addMovieInfoToDOM(movieData) {
  const moreInfoContainer = document.getElementById('more-info-container');
  const moreInfoContent = document.getElementById('more-info-content');
  moreInfoContent.innerHTML = `
    <img src=${movieData.Poster} alt="Not Found">
    <div class="text-content">
      <h3 class="more-info-heading">${movieData.Title}</h3>
      <p>${movieData.Year}</p>
      <h5>Rating:</h5>
      <p>${movieData.Ratings[0].Value}</p>
      <h5>Plot:</h5>
      <p>${movieData.Plot}</p>
      <h5>Cast:</h5>
      <p>${movieData.Actors}</p>
      <h5>Genre:</h5>
      <p>${movieData.Genre}</p>
      <button id="close" onclick="closeMoreInfo()">Close</button>
    </div>
  `;

  moreInfoContainer.style.display = 'block';
}

// To hide more info container
function closeMoreInfo() {
  const moreInfoContainer = document.getElementById('more-info-container');
  moreInfoContainer.style.display = 'none';
}

// To add movie to favourite array
async function addFavourite(movieId) {
  alert("Movie Added Successfully");
  const movieData = await detailedMovieInfo(movieId);
  favourite.push(movieData);
  renderFavourites(movieData);
}

const list = document.getElementById('movie-favourite');

// Function to render and add favourite movie to li in DOM
function renderFavourites() {
  const list = document.getElementById('movie-favourite');
  list.innerHTML = '';

  for (let i = 0; i < favourite.length; i++) {
    const movie = favourite[i];
    const li = document.createElement('li');
    li.setAttribute('movieId', movie.imdbID);
    li.innerHTML = `
      <p>${movie.Title}</p>
      <button onclick="moreInfo('${movie.imdbID}')">More Info</button>
      <img src="https://cdn-icons-png.flaticon.com/16/1214/1214428.png" alt="Delete" onclick="removeFavourite('${movie.imdbID}')">
    `;
    list.appendChild(li);
  }
}

// Delete Favourite movie from list
function removeFavourite(movieId) {
  alert("Movie deleted successfully");
  const index = favourite.findIndex(movie => movie.imdbID === movieId);
  if (index !== -1) {
    favourite.splice(index, 1);
    renderFavourites();
  }
}

// Function to make movie list visible
function showFavourites() {
  const favouriteContainer = document.getElementById('favourites-container');
  favouriteContainer.style.display = 'block';
}

// Function to hide favourites list
function hideFavourites() {
  const favouriteContainer = document.getElementById('favourites-container');
  favouriteContainer.style.display = 'none';
}
const closeButton = document.getElementById('favourites-close');
closeButton.addEventListener('click', hideFavourites);



