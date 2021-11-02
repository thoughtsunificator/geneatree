import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"

import IndividualFormModel from "/model/form/individual.js"
import AddParentFormModel from "./add-parent/form.js"

import AddParentFormBinding from "./add-parent/form.binding.js"

import Relationship from "/object/relationship.js"
import RelationshipIndividual from "/object/relationship-individual.js"

/**
 * @global
 */
class AddParentBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const _form = new Form()
		const _form_ = new Form()

		const steps = new Steps([
			new Step("Individu", FormModel(IndividualFormModel({ title: "Parent" })), FormBinding, { form: _form }),
			new Step("Relation", FormModel(AddParentFormModel), AddParentFormBinding, { form: _form_})
		])

		steps.listen("stepChanged", data => {
			if(data.name === "Individu") {
				_form.emit("focus")
			} else if(data.name === "Relation") {
				_form_.emit("focus")
			}
		})

		steps.listen("done", () => {
			const individual = geneatree.trees.selected.addIndividual(steps.getStepByName("Individu").data)
			const x = geneatree.trees.selected.selectedIndividual.cell.x
			const y = geneatree.trees.selected.selectedIndividual.cell.y  - 1

			const relationshipIndividual1 = new RelationshipIndividual(geneatree.trees.selected.selectedIndividual, RelationshipIndividual.ROLES.CHILD)
			const relationshipIndividual2 = new RelationshipIndividual(individual, RelationshipIndividual.ROLES.PARENT)

			const relationship = geneatree.trees.selected.addRelationship(Relationship.TYPES.BIOLOGICAL, relationshipIndividual1, relationshipIndividual2)
			relationship.meta.recognised = steps.getStepByName("Relation").data.recognised
			if (steps.getStepByName("Relation").data.adopted) {
				relationship.meta.adoptedType = steps.getStepByName("Relation").data.adopted_simple ? "simple" : "full"
			}
			geneatree.emit("relationship added", relationship)
			geneatree.emit("individual unselect", geneatree.trees.selected.selectedIndividual)
			geneatree.emit("gridFill", { data: individual, x, y })
			geneatree.emit("individual added", individual)
		})

		_form.listen("submitted", data => steps.emit("stepNext", data))

		_form_.listen("submitted", data => steps.emit("stepNext", data))

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Individu")

	}

}

export default AddParentBinding
