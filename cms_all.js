(function () {
    'use strict';

    if (!location.href.startsWith('https://arbit.halomd.com/dispute/')) {
        return;
    }

    if (window.CMS_AUTO_COMMENT_LOADED) {
        return;
    }

    window.CMS_AUTO_COMMENT_LOADED = true;

    const INITIALS_KEY = 'cmsAutoCommentInitials';

    function getPHDate() {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Manila',
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        }).format(new Date());
    }

    function getPCDate() {
        return new Intl.DateTimeFormat('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        }).format(new Date());
    }

    function toast(message, color = '#00c853') {

        const old =
            document.getElementById('cms-toast');

        if (old) old.remove();

        const div =
            document.createElement('div');

        div.id = 'cms-toast';

        div.style.cssText = `
            position:fixed;
            top:10px;
            right:10px;
            z-index:99999999;
            background:${color};
            color:white;
            padding:10px 14px;
            border-radius:8px;
            font-family:Arial,sans-serif;
            font-size:13px;
            font-weight:bold;
            box-shadow:0 4px 16px rgba(0,0,0,.4);
        `;

        div.textContent = message;

        document.body.appendChild(div);

        setTimeout(() => {
            if (div.parentNode) div.remove();
        }, 2000);
    }

    function openSettings() {

        const old =
            document.getElementById('cms-settings');

        if (old) old.remove();

        const saved =
            localStorage.getItem(INITIALS_KEY) || '';

        const panel =
            document.createElement('div');

        panel.id = 'cms-settings';

        panel.style.cssText = `
            position:fixed;
            top:10px;
            left:10px;
            width:260px;
            background:rgba(0,0,0,.92);
            color:white;
            padding:16px;
            border-radius:12px;
            z-index:99999999;
            font-family:Arial,sans-serif;
            box-shadow:0 6px 25px rgba(0,0,0,.6);
        `;

        panel.innerHTML = `
            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:12px;
            ">
                <b>CMS AUTO COMMENT</b>

                <span
                    id="cms-status"
                    style="
                        color:${saved ? '#00ff66' : '#ff5555'};
                        font-size:12px;
                    "
                >
                    ${saved ? '✓ Saved' : 'Not Saved'}
                </span>
            </div>

            <input
                id="cms-initials"
                type="text"
                maxlength="10"
                placeholder="Enter Initials"
                value="${saved}"
                style="
                    width:100%;
                    padding:10px;
                    box-sizing:border-box;
                    border:none;
                    border-radius:8px;
                    margin-bottom:10px;
                "
            >

            <button
                id="cms-save"
                style="
                    width:100%;
                    border:none;
                    padding:10px;
                    border-radius:8px;
                    background:#00c853;
                    color:white;
                    font-weight:bold;
                    cursor:pointer;
                "
            >
                Save
            </button>
        `;

        document.body.appendChild(panel);

        document
            .getElementById('cms-save')
            .onclick = () => {

                const initials =
                    document
                        .getElementById('cms-initials')
                        .value
                        .trim()
                        .toUpperCase();

                if (!initials) {

                    toast(
                        'Initials Required',
                        '#f44336'
                    );

                    return;
                }

                localStorage.setItem(
                    INITIALS_KEY,
                    initials
                );

                panel.remove();

                toast(
                    '✓ Initials Saved'
                );
            };
    }

    function insertComment(type) {

        const textarea =
            document.querySelector(
                'textarea[name="comments"]'
            );

        if (!textarea) {

            toast(
                'Comments Field Not Found',
                '#f44336'
            );

            return;
        }

        const initials =
            localStorage.getItem(
                INITIALS_KEY
            );

        if (!initials) {

            openSettings();

            return;
        }

        let comment = '';

        if (type === 'eligible') {

            comment =
                `Reviewed. Eligible. IDR Initiation document attached - ${getPHDate()} - ${initials}`;

        } else if (type === 'noaction') {

            comment =
                `Reviewed, no action required. - ${getPHDate()} - ${initials}`;

        } else if (type === 'pcdate') {

            comment =
                `Reviewed, no action required. - ${getPCDate()} - ${initials}`;
        }

        const existing =
            textarea.value || '';

        if (
            existing
                .toLowerCase()
                .includes(comment.toLowerCase())
        ) {

            toast(
                '⚠ Duplicate Comment',
                '#f44336'
            );

            return;
        }

        const scrollTop =
            textarea.scrollTop;

        const selectionStart =
            textarea.selectionStart;

        const selectionEnd =
            textarea.selectionEnd;

        const newValue =
            existing.trim()
                ? comment + '\n\n' + existing
                : comment;

        textarea.value = newValue;

        textarea.dispatchEvent(
            new Event('input', {
                bubbles: true
            })
        );

        textarea.dispatchEvent(
            new Event('change', {
                bubbles: true
            })
        );

        requestAnimationFrame(() => {

            textarea.scrollTop =
                scrollTop;

            try {

                textarea.setSelectionRange(
                    selectionStart,
                    selectionEnd
                );

            } catch (e) {}
        });

        toast('✓ Comment Added');
    }

    document.addEventListener(
        'keydown',
        function (e) {

            // ALT + E
            if (
                e.altKey &&
                !e.ctrlKey &&
                !e.shiftKey &&
                e.key.toLowerCase() === 'e'
            ) {
                e.preventDefault();
                insertComment('eligible');
                return;
            }

            // ALT + R
            if (
                e.altKey &&
                !e.ctrlKey &&
                !e.shiftKey &&
                e.key.toLowerCase() === 'r'
            ) {
                e.preventDefault();
                insertComment('noaction');
                return;
            }

            // ALT + Q
            if (
                e.altKey &&
                !e.ctrlKey &&
                !e.shiftKey &&
                e.key.toLowerCase() === 'q'
            ) {
                e.preventDefault();
                insertComment('pcdate');
                return;
            }

            // ALT + I
            if (
                e.altKey &&
                !e.ctrlKey &&
                !e.shiftKey &&
                e.key.toLowerCase() === 'i'
            ) {
                e.preventDefault();
                openSettings();
                return;
            }

        },
        true
    );

    if (!localStorage.getItem(INITIALS_KEY)) {

        setTimeout(() => {
            openSettings();
        }, 500);

    }

    console.log('CMS AUTO COMMENT Loaded');

})();
