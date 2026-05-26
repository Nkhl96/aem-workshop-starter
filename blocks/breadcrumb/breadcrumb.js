/**
 * loads and decorates the breadcrumb block
 * @param {Element} block The breadcrumb block element
 */
export default async function decorate(block) {
  // Create a nav element with proper ARIA label
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'breadcrumb');

  // Create an ordered list for breadcrumb items
  const ol = document.createElement('ol');

  // Process each row as a breadcrumb item
  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    // Move all content from the row into the list item
    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    ol.append(li);
  });

  // Add the list to the nav and replace block content
  nav.append(ol);
  block.replaceChildren(nav);
}
