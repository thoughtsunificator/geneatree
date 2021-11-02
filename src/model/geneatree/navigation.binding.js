import { Binding } from "domodel"

import ItemModel from "./navigation/item.js"

import ItemBinding from "./navigation/item.binding.js"

/**
 * @global
 */
class NavigationBinding extends Binding {

	browse(path) {
		this.properties.geneatree.router.emit("browse", { path })
	}


	onCreated() {

		const { geneatree } = this.properties

		this.run(ItemModel({ title: "Viewer" }), { binding: new ItemBinding({ path: "/" }) })
		this.run(ItemModel({ title: "Settings" }), { binding: new ItemBinding({ path: "/settings" }) })
		this.run(ItemModel({ title: "Logs" }), { binding: new ItemBinding({ path: "/logs" }) })
		this.run(ItemModel({ title: "About" }), { binding: new ItemBinding({ path: "/about" }) })

	}

}

export default NavigationBinding
