import { Binding, Core } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import GeneatreeEventListener from "./geneatree.event.js"

export const THEMES = [
	"classic",
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

		this.root.classList.add(`theme-${geneatree.settings.theme}`)

		this.identifier.treesToggle.addEventListener("click", () => geneatree.trees.emit("toggle", { toggle: !geneatree.trees.toggled }))

		this.listen(geneatree.trees, "toggle", data => {
			if(data.toggle === true) {
				this.identifier.router.style.gridColumn = ""
			} else {
				this.identifier.router.style.gridColumn = "span 2"
			}
		})

		this.listen(geneatree.router, "browse", data => {
			if(data.path === "/viewer") {
				this.identifier.router.classList.add("viewer")
			} else {
				if(geneatree.trees.selected) {
					geneatree.trees.emit("unselect", geneatree.trees.selected)
				}
				this.identifier.router.classList.remove("viewer")
			}
		})

		this.listen(geneatree.explorer, "dragStarted", () => {
			this.root.style.userSelect = "none"
		})

		this.listen(geneatree.explorer, "dragEnded", () => {
			this.root.style.userSelect = ""
		})

		this.run(RouterModel, {
			method: Core.METHOD.INSERT_BEFORE,
			parentNode: this.identifier.navigation.root,
			binding: new RouterBinding({ router: geneatree.router })
		})

	}

}

export default GeneatreeBinding
