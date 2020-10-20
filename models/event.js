const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const { Schema } = mongoose;

const eventSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator : {
        type : Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: {select:"email _id createdEvents"}
    }
});

eventSchema.plugin(autopopulate);

module.exports = mongoose.model('Event',eventSchema);