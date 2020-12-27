const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            default: 'Admin'
        },
        password: {
            type: String,
        },
        history : [{
          word:String,
          time:Date
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
