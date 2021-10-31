export default data => ({
	tagName: "div",
	style: "display: contents",
	children: [
		{
			tagName: "h3",
			className: "title",
			textContent: data.title
		},
		{
			tagName: "h4",
			textContent: "Généalogiste",
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Référence du dossier:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									required: true,
									className: "width-100",
									identifier: "fileReference"
								}
							]
						}
					]
				}
			]
		},
		{
			tagName: "h4",
			textContent: "Notaire",
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					textContent: "Nom du notaire:",
					children: [
						{
							tagName: "div",
							children: [
								{
									tagName: "input",
									className: "width-100",
									identifier: "notaryName"
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
						textContent: "Nom du clerc:",
						children: [
							{
								tagName: "div",
								children: [
									{
										tagName: "input",
										className: "width-100",
										identifier: "clerkName"
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
						textContent: "Référence du dossier:",
						children: [
							{
								tagName: "div",
								children: [
									{
										tagName: "input",
										className: "width-100",
										identifier: "notaryFileReference"
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
						textContent: "Email:",
						children: [
							{
								tagName: "div",
								children: [
									{
										tagName: "input",
										className: "width-100",
										type: "email",
										identifier: "notaryEmail"
									}
								]
							}
						]
					}
				]
			}
		]
})
