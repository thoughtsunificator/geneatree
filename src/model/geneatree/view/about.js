export default data => ({
	tagName: "div",
	id: "view-about",
	style: "display: grid; grid-gap: 10px",
	children: [
		{
			tagName: "div",
			className: "title",
			style: "display: grid; grid-template-columns: auto 1fr;grid-auto-columns: max-content;",
			children: [
				{
					tagName: "h3",
					identifier: "title",
					textContent: `geneatree v0.0.8`
				},
			]
		}
	]
})
