const express = require("express")
const Application = express()

Application.get("3000", () => {
    console.log("Running i guess....")
})