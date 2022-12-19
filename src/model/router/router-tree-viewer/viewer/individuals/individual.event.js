import { EventListener } from "domodel"

/**
 * @global
 */
class IndividualEventListener extends EventListener {

	select() {
        this.root.classList.add("selected")
    }

    unselect() {
        this.root.classList.remove("selected")
    }

    update() {
        for(const key in individual.meta) {
            if(key === "gender") {
                this.identifier.self.classList.remove("unknown", "man", "woman", "other") // FIXME pass old value and use replace instead
                this.identifier.self.classList.add(individual.meta[key])
            } else if(key in this.identifier) {
                this.identifier[key].textContent = individual.meta[key]
            }
        }
        this.identifier.name.textContent = [individual.meta.firstName, individual.meta.lastName].join(" ")
        this.identifier.birth.textContent = (individual.meta.birthDate || individual.meta.birthPlace) && `° ${individual.meta.birthDate || "???"} (${individual.meta.birthPlace || "???"}`
        this.identifier.death.textContent = (individual.meta.deathDate || individual.meta.deathPlace) && `+ ${individual.meta.deathDate || "???"} (${individual.meta.deathPlace || "???"}`
    }

    remove() {
        if(this.properties.geneatree.trees.selected.selectedIndividual === individual) {
            this.properties.geneatree.trees.selected.individuals.filter(individual_ => individual_ !== individual).forEach(individual_ => individual_.emit("nodeShow"))
        }
        this.root.remove()
    }

    nodeRemove() {
        this.root.remove()
    }

    nodeShow() {
        this.root.style.visibility = ""
    }

    nodeHide() {
        this.root.style.visibility = "hidden"
    }

    nodeFocus() {
        this.identifier.self.focus()
    }

    nodeAnimate() {
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
    }

}

export default IndividualEventListener
