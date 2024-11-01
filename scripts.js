const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
let inactivityTimeout;

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');

    // Reset the inactivity timer whenever the menu is toggled
    resetInactivityTimeout();
});

function resetInactivityTimeout() {
    // Clear any existing timeout
    clearTimeout(inactivityTimeout);

    // Set a new timeout to close the menu after 5 seconds of inactivity
    inactivityTimeout = setTimeout(() => {
        navMenu.classList.remove('open');
    }, 3000);
}



// Smooth Scrolling
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetID = this.getAttribute("href");
    const targetElement = document.querySelector(targetID);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact Form Validation and Submission
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    let isValid = true;

    // Basic Validation Checks
    [nameInput, emailInput, messageTextarea].forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#ddd";
      }
    });

    // Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput && !emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      emailInput.style.borderColor = "red";
      alert("Please enter a valid email address.");
    }

    if (isValid) {
      // Handle form data submission here (e.g., via Fetch API)
      alert("Form submitted successfully!");
      contactForm.reset();
    } else {
      alert("Please fill out all required fields correctly.");
    }
  });
}

// Dynamic Typing Effect
const typingTexts = document.querySelectorAll(".typing-text");

typingTexts.forEach((element) => {
  const text = element.getAttribute("data-text") || element.textContent;
  element.textContent = "";
  let charIndex = 0;

  function type() {
    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, 100); // Typing speed in milliseconds
    }
  }

  type();
});

// Scroll Animations
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

animatedElements.forEach((element) => {
  observer.observe(element);
});

// Social Media Icon Hover Effects
const socialLinks = document.querySelectorAll(".social-links a");

socialLinks.forEach((link) => {
  const iconImage = link.querySelector("img");

  if (iconImage) {
    link.addEventListener("mouseenter", function () {
      iconImage.style.transform = "scale(1.2)";
    });

    link.addEventListener("mouseleave", function () {
      iconImage.style.transform = "scale(1)";
    });
  }
});

// Show Call Us Button on Mobile Devices
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

const callUsPopup = document.querySelector(".call-us-popup");

if (isMobileDevice() && callUsPopup) {
  callUsPopup.style.display = "block";
}

// Blog Posts Dynamic Generation
const blogPosts = [
  {
    title: "Blog Post 1",
    image: "path/to/image1.jpg",
    excerpt: "This is a short description of Blog Post 1.",
    link: "blog-post-1.html"
  },
  {
    title: "Blog Post 2",
    image: "path/to/image2.jpg",
    excerpt: "This is a short description of Blog Post 2.",
    link: "blog-post-2.html"
  },
  // Add more blog posts as needed
];

const blogPostsContainer = document.querySelector(".blog-posts");

if (blogPostsContainer) {
  blogPosts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");

    postElement.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="blog-post-content">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="${post.link}">Read More</a>
      </div>
    `;

    blogPostsContainer.appendChild(postElement);
  });
}
