/* eslint-disable class-methods-use-this */

/**
 * HeaderMenu2 - Adobe EDS Vanilla JS Component
 * Manages desktop and mobile navigation, search, bookmarks, and accessibility
 */

/**
 * AEM EDS Decorator for auto-initialization
 */
import HeaderMenu2 from './header2class.js';

export default async function decorate(block) {
  const component = document.createElement('header-menu2');

  // Extract component properties from block data
  const data = block.dataset;

  // eslint-disable-next-line no-console
  console.log('HeaderMenu2 data attributes:', data, component); // Debug log to check data attributes

  // // Set variation with default
  // component.variation = data.variation || 'transparent';

  // // Load menu items from data or use mock data
  // if (data.menuItems) {
  //   component.menuItems = JSON.parse(data.menuItems);
  // } else {
  //   // component.menuItems = mockMenuItems;
  // }

  // // Load bookmarks link from data or use mock data
  // if (data.bookmarksLink) {
  //   component.bookmarksLink = JSON.parse(data.bookmarksLink);
  // } else {
  //   // component.bookmarksLink = mockBookmarks;
  // }

  // // Set search results page with default
  // component.searchResultsPage = data.searchResultsPage || '/search';

  // // Load popular search terms from data or use mock data
  // if (data.popularSearchTerms) {
  //   component.popularSearchTerms = JSON.parse(data.popularSearchTerms);
  // } else {
  //   // component.popularSearchTerms = mockSearchTerms;
  // }

  block.replaceChildren(component);

  return component;
}

customElements.define('header-menu2', HeaderMenu2);
