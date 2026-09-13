
(function () {

    /* ============================================================
       SELECTORS
       ============================================================ */

    const openerSelector =
        "#ngForm > fieldset > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > app-vob-history > div > div:nth-child(3) > div.small.text-muted.d-inline-flex.align-items-center.gap-1.user-select-none";

    const openContentSelector =
        "#ngForm > fieldset > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > app-vob-history > div > div:nth-child(3) > div.collapse.mt-1.small.show";

    const caseNotesSelector =
        "#ngForm > fieldset > div:nth-child(24) > div.collapse.show > div > div:nth-child(3) > div > div > table > tbody";

    const caseNotesButtonSelector =
        "#ngForm > fieldset > div:nth-child(24) > div.d-flex.mb-2 > button";

    /* Ineligibility Reasons textarea */
    const ineligibilityReasonsSelector =
        "#ngForm > fieldset > div:nth-child(15) > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(2) > textarea";

    /* State selector */
    const stateSelector =
        "#ngForm > fieldset > div:nth-child(15) > div:nth-child(3) > div.col-lg-6.justify-content-end.mb-4 > div:nth-child(1) > select";


    /* ============================================================
       VOB SECTION BUTTON
       ============================================================ */

    const vobSectionButtonSelector =
        "#ngForm > fieldset > div:nth-child(22) > div.d-flex.mb-2 > button";


    /* ============================================================
       FILES BUTTON
       ============================================================ */

    const filesButtonSelector =
        'button[title="Toggle the Files list"]';


    /* ============================================================
       NOTES BUTTON
       ============================================================ */

    const notesButtonSelector =
        'button[title="Toggle Notes section"]';


    /* ============================================================
       OPEN VOB SECTION
       ============================================================ */

    function openVobSection() {

        const vobSectionButton =
            document.querySelector(
                vobSectionButtonSelector
            );

        if (!vobSectionButton) {
            return;
        }

        const ariaExpanded =
            vobSectionButton.getAttribute(
                "aria-expanded"
            );

        if (ariaExpanded === "false") {

            vobSectionButton.click();

        }

        else if (ariaExpanded === null) {

            vobSectionButton.click();

        }

    }


    /* ============================================================
       OPEN FILES
       ============================================================ */

    function openFilesSection() {

        const filesBtn =
            document.querySelector(
                filesButtonSelector
            );

        if (!filesBtn) {
            return;
        }

        if (
            filesBtn.getAttribute(
                "aria-expanded"
            ) === "false"
        ) {

            filesBtn.click();

        }

    }


    /* ============================================================
       OPEN NOTES
       ============================================================ */

    function openNotesSection() {

        const notesBtn =
            document.querySelector(
                notesButtonSelector
            );

        if (!notesBtn) {
            return;
        }

        if (
            notesBtn.getAttribute(
                "aria-expanded"
            ) === "false"
        ) {

            notesBtn.click();

        }

    }


    /* ============================================================
       FIND VOB BUTTONS

       EXISTING VOB LOGIC PRESERVED
       ============================================================ */

    function findVobButtons() {

        return [
            ...document.querySelectorAll(
                "button.btn-modal"
            )
        ].filter(function (btn) {

            const title =
                (
                    btn.title ||
                    ""
                ).toLowerCase();

            const text =
                (
                    btn.textContent ||
                    ""
                ).toLowerCase();

            return (
                title.includes("view vob") ||
                text.includes("vob")
            );

        });

    }


    /* ============================================================
       FIND IDR FILES

       Exact bookmarklet logic:
       View proofofidrinitiation
       ============================================================ */

    function findIdrButtons() {

        return [
            ...document.querySelectorAll(
                'button.btn-modal[title="View proofofidrinitiation"]'
            )
        ];

    }


    /* ============================================================
       FIND INSURANCE CARD
       ============================================================ */

    function findInsuranceButtons() {

        return [
            ...document.querySelectorAll(
                'button.btn-modal[title="View insurancecard"]'
            )
        ];

    }


    /* ============================================================
       FIND FACE SHEET
       ============================================================ */

    function findFaceSheetButtons() {

        return [
            ...document.querySelectorAll(
                'button.btn-modal[title="View facesheet"]'
            )
        ];

    }


    /* ============================================================
       FIND EOB
       ============================================================ */

    function findEobButtons() {

        return [
            ...document.querySelectorAll(
                'button.btn-modal[title="View eob"]'
            )
        ];

    }


    /* ============================================================
       ESCAPE HTML
       ============================================================ */

    function escapeHtml(text) {

        return String(text)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* ============================================================
       GET BUTTON TITLE / TEXT
       ============================================================ */

    function getButtonText(btn) {

        return (
            btn.title ||
            btn.textContent ||
            btn.innerText ||
            ""
        )
            .trim()
            .replace(
                /\s+/g,
                " "
            );

    }


    /* ============================================================
       CREATE COMPACT DOCUMENT BUTTON

       UI UPDATED ONLY
       ============================================================ */

    function createDocumentButton(
        btn,
        label,
        icon,
        index,
        total,
        type
    ) {

        const buttonText =
            getButtonText(
                btn
            );


        let displayLabel =
            label;


        /*
         * Number documents only when there
         * are multiple of the same type.
         */

        if (total > 1) {

            displayLabel =
                label +
                " " +
                (index + 1);

        }


        return (

            '<button class="mainDocumentBtn" ' +

            'data-document-type="' +
            escapeHtml(
                type
            ) +
            '" ' +

            'data-document-index="' +
            index +
            '" ' +

            'style="' +

            "display:block;" +
            "width:100%;" +
            "box-sizing:border-box;" +
            "padding:7px 8px;" +
            "margin-bottom:4px;" +
            "background:#2563eb;" +
            "color:#fff;" +
            "border:none;" +
            "border-radius:5px;" +
            "cursor:pointer;" +
            "font-weight:600;" +
            "font-size:11px;" +
            "line-height:1.25;" +
            "text-align:left;" +
            "overflow:hidden;" +

            '">' +

            icon +
            " " +
            escapeHtml(
                displayLabel
            ) +

            (
                buttonText

                    ?

                    '<span style="' +

                    "float:right;" +
                    "color:#dbeafe;" +
                    "font-size:9px;" +
                    "margin-left:5px;" +
                    "max-width:45%;" +
                    "overflow:hidden;" +
                    "text-overflow:ellipsis;" +
                    "white-space:nowrap;" +

                    '">' +

                    escapeHtml(
                        buttonText
                    ) +

                    "</span>"

                    :

                    ""

            ) +

            "</button>"

        );

    }


    /* ============================================================
       CREATE DOCUMENT SECTION

       UI UPDATED ONLY
       ============================================================ */

    function createDocumentSection(
        title,
        icon,
        buttons,
        type,
        emptyText
    ) {

        let html = "";


        html +=

            '<div style="' +

            "margin-top:10px;" +
            "padding-top:8px;" +
            "border-top:1px solid rgba(156,163,175,.25);" +

            '">' +


            '<div style="' +

            "font-size:13px;" +
            "font-weight:700;" +
            "display:flex;" +
            "align-items:center;" +
            "gap:5px;" +
            "line-height:1.2;" +

            '">' +

            escapeHtml(
                title
            ) +

            '<span style="' +

            "font-size:9px;" +
            "color:#9ca3af;" +
            "font-weight:normal;" +

            '">' +

            "(" +
            buttons.length +
            ")" +

            "</span>" +

            "</div>" +


            '<div style="margin-top:5px;">';


        if (
            buttons.length
        ) {

            buttons.forEach(
                function (
                    btn,
                    index
                ) {

                    html +=
                        createDocumentButton(
                            btn,
                            title,
                            icon,
                            index,
                            buttons.length,
                            type
                        );

                }
            );

        } else {

            html +=

                '<div style="' +

                "margin-top:4px;" +
                "font-size:10px;" +
                "color:#ff6b6b;" +

                '">' +

                escapeHtml(
                    emptyText
                ) +

                "</div>";

        }


        html +=
            "</div></div>";


        return html;

    }


    /* ============================================================
       MAIN LOGIC
       ============================================================ */

    function runLogic() {

        /* ========================================================
           DOB
           ======================================================== */

        var dob =
            document.querySelector(
                "#DOB"
            );


        if (!dob) {

            alert(
                "DOB not found"
            );

            return;

        }


        var dobValue =
            dob.value ||
            dob.textContent ||
            dob.innerText;


        var dobDate =
            new Date(
                dobValue
            );


        if (isNaN(dobDate)) {

            alert(
                "Invalid DOB"
            );

            return;

        }


        /* ========================================================
           AGE
           ======================================================== */

        var today =
            new Date();


        var age =
            today.getFullYear() -
            dobDate.getFullYear();


        if (
            today.getMonth() <
                dobDate.getMonth() ||
            (
                today.getMonth() ===
                    dobDate.getMonth() &&
                today.getDate() <
                    dobDate.getDate()
            )
        ) {

            age--;

        }


        /* ========================================================
           PLAN TYPE
           ======================================================== */

        var planType =
            "Unknown";


        var plan =
            Array.from(
                document.querySelectorAll(
                    "select"
                )
            ).find(function (s) {

                return (
                    s.parentElement &&
                    s.parentElement.innerText.indexOf(
                        "Plan Type"
                    ) > -1
                );

            });


        if (plan) {

            planType =
                plan.options[
                    plan.selectedIndex
                ].text;

        }


        /* ========================================================
           STATE
           ======================================================== */

        var state =
            "Unknown";


        var stateElement =
            document.querySelector(
                stateSelector
            );


        if (stateElement) {

            state =
                stateElement.selectedOptions[0]?.text ||
                stateElement.value ||
                "Unknown";


            state =
                state.trim();

        }


        /* ========================================================
           BIFURCATED STATES
           ======================================================== */

        var bifurcatedStates = [

            "Alaska",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Illinois",
            "Maine",
            "Maryland",
            "Michigan",
            "Missouri",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "Ohio",
            "Texas",
            "Virginia",
            "Washington"

        ];


        var stateLower =
            state
                .toLowerCase()
                .trim();


        var isBifurcated =
            bifurcatedStates.some(
                function (
                    bifurcatedState
                ) {

                    return (
                        stateLower ===
                        bifurcatedState
                            .toLowerCase()
                            .trim()
                    );

                }
            );


        /* ========================================================
           STATE INDICATOR
           ======================================================== */

        var stateColor;

        if (isBifurcated) {

            stateColor =
                "#ff4d4f";

        } else {

            stateColor =
                "#2ecc71";

        }


        var stateStatus =
            isBifurcated
                ? "Bifurcated"
                : "Non-Bifurcated";


        /* ========================================================
           HISTORY TEXT
           ======================================================== */

        var historyText =
            "";


        document.querySelectorAll(

            "#ngForm > fieldset > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > app-vob-history > div > div:nth-child(3) > div.collapse.mt-1.small.show > div > div > div.d-flex.flex-wrap.gap-3.mb-1 > span:nth-child(1), #ngForm > fieldset > div:nth-child(5) > div:nth-child(1) > div:nth-child(2) > app-vob-history > div > div:nth-child(3) > div.collapse.mt-1.small.show > div > div > div.text-muted.fst-italic"

        ).forEach(
            function (e) {

                historyText +=
                    " " +
                    e.innerText;

            }
        );


        historyText =
            historyText.toLowerCase();


        /* ========================================================
           CASE NOTES TEXT
           ======================================================== */

        var caseNotesText =
            "";


        var caseNotesElement =
            document.querySelector(
                caseNotesSelector
            );


        if (caseNotesElement) {

            caseNotesText =
                caseNotesElement
                    .innerText
                    .toLowerCase();

        }


        /* ========================================================
           INELIGIBILITY REASONS
           ======================================================== */

        var ineligibilityReasonsText =
            "";


        var ineligibilityReasonsElement =
            document.querySelector(
                ineligibilityReasonsSelector
            );


        if (
            ineligibilityReasonsElement
        ) {

            ineligibilityReasonsText =
                ineligibilityReasonsElement.value ||
                ineligibilityReasonsElement.textContent ||
                "";


            ineligibilityReasonsText =
                ineligibilityReasonsText.trim();

        }


        /* ========================================================
           PT MATCH
           ======================================================== */

        var ptMatch =
            false;


        var historyEvidence =
            [];


        var caseNotesEvidence =
            [];


        /* ========================================================
           SELF FUNDED KEYWORDS
           ======================================================== */

        var selfFundedKeywords = [

            "N859",
            "RARC code N859 is present, indicating NSA jurisdiction",
            "self funded",
            "self-funded",
            "self insured",
            "self-insured",
            "unitedhealthcare choice plus",
            "united healthcare choice",
            "uhc choice plus",
            "ucqn",
            "umr",
            "boon chapman",
            "boon-chapman",
            "allied benefit systems",
            "oa managed choice pos",
            "aso",
            "erisa",
            "ERISA/Self Funded",
            "meritain",
            "oos",
            "uhss",
            "commercial plans can have tiers with self funded",
            "n859",
            "n860",
            "n862",
            "n863",
            "n864",
            "n865",
            "n866",
            "n869",
            "n870",
            "n874",
            "n875",
            "n876",
            "n877",
            "ma44",
            "n599",
            "n858",
            "n867",
            "n871",
            "n883"

        ];


        /* ========================================================
           PT EVIDENCE LOGIC
           ======================================================== */

        if (
            planType ===
                "Self Funded" ||
            planType ===
                "Self Funded (Opt Out)"
        ) {

            selfFundedKeywords.forEach(
                function (keyword) {

                    var search =
                        keyword.toLowerCase();


                    if (
                        historyText.indexOf(
                            search
                        ) > -1
                    ) {

                        ptMatch =
                            true;


                        if (
                            historyEvidence.indexOf(
                                keyword
                            ) === -1
                        ) {

                            historyEvidence.push(
                                keyword
                            );

                        }

                    }


                    if (
                        caseNotesText.indexOf(
                            search
                        ) > -1
                    ) {

                        ptMatch =
                            true;


                        if (
                            caseNotesEvidence.indexOf(
                                keyword
                            ) === -1
                        ) {

                            caseNotesEvidence.push(
                                keyword
                            );

                        }

                    }

                }
            );

        } else {

            var search =
                planType.toLowerCase();


            if (
                historyText.indexOf(
                    search
                ) > -1
            ) {

                ptMatch =
                    true;


                historyEvidence.push(
                    planType
                );

            }


            if (
                caseNotesText.indexOf(
                    search
                ) > -1
            ) {

                ptMatch =
                    true;


                caseNotesEvidence.push(
                    planType
                );

            }

        }


        /* ========================================================
           PT INDICATOR
           ======================================================== */

        var redPlanTypeKeywords = [

            "exchange/marketplace-state",
            "other",
            "unknown",
            "government",
            "state",
            "federal",
            "medicaid",
            "medicare"

        ];


        var planTypeLower =
            planType.toLowerCase();


        var isRedPlanType =
            redPlanTypeKeywords.some(
                function (keyword) {

                    return (
                        planTypeLower.indexOf(
                            keyword
                        ) > -1
                    );

                }
            );


        var ptColor;


        if (isRedPlanType) {

            ptColor =
                "#ff4d4f";

        } else if (ptMatch) {

            ptColor =
                "#2ecc71";

        } else {

            ptColor =
                "#f39c12";

        }


        /* ========================================================
           AGE INDICATOR
           ======================================================== */

        var ageColor =
            age >= 65
                ? "#ff4d4f"
                : "#2ecc71";


        /* ========================================================
           INELIGIBILITY INDICATOR
           ======================================================== */

        var ineligibilityColor =
            ineligibilityReasonsText
                ? "#2ecc71"
                : "#ff4d4f";


        /* ========================================================
           FIND VOB BUTTONS
           ======================================================== */

        var vobs =
            findVobButtons();


        /* ========================================================
           FIND DOCUMENT BUTTONS
           ======================================================== */

        var idrButtons =
            findIdrButtons();


        var insuranceButtons =
            findInsuranceButtons();


        var faceSheetButtons =
            findFaceSheetButtons();


        var eobButtons =
            findEobButtons();


        /* ========================================================
           REMOVE OLD POPUP
           ======================================================== */

        var old =
            document.getElementById(
                "agePopupBookmarklet"
            );


        if (old) {

            old.remove();

        }


        /* ========================================================
           CREATE POPUP

           UI ONLY:
           - Bottom-left
           - Transparent
           - Fits sidebar
           - No page overlay
           ======================================================== */

        var popup =
            document.createElement(
                "div"
            );


        popup.id =
            "agePopupBookmarklet";


        popup.style.cssText =

            "position:fixed;" +
            "left:0;" +
            "bottom:0;" +
            "top:auto;" +
            "transform:none;" +
            "background:transparent;" +
            "background-color:transparent;" +
            "color:#fff;" +
            "padding:8px 8px 10px 8px;" +
            "margin:0;" +
            "border-radius:0;" +
            "z-index:99999999;" +
            "font-family:Segoe UI,Arial,sans-serif;" +
            "box-shadow:none;" +
            "width:250px;" +
            "max-width:250px;" +
            "box-sizing:border-box;" +
            "max-height:45vh;" +
            "overflow-y:auto;" +
            "overflow-x:hidden;" +
            "scrollbar-width:thin;" +
            "scrollbar-color:rgba(156,163,175,.45) transparent;" +
            "pointer-events:auto;";


        /* ========================================================
           DOCUMENT HIERARCHY

           1. IDR FILE
           2. VOB
           3. INSURANCE CARD
           4. FACE SHEET
           5. EOB
           ======================================================== */


        /* ========================================================
           IDR FILE HTML
           ======================================================== */

        var idrHtml =
            createDocumentSection(
                "IDR FILE",
                "📄",
                idrButtons,
                "idr",
                "No IDR files found."
            );


        /* ========================================================
           VOB HTML

           EXISTING LOGIC
           UI COMPACTED ONLY
           ======================================================== */

        var vobHtml =
            "";


        vobHtml +=

            '<div style="' +

            "margin-top:10px;" +
            "padding-top:8px;" +
            "border-top:1px solid rgba(156,163,175,.25);" +

            '">' +


            '<div style="' +

            "font-size:13px;" +
            "font-weight:bold;" +
            "display:flex;" +
            "align-items:center;" +
            "gap:5px;" +

            '">' +

            "VOB" +

            '<span style="' +

            "font-size:9px;" +
            "color:#9ca3af;" +
            "font-weight:normal;" +

            '">' +

            "(" +
            vobs.length +
            " found)" +

            "</span>" +

            "</div>" +


            '<div style="margin-top:5px;">';


        if (
            vobs.length
        ) {

            vobs.forEach(
                function (
                    v,
                    i
                ) {

                    var vobTitle =
                        v.title ||
                        v.textContent ||
                        "View VOB";


                    vobHtml +=

                        '<button class="mainVobBtn" ' +

                        'data-vob-index="' +
                        i +
                        '" ' +

                        'style="' +

                        "display:block;" +
                        "width:100%;" +
                        "box-sizing:border-box;" +
                        "padding:7px 8px;" +
                        "margin-bottom:4px;" +
                        "background:#2563eb;" +
                        "color:#fff;" +
                        "border:none;" +
                        "border-radius:5px;" +
                        "cursor:pointer;" +
                        "font-weight:600;" +
                        "font-size:11px;" +
                        "line-height:1.25;" +
                        "text-align:left;" +
                        "overflow:hidden;" +

                        '">' +

                        "📄 VOB " +
                        (i + 1) +

                        '<span style="' +

                        "float:right;" +
                        "color:#dbeafe;" +
                        "font-size:9px;" +
                        "margin-left:5px;" +
                        "max-width:45%;" +
                        "overflow:hidden;" +
                        "text-overflow:ellipsis;" +
                        "white-space:nowrap;" +

                        '">' +

                        escapeHtml(
                            getButtonText(
                                v
                            )
                        ) +

                        "</span>" +

                        "</button>";

                }
            );

        } else {

            vobHtml +=

                '<div style="' +

                "margin-top:4px;" +
                "font-size:10px;" +
                "color:#ff6b6b;" +

                '">' +

                "No VOB files found." +

                "</div>";

        }


        vobHtml +=
            "</div></div>";


        /* ========================================================
           INSURANCE CARD HTML
           ======================================================== */

        var insuranceHtml =
            createDocumentSection(
                "Insurance Card",
                "🪪",
                insuranceButtons,
                "insurance",
                "No Insurance Card files found."
            );


        /* ========================================================
           FACE SHEET HTML
           ======================================================== */

        var faceSheetHtml =
            createDocumentSection(
                "Face Sheet",
                "👤",
                faceSheetButtons,
                "facesheet",
                "No Face Sheet files found."
            );


        /* ========================================================
           EOB HTML
           ======================================================== */

        var eobHtml =
            createDocumentSection(
                "EOB",
                "📋",
                eobButtons,
                "eob",
                "No EOB files found."
            );


        /* ========================================================
           POPUP HTML

           UI ONLY
           ======================================================== */

        popup.innerHTML =

            /* CLOSE */

            '<button class="mainCloseButton" style="' +

            "position:absolute;" +
            "top:2px;" +
            "right:4px;" +
            "width:20px;" +
            "height:20px;" +
            "padding:0;" +
            "background:rgba(0,0,0,.35);" +
            "border:none;" +
            "border-radius:50%;" +
            "color:#fff;" +
            "font-size:15px;" +
            "line-height:18px;" +
            "cursor:pointer;" +
            "z-index:2;" +

            '">×</button>' +


            /* ====================================================
               SUMMARY
               ==================================================== */

            '<div style="' +

            "padding-right:18px;" +
            "font-size:15px;" +
            "font-weight:bold;" +
            "line-height:1.25;" +

            '">' +

            "Eligibility" +

            "</div>" +


            /* ====================================================
               AGE
               ==================================================== */

            '<div style="' +

            "margin-top:6px;" +
            "font-size:12px;" +
            "font-weight:bold;" +
            "display:flex;" +
            "align-items:center;" +
            "gap:6px;" +
            "line-height:1.3;" +

            '">' +

            "AGE: " +

            age +

            '<span style="' +

            "width:9px;" +
            "height:9px;" +
            "border-radius:50%;" +
            "background:" +
            ageColor +
            ";" +
            "display:inline-block;" +

            '"></span>' +

            "</div>" +


            /* ====================================================
               PT
               ==================================================== */

            '<div style="' +

            "margin-top:4px;" +
            "font-size:12px;" +
            "font-weight:bold;" +
            "display:flex;" +
            "align-items:center;" +
            "gap:6px;" +
            "line-height:1.3;" +

            '">' +

            "PT: " +

            '<span style="' +

            "font-weight:500;" +
            "overflow:hidden;" +
            "text-overflow:ellipsis;" +
            "white-space:nowrap;" +
            "max-width:185px;" +

            '">' +

            escapeHtml(
                planType
            ) +

            "</span>" +

            '<span style="' +

            "width:9px;" +
            "height:9px;" +
            "border-radius:50%;" +
            "background:" +
            ptColor +
            ";" +
            "display:inline-block;" +
            "flex-shrink:0;" +

            '"></span>' +

            "</div>" +


            /* ====================================================
               HISTORY EVIDENCE
               ==================================================== */

            (

                historyEvidence.length

                    ?

                    '<div style="' +

                    "margin-top:5px;" +
                    "font-size:10px;" +
                    "color:#90ee90;" +
                    "line-height:1.3;" +
                    "word-break:break-word;" +

                    '">' +

                    '<strong style="color:#ffffff;">' +

                    "History:" +

                    "</strong> " +

                    historyEvidence
                        .map(
                            escapeHtml
                        )
                        .join(
                            ", "
                        ) +

                    "</div>"

                    :

                    ""

            ) +


            /* ====================================================
               CASE NOTES
               ==================================================== */

            (

                caseNotesEvidence.length

                    ?

                    '<div style="' +

                    "margin-top:4px;" +
                    "font-size:10px;" +
                    "color:#90ee90;" +
                    "line-height:1.3;" +
                    "word-break:break-word;" +

                    '">' +

                    '<strong style="color:#ffffff;">' +

                    "Case Notes:" +

                    "</strong> " +

                    caseNotesEvidence
                        .map(
                            escapeHtml
                        )
                        .join(
                            ", "
                        ) +

                    "</div>"

                    :

                    ""

            ) +


            /* ====================================================
               INELIGIBILITY
               ==================================================== */

            '<div style="' +

            "margin-top:7px;" +
            "font-size:11px;" +
            "font-weight:bold;" +
            "display:flex;" +
            "align-items:center;" +
            "gap:6px;" +
            "line-height:1.3;" +

            '">' +

            "Ineligibility Reasons:" +

            '<span style="' +

            "width:9px;" +
            "height:9px;" +
            "border-radius:50%;" +
            "background:" +
            ineligibilityColor +
            ";" +
            "display:inline-block;" +

            '"></span>' +

            "</div>" +


            (

                ineligibilityReasonsText

                    ?

                    '<div style="' +

                    "margin-top:4px;" +
                    "font-size:10px;" +
                    "color:#90ee90;" +
                    "white-space:pre-wrap;" +
                    "word-break:break-word;" +
                    "line-height:1.3;" +

                    '">' +

                    escapeHtml(
                        ineligibilityReasonsText
                    ) +

                    "</div>"

                    :

                    '<div style="' +

                    "margin-top:3px;" +
                    "font-size:10px;" +
                    "color:#ff6b6b;" +

                    '">' +

                    "No evidence found / textarea is empty." +

                    "</div>"

            ) +


            /* ====================================================
               STATE
               ==================================================== */

            '<div style="' +

            "margin-top:7px;" +
            "font-size:12px;" +
            "font-weight:bold;" +
            "display:flex;" +
            "align-items:center;" +
            "gap:6px;" +

            '">' +

            "STATE:" +

            '<span style="' +

            "font-weight:500;" +
            "overflow:hidden;" +
            "text-overflow:ellipsis;" +
            "white-space:nowrap;" +
            "max-width:175px;" +

            '">' +

            escapeHtml(
                state
            ) +

            "</span>" +

            '<span style="' +

            "width:9px;" +
            "height:9px;" +
            "border-radius:50%;" +
            "background:" +
            stateColor +
            ";" +
            "display:inline-block;" +
            "flex-shrink:0;" +

            '"></span>' +

            "</div>" +


            '<div style="' +

            "margin-top:2px;" +
            "font-size:9px;" +
            "color:#9ca3af;" +

            '">' +

            stateStatus +

            "</div>" +


            /* ====================================================
               1. IDR FILE
               ==================================================== */

            idrHtml +


            /* ====================================================
               2. VOB
               ==================================================== */

            vobHtml +


            /* ====================================================
               3. INSURANCE CARD
               ==================================================== */

            insuranceHtml +


            /* ====================================================
               4. FACE SHEET
               ==================================================== */

            faceSheetHtml +


            /* ====================================================
               5. EOB
               ==================================================== */

            eobHtml;


        /* ========================================================
           ADD POPUP
           ======================================================== */

        document.body.appendChild(
            popup
        );


        /* ========================================================
           CLOSE BUTTON
           ======================================================== */

        var closeButton =
            popup.querySelector(
                ".mainCloseButton"
            );


        if (closeButton) {

            closeButton.onclick =
                function () {

                    popup.remove();

                };

        }


        /* ========================================================
           VOB BUTTON EVENTS

           EXISTING BEHAVIOR PRESERVED:

           - Remove popup
           - Wait 100ms
           - Click original VOB button
           - NO SCROLL
           ======================================================== */

        popup
            .querySelectorAll(
                ".mainVobBtn"
            )
            .forEach(
                function (btn) {

                    btn.onclick =
                        function () {

                            var index =
                                parseInt(
                                    btn.getAttribute(
                                        "data-vob-index"
                                    ),
                                    10
                                );


                            var v =
                                vobs[index];


                            if (v) {

                                popup.remove();


                                setTimeout(
                                    function () {

                                        v.click();

                                    },
                                    100
                                );

                            }

                        };

                }
            );


        /* ========================================================
           OTHER DOCUMENT BUTTON EVENTS

           IDR
           INSURANCE CARD
           FACE SHEET
           EOB

           Same behavior.
           No scrolling.
           ======================================================== */

        popup
            .querySelectorAll(
                ".mainDocumentBtn"
            )
            .forEach(
                function (btn) {

                    btn.onclick =
                        function () {

                            var type =
                                btn.getAttribute(
                                    "data-document-type"
                                );


                            var index =
                                parseInt(
                                    btn.getAttribute(
                                        "data-document-index"
                                    ),
                                    10
                                );


                            var originalButton =
                                null;


                            /*
                             * Find the corresponding original
                             * button based on document type.
                             */

                            if (
                                type === "idr"
                            ) {

                                originalButton =
                                    idrButtons[index];

                            }

                            else if (
                                type === "insurance"
                            ) {

                                originalButton =
                                    insuranceButtons[index];

                            }

                            else if (
                                type === "facesheet"
                            ) {

                                originalButton =
                                    faceSheetButtons[index];

                            }

                            else if (
                                type === "eob"
                            ) {

                                originalButton =
                                    eobButtons[index];

                            }


                            if (
                                originalButton
                            ) {

                                /*
                                 * Remove popup first.
                                 */

                                popup.remove();


                                /*
                                 * Do not scroll.
                                 */

                                setTimeout(
                                    function () {

                                        originalButton.click();

                                    },
                                    100
                                );

                            }

                        };

                }
            );


        /* ========================================================
           AUTO CLOSE AFTER 10 SECONDS

           EXISTING TIMING PRESERVED
           ======================================================== */

        setTimeout(
            function () {

                var p =
                    document.getElementById(
                        "agePopupBookmarklet"
                    );


                if (p) {

                    p.remove();

                }

            },
            30000
        );

    }


    /* ============================================================
       CHECK HISTORY
       ============================================================ */

    const historyIsOpen =
        document.querySelector(
            openContentSelector
        );


    /* ============================================================
       CHECK CASE NOTES
       ============================================================ */

    const caseNotesIsOpen =
        document.querySelector(
            caseNotesSelector
        );


    /* ============================================================
       FIND HISTORY BUTTON
       ============================================================ */

    const historyButton =
        document.querySelector(
            openerSelector
        );


    /* ============================================================
       FIND CASE NOTES BUTTON
       ============================================================ */

    const caseNotesButton =
        document.querySelector(
            caseNotesButtonSelector
        );


    /* ============================================================
       OPEN HISTORY
       ============================================================ */

    if (
        !historyIsOpen &&
        historyButton
    ) {

        /*
         * No scrolling.
         */

        historyButton.click();

    }


    /* ============================================================
       OPEN CASE NOTES
       ============================================================ */

    if (
        !caseNotesIsOpen &&
        caseNotesButton
    ) {

        /*
         * No scrolling.
         */

        caseNotesButton.click();

    }


    /* ============================================================
       OPEN VOB SECTION
       ============================================================ */

    openVobSection();


    /* ============================================================
       OPEN FILES
       ============================================================ */

    openFilesSection();


    /* ============================================================
       OPEN NOTES
       ============================================================ */

    openNotesSection();


    /* ============================================================
       RUN MAIN LOGIC
       ============================================================ */

    setTimeout(
        function () {

            runLogic();

        },
        500
    );

})();
