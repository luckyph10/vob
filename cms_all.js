(function () {

    const CONFIG_KEY = "vobSettings";

    function openSettings() {

        if (document.getElementById("vobPopup")) return;

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
            box-shadow:0 2px 10px rgba(0,0,0,.3);
            font-family:Arial,sans-serif;
        `;

        const saved =
            JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");

        popup.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <b>VOB/PT Settings</b>
                <button id="vobClose">✕</button>
            </div>

            <div style="margin-bottom:10px;">
                <label>Initials</label>
                <input id="vobInitials"
                    value="${saved.initials || ""}"
                    style="width:100%;padding:4px;">
            </div>

            <div style="margin-bottom:10px;">
                <label>Mode</label>
                <div>
                    <button id="modeVOB">VOB</button>
                    <button id="modePT">PT</button>
                </div>
            </div>

            <div id="ptSection">
                <select id="ptComment" style="width:100%;">
                    <option>Reviewed. Eligible. IDR Initiation document attached.</option>
                    <option>Reviewed, no action required.</option>
                </select>
            </div>

            <button
                id="vobSave"
                style="width:100%;margin-top:10px;">
                Save
            </button>
        `;

        document.body.appendChild(popup);

        let mode = saved.mode || "VOB";

        const ptSection =
            document.getElementById("ptSection");

        function refreshMode() {

            ptSection.style.display =
                mode === "PT"
                    ? "block"
                    : "none";
        }

        refreshMode();

        document.getElementById("modeVOB")
            .onclick = () => {
                mode = "VOB";
                refreshMode();
            };

        document.getElementById("modePT")
            .onclick = () => {
                mode = "PT";
                refreshMode();
            };

        document.getElementById("vobClose")
            .onclick = () => popup.remove();

        document.getElementById("vobSave")
            .onclick = () => {

                const initials =
                    document.getElementById("vobInitials")
                        .value
                        .trim()
                        .toUpperCase();

                if (!initials) {
                    alert("Initials required.");
                    return;
                }

                localStorage.setItem(
                    CONFIG_KEY,
                    JSON.stringify({
                        initials: initials,
                        mode: mode,
                        ptComment: document.getElementById("ptComment").value
                    })
                );

                popup.remove();

                insertComment();
            };
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
            new Date().toLocaleString(
                "en-US",
                {
                    timeZone: "Asia/Manila"
                }
            )
        );

        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const yy = String(d.getFullYear()).slice(-2);

        return `${mm}/${dd}/${yy}`;
    }

    function insertComment() {

        const cfg =
            JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");

        if (!cfg.initials) {
            openSettings();
            return;
        }

        const el = document.querySelector(
            "#ngForm > fieldset > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > textarea"
        );

        if (!el) return;

        let note = "";

        if (cfg.mode === "VOB") {

            note =
                `${getPCDate()} VOB verified, no change to NSA jurisdiction - ${cfg.initials}`;

        } else {

            note =
                `${cfg.ptComment} - ${getPHDate()} - ${cfg.initials}`;
        }

        if (
            el.value
                .toLowerCase()
                .includes(note.toLowerCase())
        ) {
            console.log("Duplicate prevented");
            return;
        }

        el.value =
            note +
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

    const saved =
        JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");

    if (!saved.initials) {
        openSettings();
        return;
    }

    insertComment();

})();
