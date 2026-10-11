/* ================================
   PRELOADER
================================ */

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    preloader.classList.add("hide");

    setTimeout(function () {
      preloader.style.display = "none";
    }, 600);
  }
});

/* =================================
   SCROLL PROGRESS BAR
================================= */

const scrollProgressBar = document.getElementById("scrollProgressBar");

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgressBar.style.width = percent + "%";
});

/* =================================
   ANIMATED COUNTERS
================================= */

const counters = document.querySelectorAll("[data-count]");

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-count"), 10);

  const suffix = element.getAttribute("data-suffix") || "";

  const duration = 1500;

  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);

    const value = Math.floor(progress * target);

    element.textContent = value + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);

        counterObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.5,
  },
);

counters.forEach(function (counter) {
  counterObserver.observe(counter);
});

/* =================================
   ANIMATED SKILL BARS
================================= */

const progressBars = document.querySelectorAll(".progress-bar");

progressBars.forEach(function (bar) {
  const finalWidth = bar.style.width;

  bar.setAttribute("data-width", finalWidth);

  bar.style.width = "0%";
});

const skillObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar = entry.target;

        bar.style.width = bar.getAttribute("data-width");

        skillObserver.unobserve(bar);
      }
    });
  },

  {
    threshold: 0.4,
  },
);

progressBars.forEach(function (bar) {
  skillObserver.observe(bar);
});

/* =================================
   MOBILE MENU
================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");

  const icon = menuBtn.querySelector("i");

  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

/* =================================
   CLOSE MOBILE MENU
================================= */

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");

    const icon = menuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

/* =================================
   DARK / LIGHT MODE
================================= */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");

  themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
} else {
  document.body.classList.remove("light-theme");

  themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");

  if (isLight) {
    localStorage.setItem("portfolioTheme", "light");

    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    localStorage.setItem("portfolioTheme", "dark");

    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
});

/* =================================
   TYPING ANIMATION
================================= */

const typingText = document.getElementById("typingText");

const roles = ["Software Developer & Data Analytics"];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = currentRole.substring(0, characterIndex + 1);

    characterIndex++;

    if (characterIndex === currentRole.length) {
      deleting = true;

      setTimeout(typeEffect, 1500);

      return;
    }
  } else {
    typingText.textContent = currentRole.substring(0, characterIndex - 1);

    characterIndex--;

    if (characterIndex === 0) {
      deleting = false;

      roleIndex++;

      if (roleIndex === roles.length) {
        roleIndex = 0;
      }
    }
  }

  const speed = deleting ? 60 : 100;

  setTimeout(typeEffect, speed);
}

typeEffect();

/* =================================
   PROJECT FILTER
================================= */

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach(function (card) {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

/* =================================
   PROJECT SEARCH
================================= */

const projectSearch = document.getElementById("projectSearch");

projectSearch.addEventListener("input", function () {
  const searchValue = projectSearch.value.toLowerCase().trim();

  projectCards.forEach(function (card) {
    const title = card.getAttribute("data-title").toLowerCase();

    const content = card.textContent.toLowerCase();

    if (title.includes(searchValue) || content.includes(searchValue)) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
});

/* =================================
   PROJECT MODAL
================================= */

const modal = document.getElementById("projectModal");

const modalContent = document.getElementById("modalContent");

const closeModal = document.getElementById("closeModal");

const projectDetails = {
  ecommerce: {
    title: "E-Commerce Website",

    description:
      "A responsive e-commerce frontend website built using HTML, CSS and JavaScript.",

    technologies: ["HTML", "CSS", "JavaScript"],

    features: [
      "Responsive navigation",

      "Product cards",

      "Search functionality",

      "Add to cart interaction",

      "Responsive layout",

      "Interactive buttons",
    ],
  },

  madhav: {
    title: "Madhav E-Commerce Dashboard",

    description:
      "An interactive Power BI dashboard for analyzing e-commerce sales and business performance.",

    technologies: ["Power BI", "DAX", "Data Analysis"],

    features: [
      "Sales by city",

      "Profit by month",

      "Quantity by category",

      "Payment method analysis",

      "Profit by category",

      "Interactive dashboard",
    ],
  },

  vrinda: {
    title: "Vrinda Store Data Analysis",

    description:
      "An Excel-based sales analysis project using PivotTables, PivotCharts and slicers.",

    technologies: ["Excel", "PivotTables", "PivotCharts"],

    features: [
      "Monthly sales analysis",

      "Order analysis",

      "Gender analysis",

      "Top states",

      "Age group analysis",

      "Sales channel analysis",
    ],
  },

  kishan: {
    title: "Kishan Setu",

    description:
      "A smart farmer procurement management system developed to improve procurement scheduling and produce tracking.",

    technologies: ["React", "Node.js", "MongoDB", "Socket.IO"],

    features: [
      "Farmer dashboard",

      "Procurement scheduling",

      "Queue updates",

      "Produce status tracking",

      "Role-based access",

      "Admin management",
    ],
  },

  python: {
    title: "E-Commerce Data Analysis",

    description:
      "A Python data analytics project using Pandas and NumPy for data cleaning and analysis.",

    technologies: ["Python", "Pandas", "NumPy"],

    features: [
      "Data cleaning",

      "Missing value handling",

      "Data exploration",

      "Statistical analysis",

      "Data visualization",
    ],
  },

  fake: {
    title: "Fake News Detection",

    description:
      "A text classification project using Python and machine learning techniques.",

    technologies: ["Python", "Pandas", "Machine Learning"],

    features: [
      "Text preprocessing",

      "Dataset analysis",

      "Feature preparation",

      "Classification",

      "Model evaluation",
    ],
  },
};

const detailButtons = document.querySelectorAll(".details-btn");

detailButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const projectName = button.getAttribute("data-project");

    const project = projectDetails[projectName];

    if (!project) return;

    let featuresHTML = "";

    project.features.forEach(function (feature) {
      featuresHTML += `<li>${feature}</li>`;
    });

    let techHTML = "";

    project.technologies.forEach(function (tech) {
      techHTML += `<span class="tech-tag">${tech}</span>`;
    });

    modalContent.innerHTML = `

            <h2>${project.title}</h2>

            <p>
                ${project.description}
            </p>

            <h3>Technologies</h3>

            <div class="tech-tags">
                ${techHTML}
            </div>

            <h3>Key Features</h3>

            <ul>
                ${featuresHTML}
            </ul>

        `;

    modal.classList.add("show");
  });
});

/* =================================
   CLOSE MODAL
================================= */

closeModal.addEventListener("click", function () {
  modal.classList.remove("show");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.classList.remove("show");
  }
});

/* =================================
   CONTACT FORM
================================= */

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async function (event) {
  // Stop normal form submission
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim();

  const subject = document.getElementById("subject").value.trim();

  const message = document.getElementById("message").value.trim();

  // Validation
  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please fill all fields.";
    return;
  }

  // Show sending message
  formStatus.textContent = "Sending...";

  try {
    // Send data to backend
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
      }),
    });

    const data = await response.json();

    // Backend response
    if (data.success) {
      formStatus.textContent = "Message sent successfully! ✅";
      contactForm.reset();
    } else {
      formStatus.textContent = data.message || "Something went wrong.";
    }
  } catch (error) {
    console.error(error);
    formStatus.textContent = "Unable to connect to server.";
  }
});

/* =================================
   CURRENT YEAR
================================= */

document.getElementById("year").textContent = new Date().getFullYear();

/* =================================
   BACK TO TOP
================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

/* =================================
   ACTIVE NAVIGATION
================================= */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", function () {
  let current = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(function (link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* =================================
   SCROLL REVEAL
================================= */

const revealElements = document.querySelectorAll(
  ".section, .project-card, .skill-box, .profile-card, .certificate-card",
);

revealElements.forEach(function (element) {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.1,
  },
);

revealElements.forEach(function (element) {
  revealObserver.observe(element);
});

/* =================================
   INTERACTIVE ACTIVITY CARDS
================================= */

const activityCards = document.querySelectorAll(".activity-card");

activityCards.forEach(function (card) {
  card.addEventListener("pointermove", function (event) {
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--tilt-x", y * -5 + "deg");
    card.style.setProperty("--tilt-y", x * 5 + "deg");
  });

  card.addEventListener("pointerleave", function () {
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });
});
