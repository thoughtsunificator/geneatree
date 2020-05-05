import { Observable, Model } from "domodel"
import { Router, Route } from "@domodel/router"

import { SOCKET_STATE_INITIAL } from "../persistence/socket.js"

import AboutModel from "../model/geneatree/view/about.js"
import SettingsModel from "../model/geneatree/view/settings.js"
import AddTreeBinding from "../model/geneatree/view/add-tree.binding.js"
import AddTreeModel from "../model/geneatree/view/add-tree.js"
import NewTreeBinding from "../model/geneatree/view/new-tree.binding.js"
import NewTreeModel from "../model/geneatree/view/new-tree.js"
import ImportTreeBinding from "../model/geneatree/view/import-tree.binding.js"
import ImportTreeModel from "../model/geneatree/view/import-tree.js"
import TreeBinding from "../model/geneatree/view/tree.binding.js"
import TreeModel from "../model/geneatree/view/tree.js"
import LogsModel from "../model/geneatree/view/logs.js"
import TreeViewerModel from "../model/geneatree/view/tree-viewer.js"
import HomeModel from "../model/geneatree/view/home.js"

import AboutBinding from "../model/geneatree/view/about.binding.js"
import SettingsBinding from "../model/geneatree/view/settings.binding.js"
import IndividualBinding from "../model/geneatree/view/individual.binding.js"
import IndividualModel from "../model/geneatree/view/individual.js"
import LogsBinding from "../model/geneatree/view/logs.binding.js"
import TreeViewerBinding from "../model/geneatree/view/tree-viewer.binding.js"
import HomeBinding from "../model/geneatree/view/home.binding.js"

import Log from "./log.js"
import Explorer from "./explorer.js"
import Individuals from "./individuals.js"
import Trees from "./trees.js"

/**
 * @global
 * Application object
 */
class Geneatree extends Observable {

	/**
	 * Default application settings
	 */
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
		this._explorer = new Explorer()
		this._individuals = new Individuals()
		this._trees = new Trees()
		this._router = new Router({
			routes: [
				new Route({ match: "/", model: new Model(HomeModel, HomeBinding) }),
				new Route({ match: "/viewer", model: new Model(TreeViewerModel, TreeViewerBinding) }),
				new Route({ match: "/logs", model: new Model(LogsModel, LogsBinding) }),
				new Route({ match: "/about", model: new Model(AboutModel, AboutBinding) }),
				new Route({ match: "/settings", model: new Model(SettingsModel, SettingsBinding) }),
				new Route({ match: "/tree/new", model: new Model(NewTreeModel, NewTreeBinding) }),
				new Route({ match: "/tree/add", model: new Model(AddTreeModel, AddTreeBinding) }),
				new Route({ match: "/tree/import", model: new Model(ImportTreeModel, ImportTreeBinding) }),
				new Route({ match: "/tree", model: new Model(TreeModel, TreeBinding) }),
				new Route({ match: "/tree/individual", model: new Model(IndividualModel, IndividualBinding) })
			]
		})
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
