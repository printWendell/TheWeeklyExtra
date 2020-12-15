const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const Port = process.env.PORT || 5000;

const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// catch all error route
app.use(async (req, res, next) => {
  //   pass to error handler
  next(createError.NotFound());
});

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(Port, () => console.log(`listening on port ${Port}`));
