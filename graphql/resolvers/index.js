const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");
const subscriptionResolver = require('./subscription');


const rootResolver = {
    ...authResolver,
    ...bookingResolver,
    ...eventsResolver,
    ...subscriptionResolver
}

module.exports = rootResolver;