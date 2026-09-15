
(function () {

    const USER_KEY = "fpy_username";
    const ACCESS_KEY = "fpy_key";

    function startMainCode() {

        // =================================================
        // YOUR EXISTING CODE GOES HERE
        // =================================================










(function () {

    runScript();

    function runScript() {

        const el =
            document.querySelector('#ngForm > fieldset > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > textarea') ||
            document.querySelector('#ngForm > fieldset > div:nth-child(1) > div:nth-child(1) > div:nth-child(7) > textarea');

        if (!el) {
            alert('Textarea not found');
            return;
        }

        const comments = [
            'VOB verified, no change to NSA jurisdiction',
            'Completed: VOB verified. Dispute status is closed. Payment determination is uploaded.',
            'Ineligible to Submit: Case was withdrawn by HaloMD.',
            'Ineligible to Submit: Case (Ineligibility reason)',
            'Ineligible to Submit: Government Plan.',
            'Ineligible to Submit: Patient is not over 65 years old, Insurance Type is Medicaid.',
            'Ineligible to Submit: Patient is over 65 years old. Primary Payer: Medicare.',
            'Ineligible to Submit: Ineligible Plan.',
            'Ineligible to Submit: Provider is in-Network.',
            'Ineligible to Submit: State Arbitration.',
            'Ineligible to Submit: Self Pay Plan type.',
            'Ineligible to Submit: Plan type did not match.',
            'Ineligible to Submit: State-based marketplace-State.',
            'Ineligible to Submit: Self-Funded Opt - In.',
            'Ineligible to Submit:Unable to find withdrawn email.',
            'Ineligible to Submit: Case (Unable to find evidence for INN)',
            'Ineligible to Submit: DRS: Closure Request Submitted. Closure team has already received a closure request.',
            'Pending Onshore Review: Dispute Status Closed. Patient over 65 years old, VOB is not available. Final payment determination uploaded.',
            'Pending Onshore Review: Incomplete ING evidence.',
            'Dispute is Pending:  Incomplete eligible evidence as per onshore outdated VOB.',
            'Pending Onshore Review: Unable to update the dispute tracker c/o Lillian Madison.',
            'Pending Onshore Review: Plan type is Self funded, Policy Type is Medicaid.',
            'Dispute is pending VOB: No VOB checkmark AND no case notes confirming plan type.',
            'Dispute is Pending:  Incomplete eligible evidence.',
            'Dispute is pending VOB: The patient is over 65 years old. Unable to determine primary payer - VOB is not available.',
            'Dispute is pending VOB: Technical Error.',
            'Dispute is pending VOB: 100% of billed charges went to PR indicated in Ineligibility reason in Arbit.',
            'Dispute is Pending: No Plan Type Indicated in Arbit.',
            'Resubmission: CPT codes submitted for resubmission noted in case comments. Awaiting verification.',
            'Resubmission: CPT codes deleted for resubmission.Resubmitted dispute number available.'
        ];

        const oldPopup = document.getElementById('aldCommentPopup');

        if (oldPopup) {
            oldPopup.remove();
        }

        const popup = document.createElement('div');

        popup.id = 'aldCommentPopup';

        popup.style.cssText =
            'position:fixed;' +
            'top:50%;' +
            'left:50%;' +
            'transform:translate(-50%,-50%);' +
            'width:1100px;' +
            'max-width:95vw;' +
            'max-height:85vh;' +
            'overflow:auto;' +
            'background:#ffffff;' +
            'border:4px solid #333;' +
            'padding:15px;' +
            'z-index:999999;' +
            'font-family:Arial,sans-serif;' +
            'border-radius:10px;' +
            'box-shadow:0 0 25px rgba(0,0,0,.5);';

        popup.innerHTML =
            '<div style="font-size:26px;font-weight:900;color:#000;text-align:center;margin-bottom:15px;">VOB COMMENTS</div>';

        const initialsWrap = document.createElement('div');

        initialsWrap.style.cssText =
            'position:absolute;' +
            'top:10px;' +
            'left:10px;' +
            'display:flex;' +
            'align-items:center;' +
            'gap:5px;';

        const initialsInput = document.createElement('input');

        initialsInput.type = 'text';
        initialsInput.placeholder = 'Initials';
        initialsInput.maxLength = 10;
        initialsInput.value =
            localStorage.getItem('vobCommentInitials') || 'ALD';

        initialsInput.style.cssText =
            'width:80px;' +
            'padding:6px;' +
            'border:1px solid #333;' +
            'border-radius:4px;' +
            'font-weight:bold;' +
            'text-transform:uppercase;';

        const saveBtn = document.createElement('button');

        saveBtn.textContent = 'Save';

        saveBtn.style.cssText =
            'padding:6px 10px;' +
            'background:#1976d2;' +
            'color:#fff;' +
            'border:none;' +
            'border-radius:4px;' +
            'cursor:pointer;' +
            'font-weight:bold;';

        saveBtn.onclick = function () {

            const val = initialsInput.value
                .trim()
                .toUpperCase();

            if (!val) {
                alert('Enter initials first.');
                return;
            }

            localStorage.setItem(
                'vobCommentInitials',
                val
            );

            alert('Initials saved: ' + val);
        };

        initialsWrap.appendChild(initialsInput);
        initialsWrap.appendChild(saveBtn);

        popup.appendChild(initialsWrap);

        // Specific AppID checkbox - default unchecked
        const appIdWrap = document.createElement('div');

        appIdWrap.style.cssText =
            'position:absolute;' +
            'top:10px;' +
            'right:60px;' +
            'display:flex;' +
            'align-items:center;' +
            'gap:6px;' +
            'background:#fff;' +
            'padding:4px 6px;' +
            'border-radius:4px;' +
            'font-family:Arial,sans-serif;' +
            'font-size:14px;' +
            'font-weight:900;' +
            'color:#000;';

        const appIdCheckbox = document.createElement('input');

        appIdCheckbox.type = 'checkbox';
        appIdCheckbox.id = 'specificAppIdCheckbox';
        appIdCheckbox.checked = false;

        appIdCheckbox.style.cssText =
            'margin:0;' +
            'width:16px;' +
            'height:16px;' +
            'cursor:pointer;';

        const appIdLabel = document.createElement('label');

        appIdLabel.htmlFor = 'specificAppIdCheckbox';
        appIdLabel.textContent = 'Specific AppID';
        appIdLabel.style.cssText =
            'cursor:pointer;' +
            'user-select:none;';

        appIdWrap.appendChild(appIdCheckbox);
        appIdWrap.appendChild(appIdLabel);

        popup.appendChild(appIdWrap);

        const topClose = document.createElement('button');

        topClose.textContent = '✕';

        topClose.style.cssText =
            'position:absolute;' +
            'top:10px;' +
            'right:10px;' +
            'width:40px;' +
            'height:40px;' +
            'background:#333;' +
            'color:#fff;' +
            'font-weight:900;' +
            'font-size:22px;' +
            'border:none;' +
            'border-radius:6px;' +
            'cursor:pointer;';

        topClose.onclick = function () {
            popup.remove();
        };

        popup.appendChild(topClose);

        comments.forEach(txt => {
            const btn = document.createElement('button');

            let bg = '#f0f0f0';

            if (txt.startsWith('Ineligible to Submit:')) {
                bg = '#ff8080';
            } else if (
                txt.startsWith('Dispute is pending VOB:') ||
                txt === 'Dispute is Pending: No Plan Type Indicated in Arbit.'
            ) {
                bg = '#fff176';
            } else if (txt.startsWith('Pending Onshore Review:')) {
                bg = '#ffb6e6';
            }

            btn.style.cssText =
                'display:block;' +
                'width:100%;' +
                'text-align:left;' +
                'margin:4px 0;' +
                'padding:10px;' +
                'border:2px solid #666;' +
                'border-radius:6px;' +
                'background:' + bg + ';' +
                'cursor:pointer;' +
                'font-weight:900;' +
                'color:#000000;' +
                'font-size:16px;' +
                'line-height:1.4;';

            btn.textContent = txt;

            btn.onclick = function () {

                let finalComment = txt;

                if (txt === 'Ineligible to Submit: Case (Ineligibility reason)') {

                    const reason = prompt(
                        'Enter the Ineligibility reason:',
                        ''
                    );

                    if (reason === null) {
                        return;
                    }

                    if (reason.trim() === '') {
                        return;
                    }

                    finalComment =
                        'Ineligible to Submit: Case (' +
                        reason.trim() +
                        ')';
                }

                const existingText = el.value || '';

                if (existingText.includes(finalComment)) {

                    const proceed = confirm(
                        'WARNING:\n\n' +
                        'This comment already exists in the comment box.\n\n' +
                        'Do you want to proceed anyway?'
                    );

                    if (!proceed) {
                        return;
                    }
                }

                // Ask for AppID only when Specific AppID is checked
                let appIdText = '';

                if (appIdCheckbox.checked) {

                    const appId = prompt(
                        'Enter the AppID:',
                        ''
                    );

                    if (appId === null) {
                        return;
                    }

                    if (appId.trim() === '') {
                        return;
                    }

                    appIdText = '(APPID ' + appId.trim() + ') ';
                }

                const d = new Date();

                const mm = String(
                    d.getMonth() + 1
                ).padStart(2, '0');

                const dd = String(
                    d.getDate()
                ).padStart(2, '0');

                const yy = String(
                    d.getFullYear()
                ).slice(-2);

                const initials =
                    (
                        localStorage.getItem('vobCommentInitials') ||
                        'ALD'
                    )
                    .trim()
                    .toUpperCase();

                const note =
                    `${mm}/${dd}/${yy} ${appIdText}${finalComment} - ${initials}`;

                el.value =
                    note +
                    (
                        el.value.trim()
                            ? '\n\n' + el.value
                            : ''
                    );

                el.dispatchEvent(
                    new Event(
                        'input',
                        { bubbles: true }
                    )
                );

                el.dispatchEvent(
                    new Event(
                        'change',
                        { bubbles: true }
                    )
                );

                popup.remove();
            };

            btn.onmouseover = function () {
                this.style.filter = 'brightness(95%)';
            };

            btn.onmouseout = function () {
                this.style.filter = 'brightness(100%)';
            };

            popup.appendChild(btn);
        });

        const close = document.createElement('button');

        close.textContent = 'CLOSE';

        close.style.cssText =
            'margin-top:10px;' +
            'padding:10px 25px;' +
            'background:#333;' +
            'color:#fff;' +
            'font-weight:900;' +
            'font-size:15px;' +
            'border:none;' +
            'border-radius:6px;' +
            'cursor:pointer;';

        close.onclick = function () {
            popup.remove();
        };

        popup.appendChild(close);

        document.body.appendChild(popup);
    }

})();






        // =================================================
        // END YOUR EXISTING CODE
        // =================================================
    }


    // =====================================================
    // STRICT AUTH CHECK
    // =====================================================

    const username =
        localStorage.getItem(USER_KEY);

    const accessKey =
        localStorage.getItem(ACCESS_KEY);


    // REGISTERED
    if (username && accessKey) {

        startMainCode();

        return;
    }


    // =====================================================
    // NOT REGISTERED → STOP EVERYTHING
    // =====================================================

    if (document.getElementById("fpy-auth-overlay")) {
        return;
    }


    const overlay =
        document.createElement("div");

    overlay.id =
        "fpy-auth-overlay";


    overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.75);
        z-index:9999999999;
        display:flex;
        justify-content:center;
        align-items:flex-start;
        padding-top:60px;
    `;


    overlay.innerHTML = `
        <div style="
            width:420px;
            max-width:90vw;
            background:#1f1f1f;
            border-radius:22px;
            padding:25px;
            box-sizing:border-box;
            box-shadow:0 20px 60px rgba(0,0,0,.5);
            position:relative;
        ">

            <button id="fpy-close-btn" style="
                position:absolute;
                right:12px;
                top:12px;
                width:32px;
                height:32px;
                border:none;
                border-radius:50%;
                cursor:pointer;
                color:white;
                background:rgba(255,255,255,.08);
            ">✕</button>

            <div style="
                font-size:40px;
                text-align:center;
                margin-bottom:10px;
            ">🔐</div>

            <h2 style="
                color:white;
                text-align:center;
                margin:0 0 5px;
            ">
                Automation Access
            </h2>

            <div style="
                color:#aaa;
                text-align:center;
                margin-bottom:20px;
                font-size:13px;
            ">
                One-time registration only
            </div>

            <input
                id="fpy-username"
                placeholder="Username"
                style="
                    width:100%;
                    padding:14px 16px;
                    margin-bottom:15px;
                    border-radius:999px;
                    border:1px solid rgba(255,255,255,.15);
                    background:rgba(255,255,255,.08);
                    color:white;
                    box-sizing:border-box;
                "
            >

            <input
                id="fpy-accesskey"
                type="password"
                placeholder="Access Key"
                style="
                    width:100%;
                    padding:14px 16px;
                    margin-bottom:15px;
                    border-radius:999px;
                    border:1px solid rgba(255,255,255,.15);
                    background:rgba(255,255,255,.08);
                    color:white;
                    box-sizing:border-box;
                "
            >

            <button
                id="fpy-save-btn"
                style="
                    width:100%;
                    border:none;
                    border-radius:999px;
                    padding:14px;
                    cursor:pointer;
                    color:white;
                    font-weight:bold;
                    background:linear-gradient(
                        135deg,
                        #0078d4,
                        #00a2ff
                    );
                "
            >
                Save & Continue
            </button>

        </div>
    `;


    document.body.appendChild(overlay);


    // Close = stay blocked
    overlay
        .querySelector("#fpy-close-btn")
        .onclick = function () {

            overlay.remove();

            // IMPORTANT:
            // Main code still does NOT run.

        };


    // Save registration
    overlay
        .querySelector("#fpy-save-btn")
        .onclick = function () {

            const newUsername =
                overlay
                    .querySelector("#fpy-username")
                    .value
                    .trim();

            const newAccessKey =
                overlay
                    .querySelector("#fpy-accesskey")
                    .value
                    .trim();


            if (!newUsername || !newAccessKey) {

                alert(
                    "Username and Access Key are required."
                );

                return;
            }


            localStorage.setItem(
                USER_KEY,
                newUsername
            );


            localStorage.setItem(
                ACCESS_KEY,
                newAccessKey
            );


            overlay.remove();


            // NO reload.
            // Start the previously blocked code now.

            startMainCode();

        };

})();
