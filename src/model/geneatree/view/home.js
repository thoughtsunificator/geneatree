export default data => ({
	tagName: "div",
	id: "tree-viewer-placeholder",
	children: [
		{
			tagName: "div",
			className: "body",
			children: [
				{
					tagName: "div",
					style: "display: grid; grid-gap: 5px",
					children: [
						{
							tagName: "p",
							style: "text-align: center; color: white; padding: 15px 0;",
							innerHTML: "Welcome to <b>geneatree</b>",
							children: [
								{
									tagName:"p",
									style: "text-align: center; color: white; padding: 15px 0px;",
									innerHTML: "<u>Select an existing tree</u>"
								},
								{
									tagName: "p",
									innerHTML: "<small>OR</small>"
								},
							]
						},
						{
							tagName: "button",
							identifier: "createButton",
							tabIndex: 1,
							textContent: "Create a new tree"
						},
						{
							tagName: "button",
							identifier: "importButton",
							tabIndex: 2,
							textContent: "Import existing tree"
						}
					]
				}
			]
		}
	]
})
