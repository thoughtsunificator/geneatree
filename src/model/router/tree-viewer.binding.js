import { Binding } from "domodel"

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

		this.listen(geneatree.trees, "add", data => {
			this.identifier.treesToggle.style.display = ""
			geneatree.trees.emit("toggle", { toggle: true })
		})

		this.listen(geneatree.trees, "remove", data => {
			data.individuals.forEach(individual => individual.emit("node remove"))
		})

		this.listen(geneatree.trees, "remove", data => {
			if(geneatree.trees.list.length === 0) {
				this.identifier.treesToggle.style.display = "none"
				geneatree.trees.emit("toggle", { toggle: false })
			}
		})

		this.listen(geneatree.trees, "toggle", data => {
			if(data.toggle === true) {
				this.root.style.gridColumn = ""
			} else {
				this.root.style.gridColumn = "span 2"
			}
		})

		this.listen(geneatree, "select", data => {
			this.identifier.treesToggle.style.display = ""
			geneatree.trees.emit("toggle", { toggle: true })
		})

		const resizeObserver = new ResizeObserver(() => {
			const { width, height } = this.root.getBoundingClientRect()
			geneatree.explorer.width = width
			geneatree.explorer.height = height
			if(geneatree.trees.selected !== null) {
				geneatree.trees.selected.viewer.width = width
				geneatree.trees.selected.viewer.height = height
			}
			geneatree.emit("tree viewer resized", { width, height })
		})

		resizeObserver.observe(this.root)

	}

}

export default TreeViewerBinding
