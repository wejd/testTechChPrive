'use strict';

const handleSignupEvent = require('./signupEvent');
const handleUpdatePhoneNumberEvent = require('./updatephoneNumber');
const addNewRideHandler =  require('./addNewRideHandler');
const rideCompletedHandler =  require('./rideCompletedHandler');

module.exports = {
  handleSignupEvent,
  handleUpdatePhoneNumberEvent,
  addNewRideHandler,
  rideCompletedHandler
};
