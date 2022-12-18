import "./main.css"

import { Core } from "domodel"

import GeneatreeModel from "./model/geneatree.js"
import GeneatreeBinding from "./model/geneatree.binding.js"

import Geneatree from "./object/geneatree.js"
import Log from "./object/log.js"

import Persistence from "./persistence/persistence.js"

function boot(message) {

	const geneatree = new Geneatree()
	const binding = new GeneatreeBinding({ geneatree })

	geneatree.listen("log", data => {
		const { message = null, type = Log.TYPE.INFO } = data
		const log = geneatree.log(message, data.data, type)
		geneatree.emit("log added", log)
	})

	geneatree.listen("logs clear", () => {
		const logs = geneatree.logs.slice()
		for(const log of logs) {
			geneatree.emit("log remove", log)
		}
	})

	geneatree.listen("log remove", data => {
		geneatree.logs.splice(geneatree.logs.indexOf(data))
		geneatree.emit("log removed", data)
	})

	geneatree.listen("reboot", data => {
		binding.remove()
		boot(data)
	})

	geneatree.emit("log", { message: "Application started" })

	Persistence({ geneatree })

	Core.run(GeneatreeModel, {
		binding,
		parentNode: document.body
	})

	if(message) {
		geneatree.emit("osdSet", message)
	}
}

window.addEventListener("load", function() {
	boot()
})
