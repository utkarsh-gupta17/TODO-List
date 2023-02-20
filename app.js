// jshint esversion:6
// passing data from server to template & back
const express = require("express")
const bodyParser = require("body-parser")

const app = express()

var items = ["Buy Food","Cook Food","Eat Food"]
let workItems = []
// naye items ka list banane ke liye

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.set("view engine","ejs")
// different page banane se bachne ke liye hum ejs use kar rahe hain
// ejs ke andar html likh sakte ho
// ejs ek template engine hai jo express ke saath use karte hain agar humein many number of posts/webpages banane hote hai jinka template almost similar hai
// for eg, yaha par main konsa din hai woh banake localhost ko bhej raha hoon jo user dekhega
// par agar bina ejs ke banaya toh mujhe har din ka alag alag banana padega like monday ka alag & tuesday ka alag and so on & so forth
// isiliye ejs use kar rahe hain taaki ek hi template banake alag din par bhi kaam chal sake
// yaha din calculate karke hum list.ejs ko bhej rahe hain jo ki views file ke andar hai
app.get("/",function(req,res){
    
    var today = new Date()
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day = today.toLocaleDateString("en-US",options)
    // var currentDay = today.getDay()
    // var day = ""
    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday"
    //         break;
    //     case 1:
    //         day = "Monday"
    //         break;
    //     case 2:
    //         day = "Tuesday"
    //         break;
    //     case 3:
    //         day = "Wednesday"
    //         break;
    //     case 4:
    //         day = "Thursday"
    //         break;
    //     case 5:
    //         day = "Friday"
    //         break;
    //     case 6:
    //         day = "Saturday"
    //         break;
    //     default:
    //         break;
    // }
    res.render("list",{listTitle : day, newListItem : items})
    // items mein hum array bhej rahe hain jo bhi naya task aaya hai uska
    // iss line se main engine main calculate karke aaj day konsa hai woh bhej raha hoon list.ejs mein

})

app.post("/",function(req,res){
    var item = req.body.newItem
    if(req.body.list=="work"){
        workItems.push(item) 
        res.redirect("/work")     
    }else{
        items.push(item)
        res.redirect("/")
        // yeh statement root route par wapas bhej rahi hai jaha app.get() trigger hojata hai and hum apne variables pass karte hain
    }
})

app.get("/work",function(req,res){
    res.render("list",{listTitle:"work", newListItem : workItems})
})

app.post("/work",function(req,res){
    let item = req.body.newItem
    workItems.push(item)
    res.redirect("/work")
})

app.get("/about",function(req,res){
    res.render("about")
})

app.listen(3000,function(){
    console.log("Server listening on port 3000")
})