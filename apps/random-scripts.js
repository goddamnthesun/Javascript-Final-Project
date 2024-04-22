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

// <!-- <div class="card">
// <div class="card-header">
//   <h2>NPC Name</h2>
//   <p>Description of NPC</p>
// </div>
// <div class="card-body">
//   <div class="stats">
//     <h3>Stats</h3>
//     <ul>
//       <li>
//         Strength:
//         <input type="number" class="stat-input" value="10" />
//       </li>
//       <li>
//         Dexterity:
//         <input type="number" class="stat-input" value="10" />
//       </li>
//       <li>
//         Constitution:
//         <input type="number" class="stat-input" value="10" />
//       </li>
//       <li>
//         Intelligence:
//         <input type="number" class="stat-input" value="10" />
//       </li>
//       <li>
//         Wisdom: <input type="number" class="stat-input" value="10" />
//       </li>
//       <li>
//         Charisma:
//         <input type="number" class="stat-input" value="10" />
//       </li>
//     </ul>
//   </div>
// </div>
// </div> -->
