/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

/**
 * HeaderMenu2 - Adobe EDS Vanilla JS Component
 * Manages desktop and mobile navigation, search, bookmarks, and accessibility
 */

/**
 * AEM EDS Decorator for auto-initialization
 */
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import HeaderMenu2 from './header2class.js';

function getDirectChild(element, selector) {
  return Array.from(element.children).find((child) => child.matches(selector)) || null;
}

function getDirectChildrenByTag(element, tagName) {
  return Array.from(element.children).filter((child) => child.tagName === tagName);
}

function getDirectParagraphs(element) {
  return getDirectChildrenByTag(element, 'P');
}

function getItemContent(li) {
  const paragraph = getDirectChild(li, 'p');
  const directAnchor = paragraph?.querySelector(':scope > a') || getDirectChild(li, 'a');
  const directStrong = paragraph?.querySelector(':scope > strong, :scope > b');

  if (directAnchor) {
    return {
      title: directAnchor.textContent.trim(),
      link: {
        href: directAnchor.getAttribute('href') || '#',
        target: directAnchor.getAttribute('target') || '',
      },
    };
  }

  if (directStrong) {
    return {
      title: directStrong.textContent.trim(),
      link: null,
    };
  }

  if (paragraph) {
    return {
      title: paragraph.textContent.trim(),
      link: null,
    };
  }

  return {
    title: li.textContent.trim(),
    link: null,
  };
}

function parseMenuItem(li, level = 0) {
  const { title, link } = getItemContent(li);
  const childList = getDirectChild(li, 'ul');
  const children = childList ? getDirectChildrenByTag(childList, 'LI').map((childLi) => parseMenuItem(childLi, level + 1)) : [];

  return {
    title,
    link,
    hasChildren: children.length > 0,
    isActive: false,
    isMainHeading: level === 1 && children.length > 0,
    children,
  };
}

function isImageGridItem(li) {
  return Boolean(li.querySelector(':scope > p img, :scope > p picture img, :scope img'));
}

function isImageGridSection(li) {
  const childList = getDirectChild(li, 'ul');
  if (!childList) return false;

  return getDirectChildrenByTag(childList, 'LI').some((childLi) => isImageGridItem(childLi));
}

function parseImageGridCard(li) {
  const paragraphs = getDirectParagraphs(li);
  const imageParagraph = paragraphs.find((paragraph) => paragraph.querySelector('img, picture img'));
  const imageAnchor = imageParagraph?.querySelector('a');
  const imageNode = imageParagraph?.querySelector('img, picture img');

  const titleParagraph = paragraphs.find((paragraph) => {
    if (paragraph === imageParagraph) return false;
    return Boolean(paragraph.querySelector('a'));
  });
  const titleAnchor = titleParagraph?.querySelector('a');

  const descriptionParagraph = paragraphs.find((paragraph) => {
    if (paragraph === imageParagraph || paragraph === titleParagraph) return false;
    return !paragraph.querySelector('a') && paragraph.textContent.trim();
  });

  return {
    image: imageNode?.getAttribute('src') || imageNode?.getAttribute('data-src') || '',
    imageTitle: titleAnchor?.textContent.trim() || imageNode?.getAttribute('alt') || '',
    imageLink: titleAnchor?.getAttribute('href') || imageAnchor?.getAttribute('href') || '#',
    imageDescription: descriptionParagraph?.textContent.trim() || '',
  };
}

function parseImageGridSection(li) {
  const { title } = getItemContent(li);
  const childList = getDirectChild(li, 'ul');
  const cards = childList ? getDirectChildrenByTag(childList, 'LI').map((cardLi) => parseImageGridCard(cardLi)) : [];

  return {
    gridTitle: title,
    imageRatio: '3x2',
    enlargeFirstImage: false,
    grid: cards.filter((card) => card.image || card.imageTitle || card.imageDescription),
  };
}

function parseTopLevelItem(li) {
  const { title, link } = getItemContent(li);
  const childList = getDirectChild(li, 'ul');
  const menuItem = {
    title,
    link,
    hasChildren: false,
    isActive: false,
    isMainHeading: false,
    children: [],
  };

  if (!childList) {
    return menuItem;
  }

  getDirectChildrenByTag(childList, 'LI').forEach((sectionLi) => {
    if (isImageGridSection(sectionLi)) {
      menuItem.imageGrid = parseImageGridSection(sectionLi);
    } else {
      menuItem.children.push(parseMenuItem(sectionLi, 1));
    }
  });

  menuItem.hasChildren = menuItem.children.length > 0;
  return menuItem;
}

function getAuthoredMenuItems(source) {
  if (!source) return [];

  const rootList = source.querySelector('.nav-sections .default-content-wrapper > ul')
    || Array.from(source.querySelectorAll('ul')).find((list) => !list.closest('li'));

  if (!rootList) return [];

  return getDirectChildrenByTag(rootList, 'LI').map((listItem) => parseTopLevelItem(listItem));
}

function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value === 'boolean') return value;
  return String(value).toLowerCase() === 'true';
}

function readBlockConfig(block) {
  const config = {};

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const key = cells[0].textContent.trim();
    const value = cells[1].textContent.trim();

    if (key) {
      config[key] = value;
    }
  });

  return config;
}

export default async function decorate(block) {
  const component = document.createElement('header-menu2');

  const data = readBlockConfig(block);

  console.log('Data Blocks: ', data);

  if (data.enableV2 !== undefined) {
    component.enableV2 = parseBoolean(data.enableV2, true);
  }

  if (data.variation) {
    component.variation = data.variation;
  }

  if (data.teqLogoSrc) {
    component.teqLogoSrc = data.teqLogoSrc;
  }

  if (data.teqLogoWhite) {
    component.teqLogoWhiteSrc = data.teqLogoWhiteSrc;
  }

  if (data.searchResultsPage) {
    component.searchResultsPage = data.searchResultsPage;
  }

  if (data.backText) {
    component.backText = data.backText;
  }

  if (data.cancelText) {
    component.cancelText = data.cancelText;
  }

  if (data.suggestText) {
    component.suggestText = data.suggestText;
    component.suggestedText = data.suggestText;
  }

  if (data.popularSearchesText) {
    component.popularSearchesText = data.popularSearchesText;
  }

  if (data.searchForText) {
    component.searchForText = data.searchForText;
  }

  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  const authoredMenuItems = getAuthoredMenuItems(fragment) || [];
  const blockMenuItems = authoredMenuItems.length === 0 ? getAuthoredMenuItems(block) : [];
  const resolvedMenuItems = authoredMenuItems.length > 0 ? authoredMenuItems : blockMenuItems;

  // eslint-disable-next-line no-console
  console.log('HeaderMenu2 data attributes:', data, component, resolvedMenuItems);

  if (resolvedMenuItems.length > 0) {
    component.menuItems = resolvedMenuItems;
  }

  block.replaceChildren(component);

  return component;
}

customElements.define('header-menu2', HeaderMenu2);
