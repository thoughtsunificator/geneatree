import { Core, Observable, Binding } from "domodel"
import { Form, FormModel, FormBinding } from "@domodel/form"
import { Tabs, Tab, TabsModel, TabsBinding } from "@domodel/tabs"

import IndividualFormModel from "../../model/form/individual.js"
import TabNotesModel from "./tabs-individual/tab-notes.js"
import TabActionsModel from "./tabs-individual/tab-actions.js"
import TabRelationshipsModel from "./tabs-individual/tab-relationships.js"

import TabNotesBinding from "./tabs-individual/tab-notes.binding.js"
import TabActionsBinding from "./tabs-individual/tab-actions.binding.js"
import TabRelationshipsBinding from "./tabs-individual/tab-relationships.binding.js"

/**
 * @global
 */
class IndividualBinding extends Binding {

	onCreated() {

		const { geneatree, individual } = this.properties

		const individualForm = new Form()
		const tabs = new Tabs([
			new Tab("Editer", FormModel(IndividualFormModel({ title: "Modifier un individu" })), FormBinding, { form: individualForm }),
			new Tab("Notes", TabNotesModel, TabNotesBinding),
			new Tab("Relations", TabRelationshipsModel, TabRelationshipsBinding),
			new Tab("Actions", TabActionsModel, TabActionsBinding)
		])

		this.listen(geneatree, "individual removed", data => {
			geneatree.emit("individual unselect", data)
		})

		tabs.listen("tabChanged", tab => {
			if(tab.name === "Editer") {
				individualForm.emit("focus")
			}
		})

		individualForm.listen("submitted", data => {
			let individual_
			if(individual !== null) {
				individual_ = individual
			} else {
				individual_ = geneatree.trees.selected.selectedIndividual
			}
			geneatree.emit("individual update", { individual: individual_, form: data })
		})

		this.run(TabsModel, { binding: new TabsBinding({ tabs }) })

		tabs.emit("tabSet", "Editer")

		individualForm.emit("load", geneatree.trees.selected.selectedIndividual)
		individualForm.emit("focus")

	}

}

export default IndividualBinding
