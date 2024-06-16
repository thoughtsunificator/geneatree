export default data => ({
	tagName: "div",
	className: "note",
	children: [
		{
			tagName: "h3",
			identifier: "title",
			textContent: data.note.title
		},
		{
			tagName: "div",
			identifier: "content",
			textContent: data.note.content
		},
		{
			tagName: "div",
			identifier: "author",
			textContent: `${data.note.author}`
		},
		{
			tagName: "div",
			textContent: ` ${data.note.date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
		},
		{
			tagName: "div",
			className: "actions",
			children: [
				{
					tagName: "button",
					textContent: "Edit",
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
