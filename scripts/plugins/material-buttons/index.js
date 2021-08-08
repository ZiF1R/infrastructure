const buttons = document.querySelectorAll(".button-material");

for (const button of buttons) {
    button.addEventListener("click", (event) => {
        let circle = document.createElement("span");
        circle.style.top = event.offsetY + "px";
        circle.style.left = event.offsetX + "px";
        circle.className = "button-material__circle";

        button.appendChild(circle);
        setTimeout(() => button.removeChild(circle), 750);
    });
}