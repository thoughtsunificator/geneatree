import { Binding } from "domodel"

/**
 * @global
 */
class CursorBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree } = this.properties

		this.listen(geneatree, "treeViewerCoordinatesUpdated", data => {
			const xPercent = (data.x / this.root.parentNode.parentNode.parentNode.offsetWidth) * 100
			const yPercent = (data.y / this.root.parentNode.parentNode.parentNode.offsetHeight) * 100
			const cursorX = (100 / 100) * xPercent
			const cursorY = (50 / 100) * yPercent
			this.root.style.left = cursorX + "px"
			this.root.style.top = cursorY + "px"
			geneatree.emit("treeViewerMinimapCoordinatesUpdated", { xPercent, yPercent, cursorY, cursorX })
		})

	}

}

export default CursorBinding
