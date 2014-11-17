console.log("Hello");

// connect to current URL
var primus = Primus.connect();

primus.on("open", function () {
    console.log("Connected!");
})

//primus.on("data", function (data) {
//    console.log("Recieved:", data);
//    primus.write(data['message'] + " pong!");
//})
