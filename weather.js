require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")


});


app.post("/", function(req, res) {
    var query = req.body.city;
    var apiKey = process.env.RANDOMER_API_KEY;
    var units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function(response) {
        // console.log(response);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            console.log(temp);
            const icon = weatherData.weather[0].icon;
            // const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // res.write('<img src="' + imageURL + '" alt="">');
            // var filePath = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // res.write("<img src='" + filePath + "'/>");
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>" + "The temperature in " + query + " is " + temp + "degrees Celcius.</h1>");
            res.send();
        })
    });
})

app.listen(3000, function() {
    console.log("Server started at port 3000");
})