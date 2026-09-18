(async function () {
    try {
        let clipboardText = await navigator.clipboard.readText();

        // Remove HTML line breaks
        clipboardText = clipboardText.replace(/<br\s*\/?>/gi, "\n").trim();

        // Remove surrounding quotes
        if (
            clipboardText.startsWith('"') &&
            clipboardText.endsWith('"')
        ) {
            clipboardText = clipboardText.slice(1, -1).trim();
        }

        // Split by commas, spaces, tabs, semicolons, or new lines
        const items = clipboardText
            .split(/[\s,;\n]+/)
            .map(item => item.replace(/^"|"$/g, "").trim())
            .filter(Boolean);

        if (!items.length) {
            console.error("Clipboard is empty.");
            return;
        }

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

        const urls = items
            .map(getUrl)
            .filter(Boolean);

        if (!urls.length) {
            console.error("No valid App IDs or Dispute IDs found.");
            return;
        }

        // Open all IDs
        urls.forEach((url, index) => {
            if (index === 0) {
                window.location.href = url;
            } else {
                window.open(url, "_blank");
            }
        });

    } catch (err) {
        console.error("Something went wrong!", err);
    }
})();
