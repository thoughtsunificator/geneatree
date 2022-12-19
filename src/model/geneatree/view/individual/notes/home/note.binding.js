import { ItemBinding } from "@domodel/paginator"

/**
 * @global
 */
class NoteBinding extends ItemBinding {

	onCreated() {

		super.onCreated(this.properties)

		const { geneatree, individual, note, page, router } = this.properties

		this.identifier.edit.addEventListener("click", () => router.emit("browse", { path: "/edit", properties: { note } }))
		this.identifier.remove.addEventListener("click", () => {
			individual.removeNote(note)
			note.emit("remove")
			this.properties.geneatree.individuals.emit("notesRemoved", note)
		    geneatree.emit("osdSet", { text: "Note removed", type: "valid" })
		})

	}

}

export default NoteBinding
