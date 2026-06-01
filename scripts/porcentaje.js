// scripts/porcentaje.js

window.nivelAguijon = window.nivelAguijon || 0;

function actualizarPorcentaje() {
    let total = 0.00;

    // 1. Aguijón
    total += (window.nivelAguijon || 0);

    // 2. Magias
    const spellTopLeft  = document.getElementById('spellTopLeft');
    const spellTopRight = document.getElementById('spellTopRight');
    const spellBottom   = document.getElementById('spellBottom');
    if (spellTopLeft)  total += parseInt(spellTopLeft.getAttribute('data-state'),  10) || 0;
    if (spellTopRight) total += parseInt(spellTopRight.getAttribute('data-state'), 10) || 0;
    if (spellBottom)   total += parseInt(spellBottom.getAttribute('data-state'),   10) || 0;

    // 3. Items interactivos activos — EXCLUYE dreamers (se cuentan aparte)
    const itemsActivos = document.querySelectorAll(
        '.interactive-item:not(#dreamNail):not(#godT):not(.disabled):not(#monomon):not(#lurien):not(#herrah)'
    );
    itemsActivos.forEach(item => {
        const val = item.hasAttribute('data-percentage')
            ? parseInt(item.getAttribute('data-percentage'), 10) : 1;
        total += val;
    });

    // 4. Dreamers — cuentan por data-dreamer-active="true" (visualmente siempre activos)
    document.querySelectorAll('#monomon, #lurien, #herrah').forEach(dreamer => {
        if (dreamer.getAttribute('data-dreamer-active') === 'true') {
            total += 1;
        }
    });

    // 5. God Tuner y Dream Nail checkboxes
    const checkboxesEspeciales = document.querySelectorAll(
        '#godtuner-panel .task-checkbox:checked, #dreamnail-panel .task-checkbox:checked'
    );
    checkboxesEspeciales.forEach(chk => {
        const val = chk.hasAttribute('data-percentage')
            ? parseFloat(chk.getAttribute('data-percentage')) : 0;
        total += val;
    });

    // 6. Máscaras (+0.25 cada una)
    const mascaras = document.querySelectorAll('.mask-shard-task:checked').length;
    total += mascaras * 0.25;

    // 7. Vasijas (cada 3 = 1%)
    const vasijas = document.querySelectorAll('.vessel-fragment-task:checked').length;
    total += vasijas / 3;

    // 8. Renderizar
    const el = document.getElementById('completion-value');
    if (el) {
        const fijo = parseFloat(total.toFixed(2));
        el.textContent = Number.isInteger(fijo) ? fijo : total.toFixed(2);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('change', (e) => {
        if (e.target && e.target.classList.contains('task-checkbox')) {
            actualizarPorcentaje();
        }
    });
});