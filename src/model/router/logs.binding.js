import { Core, Binding, Observable } from "domodel"
import { Form, FormModel } from "@domodel/form"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import ListModel from "./router-logs/list.js"
import ExportLogsFormModel from "./export-logs/form.js"

import ListBinding from "./router-logs/list.binding.js"
import ExportBinding from "./router-logs/export.binding.js"

import { LOGS_FORMATS_EXPORT } from "/model/geneatree.binding.js"

/**
 * @global
 */
class LogsBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const router = new Router([
			new Route("/", ListModel, ListBinding),
			new Route("/export", FormModel(ExportLogsFormModel(LOGS_FORMATS_EXPORT)), ExportBinding)
		])

		this.run(RouterModel, {
			binding: new RouterBinding({ router }),
			parentNode: this.identifier.router
		})

	}

}

export default LogsBinding
