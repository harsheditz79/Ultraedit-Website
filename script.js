const reviews = [
    "\"UltraEdit replaced all my aging IDEs with one tool for all my programming languages.\"",
    "\"Allowed me to edit server files directly through SSH. No FTP needed, with full syntax highlighting.\"",
    "\"Opened my files with 3 million line. UltraEdit edited it like a breeze.\"",
    "\"Files over 50MB that crash other editors? Easy for this tool. and with one tool in all languages\"",
    "\"Fast, reliable, and perfect for large data files an UltraEdit edited it like a breeze.\""
];

const icons = document.querySelectorAll(".ret-p");
const reviewText = document.getElementById("review-text");

let currentIndex = 0;
let interval;

function showReview(index) {
    reviewText.classList.remove("review-animate");
    void reviewText.offsetWidth;

    reviewText.textContent = reviews[index];
    reviewText.classList.add("review-animate");

    icons.forEach(icon => icon.classList.remove("active"));
    icons[index].classList.add("active");

    currentIndex = index;
}

function startAuto() {
    interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % reviews.length;
        showReview(currentIndex);
    }, 4000);
}

icons.forEach(icon => {
    icon.addEventListener("click", () => {
        clearInterval(interval);
        showReview(Number(icon.dataset.index));
        startAuto();
    });
});

showReview(0);
startAuto();

document.addEventListener("DOMContentLoaded", () => {

    const gifs = [
        "assets/huge_file-new-1.gif",
        "assets/reformat-new-1.gif",
        "assets/find_replace-new-1.gif"
    ];

    const slideTexts = [
        "\"Even with gigabyte-sized files and millions of lines, you can search, select, and edit as smoothly as you would with smaller files.\"",
        "\Before and after: UltraEdit gives you access to 500+ preconfigured wordfiles and easily work with any file format.\"",
        "\Adaptable plugins, find in files, and more: Powerful tools built in, all adaptable to your workflows, no matter the use case.\"",
    ];

    const current = document.querySelector(".slide.current");
    const next = document.querySelector(".slide.next");
    const dots = document.querySelectorAll(".dot");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const slideText = document.getElementById("slideText");

    let index = 0;
    let isAnimating = false;
    let autoTimeout;

    function updateDots(i) {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[i].classList.add("active");
    }

    function updateText(i) {
        slideText.classList.remove("show");
        slideText.offsetHeight;
        slideText.textContent = slideTexts[i];
        setTimeout(() => {
            slideText.classList.add("show");
        }, 500);
    }

    function slideTo(newIndex, direction = "right") {
        if (isAnimating || newIndex === index) return;
        isAnimating = true;
        clearTimeout(autoTimeout);

        next.src = gifs[newIndex];

        current.style.transition = "none";
        next.style.transition = "none";

        current.style.transform = "translateX(0)";
        next.style.transform =
            direction === "right" ? "translateX(100%)" : "translateX(-100%)";

        next.offsetHeight;

        current.style.transition = "transform 1.4s cubic-bezier(0.25,0.1,0.25,1)";
        next.style.transition = "transform 1.4s cubic-bezier(0.25,0.1,0.25,1)";

        current.style.transform =
            direction === "right" ? "translateX(-100%)" : "translateX(100%)";
        next.style.transform = "translateX(0)";

        setTimeout(() => {
            current.src = gifs[newIndex];
            current.style.transition = "none";
            current.style.transform = "translateX(0)";
            next.style.transition = "none";
            next.style.transform = "translateX(100%)";

            index = newIndex;
            updateDots(index);
            updateText(index);

            isAnimating = false;
            autoTimeout = setTimeout(autoNext, 4000);
        }, 1400);

    }

    function autoNext() {
        slideTo((index + 1) % gifs.length, "right");
    }

    rightArrow.addEventListener("click", () => {
        slideTo((index + 1) % gifs.length, "right");
    });

    leftArrow.addEventListener("click", () => {
        slideTo((index - 1 + gifs.length) % gifs.length, "left");
    });

    dots.forEach(dot => {
    dot.addEventListener("click", () => {
        clearTimeout(autoTimeout);      
        if(index !== Number(dot.dataset.index)) {
            isAnimating = false;        
            slideTo(Number(dot.dataset.index), "right");
        }
    });
});


    updateDots(0);
    updateText(0);
    autoTimeout = setTimeout(autoNext, 4000);
});

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});