/* eslint-disable no-new */
// import { createMovieItemTemplate } from '../templates/template-creator';
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import FavoriteMovieView from './liked-movies/favorite-movie-view';
import FavoriteMovieShowPresenter from './liked-movies/favorite-movie-show-presenter';
import FavoriteMovieSearchPresenter from './liked-movies/favorite-movie-search-presenter';

const view = new FavoriteMovieView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteMovieShowPresenter({ view, favoriteMovies: FavoriteMovieIdb });
    new FavoriteMovieSearchPresenter({ view, favoriteMovies: FavoriteMovieIdb });

    // const movies = await FavoriteMovieIdb.getAllMovies();
    // const moviesContainer = document.querySelector('#movies');
    // movies.forEach((movie) => {
    //   moviesContainer.innerHTML += createMovieItemTemplate(movie);
    // });
  },
};

export default Like;
