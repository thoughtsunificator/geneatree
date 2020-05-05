import { FormModel } from "@domodel/form"

import { TREE_FORMATS_EXPORT } from "../../../../geneatree.binding.js"

export default data => FormModel({
	tagName: "div",
	style: "display: contents",
	children: [
		{
			tagName: "label",
			textContent: "Format",
			children: [
				{
					tagName: "div",
					children: [
						{
							tagName: "select",
							style: "width: 100%",
							identifier: "format",
							children: TREE_FORMATS_EXPORT.map(format => ({
								tagName: "option",
								textContent: format
							}))
						}
					]
				}
			]
		}
	]
})
