import { Core, Observable, Binding } from "domodel"
import { Tabs, Tab, TabsModel, TabsBinding } from "@domodel/tabs"
import { Form, FormModel, FormBinding } from "@domodel/form"

import TreeFormModel from "./tabs-tree/form.js"
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

		const _form = new Form()
		const tabs = new Tabs([
			new Tab("Editer", FormModel(TreeFormModel({ title: `Modifier un arbre` })), FormBinding, { form: _form }),
			new Tab("Individus", TabIndividualsModel, TabIndividualsBinding),
			new Tab("Actions", TabActionsModel, TabActionsBinding)
		])

		_form.listen("submitted", data => {
			geneatree.emit("tree update", { tree: geneatree.trees.selected, form: data })
		})

		tabs.listen("tab changed", tab => {
			if(tab.name === "Editer") {
				_form.emit("focus")
			}
		})

		this.run(TabsModel, { binding: new TabsBinding({ tabs }) })

		tabs.emit("tab set", "Editer")
		_form.emit("load", tree.meta)
		_form.emit("focus")

	}

}

export default TreeBinding
