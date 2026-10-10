"use strict";

// ========================================
// TaskFlow — To-Do App
// ========================================

const STORAGE_KEY = "taskflow_tasks_v1";

const elements = {
  form: document.getElementById("taskForm"),
  input: document.getElementById("taskInput"),
  hint: document.getElementById("formHint"),
  search: document.getElementById("searchInput"),

  pendingList: document.getElementById("pendingList"),
  completedList: document.getElementById("completedList"),

  totalCount: document.getElementById("totalCount"),
  pendingCount: document.getElementById("pendingCount"),
  completedCount: document.getElementById("completedCount"),
  progressCount: document.getElementById("progressCount"),

  allNavCount: document.getElementById("allNavCount"),
  pendingNavCount: document.getElementById("pendingNavCount"),
  completedNavCount: document.getElementById("completedNavCount"),

  pendingListCount: document.getElementById("pendingListCount"),
  completedListCount: document.getElementById("completedListCount"),

  mainProgress: document.getElementById("mainProgress"),
  tipProgress: document.getElementById("tipProgress"),
  tipProgressLabel: document.getElementById("tipProgressLabel"),

  currentDay: document.getElementById("currentDay"),
  currentDate: document.getElementById("currentDate"),
};

let tasks = loadTasks();
let activeFilter = "all";
let searchQuery = "";

// ========================================
// 1. Load saved tasks
// ========================================

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) return [];

    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) return [];

    return parsedTasks.filter((task) => {
      return (
        task &&
        typeof task.id === "string" &&
        typeof task.text === "string" &&
        task.text.trim().length > 0 &&
        typeof task.completed === "boolean" &&
        Number.isFinite(task.createdAt)
      );
    });
  } catch (error) {
    console.error("Could not load saved tasks:", error);
    return [];
  }
}

// ========================================
// 2. Save tasks to localStorage
// ========================================

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Could not save tasks:", error);
    showMessage("Storage unavailable. Your latest changes may not persist.");
    return false;
  }
}

// ========================================
// 3. Utility functions
// ========================================

function createId() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(timestamp));
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function showMessage(message, isError = false) {
  elements.hint.textContent = message;
  elements.hint.style.color = isError ? "#ff9696" : "";
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

// ========================================
// 4. Add a new task
// ========================================

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = elements.input.value.trim();

  if (!text) {
    showMessage("Please enter a task before adding.", true);
    elements.input.focus();
    return;
  }

  if (text.length > 200) {
    showMessage("Task cannot exceed 200 characters.", true);
    return;
  }

  const task = {
    id: createId(),
    text,
    completed: false,
    createdAt: Date.now(),
    completedAt: null,
  };

  tasks.unshift(task);

  saveTasks();
  elements.input.value = "";
  elements.input.focus();

  showMessage("Task added successfully. Let's get it done!");
  renderTasks();
});

// ========================================
// 5. Complete / uncomplete a task
// ========================================

function toggleTask(id) {
  const task = getTaskById(id);

  if (!task) return;

  task.completed = !task.completed;
  task.completedAt = task.completed ? Date.now() : null;

  saveTasks();
  showMessage(
    task.completed
      ? "Nice work! Task completed."
      : "Task moved back to pending.",
  );

  renderTasks();
}

// ========================================
// 6. Delete a task
// ========================================

function deleteTask(id) {
  const task = getTaskById(id);

  if (!task) return;

  const confirmed = window.confirm(`Delete "${task.text}" permanently?`);

  if (!confirmed) return;

  tasks = tasks.filter((item) => item.id !== id);

  saveTasks();
  showMessage("Task deleted successfully.");
  renderTasks();
}

// ========================================
// 7. Edit a task inline
// ========================================

function startEditing(card, task) {
  const body = card.querySelector(".task-body");
  if (!body) return;

  body.replaceChildren();

  const form = document.createElement("form");
  form.className = "edit-form";

  const input = document.createElement("input");
  input.className = "edit-input";
  input.type = "text";
  input.value = task.text;
  input.maxLength = 200;
  input.required = true;
  input.setAttribute("aria-label", "Edit task");

  const actions = document.createElement("div");
  actions.className = "edit-actions";

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.className = "action-button complete-action";
  saveButton.textContent = "Save";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = "action-button";
  cancelButton.textContent = "Cancel";

  actions.append(saveButton, cancelButton);
  form.append(input, actions);
  body.append(form);

  input.focus();
  input.select();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newText = input.value.trim();

    if (!newText) {
      input.setCustomValidity("Task cannot be empty.");
      input.reportValidity();
      input.setCustomValidity("");
      input.focus();
      return;
    }

    const currentTask = getTaskById(task.id);
    if (!currentTask) return;

    currentTask.text = newText;

    saveTasks();
    showMessage("Task updated successfully.");
    renderTasks();
  });

  cancelButton.addEventListener("click", () => {
    renderTasks();
  });
}

// ========================================
// 8. Create task card safely
// ========================================

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = `task-card${task.completed ? " is-completed" : ""}`;
  card.dataset.id = task.id;

  const main = document.createElement("div");
  main.className = "task-main";

  const checkButton = document.createElement("button");
  checkButton.type = "button";
  checkButton.className = `task-check${task.completed ? " is-checked" : ""}`;
  checkButton.dataset.action = "toggle";
  checkButton.dataset.id = task.id;
  checkButton.textContent = task.completed ? "✓" : "";
  checkButton.setAttribute(
    "aria-label",
    task.completed ? "Mark as pending" : "Mark as complete",
  );
  checkButton.setAttribute("aria-pressed", String(task.completed));

  const body = document.createElement("div");
  body.className = "task-body";

  const text = document.createElement("p");
  text.className = "task-text";
  text.textContent = task.text;

  const meta = document.createElement("div");
  meta.className = "task-meta";

  const created = document.createElement("span");
  created.textContent = `Added ${formatDate(task.createdAt)} · ${formatTime(task.createdAt)}`;

  meta.append(created);

  if (task.completed && task.completedAt) {
    const completed = document.createElement("span");
    completed.className = "completion-meta";
    completed.textContent = `Completed ${formatDate(task.completedAt)} · ${formatTime(task.completedAt)}`;
    meta.append(completed);
  }

  body.append(text, meta);
  main.append(checkButton, body);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "action-button complete-action";
  toggleButton.dataset.action = "toggle";
  toggleButton.dataset.id = task.id;
  toggleButton.textContent = task.completed ? "↶ Undo" : "✓ Complete";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "action-button";
  editButton.dataset.action = "edit";
  editButton.dataset.id = task.id;
  editButton.textContent = "✎ Edit";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "action-button delete-action";
  deleteButton.dataset.action = "delete";
  deleteButton.dataset.id = task.id;
  deleteButton.textContent = "⌫ Delete";

  actions.append(toggleButton, editButton, deleteButton);
  card.append(main, actions);

  return card;
}

// ========================================
// 9. Empty state
// ========================================

function createEmptyState(isCompleted, isSearching) {
  const container = document.createElement("div");
  container.className = "empty-state";

  const icon = document.createElement("div");
  icon.className = "empty-icon";
  icon.textContent = isSearching ? "⌕" : isCompleted ? "✓" : "✦";

  const heading = document.createElement("h4");
  const description = document.createElement("p");

  if (isSearching) {
    heading.textContent = "No matching tasks";
    description.textContent = "Try another keyword or change your filter.";
  } else if (isCompleted) {
    heading.textContent = "Nothing completed yet";
    description.textContent = "Finish a task and your win will appear here.";
  } else {
    heading.textContent = "Your space to begin";
    description.textContent = "Add a task above and take the first step.";
  }

  container.append(icon, heading, description);

  return container;
}

// ========================================
// 10. Render tasks and update counters
// ========================================

function renderTasks() {
  const pending = tasks.filter((task) => !task.completed);
  const completed = tasks.filter((task) => task.completed);

  const total = tasks.length;
  const percentage =
    total === 0 ? 0 : Math.round((completed.length / total) * 100);

  // Dashboard statistics
  elements.totalCount.textContent = total;
  elements.pendingCount.textContent = pending.length;
  elements.completedCount.textContent = completed.length;
  elements.progressCount.textContent = `${percentage}%`;

  // Sidebar counts
  elements.allNavCount.textContent = total;
  elements.pendingNavCount.textContent = pending.length;
  elements.completedNavCount.textContent = completed.length;

  // List heading counts
  elements.pendingListCount.textContent = `${pending.length} pending`;
  elements.completedListCount.textContent = `${completed.length} completed`;

  // Progress bars
  elements.mainProgress.style.width = `${percentage}%`;
  elements.tipProgress.style.width = `${percentage}%`;
  elements.tipProgressLabel.textContent = `${percentage}% completed`;

  // Clear previous task cards
  elements.pendingList.replaceChildren();
  elements.completedList.replaceChildren();

  // Filter tasks by search keyword
  const matchesSearch = (task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase());

  const visiblePending = pending.filter(matchesSearch);
  const visibleCompleted = completed.filter(matchesSearch);

  const showPending = activeFilter === "all" || activeFilter === "pending";

  const showCompleted = activeFilter === "all" || activeFilter === "completed";

  // Render pending list
  if (showPending) {
    if (visiblePending.length === 0) {
      elements.pendingList.append(
        createEmptyState(false, searchQuery.length > 0),
      );
    } else {
      visiblePending.forEach((task) => {
        elements.pendingList.append(createTaskCard(task));
      });
    }
  }

  // Render completed list
  if (showCompleted) {
    if (visibleCompleted.length === 0) {
      elements.completedList.append(
        createEmptyState(true, searchQuery.length > 0),
      );
    } else {
      visibleCompleted.forEach((task) => {
        elements.completedList.append(createTaskCard(task));
      });
    }
  }

  // Keep both sets of filter buttons synchronized
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle("active", isActive);

    if (button.classList.contains("nav-item")) {
      if (isActive) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    }
  });
}

// ========================================
// 11. Handle task actions
// Event delegation supports dynamic cards
// ========================================

document.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  const task = getTaskById(id);

  if (!task) return;

  if (action === "toggle") {
    toggleTask(id);
  } else if (action === "edit") {
    const card = button.closest(".task-card");
    if (card) startEditing(card, task);
  } else if (action === "delete") {
    deleteTask(id);
  }
});

// ========================================
// 12. Filter tasks
// ========================================

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    renderTasks();
  });
});

// ========================================
// 13. Search tasks
// ========================================

elements.search.addEventListener("input", () => {
  searchQuery = elements.search.value.trim();
  renderTasks();
});

// ========================================
// 14. Display today's date
// ========================================

function updateDate() {
  const now = new Date();

  elements.currentDay.textContent = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
  }).format(now);

  elements.currentDate.textContent = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(now);
}

// ========================================
// 15. Initialize application
// ========================================

updateDate();
renderTasks();
