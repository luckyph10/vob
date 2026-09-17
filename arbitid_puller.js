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

        // Combine all App IDs into one cell
        const appIdText = appIds.join(", ");

        // Excel format:
        // Column B = App IDs
        // Column C = blank
        // Column D = blank
        // Column E = Dispute Status
        const clipboardText = `${appIdText}\t\t\t${disputeStatus}`;

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
            max-width:500px;
        `;

        popup.innerHTML = `
            <b>✓ Copied ${appIds.length} App ID${appIds.length > 1 ? 's' : ''}</b><br>
            ${appIdText}<br>
            Status: ${disputeStatus}
        `;

        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 5000);

    } catch (err) {
        console.error("arbitid_puller failed:", err);
        alert("Copy failed.");
    }
})();
