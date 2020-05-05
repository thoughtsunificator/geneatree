import { Binding, Model } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import HomeModel from "./notes/home.js"
import HomeBinding from "./notes/home.binding.js"
import AddModel from "./notes/add.js"
import AddBinding from "./notes/add.binding.js"
import EditModel from "./notes/edit.js"
import EditBinding from "./notes/edit.binding.js"

/**
 * @global
 */
export default class extends Binding {

	onCreated() {

		const { geneatree, tab } = this.properties

		const router = new Router({
			routes: [
				new Route({ match: "/", model: new Model(HomeModel, HomeBinding) }),
				new Route({ match: "/add", model: new Model(AddModel, AddBinding) }),
				new Route({ match: "/edit", model: new Model(EditModel, EditBinding) }),
			]
		})


		this.listen(router, "browse", data => {
			if(data.path === "/") {
				this.identifier.back.parentNode.style.display = "none"
			} else {
				this.identifier.back.parentNode.style.display = ""
			}
		})

		this.listen(tab, "set", () => {
			router.emit("browse", { path: "/" })
		})

		this.identifier.back.addEventListener("click", () => router.emit("browse", { path: "/" }))

		this.run(RouterModel, {
			binding: new RouterBinding({ router }),
			parentNode: this.identifier.body
		})

	}

}
