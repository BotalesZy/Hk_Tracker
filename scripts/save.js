/* ==========================================================================
   SAVE.JS — Guardado y carga de progreso en localStorage
   ========================================================================== */

const SAVE_KEY = 'hkTracker_save';

/* ==========================================================================
   GUARDAR
   ========================================================================== */
window.guardarProgreso = function() {
    const save = {};

    // ── Aguijón ────────────────────────────────────────────────────────────
    save.nivelAguijon = window.nivelAguijon || 0;

    // ── Magias ─────────────────────────────────────────────────────────────
    save.spells = {};
    ['spellTopLeft', 'spellTopRight', 'spellBottom'].forEach(id => {
        const el = document.getElementById(id);
        if (el) save.spells[id] = { state: el.getAttribute('data-state'), src: el.src };
    });

    // ── Grimmchild ─────────────────────────────────────────────────────────
    const grimm = document.getElementById('grimmchild');
    if (grimm) {
        save.grimmchild = {
            status: grimm.getAttribute('data-status') || 'dormido',
            src:    grimm.src,
            disabled: grimm.classList.contains('disabled')
        };
    }

    // ── NKG ────────────────────────────────────────────────────────────────
    const nkg = document.querySelector('img[alt="NKG"]');
    if (nkg) {
        save.nkg = {
            disabled: nkg.classList.contains('disabled'),
            locked:   nkg.getAttribute('data-nkg-locked') || null
        };
    }

    // ── Dreamers ───────────────────────────────────────────────────────────
    save.dreamers = {};
    ['monomon', 'lurien', 'herrah'].forEach(id => {
        const el = document.getElementById(id);
        if (el) save.dreamers[id] = {
            active:   el.getAttribute('data-dreamer-active') || 'false',
            disabled: el.classList.contains('disabled')
        };
    });

    // ── Interactive items (charms, bosses, skills, coliseos, nail arts) ────
    save.interactiveItems = {};
    document.querySelectorAll('.interactive-item').forEach(el => {
        const key = el.id || el.alt || el.src;
        if (key) save.interactiveItems[key] = {
            disabled: el.classList.contains('disabled'),
            src:      el.src || null
        };
    });

    // ── Checkboxes de paneles ──────────────────────────────────────────────
    save.checkboxes = {};
    document.querySelectorAll('.task-checkbox').forEach(cb => {
        if (cb.id) save.checkboxes[cb.id] = cb.checked;
    });

    // ── Máscaras y Vessels (imágenes) ──────────────────────────────────────
    const mask = document.getElementById('mask');
    if (mask) save.maskSrc = mask.src;

    const vessel = document.getElementById('vessle');
    if (vessel) save.vesselSrc = vessel.src;

    // ── Nail src ───────────────────────────────────────────────────────────
    const nail = document.getElementById('nail');
    if (nail) save.nailSrc = nail.src;

    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
};

/* ==========================================================================
   CARGAR
   ========================================================================== */
window.cargarProgreso = function() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return; // No hay save, empezar limpio

    let save;
    try { save = JSON.parse(raw); }
    catch (e) { console.warn('HK Tracker: save corrupto, ignorando.'); return; }

    // ── Aguijón ────────────────────────────────────────────────────────────
    if (save.nivelAguijon !== undefined) {
        window.nivelAguijon = save.nivelAguijon;
        const nail = document.getElementById('nail');
        if (nail && save.nailSrc) nail.src = save.nailSrc;
    }

    // ── Magias ─────────────────────────────────────────────────────────────
    if (save.spells) {
        Object.entries(save.spells).forEach(([id, data]) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.setAttribute('data-state', data.state);
            if (data.src) el.src = data.src;
            el.classList.toggle('disabled', data.state === '0');
        });
    }

    // ── Grimmchild ─────────────────────────────────────────────────────────
    if (save.grimmchild) {
        const grimm = document.getElementById('grimmchild');
        if (grimm) {
            grimm.setAttribute('data-status', save.grimmchild.status);
            if (save.grimmchild.src) grimm.src = save.grimmchild.src;
            grimm.classList.toggle('disabled', save.grimmchild.disabled);
            // Actualizar nombre del span
            const nameSpan = document.getElementById('name-grimmchild');
            if (nameSpan) {
                nameSpan.innerText = save.grimmchild.status === 'carefree' ? 'Carefree Melody' : 'Grimmchild';
            }
        }
    }

    // ── NKG ────────────────────────────────────────────────────────────────
    if (save.nkg) {
        const nkg = document.querySelector('img[alt="NKG"]');
        if (nkg) {
            nkg.classList.toggle('disabled', save.nkg.disabled);
            if (save.nkg.locked) nkg.setAttribute('data-nkg-locked', save.nkg.locked);
            else nkg.removeAttribute('data-nkg-locked');
        }
    }

    // ── Dreamers ───────────────────────────────────────────────────────────
    if (save.dreamers) {
        Object.entries(save.dreamers).forEach(([id, data]) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.setAttribute('data-dreamer-active', data.active);
            el.classList.toggle('disabled', data.disabled);
        });
    }

    // ── Interactive items ──────────────────────────────────────────────────
    if (save.interactiveItems) {
        document.querySelectorAll('.interactive-item').forEach(el => {
            const key = el.id || el.alt || el.src;
            const data = save.interactiveItems[key];
            if (!data) return;
            el.classList.toggle('disabled', data.disabled);
            // Solo restaurar src si no es dreamer/grimm (ya restaurados arriba)
            if (data.src && !['monomon','lurien','herrah','grimmchild'].includes(el.id)) {
                el.src = data.src;
            }
        });
    }

    // ── Checkboxes ─────────────────────────────────────────────────────────
    if (save.checkboxes) {
        Object.entries(save.checkboxes).forEach(([id, checked]) => {
            const cb = document.getElementById(id);
            if (cb) cb.checked = checked;
        });
    }

    // ── Máscaras y Vessels ─────────────────────────────────────────────────
    const mask = document.getElementById('mask');
    if (mask && save.maskSrc) mask.src = save.maskSrc;

    const vessel = document.getElementById('vessle');
    if (vessel && save.vesselSrc) vessel.src = save.vesselSrc;

    // Actualizar porcentaje tras cargar
    if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
};

/* ==========================================================================
   BORRAR SAVE (lo llama el Clear Tracker)
   ========================================================================== */
window.borrarSave = function() {
    localStorage.removeItem(SAVE_KEY);
};

/* ==========================================================================
   AUTO-SAVE — Se engancha a actualizarPorcentaje
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Cargar al iniciar
    cargarProgreso();

    // Guardar en cada cambio — sobrescribir actualizarPorcentaje para agregar el save
    const _actualizarOriginal = window.actualizarPorcentaje;
    window.actualizarPorcentaje = function() {
        if (_actualizarOriginal) _actualizarOriginal();
        guardarProgreso();
    };
});
