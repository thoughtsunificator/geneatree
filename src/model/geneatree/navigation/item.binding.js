import { Binding } from "domodel"

/**
 * @global
 */
class ItemBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 * @param {string}    properties.path
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { path, geneatree } = this.properties

		this.listen(geneatree.router, "browse", data => {
			if(data.path === path) {
				if(data.osd) {
					this.properties.geneatree.emit("osdSet", { text: `Navigated to ${this.properties.title}`, type: "info" })
				}
				this.root.classList.add("active")
			} else {
				this.root.classList.remove("active")
			}
		})

		this.root.addEventListener("click", () => geneatree.router.emit("browse", { path, osd: true }))


	}

}

export default ItemBinding
