/* ==========================================================================
   SOUNDS.JS — Manejo de audio (Howler.js) y Animaciones limpias (Anime.js)
   ========================================================================== */

const HKSounds = {
    // ── Máscaras y Vessels ─────────────────────────────────────────────────
    maskProgress:    new Howl({ src: ['SE/hv/hvInicio.mp3'],    volume: 0.6 }),
    maskComplete:    new Howl({ src: ['SE/hv/hvSalida.mp3'],    volume: 0.8 }),

    // ── Aguijón (Nail) ─────────────────────────────────────────────────────
    nailUpgrade:     new Howl({ src: ['SE/nail/nailC.mp3'],     volume: 0.7 }),
    nailPenultimate: new Howl({ src: ['SE/nail/nailE.mp3'],     volume: 0.7 }), 
    nailReset:       new Howl({ src: ['SE/nail/nailB.mp3'],     volume: 0.7 }), 

    // ── Dream Nail ─────────────────────────────────────────────────────────
    dreamActivate:   new Howl({ src: ['SE/dream/dnailE.mp3'],   volume: 0.7 }),
    dreamSelect:     new Howl({ src: ['SE/dream/dnailO.mp3'],   volume: 0.6 }),
    dreamFail:       new Howl({ src: ['SE/dream/fail.mp3'],     volume: 0.6 }),

    // ── God Tuner ──────────────────────────────────────────────────────────
    godActivate:     new Howl({ src: ['SE/god/gtE.mp3'],        volume: 0.5 }),
    godSelect:       new Howl({ src: ['SE/god/gtHit.mp3'],      volume: 0.3 }),
    godOff:          new Howl({ src: ['SE/god/gtC.mp3'],        volume: 0.6 }),

    // ── Interfaz y Comunes ─────────────────────────────────────────────────
    uiButton:        new Howl({ src: ['SE/ui/Button.mp3'],      volume: 0.5 }),
    bossSelect:      new Howl({ src: ['SE/ui/click.mp3'],       volume: 0.3 }), 
    clear:           new Howl({ src: ['SE/ui/clear.mp3'],       volume: 0.9 }),

    // ── Dreamers ───────────────────────────────────────────────────────────
    dreamer:         new Howl({ src: ['SE/d/dreamerH.mp3'],     volume: 0.8 }),

    // ── Amuletos ───────────────────────────────────────────────────────────
    charm:           new Howl({ src: ['SE/charm/cSound.mp3'],   volume: 0.6 }),

    // ── Magias ─────────────────────────────────────────────────────────────
    spellNormal:     new Howl({ src: ['SE/spells/spell N.mp3'], volume: 0.6 }),
    spellVoid:       new Howl({ src: ['SE/spells/dSpell N.mp3'], volume: 0.8 }),

    // ── Nail Arts ──────────────────────────────────────────────────────────
    nailArt:         new Howl({ src: ['SE/ui/Button.mp3'],      volume: 0.6 }),
};

/* ==========================================================================
   FUNCIONES PÚBLICAS DE AUDIO Y DISPARADORES DE ANIMACIÓN
   ========================================================================== */

// ── Máscaras ──────────────────────────────────────────────────────────────
window.playMaskSound = function(esFinal, elementId) {
    const targetId = elementId || 'mask';
    if (esFinal) {
        window.animarCompletoMask(targetId);
    } else {
        window.animarProgresoMask(targetId);
    }
    HKSounds.maskProgress.play();
};

// ── Vessels ───────────────────────────────────────────────────────────────
window.playVesselSound = function(esFinal, elementId) {
    const targetId = elementId || 'vessle';
    if (esFinal) {
        window.animarCompletoVessel(targetId);
    } else {
        window.animarProgresoVessel(targetId);
    }
    HKSounds.maskProgress.play();
};

// ── Aguijón Dinámico ──────────────────────────────────────────────────────
window.playNailSound = function(estadoActual, totalEstados) { 
    if (estadoActual === 0) {
        HKSounds.nailReset.play(); 
        if (typeof window.animarRoturaNail === 'function') window.animarRoturaNail();
    } else if (estadoActual === 4) {
        HKSounds.nailPenultimate.play();
        if (typeof window.animarMejoraNail === 'function') window.animarMejoraNail(true); 
    } else {
        HKSounds.nailUpgrade.play(); 
        if (typeof window.animarMejoraNail === 'function') window.animarMejoraNail(false);
    }
};

// ── Dream Nail ────────────────────────────────────────────────────────────
window.playDreamActivate = function() { 
    HKSounds.dreamActivate.play(); 
    if (typeof window.dispararBrumaDreamNail === 'function') window.dispararBrumaDreamNail();
};
window.playDreamSelect   = function() { HKSounds.dreamSelect.play(); };
window.playDreamFail     = function() { HKSounds.dreamFail.play(); }; 

// ── God Tuner ─────────────────────────────────────────────────────────────
window.playGodActivate = function() { 
    HKSounds.godActivate.play(); 
    if (typeof window.dispararBurstGodTuner === 'function') window.dispararBurstGodTuner();
};
window.playGodSelect   = function() { HKSounds.godSelect.play(); };

window.playGodOff      = function() { 
    HKSounds.godOff.play(); 
    if (typeof window.dispararApagadoGodTuner === 'function') window.dispararApagadoGodTuner();
};

// ── Items e Interfaz ──────────────────────────────────────────────────────
window.playUIButton  = function() { HKSounds.uiButton.play(); };
window.playBossSound = function() { HKSounds.bossSelect.play(); };
window.playClear     = function() { HKSounds.clear.play(); };
window.playCharm     = function() { HKSounds.charm.play(); };
window.playNailArtSound = function() { HKSounds.nailArt.play(); };

// ── Dreamers ──────────────────────────────────────────────────────────────
window.playDreamer = function(elementId) { 
    HKSounds.dreamer.play(); 
    if (elementId && typeof window.dispararOndaDreamer === 'function') {
        window.dispararOndaDreamer(elementId);
    }
};

// ── Magias ────────────────────────────────────────────────────────────────
window.playSpellSound = function(spellId, state) {
    if (state === 0) return;
    const sounds = [HKSounds.spellNormal, HKSounds.spellVoid];
    sounds[state - 1].play();

    const spellEl = document.getElementById(spellId);
    if (spellEl && typeof window.animarMagia === 'function') {
        window.animarMagia(spellEl, state === 2);
    }
};


/* ==========================================================================
   SISTEMA DE ANIMACIONES INDEPENDIENTES (Anime.js)
   ========================================================================== */

// ── FLUX MASK: PROGRESO ───────────────────────────────────────────────────
window.animarProgresoMask = function(elementId) {
    let el = document.getElementById(elementId);
    if (!el) return;
    if (el.parentElement) el = el.parentElement;

    anime.remove(el);
    anime.set(el, { translateX: 0, rotateY: 0, filter: 'brightness(1)' });

    anime({
        targets: el,
        translateX: [
            { value: 6,  duration: 40 }, { value: -6, duration: 40 },
            { value: 5,  duration: 40 }, { value: -5, duration: 40 },
            { value: 4,  duration: 40 }, { value: -4, duration: 40 },
            { value: 2,  duration: 40 }, { value: 0,  duration: 40 }
        ],
        filter: [
            { value: 'brightness(1.4)', duration: 100, easing: 'easeOutQuad' },
            { value: 'brightness(1)',   duration: 220, easing: 'easeInQuad' }
        ],
        easing: 'linear'
    });
};

// ── FLUX MASK: COMPLETO ───────────────────────────────────────────────────
window.animarCompletoMask = function(elementId) {
    let el = document.getElementById(elementId);
    if (!el) return;
    if (el.parentElement) el = el.parentElement;

    anime.remove(el);
    anime.set(el, { translateX: 0, rotateY: 0, filter: 'brightness(1)' });

    const tl = anime.timeline({ targets: el });
    tl.add({
        translateX: [
            { value: 8,  duration: 45 }, { value: -8, duration: 45 },
            { value: 7,  duration: 45 }, { value: -7, duration: 45 },
            { value: 6,  duration: 45 }, { value: -6, duration: 45 },
            { value: 4,  duration: 45 }, { value: -4, duration: 45 },
            { value: 2,  duration: 45 }, { value: 0,  duration: 45 }
        ],
        easing: 'linear'
    });

    HKSounds.maskProgress.once('end', () => {
        HKSounds.maskComplete.play();
        anime({
            targets: el,
            rotateY: { value: 360, duration: 950, easing: 'easeInOutCubic' },
            filter: [
                { value: 'brightness(2.2)', duration: 475, easing: 'easeOutQuad' },
                { value: 'brightness(1)',   duration: 475, easing: 'easeInQuad' }
            ],
            complete: () => anime.set(el, { translateX: 0, rotateY: 0, filter: 'brightness(1)' })
        });
    });
};

window.animarProgresoVessel = function(elementId) {
    const wrapper = document.getElementById('vessle-wrapper');
    if (!wrapper) return;
    anime.remove(wrapper);
    anime.set(wrapper, { translateX: 0, filter: 'brightness(1)' });
    anime({
        targets: wrapper,
        translateX: [
            { value:  6, duration: 40 }, { value: -6, duration: 40 },
            { value:  5, duration: 40 }, { value: -5, duration: 40 },
            { value:  4, duration: 40 }, { value: -4, duration: 40 },
            { value:  2, duration: 40 }, { value:  0, duration: 40 }
        ],
        filter: [
            { value: 'brightness(1.6)', duration: 100, easing: 'easeOutQuad' },
            { value: 'brightness(1)',   duration: 300, easing: 'easeInQuad'  }
        ],
        easing: 'linear'
    });
};

// ── FLUX VESSEL: COMPLETO (¡VIBRACIÓN COMPLETA REFORZADA 2X!) ─────────────
window.animarCompletoVessel = function(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    anime.remove(el);
    anime.set(el, { translateX: 0, rotateY: 0, filter: 'brightness(1)' });

    const tl = anime.timeline({ targets: el });
    tl.add({
        translateX: [
            { value: 22,  duration: 35 }, { value: -22, duration: 35 },
            { value: 18,  duration: 35 }, { value: -18, duration: 35 },
            { value: 16,  duration: 35 }, { value: -16, duration: 35 },
            { value: 14,  duration: 35 }, { value: -14, duration: 35 },
            { value: 11,  duration: 35 }, { value: -11, duration: 35 },
            { value: 8,   duration: 35 }, { value: -8,  duration: 35 },
            { value: 5,   duration: 35 }, { value: -5,  duration: 35 },
            { value: 2,   duration: 35 }, { value: 0,   duration: 35 }
        ],
        easing: 'linear'
    });

    HKSounds.maskProgress.once('end', () => {
        HKSounds.maskComplete.play();
        anime({
            targets: el,
            rotateY: { value: 360, duration: 950, easing: 'easeInOutCubic' },
            filter: [
                { value: 'brightness(2.4)', duration: 475, easing: 'easeOutQuad' },
                { value: 'brightness(1)',   duration: 475, easing: 'easeInQuad' }
            ],
            complete: () => anime.set(el, { translateX: 0, rotateY: 0, filter: 'brightness(1)' })
        });
    });
};

// ── DREAM NAIL: EXPLOSIÓN DE BRUMA (ACTIVACIÓN) ───────────────────────────
window.dispararBrumaDreamNail = function() {
    const targetImg = document.getElementById('dreamNail');
    if (!targetImg) return;
    
    const rect = targetImg.getBoundingClientRect();
    const centroX = rect.left + (rect.width / 2);
    const centroY = rect.top + (rect.height / 2);

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:visible;';
    document.body.appendChild(overlay);

    const cantidadNubes = 16;
    const nubes = [];

    for (let i = 0; i < cantidadNubes; i++) {
        const nube = document.createElement('div');
        nube.style.cssText = [
            'position:absolute',
            `left:${centroX}px`, `top:${centroY}px`,
            `width:${Math.random() * 30 + 40}px`, `height:${Math.random() * 30 + 40}px`,
            'background:radial-gradient(circle, rgba(245,225,255,0.85) 0%, rgba(200,150,255,0.35) 45%, rgba(255,255,255,0) 75%)',
            'border-radius:50%',
            `filter:blur(${Math.random() * 4 + 8}px)`,
            'transform:translate(-50%, -50%) scale(0.1)',
            'opacity:0'
        ].join(';');

        overlay.appendChild(nube);
        nubes.push(nube);
    }

    anime({
        targets: nubes,
        translateX: () => Math.random() * 110 - 55,
        translateY: () => Math.random() * 130 - 65,
        scale: [
            { value: 0.1, duration: 0 },
            { value: () => Math.random() * 0.6 + 1.8, duration: 450, easing: 'easeOutQuad' },
            { value: () => Math.random() * 0.4 + 2.8, duration: 1550, easing: 'linear' }
        ],
        opacity: [
            { value: 0, duration: 0 },
            { value: 0.9, duration: 120, easing: 'easeOutQuad' }, 
            { value: 0, duration: 1880, easing: 'easeOutCubic' }
        ],
        filter: [ { value: 'blur(8px)', duration: 400 }, { value: 'blur(28px)', duration: 1600, easing: 'linear' } ],
        delay: anime.stagger(20, {from: 'center'}), 
        complete: () => overlay.remove()
    });

    if (targetImg.parentElement) {
        anime({
            targets: targetImg.parentElement,
            translateX: [{value: 3, duration: 25}, {value: -3, duration: 25}, {value: 0, duration: 25}],
            translateY: [{value: 2, duration: 25}, {value: -2, duration: 25}, {value: 0, duration: 25}],
            easing: 'linear', iterations: 2
        });
    }
};

// ── DREAM NAIL: IMPLOSIÓN DE BRUMA (DESACTIVACIÓN) ────────────────────────
window.dispararBrumaInversaDreamNail = function() {
    const targetImg = document.getElementById('dreamNail');
    if (!targetImg) return;
    
    const rect = targetImg.getBoundingClientRect();
    const centroX = rect.left + (rect.width / 2);
    const centroY = rect.top + (rect.height / 2);

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:visible;';
    document.body.appendChild(overlay);

    const cantidadNubes = 12;
    const nubes = [];

    for (let i = 0; i < cantidadNubes; i++) {
        const nube = document.createElement('div');
        const angulo = Math.random() * Math.PI * 2;
        const distanciaX = (Math.random() * 45 + 35) * Math.cos(angulo);
        const distanciaY = (Math.random() * 55 + 45) * Math.sin(angulo);
        const tam = Math.random() * 25 + 35;
        
        nube.style.cssText = [
            'position:absolute',
            `left:${centroX + distanciaX}px`, `top:${centroY + distanciaY}px`,
            `width:${tam}px`, `height:${tam}px`,
            'background:radial-gradient(circle, rgba(210,180,255,0.7) 0%, rgba(150,110,220,0.2) 50%, rgba(255,255,255,0) 75%)',
            'border-radius:50%',
            `filter:blur(${Math.random() * 3 + 6}px)`,
            'transform:translate(-50%, -50%) scale(2.2)',
            'opacity:0.7'
        ].join(';');

        overlay.appendChild(nube);
        nubes.push(nube);
    }

    anime({
        targets: nubes,
        translateX: 0, 
        translateY: 0,
        scale: [
            { value: 2.2, duration: 0 },
            { value: 0.1, duration: 700, easing: 'easeInBack' } 
        ],
        opacity: [
            { value: 0.7, duration: 0 },
            { value: 0, duration: 700, easing: 'easeInCubic' }  
        ],
        filter: [ { value: 'blur(10px)', duration: 0 }, { value: 'blur(2px)', duration: 700, easing: 'easeInQuad' } ],
        delay: anime.stagger(25, {from: 'first'}), 
        complete: () => overlay.remove()
    });
};

// ── NAIL: CHISPAS AL MEJORAR ──────────────────────────────────────────────
window.animarMejoraNail = function(esMaximo) {
    const targetImg = document.getElementById('nail');
    if (!targetImg) return;
    
    const rect = targetImg.getBoundingClientRect();
    const centroX = rect.left + (rect.width / 2);
    const centroY = rect.top + (rect.height / 2);

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;';
    document.body.appendChild(overlay);

    const cantidadChispas = esMaximo ? 26 : 12;
    const chispas = [];

    if (esMaximo) {
        const shockwave = document.createElement('div');
        shockwave.style.cssText = `position:absolute;left:${centroX}px;top:${centroY}px;width:30px;height:30px;border:3px solid #ffffff;box-shadow:0 0 20px rgba(255,255,255,0.85);border-radius:50%;transform:translate(-50%, -50%) scale(0.2);`;
        overlay.appendChild(shockwave);

        anime({
            targets: shockwave,
            scale: 3.1, 
            opacity: 0,
            duration: 450,
            easing: 'easeOutExpo'
        });
    }

    for (let i = 0; i < cantidadChispas; i++) {
        const chispa = document.createElement('div');
        const dispersionX = esMaximo ? 22 : 16;
        const dispersionY = esMaximo ? 34 : 24;
        const sizeW = Math.random() * 2.5 + 2;
        const sizeH = esMaximo ? (Math.random() * 22 + 10) : (Math.random() * 12 + 6);
        const angulo = Math.random() * 360;

        chispa.style.cssText = [
            'position:absolute',
            `left:${centroX + (Math.random() * dispersionX - (dispersionX / 2))}px`,
            `top:${centroY + (Math.random() * dispersionY - (dispersionY / 2))}px`,
            `width:${sizeW}px`, `height:${sizeH}px`,
            `background-color:${esMaximo && Math.random() > 0.5 ? '#d2ebff' : '#ffffff'}`,
            'box-shadow:0 0 10px #ffffff, 0 0 18px rgba(160, 215, 255, 0.85)',
            'border-radius:50%',
            `transform:translate(-50%, -50%) rotate(${angulo}deg) scale(0.1)`
        ].join(';');

        overlay.appendChild(chispa);
        chispas.push(chispa);
    }

    anime({
        targets: targetImg,
        filter: esMaximo ? ['brightness(1)', 'brightness(3.5)', 'brightness(1)'] : ['brightness(1)', 'brightness(2.3)', 'brightness(1)'],
        scale: esMaximo ? [{value: 1.22, duration: 90}, {value: 1, duration: 250}] : [{value: 1.1, duration: 90}, {value: 1, duration: 180}],
        easing: 'easeOutQuad',
        duration: 320
    });

    anime({
        targets: chispas,
        translateY: () => -1 * (Math.random() * (esMaximo ? 105 : 55) + 35), 
        scale: [{value: esMaximo ? 1.6 : 1.4, duration: 90}, {value: 0, duration: esMaximo ? 420 : 350, easing: 'easeInQuad'}],
        opacity: [{value: 1, duration: 40}, {value: 0, duration: esMaximo ? 450 : 380, easing: 'linear'}],
        delay: anime.stagger(esMaximo ? 6 : 8),
        complete: () => overlay.remove()
    });
};

// ── NAIL: GRIETAS DE VIDRIO EXPANIDAS (CON DESVANECIMIENTO) ───────────────
window.animarRoturaNail = function() {
    const targetImg = document.getElementById('nail');
    if (!targetImg) return;
    
    const rect = targetImg.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;';
    document.body.appendChild(overlay);

    const grietasElementos = [];
    const lineasPrincipales = 12;

    for (let i = 0; i < lineasPrincipales; i++) {
        const anguloPrincipal = Math.random() * 360;
        const largoPrincipal = Math.random() * 30 + 20;
        const posX = rect.left + (Math.random() * rect.width);
        const posY = rect.top + (Math.random() * rect.height);

        const gPrincipal = document.createElement('div');
        gPrincipal.style.cssText = `position:absolute;left:${posX}px;top:${posY}px;width:${largoPrincipal}px;height:2px;background-color:#ffffff;box-shadow:0 0 6px #ffffff, 0 0 10px rgba(255,255,255,0.8);transform-origin:left center;transform:rotate(${anguloPrincipal}deg) scaleX(0.01);`;
        
        overlay.appendChild(gPrincipal);
        grietasElementos.push(gPrincipal);

        const cantidadSubdivisiones = Math.floor(Math.random() * 2) + 1; 

        for (let j = 0; j < cantidadSubdivisiones; j++) {
            const distEnLinea = largoPrincipal * (0.3 + (Math.random() * 0.5));
            const subX = posX + distEnLinea * Math.cos(anguloPrincipal * Math.PI / 180);
            const subY = posY + distEnLinea * Math.sin(anguloPrincipal * Math.PI / 180);
            const desvio = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 25 + 30);

            const gSub = document.createElement('div');
            gSub.style.cssText = `position:absolute;left:${subX}px;top:${subY}px;width:${Math.random() * 14 + 8}px;height:1px;background-color:#ffffff;box-shadow:0 0 4px #ffffff;transform-origin:left center;transform:rotate(${anguloPrincipal + desvio}deg) scaleX(0.01);`;

            overlay.appendChild(gSub);
            grietasElementos.push(gSub);
        }
    }

    anime({
        targets: targetImg,
        translateX: [{value: -7, duration: 40}, {value: 7, duration: 40}, {value: 0, duration: 40}],
        filter: ['brightness(0.5)', 'brightness(1.5)', 'brightness(1)'],
        easing: 'linear'
    });

    anime({
        targets: grietasElementos,
        scaleX: 1,
        duration: 180,
        easing: 'easeOutQuad',
        complete: () => {
            anime({
                targets: grietasElementos,
                opacity: 0,
                duration: 400,
                delay: 200, 
                easing: 'linear',
                complete: () => overlay.remove()
            });
        }
    });
};

// ── MAGIAS: PARTÍCULAS EXPANSIVAS ─────────────────────────────────────────
window.animarMagia = function(spellEl, esVoid) {
    if (!spellEl) return;

    const rect = spellEl.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:visible;';
    document.body.appendChild(overlay);

    const cantidad = esVoid ? 14 : 10;
    const color = esVoid
        ? 'radial-gradient(circle, rgba(60,0,80,0.95) 0%, rgba(20,0,40,0.6) 50%, transparent 75%)'
        : 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(200,230,255,0.5) 50%, transparent 75%)';
    const glow = esVoid ? '0 0 8px rgba(120,0,180,0.7)' : '0 0 8px rgba(255,255,255,0.7)';

    const particulas = [];

    for (let i = 0; i < cantidad; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 8 + 5;
        p.style.cssText = [
            'position:absolute',
            `left:${centroX}px`, `top:${centroY}px`,
            `width:${size}px`, `height:${size}px`,
            `background:${color}`, `box-shadow:${glow}`,
            'border-radius:50%',
            `filter:blur(${esVoid ? 2 : 1.5}px)`,
            'transform:translate(-50%,-50%) scale(0.1)',
            'opacity:0'
        ].join(';');
        overlay.appendChild(p);
        particulas.push(p);
    }

    anime({
        targets: particulas,
        translateX: () => (Math.random() - 0.5) * (esVoid ? 80 : 60),
        translateY: () => (Math.random() - 0.5) * (esVoid ? 80 : 60),
        scale: [
            { value: 0.1, duration: 0 },
            { value: () => Math.random() * 0.8 + 1.2, duration: 250, easing: 'easeOutQuad' },
            { value: 0,   duration: 300, easing: 'easeInQuad' }
        ],
        opacity: [
            { value: 0,   duration: 0   },
            { value: 0.9, duration: 80  },
            { value: 0,   duration: 470, easing: 'easeInCubic' }
        ],
        delay: anime.stagger(18),
        complete: () => overlay.remove()
    });
};

// ── DREAMERS: ANILLO EXPANSIVO ────────────────────────────────────────────
window.dispararOndaDreamer = function(elementId) {
    const targetImg = document.getElementById(elementId);
    if (!targetImg) return;

    const rect = targetImg.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:visible;';
    document.body.appendChild(overlay);

    const cantidad = 18;
    const radioMax = 110;
    const particulas = [];

    for (let i = 0; i < cantidad; i++) {
        const angulo = (i / cantidad) * Math.PI * 2;
        const p = document.createElement('div');
        const size = Math.random() * 15 + 30;
        p.style.cssText = [
            'position:absolute',
            `left:${centroX}px`, `top:${centroY}px`,
            `width:${size}px`, `height:${size}px`,
            'background:radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(220,240,255,0.6) 40%, rgba(255,255,255,0) 70%)',
            'box-shadow:0 0 12px rgba(255,255,255,0.5)',
            'border-radius:50%',
            'filter:blur(4px)',
            'transform:translate(-50%,-50%) scale(0.2)',
            'opacity:0.9'
        ].join(';');
        overlay.appendChild(p);
        particulas.push({
            el: p,
            targetX: Math.cos(angulo) * radioMax,
            targetY: Math.sin(angulo) * radioMax
        });
    }

    anime({
        targets: targetImg,
        scale: [{ value: 0.92, duration: 70 }, { value: 1, duration: 200 }],
        filter: ['brightness(1.6)', 'brightness(1)'],
        easing: 'easeOutQuad'
    });

    particulas.forEach(p => {
        anime({
            targets: p.el,
            translateX: p.targetX,
            translateY: p.targetY,
            scale: [{ value: 0.2, duration: 0 }, { value: 1.8, duration: 500, easing: 'easeOutQuad' }],
            opacity: [{ value: 0.9, duration: 50 }, { value: 0,   duration: 450, easing: 'easeInCubic' }],
            duration: 500,
            complete: () => { if (overlay.parentElement) overlay.remove(); }
        });
    });
};

// ── DREAMERS: CHISPAS DE DESACTIVACIÓN ────────────────────────────────────
window.dispararChispasDreamer = function(elementId) {
    const targetImg = document.getElementById(elementId);
    if (!targetImg) return;

    const rect = targetImg.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:visible;';
    document.body.appendChild(overlay);

    const chispas = [];

    for (let i = 0; i < 18; i++) {
        const c = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const offsetX = (Math.random() - 0.5) * rect.width * 1.2;
        const offsetY = (Math.random() - 0.5) * rect.height * 0.8;
        
        c.style.cssText = [
            'position:absolute',
            `left:${centroX + offsetX}px`, `top:${centroY + offsetY}px`,
            `width:${size}px`, `height:${size}px`,
            'background:#ffffff',
            'box-shadow:0 0 6px #ffffff, 0 0 10px rgba(200,220,255,0.8)',
            'border-radius:50%',
            'opacity:0'
        ].join(';');
        overlay.appendChild(c);
        chispas.push(c);
    }

    anime({
        targets: targetImg,
        filter: ['brightness(1)', 'brightness(1.8)', 'brightness(1)'],
        duration: 350,
        easing: 'easeOutQuad'
    });

    anime({
        targets: chispas,
        translateX: () => (Math.random() - 0.5) * 80,
        translateY: () => Math.random() * 90 + 30,
        scale: [{ value: 1.3, duration: 80 }, { value: 0, duration: 450, easing: 'easeInQuad' }],
        opacity: [{ value: 0, duration: 0 }, { value: 1, duration: 50 }, { value: 0, duration: 420, easing: 'easeInCubic' }],
        delay: anime.stagger(12),
        complete: () => { if (overlay.parentElement) overlay.remove(); }
    });
};

// ── GOD TUNER: RAYOS DORADOS (BURST VOLUMÉTRICO EN PUNTA) ─────────────────
window.dispararBurstGodTuner = function() {
    const targetImg = document.getElementById('godT');
    if (!targetImg) return;
    
    const rect = targetImg.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:visible;';
    document.body.appendChild(overlay);
    
    const rayos = [];
    const cantidadRayos = 6; 
    
    for (let i = 0; i < cantidadRayos; i++) {
        const angulo = (i / cantidadRayos) * 360 - 90 + (Math.random() * 10 - 5);
        const rayo = document.createElement('div');
        
        const largoMaximo = Math.random() * 60 + 140; 
        const grosorBase = Math.random() * 8 + 14;    
        
        rayo.style.cssText = [
            'position:absolute',
            `left:${centroX}px`, `top:${centroY}px`,
            `width:${largoMaximo}px`, `height:${grosorBase}px`,
            'background:linear-gradient(to right, rgba(255,245,180,1) 0%, rgba(255,210,50,0.85) 30%, rgba(255,150,0,0) 100%)',
            'box-shadow:0 0 12px rgba(255,210,0,0.6)',
            'transform-origin:left center',
            'margin-top:-7px', 
            'clip-path: polygon(0% 25%, 0% 75%, 100% 50%)', 
            'opacity:0',
            `transform:rotate(${angulo}deg) scaleX(0) translateX(0)`
        ].join(';');
        
        overlay.appendChild(rayo);
        rayos.push(rayo);
    }
    
    anime({ 
        targets: targetImg, 
        filter: [
            { value: 'brightness(1)', duration: 0 },
            { value: 'brightness(3.8) contrast(1.2)', duration: 120, easing: 'easeOutQuad' },
            { value: 'brightness(1)', duration: 450, easing: 'easeInQuad' }
        ], 
        scale: [
            { value: 1.2, duration: 100, easing: 'easeOutBack' },
            { value: 1, duration: 350, easing: 'easeInQuad' }
        ] 
    });
    
    rayos.forEach((r, i) => {
        anime({ 
            targets: r, 
            scaleX: [
                { value: 0, duration: 0 },
                { value: 1.2, duration: 180, easing: 'easeOutExpo' },
                { value: 1.0, duration: 350, easing: 'linear' }
            ],
            translateX: [
                { value: 0, duration: 0 },
                { value: Math.random() * 20 + 30, duration: 500, easing: 'easeOutCubic' }
            ],
            opacity: [
                { value: 0, duration: 0 },
                { value: 1, duration: 60, easing: 'linear' },
                { value: 0, duration: 450, easing: 'easeOutQuad' }
            ],
            delay: i * 25, 
            complete: () => { 
                if (i === rayos.length - 1 && overlay.parentElement) {
                    overlay.remove();
                }
            } 
        });
    });
};

// ── GOD TUNER: RETORNO AL FILTRO ORIGINAL DE APAGADO ──────────────────────
window.dispararApagadoGodTuner = function() {
    const targetImg = document.getElementById('godT');
    if (!targetImg) return;

    anime.remove(targetImg);

    anime({
        targets: targetImg,
        scale: 1,
        filter: 'brightness(0.2) grayscale(0.5)',
        duration: 250,
        easing: 'easeOutQuad'
    });
};