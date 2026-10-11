# 🧮 OIBSIP Level 2 — Task 1: Calculator

<p align="center">
  <img src="https://img.shields.io/badge/OIBSIP-Level%202-FF6B00?style=for-the-badge" alt="OIBSIP Level 2" />
  <img src="https://img.shields.io/badge/Task-Calculator-2563EB?style=for-the-badge" alt="Calculator Task" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

<p align="center">
  <b>A simple, interactive, and fully functional browser-based calculator.</b>
</p>

---

## 📌 Project Overview

The **Calculator** is Task 1 of Level 2 in my Oasis Infobyte (OIBSIP) Web Development and Designing Internship.

The objective of this project is to build a browser-based calculator that performs basic arithmetic operations through a user-friendly button interface. It focuses on JavaScript logic, event handling, input management, error handling, and CSS Grid layouts.

## 🎯 Objectives

* Perform basic arithmetic calculations.
* Create an interactive calculator interface.
* Handle numeric input and decimal values.
* Support sequential operations and operator chaining.
* Prevent division-by-zero errors.
* Practice DOM manipulation and event listeners.
* Use CSS Grid to organize calculator buttons.

## 🛠️ Tech Stack

| Technology         | Purpose                                      |
| ------------------ | -------------------------------------------- |
| HTML5              | Calculator structure and buttons             |
| CSS3               | Styling, display layout, and CSS Grid        |
| Vanilla JavaScript | Calculations, event handling, and validation |

**No external JavaScript libraries are required.**

## ✨ Feature Checklist

* [ ] **Display Screen:** Shows the current input and calculation result.
* [ ] **Numeric Buttons:** Supports digits from `0` to `9`.
* [ ] **Decimal Input:** Allows decimal numbers.
* [ ] **Arithmetic Operators:** Addition (`+`), subtraction (`−`), multiplication (`×`), and division (`÷`).
* [ ] **Equals Button:** Evaluates the entered expression.
* [ ] **Clear Button (`C`):** Resets the calculator.
* [ ] **Backspace/Delete:** Removes the last entered character.
* [ ] **Division-by-Zero Protection:** Displays a helpful error instead of an invalid result.
* [ ] **Operator Chaining:** Allows sequential calculations without resetting after every operation.
* [ ] **CSS Grid Layout:** Aligns calculator buttons consistently.
* [ ] **Event Listeners:** Uses JavaScript event listeners instead of inline HTML `onclick` attributes.
* [ ] **Responsive Design:** Keeps the calculator usable on desktop and mobile devices.

> Replace `[ ]` with `[x]` after implementing and testing each feature.

## 🧠 Calculator Operations

The calculator should support the following operations:

| Operation           | Example        | Expected Result |
| ------------------- | -------------- | --------------: |
| Addition            | `5 + 3`        |             `8` |
| Subtraction         | `9 - 4`        |             `5` |
| Multiplication      | `6 × 7`        |            `42` |
| Division            | `8 ÷ 2`        |             `4` |
| Decimal calculation | `2.5 + 1.5`    |             `4` |
| Division by zero    | `8 ÷ 0`        |   Error message |
| Clear               | Press `C`      |  Display resets |
| Backspace           | `123` → Delete |            `12` |

## 🔗 Operator Chaining

The calculator should allow multiple operations in a sequence without requiring the user to clear the display after each operation.

For example:

```text
Input: 5 + 3 × 2
```

The result depends on the intended evaluation model:

* **Standard arithmetic precedence:** `5 + (3 × 2) = 11`
* **Sequential calculator evaluation:** `(5 + 3) × 2 = 16`

Choose and implement one behaviour consistently. Standard arithmetic precedence is recommended for a conventional expression calculator.

## 📂 Project Structure

```text
L2/
└── Task-1-Calculator/
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

2. Navigate to the repository:

   ```bash
   cd OIBSIP
   ```

3. Open `L2/Task-1-Calculator` in VS Code.

4. Open `index.html` in your browser, or use the Live Server extension.

No installation or build process is required for this standalone frontend project.

## 🧪 Testing Checklist

Test the calculator with these scenarios:

* [ ] Addition, subtraction, multiplication, and division work correctly.
* [ ] Decimal values produce correct results.
* [ ] Multiple operations can be entered sequentially.
* [ ] Clear resets the display.
* [ ] Backspace removes the last character.
* [ ] Division by zero displays an error message.
* [ ] Invalid or incomplete expressions are handled gracefully.
* [ ] Repeated decimal points in a single number are prevented.
* [ ] All buttons work without inline `onclick` attributes.
* [ ] The calculator remains usable on mobile screens.

## 📱 User Interface and Responsiveness

The interface should include:

* A clearly visible display screen.
* Consistently sized numeric and operator buttons.
* A CSS Grid layout for proper alignment.
* Distinct styling for operators and important actions.
* Appropriate spacing, contrast, and readable typography.
* A responsive container that fits smaller screens without horizontal overflow.

## 📚 Learning Outcomes

Through this project, I aim to improve my understanding of:

* HTML structure and semantic markup
* CSS Grid and responsive styling
* JavaScript functions and arithmetic operators
* DOM selection and event listeners
* Managing user input and application state
* Expression evaluation and operator precedence
* Error handling and input validation
* Testing edge cases and debugging

## 👨‍💻 Author

**Akash Kheto**

* GitHub: [Akash-Kheto](https://github.com/Akash-Kheto)
* Main Repository: [OIBSIP](https://github.com/Akash-Kheto/OIBSIP)

## 🏢 Internship Details

* **Organization:** Oasis Infobyte
* **Track:** Web Development and Designing
* **Level:** Level 2
* **Task:** Task 1 — Calculator

---

<p align="center">
  <b>Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript</b>
  <br/>
  <i>Practice, calculate, and keep improving.</i>
</p>
