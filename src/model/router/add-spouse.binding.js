import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"

import IndividualFormModel from "/model/form/individual.js"
import AddSpouseModel from "./add-spouse/form.js"

import AddSpouseFormBinding from "./add-spouse/form.binding.js"

import Relationship from "/object/relationship.js"
import RelationshipIndividual from "/object/relationship-individual.js"

/**
 * @global
 */
class AddSpouseBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const _form = new Form()
		const _form_ = new Form()

		const steps = new Steps([
			new Step("Individu", FormModel(IndividualFormModel({ title: "Conjoint" })), FormBinding, { form: _form }),
			new Step("Relation", FormModel(AddSpouseModel), AddSpouseFormBinding, { form: _form_})
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
			const y = geneatree.trees.selected.selectedIndividual.cell.y + 1

			const relationshipIndividual1 = new RelationshipIndividual(geneatree.trees.selected.selectedIndividual, RelationshipIndividual.ROLES.SPOUSE)
			const relationshipIndividual2 = new RelationshipIndividual(individual, RelationshipIndividual.ROLES.SPOUSE)

			const relationship = geneatree.trees.selected.addRelationship(Relationship.TYPES.UNION.MARRIAGE, relationshipIndividual1, relationshipIndividual2)
			relationship.meta.startDate = steps.getStepByName("Relation").data.relationDate
			relationship.meta.place = steps.getStepByName("Relation").data.relationPlace

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

export default AddSpouseBinding
