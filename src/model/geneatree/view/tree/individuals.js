export default {
	tagName: "div",
	className: "tab-individuals",
	style: "display: grid; grid-gap: 20px",
	children: [
		{
			tagName: "h3",
			className: "title",
			identifier: "title",
			textContent: `Individuals`
		},
		{
			tagName: "div",
			style: "display: grid; grid-gap: 20px;",
			children: [
				{
					tagName: "input",
					identifier: "searchInput",
					placeholder: "Filter individuals",
				},
				{
					tagName: "div",
					style: "display: none; text-align: center;",
					identifier: "placeholder",
					textContent: "No individuals were found for this query."
				},
				{
					tagName: "div",
					className: "grid-gap",
					style: "display: none;",
					identifier: "list"
				}
			]
		}
	]
}
