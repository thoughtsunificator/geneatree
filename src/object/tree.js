import Individual from "./individual.js"
import TreeViewer from "./tree-viewer.js"
import Relationship from "./relationship.js"

import Persistable from "./persistable.js"
import RelationshipIndividual from "./relationship-individual.js"

/**
 * @global
 * A genealogy tree with individuals and relationships
 */
class Tree extends Persistable {

	/**
	 * @param  {number} id
	 * @param  {Object} meta
	 */
	constructor(id, meta) {
		super(id)
		this._meta = meta
		this._individuals = []
		this._relationships = []
		this._viewer = new TreeViewer()
		this._selectedIndividual = null
		this._nextIndividualId = 0
		this._nextRelationshipId = 0
	}

	/**
	 *
	 * @param {Object}   meta
	 */
	addIndividual(meta) {
		const individual = new Individual(this._nextIndividualId++, this, meta)
		this.individuals.push(individual)
		return individual
	}

	/**
	 *
	 * @param {Individual} individual
	 */
	removeIndividual(individual) {
		if(individual === this.selectedIndividual) {
			this.selectedIndividual = null
		}
		this.individuals.splice(this.individuals.indexOf(individual), 1)
	}

	/**
	 * @param  {object} data
	 * @returns {Individual[]}
	 */
	findIndividuals(data) {
		const lowerCaseInput = data.query.toLowerCase()
		return this.individuals.filter(individual => {
			return (
				individual.meta.birthName.toLowerCase().includes(lowerCaseInput)
				|| individual.meta.firstName.toLowerCase().concat(individual.meta.lastName.toLowerCase()).includes(lowerCaseInput)
				|| individual.meta.firstName.toLowerCase().includes(lowerCaseInput)
				|| individual.meta.lastName.toLowerCase().includes(lowerCaseInput)
			) && (!data.alive || individual.meta.deathDate === "")
		})
	}

	/**
	 *
	 * @param {Object}   meta
	 * @param {RelationshipIndividual[]}   relationshipIndividuals
	 */
	addRelationship(type, relationshipIndividuals) {
		const relationship = new Relationship(this._nextRelationshipId++, type, relationshipIndividuals)
		this.relationships.push(relationship)
		return relationship
	}

	/**
	 * @param  {object} data
	 * @returns {Relationship[]}
	 */
	findRelationships(data) {
		return this.relationships.filter(relationship => {
			return relationship.relationshipIndividuals.find(relationshipIndividual => relationshipIndividual.individual == data.individual)
		})
	}

	/**
	 * @type {object}
	 */
	get meta() {
		return this._meta
	}

	/**
	 * @type {Individual[]}
	 */
	get individuals() {
		return this._individuals
	}

	/**
	 * @type {Relationship[]}
	 */
	get relationships() {
		return this._relationships
	}

	/**
	 * @type {Viewer}
	 */
	get viewer() {
		return this._viewer
	}

	/**
	 * @type {Individual}
	 */
	get selectedIndividual() {
		return this._selectedIndividual
	}

	set selectedIndividual(individual) {
		this._selectedIndividual = individual
	}

}

export default Tree
