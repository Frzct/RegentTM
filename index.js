const Express = require('express')
const Application = Express()

//

var _mainPath = require("path")
var Public = _mainPath.join(__dirname, "public")

//
var List = {
    client: _mainPath.join( Public, "client" ),
    landing: _mainPath.join( Public, "landing" ),
}

//

Application.use(Express.static(Public))

Application.get("/", (req, res) => {
    res.sendFile(_mainPath.join( List.landing, "index.html") )
})

Application.listen("3000", () => {
    console.log("Running i guess....")
})