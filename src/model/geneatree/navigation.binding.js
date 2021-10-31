import { Binding } from "domodel"

/**
 * @global
 */
class NavigationBinding extends Binding {

	browse(path) {
		this.properties.geneatree.router.emit("browse", { path })
	}


	onCreated() {

		const { geneatree } = this.properties

		this.identifier.viewer.addEventListener("click", () => this.browse("/"))
		this.identifier.about.addEventListener("click", () => this.browse("/about"))
		this.identifier.logs.addEventListener("click", () => this.browse("/logs"))
		this.identifier.settings.addEventListener("click", () => this.browse("/settings"))

	}

}

export default NavigationBinding
