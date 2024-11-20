
var OutOfDocument = false
var id_save_documents = {
    "button-1": ["addEventListener", "click", () => {
        console.log("you clicked")
        window.location = "/study_tab/index.html"
    }],

}
var hopOffTime = 0

Object.keys(id_save_documents).forEach((key) => {
    let id_save = id_save_documents[key]
    document.getElementById(key)[id_save[0]](id_save[1], id_save[2])
})

window.addEventListener("visibilitychange", (event) => {
    OutOfDocument = !OutOfDocument

    if (!OutOfDocument){
        let diff = Date.now() - hopOffTime
        let Time_display = {
            "Hours": Math.floor(diff/3600000),
            "Minutes": Math.floor(diff/60000 % 60),
            "Seconds": Math.floor(diff/1000 % 60)
        }
        let finalText = ""
        let KeyList = Object.keys(Time_display)
        
        for (i = 0; i < KeyList.length; i++){
            let K = KeyList[i]
            let Condition = i < (KeyList.length - 1)
            //
            finalText += `${!Condition ? "and ": ""}${Time_display[K]} ${K}${Condition ? ", ": ""}`
        }
        document.getElementById("offline-time").style = "display: block;"

        document.getElementById("offline-time-text").innerText = finalText
    } else {
        hopOffTime = Date.now()
    }
})

