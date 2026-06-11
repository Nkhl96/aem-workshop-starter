/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
function createElement(tag, {
  classes = [], attrs = {}, html = '', text = '',
} = {}) {
  const el = document.createElement(tag);
  if (classes.length) el.className = classes.join(' ');
  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      el.setAttribute(key, String(value));
    }
  });
  if (html) el.innerHTML = html;
  if (text) el.textContent = text;
  return el;
}

function toBoolean(value, defaultValue = false) {
  if (value === undefined || value === null || value === '') return defaultValue;
  if (typeof value === 'boolean') return value;
  return ['true', '1', 'yes', 'y', 'on'].includes(String(value).trim().toLowerCase());
}

function toNumber(value, defaultValue) {
  const num = Number(value);
  return Number.isFinite(num) ? num : defaultValue;
}

function stripHtml(value = '') {
  const tmp = document.createElement('div');
  tmp.innerHTML = value;
  return tmp.textContent || tmp.innerText || '';
}

function containsHtml(value = '') {
  return /<[a-z][\s\S]*>/i.test(value);
}

function debounce(fn, delay = 100) {
  let timer = null;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}

function getDirectChildren(node) {
  return Array.from(node.children || []);
}

function safeJsonParse(value, fallback = null) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return fallback;
  }
}

function parseConfigRow(text) {
  const normalized = text.replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, '');
  const parts = normalized.split(':');
  if (parts.length < 2) return null;
  const key = parts.shift().trim();
  const value = parts.join(':').trim();
  if (!key) return null;
  return { key, value };
}

function normalizeMedia(rawMedia) {
  if (!rawMedia) return null;
  if (typeof rawMedia === 'string') {
    const path = rawMedia.trim();
    if (!path) return null;
    const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(path);
    return {
      type: isVideo ? 'video' : 'image',
      src: path,
      alt: '',
      poster: '',
      titleHtml: '',
    };
  }

  return {
    type: rawMedia.type === 'video' ? 'video' : 'image',
    src: rawMedia.src || rawMedia.path || rawMedia.url || '',
    alt: rawMedia.alt || rawMedia.title || '',
    poster: rawMedia.poster || '',
    titleHtml: rawMedia.titleHtml || rawMedia.title || '',
  };
}

function normalizeSlide(rawSlide = {}, index = 0) {
  const media = normalizeMedia(rawSlide.media || rawSlide.mediaProps || rawSlide.asset || rawSlide.image || rawSlide.video || rawSlide.src);
  return {
    id: rawSlide.id || `slide-${index + 1}`,
    eyebrow: rawSlide.eyebrow || rawSlide.subTitle || rawSlide.subtitle || '',
    heading: rawSlide.heading || rawSlide.title || rawSlide.headline || '',
    heading2: rawSlide.heading2 || rawSlide.title2 || '',
    body: rawSlide.body || rawSlide.description || rawSlide.copy || '',
    ctaText: rawSlide.ctaText || rawSlide.linkText || '',
    ctaHref: rawSlide.ctaHref || rawSlide.link || rawSlide.href || '',
    infoHtml: rawSlide.infoHtml || rawSlide.mediaProps?.title || rawSlide.mediaTitle || '',
    media,
  };
}

function parseJsonConfig(block) {
  const script = block.querySelector('script[type="application/json"]');
  if (!script) return null;
  const data = safeJsonParse(script.textContent, null);
  if (!data) return null;

  const slides = Array.isArray(data.slides) ? data.slides.map(normalizeSlide) : [];
  return {
    title: data.title || '',
    title2: data.title2 || '',
    subtitle: data.subtitle || data.subTitle || '',
    icon: data.icon || '',
    autoplay: toNumber(data.autoplay, 5000),
    heightRatio: toNumber(data.heightRatio ?? data.height, 1),
    minHeight: toNumber(data.minHeight, 420),
    color: data.color || '',
    headlineColor: data.headlineColor || '',
    textShadow: toBoolean(data.textShadow, false),
    showPlayPauseButton: toBoolean(data.showPlayPauseButton, true),
    showContentTile: toBoolean(data.showContentTile, Boolean(data.contentTileHtml)),
    contentTileHtml: data.contentTileHtml || data.contentTile || '',
    contentTileHeight: toNumber(data.contentTileHeight, 0),
    breadcrumbItems: Array.isArray(data.breadcrumbItems) ? data.breadcrumbItems : [],
    slides,
  };
}

function parseDomConfig(block) {
  const rows = getDirectChildren(block);
  const config = {
    title: block.dataset.title || '',
    title2: block.dataset.title2 || '',
    subtitle: block.dataset.subtitle || '',
    icon: block.dataset.icon || '',
    autoplay: toNumber(block.dataset.autoplay, 5000),
    heightRatio: toNumber(block.dataset.heightRatio || block.dataset.height, 1),
    minHeight: toNumber(block.dataset.minHeight, 420),
    color: block.dataset.color || '',
    headlineColor: block.dataset.headlineColor || '',
    textShadow: toBoolean(block.dataset.textShadow, false),
    showPlayPauseButton: toBoolean(block.dataset.showPlayPauseButton, true),
    showContentTile: false,
    contentTileHtml: '',
    contentTileHeight: toNumber(block.dataset.contentTileHeight, 0),
    breadcrumbItems: [],
    slides: [],
  };

  const explicitSlides = rows.filter((row) => row.classList.contains('hero-banner-slide') || row.dataset.slide !== undefined);
  if (explicitSlides.length) {
    config.slides = explicitSlides.map((row, index) => parseSlideRow(row, index));
  } else {
    rows.forEach((row) => {
      const rowText = row.textContent.trim();
      const rowHtml = row.innerHTML.trim();
      const parsed = parseConfigRow(rowText);
      if (parsed) {
        const key = parsed.key.toLowerCase();
        const { value } = parsed;
        if (key === 'title') config.title = value;
        else if (key === 'title2') config.title2 = value;
        else if (key === 'subtitle' || key === 'subTitle'.toLowerCase()) config.subtitle = value;
        else if (key === 'icon') config.icon = value;
        else if (key === 'autoplay') config.autoplay = toNumber(value, config.autoplay);
        else if (key === 'height' || key === 'heightratio') config.heightRatio = toNumber(value, config.heightRatio);
        else if (key === 'minheight') config.minHeight = toNumber(value, config.minHeight);
        else if (key === 'color') config.color = value;
        else if (key === 'headlinecolor') config.headlineColor = value;
        else if (key === 'textshadow') config.textShadow = toBoolean(value, config.textShadow);
        else if (key === 'showplaypausebutton') config.showPlayPauseButton = toBoolean(value, config.showPlayPauseButton);
        else if (key === 'contenttile') {
          config.contentTileHtml = value;
          config.showContentTile = true;
        } else if (key === 'contenttileheight') config.contentTileHeight = toNumber(value, config.contentTileHeight);
        else if (key === 'breadcrumbs') {
          config.breadcrumbItems = value.split('|').map((item) => {
            const [label, href] = item.split(',').map((part) => part.trim());
            return { label, href: href || '' };
          }).filter((item) => item.label);
        }
      }
    });

    config.slides = rows.filter((row) => row.querySelector('picture, img, video, a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]')).map((row, index) => parseSlideRow(row, index));
  }

  return config;
}

function parseSlideRow(row, index = 0) {
  const columns = getDirectChildren(row);
  const mediaCol = columns.find((col) => col.querySelector('picture, img, video')) || columns[0] || row;
  const contentCol = columns.find((col) => col !== mediaCol) || row;

  const picture = mediaCol.querySelector('picture');
  const image = mediaCol.querySelector('img');
  const video = mediaCol.querySelector('video');
  const videoLink = mediaCol.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]');

  let media = null;
  if (video) {
    media = {
      type: 'video',
      src: video.currentSrc || video.src || '',
      poster: video.poster || '',
      alt: video.getAttribute('aria-label') || '',
      titleHtml: row.dataset.info || '',
    };
  } else if (videoLink) {
    media = {
      type: 'video',
      src: videoLink.href,
      poster: row.dataset.poster || '',
      alt: videoLink.textContent.trim(),
      titleHtml: row.dataset.info || '',
    };
  } else if (picture || image) {
    media = {
      type: 'image',
      src: image ? (image.currentSrc || image.src || '') : '',
      alt: image?.alt || '',
      poster: '',
      titleHtml: row.dataset.info || '',
    };
  }

  const subtitleNode = contentCol.querySelector('[data-subtitle], h5, h6, .subtitle, .eyebrow');
  const titleNode = contentCol.querySelector('[data-title], h1, h2, h3, h4, .title, .heading');
  const title2Node = titleNode?.nextElementSibling?.matches('h1, h2, h3, h4, .title, .heading') ? titleNode.nextElementSibling : contentCol.querySelector('[data-title2], .title-2');
  const bodyNode = contentCol.querySelector('p, .body, [data-body]');
  const linkNode = contentCol.querySelector('a[href]');

  return normalizeSlide({
    id: row.id || `slide-${index + 1}`,
    subtitle: row.dataset.subtitle || subtitleNode?.textContent?.trim() || '',
    title: row.dataset.title || titleNode?.textContent?.trim() || '',
    title2: row.dataset.title2 || title2Node?.textContent?.trim() || '',
    body: row.dataset.body || bodyNode?.innerHTML?.trim() || '',
    ctaText: row.dataset.ctaText || linkNode?.textContent?.trim() || '',
    ctaHref: row.dataset.ctaHref || linkNode?.href || '',
    infoHtml: row.dataset.infoHtml || row.dataset.info || media?.titleHtml || '',
    media,
  }, index);
}

class HeroBannerModal {
  constructor(onClose) {
    this.onClose = onClose;
    this.root = null;
    this.content = null;
    this.previouslyFocused = null;
  }

  build() {
    if (this.root) return this.root;

    this.root = createElement('div', {
      classes: ['hero-banner__modal'],
      attrs: {
        hidden: 'hidden',
        'aria-hidden': 'true',
      },
    });

    const dialog = createElement('div', {
      classes: ['hero-banner__dialog'],
      attrs: {
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': 'Additional information',
      },
    });

    const close = createElement('button', {
      classes: ['hero-banner__dialog-close'],
      attrs: { type: 'button', 'aria-label': 'Close additional information' },
      text: '×',
    });

    this.content = createElement('div', { classes: ['hero-banner__dialog-body'] });
    close.addEventListener('click', () => this.close());
    this.root.addEventListener('click', (event) => {
      if (event.target === this.root) this.close();
    });

    dialog.append(close, this.content);
    this.root.append(dialog);
    document.body.append(this.root);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen()) this.close();
    });

    return this.root;
  }

  open(html) {
    this.build();
    this.previouslyFocused = document.activeElement;
    this.content.innerHTML = html;
    this.root.removeAttribute('hidden');
    this.root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('hero-banner-modal-open');
    const closeButton = this.root.querySelector('.hero-banner__dialog-close');
    if (closeButton) closeButton.focus();
  }

  close() {
    if (!this.root) return;
    this.root.setAttribute('hidden', 'hidden');
    this.root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('hero-banner-modal-open');
    if (typeof this.onClose === 'function') this.onClose();
    if (this.previouslyFocused && this.previouslyFocused.focus) {
      this.previouslyFocused.focus();
    }
  }

  isOpen() {
    return Boolean(this.root) && !this.root.hasAttribute('hidden');
  }
}

class HeroBannerSlideView {
  constructor(slide, index) {
    this.slide = slide;
    this.index = index;
    this.element = null;
    this.video = null;
  }

  build() {
    if (this.element) return this.element;

    const article = createElement('article', {
      classes: ['hero-banner__slide'],
      attrs: {
        'data-slide-index': this.index,
        'aria-hidden': this.index === 0 ? 'false' : 'true',
      },
    });

    const mediaWrap = createElement('div', { classes: ['hero-banner__media'] });

    if (this.slide.media?.type === 'video' && this.slide.media.src) {
      const video = createElement('video', {
        classes: ['hero-banner__video'],
        attrs: {
          muted: 'muted',
          playsinline: 'playsinline',
          preload: 'metadata',
          loop: 'loop',
          'aria-label': this.slide.media.alt || this.slide.heading || `Hero banner slide ${this.index + 1}`,
        },
      });
      if (this.slide.media.poster) video.poster = this.slide.media.poster;
      const source = createElement('source', { attrs: { src: this.slide.media.src } });
      video.append(source);
      mediaWrap.append(video);
      this.video = video;
    } else if (this.slide.media?.src) {
      const picture = createElement('picture', { classes: ['hero-banner__picture'] });
      const img = createElement('img', {
        classes: ['hero-banner__image'],
        attrs: {
          src: this.slide.media.src,
          alt: this.slide.media.alt || this.slide.heading || `Hero banner slide ${this.index + 1}`,
          loading: this.index === 0 ? 'eager' : 'lazy',
        },
      });
      picture.append(img);
      mediaWrap.append(picture);
    } else {
      mediaWrap.append(createElement('div', { classes: ['hero-banner__placeholder'] }));
    }

    article.append(mediaWrap);
    this.element = article;
    return article;
  }

  activate() {
    if (!this.element) return;
    this.element.classList.add('is-active');
    this.element.setAttribute('aria-hidden', 'false');
    if (this.video) {
      this.video.currentTime = 0;
      this.video.play().catch(() => { });
    }
  }

  deactivate() {
    if (!this.element) return;
    this.element.classList.remove('is-active');
    this.element.setAttribute('aria-hidden', 'true');
    if (this.video) this.video.pause();
  }

  getDuration(fallbackMs) {
    if (!this.video) return fallbackMs;
    const durationSec = this.video.duration;
    if (Number.isFinite(durationSec) && durationSec > 0) {
      return Math.round(durationSec * 1000);
    }
    return fallbackMs;
  }
}

class HeroBannerBlock {
  constructor(block) {
    this.block = block;
    this.config = parseJsonConfig(block) || parseDomConfig(block);
    this.currentIndex = 0;
    this.progress = 0.001;
    this.paused = false;
    this.interval = null;
    this.progressInterval = null;
    this.slides = [];
    this.modal = new HeroBannerModal(() => this.resume());
    this.playPauseButton = null;
    this.infoButton = null;
    this.liveRegion = null;
    this.overlayTitle = null;
    this.overlaySubtitle = null;
    this.overlayTitle2 = null;
    this.slideStage = null;
    this.contentTile = null;
    this.actions = null;
    this.resizeHandler = debounce(() => this.applyHeight(), 100);
  }

  init() {
    this.config.slides = (this.config.slides || []).filter((slide) => slide && slide.media && slide.media.src);
    if (!this.config.slides.length) {
      this.block.innerHTML = '';
      this.block.classList.add('hero-banner', 'hero-banner--empty');
      return;
    }

    this.render();
    this.bind();
    this.goTo(0, { silent: true });
    const firstDuration = this.getActiveSlideDuration();
    const shouldAutoplay = (this.slides.length > 1 || this.hasVideoSlides()) && this.config.showPlayPauseButton;
    if (shouldAutoplay) {
      this.start(firstDuration);
    } else {
      this.pause(true);
    }
  }

  render() {
    this.block.innerHTML = '';
    this.block.classList.add('hero-banner');

    const root = createElement('section', {
      classes: ['hero-banner__root'],
      attrs: {
        id: 'hero-banner-slider',
        'aria-label': 'Hero banner slider',
        tabindex: '0',
      },
    });

    const carouselWrapper = createElement('div', { classes: ['hero-banner__carousel-wrapper'] });
    this.slideStage = createElement('div', {
      classes: ['hero-banner__stage'],
      attrs: { role: 'region', 'aria-roledescription': 'carousel', 'aria-label': 'Hero banner slides' },
    });

    this.slides = this.config.slides.map((slide, index) => {
      const view = new HeroBannerSlideView(slide, index);
      this.slideStage.append(view.build());
      return view;
    });

    const overlay = createElement('div', { classes: ['hero-banner__overlay'] });
    const gradient = createElement('div', { classes: ['hero-banner__gradient'] });
    const content = createElement('div', {
      classes: ['hero-banner__content', this.hasBannerTitle() ? '' : 'hero-banner__content--no-title'].filter(Boolean),
    });

    if (this.config.icon) {
      const iconWrap = createElement('span', { classes: ['hero-banner__icon'] });
      const iconImage = createElement('img', {
        classes: ['hero-banner__icon-image'],
        attrs: { src: this.config.icon, alt: '', loading: 'eager' },
      });
      iconWrap.append(iconImage);
      content.append(iconWrap);
    }

    const headingWrap = createElement('div', { classes: ['hero-banner__heading-group'] });
    this.overlaySubtitle = createElement('span', {
      classes: ['hero-banner__subtitle', this.config.textShadow ? 'hero-banner__text-shadow' : ''].filter(Boolean),
      text: this.config.subtitle,
    });
    this.overlayTitle = createElement('span', {
      classes: ['hero-banner__title', this.config.textShadow ? 'hero-banner__text-shadow' : ''].filter(Boolean),
      text: this.config.title,
    });
    this.overlayTitle2 = createElement('span', {
      classes: ['hero-banner__title', this.config.textShadow ? 'hero-banner__text-shadow' : ''].filter(Boolean),
      text: this.config.title2,
    });

    if (this.config.subtitle) headingWrap.append(this.overlaySubtitle);
    if (this.config.title) headingWrap.append(this.overlayTitle);
    if (this.config.title2) headingWrap.append(this.overlayTitle2);
    if (headingWrap.children.length) content.append(headingWrap);

    this.actions = createElement('ul', { classes: ['hero-banner__action-list'] });
    gradient.append(content, this.actions);
    overlay.append(gradient);

    this.liveRegion = createElement('div', {
      classes: ['hero-banner__sr-only'],
      attrs: { 'aria-live': 'polite', 'aria-atomic': 'true' },
    });

    carouselWrapper.append(this.slideStage, overlay, this.liveRegion);

    if (this.config.showContentTile && this.config.contentTileHtml) {
      const bottomGradient = createElement('div', { classes: ['hero-banner__bottom-gradient'] });
      carouselWrapper.append(bottomGradient);
    }

    root.append(carouselWrapper);

    const breadcrumbNode = this.buildBreadcrumbs();
    if (this.config.showContentTile && this.config.contentTileHtml) {
      const panel = createElement('div', {
        classes: ['hero-banner__panel', breadcrumbNode ? 'hero-banner__panel--with-breadcrumbs' : ''].filter(Boolean),
      });
      if (breadcrumbNode) panel.append(breadcrumbNode);
      this.contentTile = createElement('div', { classes: ['hero-banner__content-tile'], html: this.config.contentTileHtml });
      if (this.config.contentTileHeight > 0) {
        this.contentTile.style.minHeight = `${this.config.contentTileHeight}px`;
        this.contentTile.classList.add('hero-banner__content-tile--clamped');
      }
      panel.append(this.contentTile);
      root.append(panel);
    } else if (breadcrumbNode) {
      root.append(breadcrumbNode);
    }

    this.block.append(root);
    this.buildActions();
    this.applyTheme();
    this.applyHeight();
  }

  bind() {
    this.block.addEventListener('mouseenter', () => this.pause(true));
    this.block.addEventListener('mouseleave', () => {
      if (!this.modal.isOpen()) this.resume();
    });

    this.block.addEventListener('focusin', () => this.pause(true));
    this.block.addEventListener('focusout', () => {
      window.requestAnimationFrame(() => {
        if (!this.block.contains(document.activeElement) && !this.modal.isOpen()) this.resume();
      });
    });

    this.block.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.next();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.prev();
      }
      if (event.key === ' ' && this.playPauseButton) {
        if (event.target === this.playPauseButton) {
          event.preventDefault();
          this.togglePause();
        }
      }
    });

    window.addEventListener('resize', this.resizeHandler);
  }

  destroy() {
    window.removeEventListener('resize', this.resizeHandler);
    this.clearTimers();
  }

  applyTheme() {
    if (this.config.color) {
      this.block.style.setProperty('--hero-banner-foreground', this.config.color);
    }
    if (this.config.headlineColor) {
      this.block.style.setProperty('--hero-banner-headline-color', this.config.headlineColor);
    }
  }

  applyHeight() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const computed = Math.max(this.config.minHeight || 0, Math.round(viewportHeight * this.config.heightRatio));
    this.block.style.setProperty('--hero-banner-height', `${computed}px`);
  }

  hasBannerTitle() {
    return Boolean((this.config.title || '').trim());
  }

  hasVideoSlides() {
    return this.slides.some((slide) => Boolean(slide.video));
  }

  buildBreadcrumbs() {
    if (!this.config.breadcrumbItems || !this.config.breadcrumbItems.length) return null;
    const nav = createElement('nav', { classes: ['hero-banner__breadcrumbs'], attrs: { 'aria-label': 'Breadcrumb' } });
    const list = createElement('ol', { classes: ['hero-banner__breadcrumb-list'] });

    this.config.breadcrumbItems.forEach((item, index) => {
      const li = createElement('li', { classes: ['hero-banner__breadcrumb-item'] });
      if (item.href && index !== this.config.breadcrumbItems.length - 1) {
        const link = createElement('a', { classes: ['hero-banner__breadcrumb-link'], attrs: { href: item.href }, text: item.label });
        li.append(link);
      } else {
        li.append(createElement('span', { classes: ['hero-banner__breadcrumb-current'], text: item.label }));
      }
      list.append(li);
    });

    nav.append(list);
    return nav;
  }

  buildActions() {
    this.actions.innerHTML = '';

    const activeSlide = this.config.slides[this.currentIndex];
    const showInfo = containsHtml(activeSlide?.infoHtml || '');
    const showPlayback = this.config.showPlayPauseButton && (this.slides.length > 1 || this.hasVideoSlides());

    if (showInfo) {
      const item = this.buildActionItem('7px');
      this.infoButton = createElement('button', {
        classes: ['hero-banner__icon-button'],
        attrs: { type: 'button', 'aria-label': 'More information' },
      });
      this.infoButton.append(this.buildInfoIcon());
      this.infoButton.addEventListener('click', () => {
        this.pause(true);
        this.modal.open(activeSlide.infoHtml);
      });
      item.append(this.infoButton);
      this.actions.append(item);
    }

    if (showPlayback) {
      const item = this.buildActionItem('7px');
      this.playPauseButton = createElement('button', {
        classes: ['hero-banner__icon-button', 'hero-banner__play-pause'],
        attrs: {
          type: 'button',
          'aria-label': this.paused ? 'Play hero banner' : 'Pause hero banner',
        },
      });
      this.playPauseButton.addEventListener('click', () => this.togglePause());
      this.playPauseButton.append(this.buildPlayPauseIcon());
      item.append(this.playPauseButton);
      this.actions.append(item);
      this.updateProgressRing();
    } else {
      this.playPauseButton = null;
    }
  }

  buildActionItem(padding = '7px') {
    const li = this.createElement('li', { classes: ['hero-banner__action-item'] });
    li.style.padding = padding;
    return li;
  }

  buildInfoIcon() {
    const svg = this.createElement('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 30 30', width: '30', height: '30', 'aria-hidden': 'true', focusable: 'false',
      },
    });
    svg.innerHTML = '<circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="15" cy="9" r="1.5" fill="currentColor"></circle><path d="M14 13h2v8h-2z" fill="currentColor"></path>';
    return svg;
  }

  buildPlayPauseIcon() {
    const svg = createElement('svg', {
      attrs: {
        xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 30 30', width: '30', height: '30', 'aria-hidden': 'true', focusable: 'false',
      },
    });

    const ringClass = this.paused ? 'hero-banner__progress-ring is-paused' : 'hero-banner__progress-ring';
    const symbol = this.paused
      ? '<path class="hero-banner__play-icon" d="M11.5 10.8v8.5c0 .3.2.6.5.7s.6.1.9-.1l5.4-4.2c.4-.3.4-.9 0-1.2l-5.4-4.2c-.2-.2-.6-.2-.9-.1-.3 0-.5.3-.5.6z" fill="currentColor"></path>'
      : '<path class="hero-banner__pause-icon" d="M13 9c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V10c0-.6.4-1 1-1h1zm5 0c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V10c0-.6.4-1 1-1h1z" fill="currentColor"></path>';

    svg.innerHTML = `
      ${symbol}
      <circle class="hero-banner__progress-ring-bg" cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2" opacity=".2" transform="rotate(-90, 15, 15)"></circle>
      <circle class="${ringClass}" cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-90, 15, 15)"></circle>
    `;

    return svg;
  }

  updateProgressRing() {
    if (!this.playPauseButton) return;
    const ring = this.playPauseButton.querySelector('.hero-banner__progress-ring');
    if (!ring) return;
    ring.style.strokeDashoffset = String(300 - (90 / 100) * this.progress);
  }

  clearTimers() {
    window.clearInterval(this.interval);
    window.clearInterval(this.progressInterval);
    this.interval = null;
    this.progressInterval = null;
  }

  start(duration) {
    this.clearTimers();
    this.paused = false;
    this.updatePlayPauseUi();

    const total = Math.max(1000, duration || this.config.autoplay || 5000);
    this.progress = 0.001;
    this.updateProgressRing();

    this.progressInterval = window.setInterval(() => {
      if (this.paused) return;
      this.progress = Math.min(100, this.progress + 1);
      this.updateProgressRing();
    }, total / 100);

    this.interval = window.setTimeout(() => {
      if (!this.paused) this.next();
    }, total);
  }

  pause(soft = false) {
    this.paused = true;
    if (!soft) this.clearTimers();
    this.slides[this.currentIndex]?.video?.pause();
    this.updatePlayPauseUi();
  }

  resume() {
    const showPlayback = this.config.showPlayPauseButton && (this.slides.length > 1 || this.hasVideoSlides());
    if (!showPlayback) return;
    const activeSlide = this.slides[this.currentIndex];
    if (activeSlide?.video) {
      activeSlide.video.play().catch(() => { });
    }
    this.start(this.getActiveSlideDuration());
  }

  togglePause() {
    if (this.paused) this.resume();
    else this.pause();
  }

  updatePlayPauseUi() {
    if (!this.playPauseButton) return;
    this.playPauseButton.setAttribute('aria-label', this.paused ? 'Play hero banner' : 'Pause hero banner');
    this.playPauseButton.innerHTML = '';
    this.playPauseButton.append(this.buildPlayPauseIcon());
    this.updateProgressRing();
  }

  getActiveSlideDuration() {
    const activeSlide = this.slides[this.currentIndex];
    return activeSlide ? activeSlide.getDuration(this.config.autoplay) : this.config.autoplay;
  }

  announce() {
    const active = this.config.slides[this.currentIndex];
    const text = [active?.eyebrow, active?.heading, active?.heading2].filter(Boolean).join(' ')
      || `Slide ${this.currentIndex + 1} of ${this.slides.length}`;
    if (this.liveRegion) this.liveRegion.textContent = text;
  }

  updateSlideText() {
    const active = this.config.slides[this.currentIndex];
    const useSlideSubtitle = active?.eyebrow || this.config.subtitle;
    const useSlideTitle = active?.heading || this.config.title;
    const useSlideTitle2 = active?.heading2 || this.config.title2;

    if (this.overlaySubtitle) {
      this.overlaySubtitle.textContent = useSlideSubtitle || '';
      this.overlaySubtitle.hidden = !useSlideSubtitle;
    }
    if (this.overlayTitle) {
      this.overlayTitle.textContent = useSlideTitle || '';
      this.overlayTitle.hidden = !useSlideTitle;
    }
    if (this.overlayTitle2) {
      this.overlayTitle2.textContent = useSlideTitle2 || '';
      this.overlayTitle2.hidden = !useSlideTitle2;
    }
  }

  goTo(index, { silent = false } = {}) {
    if (!this.slides.length) return;
    const bounded = (index + this.slides.length) % this.slides.length;

    this.slides.forEach((slide, slideIndex) => {
      if (slideIndex === bounded) slide.activate();
      else slide.deactivate();
    });

    this.currentIndex = bounded;
    this.updateSlideText();
    this.buildActions();
    this.announce();

    if (!silent && !this.paused) {
      this.start(this.getActiveSlideDuration());
    }
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }
}

export default function decorate(block) {
  const heroBanner = new HeroBannerBlock(block);
  heroBanner.init();
}
