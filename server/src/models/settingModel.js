
const { values } = require('lodash');
const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
    {
    

           
         chancePerDay: {
            type: Number,
            default: 3
         }
          
    },
    {
        timestamps:true
    }
)

const Setting = mongoose.model('Setting',settingSchema);

module.exports = Setting;

