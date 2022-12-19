import MapModel from "./minimap/map.js"
import InformationModel from "./minimap/information.js"

import MapBinding from "./minimap/map.binding.js"
import InformationBinding from "./minimap/information.binding.js"

export default {
	tagName: "div",
	id: "tree-viewer-minimap",
	children: [
		{
			model: MapModel,
			binding: MapBinding,
		},
		{
			model: InformationModel,
			binding: InformationBinding
		}
	]
}
