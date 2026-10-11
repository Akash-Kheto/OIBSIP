# ✅ OIBSIP Level 2 — Task 3: To-Do Web App

<p align="center">
  <img src="https://img.shields.io/badge/OIBSIP-Level%202-FF6B00?style=for-the-badge" alt="OIBSIP Level 2" />
  <img src="https://img.shields.io/badge/Task-To--Do%20Web%20App-2563EB?style=for-the-badge" alt="To-Do Web App" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

<p align="center">
  <b>An interactive task management application for organizing daily activities and tracking progress.</b>
</p>

---

## 📌 Project Overview

The **To-Do Web App** is Task 3 of Level 2 in my Oasis Infobyte (OIBSIP) Web Development and Designing Internship.

The objective of this project is to develop an interactive task management application that allows users to add, complete, edit, and delete tasks. Tasks are organized into separate Pending Tasks and Completed Tasks lists, making daily activities easier to manage.

The project focuses on JavaScript DOM manipulation, event handling, application state management, and browser-based data persistence.

## 🎯 Objectives

* Create and manage daily tasks.
* Organize tasks into pending and completed lists.
* Allow users to edit and delete existing tasks.
* Display task counts for both lists.
* Provide helpful empty-state messages.
* Persist tasks across page refreshes using LocalStorage.
* Build a clean, responsive, and user-friendly interface.

## 🛠️ Tech Stack

| Technology         | Purpose                                               |
| ------------------ | ----------------------------------------------------- |
| HTML5              | Application structure and task lists                  |
| CSS3               | Styling, layouts, and responsive design               |
| Vanilla JavaScript | Task management, DOM manipulation, and event handling |
| LocalStorage       | Saving tasks in the browser                           |

No external JavaScript library is required for the basic implementation.

## ✨ Feature Checklist

* [ ] **Add Task:** Input field and Add Task button to create new tasks.
* [ ] **Pending Tasks:** Newly added tasks appear immediately in the Pending Tasks list.
* [ ] **Mark Complete:** Toggle task status and move completed tasks to the Completed Tasks list.
* [ ] **Edit Task:** Modify task text directly within the task item.
* [ ] **Delete Task:** Permanently remove a task from either list.
* [ ] **Task Counters:** Display the number of pending and completed tasks.
* [ ] **Timestamps (Bonus):** Show when a task was added and/or completed.
* [ ] **LocalStorage (Bonus):** Preserve tasks across browser refreshes.
* [ ] **Empty States:** Display friendly messages when either list has no tasks.
* [ ] **Input Validation:** Prevent empty or whitespace-only tasks from being added.
* [ ] **Responsive Design:** Keep the application usable on desktop and mobile devices.

> Replace `[ ]` with `[x]` after implementing and testing each feature.

## 📋 Application Workflow

### 1. Add a Task

Enter a task in the input field and click **Add Task**. The new task appears in the Pending Tasks list.

### 2. Complete a Task

Click the **Mark Complete** toggle to move the task from Pending Tasks to Completed Tasks.

### 3. Edit a Task

Click **Edit** to modify the task description inline and save the updated text.

### 4. Delete a Task

Click **Delete** to remove the task from the application.

### 5. Track Your Progress

Task counters automatically update when tasks are added, completed, edited, or deleted.

### 6. Save Tasks Automatically

When LocalStorage is implemented, task information remains available after refreshing the page in the same browser.

## 📊 Task Management Example

| Pending Tasks          | Completed Tasks        |
| ---------------------- | ---------------------- |
| Finish assignment      | Complete HTML practice |
| Study JavaScript       | Finish CSS exercises   |
| Prepare project README | Submit internship task |

*This table illustrates example tasks; it does not represent actual application data.*

## 🗂️ Task Information

Each task can store the following information:

| Property      | Description                                          |
| ------------- | ---------------------------------------------------- |
| `id`          | Unique identifier for the task                       |
| `text`        | Task description                                     |
| `completed`   | Whether the task is completed                        |
| `createdAt`   | Timestamp when the task was added                    |
| `completedAt` | Timestamp when the task was completed, if applicable |

A task's unique identifier helps ensure that editing, completing, and deleting one task does not accidentally affect another.

## 📂 Project Structure

```text
L2/
└── Task-3-To-Do-App/
    │
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md
```

The filenames may differ depending on your implementation.

## 🚀 How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/Akash-Kheto/OIBSIP.git
   ```

2. Navigate to the repository folder:

   ```bash
   cd OIBSIP
   ```

3. Open `L2/Task-3-To-Do-App` in VS Code.

4. Open `index.html` in your browser, or use the Live Server extension.

5. Add tasks and test the complete, edit, and delete functionality.

No installation or build process is required for this standalone frontend application.

## 🧪 Testing Checklist

* [ ] Adding a task updates the pending count.
* [ ] New tasks appear immediately in the Pending Tasks list.
* [ ] Completing a task moves it to Completed Tasks.
* [ ] The completed count updates correctly.
* [ ] Editing a task updates its description.
* [ ] Deleting a task removes it from the correct list.
* [ ] Empty or whitespace-only input is rejected.
* [ ] Empty-state messages appear when a list has no items.
* [ ] LocalStorage restores saved tasks after a page refresh.
* [ ] Timestamps display correctly, if implemented.
* [ ] The interface works on desktop and mobile screens.

## 📱 User Interface and Responsiveness

The application should include:

* A clearly labelled task input field.
* An easily accessible Add Task button.
* Separate Pending Tasks and Completed Tasks sections.
* Visible task counters.
* Clear Edit, Delete, and completion controls.
* Consistent spacing, readable typography, and clear visual feedback.
* A responsive layout that adapts to smaller screens.

## 🔐 Data and Privacy

This project uses browser LocalStorage when persistence is implemented. Stored tasks remain in the browser until they are removed or the site's stored data is cleared.

LocalStorage is suitable for a simple personal task manager, but it does not automatically synchronize tasks between devices or browsers.

## 📚 Learning Outcomes

Through this project, I aim to improve my understanding of:

* HTML forms and semantic elements
* CSS layouts and responsive design
* JavaScript functions, arrays, and objects
* DOM manipulation and event listeners
* CRUD operations: Create, Read, Update, and Delete
* Application state management
* LocalStorage and JSON serialization
* Input validation and empty-state handling
* Testing and debugging interactive applications

## 👨‍💻 Author

**Akash Kheto**

* GitHub: [Akash-Kheto](https://github.com/Akash-Kheto)
* Main Repository: [OIBSIP](https://github.com/Akash-Kheto/OIBSIP)

## 🏢 Internship Details

* **Organization:** Oasis Infobyte
* **Track:** Web Development and Designing
* **Level:** Level 2
* **Task:** Task 3 — To-Do Web App

---

<p align="center">
  <b>Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript</b>
  <br/>
  <i>Plan your tasks. Track your progress. Get things done.</i>
</p>
