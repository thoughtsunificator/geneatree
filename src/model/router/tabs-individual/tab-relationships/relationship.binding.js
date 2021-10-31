import { Core, Binding } from "domodel"
import { ItemBinding } from "@domodel/paginator"

/**
 * @global
 */
export default class extends ItemBinding {

	onCreated() {

		super.onCreated(this.properties)

		const { application: geneatree, individual, relationship, page } = this.properties

		individual.listen("update", () => {
			for(const key in individual.meta) {
				if(key === "gender") {
					this.identifier.self.classList.remove("unknown", "man", "woman", "other")
					this.identifier.self.classList.add(individual.meta[key])
				} else if(key in this.identifier) {
					this.identifier[key].textContent = individual.meta[key]
				}
			}
			this.identifier.name.textContent = [individual.meta.firstName, individual.meta.lastName].join(" ")
			this.identifier.birth.textContent = (individual.meta.birthDate || individual.meta.birthPlace) && `° ${individual.meta.birthDate || "???"} (${individual.meta.birthPlace || "???"})`
			this.identifier.death.textContent = (individual.meta.deathDate || individual.meta.deathPlace) && `+ ${individual.meta.deathDate || "???"} (${individual.meta.deathPlace || "???"})`
		})

		this.root.addEventListener("click", () => {
			console.log("test")
		})

	}

}
