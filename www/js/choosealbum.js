$("button#submit").click( function() {
 
  if( $("#username").val() == "" || $("#name").val() == "" || $("#artist").val() == "" || $("#album").val() == "" )
    $("div#ack").html("Du må fylle ut alle felt");
  else
    $.post( $("#choosealbumForm").attr("action"),
	        $("#choosealbumForm :input").serializeArray(),
			function(data) {
			  $("div#ack").html(data);
			});
 
	$("#choosealbumForm").submit( function() {
	   return false;	
	});
 
});