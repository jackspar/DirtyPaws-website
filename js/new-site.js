/* =========================================================
   Dirty Paws Animal Rescue — new-site.js
   Injects shared header + footer (Street Cats Club model),
   handles mobile nav, hero slideshow, poster lightbox.
   ========================================================= */

(function () {

  // ---- Root-path helper (works locally + on GitHub Pages subpath) ----
  function rootPath() {
    var REPO = '/DirtyPaws-website';
    var path = location.pathname;
    if (path.indexOf(REPO) === 0) path = path.slice(REPO.length);
    path = path.replace(/index\.html$/, '').replace(/\/$/, '');
    var segs = path.split('/').filter(Boolean);
    return segs.length === 0 ? './' : '../'.repeat(segs.length);
  }

  function isActive(seg) {
    var p = location.pathname;
    if (seg === 'home') {
      return /(^\/(DirtyPaws-website\/)?$)|index\.html$/.test(p) &&
             p.replace('/DirtyPaws-website', '').replace(/index\.html$/, '').replace(/\//g, '').length === 0
             ? 'active' : '';
    }
    return p.indexOf('/' + seg) !== -1 ? 'active' : '';
  }

  var IG = 'https://www.instagram.com/dirtypawsanimalrescue';
  var FB = 'https://www.facebook.com/dirtypawsanimalrescue';
  var EMAIL = 'dirtypawsanimalrescue@gmail.com';

  var IG_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
  var FB_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';

  function injectHeader() {
    var r = rootPath();
    var el = document.getElementById('site-header');
    if (!el) return;
    el.className = 'site-header';
    el.innerHTML =
      '<div class="header-inner">' +
        '<a href="' + r + '" class="header-logo"><img src="' + r + 'assets/logos/logo-dark.png" alt="Dirty Paws Animal Rescue home"></a>' +
        '<button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '<ul class="nav-links" id="nav-links">' +
          '<li><a href="' + r + 'events/" class="' + isActive('events') + '">Events</a></li>' +
          '<li><a href="' + r + 'cats/" class="' + isActive('cats') + '">Adopt</a></li>' +
          '<li><a href="' + r + 'adopt/" class="' + isActive('adopt') + '">How to Adopt</a></li>' +
          '<li><a href="' + r + 'volunteers/" class="' + isActive('volunteers') + '">Volunteer</a></li>' +
          '<li><a href="' + r + 'resources/" class="' + isActive('resources') + '">Resources</a></li>' +
          '<li><a href="' + r + 'about/" class="' + isActive('about') + '">About</a></li>' +
          '<li><a href="' + r + 'donate/" class="btn-donate">Donate</a></li>' +
        '</ul>' +
      '</div>';

    var burger = document.getElementById('hamburger');
    burger.addEventListener('click', function () {
      var nav = document.getElementById('nav-links');
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function injectFooter() {
    var r = rootPath();
    var el = document.getElementById('site-footer');
    if (!el) return;
    el.className = 'site-footer';
    el.innerHTML =
      '<div class="footer-grid">' +
        '<div class="footer-col footer-brand">' +
          '<img src="' + r + 'assets/logos/logo-main.png" alt="Dirty Paws Animal Rescue">' +
          '<p>Giving adoptable cats a better life in Contra Costa County and the East Bay.</p>' +
          '<div class="footer-social">' +
            '<a href="' + IG + '" target="_blank" rel="noopener" aria-label="Instagram">' + IG_SVG + '</a>' +
            '<a href="' + FB + '" target="_blank" rel="noopener" aria-label="Facebook">' + FB_SVG + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Adopt</h4>' +
          '<ul>' +
            '<li><a href="' + r + 'cats/">Adoptable Cats</a></li>' +
            '<li><a href="' + r + 'adopt/">How to Adopt</a></li>' +
            '<li><a href="https://docs.google.com/forms/d/1OSzpBL63ZsfJg7-QOq6Z466SG7RbhoauOl-GFXBHhW8/viewform" target="_blank" rel="noopener">Adoption Application</a></li>' +
            '<li><a href="https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/" target="_blank" rel="noopener">Petfinder Page</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Get Involved</h4>' +
          '<ul>' +
            '<li><a href="' + r + 'volunteers/">Volunteer</a></li>' +
            '<li><a href="' + r + 'donate/">Donate</a></li>' +
            '<li><a href="' + r + 'events/">Events</a></li>' +
            '<li><a href="' + r + 'resources/">Resources</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>About</h4>' +
          '<ul>' +
            '<li><a href="' + r + 'about/">Our Mission</a></li>' +
            '<li><a href="' + r + 'about/#partners">Partners</a></li>' +
            '<li><a href="mailto:' + EMAIL + '">Contact Us</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">&copy; ' + new Date().getFullYear() + ' Dirty Paws Animal Rescue &middot; Contra Costa County, CA &middot; ' +
        '<a href="mailto:' + EMAIL + '" style="color:inherit;">' + EMAIL + '</a></div>';
  }

  function initSlideshow() {
    var slides = document.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;
    var i = 0;
    slides[0].style.opacity = '1';
    setInterval(function () {
      slides[i].style.opacity = '0';
      i = (i + 1) % slides.length;
      slides[i].style.opacity = '1';
    }, 5000);
  }

  function initLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var img = lb.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(function (t) {
      t.addEventListener('click', function () {
        img.src = t.getAttribute('src');
        img.alt = t.getAttribute('alt') || '';
        lb.classList.add('open');
      });
    });
    function close() { lb.classList.remove('open'); }
    lb.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectHeader();
    injectFooter();
    initSlideshow();
    initLightbox();
  });

}());
