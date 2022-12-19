import { Core, Observable, Binding } from "domodel"
import { Form, FormModel, FormBinding } from "@domodel/form"

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

		this.identifier.delete.addEventListener("click", () => geneatree.individuals.emit("remove", individual))

	}

}