import { Binding } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import PlaceholderModel from "./tree-viewer/placeholder.js"
import ViewerModel from "./tree-viewer/viewer.js"

import PlaceholderBinding from "./tree-viewer/placeholder.binding.js"
import ViewerBinding from "./tree-viewer/viewer.binding.js"

import Log from "/object/log.js"

/**
 * @global
 */
class TreeViewerBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree } = this.properties

		const router = new Router([
			new Route("/", PlaceholderModel, PlaceholderBinding),
			new Route("/viewer", ViewerModel, ViewerBinding),
		], Router.TYPE.VIRTUAL, null, null)

		this.run(RouterModel, {
			binding: new RouterBinding({ router })
		})

		if(geneatree.trees.selected) {
			router.emit("browse", { path: "/viewer", properties: { tree: geneatree.trees.selected } })
		} else {
			router.emit("browse", { path: "/" })
		}

	}

}

export default TreeViewerBinding
