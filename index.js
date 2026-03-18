const express = require("express")
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const URL = require('./models/url')
const path = require("path")
const staticRouter = require("./routes/staticRouter")


const app = express()
const port = 8080

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => {
        console.log("connected to mongoDB");
    })



app.set("view engine","ejs")

app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false})) //form ka data support


app.use("/url", urlRoute);
app.use("/",staticRouter)

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