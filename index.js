// Your code here

const filmsList = document.getElementById('films');
const filmDetails = document.getElementById('film-details');
const filmTitle = document.getElementById('film-title');
const filmPoster = document.getElementById('film-poster');
const filmRuntime = document.getElementById('film-runtime');
const filmShowtime = document.getElementById('film-showtime');
const filmAvailableTickets = document.getElementById('film-available-tickets');
const buyTicketButton = document.getElementById('buy-ticket-button');

// Function to fetch films from the API
async function fetchFilms() {
  try {
    const response = await fetch('http://localhost:3000/films');
    const films = await response.json();
    return films;
  } catch (error) {
    console.error('Error fetching films:', error);
  }
}

// Function to fetch film details from the API
async function fetchFilmDetails(id) {
  try {
    const response = await fetch(`http://localhost:3000/films/${id}`);
    const film = await response.json();
    return film;
  } catch (error) {
    console.error('Error fetching film details:', error);
  }
}

// Function to display film details
function displayFilmDetails(film) {
  filmTitle.textContent = film.title;
  filmPoster.src = film.poster;
  filmRuntime.textContent = `Runtime: ${film.runtime} minutes`;
  filmShowtime.textContent = `Showtime: ${film.showtime}`;
  filmAvailableTickets.textContent = `Available Tickets: ${film.capacity - film.tickets_sold}`;
}

// Function to buy a ticket
function buyTicket(film) {
  if (film.tickets_sold < film.capacity) {
    film.tickets_sold++;
    displayFilmDetails(film);
    updateFilmsList(films);
  }
}

// Function to update the films list
function updateFilmsList(films) {
  filmsList.innerHTML = '';
  films.forEach((film) => {
    const li = document.createElement('li');
    li.classList.add('film', 'item');
    li.textContent = film.title;
    if (film.tickets_sold === film.capacity) {
      li.classList.add('sold-out');
    }
    filmsList.appendChild(li);
  });
}

// Function to initialize the app
async function init() {
  const films = await fetchFilms();
  const firstFilm = await fetchFilmDetails(1);
  displayFilmDetails(firstFilm);
  updateFilmsList(films);
  buyTicketButton.addEventListener('click', () => buyTicket(firstFilm));
}

init();
