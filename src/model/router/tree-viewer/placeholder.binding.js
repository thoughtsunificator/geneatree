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

		this.listen(geneatree, "tree selected", () => {
			this.root.style.display = "none"
		})

		this.listen(geneatree, "tree filtered", data => {
			if(data.trees.length > 1 || data.trees.length === 0) {
				this.root.style.display = ""
				this.identifier.addTree.style.display = "none"
				this.identifier.selectTree.style.display = ""
			}
		})

		this.listen(geneatree, "tree added", () => {
			this.root.style.display = ""
			this.identifier.addTree.style.display = "none"
			this.identifier.selectTree.style.display = ""
		})

		this.listen(geneatree, "tree removed", () => {
			if(geneatree.trees.list.length === 0) {
				this.identifier.addTree.style.display = "grid"
				this.identifier.selectTree.style.display = "none"
				this.root.style.display = ""
			} else if(geneatree.trees.selected === null) {
				this.root.style.display = ""
				this.identifier.addTree.style.display = "none"
				this.identifier.selectTree.style.display = ""
			}
		})

		this.identifier.createButton.addEventListener("click", () => {
			geneatree.router.emit("browse", { path: "/tree/add" })
		})

		this.identifier.importButton.addEventListener("click", () => {
			geneatree.emit("tree import popup")
		})

	}

}

export default PlaceholderBinding
