import { Observable } from "domodel"
import { Grid } from "@domodel/grid"

import { SOCKET_STATE_INITIAL } from "../persistence/socket.js"

import Log from "./log.js"
import Explorer from "./explorer.js"
import Individuals from "./individuals.js"
import Trees from "./trees.js"

/**
 * @global
 */
class Geneatree extends Observable {

	static SETTINGS = {
		offline: false,
		minimap: true,
		osd: true,
		theme: "white"
	}

	constructor() {
		super()
		this._logs = []
		this._socketState = SOCKET_STATE_INITIAL
		this._settings = { ...Geneatree.SETTINGS }
		this._grid = new Grid()
		this._explorer = new Explorer()
		this._individuals = new Individuals()
		this._trees = new Trees()
	}

	log(message, data, type) {
		const log = new Log(message, data, type)
		this._logs.push(log)
		return log
	}

	/**
	 * @param  {object} data
	 * @returns {Log[]}
	 */
	findLogs(data) {
		const lowerCaseInput = data.query.toLowerCase()
		return this._logs.filter(log => log.message.toLowerCase().includes(lowerCaseInput) && ((data.type === null && log.type !== Log.TYPE.DEBUG) || data.types[log.type] === true))
	}

	/**
	 * @readonly
	 * @type {Log[]}
	 */
	get logs() {
		return this._logs
	}

	/**
	 * @readonly
	 * @type {Tree[]}
	 */
	get trees() {
		return this._trees
	}

	/**
	 * @type {object}
	 */
	get settings() {
		return this._settings
	}

	set settings(settings) {
		this._settings = settings
	}

	/**
	 * @type {boolean}
	 */
	get socketState() {
		return this._socketState
	}

	set socketState(socketState) {
		this._socketState = socketState
	}

	/**
	 * @type {Grid}
	 */
	get grid() {
		return this._grid
	}

	/**
	 * @readonly
	 * @type {type}
	 */
	get explorer() {
		return this._explorer
	}

	/**
	 * @readonly
	 * @type {type}
	 */
	get individuals() {
		return this._individuals
	}

}

export default Geneatree
