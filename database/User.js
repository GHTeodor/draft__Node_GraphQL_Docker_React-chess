const {Schema, model} = require('mongoose');

const userRoles = require("../configs/user-roles.enum");
const passwordService = require("../services/password.service"); // not from index!!! problem on userController.getAllUsers

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // select: false
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: [
            userRoles.USER,
            userRoles.ADMIN,
            userRoles.MANAGER
        ]
    },
    age: {
        type: Number
    },
    avatar: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('fullName').get(function() {
    return `${this.name} ${this.role}`;
});

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({ ...userObject, password: hashedPassword });
    }
};

module.exports = model('user', userSchema);
