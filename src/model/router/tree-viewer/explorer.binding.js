import { Binding } from "domodel"

import Log from "/object/log.js"

/**
 * @global
 */
class ExplorerBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree } = this.properties

		this.listen(geneatree, "treeViewerInitialize", () => {
			if(geneatree.trees.selected.viewer.x === 0 || geneatree.trees.selected.viewer.y === 0) {
				geneatree.trees.selected.viewer.x = geneatree.trees.selected.viewer.width / 2
				geneatree.trees.selected.viewer.y = geneatree.trees.selected.viewer.height / 2
			}
			geneatree.emit("tree viewer coordinates set", { x: geneatree.trees.selected.viewer.x, y: geneatree.trees.selected.viewer.y })
			geneatree.emit("tree viewer scale set", geneatree.trees.selected.viewer.scale)
		})

		this.root.ownerDocument.defaultView.addEventListener("mouseup", () => {
			if(geneatree.trees.selected !== null && geneatree.trees.selected.viewer.dragging.started) {
				geneatree.emit("tree viewer drag end")
			}
		})

		this.root.ownerDocument.defaultView.addEventListener("mousemove", event => {
			if(geneatree.trees.selected !== null && geneatree.trees.selected.viewer.dragging.started) {
				const { clientX, clientY } = event
				const diffX = Math.abs(clientX - geneatree.trees.selected.viewer.dragging.clientX)
				const diffY = Math.abs(clientY - geneatree.trees.selected.viewer.dragging.clientY)
				let x = parseInt(geneatree.trees.selected.viewer.x) || 0
				let y = parseInt(geneatree.trees.selected.viewer.y) || 0
				if(clientX > geneatree.trees.selected.viewer.dragging.clientX) {
					x += diffX
				} else if(clientX < geneatree.trees.selected.viewer.dragging.clientX) {
					x -= diffX
				}
				if(clientY > geneatree.trees.selected.viewer.dragging.clientY) {
					y += diffY
				} else if(clientY < geneatree.trees.selected.viewer.dragging.clientY) {
					y -= diffY
				}
				geneatree.trees.selected.viewer.dragging.clientX = event.clientX
				geneatree.trees.selected.viewer.dragging.clientY = event.clientY
				geneatree.trees.selected.viewer.dragging.moved = true
				geneatree.emit("tree viewer drag update", { x, y })
			}
		})

		this.root.ownerDocument.defaultView.addEventListener("resize", () => {
			if(geneatree.trees.selected !== null && geneatree.trees.selected.individuals.length >= 1) {
				geneatree.emit("tree viewer drag reset")
			}
		})

		this.root.addEventListener("mouseup", event => {
			if(geneatree.trees.selected !== null) {
				if(event.button === 1) {
					geneatree.emit("tree viewer drag reset")
					geneatree.emit("tree viewer scale reset")
				} else if(event.button === 0 && !geneatree.trees.selected.viewer.dragging.moved && geneatree.trees.selected.selectedIndividual !== null && event.target === this.root) {
					geneatree.emit("individual unselect", geneatree.trees.selected.selectedIndividual)
				}
			}
		})

		this.root.addEventListener("mousedown", event => {
			if(event.button === 0 && geneatree.trees.selected !== null && geneatree.trees.selected.individuals.length >= 1 && (event.target.contains(this.root) || event.target.contains(this.root)) && geneatree.trees.selected.viewer.dragging.toggled) {
				geneatree.emit("tree viewer drag start", {
					clientX: event.clientX,
					clientY: event.clientY
				})
			}
		})

		this.root.addEventListener("wheel", event => {
			const delta = Math.sign(event.deltaY);
			if(geneatree.trees.selected !== null && geneatree.trees.selected.individuals.length >= 1) {
				let scale = geneatree.trees.selected.viewer.scale + delta * -0.05
				scale = Math.min(Math.max(.125, scale), 4)
				geneatree.emit("tree viewer zoom", scale)
			}
		})

	}

}

export default ExplorerBinding
