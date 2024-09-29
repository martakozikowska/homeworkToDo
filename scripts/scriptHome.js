// Funkcjonalności dla sekcji HOME

// Funkcja odpowiadająca za dodawanie nowego zadania do listy zadań
function addTaskHome() {
    const taskText = taskInputH.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");

        // Dodaj przycisk do zmiany statusu zadania
        const statusBtn = document.createElement("button");
        statusBtn.textContent = "";
        statusBtn.addEventListener("click", toggleTaskStatus);
        statusBtn.classList.add("btn-status");
        li.appendChild(statusBtn);

        // Dodaj tekst zadania
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText; 
        li.appendChild(taskSpan); 

        // Dodaj przycisk usuwania
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", deleteTask);
        deleteBtn.classList.add("btn-delete");
        li.appendChild(deleteBtn);

        li.addEventListener("click", completeTask);
        
        taskListH.appendChild(li);
        taskInputH.value = "";

        saveTasksToLocalStorageHome();
    }
}

// Funkcja do zmiany statusu zadania na wykonane
function toggleTaskStatus(event) {
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
    taskListH.appendChild(taskItem);
    
    saveTasksToLocalStorageHome();
}

// Funkcja przełączająca klasę Completed w celu oznaczenia go jako ukończone lub nie
function completeTask(event) {
    const task = event.target;
    task.classList.toggle("Completed");
}

// Funkcja usuwająca zadanie z listy po kliknięciu na przycisk usuwania
function deleteTask(event) {
    const task = event.target.parentElement;
    taskListH.removeChild(task);
    saveTasksToLocalStorageHome();
}

// Funkcja zapisująca zadania do lokalnego magazynu
function saveTasksToLocalStorageHome() {
    const taskItems = taskListH.querySelectorAll("li");
    const tasks = [];

    taskItems.forEach(taskItem => {
        const taskText = taskItem.querySelector("span").textContent.trim();
        const isCompleted = taskItem.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Funkcja wczytująca zadania z lokalnego magazynu
function loadTasksFromLocalStorageHome() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        // Wyczyść listę przed dodaniem nowych zadań
        taskListH.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement("li");

            // Dodaj przycisk do zmiany statusu zadania
            const statusBtn = document.createElement("button");
            statusBtn.textContent = "";
            statusBtn.addEventListener("click", toggleTaskStatus);
            statusBtn.classList.add("btn-status");

            // Dodaj tekst zadania
            const taskSpan = document.createElement("span");
            taskSpan.textContent = task.text; 

            // Dodaj przycisk usuwania
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "x";
            deleteBtn.addEventListener("click", deleteTask);
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

            taskListH.appendChild(li);
        });
    }
}

window.onload = function() {
    loadTasksFromLocalStorageHome();
};

loadTasksFromLocalStorageHome();
