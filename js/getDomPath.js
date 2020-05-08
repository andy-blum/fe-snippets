/**
 * Returns array of elements containing this element.
 *
 * Array is ordered from docroot toward element passed to function.
 *
 * @param {HTMLElement} el
 * @returns {Array}
 */
function getDomPath(el) {
  const path = [];
  while (el) {
    path.unshift(el);
    el = el.parentElement;
  }
  return path;
}