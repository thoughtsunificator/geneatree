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

		super.onCreated()
        
		this.listen(this.properties.step, "set", data => {
            this.properties.form.emit("focus")
		})

		this.listen(this.properties.form, "submitted", data => this.properties.steps.emit("stepNext", data))
        
    }
}