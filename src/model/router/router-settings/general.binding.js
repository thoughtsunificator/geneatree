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

		this.properties.form.listen("submitted", data => {
			geneatree.emit("settings set", data)
			geneatree.emit("tree viewer osd set", { text: "Settings updated", type: "info", duration: 1500 })
		})

		this.properties.form.emit("load", geneatree.settings)

	}

}

export default GeneralBinding
