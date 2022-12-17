import { Core, Observable, Binding } from "domodel"
import { Tabs, Tab, TabsModel, TabsBinding } from "@domodel/tabs"
import { Form, FormModel, FormBinding } from "@domodel/form"

import TreeFormModel from "../../model/form/tree.js"
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

		this.individualForm = new Form()
		const tabs = new Tabs([
			new Tab("Editer", FormModel(TreeFormModel({ title: `Modifier un tree` })), FormBinding, { form: this.individualForm }),
			new Tab("Individus", TabIndividualsModel, TabIndividualsBinding),
			new Tab("Actions", TabActionsModel, TabActionsBinding)
		])

		this.listen(this.individualForm, "submitted", data => {
			geneatree.trees.emit("update", { tree: geneatree.trees.selected, form: data })
			geneatree.router.emit("browse", { path: "/" })
		})

		this.listen(tabs, "tabChanged", tab => {
			if(tab.name === "Editer") {
				this.individualForm.emit("focus")
			}
		})

		this.run(TabsModel, { binding: new TabsBinding({ tabs }) })

		tabs.emit("tabSet", "Editer")
		this.individualForm.emit("load", tree.meta)

	}

	async onRendered() {
		this.individualForm.emit("focus")
	}

}

export default TreeBinding
