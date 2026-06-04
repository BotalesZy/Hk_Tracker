# Hk_Tracker


A fan-made Hollow Knight completion tracker designed to help players keep track of their progress toward the 112% completion mark.

This project was built as a personal portfolio piece focused on UI design, state management, animations, and interactive web development using Vanilla JavaScript.


Live Demo
https://botaleszy.github.io/Hk_Tracker/


---

## Features

* **Three-screen carousel:** Bosses, Inventory, and Charms, with smooth slide transitions powered by Anime.js.
* **Dynamic completion percentage:** Updates in real time as you mark items to match the game's official progression.
* **Inventory tracking:** Nail upgrades, Spells (with upgrade states), Nail Arts, Skills, Colosseums, Dreamers, and Kings Soul.
* **Mask Shards & Vessel Fragments:** Visual panels with progress images that update every 4 shards / 3 fragments.
* **Dream Nail panel:** Checklist with essence milestones.
* **God Tuner panel:** Pantheon checklist linked to Godhome progression.
* **Grimmchild cycle:** Three-state charm logic (Grimmchild ➔ Carefree Melody ➔ reset) with NKG unlock/lock behaviors.
* **All 40 Charms:** Dynamically rendered grid with hover states.
* **All Bosses:** Common Bosses + Dream Warriors.
* **Sound effects:** Extracted from the game, played via Howler.js on every interaction.
* **Particle animations:** Dream Nail mist burst, God Tuner golden rays, Dreamer ring expansion, Nail sparks and cracks, spell particles, and Grimm toast notification.
* **Shade Lord modal:** Confirmation dialog with blinking eyes and suspicious hover effect before clearing progress.
* **Clear Tracker:** Full reset functionality with state validation.

---

## Tech Stack

| Tool | Version / Spec | Purpose |
| :--- | :--- | :--- |
| **HTML5** | Semantic Markup | Core structure |
| **CSS3** | Custom Properties | Layout, glass panel effects, and typography |
| **Vanilla JS** | ES6+ | State management and single delegated event listener |
| **Anime.js** | v3.2.1 | UI transitions, animations, and particle systems |
| **Howler.js** | v2.2.4 | Audio playback and management |

---

## Project Structure

```text
├── index.html
├── css/
│   ├── cssGen.css        # Main layout and component styles
│   ├── cleanB.css        # Background and base reset
│   ├── glassPanels.css   # Glass panel components
│   ├── fixes.css         # NKG lock, spell hover, dreamer states
│   └── grimm-toast.css   # Grimm warning toast notification
├── scripts/
│   ├── carrusel.js       # Carousel navigation + navbar labels
│   ├── porcentaje.js     # Completion percentage calculator
│   ├── items.js          # Main click handler (single delegated listener)
│   ├── sounds.js         # Audio functions + all Anime.js animations
│   ├── charmData.js      # Charm grid renderer
│   ├── sec1Data.js       # Dynamic panel HTML generator
│   ├── panelMask.js      # Mask Shards panel logic
│   ├── panelVessels.js   # Vessel Fragments panel logic
│   ├── panelDreamNail.js # Dream Nail panel logic
│   ├── panelGodTuner.js  # God Tuner panel logic
│   └── ojos.js           # Shade Lord eyes SVG
├── svg/                  # All game assets (icons, backgrounds)
└── SE/                   # Sound effects (not included in repo)
```


Audio Assets
Sound effects are extracted from Hollow Knight and are not included in this repository out of respect for Team Cherry's intellectual property.

To run the audio locally, the project expects a /SE directory in the root folder with the following structure:
```text
SE/
├── hv/          # hvInicio.mp3, hvSalida.mp3
├── nail/        # nailC.mp3, nailE.mp3, nailB.mp3
├── dream/       # dnailE.mp3, dnailO.mp3, fail.mp3
├── god/         # gtE.mp3, gtHit.mp3, gtC.mp3
├── ui/          # Button.mp3, click.mp3, clear.mp3
├── d/           # dreamerH.mp3
├── charm/       # cSound.mp3
└── spells/      # spell N.mp3, dSpell N.mp3
```

License
MIT License — applies to source code only (HTML, CSS, JavaScript).
Game assets (artwork, audio) © Team Cherry — used for fan/educational purposes only.
This project is not affiliated with or endorsed by Team Cherry.
