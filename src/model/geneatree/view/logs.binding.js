import { Core, Binding, Observable, Model } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import ListModel from "./logs/list.js"
import ExportLogsFormModel from "./logs/export.js"

import ListBinding from "./logs/list.binding.js"
import ExportBinding from "./logs/export.binding.js"

/**
 * @global
 */
class LogsBinding extends Binding {

	onCreated() {

		const { geneatree } = this.properties

		const router = new Router({
			routes: [
				new Route({ match: "/", model: new Model(ListModel, ListBinding) }),
				new Route({ match: "/export", model: new Model(ExportLogsFormModel, ExportBinding) })
			]
		})

		this.listen(router, "browse", data => {
			if(data.path === "/") {
				this.identifier.back.parentNode.style.display = "none"
			} else {
				this.identifier.back.parentNode.style.display = ""
			}
		})

		this.identifier.back.addEventListener("click", () => router.emit("browse", { path: "/" }))

		this.run(RouterModel, {
			binding: new RouterBinding({ router }),
			parentNode: this.identifier.router
		})

	}

}

export default LogsBinding
