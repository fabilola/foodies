module.exports = mongoose => {
    let UserSchema = mongoose.Schema({
        authServiceId: {
            type: String,
            required: true
        },
        displayName: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
    });
    return mongoose.model("user", UserSchema);
}

