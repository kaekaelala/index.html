// ===== BLinkd Customizer (TikTok-style) =====

const MAX = 6;

// IMPORTANT: these must match your real filenames in /charms exactly
const data = {
  Cars: ["transform.png"],
  Pink: ["drake.png"],
  Streetstyle: ["theweeknd.png", "pnd.png"]
};

let activeCategory = Object.keys(data)[0];
let selected = []; // array of filenames

// elements
const tabsEl = document.getElementById("tabs");
const gridEl = document.getElementById("grid");
const selectedEl = document.getElementById("selected");
const countEl = document.getElementById("count");
const codeEl = document.getElementById("code");
document.getElementById("maxCount").textContent = MAX;
document.getElementById("maxCount2").textContent = MAX;

// Build tabs
function renderTabs() {
  tabsEl.innerHTML = "";
  Object.keys(data).forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "tab" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.onclick = () => {
      activeCategory = cat;
      renderTabs();
      renderGrid();
    };
    tabsEl.appendChild(btn);
  });
}

// Build grid for active category
function renderGrid() {
  gridEl.innerHTML = "";

  data[activeCategory].forEach(filename => {
    const tile = document.createElement("div");
    tile.className = "tile" + (selected.includes(filename) ? " selected" : "");

    const img = document.createElement("img");
    img.src = `charms/${filename}`;
    img.alt = filename;

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = "Selected";

    tile.appendChild(img);
    tile.appendChild(badge);

    tile.onclick = () => toggle(filename);

    gridEl.appendChild(tile);
  });
}

function toggle(filename) {
  const i = selected.indexOf(filename);

  if (i >= 0) {
    selected.splice(i, 1);
  } else {
    if (selected.length >= MAX) {
      alert(`Max ${MAX} charms`);
      return;
    }
    selected.push(filename);
  }

  renderGrid();
  renderSelected();
}

function renderSelected() {
  countEl.textContent = selected.length;

  selectedEl.innerHTML = "";
  selected.forEach(filename => {
    const img = document.createElement("img");
    img.src = `charms/${filename}`;
    img.alt = filename;
    img.title = "Click to remove";

    img.onclick = () => {
      selected = selected.filter(x => x !== filename);
      renderGrid();
      renderSelected();
    };

    selectedEl.appendChild(img);
  });

  // code = filenames without .png, joined
  const code = selected.map(x => x.replace(".png","")).join("-");
  codeEl.textContent = code || "—";
}

// Copy + Clear
document.getElementById("copy").onclick = async () => {
  const text = codeEl.textContent;
  if (!text || text === "—") return alert("Select charms first");
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  } catch (e) {
    alert("Copy failed — try selecting the code and copying manually.");
  }
};

document.getElementById("clear").onclick = () => {
  selected = [];
  renderGrid();
  renderSelected();
};

// Start
renderTabs();
renderGrid();
renderSelected();
