(async function () {
    const TARGET_URL = "https://mailmanagement.halomd.com/search-emails";

    let disputeId = "";

    try {
        disputeId = (await navigator.clipboard.readText()).trim();
    } catch (err) {
        alert("Unable to read clipboard.");
        return;
    }

    if (!disputeId) {
        alert("Clipboard is empty.");
        return;
    }

    if (location.href.startsWith(TARGET_URL)) {
        runSearch(disputeId);
        return;
    }

    const w = window.open(
        TARGET_URL,
        "_blank"
    );

    const timer = setInterval(() => {
        try {
            if (w && !w.closed && w.location.href.includes("/search-emails")) {
                clearInterval(timer);

                setTimeout(() => {
                    w.postMessage({
                        type: "HALOMD_SEARCH",
                        disputeId
                    }, "*");
                }, 2000);
            }
        } catch (e) {}
    }, 1000);

    function runSearch(value) {
        const input =
            document.querySelector(
                'input[placeholder*="Search subject"]'
            );

        if (!input) {
            alert("Search box not found.");
            return;
        }

        input.focus();
        input.value = value;

        input.dispatchEvent(
            new Event("input", { bubbles: true })
        );

        input.dispatchEvent(
            new Event("change", { bubbles: true })
        );

        const btn = [...document.querySelectorAll("button")]
            .find(b => b.textContent.trim() === "Search");

        if (!btn) {
            alert("Search button not found.");
            return;
        }

        btn.click();
    }

    window.addEventListener("message", e => {
        if (
            e.data &&
            e.data.type === "HALOMD_SEARCH"
        ) {
            runSearch(e.data.disputeId);
        }
    });
})();
