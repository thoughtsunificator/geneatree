import { Binding, Core } from "domodel"

import MessageModel from "./osd/message.js"

import MessageBinding from "./osd/message.binding.js"

import Log from "../../object/log.js"

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

		this.listen(geneatree, "osdSet", data => {
			geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[ui] osdSet", data })
			if(!geneatree.settings.osd) {
				return
			}
			this.run(MessageModel(data), { method: Core.METHOD.PREPEND, binding: new MessageBinding({ duration: data.duration }) })
		})

	}

}

export default OSDBinding
