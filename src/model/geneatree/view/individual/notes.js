export default {
	tagName: "div",
	className: "tab-notes",
	style: "display: grid; grid-gap: 20px",
	children: [
		{
			tagName: "h3",
			identifier: "title",
			textContent: `Liste des notes`
		},
		{
			tagName: "div",
			identifier: "body",
			style: "display: contents"
		},
	]
}
