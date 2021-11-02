import { Observable } from "domodel"
import { Grid } from "@domodel/grid"
import { Router, Route } from "@domodel/router"

import { SOCKET_STATE_INITIAL } from "../persistence/socket.js"

import AboutModel from "/model/router/about.js"
import SettingsModel from "/model/router/settings.js"
import AddTreeBinding from "/model/router/add-tree.binding.js"
import AddTreeModel from "/model/router/add-tree.js"
import NewTreeBinding from "/model/router/new-tree.binding.js"
import NewTreeModel from "/model/router/new-tree.js"
import ImportTreeBinding from "/model/router/import-tree.binding.js"
import ImportTreeModel from "/model/router/import-tree.js"
import TreeBinding from "/model/router/tree.binding.js"
import TreeModel from "/model/router/tree.js"
import LogsModel from "/model/router/logs.js"
import TreeViewerModel from "/model/router/tree-viewer.js"

import AboutBinding from "/model/router/about.binding.js"
import SettingsBinding from "/model/router/settings.binding.js"
import AddChildBinding from "/model/router/add-child.binding.js"
import AddChildModel from "/model/router/add-child.js"
import AddSpouseBinding from "/model/router/add-spouse.binding.js"
import AddSpouseModel from "/model/router/add-spouse.js"
import AddParentBinding from "/model/router/add-parent.binding.js"
import AddParentModel from "/model/router/add-parent.js"
import IndividualBinding from "/model/router/individual.binding.js"
import IndividualModel from "/model/router/individual.js"
import LogsBinding from "/model/router/logs.binding.js"
import TreeViewerBinding from "/model/router/tree-viewer.binding.js"

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
		this._router = new Router([
			new Route("/", TreeViewerModel, TreeViewerBinding),
			new Route("/logs", LogsModel, LogsBinding),
			new Route("/about", AboutModel, AboutBinding),
			new Route("/settings", SettingsModel, SettingsBinding),
			new Route("/tree/new", NewTreeModel, NewTreeBinding),
			new Route("/tree/add", AddTreeModel, AddTreeBinding),
			new Route("/tree/import", ImportTreeModel, ImportTreeBinding),
			new Route("/tree", TreeModel, TreeBinding),
			new Route("/tree/add-parent", AddChildModel, AddChildBinding),
			new Route("/tree/add-child", AddParentModel, AddParentBinding),
			new Route("/tree/add-spouse", AddSpouseModel, AddSpouseBinding),
			new Route("/tree/individual", IndividualModel, IndividualBinding)
		], Router.TYPE.VIRTUAL)
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

	/**
	 * @readonly
	 * @type {Router}
	 */
	get router() {
		return this._router
	}

}

export default Geneatree
