
const { values } = require('lodash');
const mongoose = require('mongoose');

const pizeSchema = new mongoose.Schema(
    {
    

            value:String,
            count: Number,
            image:String,
            // prize_type:{
            //     type: String,
            //     enum: ['kind', 'money' ],
            // },
            isBig : Boolean,
            price:{
                type: Number,
            },
            prizeDuration :{
                type: String,
                required: true,
            },
            initialDate:{
                type: Date,
                default: Date.now()
            }
        
    },
    {
        timestamps:true
    }
)

const Prize = mongoose.model('Prize',pizeSchema);

module.exports = Prize;

