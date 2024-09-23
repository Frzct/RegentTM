import express from "express"
import Path from "path"

const Application = express()
const PublicPath = Path.join("./public")

express.static(PublicPath)

Application.get("/", (req, res) => {
    res.send("./public/landing/index.html")
})

Application.listen("3000", () => {
    console.log("Running i guess....")
})