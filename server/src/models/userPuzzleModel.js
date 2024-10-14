
const { values } = require('lodash');
const mongoose = require('mongoose');

const userPuzzleSchema = new mongoose.Schema(
    {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            puzzle_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Puzzle' },
            isShared:Boolean,
            sharedBy :{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
          
          
    },
    {
        timestamps:true
    }
)

const UserPuzzle = mongoose.model('UserPuzzle',userPuzzleSchema);

module.exports = UserPuzzle;

