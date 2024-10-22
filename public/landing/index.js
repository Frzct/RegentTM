let OutOfDocument = false
let id_save_documents = {
    "button-1": ["id", "addEventListener", () => {
        
    }],

}
window.addEventListener("visibilitychange", (event) => {
    OutOfDocument = !OutOfDocument

    console.log(OutOfDocument? "This guy just hopped off, probably jorkin it": "Gained attention span, hopped back on")
})

