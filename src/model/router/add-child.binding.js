import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"

import IndividualFormModel from "../../model/form/individual.js"
import AddChildModel from "./steps-add-child/form.js"

import AddChildFormBinding from "./steps-add-child/form.binding.js"

import Relationship from "../../object/relationship.js"
import RelationshipIndividual from "../../object/relationship-individual.js"

/**
 * @global
 */
class AddChildBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const individualForm = new Form()
		const relationshipForm = new Form()

		const steps = new Steps([
			new Step("Individu", FormModel(IndividualFormModel({ title: "Enfant" })), FormBinding, { form: individualForm }),
			new Step("Relationship", FormModel(AddChildModel), AddChildFormBinding, { form: relationshipForm })
		])

		this.listen(steps, "stepChanged", data => {
			if(data.name === "Individu") {
				individualForm.emit("focus")
			} else if(data.name === "Relationship") {
				relationshipForm.emit("focus")
			}
		})

		this.listen(steps, "done", () => {
			const x = geneatree.trees.selected.selectedIndividual.cell.x
			const y = geneatree.trees.selected.selectedIndividual.cell.y  + 1

			const individual = geneatree.trees.selected.addIndividual(data[0])

			const relationshipIndividual1 = new RelationshipIndividual(geneatree.trees.selected.selectedIndividual, RelationshipIndividual.ROLES.PARENT)
			const relationshipIndividual2 = new RelationshipIndividual(individual, RelationshipIndividual.ROLES.CHILD)

			const relationship = geneatree.trees.selected.addRelationship(Relationship.TYPES.BIOLOGICAL, relationshipIndividual1, relationshipIndividual2)
			relationship.meta.recognised = data[1].recognised
			if (data[1].adopted) {
				relationship.meta.adoptedType = data[1].adopted_simple ? "simple" : "full"
			}
			geneatree.emit("relationshipAdded", relationship)
		})

		this.listen(individualForm, "submitted", data => steps.emit("stepNext", data))

		this.listen(relationshipForm, "submitted", data => steps.emit("stepNext", data))

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Individu")

	}

}

export default AddChildBinding
