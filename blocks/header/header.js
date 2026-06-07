import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function getTopLevelItems(navSections) {
  return navSections.querySelectorAll(':scope .default-content-wrapper > ul > li');
}

function setMobileCollapsedView(nav, navSections) {
  if (!navSections || isDesktop.matches) return;

  // Keep nav collapsed
  nav.setAttribute('aria-expanded', 'false');

  // Override CSS so top-level list remains visible even when collapsed
  navSections.style.display = 'block';
  navSections.style.visibility = 'visible';
  navSections.style.alignSelf = 'start';
  navSections.style.padding = '1rem 0';

  getTopLevelItems(navSections).forEach((item) => {
    item.setAttribute('aria-expanded', 'false');

    const submenu = item.querySelector(':scope > ul');
    if (submenu) {
      submenu.style.display = 'none';
    }
  });
}

function setMobileExpandedView(nav, navSections, activeSection) {
  if (!navSections || isDesktop.matches) return;

  nav.setAttribute('aria-expanded', 'true');

  // Keep nav areas visible while expanded
  navSections.style.display = 'block';
  navSections.style.visibility = 'visible';
  navSections.style.alignSelf = 'start';
  navSections.style.padding = '2rem 0';

  getTopLevelItems(navSections).forEach((item) => {
    const submenu = item.querySelector(':scope > ul');
    const isActive = item === activeSection;

    item.setAttribute('aria-expanded', isActive ? 'true' : 'false');

    if (submenu) {
      submenu.style.display = isActive ? 'flex' : 'none';
      submenu.style.flexDirection = 'column';
      submenu.style.marginTop = '1rem';
    }
  });
}

function toggleMobileSection(nav, navSections, navSection) {
  if (isDesktop.matches || !navSections) return;

  const isExpanded = nav.getAttribute('aria-expanded') === 'true';
  const isSectionExpanded = navSection.getAttribute('aria-expanded') === 'true';

  if (isExpanded && isSectionExpanded) {
    setMobileCollapsedView(nav, navSections);
  } else {
    setMobileExpandedView(nav, navSections, navSection);
  }
}

/**
 * Toggles all nav sections (desktop)
 * @param {Element} sections The container element
 * @param {boolean|string} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;

  getTopLevelItems(sections).forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

function closeOnEscape(e) {
  if (e.code !== 'Escape') return;

  const nav = document.getElementById('nav');
  const navSections = nav?.querySelector('.nav-sections');
  if (!navSections) return;

  const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');

  if (isDesktop.matches) {
    if (navSectionExpanded) {
      toggleAllNavSections(navSections, false);
      navSectionExpanded.focus();
    }
  } else {
    setMobileCollapsedView(nav, navSections);
    nav.querySelector('button')?.focus();
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (nav.contains(e.relatedTarget)) return;

  const navSections = nav.querySelector('.nav-sections');
  if (!navSections) return;

  const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');

  if (isDesktop.matches) {
    if (navSectionExpanded) toggleAllNavSections(navSections, false);
  } else {
    setMobileCollapsedView(nav, navSections);
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused?.classList?.contains('nav-drop');

  if (!isNavDrop || (e.code !== 'Enter' && e.code !== 'Space')) return;

  const nav = document.getElementById('nav');
  const navSections = nav?.querySelector('.nav-sections');
  if (!navSections) return;

  if (isDesktop.matches) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  } else {
    e.preventDefault();
    toggleMobileSection(nav, navSections, focused);
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles the entire nav using hamburger.
 * Desktop: unchanged.
 * Mobile: collapsed view shows only top-level items.
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  if (!navSections) return;

  if (!isDesktop.matches) {
    const currentExpanded = nav.getAttribute('aria-expanded') === 'true';
    const nextExpanded = forceExpanded !== null ? forceExpanded : !currentExpanded;

    document.body.style.overflowY = nextExpanded ? 'hidden' : '';
    const button = nav.querySelector('.nav-hamburger button');
    if (button) {
      button.setAttribute('aria-label', nextExpanded ? 'Close navigation' : 'Open navigation');
    }

    if (nextExpanded) {
      // If hamburger opens without a selected section, just show top level
      nav.setAttribute('aria-expanded', 'true');
      navSections.style.display = 'block';
      navSections.style.visibility = 'visible';
      navSections.style.padding = '2rem 0';
    } else {
      setMobileCollapsedView(nav, navSections);
    }

    window.addEventListener('keydown', closeOnEscape);
    nav.addEventListener('focusout', closeOnFocusLost);
    return;
  }

  // Desktop behavior (existing)
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');

  document.body.style.overflowY = '';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  toggleAllNavSections(navSections, expanded ? 'false' : 'true');

  if (button) {
    button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  }

  const navDrops = navSections.querySelectorAll('.nav-drop');
  navDrops.forEach((drop) => {
    if (!drop.hasAttribute('tabindex')) {
      drop.setAttribute('tabindex', 0);
      drop.addEventListener('focus', focusNavSection);
    }
  });

  window.addEventListener('keydown', closeOnEscape);
  nav.addEventListener('focusout', closeOnFocusLost);
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';

  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand?.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
    brandLink.setAttribute('aria-label', 'Home');
  }

  const navSections = nav.querySelector('.nav-sections');

  if (navSections) {
    getTopLevelItems(navSections).forEach((navSection) => {
      const submenu = navSection.querySelector(':scope > ul');
      const topLink = navSection.querySelector(':scope > a');

      if (submenu) {
        navSection.classList.add('nav-drop');
      }

      // Click behavior
      navSection.addEventListener('click', (e) => {
        if (isDesktop.matches) {
          const expanded = navSection.getAttribute('aria-expanded') === 'true';
          toggleAllNavSections(navSections);
          navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          return;
        }

        // Mobile/tablet:
        // If this item has a submenu, treat it as a selector instead of navigating immediately
        if (submenu) {
          e.preventDefault();
          e.stopPropagation();
          toggleMobileSection(nav, navSections, navSection);
        }
      });

      // Also intercept the direct anchor click for mobile dropdown selectors
      if (topLink && submenu) {
        topLink.addEventListener('click', (e) => {
          if (!isDesktop.matches) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileSection(nav, navSections, navSection);
          }
        });
      }
    });
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `
    <button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>
  `;
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  nav.prepend(hamburger);

  nav.setAttribute('aria-expanded', 'false');

  // Initial responsive state
  if (isDesktop.matches) {
    toggleMenu(nav, navSections, isDesktop.matches);
  } else {
    setMobileCollapsedView(nav, navSections);
  }

  // Prevent broken behavior on resize
  isDesktop.addEventListener('change', () => {
    if (isDesktop.matches) {
      // reset inline styles used for mobile collapsed/expanded mode
      if (navSections) {
        navSections.style.display = '';
        navSections.style.visibility = '';
        navSections.style.alignSelf = '';
        navSections.style.padding = '';

        getTopLevelItems(navSections).forEach((item) => {
          const submenu = item.querySelector(':scope > ul');
          if (submenu) submenu.style.display = '';
        });
      }

      toggleMenu(nav, navSections, true);
    } else {
      setMobileCollapsedView(nav, navSections);
    }
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
