import { Form, FormBinding } from '@domodel/form'

/**
 * @global
 */
class GeneralBinding extends FormBinding {

	constructor(properties) {
		super({ ...properties, form: new Form() })
	}

	onCreated() {

		super.onCreated()

		const { geneatree } = this.properties

		this.listen(this.properties.form, "submitted", data => {
			geneatree.emit("settingsSet", data)
			geneatree.emit("osdSet", { text: "Settings updated", type: "valid" })
		})

		this.properties.form.emit("load", geneatree.settings)

	}

}

export default GeneralBinding
