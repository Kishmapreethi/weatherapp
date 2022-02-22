const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials")//regsitring

// setup handlebar;
app.set("view engine", "hbs");
app.set("views", viewPath);

// setup static directory
app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialPath);

//API to find weather.
app.get('/api/weather', function (req, res) {
    if (!req.query.city) {
        res.status(400).send("Pls Enter city");
        return;
    }
    geocode(req.query.city, function (error, data) {
        if (error) {
            res.status(500).send("Internal server error");
            return;
        }
        forecast(data, function (error, result) {
            if (error) {
                res.status(500).send("Internal server error");
                return;
            }
            res.status(200).send(result)
        })
    })
})


//Rendering Pages
app.get("/help", function (req, res) {
    res.render("help", {
        title: "Help Page"
    });
});

app.get("/about", function (req, res) {
    res.render("about", {
        title: "About Page"
    });
});

app.get("/", function (req, res) {
    res.render("home", {
        title: "Home Page"
    });
});

app.listen(3000, function () {
    console.log("This server is up on port 3000");
});