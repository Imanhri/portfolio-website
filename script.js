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
const introBtns = document.querySelectorAll(".intro-btn");

let activeSnappedElement = null;

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
  let x = e.clientX;
  let y = e.clientY;

  innerCursor.style.left = `${x}px`;
  innerCursor.style.top = `${y}px`;

  if (activeSnappedElement) {
    const rect = activeSnappedElement.getBoundingClientRect();
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

// Update cursor position during scrolling/sliding to keep it locked to the active snapped element
const updateSnappedPosition = () => {
  if (activeSnappedElement) {
    const rect = activeSnappedElement.getBoundingClientRect();
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

// Helper to set up snapping effect for elements
const setupSnapping = (elements) => {
  if (!outerCursor || !innerCursor || elements.length === 0) return;

  elements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      activeSnappedElement = element;
      outerCursor.classList.add("snapped");

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      outerCursor.style.left = `${centerX}px`;
      outerCursor.style.top = `${centerY}px`;
      outerCursor.style.width = `${rect.width}px`;
      outerCursor.style.height = `${rect.height}px`;

      // Match element's border radius dynamically and set custom color/border
      const computedRadius = window.getComputedStyle(element).borderRadius;
      outerCursor.style.borderRadius = computedRadius;
      outerCursor.style.borderColor = "#e25c3d";
      outerCursor.style.borderWidth = "3px";

      // Shrink inner cursor dot scale
      innerCursor.style.transform = "translate(-50%, -50%) scale(0.5)";
    });

    element.addEventListener("mouseleave", () => {
      activeSnappedElement = null;
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
};

// Apply snapping effect to team cards and the intro button
setupSnapping(teamCards);
setupSnapping(introBtns);
