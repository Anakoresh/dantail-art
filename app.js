document.addEventListener("DOMContentLoaded", function () {
    const leftBlock = document.querySelector(".home-content-left div");
    const rightBlock = document.querySelector(".home-content-right div");
    const centerBlocks = document.querySelectorAll(".home-content-center div");

    const leftImages = ["img/table-img.webp", "img/table-img-2.webp", "img/wall-art-3.webp", "img/wall-art-4.webp", "img/vase.webp", "img/stand.jpeg"];
    const rightImages = ["img/table-img-2.webp", "img/wall-art-3.webp", "img/wall-art-4.webp", "img/vase.webp", "img/stand.jpeg", "img/table-img.webp"];
    const centerImages = [
        ["img/wall-art.webp", "img/bag.webp", "img/wall-art-2.jpeg"],
        ["img/bag.webp", "img/wall-art-2.jpeg", "img/wall-art.webp"]
    ];

    let indexLeft = 0;
    let indexRight = 0;
    let indexCenter = [0, 0];

    function changeBackground(element, images, index, animationClass) {
        element.style.animation = "none";
        setTimeout(() => {
            element.style.animation = `${animationClass} 2s ease-in-out`;
            element.style.backgroundImage = `url(${images[index]})`;
        }, 50);
    }

    setInterval(() => {
        indexLeft = (indexLeft + 1) % leftImages.length;
        indexRight = (indexRight + 1) % rightImages.length;

        changeBackground(leftBlock, leftImages, indexLeft, "slide-left");
        changeBackground(rightBlock, rightImages, indexRight, "slide-right");
    }, 4000);

    setInterval(() => {
        indexCenter[0] = (indexCenter[0] + 1) % centerImages[0].length;
        indexCenter[1] = (indexCenter[1] + 1) % centerImages[1].length;

        changeBackground(centerBlocks[0], centerImages[0], indexCenter[0], "slide-up");
        changeBackground(centerBlocks[1], centerImages[1], indexCenter[1], "slide-down");
    }, 8000);
});

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const burgerBtn = document.querySelector(".burger-menu-btn");
    const burgerMenu = document.querySelector(".burger-menu");

    function toggleBurgerButton() {
        if (window.innerWidth > 1000) {
            const headerBottom = header.getBoundingClientRect().bottom;
            if (headerBottom < 0) {
                burgerBtn.style.display = "block";
            } else {
                burgerBtn.style.display = "none"; 
                burgerMenu.style.display = "none"; 
            }
        } else {
            burgerBtn.style.display = "block"; 
        }
    }

    function toggleMenu() {
        if (burgerMenu.style.display === "flex") {
            burgerMenu.style.display = "none";
        } else {
            burgerMenu.style.display = "flex";
            burgerMenu.style.animation = "fadeIn 0.7s ease-in-out";
        }
    }

    function hideMenu(event) {
        if (!burgerMenu.contains(event.target) && !burgerBtn.contains(event.target)) {
            burgerMenu.style.display = "none";
        }
    }

    burgerBtn.addEventListener("click", toggleMenu);
    document.addEventListener("click", hideMenu);
    window.addEventListener("scroll", toggleBurgerButton);
    window.addEventListener("resize", toggleBurgerButton);
    
    toggleBurgerButton(); 
});