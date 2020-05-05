import { Core, Binding } from "domodel"

import NewTreePopupModel from "./new-tree.js"

/**
 * @global
 */
class NewTreeBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		this.identifier.createButton.addEventListener("click", () => {
			geneatree.router.emit("browse", { path: "/tree/add" })
		})

		this.identifier.importButton.addEventListener("click", () => {
			geneatree.router.emit("browse", { path: "/tree/import" })
		})

	}

}

export default NewTreeBinding
