const charmSections = document.querySelectorAll(".charms");

const charms = [
  "theweeknd.png",
  "drake.png",
  "transform.png"
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
