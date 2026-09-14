(async()=>{

/* =========================================================
   DISPUTE USER NAME + PROCESSOR NAME
   ========================================================= */

const KEY="disputeUserName";
const PROCESSOR_KEY="processorName";

const getName=()=>{
    try{
        return(localStorage.getItem(KEY)||"").trim();
    }catch(e){
        return"";
    }
};

const saveName=n=>{
    try{
        localStorage.setItem(KEY,n);
        return true;
    }catch(e){
        console.error(e);
        return false;
    }
};

const getProcessorName=()=>{
    try{
        return(localStorage.getItem(PROCESSOR_KEY)||"").trim();
    }catch(e){
        return"";
    }
};

const saveProcessorName=n=>{
    try{
        localStorage.setItem(PROCESSOR_KEY,n);
        return true;
    }catch(e){
        console.error(e);
        return false;
    }
};

const getPHDate=()=>{

    const phDate=
        new Date(
            new Date().toLocaleString(
                "en-US",
                {
                    timeZone:"Asia/Manila"
                }
            )
        );

    return `${
        phDate.getMonth()+1
    }/${
        phDate.getDate()
    }/${
        phDate.getFullYear()
    }`;

};


/* =========================================================
   NORMALIZE
   ========================================================= */

const normalizeValue=value=>{

    return String(value??"")
        .replace(/\u00A0/g," ")
        .replace(/\r?\n/g," ")
        .replace(/\s+/g," ")
        .trim()
        .toLowerCase();

};


/* =========================================================
   GET DISPUTE NUMBER
   ========================================================= */

const disputeNumber=
    document.querySelector(
        "#ngForm fieldset > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > input"
    )?.value?.trim()||"";


/* =========================================================
   GET DISPUTE STATUS
   ========================================================= */

const disputeStatusElement=
    document.querySelector(
        "#ngForm fieldset > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > ng-select"
    );

const disputeStatus=
    disputeStatusElement
        ?.querySelector(".ng-value-label")
        ?.textContent
        ?.trim()
    ||
    disputeStatusElement
        ?.querySelector(".ng-value")
        ?.textContent
        ?.trim()
    ||
    disputeStatusElement
        ?.textContent
        ?.trim()
    ||
    "";


/* =========================================================
   GET COLUMN J SOURCE
   ========================================================= */

const columnJElement=
    document.querySelector(
        "#ngForm > fieldset > div > div:nth-child(1) > div:nth-child(2) > ng-select"
    );

const columnJValue=
    columnJElement
        ?.querySelector(".ng-value-label")
        ?.textContent
        ?.trim()
    ||
    columnJElement
        ?.querySelector(".ng-value")
        ?.textContent
        ?.trim()
    ||
    columnJElement
        ?.textContent
        ?.trim()
    ||
    "";


/* =========================================================
   GET PAGE K VALUE
   ========================================================= */

const columnKPageElement=
    document.querySelector(
        "#ngForm > fieldset > div > div:nth-child(1) > div:nth-child(4) > ng-select"
    );

const columnKPageValue=
    columnKPageElement
        ?.querySelector(".ng-value-label")
        ?.textContent
        ?.trim()
    ||
    columnKPageElement
        ?.querySelector(".ng-value")
        ?.textContent
        ?.trim()
    ||
    columnKPageElement
        ?.textContent
        ?.trim()
    ||
    "";


/* =========================================================
   GET IDS
   ========================================================= */

const arbitIdLinks=[
    ...document.querySelectorAll(
        'a[title="Open Arbit"][href*="calculator/"]'
    )
];

const ids=[
    ...arbitIdLinks
]
.map(link=>{

    const td=
        link.closest("td");

    const value=
        (
            link.textContent||
            td?.textContent||
            ""
        )
        .replace(/\u00A0/g," ")
        .replace(/\r?\n/g," ")
        .replace(/\s+/g," ")
        .trim();

    return value;

})
.filter(Boolean);


/* =========================================================
   GET ALL ARBIT / APP ID LINKS
   ========================================================= */

const arbitLinks=[
    ...document.querySelectorAll(
        'a[title="Open Arbit"][href*="calculator/"]'
    )
]
.map((link,index)=>{

    const td=
        link.closest("td");

    const id=
        (
            link.textContent||
            td?.textContent||
            ""
        )
        .replace(/\u00A0/g," ")
        .replace(/\r?\n/g," ")
        .replace(/\s+/g," ")
        .trim()
        ||
        ids[index]
        ||
        "";

    return{
        id:id,
        href:link.href,
        index:index
    };

})
.filter(item=>item.id && item.href);


/* =========================================================
   REMOVE DUPLICATE APP / ARBIT LINKS
   ========================================================= */

const uniqueArbitLinks=[];
const seenArbitLinks=new Set();

for(const item of arbitLinks){

    const key=
        `${item.id}|||${item.href}`;

    if(seenArbitLinks.has(key))
        continue;

    seenArbitLinks.add(key);

    uniqueArbitLinks.push(item);

}


/* =========================================================
   GET PLAN TYPES
   ========================================================= */

const planTypes=[
    ...document.querySelectorAll(
        '[id^="planType_"]'
    )
]
.map(el=>
    (
        el.innerText||
        el.textContent||
        el.value||
        ""
    )
    .replace(/\u00A0/g," ")
    .replace(/\r?\n/g," ")
    .replace(/\s+/g," ")
    .trim()
)
.filter(Boolean);


/* =========================================================
   GET FIRST ARBIT ID NUMBER
   ========================================================= */

const arbitIdNumber =
    document.querySelector(
        'a[title="Open Arbit"][href*="calculator/"]'
    )?.textContent
        ?.replace(/\u00A0/g," ")
        .replace(/\r?\n/g," ")
        .replace(/\s+/g," ")
        .trim() || "";


/* =========================================================
   VALIDATION
   ========================================================= */

if(
    !disputeNumber||
    !disputeStatus||
    !ids.length
){

    console.error(
        "Missing required page data.",
        {
            disputeNumber,
            disputeStatus,
            ids,
            arbitLinks
        }
    );

    alert(
        "Unable to continue.\n\n"+
        "Missing Dispute Number, Dispute Status, or IDs."
    );

    return;
}


/* =========================================================
   DEBUG
   ========================================================= */

console.log(
    "========================================"
);

console.log(
    "DISPUTE AUTO FILL STARTED"
);

console.log(
    "Dispute Number:",
    disputeNumber
);

console.log(
    "Dispute Status:",
    disputeStatus
);

console.log(
    "Page Column J source:",
    columnJValue
);

console.log(
    "Page K value:",
    columnKPageValue
);

console.log(
    "ARBIT ID:",
    arbitIdNumber
);

console.log(
    "IDS FOUND FROM OPEN ARBIT LINKS:",
    ids
);

console.log(
    "ARBIT / APP LINKS:",
    uniqueArbitLinks
);

console.log(
    "Plan Types:",
    planTypes
);

console.log(
    "========================================"
);


/* =========================================================
   SAME ID
   ========================================================= */

const sameId=
    ids.every(id=>id===ids[0]);


/* =========================================================
   PLAN TYPE
   ========================================================= */

const getPlanType=i=>{

    return(
        planTypes[i]||
        planTypes[0]||
        ""
    ).trim();

};


/* =========================================================
   COLUMN R / NOTES RULE
   ========================================================= */

const getColumnRValue=(actualG,actualL)=>{

    const g=normalizeValue(actualG);
    const l=normalizeValue(actualL);

    console.log(
        "========================================"
    );

    console.log(
        "R / NOTES RULE CHECK"
    );

    console.log(
        "G / Dispute Review Status:",
        actualG
    );

    console.log(
        "Normalized G:",
        g
    );

    console.log(
        "L / Dispute Status:",
        actualL
    );

    console.log(
        "Normalized L:",
        l
    );


    if(
        l==="closed"||
        l.includes("closed")
    ){

        console.log(
            "R RULE MATCH: L = CLOSED"
        );

        return(
            "Completed. Dispute is Closed Due to Receiving Payment Determination."
        );

    }


    if(
        g.includes(
            "plan type validated post idr initiation"
        )
    ){

        console.log(
            "R RULE MATCH: PLAN TYPE VALIDATED"
        );

        return(
            "VOB verified, Plan Type Validated Post IDR Initiation – Eligible (Federal NSA)."
        );

    }


    if(
        g.includes(
            "plan type objection submitted"
        )
    ){

        console.log(
            "R RULE MATCH: PLAN TYPE OBJECTION SUBMITTED"
        );

        return(
            "Already completed by Onshore."
        );

    }


    if(
        g.includes(
            "timeline enforcement submitted to idre"
        )
    ){

        console.log(
            "R RULE MATCH: TIMELINE ENFORCEMENT SUBMITTED TO IDRE"
        );

        return(
            "Already completed by Onshore."
        );

    }


    if(
        g.includes(
            "additional info provided to idre through email"
        )
    ){

        console.log(
            "R RULE MATCH: ADDITIONAL INFO EMAIL"
        );

        return(
            "VOB verified, evidence uploaded, Additional info requested, Arbit updated."
        );

    }


    if(
        g.includes(
            "additional info provided to idre through portal"
        )
    ){

        console.log(
            "R RULE MATCH: ADDITIONAL INFO PORTAL"
        );

        return(
            "VOB verified, evidence uploaded, Additional info requested, Arbit updated."
        );

    }


    console.warn(
        "NO G/L -> R RULE MATCHED",
        {
            disputeReviewStatus:actualG,
            disputeStatus:actualL
        }
    );

    return"";

};


/* =========================================================
   CLIPBOARD
   ========================================================= */

const copyText=async text=>{

    try{

        if(
            navigator.clipboard &&
            typeof navigator.clipboard.writeText==="function"
        ){

            await navigator.clipboard.writeText(text);

            return true;
        }

    }catch(e){

        console.warn(
            "Clipboard API failed:",
            e
        );

    }


    try{

        const textarea=
            document.createElement("textarea");

        textarea.value=text;
        textarea.readOnly=true;

        textarea.style.position="fixed";
        textarea.style.left="-10000px";
        textarea.style.top="0";
        textarea.style.width="1px";
        textarea.style.height="1px";
        textarea.style.opacity="0";
        textarea.style.pointerEvents="none";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        textarea.setSelectionRange(
            0,
            text.length
        );

        const copied=
            document.execCommand("copy");

        textarea.remove();

        return copied;

    }catch(e){

        console.error(
            "Clipboard fallback failed:",
            e
        );

        return false;

    }

};


/* =========================================================
   COPY TOAST
   ========================================================= */

const showCopyMessage=(message,clipboardText)=>{

    const old=
        document.getElementById(
            "dispute-copy-toast"
        );

    if(old)
        old.remove();


    const toast=
        document.createElement("div");

    toast.id=
        "dispute-copy-toast";


    toast.innerHTML=`

        <div id="dct-message"></div>

        <button id="dct-copy">
            COPY AGAIN
        </button>

    `;


    toast.style.cssText=
    "position:fixed;right:12px;bottom:12px;left:auto;top:auto;transform:none;padding:10px 12px;border-radius:3px;background:#202a36;border:1px solid #465363;color:#fff;font:600 11px Arial,sans-serif;z-index:2147483647;box-shadow:0 4px 14px rgba(0,0,0,.45);width:390px;max-width:calc(100vw - 24px);text-align:left;box-sizing:border-box";


    const messageEl=
        toast.querySelector(
            "#dct-message"
        );


    const copyAgainBtn=
        toast.querySelector(
            "#dct-copy"
        );


    messageEl.textContent=
        message;


    copyAgainBtn.style.cssText=
    "margin-top:7px;height:28px;padding:0 11px;border:1px solid #536171;border-radius:2px;background:#303c4a;color:#fff;font:700 10px Arial,sans-serif;cursor:pointer";


    copyAgainBtn.onclick=async()=>{

        const ok=
            await copyText(
                clipboardText
            );


        copyAgainBtn.textContent=
            ok
                ?"COPIED ✓"
                :"COPY FAILED";


        if(ok){

            setTimeout(()=>{

                copyAgainBtn.textContent=
                    "COPY AGAIN";

            },1500);

        }

    };


    document.body.appendChild(toast);


    setTimeout(()=>{

        if(toast.parentNode){

            toast.style.transition=
                "opacity .3s";

            toast.style.opacity="0";


            setTimeout(()=>{

                if(toast.parentNode)
                    toast.remove();

            },300);

        }

    },5000);


    return toast;

};


/* =========================================================
   RUSH VERIFY
   ========================================================= */

const runRushVerify=iframe=>{

    const scriptUrl=
        "https://luckyph10.github.io/feeling_pogi_yarn/vob_intelligence.js?" +
        Date.now();


    try{

        const doc=
            iframe.contentDocument ||
            iframe.contentWindow?.document;


        if(!doc){

            throw new Error(
                "Unable to access iframe document."
            );

        }


        const oldScript=
            doc.getElementById(
                "rush-verify-script"
            );


        if(oldScript)
            oldScript.remove();


        const script=
            doc.createElement("script");


        script.id=
            "rush-verify-script";


        script.src=
            scriptUrl;


        script.onload=()=>{

            console.log(
                "RUSH VERIFY loaded inside ARBIT iframe."
            );

        };


        script.onerror=()=>{

            alert(
                "RUSH VERIFY: Load failed."
            );

        };


        (
            doc.head||
            doc.documentElement
        ).appendChild(
            script
        );


    }catch(e){

        console.error(
            "RUSH VERIFY iframe error:",
            e
        );

        alert(
            "RUSH VERIFY could not run inside the ARBIT iframe.\n\n"+
            "The iframe page may block cross-origin script injection."
        );

    }

};


/* =========================================================
   PULL CASE / HISTORY EVIDENCE
   ========================================================= */

const runPullEvidence=iframe=>{

    const scriptUrl=
        "https://luckyph10.github.io/feeling_pogi_yarn/case_notes_puller.js?" +
        Date.now();


    try{

        const doc=
            iframe.contentDocument ||
            iframe.contentWindow?.document;


        if(!doc){

            throw new Error(
                "Unable to access iframe document."
            );

        }


        const oldScript=
            doc.getElementById(
                "pull-case-history-evidence-script"
            );


        if(oldScript)
            oldScript.remove();


        const script=
            doc.createElement("script");


        script.id=
            "pull-case-history-evidence-script";


        script.src=
            scriptUrl;


        script.onload=()=>{

            console.log(
                "Pull Case/History Evidence loaded inside ARBIT iframe."
            );

        };


        script.onerror=()=>{

            alert(
                "Pull Case/History Evidence: Load failed."
            );

        };


        (
            doc.head||
            doc.documentElement
        ).appendChild(
            script
        );


    }catch(e){

        console.error(
            "Pull Case/History Evidence iframe error:",
            e
        );

        alert(
            "Pull Case/History Evidence could not run inside the ARBIT iframe.\n\n"+
            "The iframe page may block cross-origin script injection."
        );

    }

};


/* =========================================================
   VOB FILE VIEWER
   ========================================================= */

const openVobViewer=url=>{

    if(!url)
        return;


    const old=
        document.getElementById(
            "vob-file-viewer-overlay"
        );


    if(old)
        old.remove();


    const viewer=
        document.createElement("div");


    viewer.id=
        "vob-file-viewer-overlay";


    viewer.innerHTML=`

        <div id="vob-file-viewer-window">

            <div id="vob-file-viewer-header">

                <div id="vob-file-viewer-title">
                    VOB FILE
                </div>


                <button
                    id="vob-file-viewer-close"
                    type="button"
                    aria-label="Close VOB file"
                >
                    ×
                </button>

            </div>


            <iframe
                id="vob-file-viewer-frame"
                src="${String(url).replace(/"/g,"&quot;")}"
                frameborder="0"
                allowfullscreen
            ></iframe>

        </div>

    `;


    document.body.appendChild(
        viewer
    );


    const close=()=>{

        viewer.remove();

    };


    viewer
        .querySelector(
            "#vob-file-viewer-close"
        )
        .onclick=
            close;


    viewer.addEventListener(
        "mousedown",
        e=>{

            if(
                e.target===viewer
            ){

                close();

            }

        }
    );

};


/* =========================================================
   INSTALL VOB IFRAME HANDLERS
   ========================================================= */

const installVobIframeHandlers=iframe=>{

    const install=()=>{

        try{

            const win=
                iframe.contentWindow;


            const doc=
                iframe.contentDocument||
                win?.document;


            if(!win||!doc)
                return;


            if(
                !win.__disputeVobOpenPatched
            ){

                const originalOpen=
                    win.open.bind(win);


                win.open=function(
                    url,
                    target,
                    features
                ){

                    const value=
                        String(url||"");


                    if(value){

                        openVobViewer(
                            value
                        );

                        return null;

                    }


                    return originalOpen(
                        url,
                        target,
                        features
                    );

                };


                win.__disputeVobOpenPatched=
                    true;

            }


            if(
                !doc.__disputeVobClickHandler
            ){

                doc.addEventListener(
                    "click",
                    e=>{

                        const el=
                            e.target instanceof Element
                                ?e.target
                                :null;


                        if(!el)
                            return;


                        const link=
                            el.closest("a");


                        if(link){

                            const text=
                                (
                                    link.innerText||
                                    link.textContent||
                                    link.title||
                                    ""
                                )
                                .toLowerCase();


                            const href=
                                link.href||
                                link.getAttribute(
                                    "href"
                                )||
                                "";


                            const isVob=
                                /vob/.test(text)||
                                /vob/.test(
                                    String(
                                        link.className||
                                        ""
                                    ).toLowerCase()
                                );


                            const isFile=
                                /\.(pdf|docx?|xlsx?|csv|txt|png|jpe?g|gif|tiff?|bmp|webp)(?:[?#]|$)/i
                                    .test(href);


                            const opensOutside=
                                link.target==="_blank"||
                                link.target==="_new";


                            if(
                                (
                                    isVob||
                                    (
                                        opensOutside&&
                                        isFile
                                    )
                                )&&
                                href
                            ){

                                e.preventDefault();
                                e.stopPropagation();


                                openVobViewer(
                                    href
                                );


                                return;

                            }

                        }

                    },
                    true
                );


                doc.__disputeVobClickHandler=
                    true;

            }

        }catch(e){

            console.warn(
                "Unable to install iframe VOB handlers:",
                e
            );

        }

    };


    iframe.addEventListener(
        "load",
        install,
        {
            passive:true
        }
    );


    try{

        if(
            iframe.contentDocument?.readyState===
            "complete"
        ){

            install();

        }

    }catch(e){}

};


/* =========================================================
   OPEN ARBIT / APP ID IFRAME
   ========================================================= */

const openArbitIframe=()=>{

    const existingOverlay=
        document.getElementById(
            "arbit-iframe-overlay"
        );


    if(
        existingOverlay &&
        existingOverlay.dataset.minimized==="true"
    ){

        existingOverlay.dataset.minimized="false";

        existingOverlay.style.setProperty(
            "display",
            "flex",
            "important"
        );


        const existingVobViewer=
            document.getElementById(
                "vob-file-viewer-overlay"
            );


        if(existingVobViewer){

            existingVobViewer.style.setProperty(
                "display",
                "flex",
                "important"
            );

        }


        try{

            document
                .getElementById(
                    "arbit-iframe"
                )
                ?.focus();

        }catch(e){}


        return;

    }


    let appLinks=[
        ...uniqueArbitLinks
    ];


    if(!appLinks.length){

        const fallbackLink=
            document.querySelector(
                'a[title="Open Arbit"][href*="calculator/"]'
            );


        if(fallbackLink){

            appLinks=[
                {
                    id:
                        fallbackLink.textContent
                            ?.replace(/\u00A0/g," ")
                            .replace(/\r?\n/g," ")
                            .replace(/\s+/g," ")
                            .trim()||
                        arbitIdNumber||
                        "UNKNOWN",

                    href:
                        fallbackLink.href,

                    index:0
                }
            ];

        }

    }


    if(!appLinks.length){

        alert(
            "ARBIT ID link not found."
        );

        return;

    }


    const old=
        document.getElementById(
            "arbit-iframe-overlay"
        );


    if(old)
        old.remove();


    const oldStyle=
        document.getElementById(
            "arbit-iframe-style"
        );


    if(oldStyle)
        oldStyle.remove();


    let currentAppIndex=0;

    let currentApp=
        appLinks[currentAppIndex];


    const overlay=
        document.createElement("div");


    overlay.id=
        "arbit-iframe-overlay";


    overlay.dataset.minimized=
        "false";


    overlay.innerHTML=`

        <div id="arbit-iframe-window">

            <div id="arbit-iframe-header">

                <div id="arbit-iframe-left">

                    <div id="arbit-iframe-title">

                        ARBIT ID:

                        <span id="arbit-iframe-number">
                            ${String(currentApp.id||"UNKNOWN")
                                .replace(/&/g,"&amp;")
                                .replace(/</g,"&lt;")
                                .replace(/>/g,"&gt;")
                                .replace(/"/g,"&quot;")}
                        </span>

                    </div>


                    ${
                        appLinks.length>1
                        ?`

                        <div
                            id="arbit-app-selector-wrap"
                        >

                            <select
                                id="arbit-app-selector"
                                title="Select another ARBIT / APP ID"
                            >

                                ${appLinks.map((item,index)=>`

                                    <option
                                        value="${index}"
                                        ${index===0?"selected":""}
                                    >
                                        ${String(item.id||"UNKNOWN")
                                            .replace(/&/g,"&amp;")
                                            .replace(/</g,"&lt;")
                                            .replace(/>/g,"&gt;")
                                            .replace(/"/g,"&quot;")}
                                    </option>

                                `).join("")}

                            </select>


                            <button
                                id="arbit-app-open"
                                type="button"
                                style="display:none"
                            >
                                OPEN
                            </button>

                        </div>

                        `
                        :""
                    }

                </div>


                <div id="arbit-iframe-actions">

                    <button
                        id="arbit-rush-verify"
                        type="button"
                    >
                        RUSH VERIFY
                    </button>


                    <button
                        id="arbit-pull-evidence"
                        type="button"
                    >
                        Pull Case/History Evidence
                    </button>


                    <button
                        id="arbit-iframe-minimize"
                        type="button"
                        aria-label="Minimize ARBIT ID"
                        title="Minimize"
                    >
                        −
                    </button>


                    <button
                        id="arbit-iframe-close"
                        type="button"
                        aria-label="Close ARBIT ID"
                        title="Close"
                    >
                        ×
                    </button>

                </div>

            </div>


            <iframe
                id="arbit-iframe"
                src="${String(currentApp.href).replace(/"/g,"&quot;")}"
                frameborder="0"
                allowfullscreen
            ></iframe>

        </div>

    `;


    const iframeStyle=
        document.createElement("style");


    iframeStyle.id=
        "arbit-iframe-style";


    iframeStyle.textContent=`

        #arbit-iframe-overlay{
            position:fixed!important;
            inset:0!important;
            width:100vw!important;
            height:100vh!important;
            background:rgba(0,0,0,.80)!important;
            backdrop-filter:blur(6px)!important;
            -webkit-backdrop-filter:blur(6px)!important;
            z-index:2147483647!important;
            display:flex!important;
            align-items:center!important;
            justify-content:center!important;
            padding:8px!important;
            box-sizing:border-box!important;
            isolation:isolate!important;
        }

        #arbit-iframe-window{
            position:relative!important;
            z-index:2147483647!important;
            width:98vw!important;
            height:96vh!important;
            max-width:1900px!important;
            background:#111!important;
            border:2px solid rgba(255,255,255,.22)!important;
            border-radius:14px!important;
            overflow:hidden!important;
            box-shadow:0 25px 90px rgba(0,0,0,.85)!important;
            display:flex!important;
            flex-direction:column!important;
        }

        #arbit-iframe-header{
            position:relative!important;
            z-index:3!important;
            height:54px!important;
            min-height:54px!important;
            background:#151515!important;
            border-bottom:1px solid rgba(255,255,255,.18)!important;
            display:flex!important;
            align-items:center!important;
            justify-content:space-between!important;
            gap:10px!important;
            padding:0 10px 0 16px!important;
            box-sizing:border-box!important;
        }

        #arbit-iframe-left{
            display:flex!important;
            align-items:center!important;
            gap:10px!important;
            min-width:0!important;
            flex:1!important;
        }

        #arbit-iframe-title{
            color:#fff!important;
            font-family:Arial,sans-serif!important;
            font-size:14px!important;
            font-weight:800!important;
            letter-spacing:.3px!important;
            white-space:nowrap!important;
            display:flex!important;
            align-items:center!important;
            gap:4px!important;
            flex-shrink:0!important;
        }

        #arbit-iframe-number{
            color:#facc15!important;
            font-weight:900!important;
            margin-left:2px!important;
            text-shadow:0 1px 4px rgba(0,0,0,.4)!important;
        }

        #arbit-app-selector-wrap{
            display:flex!important;
            align-items:center!important;
            gap:6px!important;
            min-width:0!important;
        }

        #arbit-app-selector{
            height:38px!important;
            min-width:150px!important;
            max-width:260px!important;
            padding:0 32px 0 11px!important;
            border:1px solid rgba(255,255,255,.25)!important;
            border-radius:8px!important;
            background:#222!important;
            color:#fff!important;
            font-family:Arial,sans-serif!important;
            font-size:12px!important;
            font-weight:700!important;
            outline:none!important;
            cursor:pointer!important;
            box-sizing:border-box!important;
        }

        #arbit-app-selector:hover{
            border-color:rgba(255,255,255,.45)!important;
        }

        #arbit-app-selector:focus{
            border-color:#facc15!important;
            box-shadow:0 0 0 3px rgba(250,204,21,.12)!important;
        }

        #arbit-app-selector option{
            background:#222!important;
            color:#fff!important;
        }

        #arbit-app-open{
            height:38px!important;
            padding:0 14px!important;
            border:1px solid rgba(255,255,255,.2)!important;
            border-radius:8px!important;
            background:#f59e0b!important;
            color:#111!important;
            font-family:Arial,sans-serif!important;
            font-size:12px!important;
            font-weight:900!important;
            letter-spacing:.3px!important;
            cursor:pointer!important;
            white-space:nowrap!important;
            box-shadow:0 4px 14px rgba(0,0,0,.3)!important;
        }

        #arbit-app-open:hover{
            background:#fbbf24!important;
            transform:translateY(-1px)!important;
        }

        #arbit-app-open:active{
            transform:translateY(0)!important;
        }

        #arbit-iframe-actions{
            display:flex!important;
            align-items:center!important;
            justify-content:flex-end!important;
            gap:8px!important;
            flex-wrap:nowrap!important;
            flex-shrink:0!important;
        }

        #arbit-rush-verify{
            height:38px!important;
            padding:0 16px!important;
            border:1px solid rgba(255,255,255,.2)!important;
            border-radius:8px!important;
            background:#16a34a!important;
            color:#fff!important;
            font-family:Arial,sans-serif!important;
            font-size:12px!important;
            font-weight:800!important;
            letter-spacing:.35px!important;
            cursor:pointer!important;
            white-space:nowrap!important;
            box-shadow:0 4px 14px rgba(0,0,0,.3)!important;
        }

        #arbit-rush-verify:hover{
            background:#22c55e!important;
            box-shadow:0 5px 18px rgba(34,197,94,.4)!important;
        }

        #arbit-pull-evidence{
            height:38px!important;
            padding:0 16px!important;
            border:1px solid rgba(255,255,255,.2)!important;
            border-radius:8px!important;
            background:#2563eb!important;
            color:#fff!important;
            font-family:Arial,sans-serif!important;
            font-size:12px!important;
            font-weight:800!important;
            letter-spacing:.2px!important;
            cursor:pointer!important;
            white-space:nowrap!important;
            box-shadow:0 4px 14px rgba(0,0,0,.3)!important;
        }

        #arbit-pull-evidence:hover{
            background:#3b82f6!important;
            box-shadow:0 5px 18px rgba(59,130,246,.4)!important;
        }

        #arbit-iframe-minimize{
            width:38px!important;
            height:38px!important;
            border:0!important;
            border-radius:50%!important;
            background:rgba(250,204,21,.18)!important;
            color:#facc15!important;
            font-size:25px!important;
            font-weight:900!important;
            line-height:1!important;
            cursor:pointer!important;
            display:flex!important;
            align-items:center!important;
            justify-content:center!important;
            flex-shrink:0!important;
            padding:0!important;
        }

        #arbit-iframe-minimize:hover{
            background:rgba(250,204,21,.32)!important;
        }

        #arbit-iframe-close{
            width:38px!important;
            height:38px!important;
            border:0!important;
            border-radius:50%!important;
            background:#dc2626!important;
            color:#fff!important;
            font-size:27px!important;
            line-height:1!important;
            cursor:pointer!important;
            display:flex!important;
            align-items:center!important;
            justify-content:center!important;
            flex-shrink:0!important;
            padding:0!important;
        }

        #arbit-iframe-close:hover{
            background:#ef4444!important;
        }

        #arbit-iframe{
            position:relative!important;
            z-index:1!important;
            width:100%!important;
            height:calc(100% - 54px)!important;
            flex:1!important;
            border:0!important;
            background:#fff!important;
        }

        #vob-file-viewer-overlay{
            position:fixed!important;
            inset:0!important;
            width:100vw!important;
            height:100vh!important;
            background:rgba(0,0,0,.84)!important;
            backdrop-filter:blur(6px)!important;
            -webkit-backdrop-filter:blur(6px)!important;
            z-index:2147483647!important;
            display:flex!important;
            align-items:center!important;
            justify-content:center!important;
            padding:10px!important;
            box-sizing:border-box!important;
            isolation:isolate!important;
        }

        #vob-file-viewer-window{
            width:96vw!important;
            height:94vh!important;
            max-width:1800px!important;
            background:#111!important;
            border:1px solid rgba(255,255,255,.25)!important;
            border-radius:14px!important;
            overflow:hidden!important;
            box-shadow:0 25px 100px rgba(0,0,0,.9)!important;
            display:flex!important;
            flex-direction:column!important;
        }

        #vob-file-viewer-header{
            height:48px!important;
            min-height:48px!important;
            background:#151515!important;
            border-bottom:1px solid rgba(255,255,255,.18)!important;
            display:flex!important;
            align-items:center!important;
            justify-content:space-between!important;
            padding:0 10px 0 16px!important;
        }

        #vob-file-viewer-title{
            color:#fff!important;
            font:800 13px Arial,sans-serif!important;
        }

        #vob-file-viewer-close{
            width:36px!important;
            height:36px!important;
            border:0!important;
            border-radius:50%!important;
            background:rgba(255,255,255,.08)!important;
            color:#fff!important;
            font-size:26px!important;
            cursor:pointer!important;
        }

        #vob-file-viewer-close:hover{
            background:rgba(220,40,40,.95)!important;
        }

        #vob-file-viewer-frame{
            width:100%!important;
            height:calc(100% - 48px)!important;
            flex:1!important;
            border:0!important;
            background:#fff!important;
        }

        @media(max-width:1250px){

            #arbit-iframe-header{
                gap:5px!important;
            }

            #arbit-iframe-left{
                gap:6px!important;
            }

            #arbit-app-selector{
                min-width:125px!important;
                max-width:180px!important;
            }

            #arbit-rush-verify,
            #arbit-pull-evidence{
                padding:0 10px!important;
                font-size:10px!important;
            }

        }

        @media(max-width:950px){

            #arbit-iframe-title{
                font-size:12px!important;
            }

            #arbit-app-selector{
                min-width:110px!important;
                max-width:145px!important;
            }

            #arbit-app-open{
                padding:0 10px!important;
            }

            #arbit-rush-verify,
            #arbit-pull-evidence{
                padding:0 7px!important;
                font-size:9px!important;
            }

        }

        @media(max-width:700px){

            #arbit-iframe-overlay{
                padding:4px!important;
            }

            #arbit-iframe-window{
                width:100vw!important;
                height:98vh!important;
                border-radius:10px!important;
            }

            #arbit-iframe-header{
                padding-left:8px!important;
                gap:4px!important;
            }

            #arbit-iframe-left{
                gap:4px!important;
            }

            #arbit-iframe-title{
                font-size:10px!important;
            }

            #arbit-iframe-number{
                font-size:10px!important;
            }

            #arbit-app-selector{
                min-width:85px!important;
                max-width:120px!important;
                height:34px!important;
                font-size:9px!important;
            }

            #arbit-app-open{
                height:34px!important;
                padding:0 8px!important;
                font-size:9px!important;
            }

            #arbit-rush-verify,
            #arbit-pull-evidence{
                height:34px!important;
                padding:0 5px!important;
                font-size:8px!important;
            }

            #arbit-iframe-minimize,
            #arbit-iframe-close{
                width:34px!important;
                height:34px!important;
            }

        }

    `;


    document.head.appendChild(
        iframeStyle
    );


    document.body.appendChild(
        overlay
    );


    const iframe=
        document.getElementById(
            "arbit-iframe"
        );


    const rushBtn=
        document.getElementById(
            "arbit-rush-verify"
        );


    const pullEvidenceBtn=
        document.getElementById(
            "arbit-pull-evidence"
        );


    const minimizeBtn=
        document.getElementById(
            "arbit-iframe-minimize"
        );


    const closeBtn=
        document.getElementById(
            "arbit-iframe-close"
        );


    const iframeNumberElement=
        document.getElementById(
            "arbit-iframe-number"
        );


    const appSelector=
        document.getElementById(
            "arbit-app-selector"
        );


    const appOpenBtn=
        document.getElementById(
            "arbit-app-open"
        );


    const updateCurrentIdDisplay=()=>{

        if(!iframeNumberElement)
            return;


        iframeNumberElement.textContent=
            currentApp?.id||
            "UNKNOWN";

    };


    if(appSelector){

        appSelector.addEventListener(
            "change",
            ()=>{

                const selectedIndex=
                    Number(
                        appSelector.value
                    );


                if(
                    !Number.isInteger(
                        selectedIndex
                    )||
                    !appLinks[selectedIndex]
                ){

                    return;

                }


                if(
                    selectedIndex===
                    currentAppIndex
                ){

                    if(appOpenBtn)
                        appOpenBtn.style.display=
                            "none";

                }else{

                    if(appOpenBtn)
                        appOpenBtn.style.display=
                            "inline-flex";

                }

            }

        );

    }


    if(appOpenBtn){

        appOpenBtn.addEventListener(
            "click",
            ()=>{

                if(!appSelector)
                    return;


                const selectedIndex=
                    Number(
                        appSelector.value
                    );


                if(
                    !Number.isInteger(
                        selectedIndex
                    )||
                    !appLinks[selectedIndex]
                ){

                    return;

                }


                if(
                    selectedIndex===
                    currentAppIndex
                ){

                    appOpenBtn.style.display=
                        "none";

                    return;

                }


                const selectedApp=
                    appLinks[selectedIndex];


                console.log(
                    "Opening selected APP / ARBIT ID in SAME iframe:",
                    selectedApp
                );


                currentAppIndex=
                    selectedIndex;


                currentApp=
                    selectedApp;


                iframe.src=
                    selectedApp.href;


                updateCurrentIdDisplay();


                appOpenBtn.style.display=
                    "none";


                appSelector.value=
                    String(
                        currentAppIndex
                    );

            }

        );

    }


    updateCurrentIdDisplay();


    try{

        overlay.style.setProperty(
            "z-index",
            "2147483647",
            "important"
        );

        overlay.style.setProperty(
            "position",
            "fixed",
            "important"
        );

        overlay.style.setProperty(
            "inset",
            "0",
            "important"
        );

        overlay.style.setProperty(
            "isolation",
            "isolate"
        );

    }catch(e){

        console.warn(
            "Could not force iframe stacking:",
            e
        );

    }


    rushBtn.onclick=()=>{

        runRushVerify(
            iframe
        );

    };


    pullEvidenceBtn.onclick=()=>{

        runPullEvidence(
            iframe
        );

    };


    installVobIframeHandlers(
        iframe
    );


    const minimizeIframe=()=>{

        overlay.dataset.minimized=
            "true";


        overlay.style.setProperty(
            "display",
            "none",
            "important"
        );

    };


    minimizeBtn.onclick=
        minimizeIframe;


    const closeIframe=()=>{

        const vobViewer=
            document.getElementById(
                "vob-file-viewer-overlay"
            );


        if(vobViewer)
            vobViewer.remove();


        overlay.remove();
        iframeStyle.remove();

    };


    closeBtn.onclick=
        closeIframe;


    overlay.addEventListener(
        "mousedown",
        e=>{

            if(
                e.target===overlay
            ){

                closeIframe();

            }

        }
    );


    overlay.addEventListener(
        "keydown",
        e=>{

            if(
                e.key==="Escape"
            ){

                e.preventDefault();


                const vobViewer=
                    document.getElementById(
                        "vob-file-viewer-overlay"
                    );


                if(vobViewer){

                    vobViewer.remove();

                }else{

                    closeIframe();

                }

            }

        },
        true
    );


    setTimeout(()=>{

        try{

            closeBtn.focus();

        }catch(e){}

    },50);

};


/* =========================================================
   MAIN DISPUTE POPUP
   ========================================================= */

const popup=()=>new Promise(resolve=>{

    const old=
        document.getElementById(
            "dispute-popup-overlay"
        );


    if(old)
        old.remove();


    /*
     * =====================================================
     * FIND THE SIDEBAR
     * =====================================================
     *
     * The popup will now live INSIDE .sb-nav.
     */

    const sidebar=
        document.querySelector(
            "nav.sb-nav"
        );


    /*
     * Fallback in case the nav is not found.
     * This keeps the script functional instead of failing.
     */

    const popupContainer=
        sidebar||
        document.body;


    if(!sidebar){

        console.warn(
            "nav.sb-nav not found. Popup will use document.body."
        );

    }


    /*
     * Make the sidebar the positioning reference.
     */

    if(sidebar){

        const computed=
            window.getComputedStyle(
                sidebar
            );


        if(
            computed.position===
            "static"
        ){

            sidebar.style.setProperty(
                "position",
                "relative",
                "important"
            );

        }

    }


    const overlay=
        document.createElement("div");


    overlay.id=
        "dispute-popup-overlay";


    overlay.innerHTML=`

        <div id="dispute-popup">

            <button id="dp-close">
                ×
            </button>


            <div id="dp-title-row">

                <div id="dp-title">
                    Dispute Information
                </div>


                <button
                    id="dp-arbit-id"
                    type="button"
                >
                    ARBIT ID
                </button>

            </div>


            <div id="dp-label-processor">
                Processor Name
            </div>


            <div id="dp-processor-row">

                <input
                    id="dp-processor"
                    type="text"
                    placeholder="Enter Processor Name"
                    autocomplete="off"
                >

            </div>


            <div id="dp-label-name">
                Dispute User Name
            </div>


            <div id="dp-name-row">

                <input
                    id="dp-name"
                    type="text"
                    placeholder="Enter Dispute User Name"
                    autocomplete="off"
                >


                <button id="dp-edit">
                    Edit
                </button>


                <span id="dp-saved">
                    Saved ✓
                </span>


                <button id="dp-save">
                    Save
                </button>

            </div>


            <div id="dp-label-state">
                State + Duplicate Comments
            </div>


            <div id="dp-state-row">

                <input
                    id="dp-state"
                    type="text"
                    placeholder="Enter State"
                    autocomplete="off"
                >


                <select id="dp-duplicate-comments">

                    <option
                        value=""
                        selected
                        disabled
                    >
                        Select Duplicate Dispute Comments
                    </option>


                    <option value="Duplicate Dispute Reviewed">
                        Duplicate Dispute Reviewed
                    </option>


                    <option value="N/A">
                        N/A
                    </option>

                </select>

            </div>


            <div id="dp-label-mismatch">
                Plantype Mismatch
            </div>


            <select id="dp-mismatch">

                <option
                    value=""
                    selected
                    disabled
                >
                    Select Yes or No
                </option>


                <option value="Yes">
                    Yes
                </option>


                <option value="No">
                    No
                </option>

            </select>


            <button id="dp-go">
                Go
            </button>


            <div id="dp-status"></div>


            <div
                id="dp-eligible"
                style="display:none"
            >

                <div id="dp-eligible-title">
                    Eligible updated today?
                </div>


                <div id="dp-eligible-buttons">

                    <button id="dp-no">
                        NO
                    </button>


                    <button id="dp-yes">
                        YES
                    </button>

                </div>


                <div
                    id="dp-yes-extra"
                    style="display:none"
                >

                    <div id="dp-label-email">
                        PLANTYPE_IDRE_EMAIL
                    </div>


                    <input
                        id="dp-email"
                        type="text"
                        placeholder="Enter PLANTYPE_IDRE_EMAIL"
                        autocomplete="off"
                    >


                    <div id="dp-label-arbit-notes">
                        Arbit Case Notes
                    </div>


                    <input
                        id="dp-arbit-notes"
                        type="text"
                        placeholder="Enter Arbit Case Notes"
                        autocomplete="off"
                    >


                    <div id="dp-label-plan-evidence">
                        Plan Type Evidence?
                    </div>


                    <select id="dp-plan-evidence">

                        <option
                            value=""
                            selected
                            disabled
                        >
                            Select Plan Type Evidence
                        </option>


                        <option value="Yes - VOB">
                            Yes - VOB
                        </option>


                        <option value="Yes - VOB Team">
                            Yes - VOB Team
                        </option>


                        <option value="Yes - Insurance Card">
                            Yes - Insurance Card
                        </option>


                        <option value="Yes - State Authority">
                            Yes - State Authority
                        </option>


                        <option value="Yes - EOB">
                            Yes - EOB
                        </option>

                    </select>


                    <div id="dp-label-verified">
                        Verified?
                    </div>


                    <select id="dp-verified">

                        <option value="">
                            Select Yes or No
                        </option>


                        <option value="Yes">
                            Yes
                        </option>


                        <option value="No">
                            No
                        </option>

                    </select>


                    <div id="dp-label-non-bifurcated">
                        Non-Bifurcated state/Federal.
                    </div>


                    <select id="dp-non-bifurcated">

                        <option
                            value=""
                            selected
                            disabled
                        >
                            Select N/A or Yes
                        </option>


                        <option value="N/A">
                            N/A
                        </option>


                        <option value="Yes">
                            Yes
                        </option>

                    </select>


                    <button
                        id="dp-continue"
                        disabled
                    >
                        Continue
                    </button>

                </div>

            </div>

        </div>

    `;


/* =========================================================
   STYLE
   ========================================================= */

const style=
    document.createElement("style");


style.id=
    "dispute-popup-style";


style.textContent=`

    /* =====================================================
       SIDEBAR POPUP
       ===================================================== */

    /*
     * The overlay is now INSIDE nav.sb-nav.
     *
     * It does not cover the page.
     * It simply provides the positioning layer.
     */

    #dispute-popup-overlay{

        position:absolute!important;

        left:0!important;
        right:0!important;
        top:0!important;
        bottom:0!important;

        width:100%!important;
        height:100%!important;

        z-index:2147483646!important;

        pointer-events:none!important;

        isolation:isolate!important;

        box-sizing:border-box!important;
    }


    /*
     * Main popup:
     *
     * LEFT + BOTTOM of the sidebar.
     */

    #dispute-popup{

        pointer-events:auto!important;

        position:absolute!important;

        left:12px!important;
        bottom:12px!important;

        right:auto!important;
        top:auto!important;

        width:390px!important;

        max-width:
            calc(100% - 24px)!important;

        max-height:
            calc(100% - 24px)!important;

        overflow-y:auto!important;
        overflow-x:hidden!important;

        padding:14px!important;

        border-radius:4px!important;

        background:#202a36!important;

        border:
            1px solid
            #465363!important;

        box-shadow:
            0 4px 14px
            rgba(0,0,0,.45)!important;

        backdrop-filter:none!important;
        -webkit-backdrop-filter:none!important;

        font-family:
            Arial,
            sans-serif!important;

        color:#fff!important;

        box-sizing:border-box!important;
    }


    /* =====================================================
       HEADER
       ===================================================== */

    #dp-title-row{

        display:flex!important;

        align-items:center!important;

        justify-content:space-between!important;

        gap:8px!important;

        margin-bottom:10px!important;

        padding-right:30px!important;

        min-height:30px!important;
    }


    #dp-title{

        font-size:14px!important;

        line-height:18px!important;

        font-weight:700!important;

        color:#fff!important;

        margin:0!important;
    }


    #dp-arbit-id{

        height:29px!important;

        padding:0 9px!important;

        border:
            1px solid
            #657386!important;

        border-radius:3px!important;

        background:#303c4a!important;

        color:#fff!important;

        font-size:10px!important;

        font-weight:700!important;

        letter-spacing:.2px!important;

        cursor:pointer!important;

        white-space:nowrap!important;

        box-shadow:none!important;
    }


    #dp-arbit-id:hover{

        background:#3c4b5d!important;

        transform:none!important;
    }


    #dp-close{

        position:absolute!important;

        top:5px!important;

        right:6px!important;

        width:25px!important;

        height:25px!important;

        border:0!important;

        border-radius:3px!important;

        background:transparent!important;

        color:#bfc8d3!important;

        font-size:21px!important;

        line-height:25px!important;

        cursor:pointer!important;

        padding:0!important;
    }


    #dp-close:hover{

        background:#394653!important;

        color:#fff!important;
    }


    /* =====================================================
       LABELS
       ===================================================== */

    #dp-label-processor,
    #dp-label-name,
    #dp-label-state,
    #dp-label-mismatch,
    #dp-label-email,
    #dp-label-arbit-notes,
    #dp-label-plan-evidence,
    #dp-label-verified,
    #dp-label-non-bifurcated{

        font-size:10px!important;

        line-height:13px!important;

        font-weight:600!important;

        color:#d5dce5!important;

        margin:7px 0 3px!important;
    }


    #dp-label-processor{

        margin-top:0!important;
    }


    /* =====================================================
       ROWS
       ===================================================== */

    #dp-processor-row,
    #dp-name-row,
    #dp-state-row{

        display:flex!important;

        gap:5px!important;

        width:100%!important;

        align-items:center!important;
    }


    /* =====================================================
       INPUTS / SELECTS
       ===================================================== */

    #dp-processor,
    #dp-name,
    #dp-state,
    #dp-email,
    #dp-arbit-notes,
    #dp-mismatch,
    #dp-plan-evidence,
    #dp-verified,
    #dp-non-bifurcated,
    #dp-duplicate-comments{

        height:29px!important;

        min-height:29px!important;

        box-sizing:border-box!important;

        border:
            1px solid
            #536171!important;

        border-radius:2px!important;

        background:#111a24!important;

        color:#fff!important;

        outline:none!important;

        padding:0 7px!important;

        font-family:
            Arial,
            sans-serif!important;

        font-size:11px!important;
    }


    #dp-processor,
    #dp-name,
    #dp-state{

        flex:1!important;

        min-width:0!important;
    }


    #dp-duplicate-comments{

        width:145px!important;

        flex-shrink:0!important;

        cursor:pointer!important;
    }


    #dp-mismatch,
    #dp-email,
    #dp-arbit-notes,
    #dp-plan-evidence,
    #dp-verified,
    #dp-non-bifurcated{

        width:100%!important;
    }


    #dp-mismatch,
    #dp-plan-evidence,
    #dp-verified,
    #dp-non-bifurcated{

        cursor:pointer!important;
    }


    #dp-mismatch option,
    #dp-plan-evidence option,
    #dp-verified option,
    #dp-non-bifurcated option,
    #dp-duplicate-comments option{

        background:#202a36!important;

        color:#fff!important;
    }


    #dp-processor::placeholder,
    #dp-name::placeholder,
    #dp-state::placeholder,
    #dp-email::placeholder,
    #dp-arbit-notes::placeholder{

        color:#7f8b99!important;
    }


    #dp-processor:focus,
    #dp-name:focus,
    #dp-state:focus,
    #dp-email:focus,
    #dp-arbit-notes:focus,
    #dp-mismatch:focus,
    #dp-plan-evidence:focus,
    #dp-verified:focus,
    #dp-non-bifurcated:focus,
    #dp-duplicate-comments:focus{

        border-color:#7193b7!important;

        box-shadow:
            0 0 0 1px
            rgba(113,147,183,.25)!important;
    }


    /* =====================================================
       SMALL BUTTONS
       ===================================================== */

    #dp-edit,
    #dp-save{

        height:29px!important;

        padding:0 9px!important;

        border:
            1px solid
            #596878!important;

        border-radius:2px!important;

        background:#303c4a!important;

        color:#fff!important;

        font-size:10px!important;

        font-weight:700!important;

        cursor:pointer!important;

        white-space:nowrap!important;
    }


    #dp-edit:hover,
    #dp-save:hover{

        background:#3d4b5b!important;
    }


    #dp-go{

        width:100%!important;

        height:31px!important;

        margin-top:7px!important;

        border:
            1px solid
            #3f8b61!important;

        border-radius:2px!important;

        background:#276b48!important;

        color:#fff!important;

        font-size:11px!important;

        font-weight:700!important;

        cursor:pointer!important;
    }


    #dp-go:hover{

        background:#318158!important;
    }


    #dp-save{

        display:none;
    }


    #dp-saved{

        display:none;

        height:29px!important;

        padding:0 8px!important;

        border-radius:2px!important;

        background:#286744!important;

        color:#dff7e8!important;

        font-weight:700!important;

        font-size:10px!important;

        align-items:center!important;

        justify-content:center!important;

        white-space:nowrap!important;
    }


    /* =====================================================
       STATUS
       ===================================================== */

    #dp-status{

        margin-top:5px!important;

        min-height:13px!important;

        font-size:9px!important;

        line-height:12px!important;

        color:#9ca8b6!important;
    }


    /* =====================================================
       ELIGIBILITY
       ===================================================== */

    #dp-eligible{

        margin-top:8px!important;

        padding-top:8px!important;

        border-top:
            1px solid
            #46515e!important;
    }


    #dp-eligible-title{

        font-size:10px!important;

        line-height:13px!important;

        font-weight:600!important;

        margin-bottom:5px!important;

        color:#d5dce5!important;
    }


    #dp-eligible-buttons{

        display:flex!important;

        gap:5px!important;
    }


    #dp-no,
    #dp-yes{

        flex:1!important;

        height:30px!important;

        border-radius:2px!important;

        border:
            1px solid
            #566473!important;

        color:#fff!important;

        font-size:10px!important;

        font-weight:700!important;

        cursor:pointer!important;
    }


    #dp-no{

        background:#713536!important;
    }


    #dp-no:hover{

        background:#89403f!important;
    }


    #dp-yes{

        background:#285e9c!important;
    }


    #dp-yes:hover{

        background:#3274bb!important;
    }


    /* =====================================================
       YES EXTRA
       ===================================================== */

    #dp-yes-extra{

        margin-top:8px!important;

        padding-top:8px!important;

        border-top:
            1px solid
            #46515e!important;
    }


    #dp-continue{

        width:100%!important;

        height:30px!important;

        margin-top:7px!important;

        border-radius:2px!important;

        border:
            1px solid
            #3f8b61!important;

        background:#276b48!important;

        color:#fff!important;

        font-size:10px!important;

        font-weight:700!important;

        cursor:pointer!important;
    }


    #dp-continue:hover:not(:disabled){

        background:#318158!important;
    }


    #dp-continue:disabled{

        background:#3b4249!important;

        border-color:#4b535c!important;

        color:#818991!important;

        cursor:not-allowed!important;

        opacity:.7!important;
    }


    /* =====================================================
       SCROLLBAR
       ===================================================== */

    #dispute-popup::-webkit-scrollbar{

        width:7px!important;
    }


    #dispute-popup::-webkit-scrollbar-track{

        background:#18212b!important;
    }


    #dispute-popup::-webkit-scrollbar-thumb{

        background:#566271!important;

        border-radius:2px!important;
    }


    #dispute-popup::-webkit-scrollbar-thumb:hover{

        background:#687789!important;
    }


    /* =====================================================
       SMALL SIDEBARS
       ===================================================== */

    @media(max-width:650px){

        #dispute-popup{

            left:8px!important;

            bottom:8px!important;

            width:
                calc(100% - 16px)!important;

            max-width:
                calc(100% - 16px)!important;

            max-height:
                calc(100% - 16px)!important;
        }


        #dp-title{

            font-size:13px!important;
        }


        #dp-state-row{

            flex-wrap:wrap!important;
        }


        #dp-state{

            width:100%!important;

            flex:none!important;
        }


        #dp-duplicate-comments{

            width:100%!important;
        }

    }

`;


document.head.appendChild(
    style
);


/* =========================================================
   APPEND POPUP INSIDE SIDEBAR
   ========================================================= */

popupContainer.appendChild(
    overlay
);


/* =========================================================
   KEEP POPUP AT SIDEBAR LEFT-BOTTOM
   ========================================================= */

const positionPopupInSidebar=()=>{

    const popupElement=
        document.getElementById(
            "dispute-popup"
        );


    if(!popupElement)
        return;


    /*
     * The CSS already handles the actual placement:
     *
     * left: 12px
     * bottom: 12px
     *
     * This function simply reasserts those values.
     */

    popupElement.style.setProperty(
        "left",
        "12px",
        "important"
    );


    popupElement.style.setProperty(
        "right",
        "auto",
        "important"
    );


    popupElement.style.setProperty(
        "top",
        "auto",
        "important"
    );


    popupElement.style.setProperty(
        "bottom",
        "12px",
        "important"
    );

};


/* =========================================================
   INITIAL POSITION
   ========================================================= */

requestAnimationFrame(()=>{

    positionPopupInSidebar();

});


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    positionPopupInSidebar,
    {
        passive:true
    }
);


/* =========================================================
   SIDEBAR RESIZE OBSERVER
   ========================================================= */

if(
    sidebar &&
    typeof ResizeObserver!=="undefined"
){

    const sidebarResizeObserver=
        new ResizeObserver(
            ()=>{
                positionPopupInSidebar();
            }
        );


    sidebarResizeObserver.observe(
        sidebar
    );


    overlay.__sidebarResizeObserver=
        sidebarResizeObserver;

}


/* =========================================================
   ELEMENTS
   ========================================================= */

const processorInput=
    document.getElementById(
        "dp-processor"
    );

const nameInput=
    document.getElementById("dp-name");

const stateInput=
    document.getElementById("dp-state");

const duplicateCommentsInput=
    document.getElementById(
        "dp-duplicate-comments"
    );

const mismatchInput=
    document.getElementById(
        "dp-mismatch"
    );

const editBtn=
    document.getElementById("dp-edit");

const saveBtn=
    document.getElementById("dp-save");

const savedLabel=
    document.getElementById("dp-saved");

const goBtn=
    document.getElementById("dp-go");

const closeBtn=
    document.getElementById("dp-close");

const status=
    document.getElementById("dp-status");

const eligible=
    document.getElementById("dp-eligible");

const noBtn=
    document.getElementById("dp-no");

const yesBtn=
    document.getElementById("dp-yes");

const yesExtra=
    document.getElementById("dp-yes-extra");

const emailInput=
    document.getElementById("dp-email");

const arbitNotesInput=
    document.getElementById(
        "dp-arbit-notes"
    );

const planEvidenceInput=
    document.getElementById(
        "dp-plan-evidence"
    );

const verifiedInput=
    document.getElementById(
        "dp-verified"
    );

const nonBifurcatedInput=
    document.getElementById(
        "dp-non-bifurcated"
    );

const continueBtn=
    document.getElementById(
        "dp-continue"
    );

const arbitIdBtn=
    document.getElementById(
        "dp-arbit-id"
    );


/* =====================================================
   ARBIT ID BUTTON
   ===================================================== */

arbitIdBtn.onclick=()=>{

    openArbitIframe();

};


/* =========================================================
   USER NAME + PROCESSOR NAME
   ========================================================= */

let currentName=
    getName();

let currentProcessorName=
    getProcessorName();


processorInput.value=
    currentProcessorName;

nameInput.value=
    currentName;


/* =========================================================
   INITIAL LOCK STATE
   ========================================================= */

if(
    currentName &&
    currentProcessorName
){

    processorInput.readOnly=true;
    nameInput.readOnly=true;

    editBtn.style.display=
        "inline-block";

    saveBtn.style.display=
        "none";

    savedLabel.style.display=
        "inline-flex";

    status.textContent=
        "Saved Processor Name and Dispute User Name.";

}else{

    processorInput.readOnly=false;
    nameInput.readOnly=false;

    editBtn.style.display=
        "none";

    saveBtn.style.display=
        "inline-block";

    savedLabel.style.display=
        "none";


    if(!currentProcessorName){

        status.textContent=
            "Please enter and save your Processor Name and Dispute User Name.";

        processorInput.focus();

    }else{

        status.textContent=
            "Please enter and save your Dispute User Name.";

        nameInput.focus();

    }

}


/* =========================================================
   EDIT
   ========================================================= */

editBtn.onclick=()=>{

    processorInput.readOnly=false;
    nameInput.readOnly=false;

    processorInput.focus();

    processorInput.select();

    editBtn.style.display=
        "none";

    saveBtn.style.display=
        "inline-block";

    savedLabel.style.display=
        "none";

    status.textContent=
        "Editing Processor Name and Dispute User Name...";

};


/* =========================================================
   SAVE
   ========================================================= */

saveBtn.onclick=()=>{

    const processor=
        processorInput.value.trim();

    const n=
        nameInput.value.trim();


    if(!processor){

        status.textContent=
            "Enter a Processor Name first.";

        processorInput.focus();

        return;

    }


    if(!n){

        status.textContent=
            "Enter a Dispute User Name first.";

        nameInput.focus();

        return;

    }


    if(!saveProcessorName(processor)){

        status.textContent=
            "Could not save the Processor Name.";

        return;

    }


    if(!saveName(n)){

        status.textContent=
            "Could not save the username.";

        return;

    }


    currentProcessorName=
        processor;

    currentName=
        n;


    processorInput.value=
        processor;

    nameInput.value=
        n;


    processorInput.readOnly=true;
    nameInput.readOnly=true;

    editBtn.style.display=
        "inline-block";

    saveBtn.style.display=
        "none";

    savedLabel.style.display=
        "inline-flex";

    status.textContent=
        "Processor Name and Dispute User Name saved.";

    stateInput.focus();

};


/* =========================================================
   VALIDATE MAIN FORM
   ========================================================= */

const validate=()=>{

    if(!currentProcessorName){

        status.textContent=
            "Please save your Processor Name first.";

        processorInput.focus();

        return false;

    }


    if(!currentName){

        status.textContent=
            "Please save your Dispute User Name first.";

        nameInput.focus();

        return false;

    }


    if(!stateInput.value.trim()){

        status.textContent=
            "Enter a State.";

        stateInput.focus();

        return false;

    }


    if(!duplicateCommentsInput.value){

        status.textContent=
            "Please select Duplicate Dispute Comments.";

        duplicateCommentsInput.focus();

        return false;

    }


    if(!mismatchInput.value){

        status.textContent=
            "Please select Plantype Mismatch: Yes or No.";

        mismatchInput.focus();

        return false;

    }


    return true;

};


/* =========================================================
   VALIDATE YES FORM
   ========================================================= */

const validateYesFields=()=>{

    const email=
        emailInput.value.trim();

    const arbitNotes=
        arbitNotesInput.value.trim();

    const planEvidence=
        planEvidenceInput.value;

    const verificationStatus=
        verifiedInput.value;

    const nonBifurcated=
        nonBifurcatedInput.value;


    return(
        !!email &&
        !!arbitNotes &&
        !!planEvidence &&
        !!verificationStatus &&
        !!nonBifurcated
    );

};


/* =========================================================
   UPDATE CONTINUE
   ========================================================= */

const updateContinueButton=()=>{

    const complete=
        validateYesFields();


    continueBtn.disabled=
        !complete;


    if(complete){

        continueBtn.title=
            "All required fields are complete.";

    }else{

        continueBtn.title=
            "Complete all required fields before continuing.";

    }

};


/* =========================================================
   YES FIELD LISTENERS
   ========================================================= */

emailInput.addEventListener(
    "input",
    updateContinueButton
);

arbitNotesInput.addEventListener(
    "input",
    updateContinueButton
);

planEvidenceInput.addEventListener(
    "change",
    updateContinueButton
);

verifiedInput.addEventListener(
    "change",
    updateContinueButton
);

nonBifurcatedInput.addEventListener(
    "change",
    updateContinueButton
);


/* =========================================================
   GO
   ========================================================= */

const processGo=()=>{

    if(!validate())
        return;


    stateInput.value=
        stateInput.value
            .trim()
            .toUpperCase();


    eligible.style.display=
        "block";


    yesExtra.style.display=
        "none";


    emailInput.value="";
    arbitNotesInput.value="";
    planEvidenceInput.value="";
    verifiedInput.value="";
    nonBifurcatedInput.value="";


    updateContinueButton();


    status.textContent=
        "Choose eligibility to continue.";

    noBtn.focus();

};


goBtn.onclick=
    processGo;


stateInput.onkeydown=e=>{

    if(e.key==="Enter"){

        e.preventDefault();

        processGo();

    }

};


/* =========================================================
   BUILD ONE ROW
   ========================================================= */

const buildRow=(
    id,
    i,
    stateValue,
    duplicateComments,
    isYes,
    disputeUserName="",
    email="",
    verificationStatus="",
    arbitCaseNotes="",
    planTypeEvidence="",
    nonBifurcated="",
    plantypeMismatch="",
    processorName=""
)=>{

    const actualG=
        disputeStatus;


    const actualL=
        columnJValue;


    const actualR=
        getColumnRValue(
            actualG,
            actualL
        );


    const row=[

        isYes
            ?email
            :"-",

        getPlanType(i),

        plantypeMismatch,

        duplicateComments,

        disputeNumber,

        id,

        actualG,

        isYes
            ?disputeUserName
            :"-",

        isYes
            ?verificationStatus
            :"-",

        isYes
            ?arbitCaseNotes
            :"-",

        isYes
            ?planTypeEvidence
            :"-",

        actualL,

        "N/A",

        "N/A",

        stateValue,

        isYes
            ?nonBifurcated
            :"-",

        isYes
            ?"Yes"
            :"No",

        actualR,

        processorName,

        getPHDate()

    ];


    if(row.length!==20){

        console.error(
            "ERROR: ROW DOES NOT HAVE 20 COLUMNS!",
            row,
            "Length:",
            row.length
        );

    }


    console.log(
        "FINAL 20-COLUMN ROW",
        row
    );


    console.log(
        "COLUMN S / PROCESSOR NAME:",
        processorName
    );

    console.log(
        "COLUMN T / PHILIPPINE DATE:",
        getPHDate()
    );


    return row.join("\t");

};


/* =========================================================
   BUILD OUTPUT
   ========================================================= */

const buildOutput=(
    stateValue,
    duplicateComments,
    isYes,
    disputeUserName="",
    email="",
    verificationStatus="",
    arbitCaseNotes="",
    planTypeEvidence="",
    nonBifurcated="",
    plantypeMismatch="",
    processorName=""
)=>{

    const rows=
        sameId
        ?[
            buildRow(
                ids[0],
                0,
                stateValue,
                duplicateComments,
                isYes,
                disputeUserName,
                email,
                verificationStatus,
                arbitCaseNotes,
                planTypeEvidence,
                nonBifurcated,
                plantypeMismatch,
                processorName
            )
        ]
        :ids.map((id,i)=>
            buildRow(
                id,
                i,
                stateValue,
                duplicateComments,
                isYes,
                disputeUserName,
                email,
                verificationStatus,
                arbitCaseNotes,
                planTypeEvidence,
                nonBifurcated,
                plantypeMismatch,
                processorName
            )
        );


    const output=
        rows.join("\r\n");


    console.log(
        "FINAL COPY OUTPUT",
        output
    );


    return output;

};


/* =========================================================
   NO
   ========================================================= */

noBtn.onclick=async()=>{

    if(!validate())
        return;


    const stateValue=
        stateInput.value
            .trim()
            .toUpperCase();


    const duplicateComments=
        duplicateCommentsInput.value;


    const plantypeMismatch=
        mismatchInput.value;


    const output=
        buildOutput(
            stateValue,
            duplicateComments,
            false,
            "",
            "",
            "",
            "",
            "",
            "",
            plantypeMismatch,
            currentProcessorName
        );


    const copied=
        await copyText(output);


    if(
        overlay.__sidebarResizeObserver
    ){

        overlay.__sidebarResizeObserver.disconnect();

    }


    overlay.remove();
    style.remove();


    const rowCount=
        sameId
        ?1
        :ids.length;


    showCopyMessage(

        copied
        ?`✅ COPIED ${rowCount} ROW${rowCount!==1?"S":""} — COLUMNS A:T`
        :`❌ COPY FAILED — CLICK COPY AGAIN`,

        output

    );


    resolve(null);

};


/* =========================================================
   YES
   ========================================================= */

yesBtn.onclick=()=>{

    if(!validate())
        return;


    yesExtra.style.display=
        "block";


    status.textContent=
        "Complete all required YES fields.";


    updateContinueButton();


    emailInput.focus();

};


/* =========================================================
   CONTINUE YES
   ========================================================= */

continueBtn.onclick=async()=>{

    if(continueBtn.disabled){

        status.textContent=
            "Please complete all required fields before continuing.";

        return;

    }


    if(!validate())
        return;


    if(!validateYesFields()){

        status.textContent=
            "Please complete all required YES fields.";

        updateContinueButton();

        return;

    }


    const email=
        emailInput.value.trim();


    const arbitCaseNotes=
        arbitNotesInput.value.trim();


    const planTypeEvidence=
        planEvidenceInput.value;


    const verificationStatus=
        verifiedInput.value;


    const nonBifurcated=
        nonBifurcatedInput.value;


    const plantypeMismatch=
        mismatchInput.value;


    if(!email){

        status.textContent=
            "Enter PLANTYPE_IDRE_EMAIL.";

        emailInput.focus();

        return;

    }


    if(!arbitCaseNotes){

        status.textContent=
            "Enter Arbit Case Notes.";

        arbitNotesInput.focus();

        return;

    }


    if(!planTypeEvidence){

        status.textContent=
            "Select Plan Type Evidence.";

        planEvidenceInput.focus();

        return;

    }


    if(!verificationStatus){

        status.textContent=
            "Select Yes or No for Verified.";

        verifiedInput.focus();

        return;

    }


    if(!nonBifurcated){

        status.textContent=
            "Select N/A or Yes for Non-Bifurcated state/Federal.";

        nonBifurcatedInput.focus();

        return;

    }


    if(!plantypeMismatch){

        status.textContent=
            "Select Yes or No for Plantype Mismatch.";

        mismatchInput.focus();

        return;

    }


    const stateValue=
        stateInput.value
            .trim()
            .toUpperCase();


    const duplicateComments=
        duplicateCommentsInput.value;


    const output=
        buildOutput(
            stateValue,
            duplicateComments,
            true,
            currentName,
            email,
            verificationStatus,
            arbitCaseNotes,
            planTypeEvidence,
            nonBifurcated,
            plantypeMismatch,
            currentProcessorName
        );


    const copied=
        await copyText(output);


    if(
        overlay.__sidebarResizeObserver
    ){

        overlay.__sidebarResizeObserver.disconnect();

    }


    overlay.remove();
    style.remove();


    const rowCount=
        sameId
        ?1
        :ids.length;


    showCopyMessage(

        copied
        ?`✅ COPIED ${rowCount} ROW${rowCount!==1?"S":""} — COLUMNS A:T`
        :`❌ COPY FAILED — CLICK COPY AGAIN`,

        output

    );


    resolve(null);

};


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

overlay.addEventListener(
    "keydown",
    e=>{

        if(
            e.ctrlKey &&
            !e.altKey &&
            !e.metaKey &&
            !e.shiftKey &&
            e.key==="2"
        ){

            e.preventDefault();
            e.stopPropagation();

            duplicateCommentsInput.value=
                "N/A";


            duplicateCommentsInput.dispatchEvent(
                new Event(
                    "change",
                    {
                        bubbles:true
                    }
                )
            );


            status.textContent=
                "Duplicate Dispute Comments: N/A";

            return;

        }


        if(
            e.ctrlKey &&
            !e.altKey &&
            !e.metaKey &&
            !e.shiftKey &&
            e.key==="3"
        ){

            e.preventDefault();
            e.stopPropagation();

            duplicateCommentsInput.value=
                "Duplicate Dispute Reviewed";


            duplicateCommentsInput.dispatchEvent(
                new Event(
                    "change",
                    {
                        bubbles:true
                    }
                )
            );


            status.textContent=
                "Duplicate Dispute Comments: Duplicate Dispute Reviewed";

            return;

        }


        if(
            e.ctrlKey &&
            !e.altKey &&
            !e.metaKey &&
            !e.shiftKey &&
            e.key==="4"
        ){

            e.preventDefault();
            e.stopPropagation();

            mismatchInput.value=
                "No";


            mismatchInput.dispatchEvent(
                new Event(
                    "change",
                    {
                        bubbles:true
                    }
                )
            );


            status.textContent=
                "Plantype Mismatch: No";

            return;

        }


        if(
            e.ctrlKey &&
            !e.altKey &&
            !e.metaKey &&
            !e.shiftKey &&
            e.key==="5"
        ){

            e.preventDefault();
            e.stopPropagation();

            mismatchInput.value=
                "Yes";


            mismatchInput.dispatchEvent(
                new Event(
                    "change",
                    {
                        bubbles:true
                    }
                )
            );


            status.textContent=
                "Plantype Mismatch: Yes";

            return;

        }


        if(e.key==="Escape"){

            e.preventDefault();

            if(
                overlay.__sidebarResizeObserver
            ){

                overlay.__sidebarResizeObserver.disconnect();

            }


            overlay.remove();
            style.remove();

            resolve(null);

            return;

        }


        if(
            e.ctrlKey &&
            !e.altKey &&
            !e.metaKey &&
            !e.shiftKey &&
            e.key==="0" &&
            eligible.style.display==="block"
        ){

            e.preventDefault();
            e.stopPropagation();

            noBtn.click();

            return;

        }


        if(
            e.ctrlKey &&
            !e.altKey &&
            !e.metaKey &&
            !e.shiftKey &&
            e.key==="1" &&
            eligible.style.display==="block"
        ){

            e.preventDefault();
            e.stopPropagation();

            yesBtn.click();

            return;

        }

    },
    true
);


/* =========================================================
   CLOSE
   ========================================================= */

closeBtn.onclick=()=>{

    if(
        overlay.__sidebarResizeObserver
    ){

        overlay.__sidebarResizeObserver.disconnect();

    }


    overlay.remove();
    style.remove();

    resolve(null);

};


stateInput.focus();

});


/* =========================================================
   START
   ========================================================= */

await popup();

})();
