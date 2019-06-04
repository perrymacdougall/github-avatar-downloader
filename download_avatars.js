var request = require('request');
var secret = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
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