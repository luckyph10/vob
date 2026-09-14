(function () {

    const STORAGE_KEY = "VOB_AUTO_SETTINGS";

    function getCommentBox() {
        return document.querySelector('textarea[name="comments"]');
    }

    function pcDate() {
        const d = new Date();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const yy = String(d.getFullYear()).slice(-2);
        return `${mm}/${dd}/${yy}`;
    }

    function phDate() {
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

    function settings() {
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

    function buildComment() {

        const cfg = settings();

        if (cfg.mode === "PT") {

            return (
                cfg.ptComment +
                " - " +
                phDate() +
                " - " +
                cfg.initials
            );
        }

        return (
            pcDate() +
            " VOB verified, no change to NSA jurisdiction - " +
            cfg.initials
        );
    }

    function insertComment() {

        const box = getCommentBox();

        if (!box) {
            alert("Comments box not found.");
            return;
        }

        const comment = buildComment();

        if (
            box.value
                .toLowerCase()
                .includes(comment.toLowerCase())
        ) {
            return;
        }

        box.value =
            comment +
            (box.value.trim()
                ? "\n\n" + box.value
                : "");

        box.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

        box.dispatchEvent(
            new Event("change", {
                bubbles: true
            })
        );
    }

    function openPopup() {

        if (document.getElementById("vobPopup"))
            return;

        const cfg = settings();

        const popup = document.createElement("div");

        popup.id = "vobPopup";

        popup.style.cssText = `
            position:fixed;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            z-index:999999;
            background:#fff;
            border:1px solid #ccc;
            border-radius:8px;
            padding:15px;
            width:350px;
            box-shadow:0 0 10px rgba(0,0,0,.3);
            font-family:Arial;
        `;

        popup.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <b>Comment Settings</b>
                <button type="button" id="closePopup">✕</button>
            </div>

            <div>
                Initials
                <input
                    id="initials"
                    value="${cfg.initials || ""}"
                    style="width:100%;margin-top:4px;margin-bottom:10px;">
            </div>

            <div>
                Mode
                <div style="margin-top:5px;">
                    <button type="button" id="modeVOB">VOB</button>
                    <button type="button" id="modePT">PT</button>
                </div>
            </div>

            <div id="ptArea" style="margin-top:10px;">
                PT Comment
                <select id="ptComment" style="width:100%;">
                    <option>Reviewed. Eligible. IDR Initiation document attached.</option>
                    <option>Reviewed, no action required.</option>
                </select>
            </div>

            <button
                type="button"
                id="saveSettingsBtn"
                style="width:100%;margin-top:12px;">
                Save
            </button>
        `;

        document.body.appendChild(popup);

        let mode = cfg.mode || "VOB";

        const ptArea =
            document.getElementById("ptArea");

        function refresh() {
            ptArea.style.display =
                mode === "PT"
                    ? "block"
                    : "none";
        }

        refresh();

        document.getElementById("modeVOB")
            .onclick = function () {
                mode = "VOB";
                refresh();
            };

        document.getElementById("modePT")
            .onclick = function () {
                mode = "PT";
                refresh();
            };

        if (cfg.ptComment) {
            document.getElementById(
                "ptComment"
            ).value = cfg.ptComment;
        }

        document.getElementById(
            "closePopup"
        ).onclick = function () {
            popup.remove();
        };

        document.getElementById(
            "saveSettingsBtn"
        ).onclick = function () {

            const initials =
                document
                    .getElementById("initials")
                    .value
                    .trim()
                    .toUpperCase();

            if (!initials) {
                alert("Initials required");
                return;
            }

            saveSettings({
                initials: initials,
                mode: mode,
                ptComment:
                    document.getElementById(
                        "ptComment"
                    ).value
            });

            popup.remove();

            insertComment();
        };
    }

    if (!settings().initials) {
        openPopup();
        return;
    }

    insertComment();

})();
