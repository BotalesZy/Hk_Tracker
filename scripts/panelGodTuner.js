const godTunerPanel = document.getElementById('godtuner-panel');
const minimizePanelBtn = document.getElementById('minimize-panel-btn');

// 1. Obtener todos los checkboxes del panel en orden estricto
const godCheckboxes = document.querySelectorAll('#godtuner-panel .task-checkbox');
const chkGodhome = godCheckboxes[0]; // La primera opción "Find Godhome"
const godTunerImgElement = document.getElementById('godT');

// Función para abrir el panel fluidamente
function ejecutarAccionGodTuner() {
    godTunerPanel.classList.remove('hidden', 'animate-scale-out');
    void godTunerPanel.offsetWidth; // Forzar reflow
    godTunerPanel.classList.add('animate-scale-in');
}

// Función reutilizable para cerrar el panel con animación
function cerrarPanelGodTuner() {
    if (godTunerPanel.classList.contains('hidden')) return;

    godTunerPanel.classList.remove('animate-scale-in');
    godTunerPanel.classList.add('animate-scale-out');
    
    godTunerPanel.addEventListener('animationend', function handler() {
        godTunerPanel.classList.add('hidden');
        godTunerPanel.classList.remove('animate-scale-out');
        godTunerPanel.removeEventListener('animationend', handler);
    }, { once: true });
}

// REGLA: Permitir que items.js controle el estado del primer paso externamente
function marcarPrimerPasoGodTuner(estado) {
    if (chkGodhome) {
        chkGodhome.checked = estado;
        chkGodhome.dispatchEvent(new Event('change'));
    }
}

// 2. Monitorear los cambios en el checkbox "Find Godhome"
if (chkGodhome) {
    chkGodhome.addEventListener('change', () => {
        // Si el usuario desmarca la primera opción ("Find Godhome")
        if (!chkGodhome.checked) {
            
            // A) Limpiar y desmarcar todos los panteones
            godCheckboxes.forEach((chk, index) => {
                if (index > 0) chk.checked = false; 
            });
            
            // B) Volver a opacar el icono principal del God Tuner en el inventario
            if (godTunerImgElement) {
                godTunerImgElement.classList.add('disabled');
                
                // INTERACCIÓN VISUAL: Efecto de chispazo / Cortocircuito divino al apagar
                godTunerImgElement.style.animation = 'none'; // Reset
                void godTunerImgElement.offsetWidth;         // Reflow
                godTunerImgElement.style.animation = 'gtChispazoApagado 0.5s ease-out forwards';
            }
            
            // INTERACCIÓN SONORA: Disparar sonido de apagado desde sound.js
            if (typeof window.playGodOff === 'function') {
                window.playGodOff();
            }
            
            // C) Actualizar el porcentaje global restando todas las opciones limpiadas
            if (typeof actualizarPorcentaje === 'function') {
                actualizarPorcentaje();
            }
            
            // D) Cerrar inmediatamente el panel con su animación
            cerrarPanelGodTuner();

        } else {
            // Si lo vuelven a marcar manualmente desde adentro del panel abierto
            if (godTunerImgElement) {
                godTunerImgElement.classList.remove('disabled');

                // INTERACCIÓN VISUAL: Destello celestial dorado de encendido
                godTunerImgElement.style.animation = 'none'; // Reset
                void godTunerImgElement.offsetWidth;         // Reflow
                godTunerImgElement.style.animation = 'gtDestelloEncendido 0.6s ease-out forwards';
            }
            
            // INTERACCIÓN SONORA: Disparar sonido de encendido desde sound.js
            if (typeof window.playGodActivate === 'function') {
                window.playGodActivate();
            }

            if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
        }
    });
}

// 3. Monitorear cambios manuales en los Panteones para actualizar el porcentaje
godCheckboxes.forEach((chk, index) => {
    if (index > 0 && chk) {
        chk.addEventListener('change', (e) => {
            // Bloqueo de seguridad: No se puede marcar panteones si no tienes Godhome
            if (!chkGodhome.checked) {
                e.preventDefault();
                chk.checked = false;
                alert("¡No puedes registrar Panteones sin descubrir Godhome primero!");
                return;
            }
            
            // INTERACCIÓN SONORA: Sonido sutil de selección ("hit") al marcar panteones individuales
            if (chk.checked && typeof window.playGodSelect === 'function') {
                window.playGodSelect();
            }
            
            // Cada vez que marques o desmarques un panteón individual, se actualiza el porcentaje global
            if (typeof actualizarPorcentaje === 'function') {
                actualizarPorcentaje();
            }
        });
    }
});

// El botón de minimizar de la esquina del panel ejecuta el cierre normal
minimizePanelBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    cerrarPanelGodTuner();
});

// ── Cerrar si se hace clic fuera del cuadro del panel ──
document.addEventListener('click', (e) => {
    if (godTunerPanel && !godTunerPanel.classList.contains('hidden')) {
        // Si el clic NO se originó dentro del panel ni sobre la imagen original que lo abre
        if (!godTunerPanel.contains(e.target) && e.target !== godTunerImgElement) {
            cerrarPanelGodTuner();
        }
    }
});