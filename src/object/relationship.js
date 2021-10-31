import Persistable from "./persistable.js"

/**
 * @global
 */
class Relationship extends Persistable {

	/**
	 * @property RelationshipType {RelationshipType}
	 * @property RelationshipType.BIOLOGICAL  {string}
	 * @property RelationshipType.MARRIAGE    {string}
	 * @property RelationshipType.PACS        {string}
	 * @property RelationshipType.CONCUBINAGE {string}
	 * @property RelationshipType.DIVORCE     {string}
	 * @property RelationshipType.VEUVAGE     {string}
	 */
	static TYPES = {
		BIOLOGICAL: "BIOLOGICAL",
		MARRIAGE: "MARRIAGE",
		PACS: "PACS",
		CONCUBINAGE: "CONCUBINAGE",
		DIVORCE: "DIVORCE",
		VEUVAGE: "VEUVAGE"
	}

	/**
	 * @param  {number} id
	 * @param  {RelationshipType} type
	 * @param  {RelationshipIndividual} relationshipIndividual1
	 * @param  {RelationshipIndividual} relationshipIndividual2
	 */
	constructor(id, type, relationshipIndividual1, relationshipIndividual2) {
		super(id)
		this._type = type
		this._relationshipIndividual1 = relationshipIndividual1
		this._relationshipIndividual2 = relationshipIndividual2
		this._meta = {
			startDate: null,
			endDate: null,
			place: ""
		}
	}

	/**
	 * @readonly
	 * @type {RelationshipType}
	 */
	get type() {
		return this._type
	}

	/**
	 * @readonly
	 * @type {Individual}
	 */
	get relationshipIndividual1() {
		return this._relationshipIndividual1
	}

	/**
	 * @readonly
	 * @type {Individual}
	 */
	get relationshipIndividual2() {
		return this._relationshipIndividual2
	}

	/**
	 * @readonly
	 * @type {object}
	 */
	get meta() {
		return this._meta
	}

}

export default Relationship
