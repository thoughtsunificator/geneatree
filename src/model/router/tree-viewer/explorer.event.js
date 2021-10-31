import { EventListener } from "domodel"

/**
 * @global
 */
class ExplorerEventListener extends EventListener {

	/**
	 * @event ExplorerEventListener#dragStart
	 */
	dragStart(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer drag start",  data })
		geneatree.explorer.clientX = data.clientX
		geneatree.explorer.clientY = data.clientY
		geneatree.explorer.started = true
	}

	/**
	 * @event ExplorerEventListener#dragEnd
	 */
	dragEnd() {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer drag end" })
		geneatree.explorer.clientX = null
		geneatree.explorer.clientY = null
		geneatree.explorer.moved = false
		geneatree.explorer.started = false
	}

	/**
	 * @event ExplorerEventListener#dragUpdate
	 */
	dragUpdate(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer drag update" })
		geneatree.explorer.emit("coordinates set", {x: data.x, y: data.y})
	}

	/**
	 * @event ExplorerEventListener#dragReset
	 */
	dragReset() {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer drag reset" })
		geneatree.explorer.clientX = null
		geneatree.explorer.clientY = null
		geneatree.explorer.moved = false
		geneatree.explorer.started = false
		geneatree.explorer.emit("coordinates set", { x: (this.root.parentNode.offsetWidth) / 2, y: this.root.parentNode.offsetHeight / 2 })
	}

	/**
	 * @event ExplorerEventListener#dragToggle
	 */
	dragToggle(data) {
		const { geneatree } = this.properties
		geneatree.explorer.toggled = data
	}

	/**
	 * @event ExplorerEventListener#coordinatesSet
	 */
	coordinatesSet(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer coordinates set",  data })
		if(geneatree.trees.selected !== null) {
			geneatree.trees.selected.viewer.x = data.x
			geneatree.trees.selected.viewer.y = data.y
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
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message:  "[ui] tree viewer scale set",  data })
		geneatree.trees.selected.viewer.scale = data
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
		geneatree.explorer.emit("coordinates set", { x, y })
	}

}

export default ExplorerEventListener
