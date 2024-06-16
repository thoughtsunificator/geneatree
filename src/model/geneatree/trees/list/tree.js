export default data => ({
	tagName: "div",
	className: "tree",
	tabIndex: 0,
	children: [
		{
			tagName: "div",
			textContent: "🌲"
		},
		{
			tagName: "div",
			identifier: "name",
			style: "overflow: hidden",
			textContent: data.meta.name,
			title: data.meta.name
		},
		{
			tagName: "button",
			identifier: "editButton",
			className: "edit-icon",
			title: "Edit",
			textContent: "📝"
		}
	]
})
