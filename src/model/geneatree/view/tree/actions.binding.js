import { Core, Observable, Model, Binding } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import HomeModel from "./actions/home.js"
import HomeBinding from "./actions/home.binding.js"

import ExportModel from "./actions/export.js"
import ExportBinding from "./actions/export.binding.js"

/**
 * @global
 */
export default class extends Binding {

	onCreated() {

		const { geneatree, tab } = this.properties

		const router = new Router({
			routes: [
				new Route({ match: "/", model: new Model(HomeModel, HomeBinding) }),
				new Route({ match: "/export", model: new Model(ExportModel, ExportBinding) }),
			]
		})

		this.listen(tab, "set", () => {
			router.emit("browse", { path: "/" })
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
			parentNode: this.identifier.body
		})

	}

}
