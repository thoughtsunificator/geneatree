import { Core, Binding } from "domodel"

/**
 * @global
 */
class IndividualBinding extends Binding {

	/**
	 * @param {object}    properties
	 * @param {Geneatree} properties.geneatree
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree, individual } = this.properties

		individual.listen("update", () => {
			for(const key in individual.meta) {
				if(key === "gender") {
					this.root.classList.remove("unknown", "man", "woman", "other") // FIXME pass old value and use replace instead
					this.root.classList.add(individual.meta[key])
				} else if(key in this.identifier) {
					this.identifier[key].textContent = individual.meta[key]
				}
			}
		})

		individual.listen("remove", () => {
			this.root.remove()
		})

		individual.listen("node remove", () => {
			this.root.remove()
		})

	}

}

export default IndividualBinding
