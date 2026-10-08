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
        background:rgba(0,0,0,.5);
        z-index:999999;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:Arial,sans-serif;
    `;

    overlay.innerHTML = `
        <div style="
            background:#fff;
            width:550px;
            max-width:90%;
            border-radius:12px;
            padding:16px;
            box-shadow:0 6px 20px rgba(0,0,0,.3);
        ">
            <h3 style="margin:0 0 10px 0;">
                Missing Arbit ID Finder
            </h3>

            <p style="margin-bottom:10px;font-size:13px;color:#555;">
                Paste IDs you already have from Excel.
            </p>

            <textarea id="aldExistingIds"
                style="
                    width:100%;
                    height:180px;
                    resize:vertical;
                    padding:8px;
                    box-sizing:border-box;
                    border:1px solid #ccc;
                    border-radius:6px;
                "
                placeholder="Example:

2716285
2716422
2717725
2718713
2719731"></textarea>

            <div style="margin-top:12px;display:flex;gap:8px;">
                <button id="aldFindBtn"
                    style="
                        background:#2563eb;
                        color:#fff;
                        border:none;
                        padding:10px 14px;
                        border-radius:6px;
                        cursor:pointer;
                    ">
                    Find Missing IDs
                </button>

                <button id="aldCloseBtn"
                    style="
                        background:#6b7280;
                        color:#fff;
                        border:none;
                        padding:10px 14px;
                        border-radius:6px;
                        cursor:pointer;
                    ">
                    Close
                </button>
            </div>

            <div id="aldResult"
                style="
                    margin-top:12px;
                    font-size:13px;
                    white-space:pre-wrap;
                ">
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("aldCloseBtn").onclick = () => {
        overlay.remove();
    };

    document.getElementById("aldFindBtn").onclick = async () => {

        const pasted = document
            .getElementById("aldExistingIds")
            .value;

        const existingIds = new Set(
            (pasted.match(/\d+/g) || [])
        );

        const missingIds = pageIds.filter(
            id => !existingIds.has(id)
        );

        const resultText = missingIds.join(", ");

        await navigator.clipboard.writeText(resultText);

        document.getElementById("aldResult").innerHTML = `
            <b>Found on Page:</b> ${pageIds.length}<br>
            <b>Already Have:</b> ${existingIds.size}<br>
            <b>Missing:</b> ${missingIds.length}<br><br>
            ✅ Copied to Clipboard:<br>
            <div style="
                margin-top:6px;
                padding:8px;
                background:#f3f4f6;
                border-radius:6px;
                word-break:break-word;
            ">
                ${resultText || "No missing IDs found"}
            </div>
        `;

        if (missingIds.length > 0) {
            setTimeout(() => {
                if (document.getElementById("aldMissingIdFinder")) {
                    overlay.remove();
                }

                const popup = document.createElement("div");
                popup.innerHTML =
                    `📋 Copied ${missingIds.length} Missing Arbit ID${missingIds.length > 1 ? "s" : ""}`;

                popup.style.cssText = `
                    position:fixed;
                    top:20px;
                    right:20px;
                    background:#16a34a;
                    color:white;
                    padding:12px 18px;
                    border-radius:8px;
                    z-index:999999;
                    box-shadow:0 4px 10px rgba(0,0,0,.3);
                `;

                document.body.appendChild(popup);

                setTimeout(() => popup.remove(), 2000);
            }, 5000);
        }
    };
})();
