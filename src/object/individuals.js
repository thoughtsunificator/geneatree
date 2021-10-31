import { Observable } from "domodel"

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
	}

	/**
	 * @type {[type]}
	 */
	get list() {
		return this._list
	}

}

export default Individuals
