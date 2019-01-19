var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require('request');
var moment = require("moment");
var axios = require("axios");

var keys = new Spotify({
  id: "dfb12819cae34967bab3bac4125d0205",
  secret: "b8b651edfbfe439fb3a49a491ac354ab"
});


function myswitch(caseData,functionData){
  switch(caseData) {
   
    case "spotify-this-song":
   
       getMeSpotify(functionData)
        break;
      case "concert-this":
    
       getMyConcert(functionData)
       break;
       
       case "movie-this":

       getMyMovie(functionData)
       break;
       
     default:
  }
}

function getMeSpotify(functionData){

    if(functionData===undefined){
      functionData = "The Sign"
    }


    keys.search({ type: 'track', query: functionData, limit: 3 }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      }
      var info=(data.tracks.items);
      for (let index = 0; index < info.length; index++) {
        const element = info[index];
        console.log("Artist Name- "+element.artists[0].name);
        console.log("Song Name- "+element.name);
        console.log("Link to preview Song- "+element.external_urls.spotify);
        console.log("Album Name- "+element.album.name);
      }
     

  




      

  });
    
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMyConcert(functionData){
var link = "https://rest.bandsintown.com/artists/" + functionData + "/events?app_id=codingbootcamp="
request(link, function (error, response, body,) {
  
  var jay= JSON.parse(body);
  for (let index = 0; index < jay.length; index++) {
    const element = jay[index];
   console.log("Name of Arena- "+element.venue.name)
   console.log("City and Country- "+location)
    console.log("Day of Concert- "+time)
    var time= moment(element.datetime).format("MM/DD/YYYY")
  
   var city= element.venue.city;
   var country= element.venue.country;
   var location= city + " " +country


    
  }
})
}

function runThis(argone,argtwo){
  myswitch(argone,argtwo)
}

runThis(process.argv[2],process.argv.slice(3).join(" "))

 //////////////////////////////////////////////////////////







function getMyMovie(functionData){
  var queryUrl = "http://www.omdbapi.com/?t=" + functionData + "&y=&plot=short&apikey=trilogy";

 axios.get(queryUrl).then(
 function(response){


console.log("Title of Movie- " + response.data.Title)
console.log("Year- "+ response.data.Year)
console.log("Rating- "+ response.data.imdbRating)
console.log(response.data.Ratings[1])
console.log("Country Produced- "+response.data.Country)
console.log("Language- "+response.data.Language)
console.log("Plot of Movie- "+response.data.Plot)
console.log("Actors in Movie- "+response.data.Actors)






 })
}




