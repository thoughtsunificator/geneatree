import { Binding } from "domodel"

/**
 * @global
 */
class HomeBinding extends Binding {

	onCreated() {

		const { geneatree, tree } = this.properties

		const resizeObserver = new ResizeObserver(() => {
			const { width, height } = this.root.getBoundingClientRect()
			tree.viewer.width = width
			tree.viewer.height = height
			geneatree.emit("tree viewer resized", { width, height })
		})

		resizeObserver.observe(this.root)

	}

}

export default HomeBinding
