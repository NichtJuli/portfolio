// Reference to the navigation and hero section
// to later apply styles based on scroll position
const nav = document.querySelector("nav"); // first element with the name "nav"
const hero = document.getElementById("hero");
const scrollIndicator = document.querySelector(".scroll-indicator");

// Typing Animation for Hero Text
const typingText = document.querySelector(".typing-text");
let textToType = "Hi, I'm Julian"; // Will be set based on language
let charIndex = 0;

function typeText() {
  if (charIndex < textToType.length) {
    typingText.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100); // typing speed in ms
  }
}

// Start typing animation after loading screen (will be called after language is initialized)
let initialTypingTimeout;

// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLeft = document.querySelector(".nav-left");
const navRight = document.querySelector(".nav-right");

hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("active");
  navLeft.classList.toggle("active");
  navRight.classList.toggle("active");

  // Add/remove class to nav for better mobile styling
  if (hamburger.classList.contains("active")) {
    nav.classList.add("menu-active");
  } else {
    nav.classList.remove("menu-active");
  }

  // Update aria-expanded for accessibility
  const isExpanded = hamburger.classList.contains("active");
  hamburger.setAttribute("aria-expanded", isExpanded);
});

// Close menu when clicking on a navigation link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", function() {
    if (hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      navLeft.classList.remove("active");
      navRight.classList.remove("active");
      nav.classList.remove("menu-active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
});

// Scroll Progress Bar with smooth animation using requestAnimationFrame
const progressBar = document.querySelector(".scroll-progress-bar");
let ticking = false;

function updateProgressBar() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + "%";
  ticking = false;
}

function requestProgressBarUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateProgressBar);
    ticking = true;
  }
}

window.addEventListener("scroll", requestProgressBarUpdate);

// Event listener for vertical scroll location -> saved in scrollPosition
window.addEventListener("scroll", function () {
  let scrollPosition = window.scrollY || document.documentElement.scrollPosition;

// offsetHeight is used to get all height information including padding and borders
  const heroHeight = hero.offsetHeight; //

  // Hide scroll indicator when user starts scrolling (only if it exists on the page)
  if (scrollIndicator) {
    if (scrollPosition > 50) {
      scrollIndicator.classList.add("hidden");
    } else {
      scrollIndicator.classList.remove("hidden");
    }
  }

  // Check if the scroll position is greater than the hero section height
  if (scrollPosition > heroHeight - 60) {
    nav.classList.add("nav-background");
  } else {
    nav.classList.remove("nav-background");
  }

  // Check if user scrolled up or down
  //save current position in currentScroll
  let currentScroll = scrollPosition;

  // check if lastScroll is defined and if currentScroll is greater than lastScroll
  if (window.lastScroll && (currentScroll > window.lastScroll)) {
    // Calculate how much to hide based on menu state
    const hideDistance = nav.classList.contains("menu-active") ? "-600px" : "-210px";
    nav.style.top = hideDistance;
  } else {
    nav.style.top = "0";
  }
  // Save the current scroll position for the next scroll event
  window.lastScroll = currentScroll;
});

// Scroll Indicator - smooth scroll to next section when clicked (only if it exists)
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", function() {
    const heroHeight = hero.offsetHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth"
    });
  });
}




// Back to Top Button
const backToTopButton = document.querySelector(".back-to-top");

// Show/hide back to top button based on scroll position
function toggleBackToTopButton() {
  if (window.scrollY > 500) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
}

window.addEventListener("scroll", toggleBackToTopButton);

// Scroll to top when button is clicked
backToTopButton.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Loading Screen - Hide when page is fully loaded
window.addEventListener("load", function() {
  const loadingScreen = document.querySelector(".loading-screen");
  // Small delay to ensure smooth transition
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 500);
});

// Keyboard Navigation
const sections = ["hero", "about-me", "essentials-camera", "contact"];
let currentSectionIndex = 0;

document.addEventListener("keydown", function(e) {
  // Arrow Down or PageDown - scroll to next section
  if (e.key === "ArrowDown" || e.key === "PageDown") {
    e.preventDefault();
    currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
    scrollToSection(sections[currentSectionIndex]);
  }

  // Arrow Up or PageUp - scroll to previous section
  if (e.key === "ArrowUp" || e.key === "PageUp") {
    e.preventDefault();
    currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
    scrollToSection(sections[currentSectionIndex]);
  }

  // Home key - scroll to top
  if (e.key === "Home") {
    e.preventDefault();
    currentSectionIndex = 0;
    scrollToSection(sections[0]);
  }

  // End key - scroll to bottom
  if (e.key === "End") {
    e.preventDefault();
    currentSectionIndex = sections.length - 1;
    scrollToSection(sections[currentSectionIndex]);
  }
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Easter Egg - Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
let easterEggActive = false;

document.addEventListener('keydown', function(e) {
  // Check if the pressed key matches the next key in the sequence
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;

    // If the entire code was entered correctly
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0; // Reset for next time
    }
  } else {
    // Wrong key, reset the sequence
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  if (easterEggActive) {
    // Deactivate if already active
    document.body.classList.remove('party-mode');
    easterEggActive = false;
    return;
  }

  easterEggActive = true;
  document.body.classList.add('party-mode');

  // Create confetti effect
  createConfetti();

  // Show message
  const message = document.createElement('div');
  message.className = 'easter-egg-message';
  message.textContent = '🎉 Party Mode Activated! 🎉';
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 3000);
}

function createConfetti() {
  const colors = ['#a4e8f4', '#E1EEED', '#725A24', '#BDD8D8'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}

// Fade-in effect for elements when they come into view on scroll
// starting with the DOMContentLoaded event to ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // referencing all elements with the class 'fade-in-on-scroll' in HTML
  const elements = document.querySelectorAll('.fade-in-on-scroll');

  function handleScroll() {
    //at 90% of the viewport height, the fade-in effect is triggered
    const triggerPosition = window.innerHeight * 0.9;

    elements.forEach(el => {
      //saving the "Distance to the top end of the viewport" in elementDistanceTop
      const elementDistanceTop = el.getBoundingClientRect().top;

      // if the element is inside 90% of the viewport height, trigger the fade-in effect
      if (elementDistanceTop < triggerPosition) {
        // visibility is set to visible
        el.classList.add('visible');
      }
    });
  }

  // Every time the user scrolls, the handleScroll function is called
  window.addEventListener('scroll', handleScroll);

  // call handleScroll once to apply the effect immediately on page load
  handleScroll();
});

// Language Toggle
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = localStorage.getItem('preferredLanguage') || 'de'; // Load from localStorage or default to 'de'

// Check if we're on the blog page
const isBlogPage = document.querySelector('.blog-header') !== null;

function switchLanguage(lang) {
  currentLang = lang;

  // Save language preference to localStorage
  localStorage.setItem('preferredLanguage', lang);

  // Update typing text and hero (only on main page)
  if (!isBlogPage) {
    const typingText = document.querySelector('.typing-text');
    const newText = translations[lang].heroTyping;
    typingText.textContent = '';
    let charIndex = 0;

    function typeNewText() {
      if (charIndex < newText.length) {
        typingText.textContent += newText.charAt(charIndex);
        charIndex++;
        setTimeout(typeNewText, 50);
      }
    }
    typeNewText();

    // Update hero welcome
    document.querySelector('.hero-content p').innerHTML = `<i>${translations[lang].heroWelcome}</i>`;
  } else {
    // Update blog header
    document.querySelector('.blog-header h1').textContent = translations[lang].blogTitle;
    document.querySelector('.blog-header p').textContent = translations[lang].blogSubtitle;

    // Update "coming soon" section
    const comingSoon = document.querySelector('.blog-coming-soon');
    if (comingSoon) {
      comingSoon.querySelector('h3').textContent = translations[lang].blogComingSoon;
      comingSoon.querySelector('p').textContent = translations[lang].blogComingSoonDesc;
    }
  }

  // Update navigation
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks[0].textContent = translations[lang].navHome;
  navLinks[1].textContent = translations[lang].navAbout;
  navLinks[2].textContent = translations[lang].navEssentials;
  navLinks[3].textContent = translations[lang].navBlog;
  navLinks[4].textContent = translations[lang].navContact;

  // Only update main page content if not on blog page
  if (!isBlogPage) {
    // Update section titles
    document.querySelectorAll('.transition-title h1')[0].textContent = translations[lang].sectionAboutMe;
    document.querySelectorAll('.transition-title h1')[1].textContent = translations[lang].sectionEssentials;
    document.querySelectorAll('.transition-title h1')[2].textContent = translations[lang].sectionContact;

    // Update About Me section
    document.querySelector('.about-me-hello h2').textContent = translations[lang].aboutHello;
    document.querySelectorAll('.about-me-hello p')[0].innerHTML = translations[lang].aboutIntro1;
    document.querySelectorAll('.about-me-hello p')[1].innerHTML = translations[lang].aboutIntro2;

    // Update Education
    document.querySelector('.about-me-education h3').textContent = translations[lang].educationTitle;
    const eduParagraphs = document.querySelectorAll('.about-me-education p');
    eduParagraphs[0].innerHTML = `<strong>${translations[lang].edu1Date}</strong><br>${translations[lang].edu1Title}`;
    eduParagraphs[1].innerHTML = `<strong>${translations[lang].edu2Date}</strong><br>${translations[lang].edu2Title}`;
    eduParagraphs[2].innerHTML = `<strong>${translations[lang].edu3Date}</strong><br>${translations[lang].edu3Title}`;

    // Update Skills & Experience
    document.querySelector('.about-me-skills h3').textContent = translations[lang].skillsTitle;
    document.querySelector('.about-me-experience h3').textContent = translations[lang].experienceTitle;
    const expItems = document.querySelectorAll('.experience-list li');
    expItems[0].innerHTML = translations[lang].exp1;
    expItems[1].innerHTML = translations[lang].exp2;
    expItems[2].innerHTML = translations[lang].exp3;

    // Update Camera Section
    document.querySelectorAll('.video-title h3')[0].textContent = translations[lang].cameraTitle;
    const cameraDesc = document.querySelectorAll('.video-description p')[0];
    cameraDesc.innerHTML = `${translations[lang].cameraDesc1}<br>${translations[lang].cameraDesc2}<br>${translations[lang].cameraDesc3}`;
    document.querySelectorAll('.carousel-heading')[0].textContent = translations[lang].carouselCamera;

    // Update Microphone Section
    document.querySelectorAll('.video-title h3')[1].textContent = translations[lang].micTitle;
    const micDesc = document.querySelectorAll('.video-description p')[1];
    micDesc.innerHTML = `${translations[lang].micDesc1}<br>${translations[lang].micDesc2}<br>${translations[lang].micDesc3}`;
    document.querySelectorAll('.carousel-heading')[1].textContent = translations[lang].carouselMic;

    // Update Laptop Section
    document.querySelectorAll('.video-title h3')[2].textContent = translations[lang].laptopTitle;
    const laptopDesc = document.querySelectorAll('.video-description p')[2];
    laptopDesc.innerHTML = `${translations[lang].laptopDesc1}<br>${translations[lang].laptopDesc2}<br>${translations[lang].laptopDesc3}`;
    document.querySelectorAll('.carousel-heading')[2].textContent = translations[lang].carouselLaptop;

    // Update Download Section
    document.querySelector('.download-title').textContent = translations[lang].downloadTitle;
    document.querySelector('.download-description').textContent = translations[lang].downloadDescription;
    document.querySelector('.download-button span').textContent = translations[lang].downloadButton;
  }
}

langButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const selectedLang = this.getAttribute('data-lang');

    // Update active state
    langButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    // Switch language
    switchLanguage(selectedLang);
  });
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set active button based on saved language
  langButtons.forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Only initialize typing animation on main page
  if (!isBlogPage) {
    // Set the initial typing text based on saved language
    textToType = translations[currentLang].heroTyping;

    // Start typing animation after loading screen
    initialTypingTimeout = setTimeout(typeText, 2000);
  }

  // Apply saved language if it's English (German is already the default HTML content)
  if (currentLang === 'en') {
    switchLanguage('en');
  }
});
