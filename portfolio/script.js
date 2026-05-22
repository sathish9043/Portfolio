// ── THEME TOGGLE ──
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);
    themeToggle.textContent = saved === 'dark' ? '🌙' : '☀️';
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
    });

    // ── NAV SCROLL ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // ── HAMBURGER ──
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });

    // ── TYPED TITLE ──
    const titles = [
      'Web Developer',
      'Front end Developer',
      'SQL Developer',
      'Networking',
      'Problem Solver'
    ];
    let tIdx = 0, cIdx = 0, deleting = false;
    const typedEl = document.getElementById('typedTitle');
    function type() {
      const current = titles[tIdx];
      if (!deleting) {
        typedEl.textContent = current.slice(0, ++cIdx);
        if (cIdx === current.length) { deleting = true; setTimeout(type, 1800); return; }
      } else {
        typedEl.textContent = current.slice(0, --cIdx);
        if (cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % titles.length; }
      }
      setTimeout(type, deleting ? 60 : 90);
    }
    type();

    // ── SCROLL REVEAL ──
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(el => revealObs.observe(el));

    // ── SKILL BARS ──
    const fills = document.querySelectorAll('.skill-fill');
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.width + '%';
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    fills.forEach(f => barObs.observe(f));

    // ── SCROLL TOP ──
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ── CONTACT FORM ──
    document.getElementById('sendMessage').addEventListener('click', () => {
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      if (!name || !email || !message) { alert('Please fill in Name, Email, and Message.'); return; }
      const mailto = `mailto:nhsathishkumar99@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
      window.location.href = mailto;
    });
