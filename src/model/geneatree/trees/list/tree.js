export default data => ({
	tagName: "div",
	className: "tree",
	tabIndex: 0,
	children: [
		{
			tagName: "div",
			identifier: "fileReference",
			style: "overflow: hidden",
			textContent: data.meta.fileReference,
			title: data.meta.fileReference
		},
		{
			tagName: "button",
			identifier: "editButton",
			className: "edit-icon",
			title: "Editer",
			textContent: "📝"
		}
	]
})
