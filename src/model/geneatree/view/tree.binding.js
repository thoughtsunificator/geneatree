import { Binding } from "domodel"
import { Tabs, Tab, TabsModel, TabsBinding } from "@domodel/tabs"
import { Form } from "@domodel/form"

import TreeModel from "./tree/tree.js"
import ActionsModel from "./tree/actions.js"
import IndividualsModel from "./tree/individuals.js"

import TreeBinding from "./tree/tree.binding.js"
import ActionsBinding from "./tree/actions.binding.js"
import IndividualsBinding from "./tree/individuals.binding.js"


/**
 * @global
 */
export default class extends Binding {

	onCreated() {

		const { geneatree, tree } = this.properties

		this.individualForm = new Form()
		this.tabs = new Tabs([
			new Tab("Edit", TreeModel, TreeBinding),
			new Tab("Individuals", IndividualsModel, IndividualsBinding),
			new Tab("Actions", ActionsModel, ActionsBinding)
		])

		this.run(TabsModel, { binding: new TabsBinding({ tabs: this.tabs }) })

	}

	async onRendered() {
		this.tabs.emit("tabSet", "Edit")
	}

}
