export default data => ({
	tagName: "div",
	id: "view-logs",
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
			tagName: "div",
			style: "padding-top: 10px",
			identifier: "router"
		}
	]
})
