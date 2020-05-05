import { Binding } from "domodel"
import { Form } from "@domodel/form"
import Log from "../../../../object/log.js"

/**
 * @global
 */
export default class extends Binding {

	onCreated() {

		const { geneatree, tab, individual } = this.properties

		const _form = new Form()

		this.listen(_form, "submitted", data => {
			console.log(data)
		})

		this.listen(geneatree.individuals, "selected", individual => {
			this.identifier.delete.disabled = individual.meta.decujus
		})

		this.identifier.delete.addEventListener("click", () => {
			this.properties.geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] individualRemove", individual })
			individual.tree.removeIndividual(individual)
			individual.emit("remove")
			if(individual.tree.individuals.length === 0) {
				this.root.style.cursor = ""
				this.properties.geneatree.explorer.emit("dragReset")
			}
			geneatree.emit("osdSet", { text: "Individual removed", type: "valid" })
			this.properties.geneatree.router.emit("browse", { path: "/viewer", properties: { tree: individual.tree } })
		})

		this.identifier.view.addEventListener("click", () => {
			this.properties.geneatree.router.emit("browse", { path: "/viewer", properties: { tree: individual.tree, showcasedIndividual: individual } })
		})

	}

}
