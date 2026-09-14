(function () {

    const STORAGE_KEY = "VOB_AUTO_SETTINGS";

    function getSettings() {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "{}"
        );
    }

    function saveSettings(data) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
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

        const cfg = getSettings();

        if (!cfg.initials) {
            return "";
        }

        if (cfg.mode === "PT") {

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

        const textarea =
            document.querySelector(
                'textarea[name="comments"]'
            );

        if (!textarea) {
            return;
        }

        const comment =
            buildComment();

        if (!comment) {
            return;
        }

        textarea.value =
            comment +
            (
                textarea.value.trim()
                    ? "\n\n" +
                      textarea.value
                    : ""
            );

        textarea.dispatchEvent(
            new Event(
                "input",
                {
                    bubbles: true
                }
            )
        );

        textarea.dispatchEvent(
            new Event(
                "change",
                {
                    bubbles: true
                }
            )
        );
    }

    function closePopup() {

        const old =
            document.getElementById(
                "vobPopup"
            );

        if (old) {
            old.remove();
        }
    }

    function openPopup() {

        closePopup();

        const cfg =
            getSettings();

        const popup =
            document.createElement(
                "div"
            );

        popup.id =
            "vobPopup";

        popup.style.cssText = `
            position:fixed;
            top:70px;
            left:10px;
            width:420px;
            background:${
                cfg.darkMode
                    ? "#111827"
                    : "#ffffff"
            };
            color:${
                cfg.darkMode
                    ? "#ffffff"
                    : "#000000"
            };
            border-radius:12px;
            overflow:hidden;
            z-index:2147483647;
            font-family:Segoe UI,Arial,sans-serif;
            box-shadow:0 8px 25px rgba(0,0,0,.35);
        `;

        popup.innerHTML = `
            <div
                style="
                    background:#002b5c;
                    color:white;
                    padding:12px;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    font-weight:600;
                "
            >
                <span>VOB/PT Automation</span>

                <button
                    type="button"
                    id="closePopupBtn"
                    style="
                        border:none;
                        background:transparent;
                        color:white;
                        cursor:pointer;
                        font-size:16px;
                    "
                >
                    ✕
                </button>
            </div>

            <div style="padding:12px;">

                <div>
                    Initials
                    <input
                        id="initials"
                        value="${cfg.initials || ""}"
                        style="
                            width:100%;
                            padding:8px;
                            margin-top:5px;
                            border:1px solid #ccc;
                        "
                    >
                </div>

                <div style="margin-top:12px;">

                    Mode

                    <div
                        style="
                            display:flex;
                            gap:6px;
                            margin-top:6px;
                        "
                    >

                        <button
                            type="button"
                            id="vobModeBtn"
                            style="
                                flex:1;
                                background:#002b5c;
                                color:white;
                                border:none;
                                padding:8px;
                                border-radius:6px;
                                cursor:pointer;
                            "
                        >
                            VOB
                        </button>

                        <button
                            type="button"
                            id="ptModeBtn"
                            style="
                                flex:1;
                                background:#335f97;
                                color:white;
                                border:none;
                                padding:8px;
                                border-radius:6px;
                                cursor:pointer;
                            "
                        >
                            PT
                        </button>

                    </div>

                </div>

                <div
                    id="ptSection"
                    style="margin-top:12px;"
                >

                    PT Comment

                    <select
                        id="ptComment"
                        style="
                            width:100%;
                            padding:8px;
                            margin-top:5px;
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
                    id="darkModeBtn"
                    type="button"
                    style="
                        width:100%;
                        margin-top:12px;
                        border:none;
                        padding:10px;
                        border-radius:6px;
                        background:#222;
                        color:white;
                        cursor:pointer;
                    "
                >
                    🌙 Toggle Dark Mode
                </button>

                <button
                    id="saveSettingsBtn"
                    type="button"
                    style="
                        width:100%;
                        margin-top:10px;
                        border:none;
                        padding:12px;
                        border-radius:6px;
                        background:#002b5c;
                        color:white;
                        cursor:pointer;
                        font-weight:600;
                    "
                >
                    Save
                </button>

            </div>
        `;

        document.body.appendChild(
            popup
        );

        let mode =
            cfg.mode ||
            "VOB";

        const ptSection =
            document.getElementById(
                "ptSection"
            );

        if (
            cfg.ptComment
        ) {

            document.getElementById(
                "ptComment"
            ).value =
                cfg.ptComment;
        }

        function refresh() {

            ptSection.style.display =
                mode === "PT"
                    ? "block"
                    : "none";
        }

        refresh();

        document.getElementById(
            "vobModeBtn"
        ).onclick = function () {

            mode = "VOB";

            refresh();
        };

        document.getElementById(
            "ptModeBtn"
        ).onclick = function () {

            mode = "PT";

            refresh();
        };

        document.getElementById(
            "closePopupBtn"
        ).onclick = function () {

            closePopup();
        };

        document.getElementById(
            "darkModeBtn"
        ).onclick = function () {

            cfg.darkMode =
                !cfg.darkMode;

            saveSettings({
                ...cfg
            });

            openPopup();
        };

        document.getElementById(
            "saveSettingsBtn"
        ).onclick = function () {

            const initials =
                document
                    .getElementById(
                        "initials"
                    )
                    .value
                    .trim()
                    .toUpperCase();

            if (!initials) {

                alert(
                    "Initials required."
                );

                return;
            }

            saveSettings({
                initials:
                    initials,
                mode:
                    mode,
                darkMode:
                    cfg.darkMode ||
                    false,
                ptComment:
                    document
                        .getElementById(
                            "ptComment"
                        )
                        .value
            });

            closePopup();

            createWidget();
        };
    }

    function createWidget() {

        const old =
            document.getElementById(
                "vobWidget"
            );

        if (old) {
            old.remove();
        }

        const cfg =
            getSettings();

        const widget =
            document.createElement(
                "div"
            );

        widget.id =
            "vobWidget";

        widget.style.cssText = `
            position:fixed;
            top:10px;
            left:10px;
            z-index:2147483646;
            background:#002b5c;
            color:white;
            padding:10px;
            border-radius:10px;
            min-width:180px;
            font-family:Segoe UI;
            box-shadow:0 4px 12px rgba(0,0,0,.3);
        `;

        widget.innerHTML = `
            <div style="font-weight:600;">
                ${
                    cfg.mode ||
                    "VOB"
                } | ${
                    cfg.initials ||
                    "SETUP"
                }
            </div>

            <button
                type="button"
                id="editWidgetBtn"
                style="
                    margin-top:8px;
                    width:100%;
                    border:none;
                    padding:7px;
                    border-radius:6px;
                    background:#0b4f99;
                    color:white;
                    cursor:pointer;
                "
            >
                ⚙ Edit
            </button>
        `;

        document.body.appendChild(
            widget
        );

        document.getElementById(
            "editWidgetBtn"
        ).onclick = function () {

            openPopup();
        };
    }

    createWidget();

    const cfg =
        getSettings();

    if (!cfg.initials) {

        openPopup();

    } else {

        setTimeout(
            insertComment,
            1000
        );
    }

})();
