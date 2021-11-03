import { FormBinding } from "@domodel/form"

/**
 * @global
 */
class AddSpouseFormBinding extends FormBinding {

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

		this.identifier.unionTypeSelect.addEventListener("change", event => {
			if(event.target.selectedIndex === 0) {
				this.identifier.addRelationship.disabled = true
			}
		})
	}

}

export default AddSpouseFormBinding
