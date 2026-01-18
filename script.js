const MAX = 6;
let selected = [];

const charmsByCategory = {
  cars:          // put your car PNGs here
  pink:              // put your pink PNGs here
  streetstyle:  //streetstyle here
  singers : ["drake.png","pnd.png", "transform.png"]// singers here
};

function renderCategory(categoryId) {
  const wrap = document.getElementById(categoryId);
  if (!wrap) return;
  wrap.innerHTML = "";

  charmsByCategory[categoryId].forEach(filename => {
    const img = document.createElement("img");
    img.src = `charms/${filename}`;
    img.alt = filename;

    img.onclick = () => toggleSelect(filename);

    wrap.appendChild(img);
  });
}

function toggleSelect(filename) {
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

  updateSelectedUI();
}

function updateSelectedUI() {
  document.getElementById("count").textContent = selected.length;

  const selWrap = document.getElementById("selected");
  selWrap.innerHTML = "";
  selected.forEach(filename => {
    const img = document.createElement("img");
    img.src = `charms/${filename}`;
    img.alt = filename;
    img.className = "selectedCharm";
    selWrap.appendChild(img);
  });

  // bracelet code
  const code = selected.map(f => f.replace(".png","")).join("-");
  document.getElementById("code").textContent = code || "—";
}

// Copy button
document.getElementById("copy").onclick = async () => {
  const text = document.getElementById("code").textContent;
  if (!text || text === "—") return alert("Select charms first");
  await navigator.clipboard.writeText(text);
  alert("Copied!");
};

// Render all categories
Object.keys(charmsByCategory).forEach(renderCategory);
updateSelectedUI();
