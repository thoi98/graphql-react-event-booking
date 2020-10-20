const Booking = require('../../models/Booking');
const Event = require('../../models/Event');

module.exports = {
    bookEvent: async(args,req) =>{
        try{
            if(!req.isAuth)
            {
                throw new Error("Unauthenticated"); 
            }
            const fetchedEvent  =await Event.findOne({_id:args.eventId});
            const booking = new Booking({
                user:req.userId,
                event: fetchedEvent
            });
            const result = await booking.save();
            return {...result._doc,
                createdAt: new Date(booking._doc.createdAt).toISOString(),
                updatedAt: new Date(booking._doc.updatedAt).toISOString()
            };
        }catch(err)
        {
            throw err;
        }
    },
    bookings: async(args,req)=>{
        try{
            if(!req.isAuth)
            {
                throw new Error("Unauthenticated"); 
            }
            const bookings = await Booking.find();
            return bookings.map(booking=>{
                return{
                    ...booking._doc,
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString()
                };
            });
        }
        catch(err)
        {
            throw err;
        }
    },
    cancelBooking: async(args)=>{
        try{
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({_id:args.bookingId});
            return event;
        }
        catch(err)
        {
            throw err;
        }
    }
};