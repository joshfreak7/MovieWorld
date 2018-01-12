export interface MovieModel {
    movieList: Movie[];
    addMovie: (movie: any) => void;
    getMovie: (id: string) => Movie;
    resetMovieList: () => void;
}

class Movie {
    public id: string;
    public title: string;
    public rating: number;
    public votes: number;

    constructor(id, title, rating, votes) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.votes = votes;
    }
}

function createModel() {

    function addMovie(movie: any) {
        model.movieList.push(new Movie(movie.id, movie.title, movie.vote_average, movie.vote_count));
        notifyModelChange();
    }

    function getMovie(id: string) {
        return model.movieList.find((movie) => {
            return movie.id === id;
        });
    }

    function resetMovieList() {
        model.movieList = [];
        notifyModelChange();
    }

    function notifyModelChange() {
        $model.trigger('modelchange');
    }

    const model: MovieModel = {movieList: undefined, addMovie, getMovie, resetMovieList};
    model.movieList = [];
    const $model = $(model);

    return model;
}

export default createModel;
