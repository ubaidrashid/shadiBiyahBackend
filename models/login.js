import mongoose from 'mongoose';

const loginActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    loginTime: {
        type: Date,
        default: Date.now,
    },
    ipAddress: String,  // Optional, you can store the IP address if needed
});

const LoginActivity = mongoose.model('LoginActivity', loginActivitySchema);

export default LoginActivity;
