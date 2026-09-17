// arbitid_puller.js
(async function () {
    try {

        const appIds = [...new Set(
            [...document.querySelectorAll('a[title="Open Arbit"]')]
                .map(a => a.textContent.trim())
                .filter(Boolean)
        )];

        if (!appIds.length) {
            alert("No App IDs found.");
            return;
        }

        const statusElement = document.querySelector("span.ng-value-label");

        if (!statusElement) {
            alert("Dispute Status not found.");
            return;
        }

        const disputeStatus = statusElement.textContent.trim();

        // Excel format:
        // B = App ID
        // C = blank
        // D = blank
        // E = Dispute Status
        const clipboardText = appIds
            .map(id => `${id}\t\t\t${disputeStatus}`)
            .join("\n");

        await navigator.clipboard.writeText(clipboardText);

        const popup = document.createElement("div");
        popup.style.cssText = `
            position:fixed;
            top:20px;
            right:20px;
            z-index:999999;
            background:#2d7d46;
            color:#fff;
            padding:12px 18px;
            border-radius:8px;
            font:14px Arial,sans-serif;
            box-shadow:0 4px 12px rgba(0,0,0,.3);
            max-width:400px;
        `;

        popup.innerHTML =
            appIds.length === 1
                ? `
                    <b>✓ Copied App ID</b><br>
                    ${appIds[0]}<br>
                    Status: ${disputeStatus}
                  `
                : `
                    <b>✓ Copied ${appIds.length} App IDs</b><br>
                    Status: ${disputeStatus}
                  `;

        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 4000);

    } catch (err) {
        console.error("arbitid_puller failed:", err);
        alert("Copy failed.");
    }
})();
