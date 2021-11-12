import { Binding } from "domodel"

import ExplorerEventListener from "./explorer.event.js"

/**
 * @global
 */
class ExplorerBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties, new ExplorerEventListener(properties.geneatree.explorer))
	}

	onCreated() {

		const { geneatree, tree } = this.properties

		if(tree.viewer.x === 0 || tree.viewer.y === 0) {
			tree.viewer.x = tree.viewer.width / 2
			tree.viewer.y = tree.viewer.height / 2
		}

		geneatree.explorer.emit("coordinatesSet", { x: tree.viewer.x, y: tree.viewer.y })
		geneatree.explorer.emit("scaleSet", tree.viewer.scale)

		this.root.addEventListener("mouseup", () => {
			if(tree.viewer.dragging.started) {
				geneatree.explorer.emit("dragEnd")
			}
		})

		this.root.addEventListener("mousemove", event => {
			if(tree.viewer.dragging.started) {
				const { clientX, clientY } = event
				const diffX = Math.abs(clientX - tree.viewer.dragging.clientX)
				const diffY = Math.abs(clientY - tree.viewer.dragging.clientY)
				let x = parseInt(tree.viewer.x) || 0
				let y = parseInt(tree.viewer.y) || 0
				if(clientX > tree.viewer.dragging.clientX) {
					x += diffX
				} else if(clientX < tree.viewer.dragging.clientX) {
					x -= diffX
				}
				if(clientY > tree.viewer.dragging.clientY) {
					y += diffY
				} else if(clientY < tree.viewer.dragging.clientY) {
					y -= diffY
				}
				tree.viewer.dragging.clientX = event.clientX
				tree.viewer.dragging.clientY = event.clientY
				tree.viewer.dragging.moved = true
				geneatree.explorer.emit("dragUpdate", { x, y })
			}
		})

		this.root.addEventListener("resize", () => {
			if(tree.individuals.length >= 1) {
				geneatree.explorer.emit("dragReset")
			}
		})

		this.root.addEventListener("mouseup", event => {
			if(tree !== null) {
				if(event.button === 1) {
					geneatree.explorer.emit("dragReset")
					geneatree.explorer.emit("scaleReset")
				} else if(event.button === 0 && !tree.viewer.dragging.moved && tree.selectedIndividual !== null && event.target === this.root) {
					geneatree.explorer.emit("individual unselect", tree.selectedIndividual)
				}
			}
		})

		this.root.addEventListener("mousedown", event => {
			if(event.button === 0 && tree.individuals.length >= 1 && (event.target.contains(this.root) || event.target.contains(this.root)) && tree.viewer.dragging.toggled) {
				geneatree.explorer.emit("dragStart", {
					clientX: event.clientX,
					clientY: event.clientY
				})
			}
		})

		this.root.addEventListener("wheel", event => {
			const delta = Math.sign(event.deltaY);
			if(tree.individuals.length >= 1) {
				let scale = tree.viewer.scale + delta * -0.05
				scale = Math.min(Math.max(.125, scale), 4)
				geneatree.explorer.emit("zoom", scale)
			}
		})

	}

}

export default ExplorerBinding
