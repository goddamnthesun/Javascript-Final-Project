//let cardAmount = 0;

// for (let key in localStorage) {
//   if (key.startsWith("card")) cardAmount++;
// }
// console.log(cardAmount);

// function displayLastFive(cardAmount) {
//   const cardNpc = document.getElementById("card-npc-container");
//   console.log("cardNpc:", cardNpc);

//   if (cardAmount > 0) {
//     for (let i = 0; i < Math.min(5, cardAmount); i++) {
//       const cardKey = `card${cardAmount - 1 - i}`;
//       console.log(cardKey);
//       const cardValue = localStorage.getItem(cardKey);
//       const tempElement = document.createElement("div");
//       tempElement.innerHTML = cardValue;
//       console.log("What is added to cardNpc:", tempElement.firstChild);
//       cardNpc.appendChild(tempElement.firstChild);
//     }
//   }
// }
