import { Observable } from 'domodel'

/**
 * @global
 */
class Persistable extends Observable {

	/**
	 * @param {number} id
	 */
	constructor(id) {
		super()
		this._id = id
		this._networkId = -1
		this._offlineId = -1
		this._createdAt = new Date()
	}

	/**
	 * @type {number}
	 */
	get id() {
		return this._id
	}

	/**
	 * @type {number}
	 */
	get networkId() {
		return this._networkId
	}

	set networkId(networkId) {
		this._networkId = networkId
	}

	/**
	 * @type {number}
	 */
	get offlineId() {
		return this._offlineId
	}

	set offlineId(offlineId) {
		this._offlineId = offlineId
	}

	/**
	 * @type {Date}
	 */
	get createdAt() {
		return this._createdAt
	}

}

export default Persistable
