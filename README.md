# What's your favourite language?
Uses jquery to get information about a users repositories from the github API using AJAX and JSONP. The response data is then processed to figure out what the favourite language is for that user and displays a helpful message.  
Try it [here](http://ianwdunlop.github.io/repo-guess/ "Live version of the code").

## Usage
Open up index.html in a browser or serve it from your favourite webserver. Bootstrap/jQuery dependencies are loaded from CDN. Project specific js ie repo-guess.js and gh-repository.js are loaded from the same directory as index.html. If you move them make sure that you alter the src property for the appropriate script tags.

## Testing

Open SpecRunner.html in a browser. Uses [Jasmine](https://github.com/pivotal/jasmine "Jasmine javascript testing framework").

## Licence
The source code is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
