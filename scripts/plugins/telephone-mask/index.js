document.addEventListener("DOMContentLoaded", () => {
    let telInputs = document.querySelectorAll("input[data-tel-input]");

    const getInputNumbers = (input) => input.trim().replace(/\D/g, "");

    const onPhoneInput = (event) => {
        let input = event.target,
            inputedNumbers = getInputNumbers(input.value),
            formattedNumber = "",
            selectionStart = input.selectionStart,
            ruNumbers = ["7", "8", "9"];
        
        if (!inputedNumbers) return input.value = "";

        if (input.value.length !== selectionStart) {
            if(event.data && /\D/g.test(event.data)) input.value = inputedNumbers;
            return;
        }

        let phoneIndex = inputedNumbers[0];
        if (~ruNumbers.indexOf(phoneIndex)) {
            if (phoneIndex === "9") inputedNumbers = `7${inputedNumbers}`;
            let firstSymbol = (phoneIndex === "8") ? "8" : "+7";
            formattedNumber = firstSymbol + " ";

            if (inputedNumbers.length > 1) formattedNumber += `(${inputedNumbers.substring(1, 4)}`;
            if (inputedNumbers.length >= 5) formattedNumber += `) ${inputedNumbers.substring(4, 7)}`;
            if (inputedNumbers.length >= 8) formattedNumber += `-${inputedNumbers.substring(7, 9)}`;
            if (inputedNumbers.length >= 10) formattedNumber += `-${inputedNumbers.substring(9, 11)}`;
        }
        else formattedNumber = `+${inputedNumbers}`;

        input.value = formattedNumber;
    };

    const onPhoneKeydown = (event) => {
        if (
            event.key === "Backspace" &&
            getInputNumbers(event.target.value).length === 1
        ) event.target.value = "";
    };

    const onPhonePaste = (event) => {
        let pasted = event.clipboardData || window.clipboardData;

        if (pasted) {
            let pastedText = pasted.getData("Text");
            /\D/g.test(pastedText) &&
                (event.target.value = getInputNumbers(event.target.value))
        }
    };

    for (let input of telInputs) {
        input.addEventListener("input", onPhoneInput);
        input.addEventListener("keydown", onPhoneKeydown);
        input.addEventListener("paste", onPhonePaste);
    }
});
