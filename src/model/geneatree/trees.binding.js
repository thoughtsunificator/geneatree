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

	}

}

export default TreesBinding
