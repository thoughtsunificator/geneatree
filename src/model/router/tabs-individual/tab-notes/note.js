export default data => ({
	tagName: "div",
	className: "note",
	children: [
		{
			tagName: "h3",
			identifier: "title",
			textContent: data.title
		},
		{
			tagName: "div",
			identifier: "content",
			textContent: data.content
		},
		{
			tagName: "div",
			identifier: "author",
			textContent: `${data.author}`
		},
		{
			tagName: "div",
			textContent: ` ${data.date.toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
		},
		{
			tagName: "div",
			className: "actions",
			children: [
				{
					tagName: "button",
					textContent: "Editer",
					className: "button4",
					identifier: "edit"
				},
				{
					tagName: "button",
					textContent: "X",
					className: "button-danger",
					identifier: "remove"
				}
			]
		}
	]
})