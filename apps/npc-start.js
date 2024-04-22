const instantNpc = document.getElementById("instant-npc");
const guidedCreation = document.getElementById("guided-creation");
const fullCreation = document.getElementById("full-creation");
const descOne = document.getElementById("desc-one");
const descTwo = document.getElementById("desc-two");
const descThree = document.getElementById("desc-three");

function displayBlock(x) {
  x.style.display = "block";
}

function removeBlock(x) {
  x.style.display = "none";
}

instantNpc.addEventListener("mouseover", function () {
  displayBlock(descOne);
});
instantNpc.addEventListener("mouseout", function () {
  removeBlock(descOne);
});

guidedCreation.addEventListener("mouseover", function () {
  displayBlock(descTwo);
});
guidedCreation.addEventListener("mouseout", function () {
  removeBlock(descTwo);
});

fullCreation.addEventListener("mouseover", function () {
  displayBlock(descThree);
});
fullCreation.addEventListener("mouseout", function () {
  removeBlock(descThree);
});
