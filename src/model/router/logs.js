import Log from "../../object/log.js"

export default data => ({
	tagName: "div",
	id: "view-logs",
	children: [
		{
			tagName: "h3",
			identifier: "title",
			textContent: `Logs`
		},
		{
			tagName: "div",
			identifier: "router"
		}
	]
})
