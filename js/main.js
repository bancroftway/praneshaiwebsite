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
    const elements = document.querySelectorAll('.section-header, .value-item, .expertise-item, .process-step, .value-card, .testimonial, .culture-item, .contact-card, .process-card, .feature-item, .name-etymology');
    
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
    .section-header, .value-item, .expertise-item, .process-step, .value-card, .testimonial, .culture-item, .contact-card, .process-card, .feature-item, .name-etymology {
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
  
  // Parallax effect for hero section
  function parallaxEffect() {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  }
  
  // Add parallax on scroll
  window.addEventListener('scroll', parallaxEffect);
  
  // Typing animation for hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalText = text;
    element.textContent = '';
    
    function type() {
      if (i < originalText.length) {
        element.textContent += originalText.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
  
  // Apply typing effect to hero title
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => typeWriter(heroTitle, originalText, 50), 500);
  }
  
  // Color-changing navbar on scroll
  function colorNavbar() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
      header.style.background = 'rgba(37, 99, 235, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    }
  }
  
  window.addEventListener('scroll', colorNavbar);
  
  // Interactive hover effects for cards
  document.querySelectorAll('.value-item, .expertise-item, .process-card, .feature-item, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    });
  });
  
  // Loading screen animation
  function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-logo">
          <img src="img/logo.png" alt="Pranesh AI" style="width: 120px; height: auto;">
        </div>
        <div class="loader-animation"></div>
      </div>
    `;
    
    const loaderStyles = `
      .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2563EB 0%, #8B5CF6 50%, #06B6D4 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
      }
      
      .loader-content {
        text-align: center;
        color: white;
      }
      
      .loader-animation {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 20px auto;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(loader);
    
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }, 1500);
  }
  
  // Show loading animation on page load
  showLoadingAnimation();
  
  // Easter egg - Konami code
  let konamiCode = '';
  const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
  
  document.addEventListener('keydown', function(e) {
    konamiCode += e.code;
    if (konamiCode.length > konamiSequence.length) {
      konamiCode = konamiCode.slice(-konamiSequence.length);
    }
    
    if (konamiCode === konamiSequence) {
      // Easter egg activated!
      document.body.style.animation = 'rainbow 2s linear infinite';
      
      const easterEggStyle = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      
      const easterEggStyleSheet = document.createElement('style');
      easterEggStyleSheet.textContent = easterEggStyle;
      document.head.appendChild(easterEggStyleSheet);
      
      setTimeout(() => {
        document.body.style.animation = '';
        if (easterEggStyleSheet.parentNode) {
          easterEggStyleSheet.parentNode.removeChild(easterEggStyleSheet);
        }
      }, 4000);
      
      konamiCode = '';
    }
  });
  
  // Add subtle mouse follow effect
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function createMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    
    const followerStyles = `
      .mouse-follower {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.1s ease;
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = followerStyles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(follower);
    
    function updateFollower() {
      follower.style.left = (mouseX - 10) + 'px';
      follower.style.top = (mouseY - 10) + 'px';
      requestAnimationFrame(updateFollower);
    }
    
    updateFollower();
  }
  
  // Only add mouse follower on desktop
  if (window.innerWidth > 768) {
    createMouseFollower();
  }
});