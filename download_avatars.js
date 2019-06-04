var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
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
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // Looping over the array of objects to pull the avatar_url value
  result.forEach(function(e) {
    console.log(e.avatar_url);
  });

  // console.log("Errors:", err);
  // console.log("Result:", ;
});

function downloadImageByURL(url, filePath) {
  // Using the Request module again to make another HTTP request,
  // the relevant image and pipe it to a subdirectory
  request.get('https://avatars2.githubusercontent.com/u/2741?v=3&s=466')
          .on('error', function(err) {
            throw err;
            console.log('error block');
          })
          .on('response', function(response) {
            console.log('Response Status Code: ', response.statusCode);
            console.log('Response Status Message: ', response.statusMessage);
            console.log('Response Headers: ', response.headers['content-type']);
            console.log('Downloading image...');
            console.log('response block');
          })
          .pipe(fs.createWriteStream('avatars/kvirani.jpg'))
          .on('finish', function() {
            console.log('Download complete');
          })


downloadImageByURL();