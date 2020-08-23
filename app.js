// document.write("write something here to  manipulate at the time");
const form = document.querySelector("#task-form");
const collection = document.querySelector(".collection");
const clrBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskinput = document.querySelector("#task");
// load event listeners


execute();


function execute() {
    document.addEventListener("DOMContentLoaded", getTasks);

    form.addEventListener("submit", runsome);
    //remove task event
    collection.addEventListener("click", runsome2);

    //clear tasks totally
    clrBtn.addEventListener("click", runsome3);

    filter.addEventListener("keyup", runsome4);

}
// defining get tasks
function getTasks() {
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function (task) {
        const newelement = document.createElement("li");
        newelement.className = "collection-item";
        newelement.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement("a");
        link.className = "delete-item secondary-content"
        link.innerHTML = '<i class="fa fa-remove"></i>';
        newelement.appendChild(link);

        // console.log(newelement);
        collection.appendChild(newelement);
    })


}

function runsome(e) {
    // e.preventDefault();

    if (taskinput.value === "") {
        alert("please enter something here");
    }
    const newelement = document.createElement("li");
    newelement.className = "collection-item";
    newelement.appendChild(document.createTextNode(taskinput.value));
    //create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content"
    link.innerHTML = '<i class="fa fa-remove"></i>';
    newelement.appendChild(link);

    // console.log(newelement);
    collection.appendChild(newelement);

    //store in the local storage
    storeTask(taskinput.value);

    taskinput.value = " ";
    // collection.localName(collection);



    e.preventDefault();

}

function storeTask(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task
function runsome2(e) {
    if (e.target.parentElement.classList.contains("delete-item"))
        // console.log(e.target);
        if (confirm("Are you sure ?")) {
            e.target.parentElement.parentElement.remove();
            //remove li

            removetaskfromstorage(e.target.parentElement.parentElement);

        }
}


function removetaskfromstorage(taskitem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function (task, index) {
        if (taskitem.textContent === task) {
            tasks.splice(index, 1);
        }


    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function runsome3() {
    // collection.innerHTML = "";
    while (collection.firstChild) {
        collection.removeChild(collection.firstChild);

    }
    cleartaskfromLocal();
}

function cleartaskfromLocal() {
    localStorage.clear();
}

function runsome4(e) {
    const j = e.target.value.toLowerCase();
    // console.log(j);
    document.querySelectorAll(".collection-item").forEach(function (m) {
        // console.log(m);
        const c = m.firstChild.textContent;
        if (c.toLowerCase().indexOf(j) != -1) {
            m.style.display = "block";
        } else {
            m.style.display = "none";

        }


    })
}