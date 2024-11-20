var OutOfDocument = false
var hopOffTime = 0

window.addEventListener("visibilitychange", (event) => {
    document.getElementById("submit").remove()

    document.getElementById("study_tab").innerHTML = ""
    document.getElementById("title_head").innerText = "Connection terminated."
    document.getElementById("invis").innerText = `
        You went offscreen.
        We don't lie. 
     `
})

