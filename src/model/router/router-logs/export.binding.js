import { Binding } from "domodel"
import { Form, FormBinding } from "@domodel/form"

import Log from "../../../object/log.js"

/**
 * @global
 */
class ExportBinding extends FormBinding {

	constructor() {
		const form = new Form()
		super({ form })
		this.properties.form = form
	}

	onCreated() {

		super.onCreated()

		const { geneatree } = this.properties

		this.properties.form.listen("submitted", data => {
			const logs = geneatree.logs.map(log => ({
				message: log.message,
				data: log.data,
				type: log.type,
				date: log.date
			}))
			const blob = new Blob([JSON.stringify(logs)], { type : "application/json" })
			const reader = new FileReader()
			const anchorElement = document.createElement("a")
			const date = new Date()
			anchorElement.download = `geneatree-logs-${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`
			reader.onload = function(event) {
				anchorElement.href = event.target.result
				anchorElement.click()
			}
			reader.onerror = event => {
				geneatree.emit("log", { message: "Failed to read logs Blob", type: Log.TYPE.ERROR, data: event  })
			}
			reader.readAsDataURL(blob)
		})

	}

}

export default ExportBinding
