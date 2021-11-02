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
					style: "grid-column-start: 1; grid-row: 1; justify-self: center; align-self: center; grid-column-end: 3;",
					textContent: `geneatree v0.0.8`
				},
			]
		}
	]
})
