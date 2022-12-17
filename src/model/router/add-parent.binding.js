import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"

import IndividualFormModel from "../../model/form/individual.js"
import AddParentFormModel from "./steps-add-parent/form.js"

import AddParentFormBinding from "./steps-add-parent/form.binding.js"

import Relationship from "../../object/relationship.js"
import RelationshipIndividual from "../../object/relationship-individual.js"

/**
 * @global
 */
class AddParentBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const individualForm = new Form()
		const relationshipForm = new Form()

		const steps = new Steps([
			new Step("Individu", FormModel(IndividualFormModel({ title: "Parent" })), FormBinding, { form: individualForm }),
			new Step("Relationship", FormModel(AddParentFormModel), AddParentFormBinding, { form: relationshipForm})
		])

		this.listen(steps, "stepChanged", data => {
			if(data.name === "Individu") {
				individualForm.emit("focus")
			} else if(data.name === "Relationship") {
				relationshipForm.emit("focus")
			}
		})

		this.listen(steps, "done", () => {
			const individual = geneatree.trees.selected.addIndividual(steps.getStepByName("Individu").data)
			const x = geneatree.trees.selected.selectedIndividual.cell.x
			const y = geneatree.trees.selected.selectedIndividual.cell.y  - 1

			const relationshipIndividual1 = new RelationshipIndividual(geneatree.trees.selected.selectedIndividual, RelationshipIndividual.ROLES.CHILD)
			const relationshipIndividual2 = new RelationshipIndividual(individual, RelationshipIndividual.ROLES.PARENT)

			const relationship = geneatree.trees.selected.addRelationship(Relationship.TYPES.BIOLOGICAL, relationshipIndividual1, relationshipIndividual2)
			relationship.meta.recognised = steps.getStepByName("Relationship").data.recognised
			if (steps.getStepByName("Relationship").data.adopted) {
				relationship.meta.adoptedType = steps.getStepByName("Relationship").data.adopted_simple ? "simple" : "full"
			}
			geneatree.emit("relationshipAdded", relationship)
		})

		this.listen(individualForm, "submitted", data => steps.emit("stepNext", data))

		this.listen(relationshipForm, "submitted", data => steps.emit("stepNext", data))

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Individu")

	}

}

export default AddParentBinding
