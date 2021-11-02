import { Binding } from "domodel"
import { Paginator, PaginatorModel, PaginatorBinding } from "@domodel/paginator"

import LogModel from "./logs/log.js"

import LogBinding from "./logs/log.binding.js"

import Log from "/object/log.js"

/**
 * @global
 */
class LogsBinding extends Binding {

	render(logs) {
		if(logs.length >= 1) {
			this.identifier.list.style.display = ""
			this.identifier.placeholder.style.display = "none"
			const logs_ = logs.slice().sort((a, b) => a.date - b.date)
			logs_.reverse()
			const items = logs_.map(log => ({
				properties: { log },
				model: LogModel,
				binding: LogBinding
			}))
			this.paginator.emit("itemsSet", items)
		} else {
			this.identifier.list.style.display = "none"
			this.identifier.placeholder.style.display = ""
		}
	}

	onCreated() {

		const { geneatree, router } = this.properties

		const _types = {}

		this.paginator = new Paginator(15)

		this.identifier.exportButton.addEventListener("click", () => {
			router.emit("browse", { path: "/export" })
		})

		this.identifier.clearButton.addEventListener("click", () => {
			geneatree.emit("logs clear")
			const logs = geneatree.findLogs({ query: event.target.value, types: _types })
			this.render(logs)
		})

		this.identifier.searchInput.addEventListener("input", event => {
			const logs = geneatree.findLogs({ query: event.target.value, types: _types })
			this.render(logs)
		})

		this.identifier.types.addEventListener("change", () => {
			for(const key of Object.keys(Log.TYPE)) {
				_types[Log.TYPE[key]] = this.identifier[`type-${Log.TYPE[key].toLowerCase()}`].checked
			}
			const logs = geneatree.findLogs({ query: this.identifier.searchInput.value, types: _types })
			this.render(logs)
		})

		this.run(PaginatorModel, {
			parentNode: this.identifier.list,
			binding: new PaginatorBinding({
				paginator: this.paginator,
				maxShownPages: 5
			})
		})

		for(const key of Object.keys(Log.TYPE)) {
			_types[Log.TYPE[key]] = this.identifier[`type-${Log.TYPE[key].toLowerCase()}`].checked
		}
		const logs = geneatree.findLogs({ query: this.identifier.searchInput.value, types: _types })
		this.render(logs)

	}

}

export default LogsBinding
