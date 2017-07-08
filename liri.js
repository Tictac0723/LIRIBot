var action = process.argv[2];
var value = process.argv[3];
var keys = require("./keys.js");
var twitter = require("twitter");
var client = new twitter(keys.twitterKeys);
var params = {
    screen_name: "tictac_unicorn",
    count: 20
}
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotifyKeys);
var request = require("request");
var fs = require("fs");

switch (action) {
    case "my-tweets":
        console.log("here");
        invokeTwitter();
        break;

    case "spotify-this-song":
        invokeSpotify();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        random();
        break;
}


function invokeTwitter() {
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {
            fs.writeFile('log.txt', "");
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                fs.appendFile('log.txt', ("Tweet: " + tweets[i].text + "Date & Time: " + tweets[i].created_at + "\r\n"))
            }
        } else {
            console.log(error);
        }
    })
}

function invokeSpotify() {
    spotify.search({ type: 'track', query: value }, function(error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        } else {
            fs.writeFile('log.txt', "");
            var firstObject = data.tracks.items[0];
            console.log(firstObject.artists[0].name);
            console.log(firstObject.name);
            console.log(firstObject.external_urls.spotify);
            console.log(firstObject.album.name);
            fs.appendFile('log.txt', ("Song Title: " + firstObject.name + "\r\n" + "Artist Name: " + firstObject.artists[0].name + "\r\n" + "Listen: " + firstObject.external_urls.spotify + "\r\n" + "Album Name: " + firstObject.album.name + "\r\n"))

        }
    })
}


function movie() {
    if (value === undefined) {
        var value = "Mr. Nobody"
    }
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

function random() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log("Whoops! There's a glitch in the Matrix!" + error);
        } else {
            console.log(data);
            var text = data.trim().split(",");
            action = text[0];
            value = text[1];
            switch (action) {
                case "my-tweets":
                    console.log("here");
                    invokeTwitter();
                    break;

                case "spotify-this-song":
                    invokeSpotify();
                    break;

                case "movie-this":
                    movie();
                    break;
            }

        }
    })
}
