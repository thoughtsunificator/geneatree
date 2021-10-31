import { ItemBinding } from "@domodel/paginator"

/**
 * @global
 */
class IndividualBinding extends ItemBinding {

	onCreated() {

		super.onCreated(this.properties)

		const { geneatree, popup, page, individual } = this.properties

		this.root.addEventListener("click", () => {
			popup.emit("hide")
			popup.emit("reset")
			geneatree.emit("individual select", individual)
			individual.emit("node center")
		})

	}

}

export default IndividualBinding
