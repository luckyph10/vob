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
    return `${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}/${String(d.getFullYear()).slice(-2)}`;
}

function getPHDate() {
    const d = new Date(
        new Date().toLocaleString("en-US", {
            timeZone: "Asia/Manila"
        })
    );

    return `${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}/${String(d.getFullYear()).slice(-2)}`;
}

function insertComment() {

    const cfg = getSettings();

    const textarea =
        document.querySelector(
            'textarea[name="comments"]'
        );

    if (!textarea || !cfg.initials) {
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
        new Event("input", { bubbles: true })
    );

    textarea.dispatchEvent(
        new Event("change", { bubbles: true })
    );
}

function createWidget() {

    const old =
        document.getElementById("vobWidget");

    if (old) old.remove();

    const cfg = getSettings();

    const div =
        document.createElement("div");

    div.id = "vobWidget";

    div.style.cssText = `
        position:fixed;
        top:10px;
        left:10px;
        z-index:2147483647;
        background:#002b5c;
        color:white;
        padding:8px;
        font-size:12px;
        border-radius:8px;
        font-family:Segoe UI;
        min-width:130px;
        box-shadow:0 3px 8px rgba(0,0,0,.3);
    `;

    div.innerHTML = `
        <div><b>${cfg.mode || "VOB"}</b> | ${cfg.initials || "---"}</div>
        <div style="font-size:10px;color:#8cff8c;">Saved ✅</div>
        <button
            id="editBtn"
            type="button"
            style="
                width:100%;
                margin-top:5px;
                border:none;
                border-radius:5px;
                padding:4px;
                background:#0b4f99;
                color:white;
                cursor:pointer;
            "
        >
            ⚙ Edit
        </button>
    `;

    document.body.appendChild(div);

    document.getElementById("editBtn")
        .onclick = () => openPopup(false);
}

function openPopup(autoHide) {

    const old =
        document.getElementById("vobPopup");

    if (old) old.remove();

    const cfg = getSettings();

    const dark =
        cfg.darkMode || false;

    const popup =
        document.createElement("div");

    popup.id = "vobPopup";

    popup.style.cssText = `
        position:fixed;
        top:50px;
        left:10px;
        width:260px;
        background:${dark ? "#111827" : "#fff"};
        color:${dark ? "#fff" : "#000"};
        border-radius:10px;
        font-family:Segoe UI;
        box-shadow:0 3px 15px rgba(0,0,0,.3);
        z-index:2147483647;
        overflow:hidden;
    `;

    popup.innerHTML = `
        <div style="
            background:#002b5c;
            color:white;
            padding:8px;
            display:flex;
            justify-content:space-between;
            align-items:center;
        ">

            <span>VOB/PT</span>

            <div>

                <button
                    id="darkBtn"
                    type="button"
                    style="
                        background:#111;
                        color:white;
                        border:none;
                        cursor:pointer;
                    "
                >
                    🌙
                </button>

                <button
                    id="closeBtn"
                    type="button"
                    style="
                        background:none;
                        color:white;
                        border:none;
                        cursor:pointer;
                    "
                >
                    ✖
                </button>

            </div>

        </div>

        <div style="padding:10px;">

            <div>
                Initials
            </div>

            <input
                id="initials"
                maxlength="3"
                value="${cfg.initials || ""}"
                style="
                    width:50px;
                    text-align:center;
                    text-transform:uppercase;
                    margin-top:4px;
                "
            >

            <div
                style="
                    margin-top:10px;
                    display:flex;
                    gap:5px;
                "
            >

                <button
                    id="vobBtn"
                    type="button"
                    style="
                        flex:1;
                        border:none;
                        padding:6px;
                        border-radius:5px;
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
                    "
                >
                    PT
                </button>

            </div>

            <div
                id="ptSection"
                style="margin-top:10px;"
            >

                <select
                    id="ptComment"
                    style="width:100%;"
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
                id="status"
                style="
                    margin-top:8px;
                    font-size:11px;
                    color:#16a34a;
                "
            >
                Saved ✅
            </div>

            <button
                id="saveBtn"
                type="button"
                style="
                    width:100%;
                    margin-top:10px;
                    border:none;
                    padding:8px;
                    background:#002b5c;
                    color:white;
                    border-radius:5px;
                    cursor:pointer;
                "
            >
                Save
            </button>

        </div>
    `;

    document.body.appendChild(popup);

    let mode =
        cfg.mode || "VOB";

    const vobBtn =
        document.getElementById("vobBtn");

    const ptBtn =
        document.getElementById("ptBtn");

    const ptSection =
        document.getElementById("ptSection");

    const status =
        document.getElementById("status");

    if (cfg.ptComment) {
        document.getElementById(
            "ptComment"
        ).value = cfg.ptComment;
    }

    function refresh() {

        vobBtn.style.background =
            mode === "VOB"
                ? "#16a34a"
                : "#002b5c";

        ptBtn.style.background =
            mode === "PT"
                ? "#16a34a"
                : "#335f97";

        vobBtn.style.color = "white";
        ptBtn.style.color = "white";

        ptSection.style.display =
            mode === "PT"
                ? "block"
                : "none";
    }

    refresh();

    vobBtn.onclick = () => {
        mode = "VOB";
        refresh();
        status.innerHTML = "Unsaved ⚠️";
    };

    ptBtn.onclick = () => {
        mode = "PT";
        refresh();
        status.innerHTML = "Unsaved ⚠️";
    };

    document.getElementById("darkBtn")
        .onclick = () => {

            cfg.darkMode =
                !cfg.darkMode;

            saveSettings({
                ...cfg
            });

            openPopup(false);
        };

    document.getElementById("closeBtn")
        .onclick = () =>
            popup.remove();

    document.getElementById("saveBtn")
        .onclick = () => {

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
                initials,
                mode,
                darkMode:
                    cfg.darkMode || false,
                ptComment:
                    document.getElementById(
                        "ptComment"
                    ).value
            });

            createWidget();

            popup.remove();
        };

    if (autoHide) {

        setTimeout(() => {

            if (
                document.getElementById(
                    "vobPopup"
                )
            ) {
                popup.style.display =
                    "none";
            }

        }, 2000);
    }
}

createWidget();

const cfg =
    getSettings();

if (!cfg.initials) {

    openPopup(true);

} else {

    insertComment();
}

})();
