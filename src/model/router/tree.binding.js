import { Core, Observable, Binding } from "domodel"
import { Tabs, Tab, TabsModel, TabsBinding } from "@domodel/tabs"
import { Form, FormModel, FormBinding } from "@domodel/form"

import TreeFormModel from "/model/form/tree.js"
import TabActionsModel from "./tabs-tree/tab-actions.js"
import TabIndividualsModel from "./tabs-tree/tab-individuals.js"

import TabActionsBinding from "./tabs-tree/tab-actions.binding.js"
import TabIndividualsBinding from "./tabs-tree/tab-individuals.binding.js"


/**
 * @global
 */
class TreeBinding extends Binding {

	onCreated() {

		const { geneatree, tree } = this.properties

		this.editForm = new Form()
		const tabs = new Tabs([
			new Tab("Editer", FormModel(TreeFormModel({ title: `Modifier un tree` })), FormBinding, { form: this.editForm }),
			new Tab("Individus", TabIndividualsModel, TabIndividualsBinding),
			new Tab("Actions", TabActionsModel, TabActionsBinding)
		])

		this.editForm.listen("submitted", data => {
			geneatree.trees.emit("update", { tree: geneatree.trees.selected, form: data })
			geneatree.router.emit("browse", { path: "/" })
		})

		tabs.listen("tabChanged", tab => {
			if(tab.name === "Editer") {
				this.editForm.emit("focus")
			}
		})

		this.run(TabsModel, { binding: new TabsBinding({ tabs }) })

		tabs.emit("tabSet", "Editer")
		this.editForm.emit("load", tree.meta)

	}

	async onRendered() {
		this.editForm.emit("focus")
	}

}

export default TreeBinding
