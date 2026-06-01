document.addEventListener('DOMContentLoaded', () => {
    const maskImg         = document.getElementById('mask');
    const maskPanel       = document.getElementById('mask-panel');
    const minimizeMaskBtn = document.getElementById('minimize-mask-btn');

    // ── Abrir / Cerrar ─────────────────────────────────────────────────────
    function abrirPanelMask() {
        maskPanel.classList.remove('hidden', 'animate-scale-out');
        void maskPanel.offsetWidth;
        maskPanel.classList.add('animate-scale-in');
    }

    window.cerrarPanelMask = function() {
        if (maskPanel.classList.contains('hidden')) return;
        maskPanel.classList.remove('animate-scale-in');
        maskPanel.classList.add('animate-scale-out');
        maskPanel.addEventListener('animationend', function handler() {
            maskPanel.classList.add('hidden');
            maskPanel.classList.remove('animate-scale-out');
            maskPanel.removeEventListener('animationend', handler);
        }, { once: true });
    };

    if (maskImg) {
        maskImg.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            abrirPanelMask(); 
        });
    }
    
    if (minimizeMaskBtn) {
        minimizeMaskBtn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            window.cerrarPanelMask(); 
        });
    }

    // Cerrar si se hace clic en cualquier otra parte fuera del cuadro del panel
    document.addEventListener('click', (e) => {
        if (!maskPanel.classList.contains('hidden')) {
            // Si el clic NO se originó dentro del panel ni sobre el botón que lo abre
            if (!maskPanel.contains(e.target) && e.target !== maskImg) {
                window.cerrarPanelMask();
            }
        }
    });

    // ── Actualizar imagen + sonido + animación ─────────────────────────────
    window.actualizarImagenMask = function() {
        if (!maskImg) return;
        const checkboxes = maskPanel.querySelectorAll('.mask-shard-task');
        const marcados   = Array.from(checkboxes).filter(cb => cb.checked).length;

        let src;
        if      (marcados < 4)  src = "svg/inv/Sec 1/MVD/mask/mascara1.svg";
        else if (marcados < 8)  src = "svg/inv/Sec 1/MVD/mask/mascara2.svg";
        else if (marcados < 12) src = "svg/inv/Sec 1/MVD/mask/mascara3.svg";
        else if (marcados < 16) src = "svg/inv/Sec 1/MVD/mask/mascara4.svg";
        else                    src = "svg/inv/Sec 1/MVD/mask/Mask.png";

        maskImg.src = src;

        // Sonido y animación SOLO en umbrales exactos de cambio
        if ([4, 8, 12].includes(marcados)) {
            if (typeof animarProgresoMask === 'function') animarProgresoMask('mask');
            if (typeof playMaskSound       === 'function') playMaskSound(false, 'mask');
        } else if (marcados === 16) {
            if (typeof animarCompletoMask === 'function') animarCompletoMask('mask');
            if (typeof playMaskSound       === 'function') playMaskSound(true, 'mask');
            
            // Cierre automático al conseguir la forma final
            window.cerrarPanelMask();
        }

        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
    };

    maskPanel.addEventListener('change', (e) => {
        if (e.target.classList.contains('mask-shard-task')) {
            window.actualizarImagenMask();
        }
    });
});