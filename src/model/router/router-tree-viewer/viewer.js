import ExplorerModel from "./viewer/explorer.js"
import MinimapModel from "./viewer/minimap.js"
import IndividualsModel from "./viewer/individuals.js"

import MinimapBinding from "./viewer/minimap.binding.js"
import ExplorerBinding from "./viewer/explorer.binding.js"
import IndividualsBinding from "./viewer/individuals.binding.js"

export default data => ({
	tagName: "div",
	id: "tree-viewer-viewer",
	children: [
		{
			model: ExplorerModel,
			binding: ExplorerBinding,
		},
		{
			model: IndividualsModel,
			binding: IndividualsBinding
		},
		{
			model: MinimapModel,
			binding: MinimapBinding,
		}
	]
})
