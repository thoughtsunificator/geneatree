export default {
	tagName: "div",
	className: "tab-relationships",
	style: "display: grid; grid-gap: 20px",
	children: [
		{
			tagName: "div",
			style: "display: none;",
			children: [
				{
					tagName: "button",
					identifier: "back",
					style: "width: 100px; margin-top: 10px",
					textContent: "Back"
				},
			]
		},
		{
			tagName: "h3",
			identifier: "title",
			textContent: `Add a relationship`
		},
		{
			tagName: "div",
			identifier: "body",
		},
	]
}
