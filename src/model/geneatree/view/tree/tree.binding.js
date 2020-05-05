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

		const { geneatree, tree } = this.properties

		super.onCreated()

		this.listen(this.properties.tab, "set", data => {
			this.properties.form.emit("load", this.properties.tree.meta)
			this.properties.form.emit("focus")
		})

		this.listen(this.properties.form, "submitted", data => {
			geneatree.trees.emit("update", { tree, form: data })
			geneatree.emit("osdSet", { text: "Tree updated", type: "valid" })
		})

	}

}
