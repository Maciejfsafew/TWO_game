console.log("Hello");

// connect to current URL
var primus = Primus.connect();

primus.on("open", function () {
    console.log("Connected!");
})
