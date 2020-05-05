export default data => ({
	tagName: "div",
	className: "tab-actions",
	style: "display: grid; grid-gap: 20px",
	children: [
		{
			tagName: "div",
			className: "title",
			style: "display: grid; grid-template-columns: auto 1fr; grid-auto-columns: max-content;",
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
			style: "display: grid; grid-gap: 5px; background-color: #b29e9e; padding: 10px;",
			children: [
				{
					tagName: "button",
					className: "button",
					identifier: "view",
					textContent: "View on explorer"
				},
				{
					tagName: "button",
					className: "button-danger",
					identifier: "delete",
					disabled: data.meta.decujus,
					textContent: "Delete"
				}
			]
		}
	]
})
