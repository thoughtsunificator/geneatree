export default {
	tagName: "div",
	style: "display: grid; grid-gap: 20px",
	children: [
		{
			tagName: "div",
			className: "title",
			style: "display: grid;grid-template-columns: auto 1fr;grid-auto-columns: max-content;",
			children: [
				{
					tagName: "h3",
					identifier: "title",
					textContent: `Actions`
				},
			]
		},
		{
			tagName: "div",
			identifier: "body"
		}
	]
}
