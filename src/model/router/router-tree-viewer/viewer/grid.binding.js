import { Core, Binding } from 'domodel'

export default class extends Binding {
    
    onCreated() {
    
        const { tree } = this.properties
        
        console.log(tree)
        
    }
}