import { Observable } from "domodel"
import { Grid } from "@thoughtsunificator/grid"


/**
 * @global
 */
class Individuals extends Observable {

	/**
	 * @param {[type]} list
	 */
	constructor() {
		super()
		this._list = []
		this._grid = new Grid()
	}

	/**
	 * @type {[type]}
	 */
	get list() {
		return this._list
	}

}

export default Individuals
