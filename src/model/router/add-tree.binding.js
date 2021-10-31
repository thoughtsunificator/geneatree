import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"

import TreeFormModel from "./tabs-tree/form.js"
import IndividualFormModel from "./tabs-individual/form.js"

/**
 * @global
 */
class AddTreeBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const _form = new Form()
		const _form_ = new Form()
		const steps = new Steps([
			new Step("Arbre", FormModel(TreeFormModel({ title: `Créer un arbre` })), FormBinding, { form: _form }),
			new Step("Decujus", FormModel(IndividualFormModel({ title: "Créer le decujus" })), FormBinding, { form: _form_ })
		])

		steps.listen("stepChanged", data => {
			if(data.name === "Arbre") {
				_form.emit("focus")
			} else if(data.name === "Decujus") {
				_form_.emit("focus")
			}
		})

		steps.listen("done", () => {
			geneatree.emit("tree add", [{ meta: steps.getStepByName("Arbre").data }, [{ meta: steps.getStepByName("Decujus").data }]])
			geneatree.emit("tree select", geneatree.trees[geneatree.trees.list.length - 1])
		})

		_form.listen("submitted", data => steps.emit("stepNext", data))
		_form_.listen("submitted", data => steps.emit("stepNext", data))

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Arbre")

	}

}

export default AddTreeBinding
