(async () => {
    try {
        const ids = [
            ...new Set(
                [...document.querySelectorAll('td a[href*="calculator/"]')]
                    .map(a => a.textContent.trim())
                    .filter(id => /^\d+$/.test(id))
            )
        ];

        if (!ids.length) return;

        await navigator.clipboard.writeText(ids.join(','));

        const popup = document.createElement('div');
        popup.innerHTML = `
            <div style="
                position:fixed;
                top:20px;
                right:20px;
                background:#1e293b;
                color:#fff;
                padding:12px 18px;
                border-radius:10px;
                font-family:Arial,sans-serif;
                font-size:14px;
                box-shadow:0 4px 12px rgba(0,0,0,.3);
            ">
                📋 Copied ${ids.length} Arbit ID${ids.length > 1 ? 's' : ''}
            </div>
        `;

        popup.style.position = 'fixed';
        popup.style.zIndex = '999999';

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 2000);

    } catch (e) {
        console.error('Arbit ID Puller Error:', e);
    }
})();
