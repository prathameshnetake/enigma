//var socket = io('http://localhost:8080/chat');
$("#send").click(function(){
	var msg = $("#msg").val();
	socket.emit('chat', {
		msg,
		"to": "alex1992"
	});
})
