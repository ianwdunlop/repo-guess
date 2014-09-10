describe("Github Repository Language Guess", function() {
    var repoGuess;

    beforeEach(function() {
        repoGuess = new thetravellingbard.GithubRepo("https://api.github.com");
    })
    describe("find repositories for a user", function() {

        it("can be executed", function() {
            spyOn(repoGuess, 'fetchRepositories');
            repoGuess.fetchRepositories('username', 'callback');
            expect(repoGuess.fetchRepositories).toHaveBeenCalled();
        });
        it("can calculate favourite languages", function() {
            var response = {
                "data": [{
                    "language": "Ruby"
                }, {
                    "language": "Java"
                }, {
                    "language": "Ruby"
                }, {
                    "language": "Ruby"
                }, {
                    "language": "Javascript"
                }]
            };
            var favLanguages = repoGuess.favouriteLanguage(response);
            expect(favLanguages.languages.length).toEqual(1);
            expect(favLanguages.languages[0]).toEqual("Ruby");
            expect(favLanguages.count).toEqual(3);
        });
        it("can handle multiple favourite languages", function() {
            var response = {
                "data": [{
                    "language": "Ruby"
                }, {
                    "language": "Java"
                }, {
                    "language": "Java"
                }, {
                    "language": "Ruby"
                }, {
                    "language": "Javascript"
                }]
            };
            var favLanguages = repoGuess.favouriteLanguage(response);
            expect(favLanguages.languages.length).toEqual(2);
            expect($.inArray("Ruby", favLanguages.languages)).not.toEqual(-1);
            expect($.inArray("Java", favLanguages.languages)).not.toEqual(-1);
            expect(favLanguages.count).toEqual(2);
        });
        it("can handle no respositories", function() {
            var response = {
                "data": {
                    "message": "Not found"
                }
            };
            var favLanguages = repoGuess.favouriteLanguage(response);
            expect(favLanguages.languages).toBeDefined();
            expect(favLanguages.count).toBeDefined();
            expect(favLanguages.languages.length).toEqual(0);
            expect(favLanguages.count).toEqual(0);
        });
    });
    describe("asynchronous request", function() {
        beforeEach(function(done) {
            var callback = function(success, status, response) {
                this_success = success;
                this_status = status;
                this_result = repoGuess.favouriteLanguage(response);
                done();
            };

            repoGuess.fetchRepositories('ianwdunlop', callback);

        });
        it("can return a response", function() {
            expect(this_success).toEqual(true);
            expect(this_status).toEqual(200);
            expect(this_result.count).toBeGreaterThan(0);
            expect(this_result.languages.length).toBeGreaterThan(0);

        });
    });
});
