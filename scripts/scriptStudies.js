// Funkcjonalności dla sekcji STUDIES

// Funkcja odpowiadająca za dodawanie nowego zadania do listy zadań
function addTaskStudies() {
    const taskText = taskInputS.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");

        // Dodaj przycisk do zmiany statusu zadania
        const statusBtn = document.createElement("button");
        statusBtn.textContent = "";
        statusBtn.addEventListener("click", toggleTaskStatusStudies);
        statusBtn.classList.add("btn-status");
        li.appendChild(statusBtn);

        // Dodaj tekst zadania
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText; 
        li.appendChild(taskSpan); 

        // Dodaj przycisk usuwania
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", deleteTaskStudies);
        deleteBtn.classList.add("btn-delete");
        li.appendChild(deleteBtn);

        li.addEventListener("click", completeTask);
        
        taskListS.appendChild(li);
        taskInputS.value = "";

        saveTasksToLocalStorageStudies();
    }
}

// Funkcja do zmiany statusu zadania na wykonane
function toggleTaskStatusStudies(event) {
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
    taskListS.appendChild(taskItem);
    
    saveTasksToLocalStorageStudies();
}

// Funkcja przełączająca klasę Completed w celu oznaczenia go jako ukończone lub nie
function completeTask(event) {
    const task = event.target;
    task.classList.toggle("Completed");
}

// Funkcja usuwająca zadanie z listy po kliknięciu na przycisk usuwania
function deleteTaskStudies(event) {
    const task = event.target.parentElement;
    taskListS.removeChild(task);
    saveTasksToLocalStorageStudies();
}

// Funkcja zapisująca zadania do lokalnego magazynu
function saveTasksToLocalStorageStudies() {
    const taskItems = taskListS.querySelectorAll("li");
    const tasks = [];

    taskItems.forEach(taskItem => {
        const taskText = taskItem.querySelector("span").textContent.trim();
        const isCompleted = taskItem.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem("tasksStudies", JSON.stringify(tasks)); // Używamy klucz
}

// Funkcja wczytująca zadania z lokalnego magazynu
function loadTasksFromLocalStorageStudies() {
    const tasks = JSON.parse(localStorage.getItem("tasksStudies"));
    if (tasks) {
        // Wyczyść listę przed dodaniem nowych zadań
        taskListS.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement("li");

            // Dodaj przycisk do zmiany statusu zadania
            const statusBtn = document.createElement("button");
            statusBtn.textContent = "";
            statusBtn.addEventListener("click", toggleTaskStatusStudies);
            statusBtn.classList.add("btn-status");

            // Dodaj tekst zadania
            const taskSpan = document.createElement("span");
            taskSpan.textContent = task.text; 

            // Dodaj przycisk usuwania
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "x";
            deleteBtn.addEventListener("click", deleteTaskStudies);
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

            taskListS.appendChild(li);
        });
    }
}

window.onload = function() {
    loadTasksFromLocalStorageStudies();
};

loadTasksFromLocalStorageStudies();
