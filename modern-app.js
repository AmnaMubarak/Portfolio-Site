// Modern Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initScrollReveal();
  initProjectFilter();
  initContactForm();
  initTypeAnimation();
  initImageSlider();
});

// Navigation Functionality
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Sticky header on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
  });
  
  // Mobile menu toggle
  mobileToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  // Close mobile menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (
        scrollPosition >= sectionTop && 
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
      const revealTop = element.getBoundingClientRect().top;
      
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('revealed');
      }
    });
  }
  
  // Initial check
  checkReveal();
  
  // Check on scroll
  window.addEventListener('scroll', checkReveal);
}

// Typing Animation for Hero Section
function initTypeAnimation() {
  const roleTitle = document.querySelector('.role-title');
  
  if (!roleTitle) return;
  
  const roles = [
    'Software Engineer',
    'Data Scientist',
    'Full Stack Developer',
    'AI Enthusiast'
  ];
  
  let currentRoleIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let pauseDuration = 1500;
  
  function typeRole() {
    const currentRole = roles[currentRoleIndex];
    
    if (isDeleting) {
      // Deleting text
      roleTitle.textContent = currentRole.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing text
      roleTitle.textContent = currentRole.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100; // Normal typing speed
    }
    
    // Logic for switching between typing and deleting
    if (!isDeleting && currentCharIndex === currentRole.length) {
      // Finished typing the full role
      isDeleting = true;
      typingSpeed = pauseDuration; // Pause before deleting
    } else if (isDeleting && currentCharIndex === 0) {
      // Finished deleting the role
      isDeleting = false;
      currentRoleIndex = (currentRoleIndex + 1) % roles.length; // Move to next role
    }
    
    setTimeout(typeRole, typingSpeed);
  }
  
  // Start the typing animation
  setTimeout(typeRole, 1000);
}

// Project Filter Functionality
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.classList.contains(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Image Slider for Achievement Cards
function initImageSlider() {
  const sliders = document.querySelectorAll('.image-slider');
  
  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.parentElement.querySelectorAll('.dot');
    
    if (slides.length <= 1) return;
    
    let currentSlide = 0;
    
    // Set up dots functionality
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    function goToSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      currentSlide = index;
    }
    
    function nextSlide() {
      const newIndex = (currentSlide + 1) % slides.length;
      goToSlide(newIndex);
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
  });
}

// Contact Form Validation
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    let isValid = true;
    
    // Simple validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else {
      removeError(nameInput);
    }
    
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email');
      isValid = false;
    } else {
      removeError(emailInput);
    }
    
    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Subject is required');
      isValid = false;
    } else {
      removeError(subjectInput);
    }
    
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Message is required');
      isValid = false;
    } else {
      removeError(messageInput);
    }
    
    // If form is valid, you would typically submit the form here
    if (isValid) {
      // For demonstration purposes, show a success message
      // In a real app, you would send the form data to a server
      showFormSuccess();
    }
  });
  
  function showError(input, message) {
    input.classList.add('error');
    
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
  }
  
  function removeError(input) {
    input.classList.remove('error');
    
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function showFormSuccess() {
    // Hide the form
    const formElements = contactForm.querySelectorAll('input, textarea, button');
    formElements.forEach(el => {
      el.style.display = 'none';
    });
    
    // Create and show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Message Sent Successfully!</h3>
      <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
      <button id="reset-form" class="btn btn-primary">Send Another Message</button>
    `;
    
    contactForm.appendChild(successDiv);
    
    // Add event listener to reset button
    document.getElementById('reset-form').addEventListener('click', function() {
      // Remove success message
      successDiv.remove();
      
      // Reset and show form
      contactForm.reset();
      formElements.forEach(el => {
        el.style.display = '';
      });
    });
  }
} 