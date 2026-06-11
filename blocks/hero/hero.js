/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
// eslint-disable-next-line object-curly-newline
const DEFAULTS = {
  title: 'Leave a little different',
  title2: '',
  subtitle: 'Come as you are',
  icon: 'https://www.queensland.com/content/dam/teq/consumer/global/icons/svg/Icon-Map-Queensland.svg',
  autoplay: 5000,
  heightRatio: 0.7,
  minHeight: 420,
  color: '#F83458',
  headlineColor: '#F83458',
  textShadow: false,
  showPlayPauseButton: true,
  showContentTile: true,
  contentTileHtml: `
    <h2 style="text-align: center;">Welcome to Queensland</h2>
    <h3 style="text-align: center;"><b><i>"Wunya"</i> and "<i>sew ngapa"</i></b></h3>
    <p style="text-align: center;">
      <i>
        Wunya (welcome, greetings) is from the Yuggera language of Brisbane and
        the Gubbi Gubbi language of the Sunshine Coast. Sew ngapa (welcome) is
        from the Kala Lagaw Ya and Kala Kawaw Ya languages of the Western Torres Straits.
      </i>
    </p>
    <p style="text-align: center;">
      Our garden's a one-million-year-old rainforest. Out the back is a red desert
      of dinosaur bones. Our swimming pool? The world's largest
      <a href="#anchor">reef.</a>
    </p>
    <p style="text-align: center;">
      Here, you’ll find experiences like nowhere else on the planet.
    </p>
    <p style="text-align: center;">
      After months of only dreaming about holidays, now's the time to discover
      Queensland's vast and beautiful backyard. To reconnect with nature, ourselves
      and our loved ones in places we've never explored, through experiences that
      make us come alive.
    </p>
    <p style="text-align: center;">
      Simply put - Queensland is Good to Go, and your
      <a
        title="queensland holiday deals"
        href="https://www.queensland.com/au/en/plan-your-holiday/holiday-deals.html"
        target="_self"
      >
        holiday is waiting
      </a>.
    </p>
  `,
  contentTileHeight: 0,
  breadcrumbItems: [],
  slides: [
    {
      id: 'slide-1',
      eyebrow: '',
      heading: '',
      heading2: '',
      body: '',
      ctaText: '',
      ctaHref: '',
      infoHtml: `
        <p>
          Experience Queensland's golden beaches, vibrant events, marine life,
          ancient rainforests, Indigenous cultures, expansive outback and the
          Great Barrier Reef.
        </p>
      `,
      media: {
        type: 'video',
        src: 'https://s7ap1.scene7.com/is/content/destqueenslandstage/teq/consumer/global/videos/homepage/2020_TEQ_Homepage_ProjectCaboodle_BoardHVT_Montages_1920x960.mp4',
        alt: 'Queensland hero video',
        poster: '',
      },
    },
  ],
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

function createElement(tag, {
  classes = [], attrs = {}, text = '', html = '',
} = {}) {
  const node = document.createElement(tag);

  if (classes.length) {
    node.className = classes.join(' ');
  }

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      node.setAttribute(key, String(value));
    }
  });

  if (text) {
    node.textContent = text;
  }

  if (html) {
    node.innerHTML = html;
  }

  return node;
}

function getDirectChildren(node) {
  return Array.from(node.children || []);
}

function getText(node) {
  return (node?.textContent || '').trim();
}

function getHtml(node) {
  return (node?.innerHTML || '').trim();
}

function toBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return ['true', '1', 'yes', 'y', 'on'].includes(String(value).trim().toLowerCase());
}

function toNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function containsHtml(value = '') {
  return /<[a-z][\s\S]*>/i.test(value);
}

function debounce(fn, delay = 100) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function normalizeKey(value = '') {
  return value.trim().toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9-]/g, '');
}

function readBlockConfig(block) {
  const config = {};

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    if (cells.length < 2) {
      return;
    }

    const key = cells[0].textContent.trim();
    const value = cells[1].textContent.trim();

    if (key) {
      config[key] = value;
    }
  });

  return config;
}

function parseJsonConfig(source) {
  const script = source.querySelector('script[type="application/json"]');

  if (!script) {
    return null;
  }

  try {
    const data = JSON.parse(script.textContent);

    return {
      title: data.title,
      title2: data.title2,
      subtitle: data.subtitle || data.subTitle,
      icon: data.icon,
      autoplay: data.autoplay,
      heightRatio: data.heightRatio ?? data.height,
      minHeight: data.minHeight,
      color: data.color,
      headlineColor: data.headlineColor,
      textShadow: data.textShadow,
      showPlayPauseButton: data.showPlayPauseButton,
      showContentTile: data.showContentTile,
      contentTileHtml: data.contentTileHtml || data.contentTile,
      contentTileHeight: data.contentTileHeight,
      breadcrumbItems: Array.isArray(data.breadcrumbItems) ? data.breadcrumbItems : undefined,
      slides: Array.isArray(data.slides)
        ? data.slides.map((slide, index) => normalizeSlide(slide, index)).filter((slide) => slide.media?.src)
        : undefined,
    };
  } catch (e) {
    return null;
  }
}

function parseBreadcrumbs(value = '') {
  return value
    .split('|')
    .map((item) => {
      const [label, href] = item.split(',').map((part) => part.trim());
      return { label, href: href || '' };
    })
    .filter((item) => item.label);
}

function getAsset(valueCell) {
  if (!valueCell) {
    return '';
  }

  const image = valueCell.querySelector('picture img, img');
  if (image) {
    return image.currentSrc || image.src || image.getAttribute('src') || '';
  }

  const link = valueCell.querySelector('a[href]');
  if (link) {
    return link.href || link.getAttribute('href') || '';
  }

  return getText(valueCell);
}

function normalizeMedia(rawMedia) {
  if (!rawMedia) {
    return null;
  }

  if (typeof rawMedia === 'string') {
    const src = rawMedia.trim();

    if (!src) {
      return null;
    }

    return {
      type: /\.(mp4|webm|ogg)(\?.*)?$/i.test(src) ? 'video' : 'image',
      src,
      alt: '',
      poster: '',
    };
  }

  return {
    type: rawMedia.type === 'video' ? 'video' : 'image',
    src: rawMedia.src || rawMedia.path || rawMedia.url || '',
    alt: rawMedia.alt || rawMedia.title || '',
    poster: rawMedia.poster || '',
  };
}

function normalizeSlide(rawSlide = {}, index = 0) {
  return {
    id: rawSlide.id || `slide-${index + 1}`,
    eyebrow: rawSlide.eyebrow || rawSlide.subtitle || rawSlide.subTitle || '',
    heading: rawSlide.heading || rawSlide.title || rawSlide.headline || '',
    heading2: rawSlide.heading2 || rawSlide.title2 || '',
    body: rawSlide.body || rawSlide.description || rawSlide.copy || '',
    ctaText: rawSlide.ctaText || rawSlide.linkText || '',
    ctaHref: rawSlide.ctaHref || rawSlide.href || rawSlide.link || '',
    infoHtml: rawSlide.infoHtml || rawSlide.mediaProps?.title || rawSlide.mediaTitle || '',
    media: normalizeMedia(rawSlide.media || rawSlide.mediaProps || rawSlide.asset || rawSlide.image || rawSlide.video || rawSlide.src),
  };
}

function isEdsKeyValueRow(row) {
  const cells = getDirectChildren(row);
  return cells.length >= 2 && SUPPORTED_EDS_KEYS.has(normalizeKey(getText(cells[0])));
}

function applyConfigValue(config, key, valueCell) {
  const textValue = getText(valueCell);
  const htmlValue = getHtml(valueCell);

  if (key === 'title') config.title = textValue;
  else if (key === 'title2') config.title2 = textValue;
  else if (key === 'subtitle') config.subtitle = textValue;
  else if (key === 'icon') config.icon = getAsset(valueCell);
  else if (key === 'autoplay') config.autoplay = textValue;
  else if (key === 'height' || key === 'heightratio') config.heightRatio = textValue;
  else if (key === 'minheight') config.minHeight = textValue;
  else if (key === 'color') config.color = textValue;
  else if (key === 'headlinecolor') config.headlineColor = textValue;
  else if (key === 'textshadow') config.textShadow = textValue;
  else if (key === 'showplaypausebutton') config.showPlayPauseButton = textValue;
  else if (key === 'showcontenttile') config.showContentTile = textValue;
  else if (key === 'contenttile') {
    config.contentTileHtml = htmlValue;
    config.showContentTile = true;
  } else if (key === 'contenttileheight') config.contentTileHeight = textValue;
  else if (key === 'breadcrumbs') config.breadcrumbItems = parseBreadcrumbs(textValue);
}

function parseColonConfigRow(row, config) {
  const raw = getText(row);
  const parts = raw.split(':');

  if (parts.length < 2) {
    return false;
  }

  const key = normalizeKey(parts.shift());
  const value = parts.join(':').trim();

  if (!SUPPORTED_EDS_KEYS.has(key)) {
    return false;
  }

  if (key === 'title') config.title = value;
  else if (key === 'title2') config.title2 = value;
  else if (key === 'subtitle') config.subtitle = value;
  else if (key === 'icon') config.icon = value;
  else if (key === 'autoplay') config.autoplay = value;
  else if (key === 'height' || key === 'heightratio') config.heightRatio = value;
  else if (key === 'minheight') config.minHeight = value;
  else if (key === 'color') config.color = value;
  else if (key === 'headlinecolor') config.headlineColor = value;
  else if (key === 'textshadow') config.textShadow = value;
  else if (key === 'showplaypausebutton') config.showPlayPauseButton = value;
  else if (key === 'showcontenttile') config.showContentTile = value;
  else if (key === 'contenttile') {
    config.contentTileHtml = value;
    config.showContentTile = true;
  } else if (key === 'contenttileheight') config.contentTileHeight = value;
  else if (key === 'breadcrumbs') config.breadcrumbItems = parseBreadcrumbs(value);

  return true;
}

function parseSlideRow(row, index) {
  const cells = getDirectChildren(row);
  const mediaCell = cells.find((cell) => cell.querySelector('picture, img, video, a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]')) || cells[0] || row;
  const contentCell = cells.find((cell) => cell !== mediaCell) || row;

  const image = mediaCell.querySelector('picture img, img');
  const video = mediaCell.querySelector('video');
  const videoLink = mediaCell.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]');

  let media = null;

  if (video) {
    media = {
      type: 'video',
      src: video.currentSrc || video.src || '',
      alt: video.getAttribute('aria-label') || '',
      poster: video.poster || '',
    };
  } else if (videoLink) {
    media = {
      type: 'video',
      src: videoLink.href,
      alt: videoLink.textContent.trim(),
      poster: row.dataset.poster || '',
    };
  } else if (image) {
    media = {
      type: 'image',
      src: image.currentSrc || image.src || '',
      alt: image.alt || '',
      poster: '',
    };
  }

  return normalizeSlide({
    id: row.id || `slide-${index + 1}`,
    subtitle: row.dataset.subtitle || getText(contentCell.querySelector('[data-subtitle], h5, h6, .subtitle, .eyebrow')),
    title: row.dataset.title || getText(contentCell.querySelector('[data-title], h1, h2, h3, h4, .title, .heading')),
    title2: row.dataset.title2 || getText(contentCell.querySelector('[data-title2], .title-2')),
    body: row.dataset.body || getHtml(contentCell.querySelector('[data-body], p')),
    ctaText: row.dataset.ctaText || getText(contentCell.querySelector('a[href]')),
    ctaHref: row.dataset.ctaHref || contentCell.querySelector('a[href]')?.href || '',
    infoHtml: row.dataset.infoHtml || row.dataset.info || '',
    media,
  }, index);
}

function parseDomConfig(source) {
  const rows = getDirectChildren(source);
  const config = {
    title: source.dataset.title,
    title2: source.dataset.title2,
    subtitle: source.dataset.subtitle,
    icon: source.dataset.icon,
    autoplay: source.dataset.autoplay,
    heightRatio: source.dataset.heightRatio || source.dataset.height,
    minHeight: source.dataset.minHeight,
    color: source.dataset.color,
    headlineColor: source.dataset.headlineColor,
    textShadow: source.dataset.textShadow,
    showPlayPauseButton: source.dataset.showPlayPauseButton,
    showContentTile: source.dataset.showContentTile,
    contentTileHtml: source.dataset.contentTileHtml,
    contentTileHeight: source.dataset.contentTileHeight,
    breadcrumbItems: undefined,
    slides: undefined,
  };

  const consumedRows = new Set();

  rows.forEach((row) => {
    if (!isEdsKeyValueRow(row)) {
      return;
    }

    const cells = getDirectChildren(row);
    const key = normalizeKey(getText(cells[0]));
    const valueCell = cells[1];

    applyConfigValue(config, key, valueCell);
    consumedRows.add(row);
  });

  rows.forEach((row) => {
    if (consumedRows.has(row)) {
      return;
    }

    if (parseColonConfigRow(row, config)) {
      consumedRows.add(row);
    }
  });

  config.slides = rows
    .filter((row) => !consumedRows.has(row))
    .filter((row) => row.querySelector('picture, img, video, a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"]'))
    .map((row, index) => parseSlideRow(row, index))
    .filter((slide) => slide.media?.src);

  return config;
}

class HeroBannerModal {
  constructor(onClose) {
    this.onClose = onClose;
    this.root = null;
    this.body = null;
    this.previouslyFocused = null;
    this.keyHandler = (event) => {
      if (event.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    };
  }

  build() {
    if (this.root) {
      return this.root;
    }

    this.root = createElement('div', {
      classes: ['hero-banner-modal'],
      attrs: { hidden: 'hidden', 'aria-hidden': 'true' },
    });

    const dialog = createElement('div', {
      classes: ['hero-banner-dialog'],
      attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Additional information' },
    });

    const close = createElement('button', {
      classes: ['hero-banner-dialog-close'],
      attrs: { type: 'button', 'aria-label': 'Close additional information' },
      text: '×',
    });

    this.body = createElement('div', { classes: ['hero-banner-dialog-body'] });

    close.addEventListener('click', () => this.close());
    this.root.addEventListener('click', (event) => {
      if (event.target === this.root) {
        this.close();
      }
    });

    dialog.append(close, this.body);
    this.root.append(dialog);
    document.body.append(this.root);
    document.addEventListener('keydown', this.keyHandler);

    return this.root;
  }

  open(markup) {
    this.build();
    this.previouslyFocused = document.activeElement;
    this.body.innerHTML = markup;
    this.root.removeAttribute('hidden');
    this.root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('hero-banner-modal-open');
    this.root.querySelector('.hero-banner-dialog-close')?.focus();
  }

  close() {
    if (!this.root) {
      return;
    }

    this.root.setAttribute('hidden', 'hidden');
    this.root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('hero-banner-modal-open');

    if (typeof this.onClose === 'function') {
      this.onClose();
    }

    this.previouslyFocused?.focus?.();
  }

  isOpen() {
    return Boolean(this.root) && !this.root.hasAttribute('hidden');
  }
}

class HeroBannerSlideView {
  constructor(slide, index) {
    this.slide = slide;
    this.index = index;
    this.node = null;
    this.video = null;
  }

  build() {
    if (this.node) {
      return this.node;
    }

    this.node = createElement('article', {
      classes: ['hero-banner-slide'],
      attrs: {
        'data-slide-index': this.index,
        'aria-hidden': this.index === 0 ? 'false' : 'true',
      },
    });

    const media = createElement('div', { classes: ['hero-banner-media'] });

    if (this.slide.media?.type === 'video' && this.slide.media.src) {
      const video = createElement('video', {
        classes: ['hero-banner-video'],
        attrs: {
          muted: 'muted',
          playsinline: 'playsinline',
          preload: 'metadata',
          loop: 'loop',
          'aria-label': this.slide.media.alt || this.slide.heading || `Hero banner slide ${this.index + 1}`,
        },
      });

      if (this.slide.media.poster) {
        video.poster = this.slide.media.poster;
      }

      video.append(createElement('source', { attrs: { src: this.slide.media.src } }));
      media.append(video);
      this.video = video;
    } else if (this.slide.media?.src) {
      const picture = createElement('picture', { classes: ['hero-banner-picture'] });
      picture.append(createElement('img', {
        classes: ['hero-banner-image'],
        attrs: {
          src: this.slide.media.src,
          alt: this.slide.media.alt || this.slide.heading || `Hero banner slide ${this.index + 1}`,
          loading: this.index === 0 ? 'eager' : 'lazy',
        },
      }));
      media.append(picture);
    } else {
      media.append(createElement('div', { classes: ['hero-banner-placeholder'] }));
    }

    this.node.append(media);
    return this.node;
  }

  activate() {
    if (!this.node) {
      return;
    }

    this.node.classList.add('is-active');
    this.node.setAttribute('aria-hidden', 'false');

    if (this.video) {
      this.video.currentTime = 0;
      this.video.play().catch(() => {});
    }
  }

  deactivate() {
    if (!this.node) {
      return;
    }

    this.node.classList.remove('is-active');
    this.node.setAttribute('aria-hidden', 'true');
    this.video?.pause();
  }

  getDuration(fallbackMs) {
    if (this.video && Number.isFinite(this.video.duration) && this.video.duration > 0) {
      return Math.round(this.video.duration * 1000);
    }

    return fallbackMs;
  }
}

class HeroBannerBlock {
  constructor(block, source = block, authoredConfig = {}) {
    this.block = block;
    this.source = source;
    this.defaults = { ...DEFAULTS };

    const jsonConfig = parseJsonConfig(source) || {};
    const domConfig = parseDomConfig(source) || {};
    const parsed = {
      ...authoredConfig,
      ...domConfig,
      ...jsonConfig,
    };

    this.config = {
      ...this.defaults,
      // ...parsed,
      // autoplay: toNumber(parsed.autoplay, this.defaults.autoplay),
      // heightRatio: Math.max(0.2, toNumber(parsed.heightRatio, this.defaults.heightRatio)),
      // minHeight: toNumber(parsed.minHeight, this.defaults.minHeight),
      // contentTileHeight: toNumber(parsed.contentTileHeight, this.defaults.contentTileHeight),
      // textShadow: toBoolean(parsed.textShadow, this.defaults.textShadow),
      // showPlayPauseButton: toBoolean(parsed.showPlayPauseButton, this.defaults.showPlayPauseButton),
      // showContentTile: toBoolean(parsed.showContentTile, this.defaults.showContentTile),
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
    this.modal = new HeroBannerModal(() => this.resume());
    this.onResize = debounce(() => this.applyHeight(), 100);
  }

  init() {
    this.config.slides = this.config.slides.filter((slide) => slide?.media?.src);

    if (!this.config.slides.length) {
      this.block.replaceChildren();
      this.block.classList.add('hero-banner-empty');
      // eslint-disable-next-line no-console
      console.warn('Hero banner: no valid slides found', this.config, this.source);
      return;
    }

    this.render();
    this.bind();
    this.goTo(0, { silent: true });

    if (this.canPlay()) {
      this.start(this.activeDuration());
    } else {
      this.pause(true);
    }
  }

  canPlay() {
    return this.config.showPlayPauseButton && (this.slides.length > 1 || this.slides.some((slide) => Boolean(slide.video)));
  }

  render() {
    const root = createElement('section', {
      classes: ['hero-banner-root'],
      attrs: { id: 'hero-banner-slider', 'aria-label': 'Hero banner slider', tabindex: '0' },
    });

    const wrapper = createElement('div', { classes: ['hero-banner-carousel-wrapper'] });
    const stage = createElement('div', {
      classes: ['hero-banner-stage'],
      attrs: { role: 'region', 'aria-roledescription': 'carousel', 'aria-label': 'Hero banner slides' },
    });

    this.slides = this.config.slides.map((slide, index) => {
      const view = new HeroBannerSlideView(slide, index);
      stage.append(view.build());
      return view;
    });

    const overlay = createElement('div', { classes: ['hero-banner-overlay'] });
    const gradient = createElement('div', { classes: ['hero-banner-gradient'] });
    const content = createElement('div', {
      classes: ['hero-banner-content', !this.config.title ? 'hero-banner-content-no-title' : ''].filter(Boolean),
    });

    if (this.config.icon) {
      const icon = createElement('span', { classes: ['hero-banner-icon'] });
      icon.append(createElement('img', {
        classes: ['hero-banner-icon-image'],
        attrs: { src: this.config.icon, alt: '', loading: 'eager' },
      }));
      content.append(icon);
    }

    const group = createElement('div', { classes: ['hero-banner-heading-group'] });
    this.overlaySubtitle = createElement('span', {
      classes: ['hero-banner-subtitle', this.config.textShadow ? 'hero-banner-text-shadow' : ''].filter(Boolean),
      text: this.config.subtitle,
    });
    this.overlayTitle = createElement('span', {
      classes: ['hero-banner-title', this.config.textShadow ? 'hero-banner-text-shadow' : ''].filter(Boolean),
      text: this.config.title,
    });
    this.overlayTitle2 = createElement('span', {
      classes: ['hero-banner-title', this.config.textShadow ? 'hero-banner-text-shadow' : ''].filter(Boolean),
      text: this.config.title2,
    });

    if (this.config.subtitle) group.append(this.overlaySubtitle);
    if (this.config.title) group.append(this.overlayTitle);
    if (this.config.title2) group.append(this.overlayTitle2);
    if (group.children.length) content.append(group);

    this.actions = createElement('ul', { classes: ['hero-banner-action-list'] });
    gradient.append(content, this.actions);
    overlay.append(gradient);

    this.liveRegion = createElement('div', {
      classes: ['hero-banner-sr-only'],
      attrs: { 'aria-live': 'polite', 'aria-atomic': 'true' },
    });

    wrapper.append(stage, overlay, this.liveRegion);

    if (this.config.showContentTile && this.config.contentTileHtml) {
      wrapper.append(createElement('div', { classes: ['hero-banner-bottom-gradient'] }));
    }

    root.append(wrapper);

    const breadcrumbs = this.renderBreadcrumbs();

    if (this.config.showContentTile && this.config.contentTileHtml) {
      const panel = createElement('div', {
        classes: ['hero-banner-panel', breadcrumbs ? 'hero-banner-panel-with-breadcrumbs' : ''].filter(Boolean),
      });

      if (breadcrumbs) {
        panel.append(breadcrumbs);
      }

      const tile = createElement('div', {
        classes: ['hero-banner-content-tile', this.config.contentTileHeight > 0 ? 'hero-banner-content-tile-clamped' : ''].filter(Boolean),
        html: this.config.contentTileHtml,
      });

      if (this.config.contentTileHeight > 0) {
        tile.style.minHeight = `${this.config.contentTileHeight}px`;
      }

      panel.append(tile);
      root.append(panel);
    } else if (breadcrumbs) {
      root.append(breadcrumbs);
    }

    this.block.replaceChildren(root);
  }

  renderBreadcrumbs() {
    if (!this.config.breadcrumbItems.length) {
      return null;
    }

    const nav = createElement('nav', {
      classes: ['hero-banner-breadcrumbs'],
      attrs: { 'aria-label': 'Breadcrumb' },
    });
    const list = createElement('ol', { classes: ['hero-banner-breadcrumb-list'] });

    this.config.breadcrumbItems.forEach((item, index) => {
      const li = createElement('li', { classes: ['hero-banner-breadcrumb-item'] });

      if (item.href && index !== this.config.breadcrumbItems.length - 1) {
        li.append(createElement('a', {
          classes: ['hero-banner-breadcrumb-link'],
          attrs: { href: item.href },
          text: item.label,
        }));
      } else {
        li.append(createElement('span', {
          classes: ['hero-banner-breadcrumb-current'],
          text: item.label,
        }));
      }

      list.append(li);
    });

    nav.append(list);
    return nav;
  }

  bind() {
    this.block.addEventListener('mouseenter', () => this.pause(true));
    this.block.addEventListener('mouseleave', () => {
      if (!this.modal.isOpen()) {
        this.resume();
      }
    });
    this.block.addEventListener('focusin', () => this.pause(true));
    this.block.addEventListener('focusout', () => {
      requestAnimationFrame(() => {
        if (!this.block.contains(document.activeElement) && !this.modal.isOpen()) {
          this.resume();
        }
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

      if (event.key === ' ' && event.target === this.playPauseButton) {
        event.preventDefault();
        this.toggle();
      }
    });

    window.addEventListener('resize', this.onResize);
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
    const height = Math.max(this.config.minHeight, Math.round(viewportHeight * this.config.heightRatio));
    this.block.style.setProperty('--hero-banner-height', `${height}px`);
  }

  buildActions() {
    this.actions.innerHTML = '';
    const active = this.config.slides[this.index];

    if (containsHtml(active?.infoHtml || '')) {
      const infoItem = createElement('li', { classes: ['hero-banner-action-item'] });
      const infoButton = createElement('button', {
        classes: ['hero-banner-icon-button'],
        attrs: { type: 'button', 'aria-label': 'More information' },
      });

      infoButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" aria-hidden="true" focusable="false"><circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="15" cy="9" r="1.5" fill="currentColor"></circle><path d="M14 13h2v8h-2z" fill="currentColor"></path></svg>';
      infoButton.addEventListener('click', () => {
        this.pause(true);
        this.modal.open(active.infoHtml);
      });
      infoItem.append(infoButton);
      this.actions.append(infoItem);
    }

    if (this.canPlay()) {
      const item = createElement('li', { classes: ['hero-banner-action-item'] });
      this.playPauseButton = createElement('button', {
        classes: ['hero-banner-icon-button', 'hero-banner-play-pause'],
        attrs: { type: 'button', 'aria-label': this.paused ? 'Play hero banner' : 'Pause hero banner' },
      });
      this.playPauseButton.addEventListener('click', () => this.toggle());
      this.renderPlayPause();
      item.append(this.playPauseButton);
      this.actions.append(item);
    } else {
      this.playPauseButton = null;
    }
  }

  renderPlayPause() {
    if (!this.playPauseButton) {
      return;
    }

    const symbol = this.paused
      ? '<path d="M11.5 10.8v8.5c0 .3.2.6.5.7s.6.1.9-.1l5.4-4.2c.4-.3.4-.9 0-1.2l-5.4-4.2c-.2-.2-.6-.2-.9-.1-.3 0-.5.3-.5.6z" fill="currentColor"></path>'
      : '<path d="M13 9c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V10c0-.6.4-1 1-1h1zm5 0c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V10c0-.6.4-1 1-1h1z" fill="currentColor"></path>';

    this.playPauseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" aria-hidden="true" focusable="false">${symbol}<circle class="hero-banner-progress-ring-bg" cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2" opacity="0.2" transform="rotate(-90 15 15)"></circle><circle class="hero-banner-progress-ring" cx="15" cy="15" r="14" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-90 15 15)"></circle></svg>`;
    this.playPauseButton.setAttribute('aria-label', this.paused ? 'Play hero banner' : 'Pause hero banner');
    this.updateProgressRing();
  }

  updateProgressRing() {
    const ring = this.playPauseButton?.querySelector('.hero-banner-progress-ring');

    if (ring) {
      ring.style.strokeDashoffset = String(300 - (90 / 100) * this.progress);
    }
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
    this.progressTimer = setInterval(() => {
      this.progress = Math.min(100, this.progress + 1);
      this.updateProgressRing();
    }, total / 100);
    this.advanceTimer = setTimeout(() => {
      if (!this.paused) {
        this.next();
      }
    }, total);
  }

  pause(soft = false) {
    this.paused = true;

    if (!soft) {
      this.clearTimers();
    }

    this.slides[this.index]?.video?.pause();
    this.renderPlayPause();
  }

  resume() {
    if (!this.canPlay()) {
      return;
    }

    this.slides[this.index]?.video?.play?.().catch(() => {});
    this.start(this.activeDuration());
  }

  toggle() {
    if (this.paused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  activeDuration() {
    return this.slides[this.index]?.getDuration(this.config.autoplay) || this.config.autoplay;
  }

  updateOverlay() {
    const active = this.config.slides[this.index];
    const subtitle = active?.eyebrow || this.config.subtitle;
    const title = active?.heading || this.config.title;
    const title2 = active?.heading2 || this.config.title2;

    if (this.overlaySubtitle) {
      this.overlaySubtitle.textContent = subtitle || '';
      this.overlaySubtitle.hidden = !subtitle;
    }

    if (this.overlayTitle) {
      this.overlayTitle.textContent = title || '';
      this.overlayTitle.hidden = !title;
    }

    if (this.overlayTitle2) {
      this.overlayTitle2.textContent = title2 || '';
      this.overlayTitle2.hidden = !title2;
    }
  }

  announce() {
    const active = this.config.slides[this.index];
    const label = [active?.eyebrow, active?.heading, active?.heading2].filter(Boolean).join(' ') || `Slide ${this.index + 1} of ${this.slides.length}`;
    this.liveRegion.textContent = label;
  }

  goTo(index, { silent = false } = {}) {
    if (!this.slides.length) {
      return;
    }

    const nextIndex = (index + this.slides.length) % this.slides.length;

    this.slides.forEach((slide, slideIndex) => {
      if (slideIndex === nextIndex) {
        slide.activate();
      } else {
        slide.deactivate();
      }
    });

    this.index = nextIndex;
    this.updateOverlay();
    this.buildActions();
    this.announce();

    if (!silent && !this.paused) {
      this.start(this.activeDuration());
    }
  }

  next() {
    this.goTo(this.index + 1);
  }

  prev() {
    this.goTo(this.index - 1);
  }
}

export default async function decorate(block) {
  const source = block.cloneNode(true);
  const component = document.createElement('div');
  component.className = 'hero-banner-component';

  const data = readBlockConfig(source);

  try {
    const hero = new HeroBannerBlock(component, source, data);
    hero.init();
    block.replaceChildren(component);
    return component;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Hero banner failed to render:', error, data, source);
    block.replaceChildren();
    return null;
  }
}
