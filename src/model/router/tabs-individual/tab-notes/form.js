export default {
	tagName: "div",
	style: "display: contents",
	children: [
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Title:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									className: "width-100",
									identifier: "title"
								}
							]
						}
					]
				}
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Content:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "textarea",
									className: "width-100",
									identifier: "content"
								}
							]
						}
					]
				}
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Auteur:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									className: "width-100",
									identifier: "author"
								}
							]
						}
					]
				}
			]
		}
	]
}