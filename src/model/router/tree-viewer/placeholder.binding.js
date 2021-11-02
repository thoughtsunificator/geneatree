import { Binding } from "domodel"

/**
 * @global
 */
class PlaceholderBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree } = this.properties

		if(geneatree.trees.list.length >= 1) {
			this.identifier.addTree.style.display = "none"
			this.identifier.selectTree.style.display = "grid"
		} else {
			this.identifier.addTree.style.display = "grid"
			this.identifier.selectTree.style.display = "none"
		}

		this.identifier.createButton.addEventListener("click", () => {
			geneatree.router.emit("browse", { path: "/tree/add" })
		})

		this.identifier.importButton.addEventListener("click", () => {
			geneatree.router.emit("browse", { path: "/tree/import" })
		})

	}

}

export default PlaceholderBinding
