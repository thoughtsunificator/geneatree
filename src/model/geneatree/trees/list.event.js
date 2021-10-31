import { Core, EventListener } from "domodel"

import TreeModel from "./list/tree.js"

import TreeBinding from "./list/tree.binding.js"

/**
 * @global
 */
class ListEventListener extends EventListener {

	treeListAdd() {
		const { geneatree } = this.properties
		if(geneatree.trees.list.length > 1) {
			this.run(TreeModel(data), { method: Core.METHOD.PREPEND, parentNode: this.root, binding: new TreeBinding({ geneatree, tree: data }) })
		} else {
			this.run(TreeModel(data), { parentNode: this.root, binding: new TreeBinding({ geneatree, tree: data }) })
		}
	}

}

export default ListEventListener
