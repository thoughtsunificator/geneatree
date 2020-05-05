import { Binding } from "domodel"

/**
 * @global
 */
class ActionBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		this.identifier.deleteOfflineData.addEventListener("click", () => {
			geneatree.emit("persistenceIndexeddbClear")
		})

	}

}

export default ActionBinding
