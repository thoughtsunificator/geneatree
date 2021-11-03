import { Binding } from "domodel"

import ItemModel from "./navigation/item.js"

import ItemBinding from "./navigation/item.binding.js"

/**
 * @global
 */
class NavigationBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	/**
	 * @param {string} path
	 */
	browse(path) {
		this.properties.geneatree.router.emit("browse", { path })
	}

	onCreated() {

		const { geneatree } = this.properties

		this.run(ItemModel({ title: "Viewer" }), { parentNode: this.identifier.items, binding: new ItemBinding({ path: "/" }) })
		this.run(ItemModel({ title: "Settings" }), { parentNode: this.identifier.items, binding: new ItemBinding({ path: "/settings" }) })
		this.run(ItemModel({ title: "Logs" }), { parentNode: this.identifier.items, binding: new ItemBinding({ path: "/logs" }) })
		this.run(ItemModel({ title: "About" }), { parentNode: this.identifier.items, binding: new ItemBinding({ path: "/about" }) })

	}

}

export default NavigationBinding
