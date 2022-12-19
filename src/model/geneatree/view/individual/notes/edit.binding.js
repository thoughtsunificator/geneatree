import { Form, FormBinding } from '@domodel/form'

export default class extends FormBinding {

    constructor(properties) {
        super({ ...properties, form: new Form() })
    }
    
    onCreated() {

        super.onCreated()
    
        const { geneatree, form, router } = this.properties

        this.listen(form, "submitted", data => {
            this.properties.note.update(data)
            geneatree.individuals.emit("notesUpdated", { note: this.properties.note, form: data })
            router.emit("browse", { path: "/" })
		    geneatree.emit("osdSet", { text: "Note updated", type: "valid" })
		})
        
    }
}