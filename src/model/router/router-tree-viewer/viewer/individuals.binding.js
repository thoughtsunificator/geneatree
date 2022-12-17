import { Core, Binding } from "domodel"
import GridModel from "./grid.js"
import GridBinding from "./grid.binding.js"

import IndividualsEventListener from "./individuals.event.js"

/**
 * @global
 */
class IndividualsBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties, new IndividualsEventListener(properties.geneatree.individuals))
	}

	onCreated() {

		const { geneatree, tree } = this.properties

		this.listen(geneatree.explorer, "coordinatesSet", data => {
			this.root.style.left = data.x + "px"
			this.root.style.top = data.y + "px"
		})

		this.listen(geneatree.explorer, "scaleSet", data => {
			this.root.style.transform = `scale(${data})`
		})

		this.identifier.focusOne.addEventListener("focus", () => {
			if(tree !== null && tree.individuals.length >= 1) {
				tree.individuals[tree.individuals.length - 1].emit("nodeFocus")
			}
		})

		this.identifier.focusTwo.addEventListener("focus", () => {
			if(tree !== null && tree.individuals.length >= 1) {
				tree.individuals[0].emit("nodeFocus")
			}
		})

		this.run(GridModel, { parentNode: this.identifier.list, binding: new GridBinding() })
	}

}

export default IndividualsBinding
