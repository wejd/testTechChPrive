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
async function addNewRideHandler(message) {
    const { id: rideId, amount, riderId} = message.payload;
    logger.info(
        { id: rideId , amount, riderId},
        '[worker.handleSignupEvent] add rides event',
    );
    const riderObj = await riderModel.findOneById(ObjectId(message.payload.rider_id))
    if(riderObj === null)
        return;

    if('rides' in riderObj) {
        const lengthTab = riderObj.rides.length
        if(lengthTab >= 0 && lengthTab < 20 )
            riderObj.status = 'bronze';
        else if(lengthTab >= 20 && lengthTab < 50 )
            riderObj.status = 'silver';
        else if(lengthTab >= 50 && lengthTab < 100 )
            riderObj.status = 'gold';
        else if(lengthTab >= 100 )
            riderObj.status = 'platinum';

        await riderModel.updateOne(ObjectId(message.payload.rider_id), {
            status : riderObj.status
        });
    }
    try {
        logger.info(
        { rider_id: rideId, amount},
        '[worker.handleSignupEvent] add  rides number',
        );
        if(message.payload.id === undefined || message.payload.rider_id === undefined) {
            return;
        }

        message.payload.id = ObjectId(message.payload.id)
        message.payload.rider_id = ObjectId(message.payload.rider_id)
        message.payload.created_at = new Date();
        await riderModel.updateOnePush(ObjectId(message.payload.rider_id), {
            rides :  message.payload
        });
    } catch (err) {
        handleMessageError(err, message);
    }
}

module.exports = addNewRideHandler;
