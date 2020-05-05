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
			geneatree.individuals.emit("select", individual) // FIXME remove select feature entirely
			geneatree.router.emit("browse", { path: "/tree/individual", properties: { individual } })
		})

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
