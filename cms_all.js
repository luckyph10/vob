(function () {

    const STORAGE_KEY = "VOB_AUTO_SETTINGS";

    function getConfig() {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "{}"
        );
    }

    function saveConfig(data) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );
    }

    function getTextArea() {
        return document.querySelector(
            'textarea[name="comments"]'
        );
    }

    function getPCDate() {

        const d = new Date();

        const mm = String(
            d.getMonth() + 1
        ).padStart(2, "0");

        const dd = String(
            d.getDate()
        ).padStart(2, "0");

        const yy = String(
            d.getFullYear()
        ).slice(-2);

        return `${mm}/${dd}/${yy}`;
    }

    function getPHDate() {

        const d = new Date(
            new Date().toLocaleString(
                "en-US",
                {
                    timeZone: "Asia/Manila"
                }
            )
        );

        const mm = String(
            d.getMonth() + 1
        ).padStart(2, "0");

        const dd = String(
            d.getDate()
        ).padStart(2, "0");

        const yy = String(
            d.getFullYear()
        ).slice(-2);

        return `${mm}/${dd}/${yy}`;
    }

    function buildComment() {

        const cfg = getConfig();

        if (
            cfg.mode === "PT"
        ) {

            return (
                cfg.ptComment +
                " - " +
                getPHDate() +
                " - " +
                cfg.initials
            );
        }

        return (
            getPCDate() +
            " VOB verified, no change to NSA jurisdiction - " +
            cfg.initials
        );
    }

    function insertComment() {

        const box = getTextArea();

        if (!box) {
            alert(
                "Comments textarea not found."
            );
            return;
        }

        const comment =
            buildComment();

        if (
            box.value
                .toLowerCase()
                .includes(
                    comment.toLowerCase()
                )
        ) {

            console.log(
                "Duplicate prevented"
            );

            return;
        }

        box.value =
            comment +
            (
                box.value.trim()
                    ? "\n\n" +
                      box.value
                    : ""
            );

        box.dispatchEvent(
            new Event(
                "input",
                {
                    bubbles: true
                }
            )
        );

        box.dispatchEvent(
            new Event(
                "change",
                {
                    bubbles: true
                }
            )
        );
    }

    function closePopup() {

        const popup =
            document.getElementById(
                "vobPopup"
            );

        if (popup) {
            popup.remove();
        }
    }

    function openPopup() {

        closePopup();

        const cfg =
            getConfig();

        const popup =
            document.createElement(
                "div"
            );

        popup.id =
            "vobPopup";

        popup.style.cssText = `
            position:fixed;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            width:380px;
            background:white;
            border:1px solid #ccc;
            border-radius:10px;
            padding:15px;
            z-index:2147483647;
            box-shadow:0 0 15px rgba(0,0,0,.3);
            font-family:Arial;
        `;

        popup.innerHTML = `
            <div style="
                display:flex;
                justify-content:space-between;
                margin-bottom:10px;
                font-weight:bold;
            ">
                <span>VOB/PT Settings</span>
                <button
                    type="button"
                    id="closeVobPopup"
                >✖</button>
            </div>

            <div>
                Initials
                <input
                    id="vobInitials"
                    value="${cfg.initials || ""}"
                    style="
                        width:100%;
                        margin-top:4px;
                        margin-bottom:10px;
                    ">
            </div>

            <div>

                Mode

                <div style="
                    display:flex;
                    gap:5px;
                    margin-top:5px;
                    margin-bottom:10px;
                ">

                    <button
                        type="button"
                        id="vobModeBtn"
                    >
                        VOB
                    </button>

                    <button
                        type="button"
                        id="ptModeBtn"
                    >
                        PT
                    </button>

                </div>

            </div>

            <div
                id="ptOptions"
            >

                PT Comment

                <select
                    id="ptComment"
                    style="
                        width:100%;
                        margin-top:4px;
                    "
                >

                    <option>
                        Reviewed. Eligible. IDR Initiation document attached.
                    </option>

                    <option>
                        Reviewed, no action required.
                    </option>

                </select>

            </div>

            <button
                type="button"
                id="saveVobSettings"
                style="
                    width:100%;
                    margin-top:15px;
                "
            >
                Save
            </button>
        `;

        document.body.appendChild(
            popup
        );

        let currentMode =
            cfg.mode ||
            "VOB";

        const ptOptions =
            document.getElementById(
                "ptOptions"
            );

        function refreshMode() {

            ptOptions.style.display =
                currentMode ===
         
