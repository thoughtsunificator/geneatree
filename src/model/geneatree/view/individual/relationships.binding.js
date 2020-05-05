import { Core, Binding, Model } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import HomeModel from "./relationships/home.js"
import HomeBinding from "./relationships/home.binding.js"

import AddModel from "./relationships/add.js"
import AddBinding from "./relationships/add.binding.js"

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
