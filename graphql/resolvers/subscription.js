const {pubsub} = require('../helper');

module.exports = {
    Subscription:{
        newEvent:{
            subscribe(){
                return pubsub.asyncIterator(process.env.NEW_EVENT);
            }
        }
    }
}