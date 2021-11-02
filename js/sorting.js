import get from 'lodash.get';

/**
 * Use as .sort() argument to sort items in ascending order
 *
 * @param {*} a
 * @param {*} b
 * @returns -1 | 0 | 1
 * 
 * @example
 * [1,5,2,9,1].sort(sortAsc)
 */
export const sortAsc = (a, b) => {
  if (a === b) return 0
  if (a < b) return -1
  if (a > b) return 1
}


/**
 * Use as .sort() argument to sort items in descending order
 *
 * @param {*} a
 * @param {*} b
 * @returns -1 | 0 | 1
 * 
 * @example
 * [1,5,2,9,1].sort(sortAsc)
 */
export const sortDesc = (a, b) => {
  if (a === b) return 0
  if (a > b) return -1
  if (a < b) return 1
}

/**
 * Nested sorting of array of objects by properties on those objects
 * @param {[]} sortableItems
 * @param {[]} sortingOrder
 * @returns {[]} sortedIt
 * 
 * @example
 * const order = [
 *  ['prop1', 'asc'],
 *  ['prop2.subProp', 'desc']
 * ];
 *
 * const sortedItems = sortObjectsByProperties(unsorted, order);
 */
export const sortObjectsByProperties = (sortableItems, sortingOrder) => {

  if (!Array.isArray(sortableItems) || !sortableItems.length) {
    return false;
  }

  sortingOrder.reverse().forEach(([property, direction]) => {
    if (direction.toLowerCase() === 'asc') {
      sortableItems.sort((a, b) => sortAsc(get(a, property), get(b, property)))
    }
    else if (direction.toLowerCase() === 'desc') {
      sortableItems.sort((a, b) => sortDesc(get(a, property), get(b, property)))
    }
  });

  return sortableItems;
}
