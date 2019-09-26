$(function() {
    var socket = io();
    var username;
    var user;

    $("#userForm").submit(function(event) {
        event.preventDefault();
        $("#home").hide();
        $("#main").show();
        $(".card-header").show();
        socket.emit('user', $('#username').val());
        username = $('#username').val();
        $('#username').val('')
    });

    $('#messageForm').submit(function(event) {
        event.preventDefault();
        socket.emit('chat message', $('#message').val());
        $('#message').val('');
        return false;
    });
    socket.on('chat message', function(msg) {
        msg = msg.split(":")
        if (username == msg[0]) {
            $('.messages').append($('<div class="myMessage bg-light">').append("<span>" + msg[0]).append("<br><p>" + msg[1]));
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            $('.messages').append($('<br><div class="otherMessage">').append("<span>" + msg[0]).append("<br><p>" + msg[1]));
            window.scrollTo(0, document.body.scrollHeight);
        }

    });

    socket.on('user', function(info) {
        var name = info.split(" ")
        $('#users').append($('<li>').text(info));
        $('#online-users').append('<tr><td>' + name[0] + '</td></tr>');
    });

    // socket.on('disconnect', function (msg) {
    //     $('#users').append($('<li>').text(msg));
    //  });

    // function typing(){

    //   $('#m').keydown(function(key){
    //     if(key.keyCode != 13){

    //     }
    //   });


});