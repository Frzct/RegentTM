const Express = require('express')
const _mainPath = require("path")
const Application = Express()

//


const quick_join = _mainPath.join

var Public = quick_join(__dirname, "public") //... so you gotta merge it like this.

function accessFileFromPath(startPath, pathHere){

    return quick_join(
                startPath, ...(pathHere || "index.html").split("/")
            ) // I have no idea how, but removing the index.html under public helped solve the redirection issue
}

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
        res.sendFile( accessFileFromPath( List.landing ) )
        
    },

    "/request-call/:calltarget": (req, res) => {

        let params = req.params.calltarget

        if (params === ""){ res.send("Empty parameters."); return }

        res.sendFile( accessFileFromPath( List[params] ))
    }
}

Object.keys(GET_LOCATIONS).forEach((Key) => {
    Application.get(Key, GET_LOCATIONS[Key])
})

Application.listen("3000", () => {
    console.log("RegentTM up and running")
}) // This is your temporary debug thing