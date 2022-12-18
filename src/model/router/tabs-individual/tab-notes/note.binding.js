import { ItemBinding } from "@domodel/paginator"

/**
 * @global
 */
class NoteBinding extends ItemBinding {

	onCreated() {

		super.onCreated(this.properties)

		const { application: geneatree, individual, note, page } = this.properties

		this.identifier.edit.addEventListener("click", () => geneatree.individuals.emit("notesUpdatePopup", note))
		this.identifier.remove.addEventListener("click", () => geneatree.individuals.emit("notesRemove", note))

	}

}

export default NoteBinding
