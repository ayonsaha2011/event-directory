const express = require("express");
const path = require("path");
const cors = require("cors");
require('dotenv').config();


const app = express();

var corsOptions = {
  origin: process.env.APP_URL || "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



require("./app/routes/event.routes")(app);
require("./app/routes/category.routes")(app);

app.use(express.static('public'));

app.get('*', (req, res) => res.sendFile(path.resolve('public', 'index.html')));


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
