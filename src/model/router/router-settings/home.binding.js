import { Binding } from "domodel"

/**
 * @global
 */
class HomeBinding extends Binding {

	onCreated() {

		const { router } = this.properties

		this.identifier.general.addEventListener("click", () => {
			router.emit("browse", { path: "/general" })
		})

		this.identifier.action.addEventListener("click", () => {
			router.emit("browse", { path: "/action" })
		})

	}

}

export default HomeBinding
