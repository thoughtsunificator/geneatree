import { Core, Observable, Binding } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from '@domodel/router'

import ActionModel from "./router-settings/action.js"
import GeneralModel from "./router-settings/general.js"
import HomeModel from "./router-settings/home.js"

import ActionBinding from "./router-settings/action.binding.js"
import GeneralBinding from "./router-settings/general.binding.js"
import HomeBinding from "./router-settings/home.binding.js"

/**
 * @global
 */
class SettingsBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const router = new Router([
			new Route("/", HomeModel, HomeBinding),
			new Route("/general", GeneralModel, GeneralBinding),
			new Route("/action", ActionModel, ActionBinding)
		])

		this.run(RouterModel, {
			binding: new RouterBinding({ router }),
			parentNode: this.identifier.router
		})
	}

}

export default SettingsBinding
