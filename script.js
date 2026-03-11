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
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

showTask();