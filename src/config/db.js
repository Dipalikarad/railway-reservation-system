const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        console.log(process.env.MONGO_URI);
        const uri = process.env.MONGO_URI || 'mongodb+srv://dipalikarad25_db_user:Railway%402026secure@cluster0.f2gcstw.mongodb.net/railwayDB?retryWrites=true&w=majority';

        await mongoose.connect(uri)
        .then(() => {
            console.log('Database connected successfully');
        });
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = dbConnect;