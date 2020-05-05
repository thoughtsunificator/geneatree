export default {
	tagName: "div",
	className: "tab-notes",
	style: "display: grid; grid-gap: 20px",
	children: [
		{
			tagName: "div",
			style: "display: none;",
			children: [
				{
					tagName: "button",
					identifier: "back",
					style: "width: 100px;",
					textContent: "Back"
				},
			]
		},
		{
			tagName: "h3",
			identifier: "title",
			textContent: `Notes`
		},
		{
			tagName: "div",
			identifier: "body",
			style: "display: contents"
		},
	]
}
