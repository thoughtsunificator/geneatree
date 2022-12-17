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

		this.listen(geneatree.trees, "added", () => this.render())
		this.listen(geneatree.trees, "selected", () => this.render())
		this.listen(geneatree.trees, "removed", () => this.render())

		this.identifier.createButton.addEventListener("click", () => {
			geneatree.router.emit("browse", { path: "/tree/add" })
		})

		this.identifier.importButton.addEventListener("click", () => {
			geneatree.router.emit("browse", { path: "/tree/import" })
		})

		this.render()

	}

	render() {
		if(this.properties.geneatree.trees.selected !== null) {
			this.root.style.display = "none"
		} else {
			this.root.style.display = ""
			if(this.properties.geneatree.trees.list.length >= 1) {
				this.identifier.addTree.style.display = "none"
				this.identifier.selectTree.style.display = "grid"
			} else {
				this.identifier.addTree.style.display = "grid"
				this.identifier.selectTree.style.display = "none"
			}
		}
	}

}

export default PlaceholderBinding
