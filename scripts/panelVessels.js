document.addEventListener('DOMContentLoaded', () => {
    const vesselImg        = document.getElementById('vessle');
    const vesselPanel      = document.getElementById('vessel-panel');
    const minimizeVesselBtn = document.getElementById('minimize-vessel-btn');

    // ── Abrir / Cerrar ─────────────────────────────────────────────────────
    function abrirPanelVessel() {
        vesselPanel.classList.remove('hidden', 'animate-scale-out');
        void vesselPanel.offsetWidth;
        vesselPanel.classList.add('animate-scale-in');
    }

    window.cerrarPanelVessels = function() {
        if (vesselPanel.classList.contains('hidden')) return;
        vesselPanel.classList.remove('animate-scale-in');
        vesselPanel.classList.add('animate-scale-out');
        vesselPanel.addEventListener('animationend', function handler() {
            vesselPanel.classList.add('hidden');
            vesselPanel.classList.remove('animate-scale-out');
            vesselPanel.removeEventListener('animationend', handler);
        }, { once: true });
    };

    if (vesselImg) {
        vesselImg.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            abrirPanelVessel(); 
        });
    }
    
    if (minimizeVesselBtn) {
        minimizeVesselBtn.addEventListener('click', (e) => { 
            e.stopPropagation(); 
            window.cerrarPanelVessels(); 
        });
    }

    // Cerrar si se hace clic en cualquier otra parte fuera del cuadro del panel
    document.addEventListener('click', (e) => {
        if (!vesselPanel.classList.contains('hidden')) {
            // Si el clic NO se originó dentro del panel ni sobre el botón que lo abre
            if (!vesselPanel.contains(e.target) && e.target !== vesselImg) {
                window.cerrarPanelVessels();
            }
        }
    });

    // ── Actualizar imagen + sonido + animación ─────────────────────────────
    window.actualizarImagenVessel = function() {
        if (!vesselImg) return;
        const checkboxes = vesselPanel.querySelectorAll('.vessel-fragment-task');
        const marcados   = Array.from(checkboxes).filter(cb => cb.checked).length;

        let src;
        if      (marcados < 3) src = "svg/inv/Sec 1/MVD/vessle/Ve1.svg";
        else if (marcados < 6) src = "svg/inv/Sec 1/MVD/vessle/Ve2.svg";
        else if (marcados < 9) src = "svg/inv/Sec 1/MVD/vessle/Ve3.svg";
        else                   src = "svg/inv/Sec 1/MVD/vessle/Vessel.png";

        vesselImg.src = src;

        // Sonido y animación SOLO en umbrales exactos de cambio
        if ([3, 6].includes(marcados)) {
            if (typeof animarProgresoVessel === 'function') animarProgresoVessel('vessle');
            if (typeof playVesselSound       === 'function') playVesselSound(false, 'vessle');
        } else if (marcados === 9) {
            if (typeof animarCompletoVessel === 'function') animarCompletoVessel('vessle');
            if (typeof playVesselSound       === 'function') playVesselSound(true, 'vessle');
            
            // Cierre automático al conseguir la forma final
            window.cerrarPanelVessels();
        }

        if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
    };

    vesselPanel.addEventListener('change', (e) => {
        if (e.target.classList.contains('vessel-fragment-task')) {
            window.actualizarImagenVessel();
        }
    });
});