/* =========================================================
   Dirty Paws — petfinder.js
   Fetches available cats from Petfinder API (org CA2823).
   Falls back to mock data if no credentials configured.
   ========================================================= */

(function () {

  // ---- Configuration ----
  // These will be filled in when the founder provides the API key.
  // Until then, PETFINDER_KEY is empty and mock data is used.
  var PETFINDER_KEY    = '';   // e.g. 'abc123def456...'
  var PETFINDER_SECRET = '';   // e.g. 'xyz789...'
  var ORG_ID = 'CA2823';
  var API_BASE = 'https://api.petfinder.com/v2';

  // ---- Mock data ----
  // Real names from Dirty Paws' current cats. Photos use local cat images.
  // Replace with live API data once credentials arrive.
  var MOCK_CATS = [
    {
      id: 'mock-1',
      name: 'Harmony',
      age: 'Young',
      breeds: { primary: 'Domestic Shorthair' },
      gender: 'Female',
      photos: [{ medium: '../../assets/images/cats/cat-01.jpg' }],
      url: 'https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/'
    },
    {
      id: 'mock-2',
      name: 'Rhyme',
      age: 'Young',
      breeds: { primary: 'Domestic Shorthair' },
      gender: 'Male',
      photos: [{ medium: '../../assets/images/cats/cat-02.jpg' }],
      url: 'https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/'
    },
    {
      id: 'mock-3',
      name: 'Cannoli',
      age: 'Kitten',
      breeds: { primary: 'Domestic Shorthair' },
      gender: 'Female',
      photos: [{ medium: '../../assets/images/cats/cat-03.jpg' }],
      url: 'https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/'
    },
    {
      id: 'mock-4',
      name: 'Scrambles',
      age: 'Adult',
      breeds: { primary: 'Tabby' },
      gender: 'Male',
      photos: [{ medium: '../../assets/images/cats/cat-04.jpg' }],
      url: 'https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/'
    },
    {
      id: 'mock-5',
      name: 'Season Salt',
      age: 'Adult',
      breeds: { primary: 'Domestic Longhair' },
      gender: 'Female',
      photos: [{ medium: '../../assets/images/cats/cat-05.jpg' }],
      url: 'https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/'
    },
    {
      id: 'mock-6',
      name: 'Mochi',
      age: 'Kitten',
      breeds: { primary: 'Domestic Shorthair' },
      gender: 'Female',
      photos: [{ medium: '../../assets/images/cats/cat-06.jpg' }],
      url: 'https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/'
    }
  ];

  // ---- Render ----

  function renderCats(cats) {
    var grid = document.getElementById('cats-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (!cats || cats.length === 0) {
      grid.innerHTML = '<div class="cats-empty"><p>No cats currently listed — check back soon or <a href="https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/" target="_blank">visit our Petfinder page</a>.</p></div>';
      return;
    }

    cats.forEach(function (cat) {
      var photo = (cat.photos && cat.photos.length > 0) ? cat.photos[0].medium : '../../assets/logos/logo-main.png';
      var breed = (cat.breeds && cat.breeds.primary) ? cat.breeds.primary : 'Cat';
      var meta  = [cat.age, breed, cat.gender].filter(Boolean).join(' · ');

      var card = document.createElement('div');
      card.className = 'cat-card';
      card.innerHTML =
        '<div class="cat-card-img"><img src="' + photo + '" alt="' + cat.name + '" loading="lazy"></div>' +
        '<div class="cat-card-body">' +
          '<div class="cat-card-name">' + cat.name + '</div>' +
          '<div class="cat-card-meta">' + meta + '</div>' +
          '<a href="' + cat.url + '" target="_blank" rel="noopener" class="btn btn-primary">Meet ' + cat.name + ' →</a>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function showLoading() {
    var grid = document.getElementById('cats-grid');
    if (grid) grid.innerHTML = '<div class="cats-loading"><div class="spinner"></div><p>Loading available cats...</p></div>';
  }

  function showError() {
    var grid = document.getElementById('cats-grid');
    if (grid) grid.innerHTML = '<div class="cats-error"><p>Could not load cats right now. <a href="https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/" target="_blank">Visit our Petfinder page</a> to see all available cats.</p></div>';
  }

  // ---- Mock banner ----

  function showMockBanner() {
    var banner = document.getElementById('mock-banner');
    if (banner) banner.style.display = 'block';
  }

  // ---- Live API fetch ----

  function fetchToken() {
    return fetch(API_BASE + '/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials&client_id=' + encodeURIComponent(PETFINDER_KEY) + '&client_secret=' + encodeURIComponent(PETFINDER_SECRET)
    }).then(function (r) { return r.json(); });
  }

  function fetchAnimals(token) {
    return fetch(API_BASE + '/animals?organization=' + ORG_ID + '&type=cat&status=adoptable&limit=100', {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(function (r) { return r.json(); });
  }

  // ---- Init ----

  document.addEventListener('DOMContentLoaded', function () {
    if (!PETFINDER_KEY) {
      // No credentials yet — show mock data
      showMockBanner();
      renderCats(MOCK_CATS);
      return;
    }

    showLoading();
    fetchToken()
      .then(function (data) { return fetchAnimals(data.access_token); })
      .then(function (data) { renderCats(data.animals); })
      .catch(function () { showError(); });
  });

}());
