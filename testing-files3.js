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
