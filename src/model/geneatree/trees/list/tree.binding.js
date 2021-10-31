import { Binding } from "domodel"

/**
 * @global
 */
class TreeBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree, tree } = this.properties

		this.root.addEventListener('focus', () => {
			if(geneatree.trees.selected !== tree) {
				geneatree.emit("tree select", tree)
			}
		})

		this.identifier.editButton.addEventListener('click', () => geneatree.emit("tree update popup", tree))

	}

}

export default TreeBinding
