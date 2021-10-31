import { Binding } from "domodel"

import Log from "/object/log.js"

/**
 * @global
 */
class OSDBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree } = this.properties

		let _timeout

		this.listen(geneatree, "tree viewer osd set", data => {
			geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[ui] tree viewer osd set", data })
			if(!geneatree.settings.osd) {
				return
			}
			clearTimeout(_timeout)
			this.root.textContent = data.text
			this.root.style.opacity = 0.8
			this.root.classList.remove("error", "info")
			this.root.classList.add(data.type)
			if(data.duration) {
				_timeout = setTimeout(() => this.root.style.opacity = 0, data.duration)
			}
		})

	}

}

export default OSDBinding
