import { Binding } from "domodel"

import TreeEventListener from "./tree.event.js"

/**
 * @global
 */
class TreeBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties, new TreeEventListener(properties.tree))
	}

	onCreated() {

		const { geneatree, tree } = this.properties

		this.root.addEventListener('focus', () => {
			if(geneatree.trees.selected !== tree) {
				console.log(tree)
				geneatree.trees.emit("select", tree)
			}
		})

		this.identifier.editButton.addEventListener('click', () => geneatree.router.emit("browse", { path: "/tree", properties: { tree } }))

	}

}

export default TreeBinding
