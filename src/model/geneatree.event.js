import { EventListener } from "domodel"

import { THEMES } from "./geneatree.binding.js"

/**
 * @global
 */
class GeneatreeEventListener extends EventListener {

	/**
	 * @event GeneatreeEventListener#treeFilter
	 * @property {string} data
	 */

	/**
	 * @event GeneatreeEventListener#treeFilterReset
	 */

	/**
	 * @event GeneatreeEventListener#osdSet
	 * @property {object} data
	 * @property {string} data.type info|error
	 * @property {string} data.text
	 * @property {number} data.duration in ms
	 */

	settingsSaved() {
		const className = `theme-${this.properties.geneatree.settings.theme}`
		if(!this.root.classList.contains(className)) {
			this.root.classList.remove(...THEMES.map(theme => `theme-${theme}`))
			this.root.classList.add(className)
		}
	}

}

export default GeneatreeEventListener

