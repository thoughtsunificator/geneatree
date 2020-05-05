import { Core, Binding } from 'domodel'
import { Paginator, PaginatorModel, PaginatorBinding } from '@domodel/paginator'

import RelationshipModel from "./home/relationship.js"
import RelationshipBinding from "./home/relationship.binding.js"

export default class extends Binding {

    onCreated() {

			this.paginator = new Paginator(3)

			this.identifier.searchInput.addEventListener("input", () => this.render())
			this.identifier.addButton.addEventListener("click", () => {
				this.properties.router.emit("browse", { path: "/add", properties: { tree: this.properties.individual.tree, individual: this.properties.individual.tree.selectedIndividual } })
			})

			this.listen(this.properties.geneatree.individuals, "relationshipsRemoved", () => this.render())

			this.run(PaginatorModel, {
				parentNode: this.identifier.list,
				binding: new PaginatorBinding({
					paginator: this.paginator,
					maxShownPages: 3
				})
			})

			this.render()

    }

	render() {
		this.identifier.placeholder.style.display = "" // TODO
		const relationships = this.properties.individual.tree.findRelationships({ individual: this.properties.individual })
		if(relationships.length === 0) {
			this.identifier.placeholder.style.display = ""
			this.identifier.list.style.display = "none"
		} else {
			this.identifier.placeholder.style.display = "none"
			this.identifier.list.style.display = "grid"
			this.paginator.emit("itemsSet", relationships.map(relationship => ({
				model: RelationshipModel,
				binding: RelationshipBinding,
				properties: relationship
			})))
		}
	}
}
