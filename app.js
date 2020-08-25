/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

const myNavList = document.querySelector('#myTopnav');
const mySections = document.querySelectorAll('section');

// Customization For Observer
const options = {
  root: null,
  threshold: 0.45
}


/**
 * End Global Variables
 * Start Helper Functions
 *
*/


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
function buildNav() {
  const newDocFrag = document.createDocumentFragment();
  // Looping Over Sections to Create Anchor element for each Section
  mySections.forEach((section) => {
    const newAnchorElem = document.createElement('a');
    // Matching newAnchorElem with its Section
    newAnchorElem.setAttribute('href', `#${section.id}`);
    newAnchorElem.textContent = `${section.getAttribute('data-nav')}`;
    newDocFrag.appendChild(newAnchorElem);
  });

  myNavList.appendChild(newDocFrag);
}

// build the nav
buildNav();

// Make Observer to add active class to sections when near top of viewport
const sectionObsererver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    // Remove class 'active' when 'target' is away from viewport
    if (!entry.isIntersecting) {
      entry.target.classList.remove('your-active-class');
      return;
    // Add class 'active' to 'target' when near top of viewport
    } else {
      entry.target.classList.add('your-active-class');
    }
  });
}, options);

// Add Sections as a Targets for Observer
mySections.forEach((section) => {
  sectionObsererver.observe(section);
});

// Scroll to anchor ID using scrollTO event
myNavList.addEventListener('click', event => {
  if (event.target.nodeName === 'A') {
    event.preventDefault();
    const clickedAnchorContent = event.target.textContent;
    const sectionToScroll = document.querySelector(`[data-nav="${clickedAnchorContent}"]`);
    sectionToScroll.scrollIntoView({
      behavior: "smooth",
      block: 'start'
    });
  }
});

/**
 * End Main Functions
 * Begin Events
 *
*/
// Build menu

// Scroll to section on link click
