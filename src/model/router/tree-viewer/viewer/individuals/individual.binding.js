import { Binding } from "domodel"

/**
 * @global
 */
class IndividualBinding extends Binding {

	/**
	 * @param {object}     properties
	 * @param {Geneatree}  properties.geneatree
	 * @param {Individual} properties.individual
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { geneatree, individual, cell } = this.properties

		individual.cell = cell

		this.listen(individual, "select", () => {
			this.root.classList.add("selected")
		})

		this.listen(individual, "unselect", () => {
			this.root.classList.remove("selected")
		})

		this.listen(individual, "update", () => {
			for(const key in individual.meta) {
				if(key === "gender") {
					this.identifier.self.classList.remove("unknown", "man", "woman", "other") // FIXME pass old value and use replace instead
					this.identifier.self.classList.add(individual.meta[key])
				} else if(key in this.identifier) {
					this.identifier[key].textContent = individual.meta[key]
				}
			}
			this.identifier.name.textContent = [individual.meta.firstName, individual.meta.lastName].join(" ")
			this.identifier.birth.textContent = (individual.meta.birthDate || individual.meta.birthPlace) && `° ${individual.meta.birthDate || "???"} (${individual.meta.birthPlace || "???"})`
			this.identifier.death.textContent = (individual.meta.deathDate || individual.meta.deathPlace) && `+ ${individual.meta.deathDate || "???"} (${individual.meta.deathPlace || "???"})`
		})

		this.listen(individual, "remove", () => {
			if(geneatree.trees.selected.selectedIndividual === individual) {
				geneatree.trees.selected.individuals.filter(individual_ => individual_ !== individual).forEach(individual_ => individual_.emit("node show"))
			}
			this.root.remove()
		})

		this.listen(individual, "node remove", () => {
			this.root.remove()
		})

		this.listen(individual, "node show", () => {
			this.root.style.visibility = ""
		})

		this.listen(individual, "node hide", () => {
			this.root.style.visibility = "hidden"
		})

		this.listen(individual, "node focus", () => {
			this.identifier.self.focus()
		})

		this.listen(individual, "node animate", () => {
			const step = 2.5
			const max = 100
			let value = max
			const iterations = (max / step)
			this.root.style.filter = `sepia(${value}%)`
			for (let i = 0; i < iterations; i++) {
				setTimeout(() => {
					value -= step
					this.root.style.filter = `sepia(${value}%)`
				}, i * 50)
			}
		})

		this.identifier.self.addEventListener("click", () => {
			if(geneatree.trees.selected.selectedIndividual === individual) {
				geneatree.router.emit("browse", { path: "/individual", properties: { individual } })
			} else {
				geneatree.emit("individual select", individual)
			}
		})

		this.identifier.addParent.addEventListener("click", () => geneatree.router.emit("browse", { path: "/addParent" }))
		this.identifier.addSpouse.addEventListener("click", () => geneatree.router.emit("browse", { path: "/addSpouse" }))
		this.identifier.addChild.addEventListener("click", () => geneatree.router.emit("browse", { path: "/addChild" }))

	}

	onCompleted() {

		const { geneatree, individual } = this.properties

		individual.listen("node center", () => {
			const rect = this.root.getBoundingClientRect()
			const x = Math.abs(geneatree.trees.selected.viewer.x - rect.x)
			const y = Math.abs(geneatree.trees.selected.viewer.y - rect.y)
			geneatree.emit("tree viewer focus", { x, y })
		})

	}

}

export default IndividualBinding
