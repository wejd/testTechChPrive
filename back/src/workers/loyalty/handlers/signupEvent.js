'use strict';

const logger = require('chpr-logger');
const locks = require('locks');

const { handleMessageError } = require('../../../lib/workers');
const riderModel = require('../../../models/riders');

const mutex = locks.createMutex();

/**
 * Bus message handler for user signup events
 *
 * @param   {Object} message The bus message object.
 * @param   {Object} messageFields The bus message metadata.
 * @returns {void}
 */
function handleSignupEvent(message, messageFields) {
  const { id: riderId, name } = message.payload;

  logger.info(
    { rider_id: riderId, name },
    '[worker.handleSignupEvent] Received user signup event',
  );

  // TODO handle idempotency
  /* ; */
   mutex.timedLock(1000, async (error) =>{
     if(error) {
        console.log("error")
     }else{
        // do stuff
        /* const userFound =  await riderModel.findOneById(riderId);
        if(userFound === undefined || userFound === null)
          return; */
        try {
          logger.info(
            { rider_id: riderId, name },
            '[worker.handleSignupEvent] Insert rider',
          );
          await riderModel.insertOne({
            _id: riderId,
            name,
          });
        } catch (err) {
          handleMessageError(err, message, messageFields);
        }
      }
      mutex.unlock();
    });






}

module.exports = handleSignupEvent;
