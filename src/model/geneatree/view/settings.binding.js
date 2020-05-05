import { Core, Observable, Binding } from "domodel"
import { Tabs, Tab, TabsModel, TabsBinding } from '@domodel/tabs'

import ActionModel from "./settings/action.js"
import GeneralModel from "./settings/general.js"

import ActionBinding from "./settings/action.binding.js"
import GeneralBinding from "./settings/general.binding.js"

/**
 * @global
 */
class SettingsBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		this.tabs = new Tabs([
			new Tab("General", GeneralModel(), GeneralBinding),
			new Tab("Actions", ActionModel, ActionBinding)
		])

		this.run(TabsModel, {
			binding: new TabsBinding({ tabs: this.tabs }),
			parentNode: this.root
		})

	}

	async onRendered() {
		this.tabs.emit("tabSet", "General")
	}

}

export default SettingsBinding
