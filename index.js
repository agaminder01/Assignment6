const mongoose = require("mongoose");
const controller = require("./Controllers/controller");
    express = require("express");
    app = express();
    model = require("./Models/model");
    layout = require("express-ejs-layouts")
    methodOverride = require("method-override");

app.set("view engine", "ejs")
app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname))
app.use(
    express.urlencoded({
      extended: false,
    })
);
app.use(
    methodOverride("_method", {
      methods: ["POST", "GET"]
    })
  );
app.use(layout)
app.set("layout", "layout")
require("dotenv").config();
app.get("/", controller.home)
app.get("/home", controller.home)
app.get("/bookslist", controller.index)
app.get("/books/:id", controller.show, controller.showView)
app.get("/admin", controller.admin)
app.get("/addnewbook", controller.new)
app.post("/books/create", controller.create, controller.redirectView);
app.delete("/books/:id/delete", controller.delete, controller.redirectView);

app.use(layout)
app.set("layout", "layout")
app.use(express.json())
require("dotenv").config();
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useUnifiedTopology: true})

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});


app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen(app.get("port"), () => {
    console.log(`Server running @ http://localhost:${app.get("port")}`);
});

