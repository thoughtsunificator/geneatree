import { EventListener } from "domodel"

import Log from "../../../../object/log.js"

/**
 * @global
 */
class ExplorerEventListener extends EventListener {

	/**
	 * @event ExplorerEventListener#dragStart
	 * @property {object} data
	 * @property {number} data.clientX
	 * @property {number} data.clientY
	 */
	dragStart(data) {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] drag start" })
		tree.viewer.dragging.clientX = data.clientX
		tree.viewer.dragging.clientY = data.clientY
		tree.viewer.dragging.started = true
		this.root.style.cursor = "grabbing"
	}

	/**
	 * @event ExplorerEventListener#dragUpdate
	 * @property {object} data
	 * @property {number} data.x
	 * @property {number} data.y
	 */
	dragUpdate(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] drag update" })
		geneatree.explorer.emit("coordinatesSet", {x: data.x, y: data.y})
	}

	/**
	 * @event ExplorerEventListener#dragEnd
	 */
	dragEnd() {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] drag end" })
		tree.viewer.dragging.clientX = null
		tree.viewer.dragging.clientY = null
		tree.viewer.dragging.moved = false
		tree.viewer.dragging.started = false
		this.root.style.cursor = "grab"
	}

	/**
	 * @event ExplorerEventListener#dragReset
	 */
	dragReset() {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] drag reset" })
		tree.viewer.dragging.clientX = null
		tree.viewer.dragging.clientY = null
		tree.viewer.dragging.moved = false
		tree.viewer.dragging.started = false
		geneatree.explorer.emit("coordinatesSet", { x: tree.viewer.getCenterX(), y: tree.viewer.getCenterY() })
	}

	/**
	 * @event ExplorerEventListener#dragToggle
	 * @property {boolean} data
	 */
	dragToggle(data) {
		const { tree } = this.properties
		tree.viewer.dragging.toggled = data
	}

	/**
	 * @event ExplorerEventListener#coordinatesSet
	 * @property {object} data
	 * @property {number} data.x
	 * @property {number} data.y
	 */
	coordinatesSet(data) {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] coordinatesSet" })
		if(tree !== null) {
			tree.viewer.x = data.x
			tree.viewer.y = data.y
		}
	}

	/**
	 * @event ExplorerEventListener#zoom
	 * @property {number} data
	 */
	zoom(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] zoom" })
		geneatree.explorer.emit("scaleSet", data)
	}

	/**
	 * @event ExplorerEventListener#scaleSet
	 * @property {number} data
	 */
	scaleSet(data) {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] scale set" })
		tree.viewer.scale = data
	}

	/**
	 * @event ExplorerEventListener#scaleReset
	 */
	scaleReset() {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] scale reset" })
		geneatree.explorer.emit("scaleSet", 1)
	}

	/**
	 * @event ExplorerEventListener#focus
	 * @property {object} data
	 * @property {number} data.x
	 * @property {number} data.y
	 */
	focus(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] focus" })
		const rect = this.root.getBoundingClientRect()
		let diffViewerX = data.x - rect.x
		let diffViewerY = data.y - rect.y
		const x = this.properties.tree.viewer.getCenterX()  - diffViewerX
		const y = this.properties.tree.viewer.getCenterY() - diffViewerY
		geneatree.explorer.emit("coordinatesSet", { x, y })
	}

	/**
	 * @event ExplorerEventListener#resized
	 * @property {object} data
	 * @property {object} data.width
	 * @property {object} data.height
	 */
	resized(data) {
		const { geneatree, tree } = this.properties
		tree.viewer.x = tree.viewer.getCenterX()
		tree.viewer.y = tree.viewer.getCenterY()
		geneatree.explorer.emit("coordinatesSet", { x: tree.viewer.x, y: tree.viewer.y })
	}

	/**
	 * @event ExplorerEventListener#boot
	 */
	rendered() {
		const { geneatree, tree } = this.properties
		geneatree.explorer.emit("scaleSet", tree.viewer.scale)
		geneatree.explorer.emit("ready")
	}

}

export default ExplorerEventListener
