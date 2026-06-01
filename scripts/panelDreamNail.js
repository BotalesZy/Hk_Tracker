// panelDreamnail.js

document.addEventListener('DOMContentLoaded', () => {
    const dreamNailPanel = document.getElementById('dreamnail-panel');
    const minimizeDreamBtn = document.getElementById('minimize-dream-btn');
    const dreamNailImgElement = document.getElementById('dreamNail');

    // Obtener los 3 checkboxes en orden estricto después de que se hayan generado en el DOM
    const dreamCheckboxes = document.querySelectorAll('#dreamnail-panel .dream-task');
    const chkAcquire = dreamCheckboxes[0]; // Primer paso: Adquirir
    const chkAwaken = dreamCheckboxes[1];  // Segundo paso: 1800 esencias (Awaken)
    const chkSeer = dreamCheckboxes[2];

    // ── LÓGICA VISUAL: Cambiar imagen según las 1800 esencias (Silencioso) ──
    function actualizarImagenDreamNail() {
        if (!dreamNailImgElement || !chkAwaken) return;

        // Rutas de tus imágenes
        const srcNormal = "svg/inv/Sec 1/MVD/dream/Dream_Nail.webp"; 
        const srcAwoken = "svg/inv/Sec 1/MVD/dream/Awoken.webp";

        if (chkAwaken.checked) {
            dreamNailImgElement.src = srcAwoken;
        } else {
            dreamNailImgElement.src = srcNormal;
        }
    }

    // Función para abrir el panel fluidamente
    window.ejecutarAccionDreamNail = function() {
        if (!dreamNailPanel) return;
        dreamNailPanel.classList.remove('hidden', 'animate-scale-out');
        void dreamNailPanel.offsetWidth; // Forzar reflow
        dreamNailPanel.classList.add('animate-scale-in');
    };

    // Función para cerrar el panel fluidamente
    window.cerrarPanelDreamNail = function() {
        if (!dreamNailPanel || dreamNailPanel.classList.contains('hidden')) return;

        dreamNailPanel.classList.remove('animate-scale-in');
        dreamNailPanel.classList.add('animate-scale-out');
        
        dreamNailPanel.addEventListener('animationend', function handler() {
            dreamNailPanel.classList.add('hidden');
            dreamNailPanel.classList.remove('animate-scale-out');
            dreamNailPanel.removeEventListener('animationend', handler);
        }, { once: true });
    };

    // REGLA 2: Permitir que items.js marque la primera casilla externamente
    window.marcarPrimerPasoDreamNail = function(estado) {
        if (chkAcquire) {
            chkAcquire.checked = estado;
            chkAcquire.dispatchEvent(new Event('change'));
        }
    };

    // REGLA 3: Monitorear los cambios en los checkboxes del panel
    if (chkAcquire) {
        chkAcquire.addEventListener('change', () => {
            // Si el usuario desmarca la primera opción ("Acquire the Dream Nail")
            if (!chkAcquire.checked) {
                
                // ── NUEVO: Sonido al quitar el Dream Nail y Bruma Inversa ──
                if (typeof playDreamFail === 'function') {
                    playDreamFail(); // Suena el fail.mp3
                } else if (typeof HKSounds !== 'undefined' && HKSounds.dreamFail) {
                    // O si usas el objeto global de Howler directamente
                    HKSounds.dreamFail.play();
                }

                // Las partículas colapsan hacia adentro
                if (typeof dispararBrumaInversaDreamNail === 'function') {
                    window.dispararBrumaInversaDreamNail(); 
                }

                // 1. Limpiar/Desmarcar todas las demás opciones de esencias
                if (chkAwaken) chkAwaken.checked = false;
                if (chkSeer) chkSeer.checked = false;
                
                // 2. Volver a poner el ícono del inventario principal en modo "disabled" (opaco)
                if (dreamNailImgElement) {
                    dreamNailImgElement.classList.add('disabled');
                }
                
                // Actualizamos la variable de estado global del juego
                if (typeof dreamNailActivo !== 'undefined') {
                    dreamNailActivo = false;
                }
                
                // Actualizar el porcentaje del juego para restar las 3 opciones limpiadas
                if (typeof actualizarPorcentaje === 'function') {
                    actualizarPorcentaje();
                }

                // Resetear la imagen al estado normal
                actualizarImagenDreamNail();
                
                // 3. Cerrar inmediatamente el glass panel de forma fluida
                cerrarPanelDreamNail();
            } else {
                // Si lo activan (ya sea desde el panel o externamente desde items.js)
                if (dreamNailImgElement) dreamNailImgElement.classList.remove('disabled');
                if (typeof dreamNailActivo !== 'undefined') dreamNailActivo = true;
                if (typeof actualizarPorcentaje === 'function') actualizarPorcentaje();
                
                // Evaluar si corresponde cambiar la imagen
                actualizarImagenDreamNail();

                // Cierre instantáneo + Audio + Bruma Espectral local por encima de todo
                window.cerrarPanelDreamNail();
                
                if (typeof playDreamActivate === 'function') {
                    playDreamActivate(); 
                }
                if (typeof dispararBrumaDreamNail === 'function') {
                    window.dispararBrumaDreamNail();
                }
            }
        });
    }

    // Monitorear cambios manuales en las opciones de esencia para recalcular porcentaje e imagen
    [chkAwaken, chkSeer].forEach(chk => {
        if (chk) {
            chk.addEventListener('change', (e) => {
                if (!chkAcquire.checked) {
                    e.preventDefault();
                    chk.checked = false;
                    alert("¡No puedes recolectar esencias sin poseer el Dream Nail primero!");
                    return;
                }
                
                // Si el cambio fue en el checkbox de 1800 esencias (Awaken)
                if (chk === chkAwaken) {
                    actualizarImagenDreamNail();

                    // EVENTO DE IMPACTO 1800: Disparar solo si el usuario acaba de marcar la casilla
                    if (chkAwaken.checked) {
                        // 1. Cerrar la pestaña inmediatamente
                        window.cerrarPanelDreamNail();

                        // 2. Ejecutar sonido y efectos visuales de Bruma Dream Nail en paralelo
                        if (typeof playDreamActivate === 'function') {
                            playDreamActivate();
                        }
                        if (typeof dispararBrumaDreamNail === 'function') {
                            window.dispararBrumaDreamNail();
                        }
                    }
                }

                // Actualizar el porcentaje global cada vez que se marque/desmarque una esencia
                if (typeof actualizarPorcentaje === 'function') {
                    actualizarPorcentaje();
                }
            });
        }
    });

    // Evento para el botón de minimizar (-)
    if (minimizeDreamBtn) {
        minimizeDreamBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            cerrarPanelDreamNail();
        });
    }

    // Cerrar si se hace clic fuera del cuadro del panel
    document.addEventListener('click', (e) => {
        if (dreamNailPanel && !dreamNailPanel.classList.contains('hidden')) {
            if (!dreamNailPanel.contains(e.target) && e.target !== dreamNailImgElement) {
                window.cerrarPanelDreamNail();
            }
        }
    });

    // Ejecutar una comprobación inicial al cargar el script
    actualizarImagenDreamNail();
});