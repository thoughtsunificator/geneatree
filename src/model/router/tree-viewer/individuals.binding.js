import { Core, Binding } from "domodel"
import { GridModel, GridBinding } from "@domodel/grid"

import Log from "/object/log.js"

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

		const { geneatree } = this.properties

		this.listen(geneatree.explorer, "coordinates update", data => {
			this.root.style.left = data.x + "px"
			this.root.style.top = data.y + "px"
		})

		this.listen(geneatree.explorer, "scale update", data => {
			this.root.style.transform = `scale(${data})`
		})

		this.identifier.focusOne.addEventListener("focus", () => {
			if(geneatree.trees.selected !== null && geneatree.trees.selected.individuals.length >= 1) {
				geneatree.trees.selected.individuals[geneatree.trees.selected.individuals.length - 1].emit("node focus")
			}
		})

		this.identifier.focusTwo.addEventListener("focus", () => {
			if(geneatree.trees.selected !== null && geneatree.trees.selected.individuals.length >= 1) {
				geneatree.trees.selected.individuals[0].emit("node focus")
			}
		})

		this.run(GridModel, { parentNode: this.identifier.list, binding: new GridBinding({ grid: geneatree.grid }) })


	}

}

export default IndividualsBinding
