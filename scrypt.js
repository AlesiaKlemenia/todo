/* jshint esversion: 6 */

function addTask() {
  let task = document.getElementById("user-text").value;
  let newTask = {
    task: task,
    completed: false,
  };

  localStorage.setItem(task, JSON.stringify(newTask));
}

function initializeTODOAreas() {
  for (let key in { ...localStorage }) {
    let obj = JSON.parse(localStorage[key]);
    if (!obj.completed) {
      let todoArea = document.getElementById("todo");

      todoArea.append(addElement(obj));
    } else {
      let completedArea = document.getElementById("completed");

      completedArea.append(addElement(obj));
    }
  }
}

function createBareElement() {
  let input = document.createElement("input");
  let span = document.createElement("span");
  let delButton = document.createElement("button");

  let div = document.createElement("div");
  {
    div.append(input);
    div.append(span);
    div.append(delButton);
  }

  return div;
}

function addElement(obj) {
  let div = createBareElement();

  {
    div.childNodes[0].type = "checkbox";
    div.childNodes[0].checked = obj.completed;
    if (obj.completed) {
      div.childNodes[0].addEventListener("change", moveElementToTODO);
    } else {
      div.childNodes[0].addEventListener("change", moveElementToCompleted);
    }
  }

  {
    div.childNodes[1].innerHTML = obj.task;
  }

  {
    div.childNodes[2].onclick = function () {
      deleteElement(obj.task);
    };
    div.childNodes[2].innerHTML = "Delete";
  }

  {
    div.className = "task";
    div.id = obj.task;
  }

  return div;
}

function deleteElement(identifier) {
  let request = `[id="${identifier}"]`;

  let trash = document.querySelector(request);
  let key = trash.id;
  console.log(key);

  trash.parentElement.removeChild(trash);
  localStorage.removeItem(key);
}

function moveElementToTODO(e) {
  let key = e.target.parentNode.id;

  let item = JSON.parse(localStorage.getItem(key));
  item.completed = false;

  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(item));

  location.reload();
}

function moveElementToCompleted(e) {
  let key = e.target.parentNode.id;

  let item = JSON.parse(localStorage.getItem(key));
  item.completed = true;

  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(item));

  location.reload();
}
