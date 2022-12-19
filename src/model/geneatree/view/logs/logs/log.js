export default data => ({
	tagName: "div",
	className: "log",
	children: [
		{
			tagName: "span",
			style: "text-decoration: underline",
			textContent: data.log.type
		},
		{
			tagName: "span",
			title: data.log.date,
			textContent: `${data.log.date.toLocaleTimeString('fr-FR')}:${data.log.date.getMilliseconds()} ${data.log.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric' })}`
		},
		{
			tagName: "span",
			style: "word-break: break-all;",
			textContent: data.log.message
		}
	]
})
