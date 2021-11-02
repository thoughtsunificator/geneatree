export default data => ({
	tagName: "div",
	style: "display: grid; grid-gap: 5px; padding: 10px;",
	children: [
		{
			tagName: "button",
			identifier: "general",
			textContent: "General"
		},
		{
			tagName: "button",
			identifier: "action",
			textContent: "Actions"
		}
	]
})
