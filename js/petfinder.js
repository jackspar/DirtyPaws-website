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
  // Real, current adoptable cats from Dirty Paws' Petfinder org (CA2823),
  // captured 2026-09-23. Photos are local copies mirrored from Petfinder.
  // Each cat's `url` points at its own Petfinder profile page.
  // Replace with live API data once credentials arrive.
  var MOCK_CATS = [
    {
      id: 'saffron',
      name: 'Saffron',
      age: 'Young',
      breeds: { primary: 'Domestic Short Hair' },
      gender: 'Female',
      bio: `Saffron has grown into such a stunning girl. She absolutely loves people and wants nothing more than to have you pet her for hours. She's got the looks and personality to make her the perfect addition to any family. If you're looking for the total package look no further!

Like all of our other cats/kittens Saffron has been spayed, FIV/FELV tested negative, dewormed, flea treated, vaccinated and microchipped and is available for immediate adoption.`,
      photos: [
        { medium: '../assets/images/petfinder/saffron/saffron-1.jpg' },
        { medium: '../assets/images/petfinder/saffron/saffron-2.jpg' },
        { medium: '../assets/images/petfinder/saffron/saffron-3.jpg' },
        { medium: '../assets/images/petfinder/saffron/saffron-4.jpg' }
      ],
      url: 'https://www.petfinder.com/cat/saffron-cbb4d5db-0997-4e2b-a0c5-6f7aa402bfd2/ca/brentwood/dirty-paws-animal-rescue-ca2823/details/'
    },
    {
      id: 'harmony-rhyme',
      name: 'Harmony & Rhyme',
      age: 'Adults',
      breeds: { primary: 'Siamese & Tuxedo — bonded pair' },
      gender: 'Male & Female',
      bio: `Harmony and Rhyme are a bonded brother-and-sister pair, and they must be adopted together. They've been with us almost their entire lives — originally adopted as kittens but returned over a year later in rough shape. It's taken a while to bring them back to health, physically and mentally, and happily they're both in tip-top shape now and ready to try again for a forever family together.

Harmony, with his strong "Jay Leno" jawline, desperately wants to be loved — once he knows you're safe, he adores being petted. Rhyme was described by a foster as "aggressively affectionate" — two-handed pets are best!

Both are spayed/neutered, vaccinated, FIV/FELV negative, dewormed, flea treated, and microchipped. They've each had extensive dental surgery but eat wet and dry food like champs, and they love Temptation treats and Churu. Because of past experience they'd do best in a dog-free (or very-small-dog) home, and do well with pet-savvy kids.

Because of their strong bond, Harmony and Rhyme are only available for adoption together.`,
      photos: [
        { medium: '../assets/images/petfinder/harmony/harmony-1.jpg' },
        { medium: '../assets/images/petfinder/rhyme/rhyme-1.jpg' },
        { medium: '../assets/images/petfinder/harmony/harmony-2.jpg' },
        { medium: '../assets/images/petfinder/rhyme/rhyme-2.jpg' },
        { medium: '../assets/images/petfinder/harmony/harmony-3.jpg' },
        { medium: '../assets/images/petfinder/rhyme/rhyme-3.jpg' },
        { medium: '../assets/images/petfinder/rhyme/rhyme-4.jpg' },
        { medium: '../assets/images/petfinder/rhyme/rhyme-5.jpg' }
      ],
      url: 'https://www.petfinder.com/cat/rhyme-e9294b8c-b1a3-4be1-a741-9aad3480afe9/ca/brentwood/dirty-paws-animal-rescue-ca2823/details/',
      bondedPair: true
    },
    {
      id: 'onion-salt',
      name: 'Onion Salt aka Bat Boi',
      age: 'Young',
      breeds: { primary: 'Domestic Short Hair (black)' },
      gender: 'Male',
      bio: `Where are all the black cat lovers?

Onion Salt who is part of our 11 Herbs and Spice litter has grown up to such a handsome boy! Just look at the sleekness of his coat and masculine physique. He is incredibly playful and loving and can't wait to have a family of his own.

Onion Salt, like all of our other adoptable animals has been neutered, vaccinated, microchipped, dewormed, flea treated and FIV/FELV tested negative.`,
      photos: [
        { medium: '../assets/images/petfinder/onion-salt/onion-salt-1.jpg' },
        { medium: '../assets/images/petfinder/onion-salt/onion-salt-2.jpg' },
        { medium: '../assets/images/petfinder/onion-salt/onion-salt-3.jpg' },
        { medium: '../assets/images/petfinder/onion-salt/onion-salt-4.jpg' },
        { medium: '../assets/images/petfinder/onion-salt/onion-salt-5.jpg' },
        { medium: '../assets/images/petfinder/onion-salt/onion-salt-6.jpg' }
      ],
      url: 'https://www.petfinder.com/cat/onion-salt-aka-bat-boi-5edc6e4f-48be-406d-8e04-17433afd90e4/ca/brentwood/dirty-paws-animal-rescue-ca2823/details/'
    },
    {
      id: 'lily',
      name: 'Lily',
      age: 'Kitten',
      breeds: { primary: 'Domestic Short Hair' },
      gender: 'Female',
      bio: `Too much!

That's how we describe our small Lily girl. She is tiny and fierce! She has met nothing that doesn't want to make her leap onto, climb up or try to wrestle to the ground. When people say you should adopt 2 kittens this girl is exactly why. She has the grit of the energizer bunny and the heart of a lion. She needs a family that is willing to embrace her warrior spirit!

Born under the Taurus sign, the sign ruled by Venus—the planet of luxury, beauty, and abundance—Taurus has a natural draw toward material comforts and fine things. She adores her soft, fluffy beds, temptation treats, exactly 6.5 pets before she turns on you and using your shoulder as a perch after she climbs your entire body.

All joking aside she has zero chill and isn't a kitten for a house with small children or the elderly. We would love for her to be adopted with one of her foster siblings if you're looking for a pair of kittens.

Lily has been spayed, flea treated, dewormed, vaccinated, microchipped and tested neg for FIV/FELV.`,
      photos: [
        { medium: '../assets/images/petfinder/lily/lily-1.jpg' },
        { medium: '../assets/images/petfinder/lily/lily-2.jpg' },
        { medium: '../assets/images/petfinder/lily/lily-3.jpg' },
        { medium: '../assets/images/petfinder/lily/lily-4.jpg' },
        { medium: '../assets/images/petfinder/lily/lily-5.jpg' }
      ],
      url: 'https://www.petfinder.com/cat/lily-e077c58b-bf6b-400c-aeb3-0f92ac92cd73/ca/brentwood/dirty-paws-animal-rescue-ca2823/details/'
    },
    {
      id: 'cheese-litter',
      name: 'Cheese Litter (Cheddar, Colby, Brie, Blue Cheese Crumbles)',
      age: 'Young',
      breeds: { primary: 'Domestic Short Hair (orange & white)' },
      gender: '3 male / 1 female',
      bio: `WARNING: THESE KITTENS MAY CHANGE YOUR LIFE

We have four orange-and-white kittens Cheddar, Colby, Brie and Blue Cheese Crumbles — three boys and one girl — and we need to say this right up front:

These are not normal kittens.

We've fostered a lot of kittens, and this little crew is something special.

They are hilarious. They are fearless. They are ridiculously playful. And they LOVE people. These kittens have never met a stranger in their young lives. Walk into the room and congratulations — you are now their best friend.

They come running to greet you. They want to be involved in whatever you're doing. They play like tiny orange maniacs, love with their whole hearts, and somehow manage to pack an absolutely unreasonable amount of personality into four very small bodies.

And then there are the faces. Shockingly cute. Like, this seems unfair to other kittens cute.

But what makes these four so extraordinary isn't how adorable they are. It's how completely they connect with people. These are the kittens you adopt thinking, 'I'm getting a cat.' And years later you realize: No. I got my soul cat. The cat who follows you from room to room. The cat who makes you laugh every single day. The cat who knows when you need them.

There are three little orange-and-white boys and one little orange-and-white girl waiting for their people. Come meet them. Just don't blame us when you fall hopelessly in love.`,
      photos: [
        { medium: '../assets/images/petfinder/cheese-litter/cheese-litter-1.jpg' },
        { medium: '../assets/images/petfinder/cheese-litter/cheese-litter-2.jpg' },
        { medium: '../assets/images/petfinder/cheese-litter/cheese-litter-3.jpg' },
        { medium: '../assets/images/petfinder/cheese-litter/cheese-litter-4.jpg' },
        { medium: '../assets/images/petfinder/cheese-litter/cheese-litter-5.jpg' },
        { medium: '../assets/images/petfinder/cheese-litter/cheese-litter-6.jpg' }
      ],
      url: 'https://www.petfinder.com/cat/cheese-litter-8496425d-33b4-44a3-9633-b91c2be0baaa/ca/brentwood/dirty-paws-animal-rescue-ca2823/details/'
    },
    {
      id: 'scrambles',
      name: 'Scrambles',
      age: 'Young',
      breeds: { primary: 'Domestic Short Hair (ginger)' },
      gender: 'Male',
      bio: `What can we say about our little Scrambles? Our affinity for gingers is well known and this guy lives up to the orange stereotype!

Scrambles was brought to us by a local trapper when he was found alone in a feral colony. He was so very small he should've been on the bottle but this little guy powered thru that and went straight to food! We never thought he was going to grow and would stay stunted forever. Happily he has hit his goal weight of 2lbs and was able to be neutered and is now ready for his forever family and available for immediate adoption!

He's not the youngest of kittens but at under 1 year he is still plenty playful enough for any family looking to add a loving cat!

Scrambles has been neutered, vaccinated, flea and parasite treated, FIV/FELV neg and microchipped.`,
      photos: [
        { medium: '../assets/images/petfinder/scrambles/scrambles-1.jpg' },
        { medium: '../assets/images/petfinder/scrambles/scrambles-2.jpg' },
        { medium: '../assets/images/petfinder/scrambles/scrambles-3.jpg' },
        { medium: '../assets/images/petfinder/scrambles/scrambles-4.jpg' },
        { medium: '../assets/images/petfinder/scrambles/scrambles-5.jpg' },
        { medium: '../assets/images/petfinder/scrambles/scrambles-6.jpg' }
      ],
      url: 'https://www.petfinder.com/cat/scrambles-d66a1271-417e-4acd-b3a1-c3c46057d2f0/ca/brentwood/dirty-paws-animal-rescue-ca2823/details/'
    },
    {
      id: 'zsa-zsa',
      name: 'Zsa Zsa',
      age: 'Kitten',
      breeds: { primary: 'Tortoiseshell & Calico' },
      gender: 'Female',
      bio: `Where are all our calico/torti fans at? This little firecracker is Zsa Zsa and she is the textbook example of a torti/calico! Her mink soft coat with striking patterns def gets attention! She is sassy to the bone, playful with endless energy and silly enough to make you laugh every single day!

Zsa Zsa is spayed, vaccinated, FIV/FELV neg, dewormed, flea treated and microchipped and ready for her forever home!`,
      photos: [
        { medium: '../assets/images/petfinder/zsa-zsa/zsa-zsa-1.jpg' },
        { medium: '../assets/images/petfinder/zsa-zsa/zsa-zsa-2.jpg' },
        { medium: '../assets/images/petfinder/zsa-zsa/zsa-zsa-3.jpg' },
        { medium: '../assets/images/petfinder/zsa-zsa/zsa-zsa-4.jpg' }
      ],
      url: 'https://www.petfinder.com/cat/zsa-zsa-35bf9036-56bd-4d20-ae2e-aa0dff886fe3/ca/brentwood/dirty-paws-animal-rescue-ca2823/details/'
    }
  ];

  // ---- Render ----

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatBio(bio) {
    if (!bio) return '';
    return bio
      .split(/\n\s*\n/)
      .map(function (para) { return '<p class="pf-bio">' + escapeHtml(para.trim()).replace(/\n/g, '<br>') + '</p>'; })
      .join('');
  }

  function renderCats(cats) {
    var grid = document.getElementById('cats-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (!cats || cats.length === 0) {
      grid.innerHTML = '<div class="cats-empty"><p>No cats currently listed — check back soon or <a href="https://www.petfinder.com/member/us/ca/brentwood/dirty-paws-animal-rescue-ca2823/" target="_blank">visit our Petfinder page</a>.</p></div>';
      return;
    }

    cats.forEach(function (cat) {
      var photo = (cat.photos && cat.photos.length > 0) ? cat.photos[0].medium : '../assets/logos/logo-main.png';
      var breed = (cat.breeds && cat.breeds.primary) ? cat.breeds.primary : 'Cat';
      var chips = [cat.age, cat.gender, breed].filter(Boolean)
        .map(function (c) { return '<span class="pf-chip">' + escapeHtml(c) + '</span>'; })
        .join('');

      var bondedNote = '';
      if (cat.bondedPair) {
        bondedNote = '<p class="pf-bio" style="font-weight:700;color:var(--blue);">Bonded pair — Harmony &amp; Rhyme must be adopted together.</p>';
      } else if (cat.bondedWith) {
        bondedNote = '<p class="pf-bio" style="font-weight:700;color:var(--blue);">Bonded pair — must be adopted together with ' + escapeHtml(cat.bondedWith) + '.</p>';
      }

      var card = document.createElement('div');
      card.className = 'pf-card';
      card.innerHTML =
        '<img src="' + photo + '" alt="' + escapeHtml(cat.name) + '" loading="lazy">' +
        '<div class="pf-card-body">' +
          '<div class="pf-name">' + escapeHtml(cat.name) + '</div>' +
          '<div class="pf-chips">' + chips + '</div>' +
          bondedNote +
          formatBio(cat.bio) +
          '<a href="' + cat.url + '" target="_blank" rel="noopener" class="btn btn-primary">Meet ' + escapeHtml(cat.name) + ' on Petfinder →</a>' +
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
