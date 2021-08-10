const $v = {}

$v.modal = (options) => {
    let $modal = _createModal(options);
    let closing = false

    const modal = {
        open() {
            !closing && $modal.classList.add("modal_active");
        },
        close() {
            closing = true;
            $modal.classList.remove("modal_active");
            $modal.classList.add("modal_hide");
            setTimeout(() => {
                $modal.classList.remove("modal_hide");
                closing = false;
            }, 250);
        },
    }

    $modal.addEventListener("click", (e) => {
        e.target.dataset.close && modal.close();
    });

    return Object.assign(modal, {
        destroy() {
            document.body.removeChild($modal);
        },
    });
}

function _createModal(options) {
    let modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
    <div class="modal__overlay" data-close="true">
        <div class="modal__window">
            <img src="./icons/nav/menu-close.svg" alt="close" />
            <span class="window__title">
                ${options.header || "Оповещение!"}
            </span>
            <div class="window__body" data-content>
                ${options.body || ""}
            </div>
        </div>
    </div>`

    let buttons = _createModalButtons(options.buttons);
    buttons.appendAfter(modal.querySelector("[data-content]"));

    document.body.appendChild(modal);
    
    return modal;
}

function _createModalButtons(buttons = []) {
    if (buttons.length === 0) 
        return document.createElement("div"); 
    
    let btns = document.createElement("div");
    btns.classList.add("window__buttons")
        
    for (let button of buttons) {
        let btn = document.createElement("div");
        btn.classList.add("button", `button__${button.style || "accept"}`);
        btn.setAttribute("data-close", "true");
        btn.innerHTML = button.text;

        btn.addEventListener("click", btn.handler || (() => {}));

        btns.appendChild(btn);
    }

    return btns;
}

Element.prototype.appendAfter = function(el) {
    el.parentNode.insertBefore(this, el.nextSibling);
}