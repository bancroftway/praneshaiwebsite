/**
 * Pranesh AI Website JavaScript
 * Provides interactive functionality and smooth animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Smooth scroll behavior for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to menu items when scrolling through sections
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    let scrollY = window.pageYOffset;
    
    // Add offset for header
    const headerHeight = document.querySelector('header').offsetHeight;
    
    // Highlight corresponding nav item
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100; // Additional offset for better UX
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-menu a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Add scroll event listener for highlighting nav items
  window.addEventListener('scroll', highlightNavOnScroll);
  
  // Animate elements when they enter the viewport
  function animateOnScroll() {
    const elements = document.querySelectorAll('.section-header, .value-item, .expertise-item, .process-step, .value-card, .testimonial, .culture-item, .contact-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate-in');
      }
    });
  }
  
  // Add animation classes to CSS
  const style = document.createElement('style');
  style.innerHTML = `
    .section-header, .value-item, .expertise-item, .process-step, .value-card, .testimonial, .culture-item, .contact-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // Set up the scroll animation
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
  
  // Update copyright year automatically
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.querySelector('.footer-bottom p');
  
  if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear} Pranesh AI. All Rights Reserved.`;
  }
});