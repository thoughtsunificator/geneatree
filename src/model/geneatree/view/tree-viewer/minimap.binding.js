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

}

export default MinimapBinding
