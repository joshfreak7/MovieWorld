import '../css/index.less';
import 'bootstrap';
// import * as _ from 'lodash';
import 'less';
import createModel from './movie-model';

import {apiKey} from './constants.js';
import {showDetails} from './movie-details/movie-details';

const $searchInput = $('#search-input');
const $search = $('#search-bar');
const $searchBtn = $('#search-btn');
const $bestRatedBtn = $('#best-rated-btn');
const $mostPopularBtn = $('#most-popular-btn');
const $favoritesBtn = $('#favorites-btn');

$searchInput.on('blur', doSearch);
$search.on('submit', doSearch);
$searchBtn.on('click', doSearch);
$bestRatedBtn.on('click', showBestRated);
$mostPopularBtn.on('click', showMostPopular);
$favoritesBtn.on('click', showFavorites);

const model = createModel();

function renderMovies() {

    const $resultList = $('#result');
    $resultList.html('');
    for (const movie of model.movieList) {
        $('<li>')
            .appendTo($resultList)
            .addClass('list-group-item')
            .append(
                $('<button>')
                    .addClass('movie-item')
                    .text(movie.title + ' - Rating: ' + movie.rating + ' / 10 (' + movie.votes + ' votes)')
                    .on('click', () => showDetails(model.getMovie(movie.id)))
            );
    }
}

function doSearch() {
    const query = $searchInput.val();
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + query;

    model.resetMovieList();

    $.get(url, function(data) {
        const movies = data.results;
        for (const movie of movies) {
            model.addMovie(movie);
        }
    });
}

function showBestRated() {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=de-CH';

    model.resetMovieList();

    $.get(url, function(data) {
        const movies = data.results;
        for (const movie of movies) {
            model.addMovie(movie);
        }
    });
}

function showMostPopular() {
    const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + apiKey;

    model.resetMovieList();

    $.get(url, function(data) {
        const movies = data.results;
        for (const movie of movies) {
            model.addMovie(movie);
        }
    });
}

function showFavorites() {

    model.resetMovieList();
    // TODO
    /*
    $.get(url, function (data) {
        const movies = data.results;
        for (const movie of movies) {
            model.addMovie(movie);
        }
    });
   */
}

$(model).on('modelchange', () => {
    renderMovies();
});

function prepareUI() {
    const formsNodeList = document.querySelectorAll('form');

    for (let i = 0; i < formsNodeList.length; i++) {
        formsNodeList[i].addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
}

prepareUI();
