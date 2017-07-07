var socket = io('http://localhost:8080/chat');
$("#send").click(function(){
	var msg = $("#msg").val();
	socket.emit('chat', {
		msg,
		"to": "alex1992"
	});
})

socket.on('chat', function(data){
	$(".chatWindow").append("<p>"+ data.msg + "</p>");
});