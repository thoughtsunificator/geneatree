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
	 * @event ExplorerEventListener#dragReset
	 */
	dragReset() {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] [viewer] [explorer] drag reset" })
		tree.viewer.dragging.clientX = null
		tree.viewer.dragging.clientY = null
		tree.viewer.dragging.moved = false
		tree.viewer.dragging.started = false
		geneatree.explorer.emit("coordinatesSet", { x: (this.root.parentNode.offsetWidth) / 2, y: this.root.parentNode.offsetHeight / 2 })
	}

	/**
	 * @event ExplorerEventListener#dragToggle
	 * @property {boolean} data
	 */
	dragToggle(data) {
		const { geneatree, tree } = this.properties
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
		geneatree.explorer.emit("scale set", data)
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
		geneatree.explorer.emit("scale set", 1)
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
		const x = (this.root.parentNode.offsetWidth / 2)  - diffViewerX
		const y = (this.root.parentNode.offsetHeight / 2) - diffViewerY
		geneatree.explorer.emit("coordinatesSet", { x, y })
	}

}

export default ExplorerEventListener
