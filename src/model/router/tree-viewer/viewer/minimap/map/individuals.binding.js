import { Core, Binding } from "domodel"
import { Grid, GridModel, GridBinding } from "@domodel/grid"

import IndividualModel from "./individuals/individual.js"

import IndividualBinding from "./individuals/individual.binding.js"

/**
 * @global
 */
class IndividualsBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree } = this.properties

		const _grid = new Grid()

		this.listen(geneatree, "tree viewer minimap coordinates updated", data => {
			this.root.style.left = data.cursorX + "px"
			this.root.style.top = data.cursorY + "px"
		})

		this.listen(geneatree, "gridFill", data => {
			_grid.emit("fill", {
				x: data.x,
				y: data.y,
				data: data.data,
				model: IndividualModel(data.data),
				binding: new IndividualBinding({ geneatree, individual: data.data })
			})
		})

		this.run(GridModel, { parentNode: this.root, binding: new GridBinding({ grid: _grid }) })

	}

}

export default IndividualsBinding
