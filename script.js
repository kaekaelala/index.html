const charmSections = document.querySelectorAll(".charms");

const charmSections = document.querySelectorAll(".charms");

const charms = [
  "drake.png",
  "theweeknd.png",
  "transform.png",
  "pnd.png"
];

charmSections.forEach(section => {
  charms.forEach(charm => {
    const img = document.createElement("img");
    img.src = `charms/${charm}`;
    section.appendChild(img);
  });
});

];

charmSections.forEach(section => {
  charms.forEach(charm => {
    const img = document.createElement("img");
    img.src = `charms/${charm}`;
    img.onclick = () => {
      img.classList.toggle("selected");
    };
    section.appendChild(img);
  });
});
