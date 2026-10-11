
"use strict";

const USERS_KEY = "secureAuthUsers";
const SESSION_KEY = "secureAuthSession";

// Read registered users safely.
function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

// Display form messages.
function showMessage(elementId, message, type = "error") {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.textContent = message;
  element.className = `message ${type}`;
}

// Create a random salt for password hashing.
function createSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Hash password + salt using SHA-256.
// Educational demo only: production apps should use Argon2id or bcrypt
// on the server, with appropriate password-hashing parameters.
async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(salt + password);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Compare hashes without returning early on a differing character.
function hashesMatch(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }

  if (a.length !== b.length) return false;

  let difference = 0;

  for (let i = 0; i < a.length; i++) {
    difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return difference === 0;
}

// Registration form.
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async event => {
    event.preventDefault();

    const username = document
      .getElementById("registerUsername").value.trim();

    const email = document
      .getElementById("registerEmail").value.trim().toLowerCase();

    const password = document
      .getElementById("registerPassword").value;

    const confirmPassword = document
      .getElementById("confirmPassword").value;

    if (!username || !email || !password || !confirmPassword) {
      showMessage("registerMessage", "Please fill in all fields.");
      return;
    }

    if (username.length < 3) {
      showMessage(
        "registerMessage",
        "Username must contain at least 3 characters."
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage(
        "registerMessage",
        "Please enter a valid email address."
      );
      return;
    }

    if (password.length < 8 || !/\d/.test(password)) {
      showMessage(
        "registerMessage",
        "Password must have at least 8 characters and 1 number."
      );
      return;
    }

    if (password !== confirmPassword) {
      showMessage(
        "registerMessage",
        "Passwords do not match."
      );
      return;
    }

    const users = getUsers();

    const duplicate = users.some(user =>
      user.email === email ||
      user.username.toLowerCase() === username.toLowerCase()
    );

    if (duplicate) {
      showMessage(
        "registerMessage",
        "This username or email is already registered."
      );
      return;
    }

    try {
      const salt = createSalt();
      const passwordHash = await hashPassword(password, salt);

      // Never save the original password.
      users.push({
        username,
        email,
        salt,
        passwordHash
      });

      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      showMessage(
        "registerMessage",
        "Account created successfully! Redirecting to login...",
        "success"
      );

      registerForm.reset();

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);

      showMessage(
        "registerMessage",
        "Unable to register. Please try again in a secure browser context."
      );
    }
  });
}

// Login form.
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    const email = document
      .getElementById("loginEmail").value.trim().toLowerCase();

    const password = document
      .getElementById("loginPassword").value;

    if (!email || !password) {
      showMessage("loginMessage", "Please enter your email and password.");
      return;
    }

    try {
      const users = getUsers();

      const user = users.find(item => item.email === email);

      // Use the same error message for unknown email and wrong password.
      if (!user || !user.salt || !user.passwordHash) {
        showMessage(
          "loginMessage",
          "Invalid email or password. Please try again."
        );
        return;
      }

      const attemptedHash = await hashPassword(password, user.salt);

      if (!hashesMatch(attemptedHash, user.passwordHash)) {
        showMessage(
          "loginMessage",
          "Invalid email or password. Please try again."
        );
        return;
      }

      // Store only session information, not the password.
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          email: user.email,
          username: user.username
        })
      );

      window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Login error:", error);

      showMessage(
        "loginMessage",
        "Unable to sign in. Please try again."
      );
    }
  });
}

// Check dashboard access.
if (window.location.pathname.endsWith("dashboard.html")) {
  let session = null;

  try {
    session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  } catch {
    session = null;
  }

  const user = session && typeof session.email === "string"
    ? getUsers().find(item =>
        item.email === session.email &&
        item.username === session.username
      )
    : null;

  if (!user) {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.replace("index.html");
  } else {
    document.getElementById("welcomeUser").textContent = user.username;
  }
}

// Logout.
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.replace("index.html");
  });
}