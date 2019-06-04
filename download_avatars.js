var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  // Checking to see if required arguments have been passed
  // If not, throws an error
  if (process.argv[2] && process.argv[3]) {
    console.log('Welcome to the GitHub Avatar Downloader!');

    // Creating an object to pass the url and authentication data to my HTTP request
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + secret.GITHUB_TOKEN
      }
    };


    // Making an HTTP request with the Node module
    request(options, function(err, res, body) {
      // Parsing the JSON into an object
      var parsedData = JSON.parse(body);

      // Handing back the object to my callback function
      cb(err, parsedData);
    });
  } else {
    throw error;
  }
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  // Looping over the array of objects to pull the avatar_url value
  result.forEach(function(e) {
    downloadImageByURL(e.avatar_url, e.login);
  });

});

function downloadImageByURL(url, filePath) {
  // Using the Request module again to make another HTTP request,
  // the relevant image and pipe it to a subdirectory
  request.get(url)
         .on('error', function(err) {
           throw err;
         })
         .on('response', function(response) {
           console.log('Response Status Code: ', response.statusCode);
           console.log('Response Status Message: ', response.statusMessage);
           console.log('Response Headers: ', response.headers['content-type']);
           console.log('Downloading image...');
         })
         .pipe(fs.createWriteStream('avatars/' + filePath + '.jpg'))
         .on('finish', function() {
           console.log('Download complete');
         })
};
