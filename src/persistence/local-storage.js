import Log from "../object/log.js"

export default properties => {

	const { geneatree } = properties

	geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[persistence:localStorage] Loaded" })

	if(localStorage.getItem("settings") !== null) {
		geneatree.settings = JSON.parse(localStorage.getItem("settings"))
	}

	geneatree.listen("settingsSet", data => {
		geneatree.emit("log" , { type: Log.TYPE.DEBUG, message: "[ui] settingsSet", data })
		geneatree.settings = {...geneatree.settings, ...data }
		localStorage.setItem("settings", JSON.stringify(geneatree.settings))
		geneatree.emit("settingsSaved")
	})

}
