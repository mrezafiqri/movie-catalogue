class FavoriteMovieShowPresenter {
  constructor({ view, favoriteMovies }) {
    this._view = view;
    this._favoriteMovies = favoriteMovies;

    this._showFavortieMovies();
  }

  async _showFavortieMovies() {
    const movies = await this._favoriteMovies.getAllMovies();
    this._displayMovies(movies);
  }

  // eslint-disable-next-line class-methods-use-this
  _displayMovies(movies) {
    this._view.showFavoriteMovies(movies);
  }
}

export default FavoriteMovieShowPresenter;
