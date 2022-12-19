import { Binding } from "domodel"

/**
 * @global
 */
class ViewerBinding extends Binding {

	async onRendered() {
		const resizeObserver = new ResizeObserver(() => {
			const { width, height } = this.root.getBoundingClientRect()
			tree.viewer.width = width
			tree.viewer.height = height
			geneatree.explorer.emit("resized", { width, height })
		})
		resizeObserver.observe(this.root)
		const { tree, geneatree } = this.properties
		const { width, height } = this.root.getBoundingClientRect()
		this.properties.tree.viewer.width = width
		this.properties.tree.viewer.height = height
		if(tree.viewer.x === 0 || tree.viewer.y === 0) {
			tree.viewer.x = tree.viewer.width / 2
			tree.viewer.y = tree.viewer.height / 2
		}
		geneatree.explorer.emit("boot")
	}

}

export default ViewerBinding
