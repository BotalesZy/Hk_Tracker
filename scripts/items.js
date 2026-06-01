/* ==========================================================================
   ITEMS.JS — Listener único delegado para toda la página
   ========================================================================== */

window.nivelAguijon = 0;

let toastGrimmTimer = null;

function mostrarToastGrimm() {
    let toast = document.getElementById('grimm-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'grimm-toast';
        toast.innerHTML = `
            <span class="grimm-toast-icon">⚠</span>
            <span class="grimm-toast-text">
                A second click on <strong>Grimmchild</strong> will transform it into
                <em>Carefree Melody</em>, exiling the Grimm Troupe forever.
            </span>
        `;
        document.body.appendChild(toast);
    }
    if (toastGrimmTimer) clearTimeout(toastGrimmTimer);
    toast.classList.remove('grimm-toast-hide');
    toast.classList.add('grimm-toast-show');
    toastGrimmTimer = setTimeout(() => ocultarToastGrimm(), 6000);
}

function ocultarToastGrimm() {
    const toast = document.getElementById('grimm-toast');
    if (!toast) return;
    toast.classList.remove('grimm-toast-show');
    toast.classList.add('grimm-toast-hide');
    if (toastGrimmTimer) { clearTimeout(toastGrimmTimer); toastGrimmTimer = null; }
}

document.addEventListener('click', (event) => {

    if (event.target.closest('#modal-no')) {
        document.getElementById('custom-confirm-modal').classList.remove('show');
        return;
    }

    if (event.target.closest('#modal-yes')) {
        document.querySelectorAll('.interactive-item, .interactive-spell').forEach(el => el.classList.add('disabled'));

        const spells = {
            spellTopLeft:  "svg/inv/Sec 1/magia/Vengeful Spirit.png",
            spellTopRight: "svg/inv/Sec 1/magia/Desolate Dive.png",
            spellBottom:   "svg/inv/Sec 1/magia/Howling Wraiths.png"
        };
        Object.entries(spells).forEach(([id, src]) => {
            const el = document.getElementById(id);
            if (el) { el.src = src; el.setAttribute('data-state', '0'); }
        });

        window.nivelAguijon = 0;
        const nail = document.getElementById('nail');
        if (nail) nail.src = "svg/inv/Sec 1/aguijon/N1.webp";

        const grimmchild = document.getElementById('grimmchild');
        if (grimmchild) {
            grimmchild.src = "svg/charms/Grimmchild.webp";
            grimmchild.setAttribute('data-status', 'dormido');
            grimmchild.classList.add('disabled');
            const nameSpan = document.getElementById('name-grimmchild');
            if (nameSpan) nameSpan.innerText = "Grimmchild";
        }

        const nkg = document.querySelector('img[alt="NKG"]');
        if (nkg) { nkg.removeAttribute('data-nkg-locked'); nkg.classList.add('disabled'); }

        ocultarToastGrimm();

        if (typeof cerrarPanelGodTuner  === 'function') cerrarPanelGodTuner();
        if (typeof cerrarPanelDreamNail === 'function') cerrarPanelDreamNail();
        if (typeof cerrarPanelMask      === 'function') cerrarPanelMask();
        if (typeof cerrarPanelVessels   === 'function') cerrarPanelVessels();

        document.querySelectorAll('.task-checkbox').forEach(cb => { cb.checked = false; });

        const maskImg = document.getElementById('mask');
        if (maskImg) maskImg.src = "svg/inv/Sec 1/MVD/mask/mascara1.svg";
        const vesselImg = document.getElementById('vessle');
        if (vesselImg) vesselImg.src = "svg/inv/Sec 1/MVD/vessle/Ve1.svg";

        ['monomon', 'lurien', 'herrah'].forEach(id => {
            const d = document.getElementById(id);
            if (d) {
                d.setAttribute('data-dreamer-active', 'false');
                d.classList.add('disabled');
            }
        });

        document.getElementById('custom-confirm-modal').classList.remove('show');
        const eyes = document.getElementById('shade-lord-container');
        if (eyes) eyes.classList.remove('suspicious');

        if (typeof playClear === 'function') playClear();
        if (typeof borrarSave === 'function') borrarSave();
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }

    if (event.target.closest('#text-clear')) {
        document.getElementById('custom-confirm-modal').classList.add('show');
        if (typeof cerrarPanelGodTuner === 'function') cerrarPanelGodTuner();
        return;
    }

    if (event.target.closest('#nail')) {
        const nail = document.getElementById('nail');
        window.nivelAguijon = (window.nivelAguijon + 1) % 5;
        nail.src = window.nivelAguijon === 4
            ? "svg/inv/Sec 1/aguijon/N5.webp"
            : `svg/inv/Sec 1/aguijon/N${window.nivelAguijon + 1}.webp`;
        if (typeof playNailSound === 'function') playNailSound(window.nivelAguijon, 5);
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }

    const spell = event.target.closest('.interactive-spell');
    if (spell) {
        let state = parseInt(spell.getAttribute('data-state'), 10) || 0;
        state = (state + 1) % 3;
        spell.setAttribute('data-state', state);
        const rutas = {
            spellTopLeft:  ["svg/inv/Sec 1/magia/Vengeful Spirit.png",  "svg/inv/Sec 1/magia/Vengeful Spirit.png",  "svg/inv/Sec 1/magia/Shade Soul.png"],
            spellTopRight: ["svg/inv/Sec 1/magia/Desolate Dive.png",    "svg/inv/Sec 1/magia/Desolate Dive.png",    "svg/inv/Sec 1/magia/Descending Dark.png"],
            spellBottom:   ["svg/inv/Sec 1/magia/Howling Wraiths.png",  "svg/inv/Sec 1/magia/Howling Wraiths.png",  "svg/inv/Sec 1/magia/Abyss Shriek.png"]
        };
        spell.src = rutas[spell.id][state];
        spell.classList.toggle('disabled', state === 0);
        if (typeof playSpellSound === 'function') playSpellSound(spell.id, state);
        if (state > 0 && typeof animarMagia === 'function') animarMagia(spell, state === 2);
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }

    const item = event.target.closest('.interactive-item');
    if (!item) return;

    // Dream Nail
    if (item.id === 'dreamNail') {
        if (item.classList.contains('disabled')) {
            item.classList.remove('disabled');
            if (typeof marcarPrimerPasoDreamNail === 'function') marcarPrimerPasoDreamNail(true);
            if (typeof playDreamActivate === 'function') playDreamActivate();
        } else if (typeof ejecutarAccionDreamNail === 'function') {
            ejecutarAccionDreamNail();
        }
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }

    // God Tuner
    if (item.id === 'godT') {
        if (item.classList.contains('disabled')) {
            item.classList.remove('disabled');
            if (typeof marcarPrimerPasoGodTuner === 'function') marcarPrimerPasoGodTuner(true);
            if (typeof playGodActivate === 'function') playGodActivate();
            if (typeof dispararBurstGodTuner === 'function') dispararBurstGodTuner();
        } else if (typeof ejecutarAccionGodTuner === 'function') {
            ejecutarAccionGodTuner();
        }
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }

    // Grimmchild — ciclo limpio: dormido → activo → carefree → dormido
    if (item.id === 'grimmchild') {
        const status   = item.getAttribute('data-status') || 'dormido';
        const nkg      = document.querySelector('img[alt="NKG"]');
        const nameSpan = document.getElementById('name-grimmchild');

        if (status === 'dormido') {
            item.classList.remove('disabled');
            item.setAttribute('data-status', 'activo');
            mostrarToastGrimm();
            if (typeof playCharm === 'function') playCharm();
        } else if (status === 'activo') {
            item.src = "svg/charms/Carefree_Melody.webp";
            item.setAttribute('data-status', 'carefree');
            if (nameSpan) nameSpan.innerText = "Carefree Melody";
            ocultarToastGrimm();
            if (nkg) { nkg.classList.remove('disabled'); nkg.setAttribute('data-nkg-locked', 'true'); }
            if (typeof playCharm === 'function') playCharm();
        } else {
            // carefree → dormido
            item.src = "svg/charms/Grimmchild.webp";
            item.setAttribute('data-status', 'dormido');
            item.classList.add('disabled');
            if (nameSpan) nameSpan.innerText = "Grimmchild";
            if (nkg) { nkg.removeAttribute('data-nkg-locked'); nkg.classList.add('disabled'); }
            if (typeof playCharm === 'function') playCharm();
        }
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }

    // NKG
    if (item.alt === 'NKG') {
        if (item.getAttribute('data-nkg-locked') === 'true') return;
        item.classList.toggle('disabled');
        if (typeof playBossSound === 'function') playBossSound();
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }

    // Dreamers
    if (['monomon', 'lurien', 'herrah'].includes(item.id)) {
        const isActivo = item.getAttribute('data-dreamer-active') === 'true';

        if (isActivo) {
            item.setAttribute('data-dreamer-active', 'false');
            item.classList.add('disabled');
            if (typeof dispararChispasDreamer === 'function') dispararChispasDreamer(item.id);
            if (typeof playDreamFail === 'function') playDreamFail();
        } else {
            item.setAttribute('data-dreamer-active', 'true');
            item.classList.remove('disabled');
            if (typeof playDreamer === 'function') playDreamer(item.id);
        }
        
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }
    
    // Nail Arts
    if (['cyclone', 'dashA', 'Great'].includes(item.id)) {
        item.classList.toggle('disabled');
        if (typeof playUIButton === 'function') playUIButton();
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }

    // Skills y coliseos
    if (item.closest('.skills-grid, .colosseums-row')) {
        item.classList.toggle('disabled');
        if (typeof playUIButton === 'function') playUIButton();
        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        return;
    }

    // Amuletos y Jefes
    item.classList.toggle('disabled');
    if (item.closest('.boss-grid-layout')) {
        if (typeof playBossSound === 'function') playBossSound();
    } else {
        if (typeof playCharm === 'function') playCharm();
    }
    if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
});

document.addEventListener('change', (event) => {
    const cb = event.target.closest('.dream-task');
    if (cb && typeof playDreamSelect === 'function') { playDreamSelect(); return; }
    const gt = event.target.closest('.task-checkbox');
    if (gt && gt.closest('#godtuner-panel') && typeof playGodSelect === 'function') playGodSelect();
});

document.addEventListener('mouseover', (event) => {
    if (!event.target.closest('#modal-yes')) return;
    const eyes = document.getElementById('shade-lord-container');
    if (eyes) eyes.classList.add('suspicious');
});
document.addEventListener('mouseout', (event) => {
    if (!event.target.closest('#modal-yes')) return;
    const eyes = document.getElementById('shade-lord-container');
    if (eyes) eyes.classList.remove('suspicious');
});

(function iniciarParpadeoOjos() {
    const parpadear = () => {
        const eyes = document.getElementById('shade-lord-container');
        if (eyes) { eyes.classList.add('blinking'); setTimeout(() => eyes.classList.remove('blinking'), 300); }
        setTimeout(parpadear, Math.random() * 4000 + 2000);
    };
    document.addEventListener('DOMContentLoaded', () => setTimeout(parpadear, 3000));
})();
