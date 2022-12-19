import ExplorerModel from "./tree-viewer/explorer.js"
import MinimapModel from "./tree-viewer/minimap.js"
import IndividualsModel from "./tree-viewer/individuals.js"

import MinimapBinding from "./tree-viewer/minimap.binding.js"
import ExplorerBinding from "./tree-viewer/explorer.binding.js"
import IndividualsBinding from "./tree-viewer/individuals.binding.js"

export default data => ({
	tagName: "div",
	style: "height: 100%",
	id: "tree-viewer",
	children: [
		{
			model: ExplorerModel,
			binding: ExplorerBinding,
		},
		{
			model: IndividualsModel,
			binding: IndividualsBinding
		},
		...[data.geneatree.settings.minimap && {
			model: MinimapModel,
			binding: MinimapBinding,
		}].filter(Boolean)
	]
})
