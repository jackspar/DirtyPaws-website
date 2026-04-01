/* =========================================================
   Dirty Paws — main.js
   Injects shared header + footer, handles nav, slideshow
   ========================================================= */

(function () {

  // ---- Helpers ----

  function rootPath() {
    // Returns relative path from current page to site root
    const depth = location.pathname.replace(/\/$/, '').split('/').length - 1;
    if (depth <= 1) return './';
    return '../'.repeat(depth - 1);
  }

  function activeClass(href) {
    const path = location.pathname;
    if (href === './' || href === '/') {
      return path === '/' || path.endsWith('/index.html') && path.split('/').length <= 2 ? 'active' : '';
    }
    return path.includes(href.replace('./', '').replace('../', '')) ? 'active' : '';
  }

  // ---- Header ----

  function injectHeader() {
    const r = rootPath();
    const header = document.getElementById('site-header');
    if (!header) return;

    header.innerHTML = `
      <div class="header-inner">
        <a href="${r}" class="header-logo">
          <img src="${r}assets/logos/logo-main.png" alt="Dirty Paws Animal Rescue">
        </a>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="nav-links">
          <li><a href="${r}" class="${activeClass(r)}">Home</a></li>
          <li><a href="${r}about/" class="${activeClass('about')}">About</a></li>
          <li class="nav-item">
            <a href="${r}cats/" class="${activeClass('cats')}">Cats ▾</a>
            <div class="nav-dropdown">
              <a href="${r}cats/available/">Available Cats</a>
            </div>
          </li>
          <li><a href="${r}events/" class="${activeClass('events')}">Events</a></li>
          <li><a href="${r}volunteers/" class="${activeClass('volunteers')}">Volunteers</a></li>
          <li><a href="${r}resources/" class="${activeClass('resources')}">Resources</a></li>
          <li><a href="${r}partners/" class="${activeClass('partners')}">Partners &amp; Sponsors</a></li>
          <li><a href="${r}donate/" class="btn-donate ${activeClass('donate')}">Donate</a></li>
        </ul>
      </div>
    `;

    document.getElementById('hamburger').addEventListener('click', function () {
      document.getElementById('nav-links').classList.toggle('open');
    });

    // Mobile dropdown toggle
    header.querySelectorAll('.nav-item > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.closest('.nav-item').classList.toggle('open');
        }
      });
    });
  }

  // ---- Footer ----

  function injectFooter() {
    const r = rootPath();
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-adopt">
          <h4>Help animals find a new home</h4>
          <a href="${r}cats/available/">Adopt now →</a>
        </div>
        <div class="footer-social">
          <h4>Follow Us</h4>
          <div class="social-icons">
            <a href="https://www.instagram.com/dirtypawsanimalrescue/" target="_blank" rel="noopener" title="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.facebook.com/DirtyPawsAnimalRescue/" target="_blank" rel="noopener" title="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-contact">
          <h4>Contact</h4>
          <a href="mailto:dirtypawsanimalrescue@gmail.com">dirtypawsanimalrescue@gmail.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          &copy; 2026 Dirty Paws Animal Rescue &nbsp;&middot;&nbsp; Non-profit 501(c)(3)
        </div>
      </div>
    `;
  }

  // ---- Slideshow ----

  function initSlideshow() {
    const slides = document.querySelectorAll('.slideshow-slide');
    const dotsContainer = document.querySelector('.slideshow-dots');
    if (!slides.length) return;

    let current = 0;

    // Create dots
    slides.forEach(function (_, i) {
      const btn = document.createElement('button');
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', function () { goTo(i); });
      dotsContainer.appendChild(btn);
    });

    function goTo(n) {
      slides[current].classList.remove('active');
      dotsContainer.children[current].classList.remove('active');
      current = (n + slides.length) % slides.length;
      slides[current].classList.add('active');
      dotsContainer.children[current].classList.add('active');
    }

    slides[0].classList.add('active');
    setInterval(function () { goTo(current + 1); }, 4000);
  }

  // ---- Lightbox (events page) ----

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lbImg = lightbox.querySelector('img');
    const lbClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.event-thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        lbImg.src = this.dataset.full || this.querySelector('img').src;
        lightbox.classList.add('open');
      });
    });

    lbClose.addEventListener('click', function () { lightbox.classList.remove('open'); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  // ---- Init ----

  document.addEventListener('DOMContentLoaded', function () {
    injectHeader();
    injectFooter();
    initSlideshow();
    initLightbox();
  });

}());
