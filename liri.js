var action = process.argv[2];
var value = process.argv[3];
var keys = require("./keys.js")
var twitter = require("twitter");
var client = new twitter("keys.twitterKeys");
var params = {
    screen_name: "tictac_unicorn",
    count: 20
}
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");

switch (action) {
    case "my-tweets":
        twitter();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        random();
        break;
}


function twitter() {
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            console.log(tweets);
        }
    })
}


function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    })
}
