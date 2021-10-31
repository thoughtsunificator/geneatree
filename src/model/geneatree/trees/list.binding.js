import { Core, Binding } from "domodel"

import ListEventListener from "./list.event.js"

/**
 * @global
 */
class ListBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties, new ListEventListener(properties.geneatree))
	}

}

export default ListBinding
