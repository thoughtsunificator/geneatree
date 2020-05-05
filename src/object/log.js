import { Observable } from 'domodel'

/**
 * @global
 */
class Log extends Observable {

	/**
	 * @typedef {string} LogType
	 * @enum {LogType}
	 */
	static TYPE = {
		INFO: "info",
		WARNING: "warning",
		ERROR: "error",
		DEBUG: "debug"
	}


	/**
	 * @param   {string}            message
	 * @param   {LogType}           type
	 * @param   {*} 								data
	 */
	constructor(message, data, type) {
		super()
		this._message = message
		this._data = data
		this._type = type
		this._date = new Date()
	}

	/**
	 * @type {string}
	 */
	get message() {
		return this._message
	}

	/**
	 * @type {Date}
	 */
	get data() {
		return this._data
	}

	/**
	 * @type {LogType}
	 */
	get type() {
		return this._type
	}

	/**
	 * @type {Date}
	 */
	get date() {
		return this._date
	}

}

export default Log
