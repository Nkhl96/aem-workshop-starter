export default class HeaderMenu2 extends HTMLElement {
  constructor() {
    super();

    // Authorable properties (safe fallbacks overridden by EDS block data)
    this.enableV2 = true;
    this.variation = 'transparent';
    this.teqLogo = {
      src: '',
      alt: null,
      link: null,
      quality: 0.0,
    };
    this.teqLogoWhite = {
      src: '',
      alt: null,
      link: null,
      quality: 0.0,
    };
    this.searchResultsPage = '';
    this.backText = 'Back';
    this.cancelText = 'Cancel';
    this.suggestedText = 'Suggested';
    this.suggestText = this.suggestedText;
    this.popularSearchesText = 'Popular search topics';
    this.searchForText = 'Search For';
    this.menuItems = [];
    this.popularSearchTerms = [];
    this.bookmarksLink = { href: '#' };

    // Internal runtime defaults (required for the component to render)
    this.headerHeight = 80;
    this.maxItemsToShow = 5;

    this.state = {
      homeUrl: '/',
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

    // Scroll throttle
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
    const focusedElement = this.document.activeElement;
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
    const bodyDOM = this.document.querySelector('#page');
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
    preloadedNav.innerHTML = HeaderMenu2.getNestedNavItemsHTML(this.menuItems || []);
    this.appendChild(preloadedNav);

    // Create header inner wrapper
    const headerInnerWrapper = document.createElement('div');
    headerInnerWrapper.className = 'header-inner-wrapper';// Create logo
    const logoDiv = document.createElement('div');
    logoDiv.className = `logo ${logoClass}`;

    const logoAsset = this.state.isTransparentVariation ? this.teqLogoWhite : this.teqLogo;
    const logoLink = document.createElement('a');
    logoLink.href = logoAsset?.link?.href || this.state.homeUrl;
    logoLink.setAttribute('aria-label', logoAsset?.alt || 'Home');

    if (logoAsset?.src) {
      const logoImage = document.createElement('img');
      logoImage.className = 'teq-logo';
      logoImage.src = logoAsset.src;
      logoImage.alt = logoAsset.alt || 'TEQ logo';
      logoImage.width = 145;
      logoImage.height = 40;
      logoImage.decoding = 'async';
      logoLink.appendChild(logoImage);
    } else {
      const logoSvg = document.createElement('svg');
      logoSvg.className = 'teq-logo';
      logoSvg.setAttribute('width', '145');
      logoSvg.setAttribute('height', '40');
      logoLink.appendChild(logoSvg);
    }

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

        const isActiveDialog = this.state.activeIndex === index && this.state.isMenuOpen;

        if (isActiveDialog) {
          dialog.setAttribute('open', '');
        } else {
          dialog.removeAttribute('open');
        }

        dialog.addEventListener('click', (e) => this.handleCloseModalClick(e));

        const innerWrapper = document.createElement('div');
        innerWrapper.className = 'header-menu-inner-wrapper';
        HeaderMenu2.renderDesktopMenuContent(item, index, innerWrapper);
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
      searchComponent.backText = this.backText;
      searchComponent.cancelText = this.cancelText;
      searchComponent.suggestText = this.suggestText || this.suggestedText;
      searchComponent.suggestedText = this.suggestText || this.suggestedText;
      searchComponent.popularSearchesText = this.popularSearchesText;
      searchComponent.searchForText = this.searchForText;
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
  static escapeHTML(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  static getNestedNavItemsHTML(items) {
    if (!Array.isArray(items) || items.length === 0) return '';

    const renderLinkItem = (title, href) => {
      const safeTitle = HeaderMenu2.escapeHTML(title);
      const safeHref = HeaderMenu2.escapeHTML(href || '#');
      return `<li><p><a href="${safeHref}">${safeTitle}</a></p></li>`;
    };

    const renderImageGrid = (imageGrid) => {
      if (!imageGrid?.grid?.length) return '';

      const safeTitle = HeaderMenu2.escapeHTML(imageGrid.gridTitle);
      const cards = imageGrid.grid.map((entry) => {
        const safeImage = HeaderMenu2.escapeHTML(entry.image || '');
        const safeImageTitle = HeaderMenu2.escapeHTML(entry.imageTitle || '');
        const safeImageLink = HeaderMenu2.escapeHTML(entry.imageLink || '#');
        const safeDescription = HeaderMenu2.escapeHTML(entry.imageDescription || '');

        const imageMarkup = safeImage
          ? `<p><a href="${safeImageLink}"><img src="${safeImage}" alt="${safeImageTitle}" /></a></p>`
          : '';
        const titleMarkup = `<p><a href="${safeImageLink}">${safeImageTitle}</a></p>`;
        const descriptionMarkup = safeDescription ? `<p>${safeDescription}</p>` : '';

        return `<li>${imageMarkup}${titleMarkup}${descriptionMarkup}</li>`;
      }).join('');

      return `<li><p><strong>${safeTitle}</strong></p><ul>${cards}</ul></li>`;
    };

    const renderSection = (heading, children) => {
      const safeHeading = HeaderMenu2.escapeHTML(heading);
      const childItems = (children || []).map((child) => renderLinkItem(child.title, child.link?.href)).join('');
      return `<li><p><strong>${safeHeading}</strong></p><ul>${childItems}</ul></li>`;
    };

    const topLevelItems = items.map((item) => {
      const safeTitle = HeaderMenu2.escapeHTML(item.title);
      const nestedItems = [];

      const imageGridMarkup = renderImageGrid(item.imageGrid);
      if (imageGridMarkup) nestedItems.push(imageGridMarkup);

      (item.children || []).forEach((child) => {
        if (child.children?.length) {
          nestedItems.push(renderSection(child.title, child.children));
        } else {
          nestedItems.push(renderLinkItem(child.title, child.link?.href));
        }
      });

      return `<li><p>${safeTitle}</p><ul>${nestedItems.join('')}</ul></li>`;
    }).join('');

    return `<ul>${topLevelItems}</ul>`;
  }

  /**
   * Render desktop menu content
   */
  static renderDesktopMenuContent(item, index, container) {
    const imageGrid = item.imageGrid?.grid?.length ? item.imageGrid : null;

    if (!imageGrid && !item.children) return;

    if (imageGrid) {
      const imageCol = document.createElement('div');
      imageCol.className = 'col image-grid-col';

      const heading = document.createElement('h4');
      heading.id = `desktop-menu-title-${index}-image-grid`;
      heading.className = 'desktop-menu-title';
      heading.textContent = imageGrid.gridTitle;
      imageCol.appendChild(heading);

      const cardList = document.createElement('ul');
      cardList.className = 'desktop-menu-image-grid';

      imageGrid.grid.forEach((gridItem, gridIndex) => {
        const li = document.createElement('li');
        li.className = 'desktop-menu-image-card';

        const link = document.createElement('a');
        link.href = gridItem.imageLink || '#';
        link.className = 'desktop-menu-image-link';
        link.setAttribute('aria-label', gridItem.imageTitle || imageGrid.gridTitle || `Image ${gridIndex + 1}`);

        if (gridItem.image) {
          const image = document.createElement('img');
          image.src = gridItem.image;
          image.alt = gridItem.imageTitle || '';
          image.className = 'desktop-menu-image';
          link.appendChild(image);
        }

        const title = document.createElement('span');
        title.className = 'desktop-menu-image-title';
        title.textContent = gridItem.imageTitle || '';
        link.appendChild(title);

        li.appendChild(link);

        if (gridItem.imageDescription) {
          const description = document.createElement('p');
          description.className = 'desktop-menu-image-description';
          description.textContent = gridItem.imageDescription;
          li.appendChild(description);
        }

        cardList.appendChild(li);
      });

      imageCol.appendChild(cardList);
      container.appendChild(imageCol);
    }

    (item.children || []).forEach((child, childIndex) => {
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
    if (item.imageGrid?.grid?.length) {
      const imageWrapper = document.createElement('div');

      const imageHeading = document.createElement('h4');
      imageHeading.className = 'mobile-accordion-menu-heading';
      imageHeading.textContent = item.imageGrid.gridTitle;
      imageWrapper.appendChild(imageHeading);

      const imageList = document.createElement('ul');
      imageList.className = 'item-list mobile-image-grid';

      item.imageGrid.grid.forEach((gridItem) => {
        const li = document.createElement('li');
        li.className = 'mobile-image-grid-item';

        const link = document.createElement('a');
        link.href = gridItem.imageLink || '#';
        link.className = 'mobile-image-grid-link';
        link.setAttribute('aria-label', gridItem.imageTitle || item.imageGrid.gridTitle);

        if (gridItem.image) {
          const image = document.createElement('img');
          image.src = gridItem.image;
          image.alt = gridItem.imageTitle || '';
          image.className = 'mobile-image-grid-image';
          link.appendChild(image);
        }

        const title = document.createElement('span');
        title.className = 'mobile-image-grid-title';
        title.textContent = gridItem.imageTitle || '';
        link.appendChild(title);

        li.appendChild(link);

        if (gridItem.imageDescription) {
          const description = document.createElement('p');
          description.className = 'mobile-image-grid-description';
          description.textContent = gridItem.imageDescription;
          li.appendChild(description);
        }

        imageList.appendChild(li);
      });

      imageWrapper.appendChild(imageList);
      container.appendChild(imageWrapper);
    }

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
