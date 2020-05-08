/**
 * Set of functions to mimic jQuery's slideUp() slideDown() and slideToggle()
 * methods.
 *
 * @param {HTMLElement} target The element to slide up/down/toggle
 * @param {int} duration optional duration in milliseconds. Defaults to 500
 *
 * @function slideUp Animates element from height:auto to height:0px and sets
 * display to none
 *
 * @function slideDown Animates element from height:0px to height:auto and
 * removes display:none
 *
 * @function slideToggle uses either slideUp or slideDown to toggle element in
 * and out of display
 */

function slideUp(target, duration=500) {
  return new Promise((resolve, reject) => {
    if (!(target instanceof HTMLElement)) {
      reject('Unable to slide element.', target);
    } else {
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.boxSizing = 'border-box';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout( () => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        resolve();
      }, duration);
    }
  });
}

function slideDown(target, duration=500) {
  return new Promise((resolve, reject) => {
    if (!(target instanceof HTMLElement)) {
      reject('Unable to slide element.', target);
    } else {
      target.style.removeProperty('display');
      let display = window.getComputedStyle(target).display;

      if (display === 'none')
        display = 'block';

      target.style.display = display;
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.boxSizing = 'border-box';
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout( () => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        resolve();
      }, duration);
    }
  });

async function slideToggle(target, duration = 500) {
  return new Promise((resolve, reject) => {
    if (!(target instanceof HTMLElement)) {
      reject('Unable to slide element.', target);
    } else {
      if (window.getComputedStyle(target).display === 'none') {
        await slideDown(target, duration);
        resolve();
      } else {
        await slideUp(target, duration);
        resolve();
      }
    }
  });
}
