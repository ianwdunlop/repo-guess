// Unobtrusive JS. Separate the event handlers from the markup
window.onload = function() {
    document.getElementById('find-user').onclick = findUser;
};
// Use jQuery, AJAX & JSONP to get user repository details from github
function findUser() {
    var ghrepo = new thetravellingbard.GithubRepo("https://api.github.com");
    var callback = function(success, status, response) {
        var favouriteLanguage = ghrepo.favouriteLanguage(response);
        if (favouriteLanguage.count != 0) {
            var languages = favouriteLanguage.languages.join();
            // TODO - would be nice to replace the final ',' with 'and'
            $("#favourite-language").html("Your favourite language is <mark>" + languages + "</mark>");
        } else {
            $("#favourite-language").html("Couldn't find one. Sorry.");
        }
    };
    var username = $("#username")[0].value;
    if (username != null) {
        ghrepo.fetchRepositories(username, callback);
    } else {
        // error handling
    }
}
