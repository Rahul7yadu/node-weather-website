const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const hbs = require("hbs");

const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", { title: "weather", name: "Rahul yadu" });
});

app.get("", (req, res) => {
  res.send("hello world!");
});
app.get("/help", (req, res) => {
  res.render("help", {
    example: "hi how can i help you",
    title: "help",
    name: "Rahul yadu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    example: "hi this is about page",
    title: "about",
    name: "Rahul yadu",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("error:please provide an address");
  }
  const address = req.query.address;
  console.log(address);
  geocode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    forecast(latitude, longtitude, (error2, forecast) => {
      if (error2) {
        return res.send({ error: error2 });
      }
      return res.send({ location, forecast });
    });
  });

  // res.send(req.query.address);
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    message: "help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("notFound", {
    message: "page not found",
  });
});

app.listen(port, () => {
  console.log("server started at port " + port);
});
