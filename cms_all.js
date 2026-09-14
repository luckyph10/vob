(function () {

    const CONFIG_KEY = "VOB_CONFIG";

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

    function getConfig() {
        return JSON.parse(
            localStorage.getItem(CONFIG_KEY) || "{}"
        );
    }

    function saveConfig(cfg) {
        localStorage.setItem(
            CONFIG_KEY,
            JSON.stringify(cfg)
        );
    }

    function insertComment() {

        const cfg = getConfig();

        if (!cfg.initials) {
            openSettings();
            return;
        }

        const el = document.querySelector(
            "#ngForm > fieldset > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > textarea"
        );

        if (!el) {
            alert("Textarea not found");
            return;
        }

        let note = "";

        if (cfg.mode === "PT") {

            note =
                cfg.ptComment +
                " - " +
                getPHDate() +
                " - " +
                cfg.initials;

        } else {

            note =
                getPCDate() +
                " VOB verified, no change to NSA jurisdiction - " +
                cfg.initials;
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

    function openSettings() {

        if (document.getElementById("vobSettings")) {
            return;
        }

        const cfg = getConfig();

        const box = document.createElement("div");

        box.id = "vobSettings";

        box.style.cssText =
            "position:fixed;" +
            "top:50%;" +
            "left:50%;" +
            "transform:translate(-50%,-50%);" +
            "z-index:999999;" +
            "background:white;" +
            "border:1px solid #999;" +
            "padding:15px;" +
            "width:360px;" +
            "border-radius:8px;" +
            "box-shadow:0 0 10px rgba(0,0,0,.3);" +
            "font-family:Arial;";

        box.innerHTML =
            '<div style="display:flex;justify-content:space-between;margin-bottom:10px;">' +
            '<b>VOB/PT Settings</b>' +
            '<button type="button" id="vobClose">X</button>' +
            '</div>' +

            '<div style="margin-bottom:10px;">' +
            'Initials<br>' +
            '<input id="vobInitials" style="width:100%;" value="' + (cfg.initials || "") + '">' +
            '</div>' +

            '<div style="margin-bottom:10px;">' +
            'Mode<br>' +
            '<button type="button" id="btnVOB">VOB Mode</button> ' +
            '<button type="button" id="btnPT">PT Mode</button>' +
            '</div>' +

            '<div id="ptArea">' +
            'PT Comment<br>' +
            '<select id="ptComment" style="width:100%;">' +
            '<option>Reviewed. Eligible. IDR Initiation document attached.</option>' +
            '<option>Reviewed, no action required.</option>' +
            '</select>' +
            '</div>' +

            '<button type="button" id="saveConfig" style="margin-top:10px;width:100%;">Save</button>';

        document.body.appendChild(box);

        let currentMode = cfg.mode || "VOB";

        const ptArea =
            document.getElementById("ptArea");

        const ptSelect =
            document.getElementById("ptComment");

        if (cfg.ptComment) {
            ptSelect.value = cfg.ptComment;
        }

        function redraw() {
            ptArea.style.display =
                currentMode === "PT"
                    ? "block"
                    : "none";
        }

        redraw();

        document.getElementById("btnVOB")
            .onclick = function (e) {

                e.preventDefault();

                currentMode = "VOB";

                redraw();
            };

        document.getElementById("btnPT")
            .onclick = function (e) {

                e.preventDefault();

                currentMode = "PT";

                redraw();
            };

        document.getElementById("vobClose")
            .onclick = function (e) {

                e.preventDefault();

                box.remove();
            };

        document.getElementById("saveConfig")
            .onclick = function (e) {

                e.preventDefault();

                const initials =
                    document
                        .getElementById("vobInitials")
                        .value
                        .trim()
                        .toUpperCase();

                if (!initials) {
                    alert("Initials required");
                    return;
                }

                saveConfig({
                    initials: initials,
                    mode: currentMode,
                    ptComment: ptSelect.value
                });

                box.remove();

                insertComment();
            };
    }

    function createToolbar() {

        if (document.getElementById("vobToolbar")) {
            return;
        }

        const bar =
            document.createElement("div");

        bar.id = "vobToolbar";

        bar.style.cssText =
            "position:fixed;" +
            "top:100px;" +
            "right:20px;" +
            "z-index:999998;" +
            "background:white;" +
            "border:1px solid #999;" +
            "padding:8px;" +
            "border-radius:8px;" +
            "box-shadow:0 0 8px rgba(0,0,0,.2);";

        bar.innerHTML =
            '<button type="button" id="vobInsert">Insert</button> ' +
            '<button type="button" id="vobEdit">Settings</button>';

        document.body.appendChild(bar);

        document.getElementById("vobInsert")
            .onclick = function (e) {

                e.preventDefault();

                insertComment();
            };

        document.getElementById("vobEdit")
            .onclick = function (e) {

                e.preventDefault();

                openSettings();
            };
    }

    createToolbar();

    const cfg = getConfig();

    if (!cfg.initials) {
        openSettings();
    }

})();
