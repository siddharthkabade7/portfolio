/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — SCRIPT
   ══════════════════════════════════════════════════════════ */

'use strict';

/* ─── AOS INIT ─── */
AOS.init({
  duration: 700,
  once: true,
  easing: 'ease-out-cubic',
  offset: 60,
});

/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .hobby-card, .tech-pill, .social-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorFollower.style.width = '56px';
    cursorFollower.style.height = '56px';
    cursorFollower.style.borderColor = 'rgba(108,99,255,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorFollower.style.width = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.borderColor = 'rgba(108,99,255,0.5)';
  });
});

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    backTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backTop.classList.remove('show');
  }
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ─── TYPING ANIMATION — NAME ─── */
function typeWriter(element, text, speed = 100, callback) {
  let i = 0;
  element.textContent = '';
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

window.addEventListener('load', () => {
  const nameEl = document.getElementById('typedName');
  typeWriter(nameEl, 'Siddharth', 120);
});

/* ─── TAGLINE ROTATION ─── */
const taglines = ['Web Developer', 'AI Learner', 'Python Coder', 'Problem Solver', 'Creative Thinker'];
let taglineIndex = 0;
const taglineEl = document.getElementById('taglineRotate');

function rotateTagline() {
  taglineEl.style.opacity = '0';
  taglineEl.style.transform = 'translateY(10px)';
  setTimeout(() => {
    taglineIndex = (taglineIndex + 1) % taglines.length;
    taglineEl.textContent = taglines[taglineIndex];
    taglineEl.style.transition = 'opacity 0.5s, transform 0.5s';
    taglineEl.style.opacity = '1';
    taglineEl.style.transform = 'translateY(0)';
  }, 400);
}
taglineEl.style.transition = 'opacity 0.5s, transform 0.5s';
setInterval(rotateTagline, 2800);

/* ─── PARTICLES ─── */
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 40;

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 3 + 1;
  const left = Math.random() * 100;
  const duration = Math.random() * 12 + 8;
  const delay = Math.random() * 8;
  const colors = [
    'rgba(108,99,255,0.6)',
    'rgba(168,85,247,0.5)',
    'rgba(56,189,248,0.5)',
    'rgba(255,255,255,0.3)',
  ];
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    bottom: -10px;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;
  particlesContainer.appendChild(p);
  // Remove after animation
  setTimeout(() => p.remove(), (duration + delay) * 1000);
}

for (let i = 0; i < PARTICLE_COUNT; i++) createParticle();
setInterval(createParticle, 600);

/* ─── SCROLL INDICATOR HIDE ─── */
const scrollIndicator = document.getElementById('scrollIndicator');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) scrollIndicator.style.opacity = '0';
  else scrollIndicator.style.opacity = '1';
}, { passive: true });
scrollIndicator.addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

/* ─── SKILL BARS ANIMATION ─── */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const w = bar.getAttribute('data-width');
    bar.style.width = w + '%';
  });
}

function animateCircles() {
  const circumference = 2 * Math.PI * 42; // ≈ 264
  document.querySelectorAll('.circle-wrap').forEach(wrap => {
    const percent = parseInt(wrap.getAttribute('data-percent'));
    const progress = wrap.querySelector('.circle-progress');
    const accent = wrap.style.getPropertyValue('--accent');
    progress.style.stroke = accent;
    const offset = circumference - (percent / 100) * circumference;
    setTimeout(() => {
      progress.style.strokeDashoffset = offset;
    }, 200);
  });
}

// Use IntersectionObserver to trigger when skills section is visible
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      animateCircles();
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.25 });
skillsSection && skillsObserver.observe(skillsSection);

/* ─── PROJECT FILTER ─── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach((card, i) => {
      const cats = card.getAttribute('data-category') || '';
      const show = filter === 'all' || cats.includes(filter);
      if (show) {
        card.classList.remove('hidden');
        card.style.animation = `none`;
        card.offsetHeight; // reflow
        card.style.animation = `fadeInCard 0.4s ease ${i * 0.05}s both`;
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Add CSS for project card fade
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);

/* ─── CONTACT FORM ─── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  let valid = true;

  // Reset errors
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

  if (!name.value.trim()) {
    document.getElementById('nameError').textContent = 'Please enter your name.';
    valid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    valid = false;
  }
  if (!message.value.trim()) {
    document.getElementById('messageError').textContent = 'Please write a message.';
    valid = false;
  }

  if (!valid) return;

  // Simulate send
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
  setTimeout(() => {
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span> <span class="btn-ripple"></span>';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1800);
});

/* ─── SMOOTH SCROLL for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── FOOTER YEAR ─── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ─── SECTION REVEAL via IntersectionObserver ─── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(sec => {
  revealObserver.observe(sec);
});

/* ─── HOVER TILT on project cards ─── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(600px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) perspective(600px) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
});

/* ─── ACHIEVEMENT CARD HOVER TILT ─── */
document.querySelectorAll('.achievement-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el, end, duration = 1500) {
  let start = 0;
  const increment = end / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= end) { el.textContent = end; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

/* ─── GSAP-like smooth reveal for hero pills ─── */
window.addEventListener('load', () => {
  const pills = document.querySelectorAll('.float-pill');
  pills.forEach((pill, i) => {
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(20px)';
    setTimeout(() => {
      pill.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      pill.style.opacity = '1';
      pill.style.transform = 'translateY(0)';
    }, 800 + i * 150);
  });
});
