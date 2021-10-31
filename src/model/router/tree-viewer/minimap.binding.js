import { Binding } from "domodel"

export const WIDTH = 100
export const HEIGHT = 50

/**
 * @global
 */
class MinimapBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	initialize() {
		if(this.properties.geneatree.settings.minimap && this.properties.geneatree.trees.selected !== null) {
			this.root.style.display = "grid"
		} else {
			this.root.style.display = "none"
		}
	}

	onCreated() {

		const { geneatree } = this.properties

		this.listen(geneatree, "settings saved", () => this.initialize())

		this.listen(geneatree, "tree removed", () => this.initialize())

		this.listen(geneatree, "tree selected", () => this.initialize())

	}

}

export default MinimapBinding
