import { Form, FormBinding } from "@domodel/form"

export default class extends FormBinding {

	/**
	 * @param {object}    properties
	 * @param {Form}      properties.form
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super({ ...properties, form: new Form() })
	}

	onCreated() {

		const { geneatree, individual } = this.properties

		super.onCreated()

		this.listen(this.properties.tab, "set", data => {
			this.properties.form.emit("load", this.properties.individual.meta)
			this.properties.form.emit("focus")
		})

		this.listen(this.properties.form, "submitted", data => {
			individual.update(data)
			geneatree.individuals.emit("updated", { individual, form: data })
			geneatree.emit("osdSet", { text: "Individual updated", type: "valid" })
			geneatree.router.emit("browse", { path: "/viewer", properties: { tree: individual.tree, showcasedIndividual: individual } })
		})

	}

}
