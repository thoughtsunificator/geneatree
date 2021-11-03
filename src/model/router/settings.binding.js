import { Core, Observable, Binding } from "domodel"
import { Tabs, Tab, TabsModel, TabsBinding } from '@domodel/tabs'

import ActionModel from "./router-settings/action.js"
import GeneralModel from "./router-settings/general.js"

import ActionBinding from "./router-settings/action.binding.js"
import GeneralBinding from "./router-settings/general.binding.js"

/**
 * @global
 */
class SettingsBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const tabs = new Tabs([
			new Tab("General", GeneralModel(), GeneralBinding),
			new Tab("Actions", ActionModel, ActionBinding)
		])

		this.run(TabsModel, {
			binding: new TabsBinding({ tabs }),
			parentNode: this.identifier.tabs
		})

		tabs.emit("tabSet", "General")

	}

}

export default SettingsBinding
