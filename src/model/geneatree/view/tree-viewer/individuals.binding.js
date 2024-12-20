import { Core, Binding } from "domodel"

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

		this.listen(geneatree.explorer, "ready", data => {
			if(this.properties.showcasedIndividual) {
				this.properties.showcasedIndividual.emit("nodeAnimate")
			} else {
				tree.individuals[0].emit("nodeAnimate")
			}
		})

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
	}

}

export default IndividualsBinding
