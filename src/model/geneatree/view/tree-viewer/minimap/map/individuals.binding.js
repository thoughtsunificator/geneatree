import { Core, Binding } from "domodel"
import GridModel from "./grid.js"
import GridBinding from "./grid.binding.js"

import IndividualModel from "./individuals/individual.js"

import IndividualBinding from "./individuals/individual.binding.js"

/**
 * @global
 */
class IndividualsBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree } = this.properties

		this.listen(geneatree, "treeViewerMinimapCoordinatesUpdated", data => {
			this.root.style.left = data.cursorX + "px"
			this.root.style.top = data.cursorY + "px"
		})

		this.run(GridModel, { parentNode: this.root, binding: new GridBinding({ }) })
	}

}

export default IndividualsBinding
