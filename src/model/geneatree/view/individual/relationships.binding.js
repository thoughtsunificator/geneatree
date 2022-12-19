import { Core, Binding, Model } from "domodel"
import { Router, Route, RouterModel, RouterBinding } from "@domodel/router"

import HomeModel from "./relationships/home.js"
import HomeBinding from "./relationships/home.binding.js"


/**
 * @global
 */
export default class extends Binding {

	onCreated() {

		const { geneatree, tab } = this.properties

		const router = new Router({
			routes: [
				new Route({ match: "/", model: new Model(HomeModel, HomeBinding) }),
			]
		})

		this.listen(tab, "set", () => {
			router.emit("browse", { path: "/" })
		})

		this.run(RouterModel, {
			binding: new RouterBinding({ router }),
			parentNode: this.identifier.body
		})

	}

}