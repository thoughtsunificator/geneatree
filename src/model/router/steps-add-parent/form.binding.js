import { FormBinding } from "@domodel/form"

/**
 * @global
 */
class AddParentFormBinding extends FormBinding {

	/**
	 * @param {object}    properties
	 * @param {Form}      properties.form
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		super.onCreated()

		const { form, geneatree } = this.properties

		this.identifier.adopted.addEventListener("change", event => {
			if (event.target.checked) {
				this.identifier.radios_adopted.style.display = "grid"
			} else {
				this.identifier.radios_adopted.style.display = "none"
			}
		})

	}

}

export default AddParentFormBinding
