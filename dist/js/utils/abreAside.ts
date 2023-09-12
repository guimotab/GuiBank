export default function abreAside() {
    const aside = document.getElementById("aside")!
    const menuHambuguer = document.getElementById("menu-hamburguer")!
    const closeAside = document.getElementById("close-aside")!

    menuHambuguer.addEventListener("click", event => {
        aside.classList.remove("hidden")
        aside.classList.add("flex")
    })
    closeAside.addEventListener("click", event => {
        aside.classList.remove("flex")
        aside.classList.add("hidden")
    })
}