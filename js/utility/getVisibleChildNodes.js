/**
 * Returns an array of nodes that will be visible in the browser window.
 *
 * Best used to get an array of nodes that aren't line-breaks or comments. I've
 * used this primarily to check for elements containing only images to set the
 * line-height to 0
 *
 * @param {Node} input
 * @returns {Array}
 */

function getVisibleChildNodes(input) {

  if (!input instanceof Node) {
    return false;
  } else {
    const filteredNodes =
      // Create array from child nodes
      Array.from(input.childNodes)

      // Remove comments
      .filter(function(node){
        if (node.nodeName != '#comment') {return node;}
      })

      // Remove nodes that are only whitespace
      .filter(function(node){
        if (node.nodeName != '#text'){
          return node;
        } else if (node.wholeText.replace(/\s*/g,"") != "") {
          return node;
        }
      });

    return filteredNodes
  }
}