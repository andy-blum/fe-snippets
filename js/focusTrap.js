/**
 * Object for creating, storing, and destroying focus traps
 *
 * Used to assist modals and offcanvas accessibility
 *
 * @property {bool} active describes state of focusTrap
 * @property {Object} trigger element that triggered the focus trap. Used to
 * pass focus back after destruction
 * @property {Object} container element that contains trapped elements. Used to
 * init() and detect clicks outside of trapped area
 * @property {string} selectables querySelector string used to get all focusable
 * elements
 * @property {Array} items all items that are in the trap
 *
 *
 * @function init Takes a container element and optionally the trigger element
 * and modifies properties. Sets up event listeners to handle tab, esc,
 * and click. Sets focus to first item in trap
 * @function clickListener listens for clicks on document, destroys trap if
 * click occurs outside container element
 * @function keyListener listens for keydown and cycles focus through elements
 * in trap. Destroys trap on ESC
 * @function destroy if a trigger element was entered, focus is returned to that
 * element. Dispatches exitfocustrap, resets params to original values, removes
 * click and keydown listeners
 *
 *
 * @event exitfocustrap emitted on destruction
 *
 */

const focusTrap = {
  active: false,
  trigger: false,
  container: false,
  selectables: 'a[href],area[href],input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex="0"]',
  items: [],
  init: function(container, trigger = false) {
    this.active = true;
    this.container = container;
    this.items = [];
    trap = this;
    Array.from(container.querySelectorAll(this.selectables)).forEach(function(el){
      if (el.getBoundingClientRect().width > 0) {
        trap.items.push(el);
      }
    });
    this.items[0].focus();
    document.addEventListener('click', this.clickListener);
    document.addEventListener('keydown', this.keyListener);
  },
  clickListener: function(e) {
    const trap = focusTrap;
    const path = getDomPath(e.target);
    if (!path.includes(trap.container)) {
      focusTrap.destroy();
    }
  },
  keyListener: function(e) {
    //handle tab
    if (e.keyCode === 9) {
      e.preventDefault();

      const i = focusTrap.items.indexOf(e.target);
      let j;

      if (e.shiftKey) {
        if (i == 0) {
          console.log(trap.items.length);
          j = focusTrap.items.length - 1;
        } else {
          j = i - 1;
        }
      } else {
        if (i == (focusTrap.items.length - 1)) {
          j = 0
        } else {
          j = i + 1;
        }
      }
      focusTrap.items[j].focus();
    }

    //handle escape
    if (e.keyCode === 27) {
      trap.destroy();
    }
  },
  destroy: function() {
    if (this.active) {
      if (this.trigger) {
        this.trigger.focus();
      }
      this.container.dispatchEvent(new CustomEvent('exitfocustrap', {bubbles:true,cancelable:true}));
      this.active = false;
      this.trigger = false;
      this.container = false;
      this.items = [];
      document.removeEventListener('click', this.clickListener);
      document.removeEventListener('keydown', this.keyListener);
    } else {
      console.error('Cannot destroy inactive focus trap.')
    }
  }
};