(async function () {

    const disputeId = (await navigator.clipboard.readText()).trim();

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

    input.focus();
    input.value = disputeId;

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));

    setTimeout(() => {

        const searchBtn = document.querySelector(
            'button[title="Search"]'
        );

        if (!searchBtn) {
            alert("Search button not found");
            return;
        }

        searchBtn.click();

        console.log("Searched:", disputeId);

    }, 500);

})();
`
