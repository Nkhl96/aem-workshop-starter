/* eslint-disable class-methods-use-this */
// import mockMenuItems from './mock-menu-items';
// import mockSearchTerms from './mock-search-terms';
// import mockBookmarks from './mock-bookmarks';

import { readBlockConfig } from '../../scripts/aem.js';

/**
 * HeaderMenu2 - Adobe EDS Vanilla JS Component
 * Manages desktop and mobile navigation, search, bookmarks, and accessibility
 */
export class HeaderMenu2 extends HTMLElement {
  constructor() {
    super();
    this.variation = 'transparent';
    this.menuItems = [
      {
        title: 'Products',
        children: [
          {
            title: 'By Category',
            children: [
              { title: 'Cloud Services', link: { href: '/products/cloud' } },
              { title: 'Analytics', link: { href: '/products/analytics' } },
              { title: 'Commerce', link: { href: '/products/commerce' } },
              { title: 'Experience Manager', link: { href: '/products/aem' } },
              { title: 'Marketing Automation', link: { href: '/products/marketing' } },
            ],
          },
          {
            title: 'All Products',
            children: [
              { title: 'View All Products', link: { href: '/all-products' } },
            ],
          },
        ],
      },
      {
        title: 'Solutions',
        children: [
          {
            title: 'Business Solutions',
            children: [
              { title: 'Digital Marketing', link: { href: '/solutions/marketing' } },
              { title: 'E-commerce', link: { href: '/solutions/ecommerce' } },
              { title: 'Customer Experience', link: { href: '/solutions/cx' } },
            ],
          },
        ],
      },
      {
        title: 'Support',
        children: [
          {
            title: 'Help & Resources',
            children: [
              { title: 'Documentation', link: { href: '/docs' } },
              { title: 'Community', link: { href: '/community' } },
              { title: 'Contact Support', link: { href: '/support' } },
            ],
          },
        ],
      },
    ];
    this.popularSearchTerms = [
      'Cloud Services',
      'Analytics',
      'Experience Manager',
      'Commerce',
      'API Documentation',
    ];
    this.searchResultsPage = '/search';
    this.bookmarksLink = { href: '/bookmarks' };
    this.headerHeight = 80;
    this.maxItemsToShow = 5;

    // State management
    this.state = {
      homeUrl: '/au/en/home',
      isScrolled: true,
      isMenuOpen: false,
      openAccordion: null,
      hoveredIndex: null,
      activeIndex: null,
      showAllIndexes: {},
      activeSearchBar: false,
      isSearchModalOpen: false,
      hasBookmarks: false,
      isMobile: false,
      isTransparentVariation: false,
    };

    // Refs
    this.accordionRefs = [];
    this.dialogRefs = [];
    this.firstItemRef = null;
    this.hamburgerRef = null;
    this.mobileSearchTriggerRef = null;
    this.lastDesktopTriggerRef = null;
    this.wasMenuOpenRef = false;

    // Throttle for scroll
    this.scrollTimeout = null;
  }

  connectedCallback() {
    this.initializeComponent();
    this.render();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  initializeComponent() {
    this.setupScrollListener();
    this.setupKeyboardListeners();
    this.setupMediaQueryListener();
    this.updateBodySpacing();
  }

  cleanup() {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
    if (this.keydownHandler) window.removeEventListener('keydown', this.keydownHandler);
    if (this.mediaQueryListener) this.mediaQuery?.removeListener(this.mediaQueryListener);
  }

  /**
   * Setup scroll listener with throttling
   */
  setupScrollListener() {
    this.scrollHandler = () => {
      if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        const scrollTopPosition = document.documentElement.scrollTop;
        const newIsScrolled = scrollTopPosition <= this.headerHeight;
        if (this.state.isScrolled !== newIsScrolled) {
          this.state.isScrolled = newIsScrolled;
          this.updateTransparentVariation();
          this.render();
        }
      }, 300);
    };

    window.addEventListener('scroll', this.scrollHandler);
  }

  /**
   * Setup keyboard listeners for navigation
   */
  setupKeyboardListeners() {
    this.keydownHandler = (event) => {
      this.handleEscapePress(event);
      this.handleArrowKeys(event);
      this.handleTabKey(event);
    };

    window.addEventListener('keydown', this.keydownHandler);
  }

  /**
   * Setup media query listener for responsive behavior
   */
  setupMediaQueryListener() {
    this.mediaQuery = window.matchMedia('(max-width: 1024px)');
    this.mediaQueryListener = (e) => {
      const wasMobile = this.state.isMobile;
      this.state.isMobile = e.matches;
      if (wasMobile !== this.state.isMobile) {
        this.state.isMenuOpen = false;
        this.state.activeIndex = null;
        this.render();
      }
    };

    this.mediaQuery.addListener(this.mediaQueryListener);
    this.state.isMobile = this.mediaQuery.matches;
  }

  /**
   * Update transparent variation based on scroll and menu state
   */
  updateTransparentVariation() {
    const isTransparent = !this.state.isMenuOpen && ['transparent', 'fully-transparent'].includes(this.variation) && this.state.isScrolled;
    this.state.isTransparentVariation = isTransparent;
  }

  /**
   * Update body spacing for fixed header
   */
  updateBodySpacing() {
    if (this.variation === 'white') {
      // const header = this.shadowRoot?.querySelector('header') || this;
      const spacing = this.headerHeight + 16; // 16px gap
      document.body.style.paddingTop = `${spacing}px`;
    }
  }

  /**
   * Handle scroll escape key
   */
  handleEscapePress(event) {
    if (event.key === 'Escape') {
      this.state.isMenuOpen = false;
      this.state.activeIndex = null;
      this.render();
    }
  }

  /**
   * Handle arrow key navigation
   */
  handleArrowKeys(event) {
    const focusedElement = document.activeElement;
    const columnElement = focusedElement?.closest('.col');

    if (columnElement) {
      const columns = document.querySelectorAll('.col');
      const columnIndex = Array.from(columns).indexOf(columnElement);

      if (event.key === 'ArrowLeft' && columnIndex > 0) {
        const previousColumn = columns[columnIndex - 1];
        const firstFocusable = previousColumn?.querySelector(
          'a, button, [tabindex]:not([tabindex="-1"]), [contenteditable]',
        );
        firstFocusable?.focus();
      }

      if (event.key === 'ArrowRight' && columnIndex >= 0 && columnIndex < columns.length - 1) {
        const nextColumn = columns[columnIndex + 1];
        const firstFocusable = nextColumn?.querySelector(
          'a, button, [tabindex]:not([tabindex="-1"]), [contenteditable]',
        );
        firstFocusable?.focus();
      }
    }
  }

  /**
   * Handle tab key for focus trap (mobile)
   */
  handleTabKey(event) {
    if (event.key !== 'Tab' || !this.state.isMenuOpen || this.state.isSearchModalOpen || !this.state.isMobile) {
      return;
    }

    const menuEl = document.getElementById('mobile-header-menu');
    if (!menuEl) return;

    const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])';
    const elements = Array.from(menuEl.querySelectorAll(selector))
      .filter((el) => el.offsetParent !== null);

    if (this.hamburgerRef) {
      elements.unshift(this.hamburgerRef);
    }

    if (elements.length === 0) return;

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /**
   * Handle navigation click
   */
  handleNavClick(index, event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.activeIndex === index && this.state.isMenuOpen) {
      this.state.isMenuOpen = false;
      this.state.activeIndex = null;
    } else {
      this.lastDesktopTriggerRef = event.currentTarget;
      this.state.isMenuOpen = true;
      this.state.activeIndex = index;
      this.handleLinkClick(event, '', this.menuItems?.[index]?.title, '');
    }

    this.updateTransparentVariation();
    this.render();
  }

  /**
   * Handle link click for analytics
   */
  handleLinkClick(event, label, mainHeading, subHeading) {
    const eventLabel = label ? label.toLowerCase() : null;
    const eventMainHeading = mainHeading ? `main_heading|${mainHeading}`.toLowerCase() : null;
    const eventSubHeading = subHeading ? `sub_heading|${subHeading}`.toLowerCase() : null;

    const navigationEventData = {
      label: eventLabel,
      mainHeading: eventMainHeading,
      subHeading: eventSubHeading,
    };

    this.dispatchEvent(new CustomEvent('navigation', {
      detail: navigationEventData,
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Handle nav link click
   */
  handleNavLinkClick(event, label, mainHeading, subHeading) {
    event.stopPropagation();
    this.handleLinkClick(event, label, mainHeading, subHeading);
  }

  /**
   * Handle close modal click
   */
  handleCloseModalClick(event) {
    event.preventDefault();
    this.state.isMenuOpen = false;
    this.state.activeIndex = null;
    this.render();
  }

  /**
   * Handle hamburger menu click
   */
  handleHamburgerClick() {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    this.state.activeSearchBar = false;
    if (!this.state.isMenuOpen) {
      this.state.openAccordion = null;
    }
    this.updateTransparentVariation();
    this.render();
  }

  /**
   * Handle mobile search click
   */
  handleMobileSearchClick() {
    this.state.isMenuOpen = !this.state.isMenuOpen;
    this.state.activeSearchBar = true;
    this.render();
  }

  /**
   * Handle accordion click
   */
  handleAccordionClick(index) {
    if (this.state.openAccordion !== index) {
      this.handleLinkClick(null, '', this.menuItems?.[index]?.title, '');
    }
    this.state.openAccordion = this.state.openAccordion === index ? null : index;
    this.render();
  }

  /**
   * Handle mouse enter on menu item
   */
  handleMouseEnter(parentIndex, childIndex) {
    this.state.hoveredIndex = `${parentIndex}-${childIndex}`;
    this.render();
  }

  /**
   * Handle mouse leave on menu item
   */
  handleMouseLeave() {
    this.state.hoveredIndex = null;
    this.render();
  }

  /**
   * Toggle show all items
   */
  toggleShowAll(childIndex, mainHeading) {
    this.state.showAllIndexes[childIndex] = !this.state.showAllIndexes[childIndex];
    if (!this.state.showAllIndexes[childIndex]) {
      this.handleLinkClick(null, '', mainHeading, 'show_all');
    }
    this.render();
  }

  /**
   * Update page z-index to prevent overlap with popups
   */
  updatePageZIndex(flag) {
    const bodyDOM = document.querySelector('#page');
    if (!bodyDOM) return;

    if (flag === true) {
      bodyDOM.style.position = 'relative';
      bodyDOM.style.zIndex = '1000';
    } else {
      bodyDOM.style.position = 'static';
      bodyDOM.style.zIndex = '1';
    }
  }

  /**
   * Render the component
   */
  render() {
    // Clear existing content
    this.innerHTML = '';

    const logoClass = this.state.isTransparentVariation ? 'logo-white' : 'logo-teal';
    const navLinkClass = this.state.isTransparentVariation ? 'color-white' : 'color-charcoal';

    // Set data attributes
    this.setAttribute('role', 'banner');
    this.setAttribute('id', 'header-menu2');
    this.setAttribute('data-variation', this.variation);
    this.setAttribute('data-scrolled', this.state.isScrolled);
    this.setAttribute('data-menu-open', this.state.isMenuOpen);

    // Create preloaded nav
    const preloadedNav = document.createElement('nav');
    preloadedNav.className = 'preloaded-nav-links';
    preloadedNav.setAttribute('aria-label', 'Main navigation');
    preloadedNav.innerHTML = this.getNestedNavItemsHTML(this.menuItems || []);
    this.appendChild(preloadedNav);

    // Create header inner wrapper
    const headerInnerWrapper = document.createElement('div');
    headerInnerWrapper.className = 'header-inner-wrapper';

    // Create logo
    const logoDiv = document.createElement('div');
    logoDiv.className = `logo ${logoClass}`;
    const logoLink = document.createElement('a');
    logoLink.href = this.state.homeUrl;
    logoLink.setAttribute('aria-label', 'Home');
    const logoSvg = document.createElement('svg');
    logoSvg.className = 'teq-logo';
    logoSvg.setAttribute('width', '145');
    logoSvg.setAttribute('height', '40');
    logoLink.appendChild(logoSvg);
    logoDiv.appendChild(logoLink);
    headerInnerWrapper.appendChild(logoDiv);

    // Create navigation wrapper
    const navigationWrapper = document.createElement('div');
    navigationWrapper.className = 'navigation-wrapper';

    // Add desktop nav links if not mobile
    if (!this.state.isMobile) {
      const navList = document.createElement('ul');
      navList.className = 'nav-links';
      navList.setAttribute('role', 'menubar');

      (this.menuItems || []).forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'nav-link-item';
        li.setAttribute('role', 'none');

        const button = document.createElement('button');
        button.className = `nav-link ${navLinkClass} ${this.state.activeIndex === index ? 'is-active' : ''}`;
        button.setAttribute('aria-controls', `menu-item-${index}`);
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('aria-expanded', (this.state.activeIndex === index && this.state.isMenuOpen).toString());
        button.setAttribute('role', 'menuitem');
        button.textContent = item.title;
        button.addEventListener('click', (e) => this.handleNavClick(index, e));

        li.appendChild(button);

        const dialog = document.createElement('dialog');
        dialog.className = 'header-menu-modal';
        dialog.setAttribute('id', `menu-item-${index}`);
        dialog.setAttribute('aria-label', `${item.title} navigation`);
        dialog.setAttribute('aria-labelledby', `desktop-menu-title-${index}-0`);
        dialog.addEventListener('click', (e) => this.handleCloseModalClick(e));

        const innerWrapper = document.createElement('div');
        innerWrapper.className = 'header-menu-inner-wrapper';
        this.renderDesktopMenuContent(item, index, innerWrapper);
        dialog.appendChild(innerWrapper);

        li.appendChild(dialog);
        navList.appendChild(li);
      });

      navigationWrapper.appendChild(navList);
    }

    // Create icon group
    const iconGroup = document.createElement('div');
    iconGroup.className = 'icon-group';

    // Add bookmarks link if desktop and bookmarksLink exists
    if (!this.state.isMobile && this.bookmarksLink) {
      const bookmarkLink = document.createElement('a');
      bookmarkLink.setAttribute('aria-label', this.state.hasBookmarks ? 'Bookmarked items' : 'No bookmarks');
      bookmarkLink.className = this.state.hasBookmarks ? 'heart-icon-checked' : 'heart-icon-unchecked';
      bookmarkLink.href = this.bookmarksLink.href || '#';
      const bookmarkSvg = document.createElement('svg');
      bookmarkSvg.setAttribute('width', '24');
      bookmarkSvg.setAttribute('height', '24');
      bookmarkLink.appendChild(bookmarkSvg);
      iconGroup.appendChild(bookmarkLink);
    }

    // Add search wrapper if desktop
    if (!this.state.isMobile) {
      const searchWrapper = document.createElement('div');
      searchWrapper.className = `search-wrapper ${this.state.isTransparentVariation ? 'icon-white' : 'icon-charcoal'}`;
      const searchComponent = document.createElement('search-component');
      searchComponent.id = 'nav-search';
      searchComponent.popularSearchTerms = this.popularSearchTerms;
      searchComponent.searchResultsPage = this.searchResultsPage;
      searchWrapper.appendChild(searchComponent);
      iconGroup.appendChild(searchWrapper);
    }

    // Add mobile controls
    if (this.state.isMobile) {
      if (!this.state.isMenuOpen) {
        const mobileSearchBtn = document.createElement('button');
        mobileSearchBtn.className = 'mobile-search-trigger';
        const mobileSvg = document.createElement('svg');
        mobileSvg.setAttribute('width', '24');
        mobileSvg.setAttribute('height', '24');
        mobileSearchBtn.appendChild(mobileSvg);
        mobileSearchBtn.addEventListener('click', () => this.handleMobileSearchClick());
        iconGroup.appendChild(mobileSearchBtn);
      }

      const hamburgerBtn = document.createElement('button');
      hamburgerBtn.className = 'hamburger-menu';
      hamburgerBtn.setAttribute('aria-label', 'Toggle menu');
      hamburgerBtn.setAttribute('aria-expanded', this.state.isMenuOpen.toString());
      const hamburgerSpan = document.createElement('span');
      hamburgerBtn.appendChild(hamburgerSpan);
      hamburgerBtn.addEventListener('click', () => this.handleHamburgerClick());
      this.hamburgerRef = hamburgerBtn;
      iconGroup.appendChild(hamburgerBtn);
    }

    navigationWrapper.appendChild(iconGroup);
    headerInnerWrapper.appendChild(navigationWrapper);
    this.appendChild(headerInnerWrapper);

    // Add mobile menu dialog
    if (this.state.isMobile && this.state.isMenuOpen) {
      const dialog = document.createElement('dialog');
      dialog.id = 'mobile-header-menu';
      dialog.className = 'mobile-header-menu-modal';
      dialog.setAttribute('open', '');
      dialog.setAttribute('aria-label', 'Main navigation');
      dialog.setAttribute('aria-modal', 'true');
      dialog.setAttribute('role', 'dialog');

      const innerWrapper = document.createElement('div');
      innerWrapper.className = 'mobile-header-menu-inner-wrapper';

      const searchWrapper = document.createElement('div');
      searchWrapper.className = 'mobile-search-wrapper';
      const mobileSearch = document.createElement('mobile-search');
      mobileSearch.id = 'mobile-search';
      mobileSearch.popularSearchTerms = this.popularSearchTerms;
      mobileSearch.searchResultsPage = this.searchResultsPage;
      searchWrapper.appendChild(mobileSearch);
      innerWrapper.appendChild(searchWrapper);

      // Add accordions for menu items
      (this.menuItems || []).forEach((item, index) => {
        const accordion = document.createElement('div');
        accordion.className = 'accordion';

        const heading = document.createElement('h3');
        heading.className = `accordion-heading ${this.state.openAccordion === index ? 'is-expanded' : ''}`;
        heading.textContent = item.title;
        const svg = document.createElement('svg');
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        heading.appendChild(svg);
        heading.addEventListener('click', () => this.handleAccordionClick(index));

        accordion.appendChild(heading);

        if (this.state.openAccordion === index) {
          const content = document.createElement('div');
          content.className = 'accordion-content';
          this.renderMobileMenuContent(item, index, content);
          accordion.appendChild(content);
        }

        innerWrapper.appendChild(accordion);
      });

      // Add bookmarks if mobile
      if (this.state.isMobile && this.bookmarksLink) {
        const bookmarkDiv = document.createElement('div');
        bookmarkDiv.className = `mobile-header-menu-bookmark ${this.state.openAccordion !== null ? 'relative' : 'fixed'}`;
        const bookmarkLink = document.createElement('a');
        bookmarkLink.href = this.bookmarksLink.href || '#';
        bookmarkLink.setAttribute('aria-label', 'My Bookmarks');
        const bookmarkSvg = document.createElement('svg');
        bookmarkSvg.setAttribute('width', '24');
        bookmarkSvg.setAttribute('height', '24');
        bookmarkLink.appendChild(bookmarkSvg);
        const bookmarkText = document.createTextNode('My Bookmarks');
        bookmarkLink.appendChild(bookmarkText);
        bookmarkDiv.appendChild(bookmarkLink);
        innerWrapper.appendChild(bookmarkDiv);
      }

      dialog.appendChild(innerWrapper);
      this.appendChild(dialog);
    }
  }

  /**
   * Get nested navigation items as HTML
   */
  getNestedNavItemsHTML(items) {
    return items.map((item) => {
      let html = `<div class="navigation-wrapper" aria-label="${item.title}">`;

      // Add image grid if exists
      if (item.imageGrid?.grid?.length > 0) {
        html += `<div class="navigation-wrapper" aria-label="${item.imageGrid.gridTitle}">`;
        item.imageGrid.grid.forEach((imageGridChild) => {
          html += `<a href="${imageGridChild.imageLink}" aria-label="${imageGridChild.imageTitle}">${imageGridChild.imageTitle}</a>`;
        });
        html += '</div>';
      }

      // Add children
      if (item.children) {
        item.children.forEach((menuItemChild) => {
          if (menuItemChild.children?.length > 0) {
            html += `<div class="navigation-wrapper" aria-label="${menuItemChild.title}">`;
            menuItemChild.children.forEach((subChild) => {
              html += `<a href="${subChild.link?.href || '#'}" aria-label="${subChild.title}">${subChild.title}</a>`;
            });
            html += '</div>';
          }
        });
      }

      html += '</div>';
      return html;
    }).join('');
  }

  /**
   * Render desktop menu content
   */
  renderDesktopMenuContent(item, index, container) {
    if (!item.children) return;

    item.children.forEach((child, childIndex) => {
      if (child.children && child.children.length > 0) {
        const col = document.createElement('div');
        col.className = 'col';

        const heading = document.createElement('h4');
        heading.id = `desktop-menu-title-${index}-${childIndex}`;
        heading.className = 'desktop-menu-title';
        heading.textContent = child.title;
        col.appendChild(heading);

        const list = document.createElement('ul');
        list.className = 'desktop-menu-items';
        child.children.forEach((subChild) => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = subChild.link?.href || '#';
          link.setAttribute('aria-label', subChild.title);
          link.textContent = subChild.title;
          li.appendChild(link);
          list.appendChild(li);
        });
        col.appendChild(list);
        container.appendChild(col);
      }
    });
  }

  /**
   * Render mobile menu content
   */
  renderMobileMenuContent(item, index, container) {
    if (!item.children) return;

    item.children.forEach((child) => {
      if (child.children && child.children.length > 0) {
        const wrapper = document.createElement('div');

        const heading = document.createElement('h4');
        heading.className = 'mobile-accordion-menu-heading';
        heading.textContent = child.title;
        wrapper.appendChild(heading);

        const visibleItems = this.state.showAllIndexes[index]
          ? child.children
          : child.children.slice(0, this.maxItemsToShow);

        const list = document.createElement('ul');
        list.className = 'item-list';
        visibleItems.forEach((subChild) => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = subChild.link?.href || '#';
          link.setAttribute('aria-label', subChild.title);
          link.textContent = subChild.title;
          li.appendChild(link);
          list.appendChild(li);
        });
        wrapper.appendChild(list);

        // Add show more/less button if needed
        if (child.children.length > this.maxItemsToShow) {
          const button = document.createElement('button');
          button.className = this.state.showAllIndexes[index] ? 'mobile-show-less' : 'mobile-show-all';
          const buttonSvg = document.createElement('svg');
          buttonSvg.setAttribute('width', '16');
          buttonSvg.setAttribute('height', '16');
          const buttonSpan = document.createElement('span');
          buttonSpan.textContent = this.state.showAllIndexes[index] ? 'Show Less' : 'Show More';
          button.appendChild(buttonSvg);
          button.appendChild(buttonSpan);
          button.addEventListener('click', () => this.toggleShowAll(index, child.title));
          wrapper.appendChild(button);
        }

        container.appendChild(wrapper);
      }
    });
  }
}

/**
 * AEM EDS Decorator for auto-initialization
 */
export default async function decorate(block) {
  const component = document.createElement('header-menu2');

  // Extract component properties from block data
  const data = block.dataset;

  const config = readBlockConfig(block);

  // eslint-disable-next-line no-console
  console.log('HeaderMenu2 data attributes:', config); // Debug log to check data attributes

  // Set variation with default
  component.variation = data.variation || 'transparent';

  // Load menu items from data or use mock data
  if (data.menuItems) {
    component.menuItems = JSON.parse(data.menuItems);
  } else {
    // component.menuItems = mockMenuItems;
  }

  // Load bookmarks link from data or use mock data
  if (data.bookmarksLink) {
    component.bookmarksLink = JSON.parse(data.bookmarksLink);
  } else {
    // component.bookmarksLink = mockBookmarks;
  }

  // Set search results page with default
  component.searchResultsPage = data.searchResultsPage || '/search';

  // Load popular search terms from data or use mock data
  if (data.popularSearchTerms) {
    component.popularSearchTerms = JSON.parse(data.popularSearchTerms);
  } else {
    // component.popularSearchTerms = mockSearchTerms;
  }

  block.replaceChildren(component);

  return component;
}

customElements.define('header-menu2', HeaderMenu2);
