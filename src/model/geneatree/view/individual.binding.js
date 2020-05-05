import { Binding } from "domodel"
import { Tabs, Tab, TabsModel, TabsBinding } from "@domodel/tabs"

import IndividualModel from "./individual/individual.js"
import NotesModel from "./individual/notes.js"
import ActionsModel from "./individual/actions.js"
import RelationshipsModel from "./individual/relationships.js"

import IndividualBinding from "./individual/individual.binding.js"
import NotesBinding from "./individual/notes.binding.js"
import ActionsBinding from "./individual/actions.binding.js"
import RelationshipsBinding from "./individual/relationships.binding.js"

/**
 * @global
 */
export default class extends Binding {

	remove() {
		this.properties.individual.tree.selectedIndividual = null
		super.remove()
	}

	onCreated() {

		const { geneatree } = this.properties

		this.tabs = new Tabs([
			new Tab("Edit", IndividualModel, IndividualBinding),
			new Tab("Notes", NotesModel, NotesBinding),
			new Tab("Relationships", RelationshipsModel, RelationshipsBinding),
			new Tab("Actions", ActionsModel(this.properties.individual), ActionsBinding)
		])

		this.listen(geneatree.individuals, "removed", data => {
			geneatree.individuals.emit("unselect", data)
		})

		this.run(TabsModel, { binding: new TabsBinding({ tabs: this.tabs }) })

	}

	async onRendered() {
		this.tabs.emit("tabSet", "Edit")
	}

}
