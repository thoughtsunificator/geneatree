import { Binding } from "domodel"
import { Form, FormBinding } from '@domodel/form'

/**
 * @global
 */
class GeneralBinding extends FormBinding {

	constructor() {
		const form = new Form()
		super({ form })
		this.properties.form = form
	}

	onCreated() {

		super.onCreated()

		const { geneatree } = this.properties

		this.listen(this.properties.form, "submitted", data => {
			geneatree.emit("settingsSet", data)
			geneatree.emit("osdSet", { text: "Settings updated", type: "info", duration: 1500 })
		})

		this.properties.form.emit("load", geneatree.settings)

	}

}

export default GeneralBinding
