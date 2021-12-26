import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"

import TreeFormModel from "../../model/form/tree.js"
import IndividualFormModel from "../../model/form/individual.js"

/**
 * @global
 */
class AddTreeBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		this.treeForm = new Form()
		const decujusForm = new Form()
		const steps = new Steps([
			new Step("Tree", FormModel(TreeFormModel({ title: `Tree` })), FormBinding, { form: this.treeForm }),
			new Step("Decujus", FormModel(IndividualFormModel({ title: "Decujus" })), FormBinding, { form: decujusForm })
		])

		steps.listen("stepChanged", data => {
			if(data.name === "Tree") {
				this.treeForm.emit("focus")
			} else if(data.name === "Decujus") {
				decujusForm.emit("focus")
			}
		})

		steps.listen("done", () => {
			geneatree.trees.emit("add", [{ meta: steps.getStepByName("Tree").data }, [{ meta: steps.getStepByName("Decujus").data }]])
			geneatree.trees.emit("select", geneatree.trees.list[geneatree.trees.list.length - 1])
			geneatree.router.emit("browse", { path: "/" })
		})

		this.treeForm.listen("submitted", data => steps.emit("stepNext", data))
		decujusForm.listen("submitted", data => steps.emit("stepNext", data))

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Tree")

	}

	async onRendered() {
		this.treeForm.emit("focus")
	}

}

export default AddTreeBinding
