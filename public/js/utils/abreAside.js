export default function abreAside() {
    const aside = document.getElementById("aside");
    const menuHambuguer = document.getElementById("menu-hamburguer");
    const closeAside = document.getElementById("close-aside");
    menuHambuguer.addEventListener("click", event => {
        aside.className = `flex fixed flex-col col-start-1 row-start-1 row-end-3 justify-between 
        bg-cor-terciaria text-white text-lg px-4 py-5 h-screen z-20 w-52`;
    });
    closeAside.addEventListener("click", event => {
        aside.className = `hidden fixed flex-col col-start-1 row-start-1 row-end-3 justify-between 
        bg-cor-terciaria text-white text-lg px-4 py-5 h-screen w-52 md:flex`;
    });
}
