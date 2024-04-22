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
  tempElement.appendChild(removeButton);
  historyContainer.appendChild(tempElement);
}
