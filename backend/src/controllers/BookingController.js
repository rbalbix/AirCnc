const Booking = require('../models/Booking');

module.exports = {

    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const user = User.findById(user_id);
        if (!user)
            return res.status(400).json({ error: 'User does not exists' });

        const booking = Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        await (await booking).populate('spot').populate('user');

        return res.json(booking);
    }

};