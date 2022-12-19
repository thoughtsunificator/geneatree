import { Binding } from "domodel"

import IndividualEventListener from "./individual.event.js"

/**
 * @global
 */
class IndividualBinding extends Binding {

	/**
	 * @param {object}     properties
	 * @param {Geneatree}  properties.geneatree
	 * @param {Individual} properties.individual
	 */
	constructor(properties) {
		super(properties, new IndividualEventListener(properties.individual))
	}

	onCreated() {

		const { geneatree, individual, cell } = this.properties

		individual.cell = cell

		this.identifier.self.addEventListener("click", () => {
			if(geneatree.trees.selected.selectedIndividual === individual) {
				geneatree.router.emit("browse", { path: "/tree/individual", properties: { individual } })
			} else {
				geneatree.individuals.emit("select", individual)
			}
		})

		this.identifier.addParent.addEventListener("click", () => geneatree.router.emit("browse", { path: "/tree/add-parent" }))
		this.identifier.addSpouse.addEventListener("click", () => geneatree.router.emit("browse", { path: "/tree/add-spouse" }))
		this.identifier.addChild.addEventListener("click", () => geneatree.router.emit("browse", { path: "/tree/add-child" }))

	}

	onCompleted() {

		const { geneatree, individual } = this.properties

		this.listen(individual, "nodeCenter", () => {
			const rect = this.root.getBoundingClientRect()
			const x = Math.abs(geneatree.trees.selected.viewer.x - rect.x)
			const y = Math.abs(geneatree.trees.selected.viewer.y - rect.y)
			geneatree.emit("treeViewerFocus", { x, y })
		})

	}

}

export default IndividualBinding
