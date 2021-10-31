import { ItemBinding } from "@domodel/paginator"

/**
 * @global
 */
class NoteBinding extends ItemBinding {

	onCreated() {

		super.onCreated(this.properties)

		const { application: geneatree, individual, note, page } = this.properties

		this.identifier.edit.addEventListener("click", () => geneatree.emit("individual notes update popup", note))
		this.identifier.remove.addEventListener("click", () => geneatree.emit("individual notes remove", note))

	}

}

export default NoteBinding
