
(async()=>{

/* =========================================================
   DISPUTE USER NAME
   ========================================================= */

const KEY="disputeUserName";

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
        ?.textContent?.trim()
    ||
    disputeStatusElement
        ?.querySelector(".ng-value")
        ?.textContent?.trim()
    ||
    disputeStatusElement
        ?.textContent?.trim()
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
        ?.textContent?.trim()
    ||
    columnJElement
        ?.querySelector(".ng-value")
        ?.textContent?.trim()
    ||
    columnJElement
        ?.textContent?.trim()
    ||
    "";


/* =========================================================
   GET NEW COLUMN B VALUE
   PACIFIC HEALTHWORKS
   ========================================================= */

const columnBValue=(()=>{
    const elements=[
        ...document.querySelectorAll(
            "span.ng-value-label"
        )
    ];

    const match=elements.find(el=>
        (el.textContent||"")
            .replace(/\u00A0/g," ")
            .replace(/\s+/g," ")
            .trim()==="Pacific Healthworks"
    );

    return(
        match?.textContent
            ?.replace(/\u00A0/g," ")
            .replace(/\s+/g," ")
            .trim()
        ||""
    );
})();


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
        ?.textContent?.trim()
    ||
    columnKPageElement
        ?.querySelector(".ng-value")
        ?.textContent?.trim()
    ||
    columnKPageElement
        ?.textContent?.trim()
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

const ids=arbitIdLinks
.map(link=>{
    const td=link.closest("td");

    return(
        link.textContent||
        td?.textContent||
        ""
    )
    .replace(/\u00A0/g," ")
    .replace(/\r?\n/g," ")
    .replace(/\s+/g," ")
    .trim();
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
    const td=link.closest("td");

    const id=(
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
.filter(item=>item.id&&item.href);


/* =========================================================
   REMOVE DUPLICATE APP / ARBIT LINKS
   ========================================================= */

const uniqueArbitLinks=[];
const seenArbitLinks=new Set();

for(const item of arbitLinks){
    const key=`${item.id}|||${item.href}`;

    if(seenArbitLinks.has(key))
        continue;

    seenArbitLinks.add(key);
    uniqueArbitLinks.push(item);
}


/* =========================================================
   GET PLAN TYPES
   ========================================================= */

const planTypes=[
    ...document.querySelectorAll('[id^="planType_"]')
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

const arbitIdNumber=
    document.querySelector(
        'a[title="Open Arbit"][href*="calculator/"]'
    )?.textContent
        ?.replace(/\u00A0/g," ")
        .replace(/\r?\n/g," ")
        .replace(/\s+/g," ")
        .trim()||"";


/* =========================================================
   VALIDATION
   ========================================================= */

if(!disputeNumber||!disputeStatus||!ids.length){
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

console.log("========================================");
console.log("DISPUTE AUTO FILL STARTED");
console.log("Dispute Number:",disputeNumber);
console.log("Dispute Status:",disputeStatus);
console.log("Page Column J source:",columnJValue);
console.log("New Column B value:",columnBValue);
console.log("Page K value:",columnKPageValue);
console.log("ARBIT ID:",arbitIdNumber);
console.log("IDS FOUND FROM OPEN ARBIT LINKS:",ids);
console.log("ARBIT / APP LINKS:",uniqueArbitLinks);
console.log("Plan Types:",planTypes);
console.log("========================================");


/* =========================================================
   SAME ID
   ========================================================= */

const sameId=ids.every(id=>id===ids[0]);


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

    console.log("========================================");
    console.log("R / NOTES RULE CHECK");
    console.log("G / Dispute Review Status:",actualG);
    console.log("Normalized G:",g);
    console.log("L / Dispute Status:",actualL);
    console.log("Normalized L:",l);

    if(l==="closed"||l.includes("closed")){
        console.log("R RULE MATCH: L = CLOSED");
        return "Completed. Dispute is Closed Due to Receiving Payment Determination.";
    }

    if(g.includes("plan type validated post idr initiation")){
        console.log("R RULE MATCH: PLAN TYPE VALIDATED");
        return "VOB verified, Plan Type Validated Post IDR Initiation – Eligible (Federal NSA).";
    }

    if(g.includes("plan type objection submitted")){
        console.log("R RULE MATCH: PLAN TYPE OBJECTION SUBMITTED");
        return "Already completed by Onshore.";
    }

    if(g.includes("timeline enforcement submitted to idre")){
        console.log("R RULE MATCH: TIMELINE ENFORCEMENT SUBMITTED TO IDRE");
        return "Already completed by Onshore.";
    }

    if(g.includes("additional info provided to idre through email")){
        console.log("R RULE MATCH: ADDITIONAL INFO EMAIL");
        return "VOB verified, evidence uploaded, Additional info requested, Arbit updated.";
    }

    if(g.includes("additional info provided to idre through portal")){
        console.log("R RULE MATCH: ADDITIONAL INFO PORTAL");
        return "VOB verified, evidence uploaded, Additional info requested, Arbit updated.";
    }

    console.warn("NO G/L -> R RULE MATCHED",{
        disputeReviewStatus:actualG,
        disputeStatus:actualL
    });

    return "";
};


/* =========================================================
   CLIPBOARD
   ========================================================= */

const copyText=async text=>{
    try{
        if(
            navigator.clipboard&&
            typeof navigator.clipboard.writeText==="function"
        ){
            await navigator.clipboard.writeText(text);
            return true;
        }
    }catch(e){
        console.warn("Clipboard API failed:",e);
    }

    try{
        const textarea=document.createElement("textarea");

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
        textarea.setSelectionRange(0,text.length);

        const copied=document.execCommand("copy");
        textarea.remove();

        return copied;
    }catch(e){
        console.error("Clipboard fallback failed:",e);
        return false;
    }
};


/* =========================================================
   COPY TOAST
   ========================================================= */

const showCopyMessage=(message,clipboardText)=>{
    const old=document.getElementById("dispute-copy-toast");

    if(old)
        old.remove();

    const toast=document.createElement("div");
    toast.id="dispute-copy-toast";

    toast.innerHTML=`
        <div id="dct-message"></div>
        <button id="dct-copy">COPY AGAIN</button>
    `;

    toast.style.cssText=
    "position:fixed;right:12px;bottom:12px;left:auto;top:auto;transform:none;padding:10px 12px;border-radius:3px;background:#202a36;border:1px solid #465363;color:#fff;font:600 11px Arial,sans-serif;z-index:2147483647;box-shadow:0 4px 14px rgba(0,0,0,.45);width:390px;max-width:calc(100vw - 24px);text-align:left;box-sizing:border-box";

    const messageEl=toast.querySelector("#dct-message");
    const copyAgainBtn=toast.querySelector("#dct-copy");

    messageEl.textContent=message;

    copyAgainBtn.style.cssText=
    "margin-top:7px;height:28px;padding:0 11px;border:1px solid #536171;border-radius:2px;background:#303c4a;color:#fff;font:700 10px Arial,sans-serif;cursor:pointer";

    copyAgainBtn.onclick=async()=>{
        const ok=await copyText(clipboardText);

        copyAgainBtn.textContent=ok?"COPIED ✓":"COPY FAILED";

        if(ok){
            setTimeout(()=>{
                copyAgainBtn.textContent="COPY AGAIN";
            },1500);
        }
    };

    document.body.appendChild(toast);

    setTimeout(()=>{
        if(toast.parentNode){
            toast.style.transition="opacity .3s";
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
        "https://luckyph10.github.io/vob/vob_intelligence.js?"+
        Date.now();

    try{
        const doc=iframe.contentDocument||iframe.contentWindow?.document;

        if(!doc)
            throw new Error("Unable to access iframe document.");

        const oldScript=doc.getElementById("rush-verify-script");

        if(oldScript)
            oldScript.remove();

        const script=doc.createElement("script");
        script.id="rush-verify-script";
        script.src=scriptUrl;

        script.onload=()=>{
            console.log("RUSH VERIFY loaded inside ARBIT iframe.");
        };

        script.onerror=()=>{
            alert("RUSH VERIFY: Load failed.");
        };

        (doc.head||doc.documentElement).appendChild(script);
    }catch(e){
        console.error("RUSH VERIFY iframe error:",e);

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
        "https://luckyph10.github.io/vob/case_notes_puller.js?"+
        Date.now();

    try{
        const doc=iframe.contentDocument||iframe.contentWindow?.document;

        if(!doc)
            throw new Error("Unable to access iframe document.");

        const oldScript=doc.getElementById(
            "pull-case-history-evidence-script"
        );

        if(oldScript)
            oldScript.remove();

        const script=doc.createElement("script");
        script.id="pull-case-history-evidence-script";
        script.src=scriptUrl;

        script.onload=()=>{
            console.log("Pull Case/History Evidence loaded inside ARBIT iframe.");
        };

        script.onerror=()=>{
            alert("Pull Case/History Evidence: Load failed.");
        };

        (doc.head||doc.documentElement).appendChild(script);
    }catch(e){
        console.error("Pull Case/History Evidence iframe error:",e);

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

    const old=document.getElementById("vob-file-viewer-overlay");

    if(old)
        old.remove();

    const viewer=document.createElement("div");
    viewer.id="vob-file-viewer-overlay";

    viewer.innerHTML=`
        <div id="vob-file-viewer-window">
            <div id="vob-file-viewer-header">
                <div id="vob-file-viewer-title">VOB FILE</div>
                <button id="vob-file-viewer-close" type="button" aria-label="Close VOB file">×</button>
            </div>
            <iframe
                id="vob-file-viewer-frame"
                src="${String(url).replace(/"/g,"&quot;")}"
                frameborder="0"
                allowfullscreen
            ></iframe>
        </div>
    `;

    document.body.appendChild(viewer);

    const close=()=>viewer.remove();

    viewer.querySelector("#vob-file-viewer-close").onclick=close;

    viewer.addEventListener("mousedown",e=>{
        if(e.target===viewer)
            close();
    });
};


/* =========================================================
   INSTALL VOB IFRAME HANDLERS
   ========================================================= */

const installVobIframeHandlers=iframe=>{
    const install=()=>{
        try{
            const win=iframe.contentWindow;
            const doc=iframe.contentDocument||win?.document;

            if(!win||!doc)
                return;

            if(!win.__disputeVobOpenPatched){
                const originalOpen=win.open.bind(win);

                win.open=function(url,target,features){
                    const value=String(url||"");

                    if(value){
                        openVobViewer(value);
                        return null;
                    }

                    return originalOpen(url,target,features);
                };

                win.__disputeVobOpenPatched=true;
            }

            if(!doc.__disputeVobClickHandler){
                doc.addEventListener("click",e=>{
                    const el=e.target instanceof Element?e.target:null;

                    if(!el)
                        return;

                    const link=el.closest("a");

                    if(link){
                        const text=(
                            link.innerText||
                            link.textContent||
                            link.title||
                            ""
                        ).toLowerCase();

                        const href=link.href||link.getAttribute("href")||"";

                        const isVob=/vob/.test(text)||
                            /vob/.test(String(link.className||"").toLowerCase());

                        const isFile=/\.(pdf|docx?|xlsx?|csv|txt|png|jpe?g|gif|tiff?|bmp|webp)(?:[?#]|$)/i.test(href);

                        const opensOutside=
                            link.target==="_blank"||
                            link.target==="_new";

                        if((isVob||(opensOutside&&isFile))&&href){
                            e.preventDefault();
                            e.stopPropagation();
                            openVobViewer(href);
                            return;
                        }
                    }
                },true);

                doc.__disputeVobClickHandler=true;
            }
        }catch(e){
            console.warn("Unable to install iframe VOB handlers:",e);
        }
    };

    iframe.addEventListener("load",install,{passive:true});

    try{
        if(iframe.contentDocument?.readyState==="complete")
            install();
    }catch(e){}
};



/* =========================================================
   OPEN ARBIT / APP ID IFRAME
   ========================================================= */

const openArbitIframe=()=>{

    const existingOverlay=
        document.getElementById("arbit-iframe-overlay");

    if(
        existingOverlay &&
        existingOverlay.dataset.minimized==="true"
    ){

        existingOverlay.dataset.minimized="false";

        existingOverlay.style.setProperty(
            "display","flex","important"
        );

        const existingVobViewer=
            document.getElementById("vob-file-viewer-overlay");

        if(existingVobViewer){
            existingVobViewer.style.setProperty(
                "display","flex","important"
            );
        }

        try{
            document.getElementById("arbit-iframe")?.focus();
        }catch(e){}

        return;
    }

    let appLinks=[...uniqueArbitLinks];

    if(!appLinks.length){

        const fallbackLink=document.querySelector(
            'a[title="Open Arbit"][href*="calculator/"]'
        );

        if(fallbackLink){
            appLinks=[{
                id:
                    fallbackLink.textContent
                        ?.replace(/\u00A0/g," ")
                        .replace(/\r?\n/g," ")
                        .replace(/\s+/g," ")
                        .trim()||
                    arbitIdNumber||
                    "UNKNOWN",
                href:fallbackLink.href,
                index:0
            }];
        }
    }

    if(!appLinks.length){
        alert("ARBIT ID link not found.");
        return;
    }

    const old=document.getElementById("arbit-iframe-overlay");
    if(old) old.remove();

    const oldStyle=document.getElementById("arbit-iframe-style");
    if(oldStyle) oldStyle.remove();

    let currentAppIndex=0;
    let currentApp=appLinks[currentAppIndex];

    const overlay=document.createElement("div");
    overlay.id="arbit-iframe-overlay";
    overlay.dataset.minimized="false";

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
                        <div id="arbit-app-selector-wrap">
                            <select id="arbit-app-selector"
                                title="Select another ARBIT / APP ID">
                                ${appLinks.map((item,index)=>`
                                    <option value="${index}"
                                        ${index===0?"selected":""}>
                                        ${String(item.id||"UNKNOWN")
                                            .replace(/&/g,"&amp;")
                                            .replace(/</g,"&lt;")
                                            .replace(/>/g,"&gt;")
                                            .replace(/"/g,"&quot;")}
                                    </option>
                                `).join("")}
                            </select>

                            <button id="arbit-app-open"
                                type="button" style="display:none">
                                OPEN
                            </button>
                        </div>
                        `
                        :""
                    }
                </div>

                <div id="arbit-iframe-actions">
                    <button id="arbit-rush-verify" type="button">
                        RUSH VERIFY
                    </button>

                    <button id="arbit-pull-evidence" type="button">
                        Pull Case/History Evidence
                    </button>

                    <button id="arbit-iframe-minimize"
                        type="button" aria-label="Minimize ARBIT ID"
                        title="Minimize">−</button>

                    <button id="arbit-iframe-close"
                        type="button" aria-label="Close ARBIT ID"
                        title="Close">×</button>
                </div>
            </div>

            <iframe id="arbit-iframe"
                src="${String(currentApp.href).replace(/"/g,"&quot;")}"
                frameborder="0" allowfullscreen></iframe>
        </div>
    `;

    const iframeStyle=document.createElement("style");
    iframeStyle.id="arbit-iframe-style";

    iframeStyle.textContent=`
        #arbit-iframe-overlay{
            position:fixed!important;inset:0!important;
            width:100vw!important;height:100vh!important;
            background:rgba(0,0,0,.80)!important;
            backdrop-filter:blur(6px)!important;
            -webkit-backdrop-filter:blur(6px)!important;
            z-index:2147483647!important;
            display:flex!important;align-items:center!important;
            justify-content:center!important;padding:8px!important;
            box-sizing:border-box!important;isolation:isolate!important;
        }
        #arbit-iframe-window{
            position:relative!important;z-index:2147483647!important;
            width:98vw!important;height:96vh!important;
            max-width:1900px!important;background:#111!important;
            border:2px solid rgba(255,255,255,.22)!important;
            border-radius:14px!important;overflow:hidden!important;
            box-shadow:0 25px 90px rgba(0,0,0,.85)!important;
            display:flex!important;flex-direction:column!important;
        }
        #arbit-iframe-header{
            position:relative!important;z-index:3!important;
            height:54px!important;min-height:54px!important;
            background:#151515!important;
            border-bottom:1px solid rgba(255,255,255,.18)!important;
            display:flex!important;align-items:center!important;
            justify-content:space-between!important;gap:10px!important;
            padding:0 10px 0 16px!important;box-sizing:border-box!important;
        }
        #arbit-iframe-left{
            display:flex!important;align-items:center!important;
            gap:10px!important;min-width:0!important;flex:1!important;
        }
        #arbit-iframe-title{
            color:#fff!important;font:800 14px Arial,sans-serif!important;
            letter-spacing:.3px!important;white-space:nowrap!important;
            display:flex!important;align-items:center!important;
            gap:4px!important;flex-shrink:0!important;
        }
        #arbit-iframe-number{
            color:#facc15!important;font-weight:900!important;
            margin-left:2px!important;
            text-shadow:0 1px 4px rgba(0,0,0,.4)!important;
        }
        #arbit-app-selector-wrap{
            display:flex!important;align-items:center!important;
            gap:6px!important;min-width:0!important;
        }
        #arbit-app-selector{
            height:38px!important;min-width:150px!important;
            max-width:260px!important;padding:0 32px 0 11px!important;
            border:1px solid rgba(255,255,255,.25)!important;
            border-radius:8px!important;background:#222!important;
            color:#fff!important;font:700 12px Arial,sans-serif!important;
            outline:none!important;cursor:pointer!important;
            box-sizing:border-box!important;
        }
        #arbit-app-selector option{background:#222!important;color:#fff!important}
        #arbit-app-open,#arbit-rush-verify,#arbit-pull-evidence{
            height:38px!important;padding:0 14px!important;
            border:1px solid rgba(255,255,255,.2)!important;
            border-radius:8px!important;color:#fff!important;
            font:800 11px Arial,sans-serif!important;
            cursor:pointer!important;white-space:nowrap!important;
        }
        #arbit-app-open{background:#f59e0b!important;color:#111!important}
        #arbit-rush-verify{background:#16a34a!important}
        #arbit-pull-evidence{background:#2563eb!important}
        #arbit-iframe-actions{
            display:flex!important;align-items:center!important;
            justify-content:flex-end!important;gap:8px!important;
            flex-wrap:nowrap!important;flex-shrink:0!important;
        }
        #arbit-iframe-minimize,#arbit-iframe-close{
            width:38px!important;height:38px!important;border:0!important;
            border-radius:50%!important;font-size:25px!important;
            font-weight:900!important;line-height:1!important;
            cursor:pointer!important;display:flex!important;
            align-items:center!important;justify-content:center!important;
            flex-shrink:0!important;padding:0!important;
        }
        #arbit-iframe-minimize{background:rgba(250,204,21,.18)!important;color:#facc15!important}
        #arbit-iframe-close{background:#dc2626!important;color:#fff!important}
        #arbit-iframe{
            position:relative!important;z-index:1!important;
            width:100%!important;height:calc(100% - 54px)!important;
            flex:1!important;border:0!important;background:#fff!important;
        }
        #vob-file-viewer-overlay{
            position:fixed!important;inset:0!important;width:100vw!important;
            height:100vh!important;background:rgba(0,0,0,.84)!important;
            backdrop-filter:blur(6px)!important;
            -webkit-backdrop-filter:blur(6px)!important;
            z-index:2147483647!important;display:flex!important;
            align-items:center!important;justify-content:center!important;
            padding:10px!important;box-sizing:border-box!important;
        }
        #vob-file-viewer-window{
            width:96vw!important;height:94vh!important;
            max-width:1800px!important;background:#111!important;
            border:1px solid rgba(255,255,255,.25)!important;
            border-radius:14px!important;overflow:hidden!important;
            display:flex!important;flex-direction:column!important;
        }
        #vob-file-viewer-header{
            height:48px!important;min-height:48px!important;
            background:#151515!important;
            display:flex!important;align-items:center!important;
            justify-content:space-between!important;padding:0 10px 0 16px!important;
        }
        #vob-file-viewer-title{color:#fff!important;font:800 13px Arial,sans-serif!important}
        #vob-file-viewer-close{
            width:36px!important;height:36px!important;border:0!important;
            border-radius:50%!important;background:rgba(255,255,255,.08)!important;
            color:#fff!important;font-size:26px!important;cursor:pointer!important;
        }
        #vob-file-viewer-frame{
            width:100%!important;height:calc(100% - 48px)!important;
            flex:1!important;border:0!important;background:#fff!important;
        }
        @media(max-width:1250px){
            #arbit-iframe-header{gap:5px!important}
            #arbit-iframe-left{gap:6px!important}
            #arbit-app-selector{min-width:125px!important;max-width:180px!important}
            #arbit-rush-verify,#arbit-pull-evidence{padding:0 10px!important;font-size:10px!important}
        }
        @media(max-width:950px){
            #arbit-iframe-title{font-size:12px!important}
            #arbit-app-selector{min-width:110px!important;max-width:145px!important}
            #arbit-rush-verify,#arbit-pull-evidence{padding:0 7px!important;font-size:9px!important}
        }
        @media(max-width:700px){
            #arbit-iframe-overlay{padding:4px!important}
            #arbit-iframe-window{width:100vw!important;height:98vh!important;border-radius:10px!important}
            #arbit-iframe-header{padding-left:8px!important;gap:4px!important}
            #arbit-iframe-left{gap:4px!important}
            #arbit-iframe-title,#arbit-iframe-number{font-size:10px!important}
            #arbit-app-selector{min-width:85px!important;max-width:120px!important;height:34px!important;font-size:9px!important}
            #arbit-app-open,#arbit-rush-verify,#arbit-pull-evidence{height:34px!important;padding:0 5px!important;font-size:8px!important}
            #arbit-iframe-minimize,#arbit-iframe-close{width:34px!important;height:34px!important}
        }
    `;

    document.head.appendChild(iframeStyle);
    document.body.appendChild(overlay);

    const iframe=document.getElementById("arbit-iframe");
    const rushBtn=document.getElementById("arbit-rush-verify");
    const pullEvidenceBtn=document.getElementById("arbit-pull-evidence");
    const minimizeBtn=document.getElementById("arbit-iframe-minimize");
    const closeBtn=document.getElementById("arbit-iframe-close");
    const iframeNumberElement=document.getElementById("arbit-iframe-number");
    const appSelector=document.getElementById("arbit-app-selector");
    const appOpenBtn=document.getElementById("arbit-app-open");

    const updateCurrentIdDisplay=()=>{
        if(iframeNumberElement)
            iframeNumberElement.textContent=currentApp?.id||"UNKNOWN";
    };

    if(appSelector){
        appSelector.addEventListener("change",()=>{
            const selectedIndex=Number(appSelector.value);

            if(!Number.isInteger(selectedIndex)||!appLinks[selectedIndex])
                return;

            if(appOpenBtn){
                appOpenBtn.style.display=
                    selectedIndex===currentAppIndex?"none":"inline-flex";
            }
        });
    }

    if(appOpenBtn){
        appOpenBtn.addEventListener("click",()=>{
            if(!appSelector)
                return;

            const selectedIndex=Number(appSelector.value);

            if(!Number.isInteger(selectedIndex)||!appLinks[selectedIndex])
                return;

            if(selectedIndex===currentAppIndex){
                appOpenBtn.style.display="none";
                return;
            }

            currentAppIndex=selectedIndex;
            currentApp=appLinks[selectedIndex];
            iframe.src=currentApp.href;
            updateCurrentIdDisplay();
            appOpenBtn.style.display="none";
            appSelector.value=String(currentAppIndex);
        });
    }

    updateCurrentIdDisplay();

    rushBtn.onclick=()=>runRushVerify(iframe);
    pullEvidenceBtn.onclick=()=>runPullEvidence(iframe);

    installVobIframeHandlers(iframe);

    const minimizeIframe=()=>{
        overlay.dataset.minimized="true";
        overlay.style.setProperty("display","none","important");
    };

    minimizeBtn.onclick=minimizeIframe;

    const closeIframe=()=>{
        const vobViewer=document.getElementById("vob-file-viewer-overlay");
        if(vobViewer) vobViewer.remove();
        overlay.remove();
        iframeStyle.remove();
    };

    closeBtn.onclick=closeIframe;

    overlay.addEventListener("mousedown",e=>{
        if(e.target===overlay)
            closeIframe();
    });

    overlay.addEventListener("keydown",e=>{
        if(e.key==="Escape"){
            e.preventDefault();

            const vobViewer=document.getElementById("vob-file-viewer-overlay");

            if(vobViewer)
                vobViewer.remove();
            else
                closeIframe();
        }
    },true);

    setTimeout(()=>{
        try{closeBtn.focus();}catch(e){}
    },50);
};


/* =========================================================
   IMPORTANT EXCEL OUTPUT UPDATE
   Replace the buildRow function in your original popup code
   with this version. Keep the original popup UI and handlers.
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
    plantypeMismatch=""
)=>{

    const actualG=disputeStatus;
    const actualL=columnJValue;

    const actualR=getColumnRValue(actualG,actualL);

    const row=[

        /* A */
        isYes?email:"-",

        /* B — NEW COLUMN */
        columnBValue,

        /* C — PREVIOUSLY B */
        getPlanType(i),

        /* D — PREVIOUSLY C */
        plantypeMismatch,

        /* E — PREVIOUSLY D */
        duplicateComments,

        /* F — PREVIOUSLY E */
        disputeNumber,

        /* G — PREVIOUSLY F */
        id,

        /* H — PREVIOUSLY G */
        actualG,

        /* I — PREVIOUSLY H */
        isYes?disputeUserName:"-",

        /* J — PREVIOUSLY I */
        isYes?verificationStatus:"-",

        /* K — PREVIOUSLY J */
        isYes?arbitCaseNotes:"-",

        /* L — PREVIOUSLY K */
        isYes?planTypeEvidence:"-",

        /* M — PREVIOUSLY L */
        actualL,

        /* N — PREVIOUSLY M */
        "N/A",

        /* O — PREVIOUSLY N */
        "N/A",

        /* P — PREVIOUSLY O */
        "N/A",

        /* Q — PREVIOUSLY P */
        stateValue,

        /* R — PREVIOUSLY Q */
        isYes?nonBifurcated:"-",

        /* S — PREVIOUSLY R */
        isYes?"Yes":"No",

        /* T — PREVIOUSLY S */
        actualR
    ];

    if(row.length!==20){
        console.error(
            "ERROR: ROW DOES NOT HAVE 20 COLUMNS!",
            row,
            "Length:",
            row.length
        );
    }

    console.log("FINAL 20-COLUMN ROW (A:T)",row);

    return row.join("\t");
};


/* =========================================================
   UPDATE BOTH SUCCESS MESSAGES IN YOUR ORIGINAL HANDLERS
   ========================================================= */

/*
Replace COLUMNS A:S with COLUMNS A:T in both the NO
handler and the CONTINUE YES handler:

?`✅ COPIED ${rowCount} ROW${rowCount!==1?"S":""} — COLUMNS A:T`
*/

/* Keep the original buildOutput, popup UI, validation,
   NO/YES handlers, keyboard shortcuts, and final startup
   code from your original script. */
