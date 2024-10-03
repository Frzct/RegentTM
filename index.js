const Express = require('express')
const Application = Express()

//

var _mainPath = require("path") // Note: Running require on "path" will not return your __dirname
const quick_join = _mainPath.join

var Public = quick_join(__dirname, "public") //... so you gotta merge it like this.

//
var List = {
    client: quick_join( Public, "client" ),
    landing: quick_join( Public, "landing" ),
}

//

Application.use(Express.static(Public))

Application.get("/", (req, res) => {
    res.sendFile( quick_join( List.landing, "index.html") )
})

Application.listen("3000", () => {
    console.log("Running i guess....")
})