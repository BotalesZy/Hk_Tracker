// scripts/sec1Data.js

const SEC1_PANELS_DATA = {
    godTuner: {
        id: "godtuner-panel",
        title: "GOD TUNER REGISTRY",
        minimizeBtnId: "minimize-panel-btn",
        items: [
            { id: "gt_find", type: "text", text: "Find Godhome", pct: "1", extraClass: "" },
            { id: "gt_p1", type: "link", text: "Pantheon of the Master", url: "https://hollowknight.fandom.com/wiki/Pantheon_of_the_Master", pct: "1", extraClass: "" },
            { id: "gt_p2", type: "link", text: "Pantheon of the Artist", url: "https://hollowknight.fandom.com/wiki/Pantheon_of_the_Artist", pct: "1", extraClass: "" },
            { id: "gt_p3", type: "link", text: "Pantheon of the Sage", url: "https://hollowknight.fandom.com/wiki/Pantheon_of_the_Sage", pct: "1", extraClass: "" },
            { id: "gt_p4", type: "link", text: "Pantheon of the Knight", url: "https://hollowknight.fandom.com/wiki/Pantheon_of_the_Knight", pct: "1", extraClass: "" }
        ]
    },
    dreamNail: {
        id: "dreamnail-panel",
        title: "DREAM NAIL REGISTRY",
        minimizeBtnId: "minimize-dream-btn",
        items: [
            { id: "dn_acquire", type: "text", text: "Acquire the Dream Nail", pct: "1", extraClass: "dream-task" },
            { id: "dn_awaken", type: "text", text: "Awaken the Dream Nail [ICON:ESSE]1800", pct: "1", extraClass: "dream-task" },
            { id: "dn_seer", type: "text", text: "Hear the Seer's final words [ICON:ESSE]2400", pct: "1", extraClass: "dream-task" }
        ]
    },
    maskShards: {
        id: "mask-panel",
        title: "MASK SHARDS",
        minimizeBtnId: "minimize-mask-btn",
        items: [
            { id: "ms_sly1", type: "text", text: "Bought from Sly in Dirtmouth for [ICON:GEO]150", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_sly2", type: "text", text: "Bought from Sly in Dirtmouth for [ICON:GEO]500", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_sly3", type: "text", text: "Bought from Sly in Dirtmouth for [ICON:GEO]800", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_sly4", type: "text", text: "Bought from Sly in Dirtmouth for [ICON:GEO]1500", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_mawleck", type: "text", text: "Defeating Brooding Mawleck far West of the Forgotten Crossroads", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_grub", type: "text", text: "Given by Grubfather after rescuing 5 grubs", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_crossroad", type: "text", text: "Forgotten Crossroads South of False Knight (where there are Goams)", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_station", type: "text", text: "In Queen's Station, near East side", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_bretta", type: "text", text: "Found in Bretta's house in Dirtmouth", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_sanctuary", type: "text", text: "Found in Stone Sanctuary in Greenpath", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_waterways", type: "text", text: "Royal Waterways NW section, swim left under main path", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_deepnest", type: "text", text: "Found in Deepnest through Fungal Core, near Mantis Lords", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_guardian", type: "text", text: "Reward from Enraged Guardian", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_hive", type: "text", text: "Found behind a wall in The Hive", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_seer", type: "text", text: "Given by the Seer for [ICON:ESSE] 1500", pct: "0", extraClass: "mask-shard-task" },
            { id: "ms_mourner", type: "text", text: "Given by Grey Mourner in Resting Grounds", pct: "0", extraClass: "mask-shard-task" }
        ]
    },
    vesselFragments: {
        id: "vessel-panel",
        title: "VESSEL FRAGMENTS",
        minimizeBtnId: "minimize-vessel-btn",
        items: [
            { id: "vf_sly1", type: "text", text: "Bought from Sly in Dirtmouth for [ICON:GEO]550", pct: "0", extraClass: "vessel-fragment-task" },
            { id: "vf_sly2", type: "text", text: "Bought from Sly in Dirtmouth for [ICON:GEO]900", pct: "0", extraClass: "vessel-fragment-task" },
            { id: "vf_greenpath", type: "text", text: "Found in Greenpath near the inaccessible Queen's Gardens entrance", pct: "0", extraClass: "vessel-fragment-task" },
            { id: "vf_crossroad", type: "text", text: "Left of the lift in Forgotten Crossroads", pct: "0", extraClass: "vessel-fragment-task" },
            { id: "vf_seer", type: "text", text: "Found above King's Station near a lift", pct: "0", extraClass: "vessel-fragment-task" },
            { id: "vf_bazaar", type: "text", text: "Found in Deepnest above the working tram", pct: "0", extraClass: "vessel-fragment-task" },
            { id: "vf_deepnest", type: "text", text: "Found at the end of Stag Nest", pct: "0", extraClass: "vessel-fragment-task" },
            { id: "vf_basin", type: "text", text: "The Seer [ICON:ESSE]700", pct: "0", extraClass: "vessel-fragment-task" },
            { id: "vf_station", type: "text", text: "Ancient Basin (Fountain) [ICON:GEO]3000", pct: "0", extraClass: "vessel-fragment-task" }
        ]
    }
};

// Generación síncrona del HTML en el acto
for (const key in SEC1_PANELS_DATA) {
    const panelData = SEC1_PANELS_DATA[key];
    const panelContainer = document.getElementById(panelData.id);

    if (panelContainer) {
        let htmlContent = `
            <div class="glass-panel-header">
                <h3 class="panel-title">${panelData.title}</h3>
                <button id="${panelData.minimizeBtnId}" title="Minimizar">-</button> 
            </div>
            <hr class="panel-divider">
            <div class="panel-inner-list checklist-container">
        `;

        panelData.items.forEach(item => {
            // NUEVA LÓGICA: Reemplazar los códigos tokenizados por las etiquetas img SVG correspondientes
            let processedText = item.text
                .replace("[ICON:GEO]", '<img src="svg/inv/Sec 1/geo.png" class="inline-icon" alt="Geo">')
                .replace("[ICON:ESSE]", '<img src="svg/inv/Sec 1/Essence.webp" class="inline-icon" alt="Essence">');

            // Determinar si el contenido es un enlace o texto plano usando el texto ya procesado
            let contentText = item.type === "link" 
                ? `<a href="${item.url}" target="_blank" class="pantheon-link">${processedText}</a>` 
                : processedText;

            let finalClasses = "task-checkbox";
            if (item.extraClass) finalClasses += " " + item.extraClass;

            htmlContent += `
                <label class="checklist-item">
                    <input type="checkbox" id="${item.id}" class="${finalClasses}" data-percentage="${item.pct}">
                    <span class="task-text" style="order: -1;">${contentText}</span>
                </label>
            `;
        });

        htmlContent += `</div>`;
        panelContainer.innerHTML = htmlContent;
    }
}

// ==========================================================================
// INYECCIÓN DE PARCHE TRAS CARGAR LA PÁGINA
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const realDreamCheckboxes = document.querySelectorAll('#dreamnail-panel .dream-task');
    
    if (realDreamCheckboxes.length >= 3) {
        window.chkAcquire = realDreamCheckboxes[0];
        window.chkAwaken = realDreamCheckboxes[1];
        window.chkSeer = realDreamCheckboxes[2];

        window.marcarPrimerPasoDreamNail = function(estado) {
            if (window.chkAcquire) {
                window.chkAcquire.checked = estado;
                window.chkAcquire.dispatchEvent(new Event('change'));
            }
        };
    }
});
