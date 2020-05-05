import { Form, FormBinding } from '@domodel/form'

export default class extends FormBinding {

    constructor(properties) {
        super({ ...properties, form: new Form() })
    }

    onCreated() {

			super.onCreated()

			const { geneatree, form, router, individual } = this.properties

			this.listen(form, "submitted", data => {
				const note = individual.addNote(data.title, data.content, data.author, new Date())
				geneatree.individuals.emit("notesAdded", note)
				router.emit("browse", { path: "/" })
				geneatree.emit("osdSet", { text: "Note added", type: "valid" })
			})

    }
}
