var OutOfDocument = false
var id_save_documents = {
    "button-1": ["addEventListener", "click", () => {
        console.log("you clicked")
        window.location = "/study_tab/index.html"
    }],

}

document.getElementById("button-1").addEventListener("onclick", (ev) => {
    console.log("communism")
    window.location = "https://youtube.com"
})

Object.keys(id_save_documents).forEach((key) => {
    let id_save = id_save_documents[key]
    console.log("cool id save")
    document.getElementById(key)[id_save[0]](id_save[1], id_save[2])
})

window.addEventListener("visibilitychange", (event) => {
    OutOfDocument = !OutOfDocument

    console.log(OutOfDocument? "This guy just hopped off, probably jorkin it": "Gained attention span, hopped back on")
})

