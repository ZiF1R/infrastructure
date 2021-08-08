const menuBtns = document.querySelectorAll(".menu-btn"),
    links = document.querySelector(".menu__overlay");

const changeMenuVisibility = () => links.classList.toggle("menu_disabled");

for (let btn of menuBtns) btn.addEventListener("click", changeMenuVisibility);