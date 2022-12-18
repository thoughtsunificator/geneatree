import { Core, Binding } from "domodel"
import { Paginator, PaginatorModel, PaginatorBinding } from "@domodel/paginator"

import RelationshipModel from "./tab-relationships/relationship.js"

import RelationshipBinding from "./tab-relationships/relationship.binding.js"

/**
 * @global
 */
class TabRelationshipsBinding extends Binding {

	static MAIN_VIEW = "list"

	/**
	 * @param {string} view
	 */
	setView(view) {
		if(view !== TabRelationshipsBinding.MAIN_VIEW) {
			this.identifier.back.style.display = ""
		} else {
			this.identifier.back.style.display = "none"
		}
		Object.keys(this.identifier).filter(key => key.slice(0, 5) === "view-" && key.slice(5) !== view).forEach(key => this.identifier[key].style.display = "none")
		this.identifier[`view-${view}`].style.display = ""
	 }

	render(relationships) {
		this.paginator.emit("reset")
		if(relationships.length >= 1) {
			this.identifier.list.style.display = ""
			this.identifier.placeholder.style.display = "none"
			const relationships_ = relationships.slice().sort((a, b) => a.meta.startDate - b.meta.startDate)
			relationships_.reverse()
			const items = relationships_.map(relationship => ({
				observable: relationship,
				model: RelationshipModel(relationship),
				binding: new RelationshipBinding({ application: this.properties.geneatree, individual: this.properties.geneatree.trees.selected.selectedIndividual, relationship })
			}))
			for(const item of items) {
				this.paginator.emit("item add", item)
			}
			this.paginator.emit("initialize")
			this.paginator.emit("navigate", this.paginator.pages[0])
		} else {
			this.identifier.list.style.display = "none"
			this.identifier.placeholder.style.display = ""
		}
	}

	onCreated() {

		const { geneatree, tab } = this.properties

		let _individual = null

		this.paginator = new Paginator(3)

		this.listen(geneatree.individuals, "selected", () => {
			_individual = geneatree.trees.selected.selectedIndividual
			this.render(geneatree.trees.selected.findRelationships({ individual: _individual }))
		})
		this.listen(geneatree, "relationshipAdded", () => this.render(geneatree.trees.selected.findRelationships({ individual: _individual })))
		this.listen(geneatree, "relationshipUpdated", () => this.render(geneatree.trees.selected.findRelationships({ individual: _individual })))
		this.listen(geneatree, "relationshipRemoved", () => this.render(geneatree.trees.selected.findRelationships({ individual: _individual })))
		this.listen(tab, "unset", () => {
			this.setView(TabRelationshipsBinding.MAIN_VIEW)
		})
		this.listen(tab, "set", () => {
			this.setView(TabRelationshipsBinding.MAIN_VIEW)
			this.render(geneatree.trees.selected.findRelationships({ individual: _individual }))
		})
		// this.identifier.searchInput.addEventListener("input", () => {
		// 	const notesList = geneatree.trees.selected.selectedIndividual.findNotes(event.target.value)
		// 	this.render(notesList)
		// })
		this.identifier.back.addEventListener("click", () => {
			this.setView(TabRelationshipsBinding.MAIN_VIEW)
		})

		this.run(PaginatorModel, {
			parentNode: this.identifier.list,
			binding: new PaginatorBinding({
				paginator: this.paginator,
				maxShownPages: 3
			})
		})

		this.setView(TabRelationshipsBinding.MAIN_VIEW)

	}

}

export default TabRelationshipsBinding
