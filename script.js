const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){

    if(inputBox.value === ""){
        alert("You must write something!");
        return;
    }

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = inputBox.value;

    li.appendChild(span);

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.className = "edit-btn";

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    listContainer.appendChild(li);

    inputBox.value = "";

    saveData();
}


listContainer.addEventListener("click", function(e){

    if(e.target.tagName === "SPAN"){
        e.target.parentElement.classList.toggle("checked");
        saveData();
    }

    else if(e.target.classList.contains("delete-btn")){
        e.target.parentElement.remove();
        saveData();
    }

    else if(e.target.classList.contains("edit-btn")){
        let span = e.target.parentElement.querySelector("span");

        let newText = prompt("Edit task:", span.innerText);

        if(newText !== null && newText !== ""){
            span.innerText = newText;
            saveData();
        }
    }

});



function saveData(){

    let tasks = [];

    document.querySelectorAll("#list-container li").forEach(li => {

        let text = li.querySelector("span").innerText;
        let completed = li.classList.contains("checked");

        tasks.push({
            text: text,
            completed: completed
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function showTask(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    listContainer.innerHTML = "";

    tasks.forEach(task => {

        let li = document.createElement("li");

        if(task.completed){
            li.classList.add("checked");
        }

        let span = document.createElement("span");
        span.innerText = task.text;

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.className = "edit-btn";

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.className = "delete-btn";

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        listContainer.appendChild(li);

    });

}

showTask();

