(async function () {
    try {
        console.log("MailMan started...");

        const disputeId = (await navigator.clipboard.readText()).trim();

        if (!disputeId) {
            alert("Clipboard is empty.");
            return;
        }

        console.log("Clipboard:", disputeId);

        const waitForElement = (selector, timeout = 15000) => {
            return new Promise((resolve, reject) => {
                const start = Date.now();

                const timer = setInterval(() => {
                    const el = document.querySelector(selector);

                    if (el) {
                        clearInterval(timer);
                        resolve(el);
                        return;
                    }

                    if (Date.now() - start > timeout) {
                        clearInterval(timer);
                        reject(new Error("Element not found: " + selector));
                    }
                }, 300);
            });
        };

        const input = await waitForElement(
            'input[placeholder*="Search subject"]'
        );

        input.focus();

        const nativeSetter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "value"
        ).set;

        nativeSetter.call(input, disputeId);

        input.dispatchEvent(
            new Event("input", { bubbles: true })
        );

        input.dispatchEvent(
            new Event("change", { bubbles: true })
        );

        input.dispatchEvent(
            new KeyboardEvent("keyup", { bubbles: true })
        );

        console.log("Value inserted:", disputeId);

        setTimeout(async () => {

            const searchButton =
                document.querySelector('button[title="Search"]') ||
                [...document.querySelectorAll("button")]
                    .find(b => b.textContent.trim().includes("Search"));

            if (!searchButton) {
                alert("Search button not found.");
                return;
            }

            searchButton.scrollIntoView({
                block: "center"
            });

            searchButton.click();

            console.log("Search button clicked.");

        }, 800);

    } catch (err) {
        console.error(err);
        alert("MailMan Error: " + err.message);
    }
})();
