// Grab our elements and define variables
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const btnAdd = document.getElementById("btnAdd");
const itemCount = document.getElementById("itemCount");
let deleteMode = false;
let pageLoaded = false;

// Add an item to the list
function addItem(value, uniqueID, isChecked) {
  if (value === "") return;

  if (uniqueID === "") uniqueID = Date.now();

  const newItem = document.createElement("li");
  newItem.id = "LI" + uniqueID;

  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.id = uniqueID;
  newCheckbox.checked = isChecked;
  newCheckbox.onclick = () => { cbClick(uniqueID); };

  const newBtn = document.createElement("button");
  newBtn.textContent = "Delete";
  newBtn.classList.add("delBtn");
  newBtn.onclick = () => { deleteItem(uniqueID); };
  if (!deleteMode) newBtn.classList.add("hide");

  const newLabel = document.createElement("label");
  newLabel.textContent = value;
  newLabel.htmlFor = uniqueID;
  newLabel.id = "Label" + uniqueID;
  if (isChecked) newLabel.classList.add("checked");

  newItem.appendChild(newBtn);
  newItem.appendChild(newCheckbox);
  newItem.appendChild(newLabel);

  todoList.appendChild(newItem);

  todoInput.value = "";
  updateListCount();
}

// Delete and item from the list
function deleteItem(id) {
  const item = document.getElementById("LI" + id);
  item.remove();
  updateListCount();
}

// Toggle a checkbox
function cbClick(id) {
  const cb = document.getElementById(id);
  const label = document.getElementById("Label" + id);
  if (cb.checked) {
    label.classList.add("checked");
  } else {
    label.classList.remove("checked");
  }
  saveList();
}

// Toggle the Delete Mode function
function toggleDelete() {
  deleteMode = !deleteMode;

  if (!deleteMode) {
    const d = document.querySelectorAll("button");
    d.forEach((e) => {
      if (e.classList.contains("delBtn")) {
        e.classList.add("hide");
      }
    });
  } else {
    const d = document.querySelectorAll("button");
    d.forEach((e) => {
      if (e.classList.contains("delBtn")) {
        e.classList.remove("hide");
      }
    });
  }
}

// Check if "Enter" is pressed in the text box
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btnAdd.click();
  }
});

// Updates the list count and adds/removes the list border
function updateListCount() {
  if (todoList.childElementCount > 0) {
    todoList.classList.add("listBorder");
    itemCount.textContent = todoList.childElementCount + " Items";
  } else {
    todoList.classList.remove("listBorder");
    itemCount.textContent = "No Items";
    deleteMode = false;
  }
  saveList();
}

// Save List
function saveList() {
    if (!pageLoaded) return;
    localStorage.clear();
  for (let i = 1; i <= todoList.childElementCount; i++) {
    localStorage.setItem("Item #" + i, todoList.childNodes[i].childNodes[2].textContent);
    localStorage.setItem("ID #" + i, todoList.childNodes[i].childNodes[1].id);
    localStorage.setItem("isChecked #" + i, todoList.childNodes[i].childNodes[1].checked);
    //console.log("Saved: " + todoList.childNodes[i].childNodes[2].textContent + " with ID: " + todoList.childNodes[i].childNodes[1].id);
  }
}

// Load List
window.addEventListener("load", (event) => {
  const loadCount = localStorage.length;

  for (let i = 1; i <= loadCount/3; i++) {
    const newItem = localStorage.getItem("Item #" + i);
    const newID = localStorage.getItem("ID #" + i);
    const isChecked = (localStorage.getItem("isChecked #" + i) == 'true'); // Convert the string value to a bool
    addItem(newItem, newID, isChecked);

    console.log("Loaded: " + (isChecked ? "[X] " : "[ ] ") + newItem + " with ID: " + newID);
  }
  pageLoaded = true;
  console.log("Finshed loading " + loadCount/3 + " list items.");
});
