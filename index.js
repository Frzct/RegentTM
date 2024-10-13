const Express = require('express')
const Application = Express()

//

var _mainPath = require("path") // Note: Running require on "path" will not return your __dirname
const quick_join = _mainPath.join

var Public = quick_join(__dirname, "public") //... so you gotta merge it like this.

console.log(Public)
//
var List = {
    client: quick_join( Public, "client" ),
    landing: quick_join( Public, "landing" ),
}

//

Application.use(Express.static(Public))

// Here's the command thingies!
const GET_LOCATIONS = {
    "/": (req, res) => {
        res.sendFile( quick_join( List.landing, "index.html") )
    },
}

Object.keys(GET_LOCATIONS).forEach((Key) => {
    Application.get(Key, GET_LOCATIONS[Key])
})

Application.listen("3000", () => {
    console.log("Running i guess....")
})