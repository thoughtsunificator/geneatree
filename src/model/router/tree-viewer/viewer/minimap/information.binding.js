import { Binding } from "domodel"

/**
 * @global
 */
class InformationBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree } = this.properties

		this.listen(geneatree, "tree viewer coordinates updated", data => {
			this.identifier.coordinates.textContent = `${parseInt(data.x)}, ${parseInt(data.y)}`
		})

		this.listen(geneatree, "tree viewer scale updated", data => {
			this.identifier.scale.textContent = `x${parseFloat(data).toFixed(2)}`
		})

	}

}

export default InformationBinding
