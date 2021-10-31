import { Core, Binding } from "domodel"
import { Paginator, PaginatorModel, PaginatorBinding } from "@domodel/paginator"

import TreeIndividualModel from "./tab-individuals/individual.js"

import IndividualBinding from "./tab-individuals/individual.binding.js"

/**
 * @global
 */
class TabIndividuals extends Binding {

	render(individuals) {
		this.paginator.emit("reset")
		if(individuals.length >= 1) {
			this.identifier.individuals.style.display = ""
			this.identifier.placeholder.style.display = "none"
			const items = individuals.map(individual => ({
				observable: individual,
				model: TreeIndividualModel(individual),
				binding: new IndividualBinding({ geneatree: this.properties.geneatree, individual, popup: this.properties.popup })
			}))
			for(const item of items) {
				this.paginator.emit("item add", item)
			}
			this.paginator.emit("initialize")
			this.paginator.emit("navigate", this.paginator.pages[0])
		} else {
			this.identifier.individuals.style.display = "none"
			this.identifier.placeholder.style.display = ""
		}
	}

	onCreated() {

		const { geneatree, tab } = this.properties

		this.paginator = new Paginator(5)

		tab.listen("set", () => this.render(this.properties.geneatree.trees.selected.individuals))

		this.listen(geneatree, "individual added", () => this.render(this.properties.geneatree.trees.selected.individuals))
		this.listen(geneatree, "tree selected", () => this.render(this.properties.geneatree.trees.selected.individuals))
		this.listen(geneatree, "individual removed", () => this.render(this.properties.geneatree.trees.selected.individuals))
		this.listen(geneatree, "individual updated", () => this.render(this.properties.geneatree.trees.selected.individuals))

		this.identifier.searchInput.addEventListener("input", event => {
			const individualsList = geneatree.trees.selected.findIndividuals({ query: event.target.value })
			this.render(individualsList)
		})

		this.run(PaginatorModel, {
			parentNode: this.identifier.individuals,
			binding: new PaginatorBinding({
				paginator: this.paginator,
				maxShownPages: 3
			})
		})

	}

}

export default TabIndividuals
