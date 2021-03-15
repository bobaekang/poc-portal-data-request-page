/** @typedef {string} Timestamp */
/** @typedef {number} AttributeId */
/** @typedef {number} DataRequestId */
/** @typedef {number} MessageId */
/** @typedef {number} ResearchId */
/** @typedef {number} UserId */
/** @typedef {'NOT_SUBMITTED' | 'UNDER_REVIEW' | 'UPDATE_REQUESTED' | 'APPROVED' | 'REJECTED'} DataRequestState */
/** @typedef {'SUBMIT'} ResearcherActionType */
/** @typedef {'REQUEST_UPDATE' | 'APPROVE' | 'REJECT'} ReviewerActionType */
/** @typedef {ResearcherActionType | ReviewerActionType} UserActionType */

/**
 * @typedef {object} Attribute
 * @property {AttributeId} id
 * @property {string} [name]
 * @property {string} [type]
 * @property {string} value
 * @property {boolean} [optional]
 */

/**
 * @typedef {object} DataRequest
 * @property {DataRequestId} id
 * @property {string} consortium
 * @property {DataRequestState} state
 * @property {string} value
 * @property {Timestamp} submitted_at
 * @property {Timestamp} completed_at
 * @property {Attribute[]} attributes
 * @property {UserActionType[]} available_user_actions
 */

/**
 * @typedef {object} Message
 * @property {MessageId} id
 * @property {string} name
 * @property {string} type
 * @property {string} value
 * @property {boolean} optional
 */

/**
 * @typedef {object} Research
 * @property {ResearchId} id
 * @property {string} name
 * @property {string} description
 */

/**
 * @typedef {object} User
 * @property {UserId} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} [institution]
 */

/** @typedef {{ request_id: DataRequestId; attributes: Attribute[] }} ResearcherActionPayload */
/**
 * @typedef {object} ResearcherActionData
 * @property {ResearcherActionType} type
 * @property {ResearcherActionPayload} payload
 */

/** @typedef {{ request_id: DataRequestId; attributes: never }} ReviewerActionPayload */
/**
 * @typedef {object} ReviewerActionData
 * @property {ReviewerActionType} type
 * @property {ReviewerActionPayload} payload
 */
