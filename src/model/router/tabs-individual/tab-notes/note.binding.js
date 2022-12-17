import { ItemBinding } from "@domodel/paginator"

/**
 * @global
 */
class NoteBinding extends ItemBinding {

	onCreated() {

		super.onCreated(this.properties)

		const { application: geneatree, individual, note, page } = this.properties

		this.identifier.edit.addEventListener("click", () => geneatree.emit("individualNotesUpdatePopup", note))
		this.identifier.remove.addEventListener("click", () => geneatree.emit("individualNotesRemove", note))

	}

}

export default NoteBinding
