import { ItemBinding } from "@domodel/paginator"

/**
 * @global
 */
class IndividualBinding extends ItemBinding {

	onCreated() {

		super.onCreated(this.properties)

		const { geneatree, popup, page, individual } = this.properties

		// this.root.addEventListener("click", () => {
		// })

	}

}

export default IndividualBinding
