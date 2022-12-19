import { Core, Binding } from 'domodel'

import IndividualModel from "./individuals/individual.js"
import IndividualBinding from "./individuals/individual.binding.js"

export default class extends Binding {
    
    onCreated() {
    
        const { tree } = this.properties

        for(const individual of tree.individuals) {
            this.run(IndividualModel(individual), { binding: new IndividualBinding({ individual }) })
        }
        
        console.log(tree.individuals)
        
    }
}