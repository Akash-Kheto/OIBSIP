
document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth scrolling for internal navigation links
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 2. Reveal sections when they enter the viewport
    const revealElements = document.querySelectorAll(
        ".bio-block, .timeline-card, .recognition-item, " +
        ".section-heading, .quote-content, .closing"
    );

    // Fallback for browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    } else {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }

    // 3. Add a subtle shadow to the navbar while scrolling
    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (navbar) {
            navbar.classList.toggle(
                "navbar-scrolled",
                window.scrollY > 20
            );
        }
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    // 4. Handle portrait image loading and errors
    const portrait = document.querySelector(".portrait");

    if (portrait) {
        portrait.addEventListener("load", () => {
            portrait.classList.add("image-loaded");
        });

        portrait.addEventListener("error", () => {
            portrait.classList.add("image-error");
            console.warn(
                "Portrait image could not be loaded. " +
                "Please check the image URL."
            );
        });

        // Handle images that loaded before the listener was attached
        if (portrait.complete && portrait.naturalWidth > 0) {
            portrait.classList.add("image-loaded");
        }
    }

    // 5. Automatically update the footer year if needed
    const footerYear = document.querySelector(".footer-year");

    if (footerYear) {
        footerYear.textContent = "1931 — 2015";
    }

    // 6. Log successful initialization in the browser console
    console.log("Tribute Page initialized successfully.");
});