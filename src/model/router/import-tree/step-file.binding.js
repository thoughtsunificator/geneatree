import { FormBinding } from "@domodel/form"

class StepFileFormBinding extends FormBinding {

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

		this.identifier.format.addEventListener("change", event => {
			if(event.target.value === "GEDCOM") {
				this.identifier.file.accept = ".GED"
			} else if(event.target.value === "geneatree") {
				this.identifier.file.accept = ".json"
			}
		})

	}

}

export default StepFileFormBinding
