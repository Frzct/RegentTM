
var OutOfDocument = false
var id_save_documents = {
    "button-1": ["addEventListener", "click", () => {
        console.log("you clicked")
        window.location = "/study_tab/index.html"
    }],

}
var hopOffTime = 0

document.getElementById("button-1").addEventListener("onclick", (ev) => {
    console.log("communism")
    window.location = "https://youtube.com"
})

Object.keys(id_save_documents).forEach((key) => {
    let id_save = id_save_documents[key]
    document.getElementById(key)[id_save[0]](id_save[1], id_save[2])
})

window.addEventListener("visibilitychange", (event) => {
    OutOfDocument = !OutOfDocument

    if (!OutOfDocument){
        var diff = Date.now() - hopOffTime
        
        alert(`Welcome back, user. you have been offline for ${Math.floor(diff/60000)} maniutes and ${Math.floor(diff/1000)} sekonds!!!!`)
    } else {
        hopOffTime = Date.now()
    }
})

