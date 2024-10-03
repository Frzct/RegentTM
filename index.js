var express = require('express')
var app = express()

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen("3000", () => {
    console.log("Running i guess....")
})