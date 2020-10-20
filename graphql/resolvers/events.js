const Event = require("../../models/Event");
const User = require("../../models/User");
const { pubsub } = require("../helper");

const transformEvent = (event) => {
    return {
        ...event._doc,
        _id: event._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
    };
};

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map((event) => {
                return transformEvent(event);
            });
            //returning just the result is also fine
            //we can also use res.id(without '_')
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        console.log(req.ip, req.isAuth, req.token, true);
        if (!req.isAuth) {
            throw new Error("Unauthenticated");
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date(args.eventInput.date).toISOString(),
            creator: req.userId,
        });
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = transformEvent(result);
            const creator = await User.findById(req.userId);
            if (!creator) {
                throw new Error("User Doesn't exist");
            }
            creator.createdEvents.push(event);
            await creator.save();
            pubsub.publish(process.env.NEW_EVENT, {
                newEvent: event,
            });
            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};
