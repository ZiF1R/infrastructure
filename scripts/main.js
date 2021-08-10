let btns = document.querySelectorAll("[data-popup]");

let content = `
<div class="showPass">
    #231
    <div class="copyPass">
        <img src="./css/icons/copy.svg" />
    </div>
</div>
`

for (let btn of btns) {
    btn.addEventListener("click", () => {
        if (!document.querySelector(".modal")) {
            window.passGenerated = $v.modal({
                header: "Заказать обратный звонок",
                body: content,
                buttons: [
                    {
                        text: "Принять",
                        style: "accept",
                        handler() {
                            passGenerated.close();
                        },
                    },
                ]
            });
            passGenerated.open();
        } else {
            passGenerated.open();
        }
    });
}


//? MENU

const menuBtns = document.querySelectorAll(".menu-btn"),
    overlay = document.querySelector(".menu__overlay");

const changeMenuVisibility = () => overlay.classList.toggle("menu_disabled");

for (let btn of menuBtns) btn.addEventListener("click", changeMenuVisibility);

overlay.addEventListener("click", (e) => {
    e.target === overlay && changeMenuVisibility();
});


//? SLIDER

