import { Binding } from "domodel"

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

		this.listen(geneatree, "tree viewer osd set", data => {
			geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[ui] tree viewer osd set", data })
			if(!geneatree.settings.osd) {
				return
			}
			this.run(MessageModel(data), { binding: new MessageBinding({ duration: data.duration }) })
		})

	}

}

export default OSDBinding
