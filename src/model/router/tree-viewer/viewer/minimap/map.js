import CursorModel from "./map/cursor.js"
import IndividualsModel from "./map/individuals.js"

import CursorBinding from "./map/cursor.binding.js"
import IndividualsBinding from "./map/individuals.binding.js"

export default {
	tagName: "div",
	title: "Cliquer pour naviguer",
	className: "map",
	children: [
		{
			model: IndividualsModel,
			binding: IndividualsBinding
		},
		{
			model: CursorModel,
			binding: CursorBinding
		},
	]
}
