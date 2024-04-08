/* eslint-disable no-unused-vars */
// eslint-disable-next-line object-curly-newline
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
import FavoriteMovieView from '../src/scripts/views/pages/liked-movies/favorite-movie-view';

describe('Searching Movies', () => {
  let presenter;
  let favoriteMovies;
  let view;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    view = new FavoriteMovieView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteMovies = {
      getAllMovies: jest.fn(),
      searchMovies: jest.fn(),
    };
    presenter = new FavoriteMovieSearchPresenter({ favoriteMovies, view });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('Should be able to capture the query typed by the user', () => {
      favoriteMovies.searchMovies.mockImplementation(() => []);

      searchMovies('film a');

      expect(presenter.latestQuery).toEqual('film a');
    });

    it('Should ask the model to search for liked movies', () => {
      favoriteMovies.searchMovies.mockImplementation(() => []);

      searchMovies('film a');

      expect(favoriteMovies.searchMovies).toHaveBeenCalledWith('film a');
    });

    it('Should show the movies found by Favorite Movies', (done) => {
      document
        .getElementById('movies')
        .addEventListener('movies:updated', () => {
          expect(document.querySelectorAll('.movie-item').length).toEqual(3);

          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => {
        if (query === 'film a') {
          return [
            { id: 111, title: 'film abc' },
            { id: 222, title: 'ada juga film abcde' },
            { id: 333, title: 'ini juga boleh film a' },
          ];
        }
        return [];
      });
      searchMovies('film a');
    });

    it('Should show the name of the movies found by Favorite Movies', (done) => {
      document
        .getElementById('movies')
        .addEventListener('movies:updated', () => {
          const movieTitles = document.querySelectorAll('.movie__title');

          expect(movieTitles.item(0).textContent).toEqual('film abc');
          expect(movieTitles.item(1).textContent).toEqual(
            'ada juga film abcde',
          );
          expect(movieTitles.item(2).textContent).toEqual(
            'ini juga boleh film a',
          );

          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => {
        if (query === 'film a') {
          return [
            { id: 111, title: 'film abc' },
            { id: 222, title: 'ada juga film abcde' },
            { id: 333, title: 'ini juga boleh film a' },
          ];
        }
        return [];
      });

      searchMovies('film a');
    });

    it('Should show - when the movie returned does not contain a title', (done) => {
      document
        .getElementById('movies')
        .addEventListener('movies:updated', () => {
          const movieTitles = document.querySelectorAll('.movie__title');
          expect(movieTitles.item(0).textContent).toEqual('-');

          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => {
        if (query === 'film a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchMovies('film a');
    });
  });

  describe('When query is empty', () => {
    it('Should capture the query as empty', () => {
      favoriteMovies.getAllMovies.mockImplementation(() => []);

      searchMovies(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite movies', () => {
      favoriteMovies.getAllMovies.mockImplementation(() => []);

      searchMovies('    ');
      expect(favoriteMovies.getAllMovies).toHaveBeenCalled();
    });
  });

  describe('When no favorite movies could be found', () => {
    it('Should show the empty message', (done) => {
      document
        .getElementById('movies')
        .addEventListener('movies:updated', () => {
          expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1);

          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => []);

      searchMovies('film a');
    });

    it('Should not show any movie', (done) => {
      document
        .getElementById('movies')
        .addEventListener('movies:updated', () => {
          expect(document.querySelectorAll('.movie-item').length).toEqual(0);

          done();
        });

      favoriteMovies.searchMovies.mockImplementation((query) => []);
      searchMovies('film a');
    });
  });
});
