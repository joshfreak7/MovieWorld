export function showDetails(movie) {
    console.log(movie.title);
    console.log('Rating: ' + movie.rating + ' / 10 (' + movie.votes + ' votes)');

    const $movieDetails = $('#movieDetails');
    $movieDetails.html('');
    $('<tr>')
        .appendTo($movieDetails)
        .append(
            $('<th>')
                .text('Titel'),
        )
        .append(
            $('<th>')
                .text('Rating'),
        )
        .append(
            $('<th>')
                .text('Votes'),
        );
    $('<tr>')
        .appendTo($movieDetails)
        .append(
            $('<td>')
                .text(movie.title),
        )
        .append(
            $('<td>')
                .text(movie.rating + ' / 10'),
        )
        .append(
            $('<td>')
                .text(movie.votes),
        );
}
