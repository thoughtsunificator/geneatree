import ExplorerModel from "./tree-viewer/explorer.js"
import MinimapModel from "./tree-viewer/minimap.js"
import OSDModel from "./tree-viewer/osd.js"
import PlaceholderModel from "./tree-viewer/placeholder.js"
import IndividualsModel from "./tree-viewer/individuals.js"

import MinimapBinding from "./tree-viewer/minimap.binding.js"
import OSDBinding from "./tree-viewer/osd.binding.js"
import ExplorerBinding from "./tree-viewer/explorer.binding.js"
import PlaceholderBinding from "./tree-viewer/placeholder.binding.js"
import IndividualsBinding from "./tree-viewer/individuals.binding.js"

export default data => ({
	tagName: "div",
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
		{
			model: MinimapModel,
			binding: MinimapBinding,
		},
		{
			model: OSDModel,
			binding: OSDBinding,
		},
		{
			model: PlaceholderModel,
			binding: PlaceholderBinding,
		}
	]
})
