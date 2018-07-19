// set the environment varibles to the global process.env object
require('dotenv').config();

// varible to hold Twitters API
var Twitter = require('twitter');
// varible to hold Spotifys API
var Spotify = require('node-spotify-api');
// varible to hold the Twitter and Spotify keys
var keys = require('./keys.js');
// varible to hold OMDB API
var request = require('request');
// used for the random.txt
var fs = require('fs');

var action = process.argv[2];
var title = process.argv[3];

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

if(action === "my-tweets"){
    // returns a collection of the most recent Tweets and Retweets posted by the authenticating user
    twitter.get('statuses/home_timeline',{count: 20}, function(error, tweets, response){
        if(!error){
            // loops through the tweets
            for(var i = 0; i < tweets.length; i++){
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log("----------------------\n");
            }
        }
    });

}else if(action === "spotify-this-song"){
    spotifySong();

}else if(action === "movie-this"){
    request(queryUrl, function(error, response, body){
        if(!error && response.statusCode === 200){
            // parse the body of the site and recover certain values
            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
        }
    });
}else if(action === "do-what-it-says"){
    // will read "random.txt", and display the data
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if(error){
            return console.log(error);
        }
        
        var dataArr = data.split(",");
        action = dataArr[0];
        title = dataArr[1];
        spotifySong();
    });
}

// function that will display the track
function spotifySong(){
    if(!title){
        title = "The Sign"
    }
    spotify.search({type: 'track', query: title, limit: 10}, function(err, data){
        if(err){
            return console.log(err);
        }
        for(var i = 0; i < data.tracks.items.length; i++){
        console.log(data.tracks.items[i].album.artists[0].name);
        console.log(data.tracks.items[i].name);
        console.log(data.tracks.items[i].album.external_urls.spotify);
        console.log(data.tracks.items[i].album.name);
        console.log("-----------------------------------------\n")
        }
    });
}

