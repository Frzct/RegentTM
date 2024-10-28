const Express = require('express')
const gongoose = require("mongoose")
const _mainPath = require("path")
const Application = Express()

//


const quick_join = _mainPath.join

var Public = quick_join(__dirname, "public") //... so you gotta merge it like this.

function accessFileFromPath(startPath, pathHere){

    return quick_join(
                startPath, ...(pathHere || "index.html").split("/")
            ) // I have no fucking idea how, but removing the index.html under public helped solve the redirection issue
}

//
var List = {
    client: quick_join( Public, "client" ),
    landing: quick_join( Public, "landing" ),
}
var possible_req_calls = {
    "test_placeholder": [
        {
            "question": "Who am I?",
            "answer": {
                "type": "multiple_choice",
                "extra_args": {},
            }
        }
    ]
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


    }
}

Object.keys(GET_LOCATIONS).forEach((Key) => {
    Application.get(Key, GET_LOCATIONS[Key])
})

Application.listen("3000", () => {
    console.log("Running i guess....")
    console.log(accessFileFromPath( List.landing ))
}) // This is your temporary debug thing