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

		this.run(ItemModel({ title: "🏠 Home" }), { parentNode: this.identifier.items, binding: new ItemBinding({ title: "🏠 Home", path: "/" }) })
		this.run(ItemModel({ title: "⚙️ Settings" }), { parentNode: this.identifier.items, binding: new ItemBinding({ title: "⚙️ Settings", path: "/settings" }) })
		this.run(ItemModel({ title: "🪵 Logs" }), { parentNode: this.identifier.items, binding: new ItemBinding({ title: "🪵 Logs", path: "/logs" }) })
		this.run(ItemModel({ title: "ℹ️ About" }), { parentNode: this.identifier.items, binding: new ItemBinding({ title: "ℹ️ About", path: "/about" }) })

	}

}

export default NavigationBinding
