
function bookExperience(experienceType) {
    let message = "";

    switch (experienceType) {
        case "village-tour":
            message = "You selected a Village Tour. We will connect you with a local guide!";
            break;
        case "dance-workshop":
            message = "You selected a Dance Workshop. Get ready to learn Jharkhand's traditional dance!";
            break;
        case "festival-package":
            message = "You selected a Festival Package. We'll share upcoming festival details soon!";
            break;
        default:
            message = "Thank you for exploring cultural experiences!";
    }

    alert(message);
}

// Optional: Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Mobile menu toggle (if using hamburger nav)
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    });
}