(function () {

    const KEY = "VOB_SETTINGS";

    function getSettings() {
        return JSON.parse(localStorage.getItem(KEY) || "{}");
    }

    function saveSettings(data) {
        localStorage.setItem(KEY, JSON.stringify(data));
    }

    function getPCDate() {
        const d = new Date();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const yy = String(d.getFullYear()).slice(-2);
        return `${mm}/${dd}/${yy}`;
    }

    function getPHDate() {
        const d = new Date(
            new Date().toLocaleString("en-US", {
                timeZone: "Asia/Manila"
            })
        );

        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const yy = String(d.getFullYear()).slice(-2);

        return `${mm}/${dd}/${yy}`;
    }

    function insertComment() {

        const cfg = getSettings();

        if (!cfg.initials) {
            openPopup();
            return;
        }

        const el = document.querySelector(
            'textarea[name="comments"]'
        );

        if (!el) {
            alert("Comments box not found.");
            return;
        }

        let comment = "";

        if (cfg.mode === "PT") {

            comment =
                cfg.ptComment +
                " - " +
                getPHDate() +
                " - " +
                cfg.initials;

        } else {

            comment =
                getPCDate() +
                " VOB verified, no change to NSA jurisdiction - " +
                cfg.initials;
        }

        el.value =
            comment +
            (el.value.trim()
                ? "\n\n" + el.value
                : "");

        el.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

        el.dispatchEvent(
            new Event("change", {
                bubbles: true
            })
        );
    }

    function openPopup() {

        const existing =
            document.getElementById("vobPopup");

        if (existing) {
            existing.remove();
        }

        const cfg = getSettings();

        const div = document.createElement("div");

        div.id = "vobPopup";

        div.style.cssText =
            "position:fixed;" +
            "top:50%;" +
            "left:50%;" +
            "transform:translate(-50%,-50%);" +
            "background:#fff;" +
            "border:1px solid #ccc;" +
            "padding:15px;" +
            "width:350px;" +
            "border-radius:8px;" +
            "z-index:2147483647;" +
            "box-shadow:0 0 15px rgba(0,0,0,.3);" +
            "font-family:Arial;";

        div.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <b>Settings</b>
                <button type="button" id="closePopup">X</button>
            </div>

            <div>
                Initials
                <input
                    id="initials"
                    value="${cfg.initials || ""}"
                    style="width:100%;margin-top:5px;">
            </div>

            <div style="margin-top:10px;">
                <button type="button" id="vobBtn">
                    VOB Mode
                </button>

                <button type="button" id="ptBtn">
                    PT Mode
                </button>
            </div>

            <div id="ptSection" style="margin-top:10px;">

                PT Comment

                <select
                    id="ptComment"
                    style="width:100%;margin-top:5px;"
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
                id="saveBtn"
                style="width:100%;margin-top:15px;"
            >
                Save
            </button>
        `;

        document.body.appendChild(div);

        let mode = cfg.mode || "VOB";

        const ptSection =
            document.getElementById(
                "ptSection"
            );

        if (cfg.ptComment) {
            document.getElementById(
                "ptComment"
            ).value = cfg.ptComment;
        }

        function refresh() {

            ptSection.style.display =
                mode === "PT"
                    ? "block"
                    : "none";
        }

        refresh();

        document.getElementById("vobBtn")
            .onclick = function () {

                mode = "VOB";

                refresh();
            };

        document.getElementById("ptBtn")
            .onclick = function () {

                mode = "PT";

                refresh();
            };

        document.getElementById("closePopup")
            .onclick = function () {

                div.remove();
            };

        document.getElementById("saveBtn")
            .onclick = function () {

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
                    initials,
                    mode,
                    ptComment:
                        document
                            .getElementById(
                                "ptComment"
                            )
                            .value
                });

                div.remove();

                insertComment();
            };
    }

    function createButton() {

        if (
            document.getElementById(
                "vobSettingsButton"
            )
        ) return;

        const btn =
            document.createElement(
                "button"
            );

        btn.id =
            "vobSettingsButton";

        btn.type =
            "button";

        btn.innerHTML =
            "⚙";

        btn.style.cssText =
            "position:fixed;" +
            "top:100px;" +
            "right:15px;" +
            "width:40px;" +
            "height:40px;" +
            "border:none;" +
            "border-radius:50%;" +
            "background:#0078d4;" +
            "color:white;" +
            "font-size:20px;" +
            "cursor:pointer;" +
            "z-index:2147483646;";

        btn.onclick =
            function () {

                openPopup();
            };

        document.body.appendChild(
            btn
        );
    }

    createButton();

    const cfg = getSettings();

    if (!cfg.initials) {
        openPopup();
    } else {
        insertComment();
    }

})();
