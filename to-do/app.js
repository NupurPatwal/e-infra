// Selecting elements from the DOM
const taskInput = document.querySelector(".input-task");
const addButton = document.querySelector(".add-button");
const taskList = document.querySelector(".task-list");

// Initializing an array to store tasks
let tasks = [];


// On window load, retrieve tasks from localStorage and display them
window.addEventListener("load", () => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();
});

// Add a new task when the "ADD" button is clicked
addButton.addEventListener("click", () => {
  const newTask = taskInput.value.trim();

  if (newTask !== "") {
    tasks.push({ text: newTask, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskInput.value = ""; // Clear input field
  } else {
    alert("Please enter a task!");
  }
});

// Function to render tasks in the task list
function renderTasks() {
  taskList.innerHTML = ""; // Clear previous tasks

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${index})" />
        <span style="text-decoration: ${task.completed ? "line-through" : "none"}; color: ${
      task.completed ? "#9ca3af" : "#374151"
    }">${task.text}</span>
      </div>
      <div class="task-buttons">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
}

// Toggle task completion status
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Edit an existing task
function editTask(index) {
  const updatedTask = prompt("Edit your task:", tasks[index].text);

  if (updatedTask !== null) {
    tasks[index].text = updatedTask.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

// Delete a task
function deleteTask(index) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}
