/**
 * Dilshaj Infotech Skill Development Program
 * Pure Static Frontend Interactions & UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFaqAccordion();
  initJourneyTabs();
  initPrizeTabs();
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
    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      mobileToggle.setAttribute('aria-expanded', 'false');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    const drawerElements = mobileDrawer.querySelectorAll('a, button');
    drawerElements.forEach(el => {
      el.addEventListener('click', closeDrawer);
    });

    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && e.target !== mobileToggle) {
        closeDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
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
   3. Journey Tabs (21-Day vs 14-Day)
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
   4. Prize Track Tabs
   ---------------------------------------------------- */
function initPrizeTabs() {
  const prizeTabBtns = document.querySelectorAll('.prize-tab-btn');
  const prizeViews = document.querySelectorAll('.prize-view');

  prizeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-prize-target');

      prizeTabBtns.forEach(b => b.classList.remove('active'));
      prizeViews.forEach(view => view.classList.remove('active'));

      btn.classList.add('active');
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });
}
