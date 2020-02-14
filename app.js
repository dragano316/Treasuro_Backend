const express = require("express");
require("./mongoose.js");
const userrouter = require("./routers/users.js");
const contactrouter = require("./routers/contact.js");
const questionrouter = require("./routers/questions.js");
const uniquerouter = require("./routers/unique.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// const port=3000
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(userrouter);
app.use(questionrouter);
app.use(contactrouter);
app.use(uniquerouter);

app.listen(3000, () => {
  console.log("Server up and running in 3000");
});
