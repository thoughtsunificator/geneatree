import { Core, Binding } from "domodel"
// import { GridModel, GridBinding } from "@domodel/grid"

import Log from "../../../../object/log.js"

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
				tree.individuals[tree.individuals.length - 1].emit("node focus")
			}
		})

		this.identifier.focusTwo.addEventListener("focus", () => {
			if(tree !== null && tree.individuals.length >= 1) {
				tree.individuals[0].emit("node focus")
			}
		})

		// this.run(GridModel, { parentNode: this.identifier.list, binding: new GridBinding({ grid: geneatree.grid }) })

		// for(const individual of tree.individuals) {
		// 	geneatree.emit("gridFill", { data: individual, x: individual.cell ? individual.cell.x : 0, y: individual.cell ? individual.cell.y : 0 })
		// }

	}

}

export default IndividualsBinding
