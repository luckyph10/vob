(() => {
    const existingModal = document.getElementById("aldMissingIdFinder");
    if (existingModal) existingModal.remove();

    const pageIds = [
        ...new Set(
            [...document.querySelectorAll('td a[href*="calculator/"]')]
                .map(a => a.textContent.trim())
                .filter(id => /^\d+$/.test(id))
        )
    ];

    const overlay = document.createElement("div");
    overlay.id = "aldMissingIdFinder";

    overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.55);
        backdrop-filter:blur(4px);
        z-index:999999;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:Segoe UI,Arial,sans-serif;
    `;

    overlay.innerHTML = `
        <div style="
            width:650px;
            max-width:95%;
            border-radius:14px;
            padding:18px;
            background:rgba(10,25,50,.92);
            border:1px solid rgba(59,130,246,.35);
            box-shadow:0 0 25px rgba(59,130,246,.25);
            color:#fff;
        ">
            <h2 style="
                margin:0 0 8px 0;
                color:#60a5fa;
            ">
                Missing Arbit ID Finder
            </h2>

            <div style="
                font-size:13px;
                color:#cbd5e1;
                margin-bottom:12px;
            ">
                Paste your Excel App IDs below.
            </div>

            <textarea
                id="aldExistingIds"
                style="
                    width:100%;
                    height:180px;
                    resize:vertical;
                    padding:10px;
                    box-sizing:border-box;
                    border-radius:8px;
                    border:1px solid #3b82f6;
                    background:#0f172a;
                    color:white;
                    font-size:13px;
                "
                placeholder="2716285
2716422
2717725"></textarea>

            <div style="
                margin-top:12px;
                display:flex;
                gap:8px;
                flex-wrap:wrap;
            ">
                <button id="aldFindBtn" style="
                    background:#2563eb;
                    color:white;
                    border:none;
                    padding:10px 16px;
                    border-radius:8px;
                    cursor:pointer;
                    font-weight:600;
                ">
                    Process IDs
                </button>

                <button id="aldCopyBtn" style="
                    background:#16a34a;
                    color:white;
                    border:none;
                    padding:10px 16px;
                    border-radius:8px;
                    cursor:pointer;
                    font-weight:600;
                ">
                    Copy Missing IDs
                </button>

                <button id="aldCloseBtn" style="
                    background:#475569;
                    color:white;
                    border:none;
                    padding:10px 16px;
                    border-radius:8px;
                    cursor:pointer;
                    font-weight:600;
                ">
                    Close
                </button>
            </div>

            <div id="aldResult"
                style="
                    margin-top:14px;
                    max-height:350px;
                    overflow:auto;
                    white-space:pre-wrap;
                    font-size:13px;
                    color:#e2e8f0;
                ">
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    let latestMissingIds = [];

    document.getElementById("aldCloseBtn").onclick = () => {
        overlay.remove();
    };

    document.getElementById("aldFindBtn").onclick = () => {

        const pasted =
            document.getElementById("aldExistingIds").value;

        const pastedIds =
            (pasted.match(/\d+/g) || []);

        const existingIds =
            new Set(pastedIds);

        const missingIds =
            pageIds.filter(
                id => !existingIds.has(id)
            );

        latestMissingIds = missingIds;

        const foundIds =
            pastedIds.filter(
                id => pageIds.includes(id)
            );

        const notOnPageIds =
            pastedIds.filter(
                id => !pageIds.includes(id)
            );

        document.getElementById("aldResult").innerHTML = `
            <div style="
                background:rgba(15,23,42,.8);
                padding:12px;
                border-radius:8px;
                border:1px solid rgba(59,130,246,.25);
            ">

            <b style="color:#60a5fa">Summary</b><br><br>

            <b>IDs Found On Page:</b> ${pageIds.length}<br>
            <b>IDs You Pasted:</b> ${existingIds.size}<br>
            <b>Missing IDs:</b> ${missingIds.length}<br>
            <b>Your IDs Found On Page:</b> ${foundIds.length}<br>
            <b>Your IDs NOT On Page:</b> ${notOnPageIds.length}

            <hr style="margin:10px 0;border-color:#334155;">

            <b style="color:#22c55e">
                IDs Found On Page From Your List
            </b>
            <div style="
                margin-top:4px;
                padding:8px;
                background:#0f172a;
                border-radius:6px;
                word-break:break-word;
            ">
                ${foundIds.length
                    ? foundIds.join(", ")
                    : "None"}
            </div>

            <br>

            <b style="color:#f87171">
                IDs In Your List But NOT On This Page
            </b>
            <div style="
                margin-top:4px;
                padding:8px;
                background:#0f172a;
                border-radius:6px;
                word-break:break-word;
            ">
                ${notOnPageIds.length
                    ? notOnPageIds.join(", ")
                    : "None"}
            </div>

            <br>

            <b style="color:#fbbf24">
                Missing IDs (Present On Page But Not In Your List)
            </b>
            <div style="
                margin-top:4px;
                padding:8px;
                background:#0f172a;
                border-radius:6px;
                word-break:break-word;
            ">
                ${missingIds.length
                    ? missingIds.join(", ")
                    : "No missing IDs found"}
            </div>

            </div>
        `;
    };

    document.getElementById("aldCopyBtn").onclick = async () => {

        if (!latestMissingIds.length) {
            alert("No missing IDs to copy. Run Process IDs first.");
            return;
        }

        await navigator.clipboard.writeText(
            latestMissingIds.join(", ")
        );

        alert(
            `Copied ${latestMissingIds.length} Missing ID(s) to clipboard.`
        );
    };

})();
