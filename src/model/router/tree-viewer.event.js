import { EventListener } from "domodel"

/**
 * @global
 */
class TreeViewerEventListener extends EventListener {

	/**
	 * @event TreeViewerEventListener#initialize
	 */
	treeViewerInitialize(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] tree viewer initialize", data })
		geneatree.explorer.width = _width
		geneatree.explorer.height = _height
	}

}

export default TreeViewerEventListener
