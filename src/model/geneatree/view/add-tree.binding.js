import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"

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

		const steps = new Steps([
			new Step("Tree", TreeModel, TreeBinding),
			new Step("Decujus", DecujusModel, DecujusBinding)
		])

		this.listen(steps, "done", () => {
			geneatree.trees.emit("add", [{ meta: steps.getStepByName("Tree").data }, [{ meta: steps.getStepByName("Decujus").data }]])
			const tree = geneatree.trees.list[geneatree.trees.list.length - 1] // TODO Might not work if multiple users are working on th
			geneatree.trees.emit("select", tree)
			geneatree.router.emit("browse", { path: "/" })
			geneatree.emit("osdSet", { text: `Tree ${tree.meta.name} created`, type: "valid" })
		})

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Tree")

	}
}

export default AddTreeBinding
