const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function createTaskElement(taskText, isDone = false) {
    let li = document.createElement("li");

    if (isDone) li.classList.add("checked");

    let span = document.createElement("span");
    span.innerText = taskText;

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

    listContainer.addEventListener("click", function (e) {

    let li = e.target.closest("li");
    if (!li) return;

    if (e.target.classList.contains("delete-btn")) {
        li.remove();
        saveData();
        return;
    }

    if (e.target.classList.contains("edit-btn")) {
        let span = li.querySelector("span");
        let updated = prompt("Edit task", span.innerText);

        if (updated !== null && updated.trim() !== "") {
            span.innerText = updated;
            saveData();
        }
        return;
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
    if (!data) {
    console.log("No tasks found");
    return;
}

    let tasks = JSON.parse(data);

    tasks.forEach(function (task) {
        let li = createTaskElement(task.text, task.done);
        listContainer.appendChild(li);
    });
}