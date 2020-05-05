import { ItemBinding } from "@domodel/paginator"

export default class extends ItemBinding {

	onCreated() {

		super.onCreated(this.properties)

		const { application: geneatree, log, page } = this.properties

	}

}
