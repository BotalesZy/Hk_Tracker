document.addEventListener("DOMContentLoaded", () => {
    const slots   = document.querySelectorAll(".sections-wrapper .slot");
    const btnPrev = document.querySelector(".side-button.left");
    const btnNext = document.querySelector(".side-button.right");

    // ── Datos de navegación por pantalla ──────────────────────────────────
    // Orden: bosses(0), inventario(1), charms(2)
    const navData = [
        { title: "Bosses",    prev: "Charms",    next: "Inventory" },
        { title: "Inventory", prev: "Bosses",    next: "Charms"    },
        { title: "Charms",    prev: "Inventory", next: "Bosses"    },
    ];

    // ── Referencias al navbar ─────────────────────────────────────────────
    const navPrev  = document.getElementById('nav-prev-label');
    const navTitle = document.getElementById('nav-title');
    const navNext  = document.getElementById('nav-next-label');

    function actualizarNavbar(index) {
        const d = navData[index];
        if (navPrev)  navPrev.textContent  = '← ' + d.prev;
        if (navTitle) navTitle.textContent = d.title;
        if (navNext)  navNext.textContent  = d.next + ' →';
    }

    let currentIndex = 0;
    let isAnimating  = false;

    // ── Inicialización ────────────────────────────────────────────────────
    if (slots.length > 0) {
        const defaultActiveIndex = Array.from(slots).findIndex(s => s.classList.contains("active-slide"));
        currentIndex = defaultActiveIndex !== -1 ? defaultActiveIndex : 0;

        slots.forEach((slot, index) => {
            const header = slot.querySelector(".content-area header");
            if (index === currentIndex) {
                slot.classList.add("active-slide");
                anime.set(slot, { opacity: 1, translateX: "0%" });
                if (header) header.style.opacity = "1";
            } else {
                slot.classList.remove("active-slide");
                anime.set(slot, { opacity: 0, translateX: "100%" });
                if (header) header.style.opacity = "0";
            }
        });

        actualizarNavbar(currentIndex);
    }

    // ── Movimiento del carrusel ───────────────────────────────────────────
    function moveCarousel(direction) {
        if (isAnimating || slots.length <= 1) return;
        isAnimating = true;

        const currentSlot   = slots[currentIndex];
        const currentHeader = currentSlot.querySelector(".content-area header");

        if (direction === "next") {
            currentIndex = (currentIndex + 1) % slots.length;
        } else {
            currentIndex = (currentIndex - 1 + slots.length) % slots.length;
        }

        const nextSlot   = slots[currentIndex];
        const nextHeader = nextSlot.querySelector(".content-area header");

        const outX = direction === "next" ? "-100%" : "100%";
        const inX  = direction === "next" ? "100%"  : "-100%";

        // Actualizar navbar inmediatamente
        actualizarNavbar(currentIndex);

        if (currentHeader) currentHeader.style.opacity = "0";
        if (nextHeader)    nextHeader.style.opacity    = "1";

        nextSlot.classList.add("active-slide");
        anime.set(nextSlot, { translateX: inX, opacity: 1 });

        const tl = anime.timeline({
            easing: "cubicBezier(0.25, 1, 0.5, 1)",
            duration: 600,
            complete: () => {
                currentSlot.classList.remove("active-slide");
                anime.set(currentSlot, { opacity: 0 });
                isAnimating = false;
            }
        });

        tl.add({ targets: currentSlot, translateX: outX }, 0);
        tl.add({ targets: nextSlot,    translateX: "0%" }, 0);
    }

    if (btnNext) btnNext.addEventListener("click", () => moveCarousel("next"));
    if (btnPrev) btnPrev.addEventListener("click", () => moveCarousel("prev"));
});