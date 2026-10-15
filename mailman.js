(async function () {

    let disputeId = "";

    try {
        disputeId = (await navigator.clipboard.readText()).trim();
    } catch (e) {
        alert("Cannot read clipboard");
        return;
    }

    if (!disputeId) {
        alert("Clipboard is empty");
        return;
    }

    const input = document.querySelector(
        'input[placeholder*="Search subject"]'
    );

    if (!input) {
        alert("Search input not found");
        return;
    }

    // Clear existing value
    input.focus();
    input.value = "";

    // Set clipboard value
    input.value = disputeId;

    // Trigger React/UI updates
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));

    // Small delay before searching
    setTimeout(() => {

        const searchBtn = [...document.querySelectorAll("button")]
            .find(btn => btn.textContent.trim().includes("Search"));

        if (!searchBtn) {
            alert("Search button not found");
            return;
        }

        searchBtn.click();

        console.log("Searching dispute:", disputeId);

    }, 500);

})();
