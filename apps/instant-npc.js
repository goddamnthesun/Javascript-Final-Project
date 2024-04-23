async function getVanilaRaces() {
  const url =
    "https://api.open5e.com/v1/races/?slug__in=&slug__iexact=&slug=&name__iexact=&name=&desc__iexact=&desc=&desc__in=&desc__icontains=&document__slug__iexact=wotc-srd&document__slug=&document__slug__in=&asi_desc__iexact=&asi_desc=&asi_desc__icontains=&age__iexact=&age=&age__icontains=&alignment__iexact=&alignment=&alignment__icontains=&size__iexact=&size=&size__icontains=&speed_desc__iexact=&speed_desc=&speed_desc__icontains=&languages__iexact=&languages=&languages__icontains=&vision__iexact=&vision=&vision__icontains=&traits__iexact=&traits=&traits__icontains=&document__slug__not_in=";
  const response = await fetch(url);
  const vanilaRaces = await response.json();
  return vanilaRaces;
}

async function getAllRaces() {
  const url = "https://api.open5e.com/v1/races/";
  const response = await fetch(url);
  const allRaces = await response.json();
  return allRaces;
}

getAllRaces().then((data) => {
  const allRaceNames = data.results.map((race) => race.name);
  const raceSelector = document.querySelector("#race");
  const optionRemover = document.querySelectorAll(
    "#race option:not(#random-race)"
  );
  optionRemover.forEach((option) => {
    option.remove();
  });
  allRaceNames.forEach((name) => {
    const option = document.createElement("option");
    option.text = name;
    option.value = name;
    raceSelector.appendChild(option);
  });
});

const vanilaChecker = document.getElementById("vanila-race-checker");

vanilaChecker.addEventListener("change", () => {
  if (vanilaChecker.checked) {
    getVanilaRaces().then((data) => {
      const vanilaRaceNames = data.results.map((race) => race.name);
      const raceSelector = document.querySelector("#race");
      const optionRemover = document.querySelectorAll(
        "#race option:not(#random-race)"
      );
      optionRemover.forEach((option) => {
        option.remove();
      });
      vanilaRaceNames.forEach((name) => {
        const option = document.createElement("option");
        option.text = name;
        option.value = name;
        raceSelector.appendChild(option);
      });
    });
  } else {
    getAllRaces().then((data) => {
      const allRaceNames = data.results.map((race) => race.name);
      const raceSelector = document.querySelector("#race");
      const optionRemover = document.querySelectorAll(
        "#race option:not(#random-race)"
      );
      optionRemover.forEach((option) => {
        option.remove();
      });
      allRaceNames.forEach((name) => {
        const option = document.createElement("option");
        option.text = name;
        option.value = name;
        raceSelector.appendChild(option);
      });
    });
  }
});

// social sex, social standing, profession....

async function socialStatus() {
  const url = "social-status.json";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
// sex
socialStatus().then((data) => {
  const sex = data.social_status.map((sex) => sex.sex);
  const sexSelector = document.getElementById("sex");
  sex.forEach((sex) => {
    const option = document.createElement("option");
    option.text = sex;
    option.value = sex;
    sexSelector.appendChild(option);
  });
});

// social standing

socialStatus().then((data) => {
  const maleCategories = data.social_status[0].categories.map(
    (category) => category.status
  );
  const statusSelector = document.getElementById("standing");
  maleCategories.forEach((category) => {
    const option = document.createElement("option");
    option.text = category;
    option.value = category;
    statusSelector.appendChild(option);
  });
});

// generate btn
const cardNpc = document.getElementById("card-npc-container");

document.getElementById("generate-npc").addEventListener("click", async () => {
  let raceSelector = document.getElementById("race").value;
  let sexSelector = document.getElementById("sex").value;
  let standingSelector = document.getElementById("standing").value;
  const randomName = generateRandomName();
  let age = "unknown";

  if (raceSelector === "random-race") {
    if (vanilaChecker.checked) {
      raceSelector = await getVanilaRandomRace();
    } else {
      raceSelector = await getAllRandomRace();
    }
  }
  if (raceSelector !== "Gearforged") {
    age = await getAgeRange(raceSelector);
  }
  if (sexSelector === "random-sex") {
    sexSelector = randomSex();
    console.log(sexSelector);
  }
  if (standingSelector === "random-standing") {
    standingSelector = await randomSocialStanding();
  }
  const selectedRandomProfession = await randomProfession(
    sexSelector,
    standingSelector
  );
  // add card before changes

  const cardCode = `<div class="card-header">
<h2>${randomName}</h2>
<p>${randomName} is ${age} years old ${raceSelector} ${sexSelector} ${selectedRandomProfession}</p>
</div>`;
  const tempElement = document.createElement("div");
  tempElement.innerHTML = cardCode;
  cardNpc.appendChild(tempElement);

  localStorage.setItem(`card${localStorage.length}`, `${cardCode}`);

  // remove card

  const removeButton = document.createElement("button");
  removeButton.textContent = "X";
  removeButton.classList.add("button-55");

  removeButton.addEventListener("click", () => {
    localStorage.removeItem(localStorage.key);
    cardNpc.removeChild(tempElement);
    cardNpc.removeChild(removeButton);
    cardNpc.removeChild(exportButton);
  });
  cardNpc.appendChild(removeButton);

  // export card
  const exportButton = document.createElement("button");
  exportButton.textContent = "Export NPC";
  exportButton.classList.add("button-55");
  cardNpc.appendChild(exportButton);
  exportButton.addEventListener("click", function () {
    exportNPC(cardCode);
  });

  console.log(
    `${generateRandomName()} is ${age} years old ${raceSelector} ${sexSelector} ${selectedRandomProfession}`
  );
});

//keep cards in memory

window.onload = function () {
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
      cardNpc.removeChild(tempElement);
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
    cardNpc.appendChild(tempElement);
  }
};

function generateRandomName() {
  const prefixes = [
    "Ald",
    "Aid",
    "Ash",
    "Axi",
    "Bal",
    "Sen",
    "Bel",
    "Cal",
    "Dor",
    "El",
    "Fal",
    "Gar",
    "Hel",
    "Is",
    "Jor",
    "Kor",
    "Lan",
    "Mal",
    "Nel",
    "Olf",
    "Pal",
    "Qua",
    "Ral",
    "Sor",
    "Tel",
    "Ulf",
    "Val",
    "Wal",
    "Xan",
    "Yor",
    "Zan",
  ];
  const suffixes = [
    "athor",
    "arion",
    "samel",
    "drin",
    "farn",
    "purn",
    "gorn",
    "harn",
    "irion",
    "jorn",
    "karn",
    "lorn",
    "morn",
    "narn",
    "purar",
    "lukia",
    "soli",
    "heart",
    "ia",
    "shvili",
    "qarn",
    "rarn",
    "sorn",
    "torn",
    "urn",
    "vorn",
    "worn",
    "xorn",
    "yorn",
    "zorn",
  ];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return randomPrefix + randomSuffix;
}
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
async function getAgeRange(raceSelector) {
  const response = await fetch("race-ages.json");
  const data = await response.json();
  const race = data.races.find((race) => race.name === raceSelector);
  return randomNumber(race.adulthood, race.max_lifespan);
}

function randomSex() {
  if (Math.random() > 0.5) {
    return "Male";
  } else {
    return "Female";
  }
}

async function randomSocialStanding() {
  return socialStatus().then((data) => {
    const maleCategories = data.social_status[0].categories.map(
      (category) => category.status
    );
    const randomCategoryIndex = randomNumber(0, maleCategories.length - 1);
    return maleCategories[randomCategoryIndex];
  });
}

async function randomProfession(sexSelector, standingSelector) {
  const data = await socialStatus();
  if (sexSelector === data.social_status[0].sex) {
    const maleCategory = data.social_status[0].categories.find(
      (maleCategory) => maleCategory.status === standingSelector
    );

    const randomIndexMale = randomNumber(
      0,
      maleCategory.occupations.length - 1
    );
    const randomOccupationMale = maleCategory.occupations[randomIndexMale].type;
    return randomOccupationMale;
  } else {
    const femaleCategory = data.social_status[1].categories.find(
      (femaleCategory) => femaleCategory.status === standingSelector
    );
    const randomIndexFemale = randomNumber(
      0,
      femaleCategory.occupations.length - 1
    );
    const randomOccupationFemale =
      femaleCategory.occupations[randomIndexFemale].type;
    return randomOccupationFemale;
  }
}

async function getVanilaRandomRace() {
  return getVanilaRaces().then((data) => {
    const vanilaRaceNames = data.results.map((race) => race.name);
    const randomVanilaIndex = randomNumber(0, vanilaRaceNames.length - 1);
    return vanilaRaceNames[randomVanilaIndex];
  });
}

async function getAllRandomRace() {
  return getAllRaces().then((data) => {
    const allRaceNames = data.results.map((race) => race.name);
    const randomAllIndex = randomNumber(0, allRaceNames.length - 1);
    return allRaceNames[randomAllIndex];
  });
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
