// Função para exibir um toast
export function toastError(message = "ERRO!") {
    const toastId = document.querySelector("#toast")

    toastId.children[1].innerHTML = message
    toastId.className = "show"

    setTimeout(() => {
        toastId.className = toastId.className.replace("show", "")
    }, 5000)
}