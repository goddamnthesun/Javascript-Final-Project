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

// occupation
const sexSelector = document.getElementById("sex");
const standingSelector = document.getElementById("standing");

sexSelector.addEventListener("change", async () => {
  getOccupationList();
});

standingSelector.addEventListener("change", async () => {
  getOccupationList();
});

// which occupation ??

// default maile nobiliy
socialStatus().then((data) => {
  console.log(data);
  const maleNobilityOccupations =
    data.social_status[0].categories[0].occupations.map(
      (occupation) => occupation.type
    );
  const occupations = document.getElementById("occupation");
  maleNobilityOccupations.forEach((category) => {
    const option = document.createElement("option");
    option.text = category;
    option.value = category;
    occupations.appendChild(option);
  });
});

// on change get occupation function

async function getOccupationList() {
  const data = await socialStatus();
  const sexIndex = sexSelector.value === "Male" ? 0 : 1;
  const categoryIndex =
    standingSelector.value === "Nobility"
      ? 0
      : standingSelector.value === "Lesser Nobility"
      ? 1
      : standingSelector.value === "Learned"
      ? 2
      : standingSelector.value === "Professional"
      ? 3
      : standingSelector.value === "Working Class"
      ? 4
      : standingSelector.value === "Outlaw"
      ? 5
      : 0;

  const occupationSelector = document.getElementById("occupation");
  const occupationList = data.social_status[sexIndex].categories[
    categoryIndex
  ].occupations.map((occupation) => occupation.type);

  const occupationRemover = document.querySelectorAll(
    "#occupation option:not(#random-occupation)"
  );
  occupationRemover.forEach((occupation) => {
    occupation.remove();
  });
  occupationList.forEach((category) => {
    const option = document.createElement("option");
    option.text = category;
    option.value = category;
    occupationSelector.appendChild(option);
  });
}

// class selection

async function getClasses() {
  const url = "https://api.open5e.com/v1/classes/";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// display class names

getClasses().then((data) => {
  const classNames = data.results.map((name) => name.name);
  const classSelector = document.getElementById("class");
  classNames.forEach((name) => {
    const option = document.createElement("option");
    option.text = name;
    option.value = name;
    classSelector.appendChild(option);
  });
});

// create Character

const createCharacter = document.getElementById("create");

const nameSelector = document.getElementById("name-input");
const raceSelector = document.getElementById("race");
const ageSelector = document.getElementById("age");
const occupationSelector = document.getElementById("occupation");
const classSelector = document.getElementById("class");
const levelSelector = document.getElementById("level");

const characterCode = ` <div id="character-name">
<h2>${nameSelector.value}</h2>
</div>
<div id="character-desc">
<p>${nameSelector.value} is level ${levelSelector.value} ${classSelector.value} ${age.value} years old ${raceSelector.value} ${sexSelector.value} ${occupationSelector.value}</p>
</div>
<div class="character-stat-container">
<div class="stats">
  <h3>Stats</h3>
  <ul>
    <li>
      Strength:
      <input type="number" class="stat-input" id="strength" value="10" />
    </li>
    <li>
      Dexterity:
      <input type="number" class="stat-input" id="dexterity" value="10" />
    </li>
    <li>
      Constitution:
      <input
        type="number"
        class="stat-input"
        id="Constitution"
        value="10"
      />
    </li>
    <li>
      Intelligence:
      <input
        type="number"
        class="stat-input"
        id="Intelligence"
        value="10"
      />
    </li>
    <li>
      Wisdom:
      <input type="number" class="stat-input" id="wisdom" value="10" />
    </li>
    <li>
      Charisma:
      <input type="number" class="stat-input" id="charisma" value="10" />
    </li>
  </ul>
</div>
</div>;`;

createCharacter.addEventListener("click", async () => {
  const outputContainer = document.getElementById("output-container");
  const tempElement = document.createElement("div");
  tempElement.innerHTML = characterCode;
  outputContainer.appendChild(tempElement);
});
