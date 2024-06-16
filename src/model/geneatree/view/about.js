export default data => ({
	tagName: "div",
	id: "view-about",
	style: "display: grid; grid-gap: 10px",
	children: [
		{
			tagName: "div",
			className: "title",
			children: [
				{
					tagName: "h3",
					identifier: "title",
					style: "text-align: center; padding-top: 10px",
					textContent: `geneatree v0.0.8`
				},
			]
		},
		{
			tagName: "div",
			className: "releases",
			children: [
				{
					tagName: "div",
					className: "release",
					style: "background-color: rgba(128, 128, 128, 0.26);padding: 20px;border-bottom: 2px solid #6868688f;border-radius: 2px;",
					children: [
						{
							tagName: "h4",
							textContent: "v0.0.1"
						},
						{
							tagName: "ul",
							children: [
								{
									tagName: "li",
									textContent: "Initial release"
								}
							]
						}
					]
				}
			]
		}
	]
})
