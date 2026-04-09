const express = require("express")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const userModel = require("./models/userModel")
const urlModel = require("./models/urlModel")
const mongoose = require("mongoose")
const randomstr = require("randomstring")
const origianl_url = process.env.BASE_URL
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI)
}

connectDB().then((data)=>{console.log("DB connection Successfully");}).catch(err => {console.log(err);})

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.set("view engine", "ejs")


const protect_route = async(req, res, next) => {
    let token;
    let verify_token;
    try {
        token = req.cookies.LOGIN
        verify_token = jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        console.log(error.message);
        return res.redirect("/login")
    }
    let user = await userModel.findOne({_id: verify_token.id, email: verify_token.email})

    if(!user){
        return res.redirect("/signup")
    }
    req.user = user
    next()
}


app.get("/", protect_route, async(req, res)=>{

    let datas = await urlModel.find({
        user_id: req.user._id
    })
    
    res.render("index.ejs", {user: req.user, datas, origianl_url})
})

app.get("/login", (req, res)=>{
    res.render("login.ejs")
})

app.get("/signup", (req, res)=>{
    res.render("signup.ejs")
})

app.get("/add", protect_route, (req ,res)=>{
    res.render("add.ejs")
})

app.get("/edit/:id", protect_route, async(req, res)=>{
    let id = req.params.id
    let url_data = await urlModel.findOne({
        url_id: id
    })
    res.render("edit.ejs", {url_data})
})


app.get("/logout", (req, res)=>{
    res.clearCookie("LOGIN")
    res.send("LOGOUT SUCCESSFULLY")
})

app.get("/:url_id", async(req, res)=>{
    let url_id = req.params.url_id
    let url_data = await urlModel.findOne({
        url_id
    })

    if(!url_data){
        return res.send("Not a Valid Link")
    }

    await urlModel.updateOne({
        url_id
    }, {
        clicks: url_data.clicks + 1
    })
    let url = url_data.url
    res.redirect(url)
})

//POST REQUESTS


app.post("/signup", async(req, res)=>{
    let {username , email, password} = req.body
    let user = await userModel.findOne({email: email})
    
    if(user){
        return res.send("Email already taken")
    }
    
    await userModel.insertOne({
        name: username,
        email: email,
        password: password
    })

    res.redirect("/login")
})


app.post("/login", async(req, res)=>{
    let {email, password} = req.body

    let user = await userModel.findOne({email: email, password: password})

    if(!user){
        return res.send("Invalid Credentials")
    }

    let token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_KEY, {expiresIn: "20d"})
    
    res.cookie("LOGIN", token, {maxAge: 20*86400000})

    res.redirect("/")
})


app.post("/add", protect_route, async(req, res)=>{
    let {description, url, importance} = req.body


    async function generateUniqueUrlId() {

        let url_id = randomstr.generate({
            length : 5,
            charset : "alphanumeric",
        })

        let u = await urlModel.findOne({
            url_id: url_id
        })

        if(u){
            return generateUniqueUrlId()
        }
        return url_id
    }

    let url_id = await generateUniqueUrlId()

    await urlModel.insertOne({
        user_id: req.user._id,
        description: description,
        url: url,
        importance: importance,
        url_id: url_id,
    })

    res.redirect("/")
})

app.post("/edit/:id", protect_route, async(req, res)=>{
    let id = req.params.id

    let url_data = await urlModel.findOne({
        url_id: id
    })

    if(!url_data){
        res.send("Something Want Wrong")
    }

    let {description, importance} = req.body

    await urlModel.updateOne({
        url_id: id
    }, {
        description,
        importance
    })
    res.redirect("/")
})


app.post("/delete/:id", protect_route, async(req, res)=>{
    let id = req.params.id

    let url_data = await urlModel.findOne({
        url_id: id
    })

    if(!url_data){
        res.send("Something Want Wrong")
    }

    await urlModel.deleteOne({
        url_id: id
    })
    res.redirect("/")
})

app.listen(process.env.PORT, ()=>{
    console.log("Server is Running on PORT", process.env.PORT);
})