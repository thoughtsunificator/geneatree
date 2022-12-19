import { Core, Observable, Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"
import { Form, FormModel, FormBinding } from "@domodel/form"

import IndividualModel from "./add-parent/individual.js"
import IndividualBinding from "./add-parent/individual.binding.js"

import RelationshipModel from "./add-parent/relationship.js"
import RelationshipBinding from "./add-parent/relationship.binding.js"

import Relationship from "../../../object/relationship.js"
import RelationshipIndividual from "../../../object/relationship-individual.js"

/**
 * @global
 */
class AddSpouseBinding extends Binding {

	onCreated() {

		const { geneatree, individual, tree } = this.properties

		const steps = new Steps([
			new Step("Individu", IndividualModel, IndividualBinding),
			new Step("Relationship", RelationshipModel, RelationshipBinding)
		])

		this.listen(steps, "done", () => {
			const newIndividual = tree.addIndividual(steps.getStepByName("Individu").data)

			const relationshipIndividual1 = new RelationshipIndividual(individual, RelationshipIndividual.ROLES.SPOUSE)
			const relationshipIndividual2 = new RelationshipIndividual(newIndividual, RelationshipIndividual.ROLES.SPOUSE)

			const relationship = tree.addRelationship(Relationship.TYPES.UNION.MARRIAGE, relationshipIndividual1, relationshipIndividual2)
			relationship.meta.startDate = steps.getStepByName("Relationship").data.relationDate
			relationship.meta.place = steps.getStepByName("Relationship").data.relationPlace

			// TODO
		})

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Individu")

	}

}

export default AddSpouseBinding
