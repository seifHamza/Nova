// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// ── Smooth scroll ──
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ── Toast ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ── Product modal ──
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalWhatsApp = document.getElementById('modalWhatsApp');
const modalClose = document.getElementById('modalClose');

function openProduct(name, price, waLink) {
  modalTitle.textContent = name;
  modalPrice.textContent = price;
  modalWhatsApp.href = waLink;
  modal.classList.add('open');
}

modalClose.addEventListener('click', () => { modal.classList.remove('open'); });
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

// ── Newsletter ──
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim();
  if (email) {
    showToast('Subscribed successfully! Welcome to Nova.');
    this.reset();
  }
});

document.querySelector('.whatsapp-float').addEventListener('click', function() {
  showToast('Opening WhatsApp...');
});

// ─────────────────────────────────────
// ── AUTH SYSTEM (Sign In / Sign Up) ──
// ─────────────────────────────────────

// Open auth modal
function openAuth(type) {
  if (type === 'signin') {
    document.getElementById('signinOverlay').classList.add('open');
  } else {
    document.getElementById('signupOverlay').classList.add('open');
  }
}

// Close auth modal
function closeAuth(id) {
  document.getElementById(id).classList.remove('open');
}

// Switch between Sign In and Sign Up
function switchAuth(type) {
  closeAuth('signinOverlay');
  closeAuth('signupOverlay');
  setTimeout(() => {
    openAuth(type);
  }, 150);
}

// Close auth modals on overlay click
document.getElementById('signinOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeAuth('signinOverlay');
});
document.getElementById('signupOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeAuth('signupOverlay');
});

// ── Sign In Handler ──
function handleSignIn(e) {
  e.preventDefault();

  const email = document.getElementById('signinEmail').value.trim();
  const password = document.getElementById('signinPassword').value;
  let valid = true;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('signinEmailError').classList.add('show');
    valid = false;
  } else {
    document.getElementById('signinEmailError').classList.remove('show');
  }

  // Password validation
  if (password.length < 6) {
    document.getElementById('signinPasswordError').classList.add('show');
    valid = false;
  } else {
    document.getElementById('signinPasswordError').classList.remove('show');
  }

  if (valid) {
    showToast('Welcome back! Redirecting...');
    closeAuth('signinOverlay');
    document.getElementById('signinForm').reset();
    // Clear any error states
    document.querySelectorAll('#signinForm .error-msg').forEach(el => el.classList.remove('show'));
  }

  return false;
}

// ── Sign Up Handler ──
function handleSignUp(e) {
  e.preventDefault();

  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  let valid = true;

  // Name validation
  if (name.length < 2) {
    document.getElementById('signupNameError').classList.add('show');
    valid = false;
  } else {
    document.getElementById('signupNameError').classList.remove('show');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('signupEmailError').classList.add('show');
    valid = false;
  } else {
    document.getElementById('signupEmailError').classList.remove('show');
  }

  // Password validation
  if (password.length < 6) {
    document.getElementById('signupPasswordError').classList.add('show');
    valid = false;
  } else {
    document.getElementById('signupPasswordError').classList.remove('show');
  }

  // Confirm password validation
  if (password !== confirm || confirm === '') {
    document.getElementById('signupConfirmError').classList.add('show');
    valid = false;
  } else {
    document.getElementById('signupConfirmError').classList.remove('show');
  }

  if (valid) {
    showToast('Account created successfully! Welcome to Nova.');
    closeAuth('signupOverlay');
    document.getElementById('signupForm').reset();
    document.querySelectorAll('#signupForm .error-msg').forEach(el => el.classList.remove('show'));
  }

  return false;
}

// ── Social Auth Placeholder ──
function socialAuth(provider) {
  showToast(`Connecting with ${provider}...`);
  // In a real app, this would redirect to OAuth
}