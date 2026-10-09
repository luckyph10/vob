(() => {
    const oldModal = document.getElementById("aldIssuePuller");
    if (oldModal) oldModal.remove();

    const groups = {};

    document.querySelectorAll("td").forEach(td => {

        const appLink = td.querySelector('a[href*="calculator/"]');
        const issueEl = td.querySelector(".soft-delete-reason-label");

        if (!appLink || !issueEl) return;

        const appId = appLink.textContent.trim();
        const issue = issueEl.textContent.trim();

        if (!/^\d+$/.test(appId)) return;

        if (!groups[issue]) {
            groups[issue] = new Set();
        }

        groups[issue].add(appId);

    });

    const issueNames = Object.keys(groups);

    if (!issueNames.length) {
        const popup = document.createElement("div");
        popup.innerHTML = "❌ No Issue IDs Found";
        popup.style.cssText = `
            position:fixed;
            top:20px;
            right:20px;
            background:#1e3a8a;
            color:#fff;
            padding:12px 18px;
            border-radius:8px;
            z-index:999999;
            font-family:Arial;
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 2000);
        return;
    }

    const overlay = document.createElement("div");
    overlay.id = "aldIssuePuller";
    overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.7);
        z-index:999999;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:Arial,sans-serif;
    `;

    let totalIds = 0;

    const sections = issueNames.map(issue => {

        const ids = [...groups[issue]];
        totalIds += ids.length;

        return `
            <div style="
                border:1px solid #334155;
                border-radius:10px;
                margin-bottom:12px;
                overflow:hidden;
                background:#111827;
            ">
                <div style="
                    background:#1e3a5f;
                    color:white;
                    padding:10px;
                    font-weight:bold;
                ">
                    ${issue} (${ids.length})
                </div>

                <div style="
                    padding:10px;
                    max-height:150px;
                    overflow:auto;
                    white-space:pre-wrap;
                    word-break:break-word;
                    font-size:13px;
                    color:white;
                ">
                    ${ids.join(", ")}
                </div>

                <div style="
                    padding:10px;
                    border-top:1px solid #334155;
                ">
                    <button
                        class="ald-copy-group"
                        data-ids="${ids.join(", ")}"
                        style="
                            background:#1d4ed8;
                            color:white;
                            border:none;
                            padding:8px 12px;
                            border-radius:6px;
                            cursor:pointer;
                            font-weight:bold;
                        ">
                        Copy IDs
                    </button>
                </div>
            </div>
        `;
    }).join("");

    overlay.innerHTML = `
        <div style="
            background:#0f172a;
            color:white;
            width:850px;
            max-width:95%;
            max-height:85vh;
            overflow:auto;
            border-radius:12px;
            padding:16px;
            box-shadow:0 6px 25px rgba(0,0,0,.4);
            border:1px solid #334155;
        ">

            <h2 style="
                margin-top:0;
                color:white;
            ">
                Issue App ID Puller
            </h2>

            <div style="
                margin-bottom:15px;
                color:#cbd5e1;
                font-size:14px;
            ">
                Issues Found: ${issueNames.length}
                <br>
                Total IDs: ${totalIds}
            </div>

            <div style="margin-bottom:15px;">
                <button id="aldCopyAll"
                    style="
                        background:#2563eb;
                        color:white;
                        border:none;
                        padding:10px 14px;
                        border-radius:6px;
                        cursor:pointer;
                        margin-right:8px;
                        font-weight:bold;
                    ">
                    Copy All IDs
                </button>

                <button id="aldClose"
                    style="
                        background:#334155;
                        color:white;
                        border:none;
                        padding:10px 14px;
                        border-radius:6px;
                        cursor:pointer;
                        font-weight:bold;
                    ">
                    Close
                </button>
            </div>

            ${sections}

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("aldClose").onclick = () => {
        overlay.remove();
    };

    document.querySelectorAll(".ald-copy-group").forEach(btn => {

        btn.onclick = async () => {

            await navigator.clipboard.writeText(
                btn.dataset.ids
            );

            const popup = document.createElement("div");

            popup.innerHTML = "📋 Copied";

            popup.style.cssText = `
                position:fixed;
                top:20px;
                right:20px;
                background:#1e3a8a;
                color:white;
                padding:12px 18px;
                border-radius:8px;
                z-index:1000000;
                font-family:Arial;
                box-shadow:0 4px 10px rgba(0,0,0,.3);
            `;

            document.body.appendChild(popup);

            setTimeout(() => popup.remove(), 2000);
        };
    });

    document.getElementById("aldCopyAll").onclick = async () => {

        const allIds = [
            ...new Set(
                Object.values(groups)
                    .flatMap(set => [...set])
            )
        ];

        await navigator.clipboard.writeText(
            allIds.join(", ")
        );

        const popup = document.createElement("div");

        popup.innerHTML =
            `📋 Copied ${allIds.length} IDs`;

        popup.style.cssText = `
            position:fixed;
            top:20px;
            right:20px;
            background:#1e3a8a;
            color:white;
            padding:12px 18px;
            border-radius:8px;
            z-index:1000000;
            font-family:Arial;
            box-shadow:0 4px 10px rgba(0,0,0,.3);
        `;

        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 2000);
    };

})();
