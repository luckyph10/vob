/* =========================================================
   GET COLUMN B SOURCE — PACIFIC HEALTHWORKS
   ========================================================= */

const columnBElement =
    document.querySelector(
        'ng-select .ng-value-label'
    );

const columnBValue =
    columnBElement
        ?.textContent
        ?.trim()
    ||
    "";
