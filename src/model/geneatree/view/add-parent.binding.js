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
class AddParentBinding extends Binding {

	onCreated() {

		const { geneatree, individual, tree } = this.properties

		const steps = new Steps([
			new Step("Individu", IndividualModel, IndividualBinding),
			new Step("Relationship", RelationshipModel, RelationshipBinding)
		])

		this.listen(steps, "done", () => {
			const newIndividual = tree.addIndividual(steps.getStepByName("Individu").data)

			const relationshipIndividual1 = new RelationshipIndividual(individual, RelationshipIndividual.ROLES.CHILD)
			const relationshipIndividual2 = new RelationshipIndividual(newIndividual, RelationshipIndividual.ROLES.PARENT)

			const relationship = tree.addRelationship(Relationship.TYPES.BIOLOGICAL, relationshipIndividual1, relationshipIndividual2)
			relationship.meta.recognised = steps.getStepByName("Relationship").data.recognised
			if (steps.getStepByName("Relationship").data.adopted) {
				relationship.meta.adoptedType = steps.getStepByName("Relationship").data.adopted_simple ? "simple" : "full"
			}
			// TODO
		})

		this.run(StepsModel, { binding: new StepsBinding({ steps }) })

		steps.emit("stepSet", "Individu")

	}

}

export default AddParentBinding
