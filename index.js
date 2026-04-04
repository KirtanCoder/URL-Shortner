require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

//Routes
const staticRouter = require("./routes/staticRouter");
const URL = require("./models/url");
const userRoute = require("./routes/user");
const {
  restrictToLoggedinUserOnly,
  checkAuth,
} = require("./middlewares/auth");

const port = process.env.PORT || 8080;

//Mongo DB connection
connectToMongoDB(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongoDB Atlas");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//urls
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { returnDocument: "after" }
  );
  if (!entry) {
    return res.status(404).send("Short URL not found");
  }
  res.redirect(entry.redirectedURL);
});

// Only listen when running locally (not on Vercel)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`server started at port ${port}`);
  });
}

// Export for Vercel serverless
module.exports = app;