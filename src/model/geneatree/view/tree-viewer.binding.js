import { Binding } from "domodel"

/**
 * @global
 */
class ViewerBinding extends Binding {

	onCreated() {
		this.listen(this.properties.geneatree.individuals, "gridRendered", data => {
			this.properties.tree.viewer.grid = {
				width: data.width, height: data.height
			}
			this.properties.tree.viewer.x = this.properties.tree.viewer.getCenterX()
			this.properties.tree.viewer.y = this.properties.tree.viewer.getCenterY()
			const resizeObserver = new ResizeObserver(() => {
				const { width, height } = this.root.getBoundingClientRect()
				this.properties.tree.viewer.width = width
				this.properties.tree.viewer.height = height
				this.properties.geneatree.explorer.emit("resized", { width, height })
			})
			resizeObserver.observe(this.root)
		})
	}

	async onRendered() {
		const { width, height } = this.root.getBoundingClientRect()
		this.properties.tree.viewer.width = width
		this.properties.tree.viewer.height = height
		this.properties.geneatree.explorer.emit("rendered")
	}

}

export default ViewerBinding
