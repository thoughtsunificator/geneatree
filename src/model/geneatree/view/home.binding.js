import { Binding } from "domodel"

/**
 * @global
 */
class HomeBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

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

export default HomeBinding
