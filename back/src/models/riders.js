'use strict';

const {ObjectId} = require('mongodb');
const { loyaltyStatuses } = require('../constants/loyalty');
const { getDb } = require('../lib/mongodb');
const dateLib = require('../lib/date');
const Joi = require('../lib/joi');

const COLLECTION_NAME = 'riders';

const riderSchema = Joi.object({
  _id: Joi.objectId().required(),
  name: Joi.string().min(6),
  status: Joi.valid(loyaltyStatuses).default('bronze'),
  phone_number: Joi.string(),
  rides: Joi.array(),
  loyality_point: Joi.number().default(0),
  created_at: Joi.date().default(() => dateLib.getDate(), 'time of creation'),

});

/**
 * Validate schema consistency
 *
 * @param {Object} rider - the rider to validate
 *
 * @returns {Object} Referral: valid version of rider
 */
function _validateSchema(rider) {
  return Joi.attempt(rider, riderSchema);
}

/**
 * Return the riders collection
 *
 * @returns {Object} object to manipulate riders collection
 */
function collection() {
  return getDb().collection(COLLECTION_NAME);
}

/**
 * Create collection indexes
 *
 * @returns {void}
 */
async function createIndexes() {
  await collection().createIndex({ status: 1 }, { background: true });
}

/**
 * Returns a cursor on lots for a given query.
 *
 * @param {object} query       - mongo query
 * @param {object} projections - optional projection of results fields
 *
 * @returns {Promise<Cursor>} The cursor to iterate on messages
 */
function find(query = {}, projections = {}) {
  return collection().find(query, projections);
}

/**
 * Returns a rider found with its id
 *
 * @param {ObjectId} riderId   - identifier of the queried rider
 * @param {Object} projections - optional projection of result fields
 *
 * @returns {Object} The mongo document
 */
function findOneById(riderId, projections = {}) {
  return collection().findOne({ _id: riderId }, projections);
}
/**
 * Returns a rider found with its id
 *
 * @param {ObjectId} ride   - identifier of the queried rider
 * @param {Object} projections - optional projection of result fields
 *
 * @returns {Object} The mongo document
 */
function findOneByIdRides(ride) {
  return collection().findOne(ride);
}

/**
 * Insert a new rider into the database
 *
 * @param {Object} rider - data about the inserted rider
 *
 * @returns {Object} the inserted rider
 */
async function insertOne(rider) {
  const validatedRider = _validateSchema(rider);
  const res = await collection().insert(validatedRider);

  return res.ops[0];
}

/**
 * Update a rider
 *
 * @param {ObjectId} riderId     - identifier of the updated rider
 * @param {Object} updatedFields - fields that are updated
 *
 * @returns {Object/null} result of update if succeeded, null otherwise
 */
async function updateOne(riderId, updatedFields) {
  const result = await collection().updateOne(
    { _id: riderId },
    { $set: updatedFields },
  );
  return result;
}
/**
 * Update a rider
 *
 * @param {ObjectId} riderId     - identifier of the updated rider
 * @param {Object} updatedFields - fields that are updated
 *
 * @returns {Object/null} result of update if succeeded, null otherwise
 */
async function updateOnePush(riderId, updatedFields) {
  const result = await collection().updateOne(
    { _id: riderId },
    { $push: updatedFields },
  );
  return result;
}
/**
 * Update a rider
 *
 * @param {ObjectId} obj     - identifier of the updated rider
 * @param {Object} updatedFields - fields that are updated
 * @param {Object} inc - fields that are updated
 *
 * @returns {Object/null} result of update if succeeded, null otherwise
 */
async function updateOneElementInArray(obj, updatedFields, inc) {
  const result = await collection().updateOne(
    obj,
    { $set: updatedFields,
      $inc: inc
    }
  );
  return result;
}
/**
 * find all a rider
 *
 * @param {ObjectId} obj     - identifier of the updated rider
 * @param {Object} updatedFields - fields that are updated
 * @param {Object} inc - fields that are updated
 *
 * @returns {Object/null} result of update if succeeded, null otherwise
 */
 async function returnListRiders() {
  const result = await collection().find({}).toArray();
  /* const result = await collection().find({});
  return result; */
  return result;
}

module.exports = {
  collection,
  createIndexes,
  findOneById,
  find,
  insertOne,
  updateOne,
  updateOnePush,
  updateOneElementInArray,
  findOneByIdRides,
  returnListRiders
};
