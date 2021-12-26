import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"

import IndividualFormModel from "../../model/form/individual.js"
import AddSpouseModel from "./steps-add-spouse/form.js"

import AddSpouseFormBinding from "./steps-add-spouse/form.binding.js"

import Relationship from "../../object/relationship.js"
import RelationshipIndividual from "../../object/relationship-individual.js"

/**
 * @global
 */
class AddSpouseBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const individualForm = new Form()
		const relationshipForm = new Form()

		const steps = new Steps([
			new Step("Individu", FormModel(IndividualFormModel({ title: "Conjoint" })), FormBinding, { form: individualForm }),
			new Step("Relationship", FormModel(AddSpouseModel), AddSpouseFormBinding, { form: relationshipForm})
		])

		steps.listen("stepChanged", data => {
			if(data.name === "Individu") {
				individualForm.emit("focus")
			} else if(data.name === "Relationship") {
				relationshipForm.emit("focus")
			}
		})

		steps.listen("done", () => {
			const individual = geneatree.trees.selected.addIndividual(steps.getStepByName("Individu").data)
			const x = geneatree.trees.selected.selectedIndividual.cell.x
			const y = geneatree.trees.selected.selectedIndividual.cell.y + 1

			const relationshipIndividual1 = new RelationshipIndividual(geneatree.trees.selected.selectedIndividual, RelationshipIndividual.ROLES.SPOUSE)
			const relationshipIndividual2 = new RelationshipIndividual(individual, RelationshipIndividual.ROLES.SPOUSE)

			const relationship = geneatree.trees.selected.addRelationship(Relationship.TYPES.UNION.MARRIAGE, relationshipIndividual1, relationshipIndividual2)
			relationship.meta.startDate = steps.getStepByName("Relationship").data.relationDate
			relationship.meta.place = steps.getStepByName("Relationship").data.relationPlace

			geneatree.emit("relationship added", relationship)
			geneatree.emit("individual unselect", geneatree.trees.selected.selectedIndividual)
			geneatree.emit("gridFill", { data: individual, x, y })
			geneatree.emit("individual added", individual)
		})

		individualForm.listen("submitted", data => steps.emit("stepNext", data))

		relationshipForm.listen("submitted", data => steps.emit("stepNext", data))

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Individu")

	}

}

export default AddSpouseBinding
