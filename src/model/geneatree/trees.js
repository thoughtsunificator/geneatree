import TreesFilterModel from "./trees/filter.js"
import TreesListModel from "./trees/list.js"

import TreesFilterBinding from "./trees/filter.binding.js"
import TreesListBinding from "./trees/list.binding.js"

export default {
	tagName: "div",
	id: "trees",
	children: [
		{
			tagName: "div",
			className: "logo",
			textContent: "geneatree"
		},
		{
			tagName: "div",
			identifier: "filterAdd",
			id: "search",
			style: "display: grid; border-bottom: 1px solid #0000002b;",
			children: [
				{
					model: TreesFilterModel,
					binding: TreesFilterBinding,
				}
			]
		},
		{
			model: TreesListModel,
			binding: TreesListBinding,
		}
	]
}
