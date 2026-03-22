const express = require("express")
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const path = require("path")
const cookieParser = require("cookie-parser") 

//Routes
const staticRouter = require("./routes/staticRouter")
const URL = require('./models/url')
const userRoute = require("./routes/user")
const {restrictToLoggedinUserOnly} = require('./middlewares/auth')


const app = express()
const port = 8080

//Mongo DB connection
connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log("connected to mongoDB");
    })



app.set("view engine","ejs")

app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false})) //form ka data support
app.use(cookieParser());


//urls
app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/",staticRouter)
app.use("/user",userRoute)

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId

    const entry = await URL.findOneAndUpdate(
        {shortId}, {
        $push: {
            visitHistory: {
                 timestamp:Date.now(),
            }
        }
    },
    {returnDocument:'after'}

    )
     if (!entry) {
        return res.status(404).send("Short URL not found");
    }  
res.redirect(entry.redirectedURL);

})

app.listen(port, () => {
    console.log(`server started at port ${port}`)
})