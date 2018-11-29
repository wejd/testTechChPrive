'use strict';

const logger = require('chpr-logger');
const {ObjectId} = require('mongodb');

const { handleMessageError } = require('../../../lib/workers');
const riderModel = require('../../../models/riders');


/**
 * Bus message handler for user signup events
 *
 * @param   {Object} message The bus message object.
 * @param   {Object} messageFields The bus message metadata.
 * @returns {void}
 */
async function handleUpdatePhoneNumberEvent(message, messageFields) {
    const { id: riderId, name} = message.payload;
    logger.info(
      { rider_id: riderId , name},
      '[worker.handleSignupEvent] Received user update phone number event',
    );


    try {
      logger.info(
        { rider_id: riderId, name},
        '[worker.handleSignupEvent] updating phone number',
      );
      await riderModel.updateOne(ObjectId(riderId), {
          phone_number : message.payload.phone_number
      });
    } catch (err) {
      handleMessageError(err, message, messageFields);
    }
}

module.exports = handleUpdatePhoneNumberEvent;
