import { Form, FormBinding } from '@domodel/form'

export default class extends FormBinding {

    constructor(properties) {
        super({ ...properties, form: new Form() })
    }
    
    onCreated() {
		
		super.onCreated()
    
        const { geneatree } = this.properties

		this.listen(this.properties.form, "submitted", data => {
			console.log(data)
		})
        
    }
}