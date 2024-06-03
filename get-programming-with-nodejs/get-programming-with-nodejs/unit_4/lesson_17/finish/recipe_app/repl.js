const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber");
mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
var subscriber;
Subscriber.findOne({
    name: "Jon Wexler"
}).then(result => {
    console.log("result is " + result);
    subscriber = result;
    console.log(subscriber.getInfo());
});