import { Binding } from "domodel"

/**
 * @global
 */
class MapBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	getViewerPosition(clientX, clientY) {
		const rect = this.root.getBoundingClientRect()
		const x = clientX - rect.x
		const y = clientY - rect.y
		const xPercent = (x / 100) * 100
		const yPercent = (y / 50) * 100
		const viewerX = (this.root.parentNode.parentNode.offsetWidth / 100) * xPercent
		const viewerY = (this.root.parentNode.parentNode.offsetHeight / 100) * yPercent
		return { x: viewerX, y: viewerY }
	}

	onCreated() {

		const { geneatree } = this.properties

		let _dragging = false

		this.root.addEventListener("click", event => {
			const viewerPosition = this.getViewerPosition(event.clientX, event.clientY)
			geneatree.emit("tree viewer drag update", { x: viewerPosition.x, y: viewerPosition.y })
		})

		this.root.addEventListener("mousedown", () => {
			this.root.style.cursor = "grabbing"
			_dragging = true
		})

		this.root.addEventListener("mouseup", () => {
			this.root.style.cursor = ""
			_dragging = false
		})

		this.root.addEventListener("mousemove", event => {
			if(_dragging) {
				const viewerPosition = this.getViewerPosition(event.clientX, event.clientY)
				geneatree.emit("tree viewer drag update", { x: viewerPosition.x, y: viewerPosition.y })
			}
		})

	}

}

export default MapBinding
