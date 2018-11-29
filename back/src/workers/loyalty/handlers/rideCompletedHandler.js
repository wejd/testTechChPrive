'use strict';

const logger = require('chpr-logger');
const {ObjectId} = require('mongodb');
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
function rideCompletedHandler(message) {


    mutex.timedLock(1000, async (error) =>{
        if(error) {
           console.log("error")
        }else{
            const { id: rideId, amount, riderId} = message.payload;
            if(message.payload.rider_id === undefined)
                return;

            logger.info(
                { id: rideId , amount, riderId},
                '[worker.handleSignupEvent] update rides event',
            );
            try {
                logger.info(
                { rider_id: rideId, amount},
                  '[worker.handleSignupEvent] update ride',
                );
                const returnedRide = await riderModel.findOneByIdRides({'rides.id': ObjectId(rideId)})
                if(returnedRide === undefined)
                    return;

                const ridesArray =  Array.from(returnedRide.rides);
                ridesArray.forEach(async (obj) => {
                    if(obj.id.toString()=== rideId.toString()) {
                        if('completed' in obj)
                            return;
                        let finalLoyalityPoint = 0;
                        switch (returnedRide.status) {
                            case 'bronze':
                            finalLoyalityPoint = parseInt(amount, 10);
                            break;
                            case 'silver':
                            finalLoyalityPoint = parseInt(amount, 10) * 3;
                            break;
                            case 'gold':
                            finalLoyalityPoint = parseInt(amount, 10) * 5;
                            break;
                            default:
                            finalLoyalityPoint = parseInt(amount, 10) * 10;
                            break;
                        }
                        await riderModel.updateOneElementInArray({'rides.id': ObjectId(rideId)}, {
                            'rides.$.completed': true,
                            'rides.$.amount': amount,
                            'earned_point': finalLoyalityPoint,
                        }, {'loyality_point':  finalLoyalityPoint});
                    }
                });
              } catch (err) {
                handleMessageError(err, message);
                mutex.unlock();
              }
         }
         mutex.unlock();
       });


}

module.exports = rideCompletedHandler;
