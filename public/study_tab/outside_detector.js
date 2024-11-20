
window.addEventListener("visibilitychange", () => {
    if (document.getElementById("submit")){ document.getElementById("submit").remove()}

    document.getElementById("study_tab").innerHTML = ""
    document.getElementById("title_head").innerText = "Test terminated"
    document.getElementById("invis").innerText = `
        You went offscreen.
        Therefore, your test has been terminated. 
        You will be reported.
     `
})

