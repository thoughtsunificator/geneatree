import { Binding } from "domodel"

import FilterEventListener from "./filter.event.js"

/**
 * @global
 */
class FilterBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties, new FilterEventListener(properties.geneatree))
	}

	onCreated() {

		const { geneatree } = this.properties

		this.identifier.input.addEventListener("input", event => {
			if(geneatree.trees.list.length >= 1) {
				geneatree.emit("tree filter", event.target.value)
			}
		})


	}

}

export default FilterBinding
