module.exports = {

  // -- Tree Walking

  walkUp(node, callback) {

    while (node && node.parent, node = node.parent) {

      if (callback(node))
        break

      node = node.parent
    }

  },

  walkBackwards(node, callback) {
    while(node) {

      if (callback(node))
        break

      if (node.previousSibling) {
        node = node.previousSibling
      } else {
        node = node.parent
      }
    }
  },


  // -- Specific


  getNodeBody(node) {
    // body is most likely the last node
    let result = null
    for (let i = node.childCount - 1; i >= 0; i--) {
      let subnode = node.child(i)
      if (subnode.type == 'body') {
        result = subnode
        break
      }
    }
    return result
  },

  getNodeName(node) {
    return this.getFirstChildOfNodeWithType(node, 'name')
  },

  getNodeType(node) {
    return this.getFirstChildOfNodeWithType(node, 'type')
  },

	getNodeText(node, def='') {
		return node ? node.text : def
	},


  // -- Family Tree


  getLastChildOfNode(node) {
    if (node && node.childCount > 0)
      return node.child(node.childCount - 1)
    return null
  },

  getChildrenOfNodeWithTypes(node, types) {
    let children = []

    if (!node)
      return children

    for (let i = 0; i < node.childCount; i++) {
      let child = node.child(i)
      if (types.includes(child.type))
        children.push(child)
    }

    return children
  },

  getFirstChildOfNodeWithType(node, type) {
    const possibilities = this.getChildrenOfNodeWithTypes(node, [type])
    if (possibilities.length > 0)
      return possibilities[0]
    return null
  },

  getPreviousSiblingsOfNodeWithTypes(node, types) {
    let siblings = []
    while (node && node.previousSibling) {
      if (types.includes(node.type))
        siblings.push(node)
      node = node.previousSibling
    }
    return siblings
  },

  getClosestAncestorOfNodeWithTypes(node, types) {
    while (node && !(types.includes(node.type)), node = node.parent);
    return node
  },

}