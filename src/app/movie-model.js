class Movie {
    constructor(id, title, rating, votes){
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.votes = votes;
    }
}

function addMovie(movie) {
    model.movieList.push(new Movie(movie.id, movie.title, movie.vote_average, movie.vote_count));
    notifyModelChange();
}

function getMovie(id) {
    return model.movieList.find(function(movie){
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

const model = {addMovie, getMovie, resetMovieList};
model.movieList = [];
const $model = $(model);

export default model;