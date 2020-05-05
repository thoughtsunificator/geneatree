import { Binding } from "domodel"
import { Step, Steps, StepsModel, StepsBinding } from "@domodel/steps"

import IndividualModel from "./add/individual.js"
import IndividualBinding from "./add/individual.binding.js"

import RelationshipModel from "./add/relationship.js"
import RelationshipBinding from "./add/relationship.binding.js"

import Relationship from "../../../../../object/relationship.js"
import RelationshipIndividual from "../../../../../object/relationship-individual.js"

/**
 * @global
 */
class AddBinding extends Binding {

	onCreated() {

		const { geneatree, individual, tree } = this.properties

		this.steps = new Steps([
			new Step("Individual", IndividualModel, IndividualBinding),
			new Step("Relationship", RelationshipModel, RelationshipBinding)
		])

		this.listen(this.steps, "done", () => {
			const newIndividual = tree.addIndividual(this.steps.getStepByName("Individual").data)
			geneatree.individuals.emit("added", newIndividual)

			const parentIndividual = new RelationshipIndividual(individual, RelationshipIndividual.ROLES.PARENT)
			const childIndividual = new RelationshipIndividual(newIndividual, RelationshipIndividual.ROLES.CHILD)

			const relationship = tree.addRelationship(Relationship.TYPES.PARENTING, [parentIndividual, childIndividual])
			relationship.meta.recognised = this.steps.getStepByName("Relationship").data.recognised
			if (this.steps.getStepByName("Relationship").data.adopted) {
				relationship.meta.adoptedType = this.steps.getStepByName("Relationship").data.adopted_simple ? "simple" : "full"
			}
			relationship.meta.startDate = this.steps.getStepByName("Relationship").data.relationDate
			relationship.meta.place = this.steps.getStepByName("Relationship").data.relationPlace

			geneatree.trees.emit("relationshipAdded", relationship)

			geneatree.router.emit("browse", { path: "/viewer", properties: { tree } })
		})

		this.run(StepsModel, { binding: new StepsBinding({ steps: this.steps }) })


	}

	async onRendered() {
		this.steps.emit("stepSet", "Individual")
	}

}

export default AddBinding
