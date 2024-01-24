export function toastError(message = "ERRO!") {

    const toastId = document.querySelector("#toast")
    const toastText = document.querySelector("#description-toast")
    toastText.innerText = message
    toastId.className = "show"

    setTimeout(() => {
        toastId.className = toastId.className.replace("show", "")
    }, 5000)
}