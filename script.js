// Enhanced Portfolio JavaScript with Next-Level Interactions
class PortfolioApp {
  constructor() {
    this.isLoading = true;
    this.loadingProgress = 0;
    this.init();
  }

  async init() {
    // Show loading screen
    this.showLoadingScreen();
    
    // Initialize all components
    await this.initializeComponents();
    
    // Hide loading screen
    this.hideLoadingScreen();
  }

  async initializeComponents() {
    // Initialize in sequence for smooth loading
    await this.initParticles();
    this.initCustomCursor();
    this.initNavigation();
    this.initTypingEffect();
    this.initScrollAnimations();
    this.initSkillBars();
    this.initProjectFilters();
    this.initContactForm();
    this.initModals();
    this.initBackToTop();
    this.initMobileInteractions();
    this.initKeyboardNavigation();
    this.updateLoadingProgress(100);
  }

  // Loading Screen
  showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.remove('hidden');
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
        this.triggerEntranceAnimations();
      }, 500);
    }
  }

  updateLoadingProgress(progress) {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  triggerEntranceAnimations() {
    const animatedElements = document.querySelectorAll('.hero-content, .hero-visual');
    animatedElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }

  // Particles Background
  async initParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: '#6366f1' },
          shape: { type: 'circle' },
          opacity: { value: 0.3, random: true },
          size: { value: 3, random: true },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    }
    this.updateLoadingProgress(10);
  }

  // Custom Cursor
  initCustomCursor() {
    if (window.innerWidth > 768) {
      const cursor = document.querySelector('.cursor');
      const follower = document.querySelector('.cursor-follower');
      
      if (cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          
          cursor.style.left = mouseX + 'px';
          cursor.style.top = mouseY + 'px';
        });

        // Smooth follower animation
        const animateFollower = () => {
          followerX += (mouseX - followerX) * 0.1;
          followerY += (mouseY - followerY) * 0.1;
          
          follower.style.left = followerX - 20 + 'px';
          follower.style.top = followerY - 20 + 'px';
          
          requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card');
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
          });
          
          el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
          });
        });
      }
    }
    this.updateLoadingProgress(20);
  }

  // Enhanced Navigation
  initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Add/remove scrolled class
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
      this.updateActiveNavLink();
    });

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking overlay or link
    mobileOverlay?.addEventListener('click', this.closeMobileMenu.bind(this));
    navLinks.forEach(link => {
      link.addEventListener('click', this.closeMobileMenu.bind(this));
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    this.updateLoadingProgress(30);
  }

  closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    navToggle?.classList.remove('active');
    navMenu?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Enhanced Typing Effect
  initTypingEffect() {
    const typedTextSpan = document.querySelector('.typing-text');
    if (!typedTextSpan) return;

    const textArray = [
      'Full Stack Developer',
      'AI Enthusiast', 
      'Creative Problem Solver',
      'Tech Innovator',
      'Digital Artist',
      'Code Craftsman'
    ];
    
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    const type = () => {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newTextDelay);
      }
    };

    const erase = () => {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
      }
    };

    // Start typing effect
    setTimeout(type, newTextDelay + 250);
    this.updateLoadingProgress(40);
  }

  // Advanced Scroll Animations
  initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Trigger specific animations
          if (entry.target.classList.contains('stats-grid')) {
            this.animateStats();
          }
          
          if (entry.target.classList.contains('skills-category')) {
            this.animateSkillCards(entry.target);
          }

          if (entry.target.classList.contains('project-card')) {
            this.animateProjectCard(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(`
      .about-content, .about-visual, .skills-category, 
      .project-card, .contact-container, .stats-grid
    `);
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Parallax effects
    window.addEventListener('scroll', this.handleParallax.bind(this));
    this.updateLoadingProgress(50);
  }

  handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element, .geometric-shapes');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
      const finalNumber = parseInt(stat.dataset.count);
      const suffix = stat.textContent.replace(/\d/g, '');
      let currentNumber = 0;
      const increment = finalNumber / 50;
      
      const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
          currentNumber = finalNumber;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(currentNumber) + suffix;
      }, 50);
    });
  }

  animateSkillCards(container) {
    const skillCards = container.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  animateProjectCard(card) {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }

  // Skill Bars Animation
  initSkillBars() {
    const skillBars = document.querySelectorAll('.level-bar');
    
    const animateSkillBar = (bar) => {
      const level = bar.dataset.level;
      setTimeout(() => {
        bar.style.width = level + '%';
      }, 500);
    };

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.level-bar');
          skillBars.forEach((bar, index) => {
            setTimeout(() => animateSkillBar(bar), index * 200);
          });
        }
      });
    });

    document.querySelectorAll('.skills-category').forEach(category => {
      skillObserver.observe(category);
    });

    this.updateLoadingProgress(60);
  }

  // Project Filters
  initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects with animation
        projectCards.forEach((card, index) => {
          const category = card.dataset.category;
          
          setTimeout(() => {
            if (filter === 'all' || category === filter) {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.8)';
              
              setTimeout(() => {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 150);
            } else {
              card.style.opacity = '0';
              card.style.transform = 'scale(0.8)';
              setTimeout(() => {
                card.style.display = 'none';
              }, 300);
            }
          }, index * 50);
        });
      });
    });

    this.updateLoadingProgress(70);
  }

  // Enhanced Contact Form
  initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (this.validateForm(contactForm)) {
        await this.submitForm(contactForm);
      }
    });

    this.updateLoadingProgress(80);
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldContainer = field.closest('.form-group');
    
    // Remove existing error
    this.clearFieldError(field);
    
    let isValid = true;
    let errorMessage = '';

    // Validation rules
    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
        break;
      default:
        if (field.hasAttribute('required') && !value) {
          isValid = false;
          errorMessage = 'This field is required';
        }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    const fieldContainer = field.closest('.form-group');
    field.style.borderColor = '#ef4444';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      animation: fadeInUp 0.3s ease;
    `;
    
    fieldContainer.appendChild(errorElement);
  }

  clearFieldError(field) {
    const fieldContainer = field.closest('.form-group');
    const errorElement = fieldContainer.querySelector('.field-error');
    
    field.style.borderColor = '';
    if (errorElement) {
      errorElement.remove();
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  async submitForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
      // Simulate API call
      await this.simulateFormSubmission(new FormData(form));
      
      // Show success message
      this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      
    } catch (error) {
      this.showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      // Reset button state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  async simulateFormSubmission(formData) {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  // Notification System
  showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    notification.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>${message}</span>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Add styles
    notification.style.cssText = `
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    container.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Auto remove
    setTimeout(() => {
      this.removeNotification(notification);
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      this.removeNotification(notification);
    });
  }

  removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Modal System
  initModals() {
    const previewBtns = document.querySelectorAll('.preview-btn');
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal?.querySelector('.modal-overlay');

    previewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectData = this.getProjectData(btn.dataset.project);
        this.showModal(projectData);
      });
    });

    // Close modal
    [modalClose, modalOverlay].forEach(element => {
      element?.addEventListener('click', () => {
        this.hideModal();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) {
        this.hideModal();
      }
    });

    this.updateLoadingProgress(90);
  }

  getProjectData(projectId) {
    const projects = {
      'sports-club': {
        title: 'NextGen Sports Club',
        category: 'Web Application',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
        description: 'A comprehensive sports management platform featuring real-time analytics, member management, payment processing, and advanced reporting. Built with modern MERN stack architecture and deployed on AWS.',
        tech: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS'],
        github: 'https://github.com/NimeshDilhara/NextgensportclubSystem',
        live: '#'
      },
      'ai-assistant': {
        title: 'AI-Powered Assistant',
        category: 'AI/ML',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        description: 'An intelligent chatbot with natural language processing capabilities, contextual understanding, and machine learning-powered responses. Integrated with modern web interface.',
        tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
        github: '#',
        live: '#'
      },
      'ecommerce': {
        title: 'E-Commerce Platform',
        category: 'Web Application',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
        description: 'Full-featured online shopping platform with payment gateway integration, inventory management, user authentication, and comprehensive admin dashboard.',
        tech: ['React', 'PHP', 'MySQL', 'Stripe'],
        github: '#',
        live: '#'
      },
      'mobile-app': {
        title: 'Task Management App',
        category: 'Mobile',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
        description: 'Cross-platform mobile application for productivity and task management with real-time synchronization, offline support, and intuitive user interface.',
        tech: ['React Native', 'Firebase', 'Redux'],
        github: '#',
        live: '#'
      }
    };

    return projects[projectId] || projects['sports-club'];
  }

  showModal(projectData) {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    // Populate modal content
    document.getElementById('modalTitle').textContent = projectData.title;
    document.getElementById('modalCategory').textContent = projectData.category;
    document.getElementById('modalImage').src = projectData.image;
    document.getElementById('modalDescription').textContent = projectData.description;
    document.getElementById('modalGithub').href = projectData.github;
    document.getElementById('modalLive').href = projectData.live;

    // Populate tech stack
    const modalTech = document.getElementById('modalTech');
    modalTech.innerHTML = projectData.tech.map(tech => 
      `<span class="tech-tag ${tech.toLowerCase()}">${tech}</span>`
    ).join('');

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hideModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Back to Top
  initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Mobile-specific Interactions
  initMobileInteractions() {
    if (window.innerWidth <= 768) {
      // Touch interactions for project cards
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        card.addEventListener('touchstart', () => {
          card.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', () => {
          setTimeout(() => {
            card.classList.remove('touch-active');
          }, 150);
        });
      });

      // Smooth scrolling for mobile
      this.initMobileScrolling();
    }
  }

  initMobileScrolling() {
    let isScrolling = false;
    
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          this.updateActiveNavLink();
          isScrolling = false;
        });
        isScrolling = true;
      }
    });
  }

  // Keyboard Navigation
  initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Navigation shortcuts
      if (e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            this.scrollToSection('home');
            break;
          case '2':
            e.preventDefault();
            this.scrollToSection('about');
            break;
          case '3':
            e.preventDefault();
            this.scrollToSection('skills');
            break;
          case '4':
            e.preventDefault();
            this.scrollToSection('projects');
            break;
          case '5':
            e.preventDefault();
            this.scrollToSection('contact');
            break;
        }
      }

      // Close modals with Escape
      if (e.key === 'Escape') {
        this.hideModal();
        this.closeMobileMenu();
      }
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  // Advanced Animations
  initAdvancedAnimations() {
    // Text reveal animations
    const textElements = document.querySelectorAll('.hero-title .word');
    textElements.forEach((word, index) => {
      word.style.opacity = '0';
      word.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        word.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        word.style.opacity = '1';
        word.style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Floating elements animation
    this.initFloatingAnimation();
  }

  initFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
      const baseDelay = index * 2000;
      const animationDuration = 8000 + (index * 1000);
      
      element.style.animationDelay = `${baseDelay}ms`;
      element.style.animationDuration = `${animationDuration}ms`;
    });
  }

  // Performance Optimization
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Error Handling
  handleError(error, context = 'Application') {
    console.error(`${context} Error:`, error);
    
    if (process.env.NODE_ENV === 'development') {
      this.showNotification(`${context} Error: ${error.message}`, 'error');
    } else {
      this.showNotification('Something went wrong. Please try again.', 'error');
    }
  }

  // Accessibility Enhancements
  initAccessibility() {
    // Focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Screen reader announcements
    this.initAriaLive();
  }

  initAriaLive() {
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('aria-live', 'polite');
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.className = 'sr-only';
    ariaLive.id = 'aria-live-region';
    document.body.appendChild(ariaLive);
  }

  announceToScreenReader(message) {
    const ariaLive = document.getElementById('aria-live-region');
    if (ariaLive) {
      ariaLive.textContent = message;
      setTimeout(() => {
        ariaLive.textContent = '';
      }, 1000);
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    window.portfolioApp = new PortfolioApp();
  } catch (error) {
    console.error('Failed to initialize portfolio application:', error);
  }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring
window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
  }
});

// Error boundary for unhandled errors
window.addEventListener('error', (e) => {
  console.error('Unhandled error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}
