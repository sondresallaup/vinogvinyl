Parse.initialize("mO5SuziTjoOwT28NdwfTaBkEvGaS1aMIZF0s6GPW", "6uTteekIXC1kbX3RYUgYjTqtgjJlWe4AjeNhG5Ps");

$("button#submit").click( function() {
 
  if( $("#username").val() == "" || $("#name").val() == "" || $("#artist").val() == "" || $("#album").val() == "" )
    $("div#ack").html("Du må fylle ut alle felt");
  else
    $.post( $("#choosealbumForm").attr("action"),
	        $("#choosealbumForm :input").serializeArray(),
			function(data) {
			  if(data == "true"){ // passer på at bruker
                  var Album = Parse.Object.extend("Album");
                  // sjekker om person allerede har valgt album
                  var query = new Parse.Query(Album);
                  query.equalTo("username", $("#username").val());
                  query.find({
                    success: function(result){
                        if(result.length == 0){
                            var album = new Album();
                            album.set("username", $("#username").val());
                            album.set("fullName", $("#name").val());
                            album.set("artistName", $("#artist").val());
                            album.set("albumName", $("#album").val());
                            
                            album.save({
                                success: function(album){
                                    $("div#ack").html("Ditt albumvalg er lagt til i køen!");
                                },
                                error: function(album, error){
                                    $("div#ack").html("Det har oppstått en feil ved lagring. Prøv igjen");   
                                }
                            });
                            
                             
                            
                        }
                        else{
                           $("div#ack").html("Kun ett album hver!"); 
                        }
                    }
                  });
                  
              }
                else{
                  $("div#ack").html("Brukernavnet eksisterer ikke");
                    
                }
			});
 
	$("#choosealbumForm").submit( function() {
	   return false;	
	});
 
});