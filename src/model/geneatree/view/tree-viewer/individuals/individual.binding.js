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

		const { geneatree, individual, tree } = this.properties

		this.identifier.self.addEventListener("click", () => {
			if(tree.selectedIndividual === individual) {
				geneatree.router.emit("browse", { path: "/tree/individual", properties: { individual } })
			} else {
				geneatree.individuals.emit("select", individual)
			}
		})

		this.identifier.addParent.addEventListener("click", () => geneatree.router.emit("browse", { path: "/tree/add-parent", properties: { tree: tree, individual: tree.selectedIndividual } }))
		this.identifier.addSpouse.addEventListener("click", () => geneatree.router.emit("browse", { path: "/tree/add-spouse", properties: { tree: tree, individual: tree.selectedIndividual } }))
		this.identifier.addChild.addEventListener("click", () => geneatree.router.emit("browse", { path: "/tree/add-child", properties: { tree: tree, individual: tree.selectedIndividual } }))

	}

	async onRendered() {

		const { geneatree, individual, tree } = this.properties

		this.listen(individual, "nodeCenter", () => {
			const rect = this.root.getBoundingClientRect()
			const x = Math.abs(tree.viewer.x - rect.x)
			const y = Math.abs(tree.viewer.y - rect.y)
			geneatree.emit("treeViewerFocus", { x, y })
		})

	}

}

export default IndividualBinding
