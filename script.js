const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {

    let text = inputBox.value;
    inputBox.value = "";

    if(text === "") {
        alert("Write something first!");
        return;
    }

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
   
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    listContainer.appendChild(li);

    inputBox.value = "";

    saveData();
}

listContainer.addEventListener("click", function (e) {

    let li = e.target.parentElement;


    
    if (e.target.classList.contains("delete-btn")) {
    li.remove();
    saveData();
}

    
    if (e.target.classList.contains("edit-btn")) {

        let span = li.querySelector("span");
        let updated = prompt("Edit task", span.innerText);

        if (updated) {
            span.innerText = updated;
            saveData();
        }
    }


    if(!e.target.classList.contains("edit-btn") &&
    !e.target.classList.contains("delete-btn")) {

    let li = e.target.closest("li");

    if(li) {
        li.classList.toggle("checked");
        saveData();
    }
}

});


function saveData() {

    let allTasks = [];

    let items = listContainer.querySelectorAll("li");

    items.forEach(function (li) {

        let text = li.querySelector("span").innerText;
        let done = li.classList.contains("checked");

        allTasks.push({
            text: text,
            done: done
        });
    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function loadTasks() {

    let data = localStorage.getItem("tasks");

    if (!data) return;

    let tasks = JSON.parse(data);

    tasks.forEach(function (task) {

        let li = document.createElement("li");

        if (task.done) {
            li.classList.add("checked");
        }

        let span = document.createElement("span");
        span.innerText = task.text;

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("edit-btn");

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn");

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        listContainer.appendChild(li);
    });
}

loadTasks();