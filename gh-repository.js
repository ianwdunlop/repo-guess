/**
 * General namespace to keep things nicely separated.
 * @namespace
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author Ian Dunlop
 */
var thetravellingbard = thetravellingbard || {};

/**
 *  @constructor
 *  @param {string} URL - URL where the github api can be found eg https://api.github.com
 *  @license [MIT]{@link http://opensource.org/licenses/MIT}
 *  @author Ian Dunlop
 */
thetravellingbard.GithubRepo = function GithubRepo(URL) {
    this.URL = URL;
}

/**
 * Fetch the repository information for a github user.
 * @param {string} username - The github user of interest.
 * @param {function} callback - Function that will be called with the result.
 * @method
 * @example
 * var ghrepo = new thetravellingbard.GithubRepo("https://api.github.com");
 * var callback=function(success, status, response){
 *   // do something with the response
 * };
 * ghrepo.fetchRepositories('ianwdunlop', callback);
 */
thetravellingbard.GithubRepo.prototype.fetchRepositories = function(username, callback) {
    $.ajax({
        url: this.URL + "/users/" + username + "/repos?callback=processResponse",
        dataType: 'jsonp',
        jsonpCallback: 'processResponse',
        jsonp: 'callback'
    }).done(function(response, status, request) {
        callback.call(this, true, request.status, response);
    }).fail(function(response, status, statusText) {
        callback.call(this, false, response.status);
    })
}

/**
 * Find a github users 'favourite' language from their repository information.
 * @param {Object} repositories - A JSON structure containing github repositories for a user.
 * @method
 * @returns {Object} Containing the favourite language(s) and the repository count
 * @example
 * var ghrepo = new thetravellingbard.GithubRepo("https://api.github.com");
 * var callback=function(success, status, response){
 *   var favouriteLanguage = ghrepo.favouriteLanguage(response);
 * };
 * ghrepo.fetchRepositories('ianwdunlop', callback);
 */
thetravellingbard.GithubRepo.prototype.favouriteLanguage = function(repositories) {
    // A hash of language to count
    var languages = {};
    // Loop through the repositories and keep track of the language count
    if (repositories.data.length !== 0) {
        $.each(repositories.data, function(index, repo) {
            if (!repo.private) {
                if (repo.language != null) {
                    languages[repo.language] != null ? languages[repo.language] += 1 : languages[repo.language] = 1;
                }
            }
        });
    }
    // Find the language with the highest repository count
    var highestLanguage = [];
    var highestValue = 0;
    $.each(languages, function(key, value) {
        if (value > highestValue) {
            highestLanguage = [];
            highestLanguage.push(key)
            highestValue = value;
        } else if (value === highestValue) {
            highestLanguage.push(key);
        }
    });
    var response = {
        'count': highestValue,
        'languages': highestLanguage
    };
    return response;
}
