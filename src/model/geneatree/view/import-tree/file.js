import { FormModel } from "@domodel/form"
import { TREE_FORMATS_IMPORT } from "../../../geneatree.binding.js"

export default FormModel(({
	tagName: "div",
	style: "display: contents",
	children: [
		{
			tagName: "h3",
			textContent: "Import a file",
			className: "title"
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Format:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "select",
									style: "width: 100%",
									identifier: "format",
									required: true,
									children: TREE_FORMATS_IMPORT.map(format => ({
										tagName: "option",
										textContent: format,
										value: format
									}))
								}
							]
						}
					]
				}
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "File:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									required: true,
									accept: ".GED",
									type: "file",
									style: "width: 100%",
									identifier: "file"
								}
							]
						}
					]
				}
			]
		}
	]
}))