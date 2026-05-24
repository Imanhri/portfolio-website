const openMenuBtn = document.getElementById("openMenu");
const closeMenuBtn = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const teamSlider = document.getElementById("teamSlider");
const slideLeftBtn = document.getElementById("slideLeft");
const slideRightBtn = document.getElementById("slideRight");

const setMobileMenuState = (isOpen) => {
  mobileMenu.classList.toggle("active", isOpen);
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  openMenuBtn.setAttribute("aria-expanded", String(isOpen));
};

const scrollToSection = (targetSelector) => {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  setMobileMenuState(false);
};

document.querySelectorAll("[data-scroll-target]").forEach((control) => {
  control.addEventListener("click", (event) => {
    const targetSelector = control.getAttribute("data-scroll-target");
    if (!targetSelector) return;
    event.preventDefault();
    scrollToSection(targetSelector);
  });
});

openMenuBtn.addEventListener("click", () => setMobileMenuState(true));
closeMenuBtn.addEventListener("click", () => setMobileMenuState(false));

window.closeMenuFunc = () => setMobileMenuState(false);

slideLeftBtn.addEventListener("click", () => {
  teamSlider.scrollBy({ left: -400, behavior: "smooth" });
});

slideRightBtn.addEventListener("click", () => {
  teamSlider.scrollBy({ left: 400, behavior: "smooth" });
});

// Custom Cursor Implementation
const innerCursor = document.querySelector(".inner-cursor");
const outerCursor = document.querySelector(".outer-cursor");
const teamCards = document.querySelectorAll(".team-card");

let activeSnappedCard = null;

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
  let x = e.clientX;
  let y = e.clientY;

  innerCursor.style.left = `${x}px`;
  innerCursor.style.top = `${y}px`;

  if (activeSnappedCard) {
    const rect = activeSnappedCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    outerCursor.style.left = `${centerX}px`;
    outerCursor.style.top = `${centerY}px`;
    outerCursor.style.width = `${rect.width}px`;
    outerCursor.style.height = `${rect.height}px`;
  } else {
    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
  }
}

// Update cursor position during scrolling/sliding to keep it locked to the card
const updateSnappedPosition = () => {
  if (activeSnappedCard) {
    const rect = activeSnappedCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    outerCursor.style.left = `${centerX}px`;
    outerCursor.style.top = `${centerY}px`;
    outerCursor.style.width = `${rect.width}px`;
    outerCursor.style.height = `${rect.height}px`;
  }
};

window.addEventListener("scroll", updateSnappedPosition, { passive: true });
if (teamSlider) {
  teamSlider.addEventListener("scroll", updateSnappedPosition, {
    passive: true,
  });
}

// Snapping effect for Team Cards
if (outerCursor && innerCursor && teamCards.length > 0) {
  teamCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      activeSnappedCard = card;
      outerCursor.classList.add("snapped");

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      outerCursor.style.left = `${centerX}px`;
      outerCursor.style.top = `${centerY}px`;
      outerCursor.style.width = `${rect.width}px`;
      outerCursor.style.height = `${rect.height}px`;

      // Match card's border radius and set custom color/border
      outerCursor.style.borderRadius = "1.5rem";
      outerCursor.style.borderColor = "#e25c3d";
      outerCursor.style.borderWidth = "3px";

      // Shrink inner cursor dot scale
      innerCursor.style.transform = "translate(-50%, -50%) scale(0.5)";
    });

    card.addEventListener("mouseleave", () => {
      activeSnappedCard = null;
      outerCursor.classList.remove("snapped");

      // Reset styles so CSS transitions handle the collapse smoothly
      outerCursor.style.width = "";
      outerCursor.style.height = "";
      outerCursor.style.borderRadius = "";
      outerCursor.style.borderColor = "";
      outerCursor.style.borderWidth = "";

      innerCursor.style.transform = "";
    });
  });
}
