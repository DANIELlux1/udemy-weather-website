const path      = require("path")
const express   = require("express")
const hbs       = require("hbs")
const geocode   = require('./utils/geocode')
const forecast  = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDir     = path.join(__dirname, "../public")
const viewsPath     = path.join(__dirname, "../templates/views")
const partialsPath  = path.join(__dirname,"../templates/partials")

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get("", (req, res) =>{
    res.render("index", {
        title: "Weather",
        name: "Daniel M.M."
    })
})

app.get("/about",(req,res) =>{
    res.render("about",{
        title: "About Me",
        name: "Daniel M.M."
    })
})

app.get("/help",(req,res) =>{
    res.render("help",{
        title: "Help page",
        message: "Some random message to show that the dinamic thingy works.",
        name: "Daniel M.M."
    })
})

app.get("/weather", (req,res) => {
    
    const address =req.query.address

    if(!address)
    {
       return res.send({error : "Please enter an Adress."})
    }

    geocode(address, (error,{latitude , longitude , location} = {}) =>{
        
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude,longitude, (error, foreCastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                foreCastData,
                location,
                address
            })
        })
    })
})

app.get("/products",(req,res) =>{

    if(!req.query.search){
        return res.send({
            error: "you must provide a search term."
        })
    }

    res.send({
        product: []
    })
})

app.get("/help/*",(req,res) => {
    res.render("404",{
        title: "404 Error!",
        name: "Daniel M.M.",
        error: "Help article not found."
    })
})

app.get("*",(req,res) => {
    res.render("404",{
        title: "404 Error!",
        name: "Daniel M.M.",
        error: "Page not found."
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})