const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const {Schema} = mongoose;

const bookingSchema = new Schema({
        event:{
            type: Schema.Types.ObjectId,
            ref: 'Event',
            autopopulate: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: {select:"_id email createdEvents"}
        }
    },
    {timestamps:true}
);

bookingSchema.plugin(autopopulate);

module.exports = mongoose.model('Booking',bookingSchema);