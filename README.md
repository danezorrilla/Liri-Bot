# Liri-Bot
<br>

LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. It can return 4 items: your latest tweets, information about a spotify track, information about a movie title, and it will read a file.<br>
<br>
Instruction:<br>
1) Clone the repo.<br>
2) Create a .env file, and set you API keys.<br>
3) On the command line write node liri.js <action> <name here>.<br>
4) On the 'action' argument you have 4 options: 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'.<br>
5) The 'name here' argument is optional for the 'spotify-this-song' action, but required for the 'movie-this' action.<br>
6) A list of information will de display on the console.<br>
<br>
Process:<br>
1) npm init my root project, and install the four npm packages
2) gitignore my .env file
3) Create keys.js file to hole my keys and export it
4) Imported my keys and build Liri(See the comments in liri.js for more info); 