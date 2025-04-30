const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config(); // Load environment variables

app.use(express.json()); // parse json data from request body
app.use(cors()); // allow requests from any origin

// Serve static files from the "uploads" folder
app.use('/uploads', express.static('uploads'));

const db = require("./models");

const PORT = process.env.PORT || 3001; // works for heroku

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });