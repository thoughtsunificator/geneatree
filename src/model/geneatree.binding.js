import { Binding } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import AboutModel from "./router/about.js"
import SettingsBinding from "./router/settings.binding.js"
import SettingsModel from "./router/settings.js"
import AddTreeBinding from "./router/add-tree.binding.js"
import AddTreeModel from "./router/add-tree.js"
import NewTreeBinding from "./router/new-tree.binding.js"
import NewTreeModel from "./router/new-tree.js"
import ImportTreeBinding from "./router/import-tree.binding.js"
import ImportTreeModel from "./router/import-tree.js"
import TreeBinding from "./router/tree.binding.js"
import TreeModel from "./router/tree.js"
import LogsModel from "./router/logs.js"
import TreeViewerModel from "./router/tree-viewer.js"

import AboutBinding from "./router/about.binding.js"
import AddChildBinding from "./router/add-child.binding.js"
import AddChildModel from "./router/add-child.js"
import AddSpouseBinding from "./router/add-spouse.binding.js"
import AddSpouseModel from "./router/add-spouse.js"
import AddParentBinding from "./router/add-parent.binding.js"
import AddParentModel from "./router/add-parent.js"
import IndividualBinding from "./router/individual.binding.js"
import IndividualModel from "./router/individual.js"
import LogsBinding from "./router/logs.binding.js"
import TreeViewerBinding from "./router/tree-viewer.binding.js"

import GeneatreeEventListener from "./geneatree.event.js"

export const THEMES = [
	"white",
	"pattern",
	"dark"
]
export const TREE_FORMATS_EXPORT = ["geneatree", "GEDCOM", "PNG"]
export const TREE_FORMATS_IMPORT = ["geneatree", "GEDCOM"]
export const LOGS_FORMATS_EXPORT = ["json"]

/**
 * @global
 */
class GeneatreeBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties, new GeneatreeEventListener(properties.geneatree))
	}

	onCreated() {

		const { geneatree } = this.properties

		if(geneatree.trees.list.length === 0) {
			this.identifier.treesToggle.style.display = "none"
			this.identifier.router.style.gridColumn = "span 2"
		}

		this.root.classList.add(`theme-${geneatree.settings.theme}`)

		this.identifier.treesToggle.addEventListener("click", () => geneatree.trees.emit("toggle", { toggle: !geneatree.trees.toggled }))

		this.listen(geneatree, "settingSaved", () => {
			const className = `theme-${geneatree.settings.theme}`
			if(!this.root.classList.contains(className)) {
				this.root.classList.remove(...THEMES.map(theme => `theme-${theme}`))
				this.root.classList.add(className)
			}
		})

		this.listen(geneatree, "tree viewer drag started", () => this.root.style.userSelect = "none")
		this.listen(geneatree, "tree viewer drag ended", () => this.root.style.userSelect = "")

		geneatree.router = new Router([
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

		geneatree.router.listen("browse", data => {
			if(data.path === "/") {
				this.identifier.router.classList.add("viewer")
			} else {
				this.identifier.router.classList.remove("viewer")
			}
		})

		this.run(RouterModel, {
			parentNode: this.identifier.router,
			binding: new RouterBinding({ router: geneatree.router })
		})

	}

}

export default GeneatreeBinding
