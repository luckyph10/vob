(function () {

    const CONFIG_KEY = "vob_auto_comment_config";

    const TEXTAREA_SELECTOR =
        "#ngForm > fieldset > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > textarea";

    let config = JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");

    function getLocalDate() {
        const d = new Date();

        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const yy = String(d.getFullYear()).slice(-2);

        return `${mm}/${dd}/${yy}`;
    }

    function getPHDate() {
        const date = new Date(
            new Date().toLocaleString("en-US", {
                timeZone: "Asia/Manila"
            })
        );

        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const yy = String(date.getFullYear()).slice(-2);

        return `${mm}/${dd}/${yy}`;
    }

    function buildComment() {

        if (!config.initials) return null;

        if (config.mode === "VOB") {

            return `${getLocalDate()} VOB verified, no change to NSA jurisdiction - ${config.initials}`;

        }

        if (config.mode === "PT") {

            if (
                config.ptComment ===
                "Reviewed. Eligible. IDR Initiation document attached."
            ) {
                return `Reviewed. Eligible. IDR Initiation document attached - ${getPHDate()} - ${config.initials}`;
            }

            if (
                config.ptComment ===
                "Reviewed, no action required."
            ) {
                return `Reviewed, no action required - ${getPHDate()} - ${config.initials}`;
            }
        }

        return null;
    }

    function addComment() {

        const textarea = document.querySelector(TEXTAREA_SELECTOR);

        if (!textarea) return;

        const comment = buildComment();

        if (!comment) return;

        const existingText = textarea.value || "";

        if (
            existingText
                .toLowerCase()
                .includes(comment.toLowerCase())
        ) {
            console.log("Duplicate comment prevented.");
            return;
        }

        textarea.value =
            comment + (existingText.trim() ? "\n\n" + existingText : "");

        textarea.dispatchEvent(
            new Event("input", { bubbles: true })
        );

        textarea.dispatchEvent(
            new Event("change", { bubbles: true })
        );

        console.log("Comment inserted.");
    }

    function createPopup(forceOpen = false) {

        if (
            document.getElementById("vobSettingsPopup") &&
            !forceOpen
        ) {
            return;
        }

        const overlay = document.createElement("div");

        overlay.id = "vobSettingsPopup";

        overlay.style.cssText = `
            position:fixed;
            inset:0;
            background:rgba(0,0,0,.45);
            z-index:999999;
            display:flex;
            align-items:center;
            justify-content:center;
        `;

        overlay.innerHTML = `
            <div style="
                background:white;
                width:350px;
                border-radius:10px;
                padding:15px;
                font-family:Arial;
            ">
            
                <div style="
                    display:flex;
                    justify-content:space-between;
                    margin-bottom:10px;
                ">
                    <b>Automation Settings</b>
                    <button id="closeSettings">✕</button>
                </div>

                <label>Initials</label>
                <input
                    id="userInitials"
                    value="${config.initials || ""}"
                    style="width:100%;margin-bottom:10px;"
                />

                <label>Mode</label>

                <div style="
                    display:flex;
                    gap:5px;
                    margin-bottom:10px;
                ">
                    <button id="vobModeBtn">VOB</button>
                    <button id="ptModeBtn">PT</button>
                </div>

                <div id="ptCommentSection">
                    <label>PT Default Comment</label>

                    <select id="ptComment" style="width:100%;">
                        <option value="Reviewed. Eligible. IDR Initiation document attached.">
                            Reviewed. Eligible. IDR Initiation document attached.
                        </option>
                        <option value="Reviewed, no action required.">
                            Reviewed, no action required.
                        </option>
                    </select>
                </div>

                <button
                    id="saveSettings"
                    style="
                        width:100%;
                        margin-top:15px;
                    "
                >
                    Save
                </button>

            </div>
        `;

        document.body.appendChild(overlay);

        const ptSelect =
            overlay.querySelector("#ptComment");

        const ptSection =
            overlay.querySelector("#ptCommentSection");

        const refresh = () => {

            ptSection.style.display =
                config.mode === "PT"
                    ? "block"
                    : "none";
        };

        ptSelect.value =
            config.ptComment ||
            "Reviewed. Eligible. IDR Initiation document attached.";

        refresh();

        overlay
            .querySelector("#vobModeBtn")
            .onclick = () => {

                config.mode = "VOB";
                refresh();
            };

        overlay
            .querySelector("#ptModeBtn")
            .onclick = () => {

                config.mode = "PT";
                refresh();
            };

        overlay
            .querySelector("#saveSettings")
            .onclick = () => {

                const initials =
                    overlay
                        .querySelector("#userInitials")
                        .value
                        .trim()
                        .toUpperCase();

                if (!initials) {
                    alert("Initials required.");
                    return;
                }

                config.initials = initials;

                config.mode =
                    config.mode || "VOB";

                config.ptComment =
                    ptSelect.value;

                localStorage.setItem(
                    CONFIG_KEY,
                    JSON.stringify(config)
                );

                overlay.remove();

                addComment();
            };

        overlay
            .querySelector("#closeSettings")
            .onclick = () => {

                overlay.remove();
            };
    }

    function createToolbar() {

        if (
            document.getElementById(
                "vobAutomationToolbar"
            )
        ) {
            return;
        }

        const bar = document.createElement("div");

        bar.id = "vobAutomationToolbar";

        bar.style.cssText = `
            position:fixed;
            top:120px;
            right:15px;
            z-index:999998;
            background:white;
            border:1px solid #ccc;
            border-radius:8px;
            padding:8px;
            box-shadow:0 2px 8px rgba(0,0,0,.2);
            display:flex;
            flex-direction:column;
            gap:5px;
        `;

        const modeBtn =
            document.createElement("button");

        modeBtn.textContent =
            "Mode: " + (config.mode || "VOB");

        modeBtn.onclick = () => {

            config.mode =
                config.mode === "PT"
                    ? "VOB"
                    : "PT";

            localStorage.setItem(
                CONFIG_KEY,
                JSON.stringify(config)
            );

            modeBtn.textContent =
                "Mode: " + config.mode;
        };

        const addBtn =
            document.createElement("button");

        addBtn.textContent =
            "Insert Comment";

        addBtn.onclick = addComment;

        const editBtn =
            document.createElement("button");

        editBtn.textContent =
            "Settings";

        editBtn.onclick = () =>
            createPopup(true);

        bar.append(
            modeBtn,
            addBtn,
            editBtn
        );

        document.body.appendChild(bar);
    }

    if (
        !config.initials
    ) {
        createPopup(true);
    }

    createToolbar();

})();
