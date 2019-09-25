$(function() {
    var socket = io();
    var username;
    var user;

    $("#userForm").submit(function(event) {
        event.preventDefault();
        $("#home").hide();
        $("#main").show();
        $(".card-footer").show();
        socket.emit('user', $('#username').val());
        username = $('#username').val();
        $('#username').val('')
    });

    // $("#btnEnd").click(function(){
    //     alert('end');
    //     socket.emit('disconnect', $('#username').val());
    //     $("#home").show();
    //     $("#main").hide();
    //     $(".card-footer").hide();
    //     $('.messages').empty();
    // });

    $('#messageForm').submit(function(event) {
        event.preventDefault();
        socket.emit('chat message', $('#message').val());
        $('#message').val('');
        return false;
    });
    socket.on('chat message', function(msg) {
        user = msg.split(":")
        if (username == user[0]) {
            $('.messages').append($('<input readonly class="form-control float-right bg-light"><br>').val(msg));
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            $('.messages').append($('<input readonly class="form-control float-left bg-success"><br>').val(msg));
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