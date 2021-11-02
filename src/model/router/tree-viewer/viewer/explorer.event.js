import { EventListener } from "domodel"

import Log from "/object/log.js"

/**
 * @global
 */
class ExplorerEventListener extends EventListener {

	/**
	 * @event ExplorerEventListener#dragStart
	 */
	dragStart(data) {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer drag start",  data })
		tree.viewer.dragging.clientX = data.clientX
		tree.viewer.dragging.clientY = data.clientY
		tree.viewer.dragging.started = true
	}

	/**
	 * @event ExplorerEventListener#dragEnd
	 */
	dragEnd() {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer drag end" })
		tree.viewer.dragging.clientX = null
		tree.viewer.dragging.clientY = null
		tree.viewer.dragging.moved = false
		tree.viewer.dragging.started = false
	}

	/**
	 * @event ExplorerEventListener#dragUpdate
	 */
	dragUpdate(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer drag update" })
		geneatree.explorer.emit("coordinatesSet", {x: data.x, y: data.y})
	}

	/**
	 * @event ExplorerEventListener#dragReset
	 */
	dragReset() {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer drag reset" })
		tree.viewer.dragging.clientX = null
		tree.viewer.dragging.clientY = null
		tree.viewer.dragging.moved = false
		tree.viewer.dragging.started = false
		geneatree.explorer.emit("coordinatesSet", { x: (this.root.parentNode.offsetWidth) / 2, y: this.root.parentNode.offsetHeight / 2 })
	}

	/**
	 * @event ExplorerEventListener#dragToggle
	 */
	dragToggle(data) {
		const { geneatree, tree } = this.properties
		tree.viewer.dragging.toggled = data
	}

	/**
	 * @event ExplorerEventListener#coordinatesSet
	 */
	coordinatesSet(data) {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer coordinatesSet",  data })
		if(tree !== null) {
			tree.viewer.x = data.x
			tree.viewer.y = data.y
		}
	}

	/**
	 * @event ExplorerEventListener#zoom
	 */
	zoom(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer zoom",  data })
		geneatree.explorer.emit("scale set", data)
	}

	/**
	 * @event ExplorerEventListener#scaleSet
	 */
	scaleSet(data) {
		const { geneatree, tree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer scale set",  data })
		tree.viewer.scale = data
	}

	/**
	 * @event ExplorerEventListener#scaleReset
	 */
	scaleReset() {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer scale reset" })
		geneatree.explorer.emit("scale set", 1)
	}

	/**
	 * @event ExplorerEventListener#focus
	 */
	focus(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer focus",  data })
		const rect = this.root.getBoundingClientRect()
		let diffViewerX = data.x - rect.x
		let diffViewerY = data.y - rect.y
		const x = (this.root.parentNode.offsetWidth / 2)  - diffViewerX
		const y = (this.root.parentNode.offsetHeight / 2) - diffViewerY
		geneatree.explorer.emit("coordinatesSet", { x, y })
	}

}

export default ExplorerEventListener
