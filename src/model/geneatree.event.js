import { EventListener } from "domodel"

import IndividualModel from "./router/tree-viewer/individuals/individual.js"

import IndividualBinding from "./router/tree-viewer/individuals/individual.binding.js"

/**
 * @global
 */
class GeneatreeEventListener extends EventListener {

	gridFill(data) {
		const { geneatree } = this.properties
		geneatree.grid.emit("fill", {
			x: data.x,
			y: data.y,
			data: data.data,
			model: IndividualModel(data.data),
			binding: new IndividualBinding({ geneatree, individual: data.data })
		})
	}

}

export default GeneatreeEventListener
