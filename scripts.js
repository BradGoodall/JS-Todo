// Grab our list and buttons
const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const btnAdd = document.getElementById('btnAdd');

// Add an item to the list
function addItem() {
    const uniqueID = Date.now();

    const newItem = document.createElement('li');
    newItem.id = 'LI' + uniqueID;

    const newCB = document.createElement('input');
    newCB.type = 'checkbox';
    newCB.id = uniqueID;
    newCB.onclick = (() => {cbClick(uniqueID)});

    const newBtn = document.createElement('button');
    newBtn.textContent = 'Delete';
    newBtn.classList.add('delBtn');
    newBtn.onclick = (() => {delItem(uniqueID)});

    const newLabel = document.createElement('label');
    newLabel.textContent = todoInput.value;
    newLabel.htmlFor = uniqueID;
    newLabel.id = 'Label' + uniqueID;

    newItem.appendChild(newCB);
    newItem.appendChild(newLabel);
    newItem.appendChild(newBtn);
    todoList.appendChild(newItem);
}

function cbClick(id) {
    const cb = document.getElementById(id);
    const label = document.getElementById('Label' + id);
    if (cb.checked) {
        label.classList.add('checked');
    }
    else
    {
        label.classList.remove('checked');
    }
}

function delItem(id) {
    const item = document.getElementById('LI' + id);
    item.remove();
}