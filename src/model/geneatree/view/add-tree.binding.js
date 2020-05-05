import { Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"

import TreeModel from "./add-tree/tree.js"
import TreeBinding from "./add-tree/tree.binding.js"

import DecujusModel from "./add-tree/decujus.js"
import DecujusBinding from "./add-tree/decujus.binding.js"

/**
 * @global
 */
class AddTreeBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		this.steps = new Steps([
			new Step("Tree", TreeModel, TreeBinding),
			new Step("Decujus", DecujusModel, DecujusBinding)
		])

		this.listen(this.steps, "done", () => {
			geneatree.trees.emit("add", [{ meta: this.steps.getStepByName("Tree").data }, [{ meta: this.steps.getStepByName("Decujus").data }]])
			const tree = geneatree.trees.list[geneatree.trees.list.length - 1]
			geneatree.trees.emit("select", tree)
			geneatree.router.emit("browse", { path: "/viewer", properties: { tree } })
			geneatree.emit("osdSet", { text: `Tree ${tree.meta.name} created`, type: "valid" })
		})

		this.run(StepsModel, { binding: new StepsBinding({ steps: this.steps }) })
	}

	async onRendered() {
		this.steps.emit("stepSet", "Tree")
	}
}

export default AddTreeBinding
