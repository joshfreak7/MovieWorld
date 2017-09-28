var apiKey = "8dce3f182f08900d69796df3ce6f31f0";

function findMovie() {

    var query = 'Pirates';
    var url = 'https://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&query='+query;


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            document.getElementById('result').innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}