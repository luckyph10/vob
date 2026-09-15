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
            openPopup(false);
            return;
        }

        const textarea =
            document.querySelector('textarea[name="comments"]');

        if (!textarea) {
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

        textarea.value =
            comment +
            (textarea.value.trim()
                ? "\n\n" + textarea.value
                : "");

        textarea.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

        textarea.dispatchEvent(
            new Event("change", {
                bubbles: true
            })
        );
    }

    function closePopup() {

        const popup =
            document.getElementById("vobPopup");

        if (popup) {
            popup.remove();
        }
    }

    function openPopup(autoHide) {

        closePopup();

        const cfg = getSettings();

        let mode = cfg.mode || "VOB";

        const popup =
            document.createElement("div");

        popup.id = "vobPopup";

        popup.style.cssText = `
            position:fixed;
            top:45px;
            left:10px;
            width:220px;
            background:${cfg.darkMode ? "#111827" : "rgba(0,43,92,.92)"};
            color:white;
            border-radius:10px;
            overflow:hidden;
            z-index:2147483647;
            font-family:Segoe UI,Arial,sans-serif;
            box-shadow:0 4px 15px rgba(0,0,0,.45);
        `;

        popup.innerHTML = `
            <div style="
                padding:8px;
                background:#001f44;
                display:flex;
                justify-content:space-between;
                align-items:center;
                font-size:12px;
                font-weight:600;
            ">

                <span>VOB/PT</span>

                <div>

                    <button
                        id="darkBtn"
                        type="button"
                        style="
                            width:24px;
                            height:24px;
                            border:none;
                            border-radius:4px;
                            cursor:pointer;
                            background:#111;
                            color:#fff;
                        "
                    >🌙</button>

                    <button
                        id="closeBtn"
                        type="button"
                        style="
                            width:24px;
                            height:24px;
                            border:none;
                            border-radius:4px;
                            cursor:pointer;
                            background:#c62828;
                            color:#fff;
                        "
                    >✕</button>

                </div>

            </div>

            <div style="padding:10px;">

                <div style="font-size:11px;">
                    Initials
                </div>

                <input
                    id="initials"
                    maxlength="3"
                    value="${cfg.initials || ""}"
                    style="
                        width:50px;
                        text-align:center;
                        margin-top:4px;
                        text-transform:uppercase;
                        font-weight:bold;
                    "
                >

                <div style="
                    display:flex;
                    gap:4px;
                    margin-top:10px;
                ">

                    <button
                        id="vobBtn"
                        type="button"
                        style="
                            flex:1;
                            border:none;
                            padding:6px;
                            border-radius:5px;
                            color:white;
                            cursor:pointer;
                        "
                    >
                        VOB
                    </button>

                    <button
                        id="ptBtn"
                        type="button"
                        style="
                            flex:1;
                            border:none;
                            padding:6px;
                            border-radius:5px;
                            color:white;
                            cursor:pointer;
                        "
                    >
                        PT
                    </button>

                </div>

                <div
                    id="ptArea"
                    style="margin-top:8px;"
                >

                    <select
                        id="ptComment"
                        style="
                            width:100%;
                            padding:4px;
                            font-size:11px;
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

                <div
                    id="saveState"
                    style="
                        margin-top:8px;
                        font-size:10px;
                        color:#8cff8c;
                    "
                >
                    Saved ✅
                </div>

                <button
                    id="saveBtn"
                    type="button"
                    style="
                        width:100%;
                        margin-top:8px;
                        border:none;
                        background:#1976d2;
                        color:white;
                        padding:7px;
                        border-radius:5px;
                        cursor:pointer;
                    "
                >
                    Save
                </button>

            </div>
        `;

        document.body.appendChild(popup);

        const vobBtn =
            document.getElementById("vobBtn");

        const ptBtn =
            document.getElementById("ptBtn");

        const ptArea =
            document.getElementById("ptArea");

        const saveState =
            document.getElementById("saveState");

        if (cfg.ptComment) {
            document.getElementById("ptComment").value =
                cfg.ptComment;
        }

        function refreshMode() {

            vobBtn.style.background =
                mode === "VOB"
                    ? "#16a34a"
                    : "#003b7a";

            ptBtn.style.background =
                mode === "PT"
                    ? "#16a34a"
                    : "#003b7a";

            ptArea.style.display =
                mode === "PT"
                    ? "block"
                    : "none";
        }

        refreshMode();

        vobBtn.onclick = function () {
            mode = "VOB";
            saveState.innerHTML = "Unsaved ⚠️";
            refreshMode();
        };

        ptBtn.onclick = function () {
            mode = "PT";
            saveState.innerHTML = "Unsaved ⚠️";
            refreshMode();
        };

        document.getElementById("darkBtn").onclick =
            function () {

                saveSettings({
                    ...cfg,
                    darkMode: !cfg.darkMode
                });

                openPopup(false);
            };

        document.getElementById("closeBtn").onclick =
            function () {
                closePopup();
            };

        document.getElementById("saveBtn").onclick =
            function () {

                const initials =
                    document
                        .getElementById("initials")
                        .value
                        .trim()
                        .toUpperCase();

                if (!initials) {
                    alert("Enter initials");
                    return;
                }

                saveSettings({
                    initials: initials,
                    mode: mode,
                    darkMode: cfg.darkMode || false,
                    ptComment:
                        document.getElementById("ptComment").value
                });

                createBadge();

                closePopup();
            };

        if (autoHide) {

            setTimeout(() => {

                if (document.getElementById("vobPopup")) {

                    popup.style.transition =
                        "opacity .3s";

                    popup.style.opacity = "0";

                    setTimeout(() => {

                        if (popup.parentNode) {
                            popup.remove();
                        }

                    }, 300);
                }

            }, 2000);
        }
    }

    function createBadge() {

        const old =
            document.getElementById("vobBadge");

        if (old) {
            old.remove();
        }

        const cfg = getSettings();

        const badge =
            document.createElement("div");

        badge.id = "vobBadge";

        badge.style.cssText = `
            position:fixed;
            top:10px;
            left:10px;
            background:rgba(0,43,92,.75);
            backdrop-filter:blur(6px);
            color:white;
            padding:6px 8px;
            border-radius:8px;
            z-index:2147483647;
            font-family:Segoe UI;
            font-size:11px;
            box-shadow:0 2px 8px rgba(0,0,0,.3);
        `;

        badge.innerHTML = `
            <div>
                <b>${cfg.mode || "VOB"}</b>
                |
                ${cfg.initials || "---"}
            </div>

            <div style="
                color:#8cff8c;
                font-size:9px;
            ">
                Saved ✅
            </div>

            <button
                id="editBadgeBtn"
                type="button"
                style="
                    margin-top:4px;
                    width:100%;
                    border:none;
                    border-radius:4px;
                    background:#0b4f99;
                    color:white;
                    cursor:pointer;
                    font-size:10px;
                    padding:3px;
                "
            >
                Edit
            </button>
        `;

        document.body.appendChild(badge);

        document.getElementById("editBadgeBtn").onclick =
            function () {
                openPopup(false);
            };

        setTimeout(() => {

            badge.style.transition =
                "opacity .3s ease";

            badge.style.opacity = "0";

            setTimeout(() => {

                if (badge.parentNode) {
                    badge.remove();
                }

            }, 300);

        }, 1000);
    }

    createBadge();

    const cfg = getSettings();

    if (!cfg.initials) {
        openPopup(true);
    } else {
        setTimeout(insertComment, 500);
    }

})();
