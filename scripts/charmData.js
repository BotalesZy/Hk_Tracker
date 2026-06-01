// charmData.js — Solo datos y renderizado, SIN listeners propios

const charmData = [
    { name: "Wayward Compass",      img: "svg/charms/Wayward_Compass.webp" },
    { name: "Gathering Swarm",      img: "svg/charms/Gathering_Swarm.webp" },
    { name: "Stalwart Shell",       img: "svg/charms/Stalwart_Shell.webp" },
    { name: "Soul Catcher",         img: "svg/charms/Soul_Catcher.webp" },
    { name: "Shaman Stone",         img: "svg/charms/Shaman_Stone.webp" },
    { name: "Soul Eater",           img: "svg/charms/Soul_Eater.webp" },
    { name: "Dashmaster",           img: "svg/charms/Dashmaster.webp" },
    { name: "Sprintmaster",         img: "svg/charms/Sprintmaster.webp" },
    { name: "Grubsong",             img: "svg/charms/Grubsong.webp" },
    { name: "Grubberfly's Elegy",   img: "svg/charms/Grubberfly27s_Elegy.webp" },
    { name: "Fragile Heart",        img: "svg/charms/Fragile_Heart.webp" },
    { name: "Unbreakable Greed",    img: "svg/charms/Unbreakable_Greed.webp" },
    { name: "Unbreakable Strength", img: "svg/charms/Unbreakable_Strength.webp" },
    { name: "Spell Twister",        img: "svg/charms/Spell_Twister.webp" },
    { name: "Steady Body",          img: "svg/charms/Steady_Body.webp" },
    { name: "Heavy Blow",           img: "svg/charms/Heavy_Blow.webp" },
    { name: "Quick Slash",          img: "svg/charms/Quick_Slash.webp" },
    { name: "Longnail",             img: "svg/charms/Longnail.webp" },
    { name: "Mark of Pride",        img: "svg/charms/Mark_of_Pride.webp" },
    { name: "Thorns of Agony",      img: "svg/charms/Thorns_of_Agony.webp" },
    { name: "Fury of the Fallen",   img: "svg/charms/Fury_of_the_Fallen.webp" },
    { name: "Baldur Shell",         img: "svg/charms/Baldur_Shell.webp" },
    { name: "Flukenest",            img: "svg/charms/Flukenest.webp" },
    { name: "Defender's Crest",     img: "svg/charms/Defender27s_Crest.webp" },
    { name: "Glowing Womb",         img: "svg/charms/Glowing_Womb.webp" },
    { name: "Quick Focus",          img: "svg/charms/Quick_Focus.webp" },
    { name: "Deep Focus",           img: "svg/charms/Deep_Focus.webp" },
    { name: "Lifeblood Heart",      img: "svg/charms/Lifeblood_Heart.webp" },
    { name: "Lifeblood Core",       img: "svg/charms/Lifeblood_Core.webp" },
    { name: "Joni's Blessing",      img: "svg/charms/Joni27s_Blessing.webp" },
    { name: "Hiveblood",            img: "svg/charms/Hiveblood.webp" },
    { name: "Spore Shroom",         img: "svg/charms/Spore_Shroom.webp" },
    { name: "Sharp Shadow",         img: "svg/charms/Sharp_Shadow.webp" },
    { name: "Shape of Unn",         img: "svg/charms/Shape_of_Unn.webp" },
    { name: "Nailmaster's Glory",   img: "svg/charms/Nailmaster27s_Glory.webp" },
    { name: "Weaversong",           img: "svg/charms/Weaversong.webp" },
    { name: "Dream Wielder",        img: "svg/charms/Dream_Wielder.webp" },
    { name: "Dreamshield",          img: "svg/charms/Dreamshield.webp" },
    { name: "Grimmchild",           img: "svg/charms/Grimmchild.webp", isGrimm: true },
    { name: "Kingsoul",             img: "svg/charms/Kingsoul.webp" }
];

// Solo renderiza — los clicks los maneja items.js por delegación
function renderCharms() {
    const grid = document.querySelector('.charms-grid-layout');
    if (!grid) return;

    grid.innerHTML = charmData.map(c => {
        const charmId  = c.name.replace(/\s+/g, '-').toLowerCase();
        const extraAttr = c.isGrimm ? 'data-status="dormido"' : '';
        return `
            <div class="charm-card" id="card-${charmId}">
                <div class="grid-circle-slot">
                    <img src="${c.img}" alt="${c.name}"
                         class="interactive-item disabled"
                         id="${charmId}" ${extraAttr}>
                </div>
                <span class="charm-name" id="name-${charmId}">${c.name}</span>
            </div>
        `;
    }).join('');
}

// Renderizar en cuanto el script corre (está al final del body, el DOM ya existe)
renderCharms();