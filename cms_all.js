(function () {

    const CONFIG_KEY = "vobConfig";

    let config = JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");

    if (!config.initials) {

        const initials = prompt("Enter your initials:");

        if (!initials) {
            alert("Initials required.");
            return;
        }

        config = {
            initials: initials.toUpperCase(),
            mode: "VOB",
            ptComment: "Reviewed. Eligible. IDR Initiation document attached."
        };

        localStorage.setItem(
            CONFIG_KEY,
            JSON.stringify(config)
        );
    }

    const textarea = document.querySelector(
        "#ngForm > fieldset > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > textarea"
    );

    if (!textarea) {
        alert("Comment box not found");
        return;
    }

    let comment = "";

    function localDate() {

        const d = new Date();

        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const yy = String(d.getFullYear()).slice(-2);

        return `${mm}/${dd}/${yy}`;
    }

    function phDate() {

        const d = new Date(
            new Date().toLocaleString(
                "en-US",
                { timeZone: "Asia/Manila" }
            )
        );

        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const yy = String(d.getFullYear()).slice(-2);

        return `${mm}/${dd}/${yy}`;
    }

    if (config.mode === "VOB") {

        comment =
            `${localDate()} VOB verified, no change to NSA jurisdiction - ${config.initials}`;

    } else {

        comment =
            `${config.ptComment} - ${phDate()} - ${config.initials}`;
    }

    if (
        textarea.value
            .toLowerCase()
            .includes(comment.toLowerCase())
    ) {

        console.log("Duplicate found.");
        return;
    }

    textarea.value =
        comment +
        (textarea.value.trim()
            ? "\n\n" + textarea.value
            : "");

    textarea.dispatchEvent(
        new Event("input", { bubbles: true })
    );

    textarea.dispatchEvent(
        new Event("change", { bubbles: true })
    );

})();
