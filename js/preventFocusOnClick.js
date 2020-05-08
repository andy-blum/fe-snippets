/**
 * Prevents browser from focusing on element when it is clicked.
 *
 * This function prevents unwanted focus states on elements that are clicked and
 * then navigate away or pull focus anyhow like anchors or buttons.
 *
 */

document.querySelectorAll('a, button').forEach(link => {
  link.addEventListener('mousedown', (e) => {
    e.preventDefault();
  });
});