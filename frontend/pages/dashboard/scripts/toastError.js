export function toastError(message = "ERRO!") {

    const toastId = document.querySelector("#toast")
    const toastText = document.querySelector("#description-toast")
    toastId.className = "show"
    toastText.innerText = message

    setTimeout(() => {
        toastId.className = toastId.className.replace("show", "")
    }, 5000)
}