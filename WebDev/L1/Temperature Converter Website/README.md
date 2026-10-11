# 🌡️ OIBSIP Level 1 — Task 3: Temperature Converter Website

<p align="center">
  <img src="https://img.shields.io/badge/OIBSIP-Level%201-FF6B00?style=for-the-badge" alt="OIBSIP Level 1" />
  <img src="https://img.shields.io/badge/Task-Temperature%20Converter-2563EB?style=for-the-badge" alt="Temperature Converter" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

<p align="center">
  <b>A simple, interactive, and user-friendly temperature conversion tool.</b>
</p>

---

## 📌 Project Overview

The **Temperature Converter Website** is Task 3 of Level 1 in my Oasis Infobyte (OIBSIP) Web Development and Designing Internship.

The objective of this project is to build an interactive web application that converts temperature values between Celsius, Fahrenheit, and Kelvin using JavaScript. It focuses on input validation, mathematical calculations, error handling, and a clean user interface.

## 🎯 Objectives

* Convert temperatures between Celsius, Fahrenheit, and Kelvin.
* Practice JavaScript fundamentals and DOM manipulation.
* Validate user input and display meaningful error messages.
* Handle absolute-zero restrictions correctly.
* Create a clean, centred, and responsive interface.

## 🛠️ Tech Stack

| Technology         | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| HTML5              | Structure, input fields, selectors, and result areas   |
| CSS3               | Styling, layout, typography, and responsiveness        |
| Vanilla JavaScript | Temperature conversion, validation, and event handling |

**No external JavaScript libraries are required.**

## ✨ Feature Checklist

* [ ] **Numeric Input:** Accept a temperature value from the user.
* [ ] **Input Validation:** Reject invalid or non-numeric values and display an error message.
* [ ] **Input Unit Selector:** Choose Celsius, Fahrenheit, or Kelvin.
* [ ] **Output Unit Selection:** Select a target unit or display all converted units simultaneously.
* [ ] **Convert Button:** Trigger the conversion when clicked.
* [ ] **Result Display:** Show converted values with correct unit labels.
* [ ] **Absolute Zero Validation:** Reject temperatures below absolute zero.
* [ ] **Error Handling:** Display clear, user-friendly validation messages.
* [ ] **Clean UI:** Use a centred layout, readable labels, and clearly organized controls.
* [ ] **Responsive Design:** Ensure usability on desktop, tablet, and mobile devices.

> Replace `[ ]` with `[x]` after implementing and testing each feature.

## 🧮 Temperature Conversion Formulas

The application can use the following formulas:

### Celsius to Fahrenheit

$$
°F = (°C \times \frac{9}{5}) + 32
$$

### Fahrenheit to Celsius

$$
°C = (°F - 32) \times \frac{5}{9}
$$

### Celsius to Kelvin

$$
K = °C + 273.15
$$

### Kelvin to Celsius

$$
°C = K - 273.15
$$

### Fahrenheit to Kelvin

$$
K = (°F - 32) \times \frac{5}{9} + 273.15
$$

### Kelvin to Fahrenheit

$$
°F = (K - 273.15) \times \frac{9}{5} + 32
$$

## 🌡️ Absolute Zero Validation

Absolute zero is the lowest physically possible temperature.

| Unit       | Absolute Zero |
| ---------- | ------------: |
| Celsius    |    −273.15 °C |
| Fahrenheit |    −459.67 °F |
| Kelvin     |           0 K |

The application should reject values below absolute zero and show a helpful message instead of producing a normal conversion result.

**Example error message:**

`Invalid temperature: the value cannot be below absolute zero.`

The check should be performed against the selected input unit before conversion. Small floating-point tolerances may be used to avoid rejecting valid values because of rounding.

## 📂 Project Structure

```text
Task-3-Temperature-Converter/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

The filenames may be adjusted to match your actual project.

## 🚀 How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/Akash-Kheto/OIBSIP.git
   ```

2. Navigate to the repository:

   ```bash
   cd OIBSIP
   ```

3. Open the `Task-3-Temperature-Converter` folder in VS Code.

4. Open `index.html` in your browser, or use the Live Server extension.

5. Enter a temperature, select the input unit, and click **Convert** to view the result.

No installation or build process is required for this standalone frontend project.

## 🧪 Testing Checklist

Test the application with the following cases:

| Test Case                       | Expected Behaviour                        |
| ------------------------------- | ----------------------------------------- |
| `0 °C`                          | Converts to `32 °F` and `273.15 K`        |
| `100 °C`                        | Converts to `212 °F` and `373.15 K`       |
| `32 °F`                         | Converts to `0 °C` and `273.15 K`         |
| `0 K`                           | Converts to `−273.15 °C` and `−459.67 °F` |
| Empty input                     | Displays a validation message             |
| Invalid text                    | Displays an error message                 |
| Temperature below absolute zero | Rejects the input                         |
| Valid decimal input             | Calculates the correct conversion         |

## 📱 User Interface and Responsiveness

The interface should include:

* A clear page title and short description.
* A labelled temperature input.
* An input-unit dropdown or radio buttons.
* A prominent Convert button.
* A dedicated result and error-message area.
* Responsive spacing and readable typography.

## 📚 Learning Outcomes

Through this project, I aim to improve my understanding of:

* HTML forms and input elements
* CSS layouts and responsive design
* JavaScript variables, functions, and conditionals
* DOM manipulation and event listeners
* Numeric validation and error handling
* Mathematical formulas and unit conversion
* Testing edge cases and handling invalid data

## 👨‍💻 Author

**Akash Kheto**

* GitHub: [Akash-Kheto](https://github.com/Akash-Kheto)
* Repository: [OIBSIP](https://github.com/Akash-Kheto/OIBSIP)

## 🏢 Internship Details

* **Organization:** Oasis Infobyte
* **Track:** Web Development and Designing
* **Level:** Level 1
* **Task:** Task 3 — Temperature Converter Website

---

<p align="center">
  <b>Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript</b>
  <br/>
  <i>Learn by building. Improve by testing.</i>
</p>
