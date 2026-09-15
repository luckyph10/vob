
(function () {

    const USER_KEY = "fpy_username";
    const ACCESS_KEY = "fpy_key";

    function startMainCode() {

        // =================================================
        // YOUR EXISTING CODE GOES HERE
        // =================================================






(function () {
    runScript();

    function runScript() {
        var btn1 = document.querySelector(
            "body > app-root > div > div.container-fluid.ps-0.pe-0.h-100.pb-4 > app-dispute-detail > div > div.card-header > div > div.col-auto.text-center.bg-dirty > button.btn.btn-sm.btn-royal-blue"
        );

        if (!btn1) {
            alert("Main button not found");
            return;
        }

        btn1.click();

        var tries = 0;

        var interval = setInterval(function () {
            var btn2 = document.querySelector(
                "body > ngb-modal-window button.btn.btn-royal-blue"
            );

            if (btn2) {
                btn2.click();
                clearInterval(interval);
            }

            if (tries++ > 10) {
                clearInterval(interval);
                alert("Popup button not found");
            }
        }, 300);
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
