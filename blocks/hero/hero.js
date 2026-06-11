/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
// eslint-disable-next-line object-curly-newline
const DEFAULTS = {
  title: 'Leave a little different',
  title2: "\u003Ch2 style=\"text-align: center;\"\u003EWelcome to Queensland\u003C/h2\u003E\r\n\u003Ch3 style=\"text-align: center;\"\u003E\u003Cb\u003E\u003Ci\u003E&quot;Wunya&quot; \u003C/i\u003Eand &quot;\u003Ci\u003Esew ngapa&quot;\u003C/i\u003E\u003C/b\u003E\u003C/h3\u003E\r\n\u003Cp style=\"text-align: center;\"\u003E\u003Ci\u003EWunya (welcome, greetings) is from the Yuggera language of Brisbane and the Gubbi Gubbi language of the Sunshine Coast. Sew ngapa (welcome) is from the Kala Lagaw Ya and Kala Kawaw Ya languages of the Western Torres Straits.\u003C/i\u003E\u003C/p\u003E\r\n\u003Cp style=\"text-align: center;\"\u003EOur garden's a one-million-year-old rainforest. Out the back is a red desert of dinosaur bones. Our swimming pool? The world's largest \u003Ca href=\"#anchor\"\u003Ereef. \u003C/a\u003E\u003C/p\u003E\r\n\u003Cp style=\"text-align: center;\"\u003EHere, you’ll find experiences like nowhere else on the planet. \u003C/p\u003E\r\n\u003Cp style=\"text-align: center;\"\u003EAfter months of only dreaming about holidays, now's the time to discover Queensland's vast and beautiful backyard. To reconnect with nature, ourselves and our loved ones in places we've never explored, through experiences that make us come alive. \u003C/p\u003E\r\n\u003Cp style=\"text-align: center;\"\u003ESimply put - Queensland is Good to Go, and your \u003Ca title=\"queensland holiday deals\" href=\"https://www.queensland.com/au/en/plan-your-holiday/holiday-deals.html\" target=\"_self\"\u003Eholiday is waiting\u003C/a\u003E. \u003C/p\u003E\r\n",
  subtitle: 'Come as you are',
  icon: 'https://www.queens;and.com/content/dam/teq/consumer/global/icons/svg/Icon-Map-Queensland.svg',
  autoplay: 5000,
  heightRatio: 0.7,
  minHeight: 420,
  color: '#F83458',
  headlineColor: '#F83458',
  textShadow: false,
  showPlayPauseButton: true,
  showContentTile: false,
  contentTileHtml: '',
  contentTileHeight: 0,
  breadcrumbItems: [],
  slides: [{
    mediaType: 'damvideo',
    mediaProps: {
      fileFormat: '',
      sku: '',
      src: 'https://s7ap1.scene7.com/is/content/destqueenslandstage/teq/consumer/global/videos/homepage/2020_TEQ_Homepage_ProjectCaboodle_BoardHVT_Montages_1920x960.mp4',
      duration: 0,
      poster: {
        src: null,
      },
      mobileSrc: 'https://s7ap1.scene7.com/is/content/destqueenslandstage/teq/consumer/global/videos/homepage/2020_TEQ_Homepage_ProjectCaboodle_BoardHVT_Montages_9x16.mp4',
      title: "\u003Cp\u003EExperience Queensland's golden beaches, vibrant events, marine life, ancient rainforests, Indigenous cultures, expansive outback and the Great Barrier Reef.\u003C/p\u003E\r\n",
    },
    mediaPropsSlide: {
      slideTitle: null,
      slideSubtitle: null,
      slideIcon: {
        src: null,
        alt: null,
      },
      slideButton: {
        href: null,
        label: null,
        target: '_self',
      },
    },
  }],
};

const SUPPORTED_EDS_KEYS = new Set([
  'title',
  'title2',
  'subtitle',
  'icon',
  'autoplay',
  'height',
  'heightratio',
  'minheight',
  'color',
  'headlinecolor',
  'textshadow',
  'showplaypausebutton',
  'showcontenttile',
  'contenttile',
  'contenttileheight',
  'breadcrumbs',
]);

function el(tag, {
  // eslint-disable-next-line no-shadow
  classes = [], attrs = {}, text = '', html = '',
} = {}) {
  const node = document.createElement(tag);
  if (classes.length) node.className = classes.join(' ');
  Object.entries(attrs).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') node.setAttribute(k, String(v));
  });
  if (text) node.textContent = text;
  if (html) node.innerHTML = html;
  return node;
}

function children(node) {
  return Array.from(node.children || []);
}

function text(node) {
  return (node?.textContent || '').trim();
}

function html(node) {
  return (node?.innerHTML || '').trim();
}

function boolify(value, fallback = false) {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value === 'boolean') return value;
  return ['true', '1', 'yes', 'y', 'on'].includes(String(value).trim().toLowerCase());
}

function numberify(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function hasHtml(value = '') {
  return /<[a-z][\s\S]*>/i.test(value);
}

function debounce(fn, delay = 100) {
  let t = null;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function normalizeKey(value = '') {
  return value.trim().toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9-]/g, '');
}

function parseJson(block) {
  const script = block.querySelector('script[type="application/json"]');
  if (!script) return null;
  try {
    const data = JSON.parse(script.textContent);
    return {
      title: data.title,
      title2: data.title2,
      subtitle: data.subtitle || data.subTitle,
      icon: data.icon,
      autoplay: numberify(data.autoplay, undefined),
      heightRatio: numberify(data.heightRatio ?? data.height, undefined),
      minHeight: numberify(data.minHeight, undefined),
      color: data.color,
      headlineColor: data.headlineColor,
      textShadow: data.textShadow,
      showPlayPauseButton: data.showPlayPauseButton,
      showContentTile: data.showContentTile,
      contentTileHtml: data.contentTileHtml || data.contentTile,
      contentTileHeight: numberify(data.contentTileHeight, undefined),
      breadcrumbItems: Array.isArray(data.breadcrumbItems) ? data.breadcrumbItems : undefined,
      slides: Array.isArray(data.slides) ? data.slides.map(normalizeSlide).filter((s) => s.media?.src) : undefined,
    };
  } catch (e) {
    return null;
  }
}

function parseBreadcrumbs(value = '') {
  return value.split('|').map((item) => {
    const [label, href] = item.split(',').map((part) => part.trim());
    return { label, href: href || '' };
  }).filter((item) => item.label);
}

function getAsset(node) {
  if (!node) return '';
  const img = node.querySelector('picture img, img');
  if (img) return img.currentSrc || img.src || img.getAttribute('src') || '';
  const link = node.querySelector('a[href]');
  if (link) return link.href || link.getAttribute('href') || '';
  return text(node);
}

function resolveMedia(raw) {
  if (!raw) return null;
  if (typeof raw === 'string') {
    const src = raw.trim();
    if (!src) return null;
    return {
      type: /\.(mp4|webm|ogg)(\?.*)?$/i.test(src) ? 'video' : 'image', src, alt: '', poster: '',
    };
  }
  return {
    type: raw.type === 'video' ? 'video' : 'image',
    src: raw.src || raw.path || raw.url || '',
    alt: raw.alt || raw.title || '',
    poster: raw.poster || '',
  };
}

function normalizeSlide(raw = {}, index = 0) {
  return {
    id: raw.id || `slide-${index + 1}`,
    eyebrow: raw.eyebrow || raw.subtitle || raw.subTitle || '',
    heading: raw.heading || raw.title || raw.headline || '',
    heading2: raw.heading2 || raw.title2 || '',
    body: raw.body || raw.description || raw.copy || '',
    ctaText: raw.ctaText || raw.linkText || '',
    ctaHref: raw.ctaHref || raw.href || raw.link || '',
    infoHtml: raw.infoHtml || raw.mediaProps?.title || raw.mediaTitle || '',
    media: resolveMedia(raw.media || raw.mediaProps || raw.asset || raw.image || raw.video || raw.src),
  };
}

function isEdsKvRow(row) {
  const cols = children(row);
  return cols.length >= 2 && SUPPORTED_EDS_KEYS.has(normalizeKey(text(cols[0])));
}

function applyKv(config, key, valueCell) {
  const t = text(valueCell);
  const h = html(valueCell);
  if (key === 'title') config.title = t;
  else if (key === 'title2') config.title2 = t;
  else if (key === 'subtitle') config.subtitle = t;
  else if (key === 'icon') config.icon = getAsset(valueCell);
  else if (key === 'autoplay') config.autoplay = numberify(t, config.autoplay);
  else if (key === 'height' || key === 'heightratio') config.heightRatio = Math.max(0.2, numberify(t, config.heightRatio));
  else if (key === 'minheight') config.minHeight = numberify(t, config.minHeight);
  else if (key === 'color') config.color = t;
  else if (key === 'headlinecolor') config.headlineColor = t;
  else if (key === 'textshadow') config.textShadow = boolify(t, config.textShadow);
  else if (key === 'showplaypausebutton') config.showPlayPauseButton = boolify(t, config.showPlayPauseButton);
  else if (key === 'showcontenttile') config.showContentTile = boolify(t, config.showContentTile);
  else if (key === 'contenttile') { config.contentTileHtml = h; config.showContentTile = true; } else if (key === 'contenttileheight') config.contentTileHeight = numberify(t, config.contentTileHeight);
  else if (key === 'breadcrumbs') config.breadcrumbItems = parseBreadcrumbs(t);
}

function parseColonRow(row, config) {
  const raw = text(row);
  const parts = raw.split(':');
  if (parts.length < 2) return false;
  const key = normalizeKey(parts.shift());
  const value = parts.join(':').trim();
  if (!SUPPORTED_EDS_KEYS.has(key)) return false;
  if (key === 'title') config.title = value;
  else if (key === 'title2') config.title2 = value;
  else if (key === 'subtitle') config.subtitle = value;
  else if (key === 'icon') config.icon = value;
  else if (key === 'autoplay') config.autoplay = numberify(value, config.autoplay);
  else if (key === 'height' || key === 'heightratio') config.heightRatio = Math.max(0.2, numberify(value, config.heightRatio));
  else if (key === 'minheight') config.minHeight = numberify(value, config.minHeight);
  else if (key === 'color') config.color = value;
  else if (key === 'headlinecolor') config.headlineColor = value;
  else if (key === 'textshadow') config.textShadow = boolify(value, config.textShadow);
  else if (key === 'showplaypausebutton') config.showPlayPauseButton = boolify(value, config.showPlayPauseButton);
  else if (key === 'showcontenttile') config.showContentTile = boolify(value, config.showContentTile);
  else if (key === 'contenttile') { config.contentTileHtml = value; config.showContentTile = true; } else if (key === 'contenttileheight') config.contentTileHeight = numberify(value, config.contentTileHeight);
  else if (key === 'breadcrumbs') config.breadcrumbItems = parseBreadcrumbs(value);
  return true;
}

function parseSlideRow(row, index) {
  const cols = children(row);
  const mediaCol = cols.find((c) => c.querySelector('picture, img, video, a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]')) || cols[0] || row;
  const contentCol = cols.find((c) => c !== mediaCol) || row;
  const image = mediaCol.querySelector('picture img, img');
  const video = mediaCol.querySelector('video');
  const videoLink = mediaCol.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]');
  let media = null;
  if (video) {
    media = {
      type: 'video', src: video.currentSrc || video.src || '', alt: video.getAttribute('aria-label') || '', poster: video.poster || '',
    };
  } else if (videoLink) {
    media = {
      type: 'video', src: videoLink.href, alt: videoLink.textContent.trim(), poster: row.dataset.poster || '',
    };
  } else if (image) {
    media = {
      type: 'image', src: image.currentSrc || image.src || '', alt: image.alt || '', poster: '',
    };
  }

  return normalizeSlide({
    id: row.id || `slide-${index + 1}`,
    subtitle: row.dataset.subtitle || text(contentCol.querySelector('[data-subtitle], h5, h6, .subtitle, .eyebrow')),
    title: row.dataset.title || text(contentCol.querySelector('[data-title], h1, h2, h3, h4, .title, .heading')),
    title2: row.dataset.title2 || text(contentCol.querySelector('[data-title2], .title-2')),
    body: row.dataset.body || html(contentCol.querySelector('[data-body], p')),
    ctaText: row.dataset.ctaText || text(contentCol.querySelector('a[href]')),
    ctaHref: row.dataset.ctaHref || contentCol.querySelector('a[href]')?.href || '',
    infoHtml: row.dataset.infoHtml || row.dataset.info || '',
    media,
  }, index);
}

function parseDom(block) {
  const rows = children(block);
  const config = {
    title: block.dataset.title,
    title2: block.dataset.title2,
    subtitle: block.dataset.subtitle,
    icon: block.dataset.icon,
    autoplay: numberify(block.dataset.autoplay, undefined),
    heightRatio: numberify(block.dataset.heightRatio || block.dataset.height, undefined),
    minHeight: numberify(block.dataset.minHeight, undefined),
    color: block.dataset.color,
    headlineColor: block.dataset.headlineColor,
    textShadow: block.dataset.textShadow,
    showPlayPauseButton: block.dataset.showPlayPauseButton,
    showContentTile: block.dataset.showContentTile,
    contentTileHtml: block.dataset.contentTileHtml,
    contentTileHeight: numberify(block.dataset.contentTileHeight, undefined),
    breadcrumbItems: undefined,
    slides: undefined,
  };

  const consumed = new Set();
  rows.forEach((row) => {
    if (isEdsKvRow(row)) {
      const cols = children(row);
      applyKv(config, normalizeKey(text(cols[0])), cols[1]);
      consumed.add(row);
    }
  });

  rows.forEach((row) => {
    if (consumed.has(row)) return;
    if (parseColonRow(row, config)) consumed.add(row);
  });

  config.slides = rows
    .filter((row) => !consumed.has(row))
    .filter((row) => row.querySelector('picture, img, video, a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]'))
    .map((row, index) => parseSlideRow(row, index))
    .filter((slide) => slide.media?.src);

  return config;
}

class Modal {
  constructor(onClose) {
    this.onClose = onClose;
    this.root = null;
    this.body = null;
    this.focused = null;
    this.keydown = (e) => { if (e.key === 'Escape' && this.isOpen()) this.close(); };
  }

  build() {
    if (this.root) return this.root;
    this.root = el('div', { classes: ['hero-banner-modal'], attrs: { hidden: 'hidden', 'aria-hidden': 'true' } });
    const dialog = el('div', { classes: ['hero-banner-dialog'], attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Additional information' } });
    const close = el('button', { classes: ['hero-banner-dialog-close'], attrs: { type: 'button', 'aria-label': 'Close additional information' }, text: '×' });
    this.body = el('div', { classes: ['hero-banner-dialog-body'] });
    close.addEventListener('click', () => this.close());
    this.root.addEventListener('click', (e) => { if (e.target === this.root) this.close(); });
    dialog.append(close, this.body);
    this.root.append(dialog);
    document.body.append(this.root);
    document.addEventListener('keydown', this.keydown);
    return this.root;
  }

  open(markup) {
    this.build();
    this.focused = document.activeElement;
    this.body.innerHTML = markup;
    this.root.removeAttribute('hidden');
    this.root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('hero-banner-modal-open');
    this.root.querySelector('.hero-banner-dialog-close')?.focus();
  }

  close() {
    if (!this.root) return;
    this.root.setAttribute('hidden', 'hidden');
    this.root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('hero-banner-modal-open');
    if (typeof this.onClose === 'function') this.onClose();
    this.focused?.focus?.();
  }

  isOpen() { return !!this.root && !this.root.hasAttribute('hidden'); }
}

class SlideView {
  constructor(slide, index) {
    this.slide = slide;
    this.index = index;
    this.node = null;
    this.video = null;
  }

  build() {
    if (this.node) return this.node;
    this.node = el('article', { classes: ['hero-banner-slide'], attrs: { 'data-slide-index': this.index, 'aria-hidden': this.index === 0 ? 'false' : 'true' } });
    const media = el('div', { classes: ['hero-banner-media'] });
    if (this.slide.media?.type === 'video' && this.slide.media.src) {
      const video = el('video', {
        classes: ['hero-banner-video'],
        attrs: {
          muted: 'muted', playsinline: 'playsinline', preload: 'metadata', loop: 'loop', 'aria-label': this.slide.media.alt || this.slide.heading || `Hero banner slide ${this.index + 1}`,
        },
      });
      if (this.slide.media.poster) video.poster = this.slide.media.poster;
      video.append(el('source', { attrs: { src: this.slide.media.src } }));
      media.append(video);
      this.video = video;
    } else if (this.slide.media?.src) {
      const picture = el('picture', { classes: ['hero-banner-picture'] });
      picture.append(el('img', { classes: ['hero-banner-image'], attrs: { src: this.slide.media.src, alt: this.slide.media.alt || this.slide.heading || `Hero banner slide ${this.index + 1}`, loading: this.index === 0 ? 'eager' : 'lazy' } }));
      media.append(picture);
    } else {
      media.append(el('div', { classes: ['hero-banner-placeholder'] }));
    }
    this.node.append(media);
    return this.node;
  }

  activate() {
    if (!this.node) return;
    this.node.classList.add('is-active');
    this.node.setAttribute('aria-hidden', 'false');
    if (this.video) { this.video.currentTime = 0; this.video.play().catch(() => {}); }
  }

  deactivate() {
    if (!this.node) return;
    this.node.classList.remove('is-active');
    this.node.setAttribute('aria-hidden', 'true');
    this.video?.pause();
  }

  duration(fallback) {
    if (this.video && Number.isFinite(this.video.duration) && this.video.duration > 0) return Math.round(this.video.duration * 1000);
    return fallback;
  }
}

class HeroBannerBlock {
  constructor(block) {
    this.block = block;
    this.defaults = { ...DEFAULTS };
    // const parsed = parseJson(block) || parseDom(block) || {};
    this.config = {
      ...this.defaults,
      // ...parsed,
      // heightRatio: Math.max(0.2, numberify(parsed.heightRatio, this.defaults.heightRatio)),
      // autoplay: numberify(parsed.autoplay, this.defaults.autoplay),
      // minHeight: numberify(parsed.minHeight, this.defaults.minHeight),
      // contentTileHeight: numberify(parsed.contentTileHeight, this.defaults.contentTileHeight),
      // textShadow: boolify(parsed.textShadow, this.defaults.textShadow),
      // showPlayPauseButton: boolify(parsed.showPlayPauseButton, this.defaults.showPlayPauseButton),
      // showContentTile: boolify(parsed.showContentTile, this.defaults.showContentTile),
      // breadcrumbItems: Array.isArray(parsed.breadcrumbItems) ? parsed.breadcrumbItems : [...this.defaults.breadcrumbItems],
      // slides: Array.isArray(parsed.slides) ? parsed.slides : [...this.defaults.slides],
    };

    this.index = 0;
    this.progress = 0.001;
    this.paused = false;
    this.advanceTimer = null;
    this.progressTimer = null;
    this.slides = [];
    this.playPauseButton = null;
    this.actions = null;
    this.liveRegion = null;
    this.overlaySubtitle = null;
    this.overlayTitle = null;
    this.overlayTitle2 = null;
    this.modal = new Modal(() => this.resume());
    this.onResize = debounce(() => this.applyHeight(), 100);
  }

  init() {
    this.config.slides = this.config.slides.filter((slide) => slide.media?.src);
    if (!this.config.slides.length) {
      this.block.innerHTML = '';
      this.block.classList.add('hero-banner', 'hero-banner-empty');
      return;
    }
    this.render();
    this.bind();
    this.goTo(0, { silent: true });
    if (this.canPlay()) this.start(this.activeDuration());
    else this.pause(true);
  }

  canPlay() {
    return this.config.showPlayPauseButton && (this.slides.length > 1 || this.slides.some((slide) => !!slide.video));
  }

  render() {
    this.block.innerHTML = '';
    this.block.classList.add('hero-banner');
    const root = el('section', { classes: ['hero-banner-root'], attrs: { id: 'hero-banner-slider', 'aria-label': 'Hero banner slider', tabindex: '0' } });
    const wrapper = el('div', { classes: ['hero-banner-carousel-wrapper'] });
    const stage = el('div', { classes: ['hero-banner-stage'], attrs: { role: 'region', 'aria-roledescription': 'carousel', 'aria-label': 'Hero banner slides' } });
    this.slides = this.config.slides.map((slide, i) => { const v = new SlideView(slide, i); stage.append(v.build()); return v; });

    const overlay = el('div', { classes: ['hero-banner-overlay'] });
    const gradient = el('div', { classes: ['hero-banner-gradient'] });
    const content = el('div', { classes: ['hero-banner-content', !this.config.title ? 'hero-banner-content-no-title' : ''].filter(Boolean) });

    if (this.config.icon) {
      const icon = el('span', { classes: ['hero-banner-icon'] });
      icon.append(el('img', { classes: ['hero-banner-icon-image'], attrs: { src: this.config.icon, alt: '', loading: 'eager' } }));
      content.append(icon);
    }

    const group = el('div', { classes: ['hero-banner-heading-group'] });
    this.overlaySubtitle = el('span', { classes: ['hero-banner-subtitle', this.config.textShadow ? 'hero-banner-text-shadow' : ''].filter(Boolean), text: this.config.subtitle });
    this.overlayTitle = el('span', { classes: ['hero-banner-title', this.config.textShadow ? 'hero-banner-text-shadow' : ''].filter(Boolean), text: this.config.title });
    this.overlayTitle2 = el('span', { classes: ['hero-banner-title', this.config.textShadow ? 'hero-banner-text-shadow' : ''].filter(Boolean), text: this.config.title2 });
    if (this.config.subtitle) group.append(this.overlaySubtitle);
    if (this.config.title) group.append(this.overlayTitle);
    if (this.config.title2) group.append(this.overlayTitle2);
    if (group.children.length) content.append(group);

    this.actions = el('ul', { classes: ['hero-banner-action-list'] });
    gradient.append(content, this.actions);
    overlay.append(gradient);

    this.liveRegion = el('div', { classes: ['hero-banner-sr-only'], attrs: { 'aria-live': 'polite', 'aria-atomic': 'true' } });
    wrapper.append(stage, overlay, this.liveRegion);
    if (this.config.showContentTile && this.config.contentTileHtml) wrapper.append(el('div', { classes: ['hero-banner-bottom-gradient'] }));
    root.append(wrapper);

    const breadcrumbs = this.renderBreadcrumbs();
    if (this.config.showContentTile && this.config.contentTileHtml) {
      const panel = el('div', { classes: ['hero-banner-panel', breadcrumbs ? 'hero-banner-panel-with-breadcrumbs' : ''].filter(Boolean) });
      if (breadcrumbs) panel.append(breadcrumbs);
      const tile = el('div', { classes: ['hero-banner-content-tile', this.config.contentTileHeight > 0 ? 'hero-banner-content-tile-clamped' : ''].filter(Boolean), html: this.config.contentTileHtml });
      if (this.config.contentTileHeight > 0) tile.style.minHeight = `${this.config.contentTileHeight}px`;
      panel.append(tile);
      root.append(panel);
    } else if (breadcrumbs) {
      root.append(breadcrumbs);
    }

    this.block.append(root);
    this.buildActions();
    this.applyTheme();
    this.applyHeight();
  }

  renderBreadcrumbs() {
    if (!this.config.breadcrumbItems.length) return null;
    const nav = el('nav', { classes: ['hero-banner-breadcrumbs'], attrs: { 'aria-label': 'Breadcrumb' } });
    const list = el('ol', { classes: ['hero-banner-breadcrumb-list'] });
    this.config.breadcrumbItems.forEach((item, idx) => {
      const li = el('li', { classes: ['hero-banner-breadcrumb-item'] });
      if (item.href && idx !== this.config.breadcrumbItems.length - 1) li.append(el('a', { classes: ['hero-banner-breadcrumb-link'], attrs: { href: item.href }, text: item.label }));
      else li.append(el('span', { classes: ['hero-banner-breadcrumb-current'], text: item.label }));
      list.append(li);
    });
    nav.append(list);
    return nav;
  }

  bind() {
    this.block.addEventListener('mouseenter', () => this.pause(true));
    this.block.addEventListener('mouseleave', () => { if (!this.modal.isOpen()) this.resume(); });
    this.block.addEventListener('focusin', () => this.pause(true));
    this.block.addEventListener('focusout', () => requestAnimationFrame(() => { if (!this.block.contains(document.activeElement) && !this.modal.isOpen()) this.resume(); }));
    this.block.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
      if (e.key === ' ' && e.target === this.playPauseButton) { e.preventDefault(); this.toggle(); }
    });
    window.addEventListener('resize', this.onResize);
  }

  applyTheme() {
    if (this.config.color) this.block.style.setProperty('--hero-banner-foreground', this.config.color);
    if (this.config.headlineColor) this.block.style.setProperty('--hero-banner-headline-color', this.config.headlineColor);
  }

  applyHeight() {
    const vh = window.innerHeight || document.documentElement.clientHeight || 0;
    const px = Math.max(this.config.minHeight, Math.round(vh * this.config.heightRatio));
    this.block.style.setProperty('--hero-banner-height', `${px}px`);
  }

  buildActions() {
    this.actions.innerHTML = '';
    const active = this.config.slides[this.index];

    if (hasHtml(active?.infoHtml || '')) {
      const item = el('li', { classes: ['hero-banner-action-item'] });
      const btn = el('button', { classes: ['hero-banner-icon-button'], attrs: { type: 'button', 'aria-label': 'More information' } });
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" aria-hidden="true" focusable="false"><circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="15" cy="9" r="1.5" fill="currentColor"></circle><path d="M14 13h2v8h-2z" fill="currentColor"></path></svg>';
      btn.addEventListener('click', () => { this.pause(true); this.modal.open(active.infoHtml); });
      item.append(btn);
      this.actions.append(item);
    }

    if (this.canPlay()) {
      const item = el('li', { classes: ['hero-banner-action-item'] });
      this.playPauseButton = el('button', { classes: ['hero-banner-icon-button', 'hero-banner-play-pause'], attrs: { type: 'button', 'aria-label': this.paused ? 'Play hero banner' : 'Pause hero banner' } });
      this.playPauseButton.addEventListener('click', () => this.toggle());
      this.renderPlayPause();
      item.append(this.playPauseButton);
      this.actions.append(item);
    } else {
      this.playPauseButton = null;
    }
  }

  renderPlayPause() {
    if (!this.playPauseButton) return;
    const symbol = this.paused
      ? '<path d="M11.5 10.8v8.5c0 .3.2.6.5.7s.6.1.9-.1l5.4-4.2c.4-.3.4-.9 0-1.2l-5.4-4.2c-.2-.2-.6-.2-.9-.1-.3 0-.5.3-.5.6z" fill="currentColor"></path>'
      : '<path d="M13 9c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V10c0-.6.4-1 1-1h1zm5 0c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V10c0-.6.4-1 1-1h1z" fill="currentColor"></path>';
    this.playPauseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" aria-hidden="true" focusable="false">${symbol}<circle class="hero-banner-progress-ring-bg" cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2" opacity="0.2" transform="rotate(-90 15 15)"></circle><circle class="hero-banner-progress-ring" cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-90 15 15)"></circle></svg>`;
    this.playPauseButton.setAttribute('aria-label', this.paused ? 'Play hero banner' : 'Pause hero banner');
    this.updateRing();
  }

  updateRing() {
    const ring = this.playPauseButton?.querySelector('.hero-banner-progress-ring');
    if (ring) ring.style.strokeDashoffset = String(300 - (90 / 100) * this.progress);
  }

  clearTimers() {
    clearTimeout(this.advanceTimer);
    clearInterval(this.progressTimer);
    this.advanceTimer = null;
    this.progressTimer = null;
  }

  start(duration) {
    this.clearTimers();
    this.paused = false;
    this.progress = 0.001;
    this.renderPlayPause();
    const total = Math.max(1000, duration || this.config.autoplay);
    this.progressTimer = setInterval(() => { this.progress = Math.min(100, this.progress + 1); this.updateRing(); }, total / 100);
    this.advanceTimer = setTimeout(() => { if (!this.paused) this.next(); }, total);
  }

  pause(soft = false) {
    this.paused = true;
    if (!soft) this.clearTimers();
    this.slides[this.index]?.video?.pause();
    this.renderPlayPause();
  }

  resume() {
    if (!this.canPlay()) return;
    this.slides[this.index]?.video?.play?.().catch(() => {});
    this.start(this.activeDuration());
  }

  toggle() { if (this.paused) this.resume(); else this.pause(); }

  activeDuration() { return this.slides[this.index]?.duration(this.config.autoplay) || this.config.autoplay; }

  updateOverlay() {
    const active = this.config.slides[this.index];
    const subtitle = active?.eyebrow || this.config.subtitle;
    const title = active?.heading || this.config.title;
    const title2 = active?.heading2 || this.config.title2;
    if (this.overlaySubtitle) { this.overlaySubtitle.textContent = subtitle || ''; this.overlaySubtitle.hidden = !subtitle; }
    if (this.overlayTitle) { this.overlayTitle.textContent = title || ''; this.overlayTitle.hidden = !title; }
    if (this.overlayTitle2) { this.overlayTitle2.textContent = title2 || ''; this.overlayTitle2.hidden = !title2; }
  }

  announce() {
    const active = this.config.slides[this.index];
    const label = [active?.eyebrow, active?.heading, active?.heading2].filter(Boolean).join(' ') || `Slide ${this.index + 1} of ${this.slides.length}`;
    this.liveRegion.textContent = label;
  }

  goTo(index, { silent = false } = {}) {
    if (!this.slides.length) return;
    const nextIndex = (index + this.slides.length) % this.slides.length;
    this.slides.forEach((slide, i) => { if (i === nextIndex) slide.activate(); else slide.deactivate(); });
    this.index = nextIndex;
    this.updateOverlay();
    this.buildActions();
    this.announce();
    if (!silent && !this.paused) this.start(this.activeDuration());
  }

  next() { this.goTo(this.index + 1); }

  prev() { this.goTo(this.index - 1); }
}

export default function decorate(block) {
  new HeroBannerBlock(block).init();
}
