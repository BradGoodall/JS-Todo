// Grab our elements and define variables
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const btnAdd = document.getElementById("btnAdd");
const btnDel = document.getElementById("btnDel");
const taskCount = document.getElementById("taskCount");
let deleteMode = false;
let pageLoaded = false;

// Add an task to the list
function addTask(value, uniqueID, isChecked) {
  if (value === "") return;

  if (uniqueID === "") uniqueID = Date.now();

  value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  const newTask = document.createElement("li");
  newTask.id = "LI" + uniqueID;

  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.id = uniqueID;
  newCheckbox.checked = isChecked;
  newCheckbox.onclick = () => { cbClick(uniqueID); };
  newCheckbox.classList.add('checkbox');

  const newBtn = document.createElement("button");
  newBtn.textContent = "Delete";
  newBtn.classList.add("delBtn");
  newBtn.onclick = () => { deleteTask(uniqueID); };
  if (!deleteMode) newBtn.classList.add("hide");

  const newLabel = document.createElement("label");
  newLabel.textContent = value;
  newLabel.htmlFor = uniqueID;
  newLabel.id = "Label" + uniqueID;
  if (isChecked) newLabel.classList.add("checked");

  newTask.appendChild(newBtn);
  newTask.appendChild(newCheckbox);
  newTask.appendChild(newLabel);

  todoList.appendChild(newTask);

  todoInput.value = "";
  updateListCount();
}

// Delete a task from the list
function deleteTask(id) {
  const task = document.getElementById("LI" + id);
  task.remove();
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
  updateListCount();
  saveList();
}

// Toggle the Delete Mode function
function toggleDelete() {
  deleteMode = !deleteMode;

  if (!deleteMode) {
    btnDel.classList.remove('toggled');
    const d = document.querySelectorAll("button");
    d.forEach((e) => {
      if (e.classList.contains("delBtn")) {
        e.classList.add("hide");
      }
    });
  } else {
    btnDel.classList.add('toggled');
    const d = document.querySelectorAll("button");
    d.forEach((e) => {
      if (e.classList.contains("delBtn")) {
        e.classList.remove("hide");
      }
    });
  }
}

// Remove completed tasks
function removeCompleted() {
    let tasksToDelete = [];

    for (let i = 1; i <= todoList.childElementCount; i++) {
        if (todoList.childNodes[i].childNodes[1].checked === true) {
            tasksToDelete.push(todoList.childNodes[i].childNodes[1].id)
        }
    }

    tasksToDelete.forEach((e) => {deleteTask(e)})
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
    let completedTasks = 0;
    for (let i = 1; i <= todoList.childElementCount; i++) {
        if (todoList.childNodes[i].childNodes[1].checked === true) completedTasks++;
    }
    if (completedTasks > 0) taskCount.textContent = todoList.childElementCount + " Tasks (" + completedTasks + " Completed)";
    else taskCount.textContent = todoList.childElementCount + " Tasks";
  } else {
    todoList.classList.remove("listBorder");
    taskCount.textContent = "No Tasks";
    deleteMode = false;
    btnDel.classList.remove('toggled');
  }
  saveList();
}

// Save List
function saveList() {
    if (!pageLoaded) return;
    localStorage.clear();
  for (let i = 1; i <= todoList.childElementCount; i++) {
    localStorage.setItem("Task #" + i, todoList.childNodes[i].childNodes[2].textContent);
    localStorage.setItem("ID #" + i, todoList.childNodes[i].childNodes[1].id);
    localStorage.setItem("isChecked #" + i, todoList.childNodes[i].childNodes[1].checked);
    //console.log("Saved: " + todoList.childNodes[i].childNodes[2].textContent + " with ID: " + todoList.childNodes[i].childNodes[1].id);
  }
}

// Load List
window.addEventListener("load", (event) => {
  const loadCount = localStorage.length;

  for (let i = 1; i <= loadCount/3; i++) {
    const newTask = localStorage.getItem("Task #" + i);
    const newID = localStorage.getItem("ID #" + i);
    const isChecked = (localStorage.getItem("isChecked #" + i) == 'true'); // Convert the string value to a bool
    addTask(newTask, newID, isChecked);

    console.log("Loaded: " + (isChecked ? "[X] " : "[ ] ") + newTask + " with ID: " + newID);
  }
  pageLoaded = true;
  console.log("Finshed loading " + loadCount/3 + " list tasks.");
});
