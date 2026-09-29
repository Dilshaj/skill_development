/**
 * Dilshaj Infotech Skill Development Program
 * Pure Static Frontend Logic, Form Validation, LocalStorage Database & Payment Flow
 */

// Local storage key for registrations
const REG_STORAGE_KEY = 'dilshaj_registrations_store';

// Helper to get local stored registrations
function getStoredRegistrations() {
  try {
    const raw = localStorage.getItem(REG_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// Helper to save registration to local storage
function saveRegistrationLocal(regData) {
  const list = getStoredRegistrations();
  list.unshift(regData);
  localStorage.setItem(REG_STORAGE_KEY, JSON.stringify(list));
  return regData;
}

// Helper to update payment status in local storage
function updateRegistrationStatusLocal(regId, status, paymentId) {
  const list = getStoredRegistrations();
  const item = list.find(r => r.registration_id === regId || r.registrationId === regId);
  if (item) {
    item.payment_status = status;
    item.paymentStatus = status;
    item.payment_id = paymentId;
    localStorage.setItem(REG_STORAGE_KEY, JSON.stringify(list));
    return item;
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFaqAccordion();
  initJourneyTabs();
  initRegistrationForm();
  initModalCloseHandlers();
});

/* ----------------------------------------------------
   1. Navbar Scroll & Mobile Drawer
   ---------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.textContent = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }
}

/* ----------------------------------------------------
   2. FAQ Accordion
   ---------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ----------------------------------------------------
   3. Journey Tabs (10-Day vs 25-Day)
   ---------------------------------------------------- */
function initJourneyTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const timelineViews = document.querySelectorAll('.timeline-view');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      timelineViews.forEach(view => view.classList.remove('active'));

      btn.classList.add('active');
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });
}

/* ----------------------------------------------------
   4. Registration Form (Pure Static Processing)
   ---------------------------------------------------- */
function initRegistrationForm() {
  const regForm = document.getElementById('registrationForm');
  if (!regForm) return;

  regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset error states
    clearErrors();

    // Read values
    const studentName = document.getElementById('studentName').value.trim();
    const parentName = document.getElementById('parentName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const studentClass = document.getElementById('studentClass').value;
    const school = document.getElementById('school').value.trim();
    const district = document.getElementById('district').value.trim();
    const trainingMode = document.getElementById('trainingMode') ? document.getElementById('trainingMode').value : 'Offline';

    let hasErrors = false;

    // Validation
    if (!studentName || studentName.length < 2) {
      showError('studentName', 'Please enter the student\'s full name.');
      hasErrors = true;
    }

    if (!parentName || parentName.length < 2) {
      showError('parentName', 'Please enter parent/guardian name.');
      hasErrors = true;
    }

    const cleanMobile = mobile.replace(/[\s\-\+]/g, '');
    const validMobile = cleanMobile.startsWith('91') && cleanMobile.length === 12 ? cleanMobile.slice(2) : cleanMobile;
    if (!/^[6-9]\d{9}$/.test(validMobile)) {
      showError('mobile', 'Please enter a valid 10-digit mobile number.');
      hasErrors = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email address.');
      hasErrors = true;
    }

    if (!studentClass) {
      showError('studentClass', 'Please select your class/grade.');
      hasErrors = true;
    }

    if (!school || school.length < 2) {
      showError('school', 'Please provide school or college name.');
      hasErrors = true;
    }

    if (!district || district.length < 2) {
      showError('district', 'Please enter your district.');
      hasErrors = true;
    }

    if (!trainingMode) {
      showError('trainingMode', 'Please select preferred training mode.');
      hasErrors = true;
    }

    if (hasErrors) {
      const firstError = document.querySelector('.form-control.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const submitBtn = document.getElementById('submitRegBtn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Processing Registration...</span>';

    // Generate Unique Registration ID
    const dateCode = new Date().toISOString().slice(2, 7).replace('-', '');
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const regId = `DIP-${dateCode}-${randomSeq}`;
    const regDate = new Date().toISOString().slice(0, 10);

    const regRecord = {
      registration_id: regId,
      registrationId: regId,
      student_name: studentName,
      studentName: studentName,
      parent_name: parentName,
      parentName: parentName,
      mobile: validMobile,
      email: email,
      student_class: studentClass,
      studentClass: studentClass,
      school: school,
      district: district,
      training_mode: trainingMode,
      trainingMode: trainingMode,
      registration_date: regDate,
      registrationDate: regDate,
      payment_status: 'Pending',
      paymentStatus: 'Pending',
      payment_amount: 499,
      fee: 499,
      payment_id: ''
    };

    // Save to client-side localStorage fallback
    saveRegistrationLocal(regRecord);

    // Send to backend SQLite server
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regRecord)
    })
    .catch(err => {
      console.warn('Backend server offline or unreachable, saved locally:', err);
    })
    .finally(() => {
      // Show Success Modal
      showSuccessModal(regRecord);
      regForm.reset();

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    });
  });
}

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}Error`);
  if (input) input.classList.add('error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }
}

function clearErrors() {
  document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.field-error').forEach(el => {
    el.textContent = '';
    el.classList.remove('visible');
  });
}

/* ----------------------------------------------------
   5. Success Modal (Registration Confirmation)
   ---------------------------------------------------- */
function showSuccessModal(registration) {
  const modal = document.getElementById('successModal');
  if (!modal) return;

  const regIdEl = document.getElementById('modalRegId');
  const nameEl = document.getElementById('modalStudentName');
  const classEl = document.getElementById('modalClass');
  const modeEl = document.getElementById('modalTrainingMode');

  if (regIdEl) regIdEl.textContent = registration.registration_id || registration.registrationId;
  if (nameEl) nameEl.textContent = registration.student_name || registration.studentName;
  if (classEl) classEl.textContent = registration.student_class || registration.studentClass;
  if (modeEl) modeEl.textContent = (registration.training_mode || registration.trainingMode || 'Offline') + ' Training';

  modal.classList.add('active');
}

function initModalCloseHandlers() {
  const closeBtns = document.querySelectorAll('.modal-close, [data-modal-close]');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });
}
