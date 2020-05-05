import { Core, Binding } from 'domodel'

import IndividualModel from "./individuals/individual.js"
import IndividualBinding from "./individuals/individual.binding.js"

export default class extends Binding {

    onCreated() {

        const { tree } = this.properties

				this.listen(this.properties.geneatree.explorer, "ready", () => {
					const rect = this.root.getBoundingClientRect()
					this.properties.geneatree.individuals.emit("gridRendered", { width: rect.width, height: rect.height })
				})

        for(const individual of tree.individuals) {
          this.run(IndividualModel(individual), { binding: new IndividualBinding({ individual }) })
        }

        tree.individuals[0].emit("nodeCenter")

    }

}
