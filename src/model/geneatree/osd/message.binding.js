import { Binding } from "domodel"

/**
 * @global
 */
class MessageBinding extends Binding {

	onCreated() {

		const { duration = 3500 } = this.properties

		setTimeout(async () => {
			const step = 0.1
			const max = 1
			let value = max
			const iterations = (max / step)
			for (let i = 0; i < iterations; i++) {
				await new Promise(resolve => {
					setTimeout(() => {
						value -= step
						this.root.style.opacity = value
						resolve()
					}, i * 5)
				})
			}
			this.remove()
		}, duration)


	}

}

export default MessageBinding
