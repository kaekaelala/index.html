// ===== BLinkd Customizer (Folder-based categories) =====

const MAX = 6;

const data = {
  Pink: {
    path: "pink",
    files: [
      "rose.png",
      "lace.png",
      "vanilla-pink.png",
      "pink-tiles.png"
    ]
  },
  Singers: {
    path: "singers",
    files: [
      "asap.png",
      "drake.png",
      "pnd.png",
      "transform.png"
    ]
  }
};

let activeCategory = Object.keys(data)[0];
let selected = [];

// elements
const tabsEl = document.getElementById("tabs");
const gridEl = document.getElementById("grid");
const selectedEl = document.getElementById("selected");
const countEl = document.getElementById("count");
const codeEl = document.getElementById("code");

document.getElementById("maxCount").textContent = MAX;
document.getElementById("maxCount2").textContent = MAX;

// Tabs
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

// Grid
function renderGrid() {
  gridEl.innerHTML = "";
  const { path, files } = data[activeCategory];

  files.forEach(filename => {
    const tile = document.createElement("div");
    tile.className = "tile" + (selected.includes(`${path}/${filename}`) ? " selected" : "");

    const img = document.createElement("img");
    img.src = `charms/${path}/${filename}`;
    img.alt = filename;

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = "Selected";

    tile.appendChild(img);
    tile.appendChild(badge);

    tile.onclick = () => toggle(`${path}/${filename}`);

    gridEl.appendChild(tile);
  });
}

// Toggle select
function toggle(key) {
  const i = selected.indexOf(key);

  if (i >= 0) {
    selected.splice(i, 1);
  } else {
    if (selected.length >= MAX) {
      alert(`Max ${MAX} charms`);
      return;
    }
    selected.push(key);
  }

  renderGrid();
  renderSelected();
}

// Selected panel
function renderSelected() {
  countEl.textContent = selected.length;
  selectedEl.innerHTML = "";

  selected.forEach(key => {
    const img = document.createElement("img");
    img.src = `charms/${key}`;
    img.alt = key;

    img.onclick = () => {
      selected = selected.filter(x => x !== key);
      renderGrid();
      renderSelected();
    };

    selectedEl.appendChild(img);
  });

  const code = selected.map(x => x.replace("/", "-").replace(".png", "")).join("-");
  codeEl.textContent = code || "—";
}

// Buttons
document.getElementById("copy").onclick = async () => {
  if (!codeEl.textContent || codeEl.textContent === "—") {
    alert("Select charms first");
    return;
  }
  await navigator.clipboard.writeText(codeEl.textContent);
  alert("Copied!");
};

document.getElementById("clear").onclick = () => {
  selected = [];
  renderGrid();
  renderSelected();
};

// Init
renderTabs();
renderGrid();
renderSelected();

renderTabs();
renderGrid();
renderSelected();
