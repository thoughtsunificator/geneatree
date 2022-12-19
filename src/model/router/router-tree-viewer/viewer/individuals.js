import GridModel from "./grid.js"
import GridBinding from "./grid.binding.js"

export default {
	tagName: "div",
	id: "tree-viewer-individuals",
	style: "position: absolute",
	children: [
		{
			tagName: "div",
			identifier:"focusOne",
			tabIndex: 0
		},
		{
			model: GridModel,
			binding: GridBinding,
		},
		{
			tagName: "div",
			identifier:"focusTwo",
			tabIndex: 0
		}
	]
}
