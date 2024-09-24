const express = import("express")

const Application = express()

Application.use(express.static("public"))

Application.get("/", (req, res) => {
    res.send("hello")
})

Application.listen("3000", () => {
    console.log("Running i guess....")
})