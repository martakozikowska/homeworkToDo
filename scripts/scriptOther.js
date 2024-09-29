// Funkcjonalności dla sekcji OTHER

// Funkcja odpowiadająca za dodawanie nowego zadania do listy zadań
function addTaskOther() {
    const taskText = taskInputO.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");

        // Dodaj przycisk do zmiany statusu zadania
        const statusBtn = document.createElement("button");
        statusBtn.textContent = "";
        statusBtn.addEventListener("click", toggleTaskStatusOther);
        statusBtn.classList.add("btn-status");
        li.appendChild(statusBtn);

        // Dodaj tekst zadania
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText; 
        li.appendChild(taskSpan); 

        // Dodaj przycisk usuwania
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", deleteTaskOther);
        deleteBtn.classList.add("btn-delete");
        li.appendChild(deleteBtn);

        li.addEventListener("click", completeTask);
        
        taskListO.appendChild(li);
        taskInputO.value = "";

        saveTasksToLocalStorageOther();
    }
}

// Funkcja do zmiany statusu zadania na wykonane
function toggleTaskStatusOther(event) {
    const taskItem = event.target.parentNode;
    taskItem.classList.toggle("completed");

    // Zmień wygląd przycisku
    const statusBtn = event.target;
    if (taskItem.classList.contains("completed")) {
        statusBtn.textContent = "✓"; // Ustaw symbol "✓" dla wykonanych zadań
    } else {
        statusBtn.textContent = ""; // Usuń tekst dla niewykonanych zadań
    }
    statusBtn.classList.toggle("completed");

    // Przesuń zadanie na koniec listy
    taskListO.appendChild(taskItem);
    
    saveTasksToLocalStorageOther();
}

// Funkcja przełączająca klasę Completed w celu oznaczenia go jako ukończone lub nie
function completeTask(event) {
    const task = event.target;
    task.classList.toggle("Completed");
}

// Funkcja usuwająca zadanie z listy po kliknięciu na przycisk usuwania
function deleteTaskOther(event) {
    const task = event.target.parentElement;
    taskListO.removeChild(task);
    saveTasksToLocalStorageOther();
}

// Funkcja zapisująca zadania do lokalnego magazynu
function saveTasksToLocalStorageOther() {
    const taskItems = taskListO.querySelectorAll("li");
    const tasks = [];

    taskItems.forEach(taskItem => {
        const taskText = taskItem.querySelector("span").textContent.trim();
        const isCompleted = taskItem.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem("tasksOther", JSON.stringify(tasks)); // Używamy klucz
}

// Funkcja wczytująca zadania z lokalnego magazynu
function loadTasksFromLocalStorageOther() {
    const tasks = JSON.parse(localStorage.getItem("tasksOther"));
    if (tasks) {
        // Wyczyść listę przed dodaniem nowych zadań
        taskListO.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement("li");

            // Dodaj przycisk do zmiany statusu zadania
            const statusBtn = document.createElement("button");
            statusBtn.textContent = "";
            statusBtn.addEventListener("click", toggleTaskStatusOther);
            statusBtn.classList.add("btn-status");

            // Dodaj tekst zadania
            const taskSpan = document.createElement("span");
            taskSpan.textContent = task.text; 

            // Dodaj przycisk usuwania
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "x";
            deleteBtn.addEventListener("click", deleteTaskOther);
            deleteBtn.classList.add("btn-delete");

            li.appendChild(statusBtn);
            li.appendChild(taskSpan); 
            li.appendChild(deleteBtn);

            li.addEventListener("click", completeTask);

            // Sprawdź stan zadania i ustaw odpowiednie klasy
            if (task.completed) {
                li.classList.add("completed");
                statusBtn.textContent = "✓"; // Ustaw symbol "✓" dla wykonanych zadań
                statusBtn.classList.add("completed");
            }

            taskListO.appendChild(li);
        });
    }
}

window.onload = function() {
    loadTasksFromLocalStorageOther();
};

loadTasksFromLocalStorageOther();










