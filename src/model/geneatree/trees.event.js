import { EventListener } from "domodel"

import Log from "../../object/log.js"

/**
 * @global
 */
class TreesEventListener extends EventListener {

	/**
	 * @event TreesEventListener#add
	 * @property {array} data
	 */
	add(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] [tree] add", data })
		const tree = geneatree.trees.add(data[0].meta)
		if(data[0].type === "online") {
			tree.networkId = data[0]._id
		} else if(data[0].type === "offline") {
			tree.offlineId = data[0].id
		}
		for(const [index, data_] of data[1].entries()) {
			const individual = tree.addIndividual({ ...data_.meta, decujus: index === 0 })
			if(data[0].type === "online") {
				individual.networkId = data_._id
			} else if(data[0].type === "offline") {
				individual.offlineId = data_.id
			}
			if(data_.x) {
				individual.cellX = data_.x
			}
			if(data_.y) {
				individual.cellY = data_.y
			}
			if(data_.notes) {
				data_.notes.forEach(note => {
					const note_ = individual.addNote(note.title, note.content, note.author, new Date(note.date))
					if(data[0].type === "online") {
						note_.networkId = note._id
					} else if(data[0].type === "offline") {
						note_.offlineId = note.id
					}
				})
			}
		}
		geneatree.trees.emit("listAdd", tree)
		geneatree.trees.emit("added", tree)
	}

	/**
	 * @event TreesEventListener#listAdd
	 * @property {Tree} data
	*/

	/**
	 * @event TreesEventListener#added
	 * @property {Tree} data
	*/

	/**
	 * @event TreesEventListener#update
	 * @property {Tree} data
	 */
	update(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] [tree] update", data })
		for(const key in data.form) {
			data.tree.meta[key] = data.form[key]
		}
		data.tree.emit("update")
		geneatree.trees.emit("updated", data)
	}

	/**
	 * @event TreesEventListener#updated
	 * @property {Tree} data
	*/

	/**
	 * @event TreesEventListener#remove
	 * @property {Tree} data
	 */
	remove(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] [tree] remove", data })
		geneatree.trees.remove(data)
		data.emit("remove")
		geneatree.trees.emit("removed", data)
		geneatree.router.emit("browse", { path: "/" })
	}

	/**
	 * @event TreesEventListener#removed
	 * @property {Tree} data
	*/

	/**
	 * @event TreesEventListener#select
	 * @property {Tree} data
	 */
	select(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] [tree] select", data })
		if(geneatree.trees.selected !== null) {
			geneatree.trees.emit("unselect", geneatree.trees.selected)
		}
		geneatree.trees.selected = data
		data.emit("select")
		geneatree.trees.list.filter(tree => tree !== data).forEach(tree => tree.emit("unselect"))
		this.root.style.display = ""
		geneatree.trees.emit("selected", data)
	}

	/**
	 * @event TreesEventListener#selected
	 * @property {Tree} data
	*/

	/**
	 * @event TreesEventListener#unselect
	 * @property {Tree} data
	 */
	unselect(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] [tree] unselect", data })
		geneatree.trees.selected.individuals.forEach(individual => individual.emit("nodeRemove"))
		geneatree.trees.selected.selectedIndividual = null
		geneatree.trees.selected = null
		data.emit("unselect")
		data.individuals.forEach(individual => individual.emit("nodeRemove"))
		geneatree.trees.emit("unselected", data)
	}

	/**
	 * @event TreesEventListener#unselected
	 * @property {Tree} data
	*/

	/**
	 * @event TreesEventListener#toggle
	 * @property {Tree} data
	 */
	toggle(data) {
		const { geneatree } = this.properties
		geneatree.emit("log", { type: Log.TYPE.DEBUG, message: "[ui] [tree] toggle", data })
		if(data.toggle === true) {
			this.root.style.display = "grid"
		} else {
			this.root.style.display = "none"
		}
		geneatree.trees.toggled = data.toggle

	}

}

export default TreesEventListener
