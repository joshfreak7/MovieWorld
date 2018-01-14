import '../css/index.less';
import 'bootstrap';
// import * as _ from 'lodash';
import 'less';
import createModel from './movie-model';

import {apiKey} from './constants.js';
import {showDetails} from './movie-details/movie-details';

// import {MongoClient} from 'mongodb';

// import assert from 'assert';

const $searchInput = $('#search-input');
const $search = $('#search-bar');
const $searchBtn = $('#search-btn');
const $bestRatedBtn = $('#best-rated-btn');
const $mostPopularBtn = $('#most-popular-btn');
const $upcomingBtn = $('#upcoming-btn');
const $favoritesBtn = $('#favorites-btn');

$searchInput.on('blur', doSearch);
$search.on('submit', doSearch);
$searchBtn.on('click', doSearch);
$bestRatedBtn.on('click', showBestRated);
$mostPopularBtn.on('click', showMostPopular);
$upcomingBtn.on('click', showUpcoming);
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
                    .on('click', () => showMovieDetails(model.getMovie(movie.id))),
                $('<button>')
                    .addClass('favorite-btn')
                    .text('fav')
            );
    }
}

function showMovieDetails(movie) {

    const $movieDetails = $('#movieDetails');
    $movieDetails.html('');
    $('<tr>')
        .appendTo($movieDetails)
        .addClass('table-striped')
        .append(
            $('<th>').text('Titel'),
            $('<th>').text('Rating'),
            $('<th>').text('Votes')
        );
    $('<tr>')
        .appendTo($movieDetails)
        .append(
            $('<td>').text(movie.title),
            $('<td>').text(movie.rating + ' / 10'),
            $('<td>').text(movie.votes)
        );
    showDetails(model.getMovie(movie.id));
}

function getMovies(url) {
    model.resetMovieList();

    $.get(url, function(data) {
        const movies = data.results;
        for (const movie of movies) {
            model.addMovie(movie);
        }
    });
}

function doSearch() {
    const query = $searchInput.val();
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + query + '&language=de-CH';
    getMovies(url);
}

function showBestRated() {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=de-CH';
    getMovies(url);
}

function showMostPopular() {
    const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key='
        + apiKey + '&language=de-CH';
    getMovies(url);
}

function showUpcoming() {
    const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + apiKey + '&language=de-CH';
    getMovies(url);
}

function showFavorites() {
    // TODO
    model.resetMovieList();

}

/*
// Unfortunately not integrated to Movie World to save Favorites and Search History
function connectToMongoDB() {
    const url = 'mongodb://localhost:27017/myproject';

    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log('Connected successfully to server');
        const database = db.db('MoviesDB');
        db.close();
    });
}

// Unfortunately not integrated to Movie World to save Favorites and Search History
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([ {a : 1}, {a : 2}, {a : 3} ],
        function(err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n); // result = the document
            assert.equal(3, result.ops.length); // ops = the inserted docs
            console.log('Inserted 3 documents into the collection');
            callback(result); // Call callback function
        });
}

// Unfortunately not integrated to Movie World to save Favorites and Search History
const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log('Found the following records');
        console.log(docs)
        callback(docs); // Call callback function
    });
}

// Unfortunately not integrated to Movie World to save Favorites and Search History
const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update first document where a is 2, set b equal to 1
    // $set updates existing attributes or inserts new attributes
    collection.updateOne({ a : 2 } , { $set: { b : 1 } },
        function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log('Updated document with field a equal 2');
            callback(result);
        });
}

// Unfortunately not integrated to Movie World to save Favorites and Search History
const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete first document where a is 3
    collection.deleteOne({ a : 3 }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('Removed document with field a equal 3');
        callback(result);
    });
}
*/

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
