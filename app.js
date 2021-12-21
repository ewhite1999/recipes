// fetch("./ingredients.json")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => console.log(data["burritos"]["ingredients"][0]["unit"]));

const createNavItem = (linkName) => {
  const navItem = document.createElement("a");
  navItem.classList.add("nav_link");
  navItem.innerText = linkName;
  navItem.addEventListener("click", () => loadPage(linkName));
  return navItem;
};

const container = document.querySelector(".container");

const createHeader = (recipeName, linksArr) => {
  const header = document.createElement("header");
  container.appendChild(header);

  const headerDiv = document.createElement("div");
  headerDiv.classList.add("header_cont");
  header.appendChild(headerDiv);

  const title = document.createElement("h1");
  title.classList.add("title");
  title.innerText = recipeName;
  headerDiv.appendChild(title);

  const navMenu = document.createElement("nav");
  navMenu.classList.add("menu");

  const L = linksArr.length;
  for (let i = 0; i < L; i++) {
    if (linksArr[i] !== recipeName) {
      navMenu.appendChild(createNavItem(linksArr[i]));
    }
  }
  headerDiv.appendChild(navMenu);

  const hamburger = document.createElement("button");
  hamburger.classList.add("hamburger");
  const menuIcon = document.createElement("i");
  const closeIcon = document.createElement("i");
  menuIcon.classList.add("menuIcon", "material-icons");
  menuIcon.innerText = "menu";
  closeIcon.innerText = "close";
  closeIcon.classList.add("closeIcon", "material-icons");
  hamburger.appendChild(menuIcon);
  hamburger.appendChild(closeIcon);
  headerDiv.appendChild(hamburger);

  const menuItems = document.querySelectorAll(".menuItem");

  function toggleMenu() {
    if (navMenu.classList.contains("showMenu")) {
      navMenu.classList.remove("showMenu");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    } else {
      navMenu.classList.add("showMenu");
      closeIcon.style.display = "block";
      menuIcon.style.display = "none";
    }
  }

  hamburger.addEventListener("click", toggleMenu);
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", toggleMenu);
  });
};

const createBanner = (
  imgLink,
  alt,
  servingSize,
  servingsNumber,
  linksArr,
  recipeName
) => {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img_container");
  container.appendChild(imgContainer);

  const img = document.createElement("img");
  img.src = imgLink;
  img.alt = alt;
  img.classList.add("cover_photo");
  imgContainer.appendChild(img);

  const servingInfo = document.createElement("div");
  servingInfo.classList.add("serving_info");
  servingInfo.innerHTML;
  const infoSpan = document.createElement("span");
  servingInfo.appendChild(infoSpan);
  infoSpan.innerText = `${servingSize} per serving,`;
  servingInfo.append(document.createElement("br"));
  const numberOfServings = document.createElement("em");
  numberOfServings.classList.add("smaller", "accent");
  numberOfServings.innerText = `makes ${servingsNumber} servings`;
  servingInfo.appendChild(numberOfServings);
  imgContainer.appendChild(servingInfo);

  const navMenu = document.createElement("nav");
  navMenu.classList.add("menu_desktop");
  const L = linksArr.length;
  for (let i = 0; i < L; i++) {
    if (linksArr[i] !== recipeName) {
      navMenu.appendChild(createNavItem(linksArr[i]));
    }
  }
  imgContainer.appendChild(navMenu);
};

const testIngredient = (ingredient, property) => {
  let valuePair = "";
  if (ingredient[property] !== undefined) valuePair = ingredient[property];
  return valuePair;
};

const createIngredients = (ingredients) => {
  const ingredientsSection = document.createElement("section");
  ingredientsSection.classList.add("ingredients");

  const ingredientTitle = document.createElement("h2");
  ingredientTitle.innerText = "ingredients:";
  ingredientsSection.appendChild(ingredientTitle);

  const listIngredients = document.createElement("ul");
  const L = ingredients.length;
  for (let i = 0; i < L; i++) {
    const currentIngredient = ingredients[i];
    const name = testIngredient(currentIngredient, "name");
    const quantity = testIngredient(currentIngredient, "quantity");
    const unit = testIngredient(currentIngredient, "unit");
    const prep = testIngredient(currentIngredient, "prep");

    let prepMethod = "";
    if (prep.length > 0) prepMethod = `, <em class="accent">${prep}</em>`;
    const listItem = document.createElement("li");
    listItem.innerHTML = `${quantity} ${unit} ${name}${prepMethod}`;
    if (i !== L - 1) listItem.innerHTML += ";";
    if (i === L - 1) listItem.innerHTML += ".";
    listIngredients.appendChild(listItem);
  }
  ingredientsSection.appendChild(listIngredients);
  return ingredientsSection;
};
const createMethod = (method, bonus) => {
  const methodSection = document.createElement("section");
  methodSection.classList.add("method");
  const methodTitle = document.createElement("h2");
  methodTitle.innerText = "method:";
  methodSection.appendChild(methodTitle);
  const methodList = document.createElement("ol");
  const L = method.length;
  for (let i = 0; i < L; i++) {
    const step = method[i];
    const listItem = document.createElement("li");
    listItem.innerText = `${step}.`;
    methodList.appendChild(listItem);
  }
  methodSection.appendChild(methodList);

  const bonusTip = document.createElement("div");
  bonusTip.classList.add("bonus");
  methodSection.appendChild(bonusTip);
  const span = document.createElement("span");
  span.classList.add("accent");
  span.innerText = "Bonus:";
  bonusTip.appendChild(span);
  const tip = document.createElement("em");
  tip.innerText = " " + bonus;
  bonusTip.appendChild(tip);

  return methodSection;
};
const createInstructions = (ingredients, method, bonus) => {
  const mainSection = document.createElement("main");
  mainSection.classList.add("content");
  const instructions = document.createElement("div");
  instructions.classList.add("instructions");
  mainSection.appendChild(instructions);
  instructions.appendChild(createIngredients(ingredients));
  instructions.appendChild(createMethod(method, bonus));
  container.appendChild(mainSection);
};
const setAccentColour = (colour) => {
  const r = document.querySelector(":root");
  r.style.setProperty("--accent_colour", colour);
};
const clearPage = () => {
  container.innerHTML = "";
};
const loadPage = async (recipeName) => {
  clearPage();
  let response = await fetch("./ingredients.json");
  let data = await response.json();
  const linksArr = Object.keys(data);
  const title = data[recipeName]["recipe"];
  createHeader(title, linksArr);

  const imgLink = data[recipeName]["photo"];
  const alt = title;
  const servingSize = data[recipeName]["serving_size"];
  const numberOfServings = data[recipeName]["number_of_servings"];
  createBanner(
    imgLink,
    alt,
    servingSize,
    numberOfServings,
    linksArr,
    recipeName
  );

  const ingredients = data[recipeName]["ingredients"];
  const method = data[recipeName]["method"];
  const bonus = data[recipeName]["bonus_tip"];
  createInstructions(ingredients, method, bonus);
  const accentColour = data[recipeName]["accent_colour"];
  setAccentColour(accentColour);
};

loadPage("burritos");
