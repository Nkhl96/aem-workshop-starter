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

function parseMenuList(list, level = 0) {
  if (!list) return [];

  return Array.from(list.children)
    .filter((child) => child.tagName === 'LI')
    .map((li) => {
      const { title, link } = getItemContent(li);
      const childList = getDirectChild(li, 'ul');
      const children = childList ? parseMenuList(childList, level + 1) : [];

      return {
        title,
        link,
        hasChildren: children.length > 0,
        isActive: false,
        isMainHeading: level === 1 && children.length > 0,
        children,
      };
    });
}

function getAuthoredMenuItems(source) {
  if (!source) return [];

  const rootList = source.querySelector('.nav-sections .default-content-wrapper > ul')
    || Array.from(source.querySelectorAll('ul')).find((list) => !list.closest('li'));

  if (!rootList) return [];

  return parseMenuList(rootList);
}

export default async function decorate(block) {
  const component = document.createElement('header-menu2');
  const data = block.dataset;

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
