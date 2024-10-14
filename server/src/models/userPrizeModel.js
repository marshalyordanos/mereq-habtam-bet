
const { values } = require('lodash');
const mongoose = require('mongoose');

const userPrizeSchema = new mongoose.Schema(
    {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            prize_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize' },
            status:{
                type:String,
                enum: ['payed', 'inprogress' ],
               
            },
            phoneNumber : String,
            prizeName : String,
          
    },
    {
        timestamps:true
    }
)

const UserPrize = mongoose.model('UserPrize',userPrizeSchema);

module.exports = UserPrize;

