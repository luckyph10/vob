(function () {

    const USER_KEY = "fpy_username";
    const ACCESS_KEY = "fpy_key";

    function startMainCode() {

        // =================================================
        // YOUR EXISTING CODE GOES HERE
        // =================================================



(async function () {
    try {
        let clipboardText = "";

        // Try reading from clipboard
        try {
            clipboardText = await navigator.clipboard.readText();
        } catch (clipboardError) {
            console.warn("Clipboard access was blocked. Please paste your IDs below.");

            clipboardText = prompt("Paste your App IDs / Dispute IDs here:");

            if (clipboardText === null) {
                console.error("No IDs were provided.");
                return;
            }
        }

        clipboardText = clipboardText.trim();

        // Remove surrounding quotes
        if (
            clipboardText.startsWith('"') &&
            clipboardText.endsWith('"')
        ) {
            clipboardText = clipboardText.slice(1, -1).trim();
        }

        // Split by newline, spaces, commas, tabs, or semicolons
        const items = clipboardText
            .split(/[\s,;]+/)
            .map(item => item.replace(/^"|"$/g, "").trim())
            .filter(Boolean);

        if (!items.length) {
            console.error("Clipboard is empty.");
            return;
        }

        // Remove duplicate IDs while preserving original order
        const uniqueItems = [...new Set(items)];

        console.log("IDs found:", items.length);
        console.log("Unique IDs:", uniqueItems.length);
        console.log(uniqueItems);

        // Convert an ID into its URL
        function getUrl(item) {
            // App ID
            if (/^\d{1,8}$/.test(item)) {
                return `https://arbit.halomd.com/calculator/${item}`;
            }

            // Dispute ID
            if (/^DISP-\d+$/i.test(item)) {
                return `https://arbit.halomd.com/dispute/${item}`;
            }

            return null;
        }

        // Create valid URLs
        const urls = uniqueItems
            .map(item => ({
                item,
                url: getUrl(item)
            }))
            .filter(x => x.url);

        if (!urls.length) {
            console.error("No valid App IDs or Dispute IDs found.");
            return;
        }

        console.log("Opening:", urls.map(x => x.item));

        // First ID → current tab
        window.location.href = urls[0].url;

        // Remaining IDs → new tabs
        for (let i = 1; i < urls.length; i++) {
            window.open(urls[i].url, "_blank");
        }

    } catch (err) {
        console.error("Something went wrong!", err);
    }
})();

// =================================================
        // END YOUR EXISTING CODE
        // =================================================
    }


    // =====================================================
    // STRICT AUTH CHECK
    // =====================================================

    const username =
        localStorage.getItem(USER_KEY);

    const accessKey =
        localStorage.getItem(ACCESS_KEY);


    // REGISTERED
    if (username && accessKey) {

        startMainCode();

        return;
    }


    // =====================================================
    // NOT REGISTERED → STOP EVERYTHING
    // =====================================================

    if (document.getElementById("fpy-auth-overlay")) {
        return;
    }


    const overlay =
        document.createElement("div");

    overlay.id =
        "fpy-auth-overlay";


    overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.75);
        z-index:9999999999;
        display:flex;
        justify-content:center;
        align-items:flex-start;
        padding-top:60px;
    `;


    overlay.innerHTML = `
        <div style="
            width:420px;
            max-width:90vw;
            background:#1f1f1f;
            border-radius:22px;
            padding:25px;
            box-sizing:border-box;
            box-shadow:0 20px 60px rgba(0,0,0,.5);
            position:relative;
        ">

            <button id="fpy-close-btn" style="
                position:absolute;
                right:12px;
                top:12px;
                width:32px;
                height:32px;
                border:none;
                border-radius:50%;
                cursor:pointer;
                color:white;
                background:rgba(255,255,255,.08);
            ">✕</button>

            <div style="
                font-size:40px;
                text-align:center;
                margin-bottom:10px;
            ">🔐</div>

            <h2 style="
                color:white;
                text-align:center;
                margin:0 0 5px;
            ">
                Automation Access
            </h2>

            <div style="
                color:#aaa;
                text-align:center;
                margin-bottom:20px;
                font-size:13px;
            ">
                One-time registration only
            </div>

            <input
                id="fpy-username"
                placeholder="Username"
                style="
                    width:100%;
                    padding:14px 16px;
                    margin-bottom:15px;
                    border-radius:999px;
                    border:1px solid rgba(255,255,255,.15);
                    background:rgba(255,255,255,.08);
                    color:white;
                    box-sizing:border-box;
                "
            >

            <input
                id="fpy-accesskey"
                type="password"
                placeholder="Access Key"
                style="
                    width:100%;
                    padding:14px 16px;
                    margin-bottom:15px;
                    border-radius:999px;
                    border:1px solid rgba(255,255,255,.15);
                    background:rgba(255,255,255,.08);
                    color:white;
                    box-sizing:border-box;
                "
            >

            <button
                id="fpy-save-btn"
                style="
                    width:100%;
                    border:none;
                    border-radius:999px;
                    padding:14px;
                    cursor:pointer;
                    color:white;
                    font-weight:bold;
                    background:linear-gradient(
                        135deg,
                        #0078d4,
                        #00a2ff
                    );
                "
            >
                Save & Continue
            </button>

        </div>
    `;


    document.body.appendChild(overlay);


    // Close = stay blocked
    overlay
        .querySelector("#fpy-close-btn")
        .onclick = function () {

            overlay.remove();

            // IMPORTANT:
            // Main code still does NOT run.

        };


    // Save registration
    overlay
        .querySelector("#fpy-save-btn")
        .onclick = function () {

            const newUsername =
                overlay
                    .querySelector("#fpy-username")
                    .value
                    .trim();

            const newAccessKey =
                overlay
                    .querySelector("#fpy-accesskey")
                    .value
                    .trim();


            if (!newUsername || !newAccessKey) {

                alert(
                    "Username and Access Key are required."
                );

                return;
            }


            localStorage.setItem(
                USER_KEY,
                newUsername
            );


            localStorage.setItem(
                ACCESS_KEY,
                newAccessKey
            );


            overlay.remove();


            // NO reload.
            // Start the previously blocked code now.

            startMainCode();

        };

})();
        
