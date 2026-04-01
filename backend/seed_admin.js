const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin123';

        // Check if exists
        let user = await User.findOne({ email: adminEmail });

        if (user) {
            console.log('Admin user found. Updating password...');
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(adminPassword, salt);
            user.role = 'admin'; // Ensure role is admin
            await user.save();
            console.log('Admin password updated to: admin123');
        } else {
            console.log('Admin user not found. Creating...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            user = new User({
                name: 'System Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin'
            });
            await user.save();
            console.log('Admin account created. Email: admin@gmail.com / Pass: admin123');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
