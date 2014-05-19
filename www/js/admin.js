Parse.initialize("mO5SuziTjoOwT28NdwfTaBkEvGaS1aMIZF0s6GPW", "6uTteekIXC1kbX3RYUgYjTqtgjJlWe4AjeNhG5Ps");

var Album = Parse.Object.extend("Album");
var query = new Parse.Query(Album);
query.notEqualTo("isPlayed",true);
query.ascending("createdAt");

var t=setInterval(printPlaylist,1000);

function printPlaylist(){

    query.find({
        success: function(results){
            var albumsString = "<ol>";
            for(var i = 0; i < results.length; i++){
                var album = results[i];
                albumsString += '<li class="item">';
                if(i == 0){
                    albumsString += "<b>";
                    $("div#footer").html('<button class="button button-block button-dark" onclick="nextAlbum();">Neste album</button>');
                }
                albumsString += album.get("albumName") + " - " + album.get("artistName") + "</li>";
                
                if(i == 0){
                    albumsString += '</b>';   
                }
            }
            if(results.length == 0){
                    albumsString += '<br><br>Ingen album i køen!';
                    $("div#footer").html('OBS! Legg til album!');
                }
            
            $("div#nowplaying").html(albumsString);   
        }
    ,
       error: function(results, error){
        localStorage.setItem('albumAndArtist', 'redwine');
        localStorage.setItem('album', 'redwine');
         if(localStorage.getItem('albumAndArtist' != 'redwine')){
                    location.reload();
                }
    }
    }
              
              );
    
}

function nextAlbum(){
     query.find({
        success: function(results){
           var album = results[0];
            album.save(null, {
              success: function(album) {
                album.set("isPlayed", true);
                album.save();
              }});
    }
    });
       
}

function bohemian(){
    var BohemianAlbum = Parse.Object.extend("Album");
    var bohemianQuery = new Parse.Query(BohemianAlbum);
    bohemianQuery.equalTo("albumName","bohemian");

    bohemianQuery.find({
        success: function(results){
             var album = results[0];
            album.save(null, {
              success: function(album) {
                album.set("isPlayed", false);
                album.save();
              }});
            
        }
    });
}