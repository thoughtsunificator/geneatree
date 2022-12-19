import { Binding } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import HomeModel from "./router-tree-viewer/home.js"
import ViewerModel from "./router-tree-viewer/viewer.js"

import HomeBinding from "./router-tree-viewer/home.binding.js"
import ViewerBinding from "./router-tree-viewer/viewer.binding.js"

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
			new Route("/", HomeModel, HomeBinding),
			new Route("/viewer", ViewerModel, ViewerBinding),
		], Router.TYPE.VIRTUAL, null, null)

		this.run(RouterModel, {
			binding: new RouterBinding({ router })
		})

		this.listen(geneatree.trees, "selected", () => {
			router.emit("browse", { path: "/viewer", properties: { tree: geneatree.trees.selected } })
		})

		if(geneatree.trees.selected) {
			router.emit("browse", { path: "/viewer", properties: { tree: geneatree.trees.selected } })
		} else {
			router.emit("browse", { path: "/" })
		}

	}

}

export default TreeViewerBinding
