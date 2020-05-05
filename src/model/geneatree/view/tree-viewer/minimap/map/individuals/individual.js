export default data => ({
	tagName: "div",
	className: `individual ${data.meta.gender} ${data.meta.decujus ? "decujus" : ""}`
})
