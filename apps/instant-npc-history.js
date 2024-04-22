const historyContainer = document.getElementById("card-history-container");

for (let key in localStorage) {
  if (!key.startsWith("card")) continue;
  const npcs = localStorage.getItem(key);
  const tempElement = document.createElement("div");
  tempElement.innerHTML = npcs;

  const removeButton = document.createElement("button");
  removeButton.textContent = "X";
  removeButton.classList.add("button-55");
  removeButton.id = `remove-${key}`;
  removeButton.addEventListener("click", function () {
    localStorage.removeItem(key);
    historyContainer.removeChild(tempElement);
  });

  const exportButton = document.createElement("button");
  exportButton.textContent = "Export NPC";
  exportButton.classList.add("button-55");
  exportButton.id = `export-${key}`;
  exportButton.addEventListener("click", function () {
    exportNPC(npcs);
  });

  tempElement.appendChild(removeButton);
  tempElement.appendChild(exportButton);
  historyContainer.appendChild(tempElement);
}

function exportNPC(npcString) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = npcString;

  const npcName = tempElement
    .querySelector(".card-header h2")
    .textContent.trim();

  const npcContent = tempElement
    .querySelector(".card-header p")
    .textContent.trim();

  const filename = `NPC-${npcName}.txt`;
  const fileContent = npcContent;

  const blob = new Blob([fileContent], { type: "text/plain" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  link.download = filename;

  link.click();
}
