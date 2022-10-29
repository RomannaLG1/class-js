// Add imports above this line
// import { skillsItems } from './gallery-items';
// // Change code below this line

// console.log(skillsItems);
import {
  fetchPopularMovies,
  fetchMovieById,
  fetchMoviesGenres,
} from './api-service';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.movies-list');

fetchPopularMovies(3).then(response => {
  for (const elm in response.data.results.genre_ids) {
    // console.log('11111111111111111111111');
    // console.log(response.data.results.genre_ids);
    console.log(elm);
  }

  const itemMarkup = renderMoviesCard(response.data.results);
  listEl.insertAdjacentHTML('beforeend', itemMarkup);
});

//fetchMovieById(299536).then(response => renderMoviesCard(response.data));
const arrayGenres = [];
fetchMoviesGenres().then(response => {
  console.log(response);
  for (const elm of response.data.genres) {
    // console.log(elm);
    arrayGenres.push(elm);
  }
});
console.log(arrayGenres);
// function clearListEl() {
//   listEl.innerHTML = '';
// }

function renderMoviesCard(movies) {
  return movies
    .map(
      ({ id, poster_path, title, original_title, genre_ids, release_date }) => {
        return ` <li class='movie-info'>
      <a href="#" id="${id}">
      
          <img
            class='movie-poster'
            src='https://image.tmdb.org/t/p/w500/${poster_path}'
            alt='${title}'
            width='395'
            height='574'
          />
      
          <h3 class='movie-title'> ${original_title}</h3>
          <p class='genres'>${genre_ids}</p>
          <p class='year'>${Number.parseInt(release_date)}</p>
      </a>
          
      
        </li>`;
      }
    )
    .join('');
}
