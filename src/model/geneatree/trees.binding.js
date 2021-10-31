import { Binding } from "domodel"

import TreesEventListener from "./trees.event.js"

/**
 * @global
 */
class TreesBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties, new TreesEventListener(properties.geneatree.trees))
	}

	onCreated() {

		const { geneatree } = this.properties

		if(geneatree.trees.list.length === 0) {
			this.root.style.display = "none"
		}

		this.identifier.addButton.addEventListener("click", () => geneatree.router.emit("browse", { path: "/tree/new" }))

	}

}

export default TreesBinding
