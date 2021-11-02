import { Binding } from "domodel"

/**
 * @global
 */
class ItemBinding extends Binding {

	onCreated() {

		const { path, geneatree } = this.properties

		this.listen(geneatree.router, "browse", data => {
			if(data.path === path) {
				this.root.classList.add("active")
			} else {
				this.root.classList.remove("active")
			}
		})

		this.root.addEventListener("click", () => geneatree.router.emit("browse", { path }))


	}

}

export default ItemBinding
