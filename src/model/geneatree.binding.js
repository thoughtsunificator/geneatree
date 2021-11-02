import { Binding } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

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

		this.listen(geneatree, "settings saved", () => {
			const className = `theme-${geneatree.settings.theme}`
			if(!this.root.classList.contains(className)) {
				this.root.classList.remove(...THEMES.map(theme => `theme-${theme}`))
				this.root.classList.add(className)
			}
		})

		geneatree.trees.listen("add", async data => {
			this.identifier.treesToggle.style.display = ""
			geneatree.trees.emit("toggle", { toggle: true })
		})

		geneatree.trees.listen("remove", async data => {
			if(geneatree.trees.length === 0) {
				this.identifier.treesToggle.style.display = "none"
				geneatree.trees.emit("toggle", { toggle: false })
			}
		})

		this.listen(geneatree.trees, "toggle", data => {
			if(data.toggle === true) {
				this.identifier.router.style.gridColumn = ""
			} else {
				this.identifier.router.style.gridColumn = "span 2"
			}
		})

		this.listen(geneatree, "treeViewerDragStarted", () => this.root.style.userSelect = "none")
		this.listen(geneatree, "treeViewerDragEnded", () => this.root.style.userSelect = "")

		geneatree.router.listen("browse", data => {
			if(data.path === "/") {
				this.identifier.router.classList.add("viewer")
				if(geneatree.trees.list.length >= 1) {
					geneatree.trees.emit("toggle", { toggle: true })
				}
			} else {
				this.identifier.router.classList.remove("viewer")
				geneatree.trees.emit("toggle", { toggle: false })
			}
		})

		this.run(RouterModel, {
			parentNode: this.identifier.router,
			binding: new RouterBinding({ router: geneatree.router })
		})

	}

}

export default GeneatreeBinding
