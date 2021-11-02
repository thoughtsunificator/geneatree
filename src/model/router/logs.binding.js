import { Core, Binding, Observable } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import ListModel from "./router-logs/list.js"
import ExportLogsFormModel from "./router-logs/export.js"

import ListBinding from "./router-logs/list.binding.js"
import ExportBinding from "./router-logs/export.binding.js"

/**
 * @global
 */
class LogsBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const router = new Router([
			new Route("/", ListModel, ListBinding),
			new Route("/export", ExportLogsFormModel, ExportBinding)
		])

		this.run(RouterModel, {
			binding: new RouterBinding({ router }),
			parentNode: this.identifier.router
		})

	}

}

export default LogsBinding
