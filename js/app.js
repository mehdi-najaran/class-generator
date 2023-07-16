const formatButton = document.getElementById("format-button");
formatButton.addEventListener("click", formatWord);

const copyButton = document.getElementById("copy-button");
copyButton.addEventListener("click", copyOutput);

function formatWord() {
    const inputWord = document.getElementById("input-word");
    const inputValue = inputWord.value.trim();
    const classBasis = getSelectedRadioValue("class-basis");
    const spacingFormat = getSelectedRadioValue("spacing-format");
    let formattedWord = "";

    if (inputValue === "") {
        // Display alert and change input field color
        inputWord.style.borderColor = "red";
        showEmptyFieldAlert();
        return;
    }

    // Reset input field color
    inputWord.style.borderColor = "";

    switch (classBasis) {
        case "all-uppercase":
            formattedWord = inputValue.toUpperCase();
            break;
        case "all-lowercase":
            formattedWord = inputValue.toLowerCase();
            break;
        default:
            formattedWord = inputValue;
    }

    switch (spacingFormat) {
        case "remove-spaces":
            formattedWord = formattedWord.replace(/\s+/g, "");
            break;
        case "hyphenate-spaces":
            formattedWord = formattedWord.replace(/\s+/g, "-");
            break;
        case "underscore-spaces":
            formattedWord = formattedWord.replace(/\s+/g, "_");
            break;
        default:
            formattedWord = formattedWord;
    }

    const outputWord = document.getElementById("output-word");
    outputWord.textContent = formattedWord;

    // Show the result section
    const resultSection = document.querySelector(".result");
    resultSection.style.display = "block";
    copyButton.style.display = "block";
}

function getSelectedRadioValue(name) {
    const radioButtons = document.getElementsByName(name);
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }
    return "";
}

function copyOutput() {
    const inputWord = document.getElementById("input-word");
    const inputValue = inputWord.value.trim();
    if (inputValue === "") {
        // Display alert and change input field color
        inputWord.style.borderColor = "red";
        showEmptyFieldAlert();
        return; // Do nothing if the input field is empty
    }

    const outputWord = document.getElementById("output-word");
    const range = document.createRange();
    range.selectNode(outputWord);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    const isCopied = document.execCommand("copy");
    window.getSelection().removeAllRanges();

    if (isCopied) {
        // Show an alert div with success message
        const alertDiv = document.createElement("div");
        alertDiv.classList.add("alert", "success");
        alertDiv.innerHTML = "<p>✅ Copied to clipboard!</p>";
        document.body.appendChild(alertDiv);

        // Move the alert div upwards gradually
        setTimeout(function () {
            alertDiv.style.transition = "top 0.5s";
            alertDiv.style.top = "-6%";
        }, 2000);

        // Remove the alert div after the transition ends
        alertDiv.addEventListener("transitionend", function () {
            alertDiv.remove();
        });
    }
}


function showEmptyFieldAlert() {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert", "failure");
    alertDiv.innerHTML = "<p> ❌ The input field is empty</p>";
    document.body.appendChild(alertDiv);

    // Remove the alert div after 3 seconds
    setTimeout(function () {
        alertDiv.remove();
    }, 2000);
}
